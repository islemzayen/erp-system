// ─── HR ATTENDANCE ─────────────────────────────────────────────────────────
"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { CalendarDays, Search, CheckCircle, Download, Clock, AlertCircle, UserCheck } from "lucide-react";
import { useState } from "react";

const attendanceData = [
  { employee: "Amira Benali",     date: "01 Fév 2026", type: "Annual Leave",  hours: "8h", status: "Approved", dept: "HR"        },
  { employee: "Nour Hamdi",       date: "02 Fév 2026", type: "Sick Leave",    hours: "8h", status: "Approved", dept: "HR"        },
  { employee: "Yasmine Chaabane", date: "03 Fév 2026", type: "Remote Work",   hours: "8h", status: "Pending",  dept: "HR"        },
  { employee: "Ines Jebali",      date: "04 Fév 2026", type: "Sick Leave",    hours: "8h", status: "Approved", dept: "HR"        },
  { employee: "Khalil Mansouri",  date: "05 Fév 2026", type: "Annual Leave",  hours: "8h", status: "Approved", dept: "Marketing" },
  { employee: "Tarek Jebali",     date: "06 Fév 2026", type: "Unpaid Leave",  hours: "4h", status: "Pending",  dept: "Marketing" },
  { employee: "Sarra Tlili",      date: "07 Fév 2026", type: "Remote Work",   hours: "8h", status: "Approved", dept: "Sales"     },
  { employee: "Fares Dridi",      date: "08 Fév 2026", type: "Unauthorized",  hours: "8h", status: "Rejected", dept: "Sales"     },
  { employee: "Lina Sfar",        date: "10 Fév 2026", type: "Annual Leave",  hours: "8h", status: "Pending",  dept: "Marketing" },
  { employee: "Aziz Trabelsi",    date: "12 Fév 2026", type: "Sick Leave",    hours: "8h", status: "Approved", dept: "Marketing" },
];

const STATUS_STYLES: Record<string, { badge: string; dot: string }> = {
  Approved: { badge: "bg-emerald-500/15 text-emerald-400", dot: "bg-emerald-400" },
  Pending:  { badge: "bg-amber-500/15 text-amber-400",     dot: "bg-amber-400" },
  Rejected: { badge: "bg-red-500/15 text-red-400",         dot: "bg-red-400" },
};

const TYPE_STYLES: Record<string, string> = {
  "Annual Leave": "bg-blue-500/15 text-blue-400",
  "Sick Leave":   "bg-amber-500/15 text-amber-400",
  "Remote Work":  "bg-purple-500/15 text-purple-400",
  "Unpaid Leave": "bg-gray-500/15 text-gray-400",
  "Unauthorized": "bg-red-500/15 text-red-400",
};

const AVATAR_COLORS = [
  "bg-emerald-500/20 text-emerald-400","bg-blue-500/20 text-blue-400","bg-purple-500/20 text-purple-400",
  "bg-amber-500/20 text-amber-400","bg-pink-500/20 text-pink-400","bg-teal-500/20 text-teal-400",
  "bg-red-500/20 text-red-400","bg-indigo-500/20 text-indigo-400","bg-cyan-500/20 text-cyan-400","bg-orange-500/20 text-orange-400",
];

