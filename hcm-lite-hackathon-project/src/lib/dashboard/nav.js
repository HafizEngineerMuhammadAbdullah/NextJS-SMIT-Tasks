import { FiGrid, FiUsers, FiClock, FiCalendar, FiDollarSign, FiBell, FiShield, FiSettings, FiUser, FiFileText } from "react-icons/fi";

const dash = { id: "", label: "Dashboard", icon: FiGrid };

export const NAV = {
  admin: [
    dash,
    { id: "employees", label: "Employees", icon: FiUsers },
    { id: "attendance", label: "Attendance", icon: FiClock },
    { id: "leave", label: "Leave", icon: FiCalendar },
    { id: "payroll", label: "Payroll", icon: FiDollarSign },
    { id: "announcements", label: "Announcements", icon: FiBell },
    { id: "audit-log", label: "Audit log", icon: FiShield },
    { id: "company-setup", label: "Company setup", icon: FiSettings },
  ],
  hr: [
    dash,
    { id: "employees", label: "Employees", icon: FiUsers },
    { id: "attendance", label: "Attendance", icon: FiClock },
    { id: "leave", label: "Leave approvals", icon: FiCalendar },
    { id: "payroll", label: "Payroll draft", icon: FiDollarSign },
    { id: "announcements", label: "Announcements", icon: FiBell },
  ],
  employee: [
    dash,
    { id: "attendance", label: "My attendance", icon: FiClock },
    { id: "leave", label: "My leave", icon: FiCalendar },
    { id: "payslips", label: "Payslips", icon: FiFileText },
    { id: "announcements", label: "Announcements", icon: FiBell },
    { id: "profile", label: "My profile", icon: FiUser },
  ],
};

export const hrefFor = (role, id) => (id ? `/dashboard/${role}/${id}` : `/dashboard/${role}`);
