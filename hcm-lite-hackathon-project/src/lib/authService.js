import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  deleteUser,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { doc, getDoc, runTransaction, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { COLLECTIONS, SETUP_DOC_ID, ROLE_META } from "@/lib/constants";
import { normalizeEmail, normalizeName, normalizePhone } from "@/lib/validation";

/* ---------- friendly errors ---------- */
export class AuthError extends Error {
  constructor(code, message, field = null, isCredentialError = false) {
    super(message);
    this.code = code;
    this.field = field; // which form field to attach the message to (null = show as a banner)
    this.isCredentialError = isCredentialError;
  }
}

const CRED = "Email or password is incorrect.";
const NETWORK = "Can't reach the server. Check your connection and try again.";
const MAP = {
  "auth/email-already-in-use": ["email", "This email is already registered. Try signing in instead."],
  "auth/invalid-email": ["email", "Enter a valid email address."],
  "auth/weak-password": ["password", "Choose a stronger password."],
  "auth/invalid-credential": [null, CRED, true],
  "auth/wrong-password": [null, CRED, true],
  "auth/user-not-found": [null, CRED, true],
  "auth/user-disabled": [null, "This account is disabled. Contact your Admin."],
  "auth/too-many-requests": [null, "Too many attempts. Wait a few minutes or reset your password."],
  "auth/network-request-failed": [null, NETWORK],
  "auth/operation-not-allowed": [null, "Email/password sign-in is off. Enable it in Firebase console > Authentication."],
  "permission-denied": [null, "Firestore blocked this request. Publish firestore.rules in the Firebase console."],
  unavailable: [null, NETWORK],
};

export function toAuthError(err) {
  if (err instanceof AuthError) return err;
  const entry = MAP[err?.code];
  if (entry) return new AuthError(err.code, entry[1], entry[0], !!entry[2]);
  console.error("Unhandled auth error:", err);
  return new AuthError("unknown", "Something went wrong. Please try again.");
}

/* ---------- first-run setup ---------- */
// completed: true | false | null (null = couldn't check, e.g. offline)
export async function getSetupStatus() {
  try {
    const snap = await getDoc(doc(db, COLLECTIONS.META, SETUP_DOC_ID));
    return { completed: snap.exists(), companyName: snap.exists() ? snap.data().companyName ?? "" : "" };
  } catch {
    return { completed: null, companyName: "" };
  }
}

/* ---------- sign up ---------- */
export async function signUp(values, role) {
  const email = normalizeEmail(values.email);
  const firstName = normalizeName(values.firstName);
  const lastName = normalizeName(values.lastName);
  const fullName = `${firstName} ${lastName}`;
  const companyName = role === "admin" ? normalizeName(values.companyName) : null;

  let cred;
  try {
    cred = await createUserWithEmailAndPassword(auth, email, values.password);
  } catch (err) {
    throw toAuthError(err);
  }
  const { user } = cred;

  const profile = {
    uid: user.uid,
    firstName,
    lastName,
    fullName,
    email,
    phone: normalizePhone(values.phone),
    role,
    status: "active",
    mustChangePassword: false,
    createdAt: serverTimestamp(),
  };

  try {
    // One transaction: the profile and (for Admin) the setup flag are saved together or not at all.
    await runTransaction(db, async (tx) => {
      const setupRef = doc(db, COLLECTIONS.META, SETUP_DOC_ID);
      const setupSnap = await tx.get(setupRef);

      if (role === "admin") {
        if (setupSnap.exists()) {
          throw new AuthError("setup/already-done", "The company is already set up. Ask your Admin for access.");
        }
        tx.set(setupRef, { completed: true, companyName, createdAt: serverTimestamp() });
      } else if (!setupSnap.exists()) {
        throw new AuthError("setup/not-done", "The company isn't set up yet. The Admin must create the first account.");
      }
      tx.set(doc(db, COLLECTIONS.USERS, user.uid), profile);
    });
  } catch (err) {
    // Roll back the Auth user so the email isn't left half-registered.
    await deleteUser(user).catch(() => {});
    throw toAuthError(err);
  }

  // Nice-to-haves: never block sign-up if these fail.
  await updateProfile(user, { displayName: fullName }).catch(() => {});
  await sendEmailVerification(user).catch(() => {});

  return { ...profile, createdAt: null };
}

/* ---------- sign in ---------- */
export async function signIn({ email, password, role, remember }) {
  try {
    await setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence);
  } catch {
    /* fall back to the default persistence */
  }

  let cred;
  try {
    cred = await signInWithEmailAndPassword(auth, normalizeEmail(email), password);
  } catch (err) {
    throw toAuthError(err);
  }

  // The role tab is only a hint. The role stored in Firestore is the truth.
  let profile;
  try {
    const snap = await getDoc(doc(db, COLLECTIONS.USERS, cred.user.uid));
    profile = snap.exists() ? snap.data() : null;
  } catch (err) {
    await signOut(auth);
    throw toAuthError(err);
  }

  if (!profile) {
    await signOut(auth);
    throw new AuthError("profile/missing", "We couldn't find a profile for this account. Contact your Admin.");
  }
  if (profile.status !== "active") {
    await signOut(auth);
    throw new AuthError("profile/inactive", "This account is deactivated. Contact your Admin.");
  }
  if (profile.role !== role) {
    await signOut(auth);
    const actual = ROLE_META[profile.role]?.label ?? profile.role;
    throw new AuthError("profile/role-mismatch", `This account is registered as ${actual}. Choose the ${actual} tab to sign in.`);
  }
  return profile;
}

export const logOut = () => signOut(auth);

/* ---------- password reset ---------- */
export async function sendReset(email) {
  try {
    await sendPasswordResetEmail(auth, normalizeEmail(email));
  } catch (err) {
    // Same response whether or not the email exists, so nobody can probe for accounts.
    if (err?.code === "auth/user-not-found") return;
    throw toAuthError(err);
  }
}