export default function HRAttendance() {
  const { t } = useLanguage();
  const [search, setSearch]       = useState("");
  const [filterStatus, setFilter] = useState("all");
  const [filterType, setType]     = useState("all");

  const filtered = attendanceData.filter((r) => {
    const matchSearch =
      r.employee.toLowerCase().includes(search.toLowerCase()) ||
      r.dept.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || r.status.toLowerCase() === filterStatus;
    const matchType   = filterType === "all" || r.type.toLowerCase().replace(/ /g, "-") === filterType;
    return matchSearch && matchStatus && matchType;
  });

  const card = "bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-white/[0.06] rounded-2xl transition-colors duration-300";

  const statusLabel = (s: string) =>
    s === "Approved" ? t("approved") : s === "Pending" ? t("pending") : t("rejected");
  const typeLabel = (type: string) => {
    const map: Record<string, string> = {
      "Annual Leave": t("annualLeave"), "Sick Leave": t("sickLeave"),
      "Remote Work": t("remoteWork"), "Unpaid Leave": t("unpaidLeave"), "Unauthorized": t("unauthorized"),
    };
    return map[type] ?? type;
  };

  return (
    <ProtectedRoute allowedRoles={["HR_MANAGER"]}>
      <DashboardLayout>
        <div className="min-h-screen bg-gray-100 dark:bg-[#060a0f] text-gray-900 dark:text-white font-mono p-6 space-y-6 transition-colors duration-300">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight leading-none">
                {t("attendance")} <span className="text-emerald-400">&amp; {t("reports")}</span>
              </h1>
              <p className="text-xs text-gray-500 mt-1.5 uppercase tracking-widest">Fév 2026 · EMM ERP · v2.4</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-emerald-400 text-xs uppercase tracking-widest flex items-center gap-1.5">
              </span>
              <button className="flex items-center gap-2 border border-gray-300 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/20 px-4 py-2 rounded-xl text-xs uppercase tracking-wide transition text-gray-600 dark:text-gray-300">
                <Download size={13} /> {t("export")}
              </button>
              <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 px-4 py-2 rounded-xl text-xs uppercase tracking-wide transition text-black font-bold">
                <CheckCircle size={13} /> {t("approveRequests")}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            {[
              { label: t("totalRequests"),  value: String(attendanceData.length),                                        sub: t("thisMonth"),       icon: <CalendarDays size={14} />, iconBg: "bg-emerald-500/10 text-emerald-400" },
              { label: t("approvedKpi"),    value: String(attendanceData.filter(r => r.status === "Approved").length),   sub: t("processed"),       icon: <UserCheck size={14} />,    iconBg: "bg-blue-500/10 text-blue-400" },
              { label: t("pendingKpi"),     value: String(attendanceData.filter(r => r.status === "Pending").length),    sub: t("awaitingAction"),  icon: <Clock size={14} />,        iconBg: "bg-amber-500/10 text-amber-400" },
              { label: t("rejectedKpi"),    value: String(attendanceData.filter(r => r.status === "Rejected").length),   sub: t("notApproved"),     icon: <AlertCircle size={14} />,  iconBg: "bg-red-500/10 text-red-400" },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className={`${card} px-5 py-4 flex items-center gap-4`}>
                <div className={`p-2 rounded-xl ${s.iconBg}`}>{s.icon}</div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-0.5">{s.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{s.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className={`${card} overflow-hidden`}>
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-5 border-b border-gray-200 dark:border-white/[0.05]">
              <div>
                <h2 className="text-base font-bold text-gray-900 dark:text-white">{t("attendanceRecords")}</h2>
                <p className="text-xs text-gray-500">{filtered.length} {t("ofText")} {attendanceData.length}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input className="pl-8 pr-3 py-1.5 bg-gray-100 dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-lg text-xs focus:outline-none focus:border-emerald-500/40 transition text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600"
                    placeholder={t("searchEmployee")} value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <select className="px-3 py-1.5 bg-gray-100 dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-lg text-xs text-gray-600 dark:text-gray-300 focus:outline-none focus:border-emerald-500/40 transition"
                  value={filterStatus} onChange={(e) => setFilter(e.target.value)}>
                  <option value="all">{t("allStatus")}</option>
                  <option value="approved">{t("approved")}</option>
                  <option value="pending">{t("pending")}</option>
                  <option value="rejected">{t("rejected")}</option>
                </select>
                <select className="px-3 py-1.5 bg-gray-100 dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-lg text-xs text-gray-600 dark:text-gray-300 focus:outline-none focus:border-emerald-500/40 transition"
                  value={filterType} onChange={(e) => setType(e.target.value)}>
                  <option value="all">{t("allTypes")}</option>
                  <option value="annual-leave">{t("annualLeave")}</option>
                  <option value="sick-leave">{t("sickLeave")}</option>
                  <option value="remote-work">{t("remoteWork")}</option>
                  <option value="unpaid-leave">{t("unpaidLeave")}</option>
                  <option value="unauthorized">{t("unauthorized")}</option>
                </select>
              </div>
            </div>

            <div className="grid px-6 py-3 text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-600 border-b border-gray-100 dark:border-white/[0.04]"
              style={{ gridTemplateColumns: "2fr 1.5fr 1.5fr 0.8fr 1.2fr 1fr" }}>
              <span>{t("employee")}</span><span>{t("date")}</span><span>{t("type")}</span>
              <span>{t("hours")}</span><span>{t("status")}</span><span>{t("dept")}</span>
            </div>

            {filtered.length === 0 ? (
              <div className="py-12 text-center text-xs text-gray-400">{t("noAttendanceMatch")}</div>
            ) : (
              filtered.map((row, i) => {
                const sc = STATUS_STYLES[row.status];
                const tc = TYPE_STYLES[row.type] ?? "bg-gray-500/15 text-gray-400";
                return (
                  <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                    className={`grid px-6 py-4 items-center hover:bg-gray-50 dark:hover:bg-white/[0.02] transition ${i < filtered.length - 1 ? "border-b border-gray-100 dark:border-white/[0.03]" : ""}`}
                    style={{ gridTemplateColumns: "2fr 1.5fr 1.5fr 0.8fr 1.2fr 1fr" }}>
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}>
                        {row.employee.split(" ").map(n => n[0]).join("")}
                      </div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{row.employee}</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{row.date}</p>
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold w-fit ${tc}`}>{typeLabel(row.type)}</span>
                    <p className="text-xs text-gray-700 dark:text-gray-300 font-bold">{row.hours}</p>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold w-fit ${sc.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />{statusLabel(row.status)}
                    </span>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{row.dept}</p>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}