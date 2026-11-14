// Demo data generator. Deterministic (same filters => same numbers) so the UI looks stable.
// Switch off with NEXT_PUBLIC_DEMO_DATA=false (the brief wants an empty system on fresh install).

export const DEPARTMENTS = [
  { id: "eng", name: "Engineering", size: 34, avg: 215000, color: "#6D5DF0" },
  { id: "sales", name: "Sales", size: 28, avg: 142000, color: "#12A08A" },
  { id: "ops", name: "Operations", size: 26, avg: 128000, color: "#E8962E" },
  { id: "sup", name: "Support", size: 18, avg: 98000, color: "#38BDF8" },
  { id: "fin", name: "Finance", size: 14, avg: 176000, color: "#F43F5E" },
  { id: "hr", name: "HR", size: 8, avg: 154000, color: "#94A3B8" },
];

export const RANGES = [
  { id: "7d", label: "7 days", points: 7, step: 1 },
  { id: "30d", label: "30 days", points: 10, step: 3 },
  { id: "90d", label: "90 days", points: 12, step: 7 },
];

const NAMES = ["Ayesha Khan", "Bilal Ahmed", "Sara Malik", "Hamza Raza", "Fatima Noor", "Usman Tariq", "Zainab Ali", "Ali Hassan", "Hira Siddiqui", "Omar Farooq"];

function makeRng(seed) {
  let s = 0;
  for (const c of String(seed)) s = (Math.imul(s, 31) + c.charCodeAt(0)) | 0;
  s = s || 123456789;
  return () => {
    s ^= s << 13; s ^= s >>> 17; s ^= s << 5;
    return ((s >>> 0) % 100000) / 100000;
  };
}
const sum = (a) => a.reduce((x, y) => x + y, 0);
const scope = (dept) => (dept === "all" ? DEPARTMENTS : DEPARTMENTS.filter((d) => d.id === dept));
const rangeOf = (id) => RANGES.find((r) => r.id === id) ?? RANGES[1];

function labelsFor(rangeId) {
  const r = rangeOf(rangeId);
  return Array.from({ length: r.points }, (_, k) => {
    const d = new Date();
    d.setDate(d.getDate() - (r.points - 1 - k) * r.step);
    return r.step === 1 ? d.toLocaleDateString("en-US", { weekday: "short" }) : d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  });
}
const series = (rnd, n, from, to, noise) =>
  Array.from({ length: n }, (_, i) => +(from + ((to - from) * i) / Math.max(1, n - 1) + (rnd() - 0.5) * noise).toFixed(1));

export const kpi = (value = 0, delta = null, spark = []) => ({ value, delta, spark });

/* ---------------- Admin ---------------- */
export function demoAdmin({ range, dept }) {
  const rnd = makeRng(`admin-${range}-${dept}`);
  const ds = scope(dept);
  const headcount = sum(ds.map((d) => d.size));
  const payroll = sum(ds.map((d) => d.size * d.avg));
  const labels = labelsFor(range);
  const hcSeries = series(rnd, labels.length, headcount * 0.9, headcount, 2).map(Math.round);
  hcSeries[hcSeries.length - 1] = headcount;
  const tenureShare = [0.24, 0.34, 0.26];
  const tenure = ["Under 1 year", "1 to 3 years", "3 to 5 years"].map((label, i) => ({ label, value: Math.round(headcount * tenureShare[i]) }));
  tenure.push({ label: "5+ years", value: headcount - sum(tenure.map((t) => t.value)) });
  const women = Math.round(headcount * 0.38);

  return {
    kind: "admin",
    kpis: {
      headcount: kpi(headcount, +(2 + rnd() * 3).toFixed(1), series(rnd, 8, headcount * 0.9, headcount, 2)),
      attrition: kpi(+(4.5 + rnd() * 3).toFixed(1), -(0.3 + rnd()).toFixed(1) * 1, series(rnd, 8, 8, 6, 1)),
      payrollCost: kpi(payroll, +(1.5 + rnd() * 2).toFixed(1), series(rnd, 8, payroll * 0.93, payroll, payroll * 0.01)),
      avgSalary: kpi(payroll / headcount, +(0.8 + rnd()).toFixed(1), series(rnd, 8, 0.95, 1, 0.01).map((m) => (payroll / headcount) * m)),
    },
    headcountTrend: labels.map((label, i) => ({ label, value: hcSeries[i] })),
    byDept: ds.map((d) => ({ label: d.name, value: d.size, color: d.color })),
    payrollByDept: ds.map((d) => ({ label: d.name, value: d.size * d.avg, color: d.color })),
    tenure,
    gender: [
      { label: "Women", value: women, color: "#6D5DF0" },
      { label: "Men", value: headcount - women, color: "#12A08A" },
    ],
    audit: [
      { actor: "Sara Malik", role: "HR", action: "Approved leave", entity: "Bilal Ahmed, casual 2 days", time: "4 min ago" },
      { actor: "Ayesha Khan", role: "HR", action: "Registered employee", entity: "Hira Siddiqui, Support", time: "26 min ago" },
      { actor: "You", role: "Admin", action: "Updated setting", entity: "Grace time 10 to 15 min", time: "1 h ago" },
      { actor: "Sara Malik", role: "HR", action: "Created payroll draft", entity: "October 2026", time: "3 h ago" },
      { actor: "You", role: "Admin", action: "Added holiday", entity: "Iqbal Day, 9 Nov", time: "Yesterday" },
      { actor: "Ayesha Khan", role: "HR", action: "Edited salary structure", entity: "Usman Tariq", time: "Yesterday" },
    ],
    notifications: [
      { id: 1, title: "October payroll draft is ready", body: "HR prepared it. Review and finalize.", time: "3 h ago", unread: true },
      { id: 2, title: "2 new employees registered", body: "Logins were created with temporary passwords.", time: "Yesterday", unread: true },
      { id: 3, title: "Holiday added: Iqbal Day", body: "Leave checks skip this date.", time: "2 days ago", unread: false },
    ],
  };
}

