// Pure functions only (no React, no Firebase) so they are easy to test and reuse.

const EMAIL_RE = /^[a-z0-9._%+-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-z]{2,}$/i;
const NAME_RE = /^\p{L}[\p{L}\p{M}\s'-]*$/u;
const COMPANY_RE = /^[\p{L}\p{N}][\p{L}\p{N}\p{M}\s&.,'()-]*$/u;
const PK_MOBILE_RE = /^(?:\+92|0092|92|0)?(3\d{9})$/;
const COMMON_PASSWORDS = new Set([
  "password", "password1", "password123", "12345678", "123456789", "1234567890",
  "qwerty123", "admin123", "iloveyou", "welcome1", "letmein1", "abc12345", "pakistan1",
]);

/* ---------- normalizers (call these before saving) ---------- */
export const normalizeEmail = (v = "") => v.trim().toLowerCase();
export const normalizeName = (v = "") => v.trim().replace(/\s+/g, " ");
export const normalizePhone = (v = "") => {
  const m = v.replace(/[\s\-()]/g, "").match(PK_MOBILE_RE);
  return m ? `+92${m[1]}` : null; // 0300 1234567 -> +923001234567
};

/* ---------- password helpers (also used by the strength meter) ---------- */
export const passwordChecks = (pw = "") => [
  { id: "len", label: "At least 8 characters", ok: pw.length >= 8 },
  { id: "lower", label: "A lowercase letter", ok: /\p{Ll}/u.test(pw) },
  { id: "upper", label: "An uppercase letter", ok: /\p{Lu}/u.test(pw) },
  { id: "num", label: "A number", ok: /\d/.test(pw) },
  { id: "sym", label: "A symbol, like ! @ # $", ok: /[^\p{L}\p{N}\s]/u.test(pw) },
];

export function passwordStrength(pw = "") {
  if (!pw) return { score: 0, label: "" };
  const passed = passwordChecks(pw).filter((c) => c.ok).length;
  let score = passed <= 2 ? 1 : passed === 3 ? 2 : passed === 4 ? 3 : 4;
  if (score === 4 && pw.length < 10) score = 3;
  if (COMMON_PASSWORDS.has(pw.toLowerCase())) score = 1;
  return { score, label: ["", "Weak", "Fair", "Good", "Strong"][score] };
}

/* ---------- field rules: (value, allValues) => error message or "" ---------- */
const nameRule = (label) => (v) => {
  const s = normalizeName(v);
  if (!s) return `Enter your ${label.toLowerCase()}.`;
  if (s.length < 2) return `${label} must be at least 2 characters.`;
  if (s.length > 30) return `${label} must be 30 characters or fewer.`;
  if (!NAME_RE.test(s)) return `${label} can only use letters, spaces, apostrophes and hyphens.`;
  return "";
};

const emailRule = (v) => {
  const s = v.trim();
  if (!s) return "Enter your email address.";
  if (s.length > 254 || !EMAIL_RE.test(s)) return "Enter a valid email, like name@company.com.";
  return "";
};

const rules = {
  firstName: nameRule("First name"),
  lastName: nameRule("Last name"),
  email: emailRule,
  phone: (v) => {
    if (!v.trim()) return "Enter your mobile number.";
    return normalizePhone(v) ? "" : "Use a Pakistani mobile number, like 0300 1234567.";
  },
  companyName: (v) => {
    const s = normalizeName(v);
    if (!s) return "Enter your company name.";
    if (s.length < 2) return "Company name must be at least 2 characters.";
    if (s.length > 60) return "Company name must be 60 characters or fewer.";
    if (!COMPANY_RE.test(s)) return "Company name has characters we can't accept.";
    return "";
  },
  password: (v, all) => {
    if (!v) return "Create a password.";
    if (/\s/.test(v)) return "Password can't contain spaces.";
    if (v.length > 64) return "Password must be 64 characters or fewer.";
    const failed = passwordChecks(v).find((c) => !c.ok);
    if (failed) return `Password needs ${failed.label.charAt(0).toLowerCase()}${failed.label.slice(1)}.`;
    if (COMMON_PASSWORDS.has(v.toLowerCase())) return "That password is too common. Pick one that's harder to guess.";
    const local = (all.email || "").split("@")[0].toLowerCase();
    if (local.length >= 4 && v.toLowerCase().includes(local)) return "Password shouldn't contain your email name.";
    return "";
  },
  confirmPassword: (v, all) => {
    if (!v) return "Re-enter your password.";
    return v === all.password ? "" : "Passwords don't match.";
  },
  terms: (v) => (v ? "" : "Accept the terms to continue."),
};

// Sign-in must NOT reveal the password policy, so it only checks presence.
const signinRules = {
  email: emailRule,
  password: (v) => (v ? "" : "Enter your password."),
};

function buildSchema(fields, ruleSet) {
  const validateField = (name, values) => ruleSet[name]?.(values[name] ?? "", values) ?? "";
  return {
    fields,
    validateField,
    validateAll(values) {
      const errors = {};
      fields.forEach((f) => {
        const msg = validateField(f, values);
        if (msg) errors[f] = msg;
      });
      return errors;
    },
  };
}

export const signupSchema = (role) =>
  buildSchema(
    [
      "firstName", "lastName", "email", "phone",
      ...(role === "admin" ? ["companyName"] : []),
      "password", "confirmPassword", "terms",
    ],
    rules
  );
export const signinSchema = buildSchema(["email", "password"], signinRules);
export const forgotSchema = buildSchema(["email"], signinRules);
