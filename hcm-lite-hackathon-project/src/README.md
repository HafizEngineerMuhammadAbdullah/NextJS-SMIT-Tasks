# HCM Lite: authentication (Next.js + Firebase)

Sign-up and sign-in for Admin, HR and Employee, from the Saylani Hackathon brief (module M1).

## 1. Install
```bash
npm install firebase react-icons
```
Paste these folders into your Next.js project (App Router, Tailwind, `@/*` alias).
If your project uses `src/`, put `app`, `components`, `context`, `hooks` and `lib` inside `src/`.

## 2. Firebase console
1. Create a project, then add a **Web app** and copy its config into `.env.local` (see `.env.example`).
2. **Authentication > Sign-in method:** enable **Email/Password**.
3. **Firestore Database:** create the database.
4. **Firestore > Rules:** paste `firestore.rules` and **Publish**.
5. Restart `npm run dev` after creating `.env.local`.

## 3. Try it
1. Open `/signup`. On a fresh project only **Admin** is allowed (first-run setup), with a company name.
2. After that, **HR** and **Employee** sign-ups open up and Admin closes.
3. `/signin`: the role tab must match the role stored on the account.
4. Open `/dashboard/hr` while signed in as an employee and you are bounced to `/dashboard/employee`.

## Structure
| File | Job |
|---|---|
| `lib/validation.js` | all rules, normalizers, password strength (no React/Firebase) |
| `lib/authService.js` | Firebase calls, friendly errors, first-run + role checks |
| `hooks/useForm.js` | blur/live validation, focus first error, server errors |
| `context/AuthContext.jsx` | `useAuth()` gives `user`, `profile`, `role`, `loading`, `logout` |
| `components/auth/*` | fields, password strength, role tabs, guards |
| `firestore.rules` | the real protection (roles can't be escalated from the browser) |

## Known limits (be ready to explain in the exam)
- Brief says Admin creates HR and HR creates employees. Here all three self-register for learning. Edit `PUBLIC_SIGNUP_ROLES` in `lib/constants.js` to turn roles off.
- `ProtectedRoute` is a UX guard. Real enforcement is `firestore.rules`. Later modules need server-side checks too.
- `mustChangePassword` is stored but the change-password screen is not built yet.
- The 5-attempt lockout is UI-only. Firebase applies its own rate limit as well.
