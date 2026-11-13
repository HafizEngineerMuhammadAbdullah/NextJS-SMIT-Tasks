export const ROLES = { ADMIN: "admin", HR: "hr", EMPLOYEE: "employee" };

// accent = role colour, onAccent = readable text colour on top of it.
export const ROLE_META = {
  admin: {
    label: "Admin",
    hint: "Sets up the company and finalizes payroll.",
    accent: "#6D5DF0",
    onAccent: "#FFFFFF",
    perks: [
      "Set up company, office hours and location",
      "Create HR logins and see every record",
      "Finalize payroll and read the audit log",
    ],
  },
  hr: {
    label: "HR",
    hint: "Runs people operations day to day.",
    accent: "#12A08A",
    onAccent: "#04251F",
    perks: [
      "Register employees and set salary structures",
      "Approve leave and attendance corrections",
      "Prepare the monthly payroll draft",
    ],
  },
  employee: {
    label: "Employee",
    hint: "Self-service for your own work records.",
    accent: "#E8962E",
    onAccent: "#2B1A00",
    perks: [
      "Check in and out, view your attendance",
      "Apply for leave in plain words",
      "Download your payslips",
    ],
  },
};

export const roleStyle = (role) => ({
  "--accent": ROLE_META[role]?.accent ?? ROLE_META.employee.accent,
  "--on-accent": ROLE_META[role]?.onAccent ?? ROLE_META.employee.onAccent,
});

// Brief: Admin is created by first-run setup, HR by Admin, employees by HR.
// For the exam all three can self-register. Remove a role from this list to switch it off.
export const PUBLIC_SIGNUP_ROLES = [ROLES.ADMIN, ROLES.HR, ROLES.EMPLOYEE];
export const SIGNIN_ROLES = [ROLES.ADMIN, ROLES.HR, ROLES.EMPLOYEE];

export const ROUTES = {
  signin: "/signin",
  signup: "/signup",
  forgot: "/forgot-password",
};
export const dashboardPath = (role) => `/dashboard/${role}`;

export const COLLECTIONS = { USERS: "users", META: "meta" };
export const SETUP_DOC_ID = "setup";

// UI-only brute-force slowdown (Firebase also rate-limits on its side).
export const MAX_FAILED_ATTEMPTS = 5;
export const LOCKOUT_SECONDS = 30;