/* ---------------- HR ---------------- */
export function demoHr({ range, dept }) {
  const rnd = makeRng(`hr-${range}-${dept}`);
  const ds = scope(dept);
  const headcount = sum(ds.map((d) => d.size));
  const onLeave = Math.max(1, Math.round(headcount * 0.04));
  const late = Math.max(1, Math.round(headcount * 0.025));
  const present = Math.round(headcount * (0.86 + rnd() * 0.05));
  const labels = labelsFor(range);
  const rate = series(rnd, labels.length, 90, 94.5, 4).map((v) => Math.min(99, v));
  const pickName = (i) => NAMES[(i * 3 + Math.floor(rnd() * 3)) % NAMES.length];
  const deptName = () => ds[Math.floor(rnd() * ds.length)].name;
  const leaveScale = rangeOf(range).points * rangeOf(range).step / 30;
  const lateCounts = [9, 7, 6, 4, 3].map((n) => Math.max(1, Math.round(n * Math.max(0.4, leaveScale))));

  return {
    kind: "hr",
    kpis: {
      headcount: kpi(headcount, null, series(rnd, 8, headcount * 0.95, headcount, 1)),
      present: kpi(present, null, series(rnd, 8, present * 0.95, present, 3)),
      onLeave: kpi(onLeave, null, series(rnd, 8, onLeave * 0.8, onLeave, 2)),
      late: kpi(late, null, series(rnd, 8, late * 1.4, late, 1.5)),
      pending: kpi(5, null, []),
    },
    trend: labels.map((label, i) => ({ label, value: rate[i] })),
    absenteeism: ds.map((d) => ({ label: d.name, value: +(1.2 + rnd() * 4.2).toFixed(1), color: d.color })),
    leaveByType: [
      { label: "Annual", value: Math.round(headcount * 0.42 * leaveScale), color: "#6D5DF0" },
      { label: "Casual", value: Math.round(headcount * 0.3 * leaveScale), color: "#E8962E" },
      { label: "Sick", value: Math.round(headcount * 0.22 * leaveScale), color: "#F43F5E" },
      { label: "Unpaid", value: Math.max(1, Math.round(headcount * 0.05 * leaveScale)), color: "#94A3B8" },
    ],
    lateComers: lateCounts.map((count, i) => ({ name: pickName(i), dept: deptName(), count })),
    onLeaveToday: Array.from({ length: onLeave }, (_, i) => ({ name: NAMES[(i + 2) % NAMES.length], type: i < Math.ceil(onLeave * 0.6) ? "casual" : "sick" })),
    pending: [
      { id: "r1", name: "Bilal Ahmed", type: "Casual", from: "17 Nov", to: "18 Nov", days: 2, reason: "Family wedding" },
      { id: "r2", name: "Zainab Ali", type: "Sick", from: "16 Nov", to: "16 Nov", days: 1, reason: "Fever and rest" },
      { id: "r3", name: "Omar Farooq", type: "Annual", from: "23 Nov", to: "27 Nov", days: 5, reason: "Travel to Lahore" },
      { id: "r4", name: "Hira Siddiqui", type: "Casual", from: "20 Nov", to: "20 Nov", days: 1, reason: "Bank and paperwork" },
      { id: "r5", name: "Hamza Raza", type: "Annual", from: "30 Nov", to: "2 Dec", days: 3, reason: "Short family trip" },
    ],
    notifications: [
      { id: 1, title: "5 leave requests need a decision", body: "Oldest request is 2 days old.", time: "Just now", unread: true },
      { id: 2, title: "3 attendance corrections pending", body: "Submitted by employees this week.", time: "2 h ago", unread: true },
      { id: 3, title: "Payroll month closes in 6 days", body: "Create the draft before the 20th.", time: "Yesterday", unread: false },
    ],
  };
}

/* ---------------- Employee ---------------- */
export function demoEmployee({ uid = "me" }) {
  const rnd = makeRng(`emp-${uid}`);
  const hours = [8.2, 7.6, 8.5, 6.9, 0, 0, 0].map((h, i) => (i < 4 ? +(h + (rnd() - 0.5) * 0.4).toFixed(1) : 0));
  return {
    kind: "employee",
    week: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((label, i) => ({ label, value: hours[i] })),
    weekTarget: 40,
    lateCount: 2,
    leave: [
      { type: "annual", label: "Annual", used: 4, quota: 14, color: "#6D5DF0" },
      { type: "sick", label: "Sick", used: 2, quota: 8, color: "#F43F5E" },
      { type: "casual", label: "Casual", used: 3, quota: 10, color: "#E8962E" },
    ],
    payslip: { month: "October 2026", basic: 100000, allowances: 50000, gross: 150000, tax: 10000, deductions: 0, net: 140000 },
    announcements: [
      { id: 1, title: "Iqbal Day holiday on 9 November", body: "Office stays closed. Leave checks skip the date.", time: "5 days ago", by: "Admin" },
      { id: 2, title: "October payslips are available", body: "Download yours from the Payslips page.", time: "3 days ago", by: "HR" },
      { id: 3, title: "Office hours reminder", body: "Day starts at 09:00 with a 15 minute grace time.", time: "2 weeks ago", by: "Admin" },
    ],
    notifications: [
      { id: 1, title: "Your casual leave was approved", body: "Comment from HR: enjoy the wedding.", time: "2 h ago", unread: true },
      { id: 2, title: "October payslip is ready", body: "Net pay PKR 140,000.", time: "3 days ago", unread: true },
    ],
  };
}
