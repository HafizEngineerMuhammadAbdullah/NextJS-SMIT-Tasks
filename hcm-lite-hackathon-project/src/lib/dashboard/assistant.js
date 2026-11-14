import { pkrCompact, pct } from "@/lib/format";

const POLICY =
  "Office starts at 09:00 with a 15 minute grace time, so you are late after 09:15. A day under 5 hours is a half day. The weekend is Saturday and Sunday. Yearly quotas: annual 14, sick 8, casual 10, unpaid is unlimited.";

// Local stand-in for POST /ai/chat. It answers only from the dashboard data the user can already see,
// which is the same rule the real backend must follow (tools run with the user's scope).
export function answer(question, { role, data, profile }) {
  const s = question.toLowerCase();
  const first = profile?.firstName ?? "there";

  if (role === "employee" && /salary|pay of|earns?|paid/.test(s) && !/\b(my|mine)\b/.test(s)) {
    return "I can't share another person's salary. I can only use your own records and company policy.";
  }
  if (/\b(my)\b/.test(s) && /salary|payslip|net pay/.test(s) && data?.payslip) {
    return `Your ${data.payslip.month} payslip shows gross PKR ${data.payslip.gross.toLocaleString()} and net PKR ${data.payslip.net.toLocaleString()}.`;
  }
  if (/grace|late after|marked late|office (hours|start)|weekend|quota|policy|half day/.test(s)) return POLICY;

  if (/on leave|leave today/.test(s)) {
    if (role === "employee") return "I can only see your own leave. Ask HR who is away today.";
    const list = data?.onLeaveToday ?? [];
    if (!list.length) return "No leave records for today yet.";
    return `${list.length} employees are on leave today: ${list.map((p) => `${p.name} (${p.type})`).join(", ")}.`;
  }
  if (/late/.test(s) && role !== "employee") {
    const top = data?.lateComers?.[0];
    return top ? `${top.name} (${top.dept}) was late most often, ${top.count} times in this period.` : "No late arrivals recorded yet.";
  }
  if (/headcount|how many.*employees|active employees/.test(s) && role !== "employee") {
    const n = data?.kpis?.headcount?.value ?? 0;
    return n ? `There are ${n} active employees.` : "No employees are registered yet.";
  }
  if (/attendance rate/.test(s) && role === "hr") {
    const t = data?.trend ?? [];
    return t.length ? `The latest attendance rate is ${pct(t[t.length - 1].value)}.` : "There is no attendance data yet.";
  }
  if (/payroll|cost/.test(s) && role === "admin") {
    const v = data?.kpis?.payrollCost?.value;
    return v ? `Monthly gross payroll is ${pkrCompact(v)}.` : "No payroll data yet.";
  }
  if (role === "employee" && /sick|annual|casual|leave|balance|left/.test(s)) {
    const pick = (data?.leave ?? []).find((l) => s.includes(l.type));
    if (pick) return `You have ${pick.quota - pick.used} ${pick.label.toLowerCase()} leave days left this year (${pick.used} of ${pick.quota} used).`;
    return (data?.leave ?? []).map((l) => `${l.label}: ${l.quota - l.used} left`).join(", ") + ".";
  }
  return `Sorry ${first}, I don't know that. I can answer from your dashboard data and the company's attendance, leave and payroll rules.`;
}

export function summarize(data) {
  if (!data) return [];
  if (data.kind === "admin") {
    const hc = data.kpis.headcount.value;
    if (!hc) return ["Not enough data yet. Register employees to see insights."];
    const top = [...data.byDept].sort((a, b) => b.value - a.value)[0];
    const topPay = [...data.payrollByDept].sort((a, b) => b.value - a.value)[0];
    const share = Math.round((topPay.value / data.kpis.payrollCost.value) * 100);
    return [
      `Headcount is ${hc} across ${data.byDept.length} department${data.byDept.length > 1 ? "s" : ""}. ${top.label} is the largest with ${top.value}.`,
      `Monthly gross payroll is ${pkrCompact(data.kpis.payrollCost.value)}, averaging ${pkrCompact(data.kpis.avgSalary.value)} per employee.`,
      `${topPay.label} makes up ${share}% of payroll cost.`,
      `Attrition year to date is ${pct(data.kpis.attrition.value)}.`,
    ];
  }
  if (data.kind === "hr") {
    const k = data.kpis;
    if (!k.headcount.value) return ["Not enough data yet. Register employees and record attendance to see insights."];
    const t = data.trend;
    const bullets = [
      `${k.present.value} of ${k.headcount.value} employees are present today. ${k.onLeave.value} are on leave and ${k.late.value} arrived late.`,
    ];
    if (t.length) bullets.push(`Attendance rate moved from ${pct(t[0].value)} to ${pct(t[t.length - 1].value)} over this period.`);
    if (data.lateComers[0]) bullets.push(`${data.lateComers[0].name} was late most often (${data.lateComers[0].count} times).`);
    bullets.push(`${k.pending.value} leave request${k.pending.value === 1 ? "" : "s"} still need a decision.`);
    return bullets;
  }
  return [];
}
