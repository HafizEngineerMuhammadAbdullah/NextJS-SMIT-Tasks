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

# HCM Lite: authentication (Next.js + Firebase)

Sign-up and sign-in for Admin, HR and Employee, from the Saylani Hackathon brief (module M1).

## 1. Install
```bash
npm install firebase react-icons motion
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

## Dashboards (added)
Routes: `/dashboard/admin`, `/dashboard/hr`, `/dashboard/employee`. Other sidebar items open a "not built yet" page.

| File | Job |
|---|---|
| `app/dashboard/[role]/layout.jsx` | guard + data provider + sidebar/topbar for every dashboard page |
| `context/DashboardContext.jsx` | loads data for the role and filters (date range, department) |
| `lib/dashboard/dataSource.js` | **the one place to connect real data** (demo vs Firestore) |
| `lib/dashboard/demoData.js` | demo generator, only used when `NEXT_PUBLIC_DEMO_DATA` is not `false` |
| `lib/dashboard/assistant.js` | local stand-in for `POST /ai/chat` (answers + dashboard summary) |
| `components/dashboard/roles/*` | the three role dashboards |
| `components/dashboard/Charts.jsx` | hand-made SVG charts animated with `motion/react` |

Demo vs real: the brief says the system starts empty. With `NEXT_PUBLIC_DEMO_DATA=false` the numbers come from Firestore
(headcount only, for now) and every chart shows an empty state. Leave it `true` while you study or present the UI.

Not real yet: employee check-in uses the browser clock, leave approve/reject only changes local state,
the assistant is rule-based, and the payslip PDF button is disabled. Each has a comment saying what the backend call should be.


I’ll inspect the tagged layout and that project’s local instructions, then make the smallest fix and verify it.

"Read" failed
Completed with input: {
  "path": "C:\\Users\\A1\\Desktop\\Task Folder\\SmitTasks\\NextJsTasks\\hcm-lite-hackathon-project\\AGENTS.md"
}
Tool execution failed: Path does not exist

Read 
Completed with input: {
  "path": "C:\\Users\\A1\\Desktop\\Task Folder\\SmitTasks\\NextJsTasks\\hcm-lite-hackathon-project\\src\\app\\dashboard\\[role]\\layout.jsx"
}

Read 
Completed with input: {
  "path": "C:\\Users\\A1\\Desktop\\Task Folder\\SmitTasks\\NextJsTasks\\hcm-lite-hackathon-project\\package.json"
}

Search for `useParams|Suspense`

Find files matching `**/AGENTS.md`

Read 
Completed with input: {
  "path": "C:\\Users\\A1\\Desktop\\Task Folder\\SmitTasks\\NextJsTasks\\hcm-lite-hackathon-project\\src\\app\\dashboard\\[role]\\[section]\\page.jsx"
}

Find files matching `src/components/auth/ProtectedRoute.*`

Find files matching `src/components/dashboard/Shell.*`

Find files matching `src/context/DashboardContext.*`

Search for `function ProtectedRoute|function DashboardProvider|export default function Sh...`

Ran terminal command: git status --short; Get-ChildItem -Force

The tagged layout and the matching section page both call `useParams()`, so either can trigger this Next.js prerender error. I’m checking their client/server boundaries before replacing the hook with the route `params` prop.

Read 
Completed with input: {
  "path": "C:\\Users\\A1\\Desktop\\Task Folder\\SmitTasks\\NextJsTasks\\hcm-lite-hackathon-project\\src\\components\\auth\\ProtectedRoute.jsx"
}

Read 
Completed with input: {
  "path": "C:\\Users\\A1\\Desktop\\Task Folder\\SmitTasks\\NextJsTasks\\hcm-lite-hackathon-project\\src\\context\\DashboardContext.jsx"
}

Read , lines 1 to 75
Completed with input: {
  "path": "C:\\Users\\A1\\Desktop\\Task Folder\\SmitTasks\\NextJsTasks\\hcm-lite-hackathon-project\\src\\components\\dashboard\\Shell.jsx",
  "view_range": [
    1,
    75
  ]
}

Read 
Completed with input: {
  "path": "C:\\Users\\A1\\Desktop\\Task Folder\\SmitTasks\\NextJsTasks\\hcm-lite-hackathon-project\\eslint.config.mjs"
}

Find files matching `AGENTS.md`

Edit , 

Both route segments now read dynamic values from Next.js’s server-provided `params`, avoiding the client hook that caused prerendering to block. I’ll run lint and a production build to verify the changes.

Ran terminal command: npm run lint -- "src/app/dashboard/[role]/layout.jsx" "src/app/dashboard/[role]/[section]/page.jsx"
Tool execution failed with exit code -4058

Ran terminal command: npm run build
Tool execution failed with exit code -4058

Ran terminal command: Set-Location 'C:\Users\A1\Desktop\Task Folder\SmitTasks\NextJsTasks\hcm-lite-hackathon-project'; npm run lint -- "src/app/dashboard/[role]/layout.jsx" "src/app/dashboard/[role]/[section]/page.jsx"

Ran terminal command: Set-Location 'C:\Users\A1\Desktop\Task Folder\SmitTasks\NextJsTasks\hcm-lite-hackathon-project'; npm run build
Tool execution failed with exit code 1

Read 
Completed with input: {
  "path": "C:\\Users\\A1\\Desktop\\Task Folder\\SmitTasks\\NextJsTasks\\hcm-lite-hackathon-project\\src\\app\\layout.jsx"
}

Read 
Completed with input: {
  "path": "C:\\Users\\A1\\Desktop\\Task Folder\\SmitTasks\\NextJsTasks\\hcm-lite-hackathon-project\\src\\context\\AuthContext.jsx"
}

Read 
Completed with input: {
  "path": "C:\\Users\\A1\\Desktop\\Task Folder\\SmitTasks\\NextJsTasks\\hcm-lite-hackathon-project\\src\\components\\ui\\FullPageLoader.jsx"
}

Ran terminal command: git diff -- "hcm-lite-hackathon-project/src/app/dashboard/[role]/layout.jsx" "hcm-lite-hackathon-project/src/app/dashboard/[role]/[section]/page.jsx"

The build revealed this dashboard is intentionally runtime-rendered: the layout already had a commented `instant = false` note. I’ll enable that route setting so Next doesn’t try to prerender its runtime-dependent auth/dashboard shell.

Edit 

Ran terminal command: Set-Location 'C:\Users\A1\Desktop\Task Folder\SmitTasks\NextJsTasks\hcm-lite-hackathon-project'; npm run lint -- "src/app/dashboard/[role]/layout.jsx" "src/app/dashboard/[role]/[section]/page.jsx"

Ran terminal command: Set-Location 'C:\Users\A1\Desktop\Task Folder\SmitTasks\NextJsTasks\hcm-lite-hackathon-project'; npm run build

Ran terminal command: git diff --check; git status --short; git diff --stat -- "hcm-lite-hackathon-project/src/app/dashboard/[role]/layout.jsx" "hcm-lite-hackathon-project/src/app/dashboard/[role]/[section]/page.jsx"

This happened because `useParams()` is a **client hook**, and the route value is only known at request time. With Cache Components enabled, Next.js can’t use that runtime-only value during prerendering unless it’s handled under Suspense or the route is allowed to render at request time.

I updated the dashboard layout to read the route’s server-provided `params` and enabled `instant = false`, which fits this auth-dependent dashboard. I also made the same `useParams()` change in the section page so it wouldn’t trigger the error there.

- `layout.jsx`
- `page.jsx`

**Verified:** lint passed and the production build completed.