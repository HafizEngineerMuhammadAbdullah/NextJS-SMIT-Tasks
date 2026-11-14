import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { COLLECTIONS } from "@/lib/constants";
import { demoAdmin, demoHr, demoEmployee, kpi } from "@/lib/dashboard/demoData";

// Demo data is ON unless NEXT_PUBLIC_DEMO_DATA=false. For judging ("system starts empty"), turn it off:
// numbers then come from Firestore and everything else shows an empty state.
export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_DATA !== "false";

const empty = {
  admin: () => ({
    kind: "admin",
    kpis: { headcount: kpi(), attrition: kpi(), payrollCost: kpi(), avgSalary: kpi() },
    headcountTrend: [], byDept: [], payrollByDept: [], tenure: [], gender: [], audit: [], notifications: [],
  }),
  hr: () => ({
    kind: "hr",
    kpis: { headcount: kpi(), present: kpi(), onLeave: kpi(), late: kpi(), pending: kpi() },
    trend: [], absenteeism: [], leaveByType: [], lateComers: [], onLeaveToday: [], pending: [], notifications: [],
  }),
  employee: () => ({
    kind: "employee",
    week: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((label) => ({ label, value: 0 })),
    weekTarget: 40,
    lateCount: 0,
    leave: [
      { type: "annual", label: "Annual", used: 0, quota: 14, color: "#6D5DF0" },
      { type: "sick", label: "Sick", used: 0, quota: 8, color: "#F43F5E" },
      { type: "casual", label: "Casual", used: 0, quota: 10, color: "#E8962E" },
    ],
    payslip: null, announcements: [], notifications: [],
  }),
};

async function loadReal(role) {
  const data = empty[role]();
  if (role === "employee") return data;
  // Only headcount exists so far (from the users collection). Attendance, leave and payroll
  // modules will fill the rest by aggregating their own collections here.
  const snap = await getDocs(query(collection(db, COLLECTIONS.USERS), where("status", "==", "active")));
  const people = snap.docs.map((d) => d.data()).filter((u) => u.role !== "admin");
  data.kpis.headcount = kpi(people.length);
  return data;
}

export async function loadDashboard(role, profile, filters) {
  if (!DEMO_MODE) return loadReal(role);
  await new Promise((r) => setTimeout(r, 700)); // lets the skeleton show, like a real request
  if (role === "admin") return demoAdmin(filters);
  if (role === "hr") return demoHr(filters);
  return demoEmployee({ uid: profile?.uid });
}
