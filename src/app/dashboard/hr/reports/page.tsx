"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { FileText, Download, BarChart2, Users, DollarSign, Calendar } from "lucide-react";

export default function HRReports() {
  const { t } = useLanguage();

  const reports = [
    {
      title: t("payrollReport"), desc: t("payrollReportDesc"),
      icon: <DollarSign size={18} />, iconBg: "bg-emerald-500/10 text-emerald-400",
      actions: [
        { label: t("exportPdf"),   cls: "bg-emerald-500 hover:bg-emerald-400 text-black" },
        { label: t("exportExcel"), cls: "border border-gray-300 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/20 text-gray-600 dark:text-gray-300" },
      ],
      meta: `${t("lastGenerated")}: 20 Fév 2026`, badge: t("monthly"), badgeCls: "bg-emerald-500/15 text-emerald-400",
    },
    {
      title: t("absenceReport"), desc: t("absenceReportDesc"),
      icon: <Calendar size={18} />, iconBg: "bg-amber-500/10 text-amber-400",
      actions: [
        { label: t("exportExcel"), cls: "bg-amber-500 hover:bg-amber-400 text-black" },
        { label: t("exportPdf"),   cls: "border border-gray-300 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/20 text-gray-600 dark:text-gray-300" },
      ],
      meta: `${t("lastGenerated")}: 18 Fév 2026`, badge: t("monthly"), badgeCls: "bg-amber-500/15 text-amber-400",
    },
    {
      title: t("employeeList"), desc: t("employeeListDesc"),
      icon: <Users size={18} />, iconBg: "bg-blue-500/10 text-blue-400",
      actions: [
        { label: t("exportExcel"), cls: "bg-blue-500 hover:bg-blue-400 text-black" },
        { label: t("exportPdf"),   cls: "border border-gray-300 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/20 text-gray-600 dark:text-gray-300" },
      ],
      meta: `${t("lastGenerated")}: 20 Fév 2026`, badge: t("onDemand"), badgeCls: "bg-blue-500/15 text-blue-400",
    },
    {
      title: t("performanceReport"), desc: t("performanceReportDesc"),
      icon: <BarChart2 size={18} />, iconBg: "bg-purple-500/10 text-purple-400",
      actions: [
        { label: t("exportPdf"),   cls: "bg-purple-500 hover:bg-purple-400 text-black" },
        { label: t("exportExcel"), cls: "border border-gray-300 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/20 text-gray-600 dark:text-gray-300" },
      ],
      meta: `${t("lastGenerated")}: 15 Jan 2026`, badge: t("quarterly"), badgeCls: "bg-purple-500/15 text-purple-400",
    },
  ];

  const recentExports = [
    { name: "Payroll_Fev2026.pdf",  size: "1.2 MB", date: "20 Fév", icon: <DollarSign size={13} />, color: "text-emerald-400" },
    { name: "Employees_All.xlsx",   size: "540 KB",  date: "20 Fév", icon: <Users size={13} />,      color: "text-blue-400" },
    { name: "Absence_Fev2026.xlsx", size: "280 KB",  date: "18 Fév", icon: <Calendar size={13} />,   color: "text-amber-400" },
    { name: "Performance_Q1.pdf",   size: "890 KB",  date: "15 Jan", icon: <BarChart2 size={13} />,  color: "text-purple-400" },
    { name: "Payroll_Jan2026.pdf",  size: "1.1 MB",  date: "20 Jan", icon: <DollarSign size={13} />, color: "text-emerald-400" },
  ];

  const card = "bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-white/[0.06] rounded-2xl transition-colors duration-300";

  return (
    <ProtectedRoute allowedRoles={["HR_MANAGER"]}>
      <DashboardLayout>
        <div className="min-h-screen bg-gray-100 dark:bg-[#060a0f] text-gray-900 dark:text-white font-mono p-6 space-y-6 transition-colors duration-300">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight leading-none">
                HR <span className="text-emerald-400">{t("reports")}</span>
              </h1>
              <p className="text-xs text-gray-500 mt-1.5 uppercase tracking-widest">Fév 2026 · EMM ERP · v2.4</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-emerald-400 text-xs uppercase tracking-widest flex items-center gap-1.5">
              </span>
              <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 px-4 py-2 rounded-xl text-xs uppercase tracking-wide transition text-black font-bold">
                <Download size={13} /> {t("exportAll")}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            {[
              { label: t("totalReports"),   value: "4",  sub: t("available"),         icon: <FileText size={14} />,  iconBg: "bg-emerald-500/10 text-emerald-400" },
              { label: t("generatedToday"), value: "2",  sub: t("thisSession"),        icon: <Download size={14} />,  iconBg: "bg-blue-500/10 text-blue-400" },
              { label: t("monthlyExports"), value: "12", sub: t("thisMonth"),          icon: <Calendar size={14} />,  iconBg: "bg-purple-500/10 text-purple-400" },
              { label: t("pendingReports"), value: "1",  sub: t("notYetGenerated"),    icon: <BarChart2 size={14} />, iconBg: "bg-amber-500/10 text-amber-400" },
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

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {reports.map((r, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                  className={`${card} p-6 flex flex-col gap-4`}>
                  <div className="flex items-start justify-between">
                    <div className={`p-2.5 rounded-xl ${r.iconBg}`}>{r.icon}</div>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${r.badgeCls}`}>{r.badge}</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">{r.title}</h3>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{r.desc}</p>
                  </div>
                  <p className="text-[10px] text-gray-400 dark:text-gray-600">{r.meta}</p>
                  <div className="flex gap-2 mt-auto">
                    {r.actions.map((a, j) => (
                      <button key={j} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${a.cls}`}>
                        <Download size={11} /> {a.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className={`${card} p-6`}>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">{t("recentExports")}</h2>
              <p className="text-xs text-gray-500 mb-5">{t("latestFiles")}</p>
              <div className="space-y-1">
                {recentExports.map((f, i) => (
                  <div key={i} className={`flex items-center gap-3 py-3 ${i < recentExports.length - 1 ? "border-b border-gray-100 dark:border-white/[0.04]" : ""}`}>
                    <div className={`w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center flex-shrink-0 ${f.color}`}>
                      {f.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{f.name}</p>
                      <p className="text-[10px] text-gray-400 dark:text-gray-600">{f.size}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-[10px] text-gray-400 dark:text-gray-600">{f.date}</p>
                      <button className="text-[10px] text-emerald-400 hover:text-emerald-300 transition mt-0.5">{t("redownload")}</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}