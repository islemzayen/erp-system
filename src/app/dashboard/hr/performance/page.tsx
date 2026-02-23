"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { DollarSign, Search, FileText, Download, TrendingUp, AlertCircle } from "lucide-react";
import { useState } from "react";

const payrollData = [
  { employee: "Amira Benali",     base: "3,200", bonus: "480", deductions: "320", net: "3,360", status: "Paid",     month: "Fév 2026" },
  { employee: "Nour Hamdi",       base: "2,600", bonus: "300", deductions: "260", net: "2,640", status: "Paid",     month: "Fév 2026" },
  { employee: "Yasmine Chaabane", base: "2,200", bonus: "200", deductions: "220", net: "2,180", status: "Pending",  month: "Fév 2026" },
  { employee: "Ines Jebali",      base: "2,800", bonus: "0",   deductions: "280", net: "2,520", status: "On Leave", month: "Fév 2026" },
  { employee: "Khalil Mansouri",  base: "3,500", bonus: "600", deductions: "350", net: "3,750", status: "Paid",     month: "Fév 2026" },
  { employee: "Tarek Jebali",     base: "2,000", bonus: "150", deductions: "200", net: "1,950", status: "Pending",  month: "Fév 2026" },
  { employee: "Sarra Tlili",      base: "2,900", bonus: "400", deductions: "290", net: "3,010", status: "Paid",     month: "Fév 2026" },
  { employee: "Fares Dridi",      base: "3,800", bonus: "0",   deductions: "380", net: "3,420", status: "Hold",     month: "Fév 2026" },
];

const AVATAR_COLORS = [
  "bg-emerald-500/20 text-emerald-400","bg-blue-500/20 text-blue-400","bg-purple-500/20 text-purple-400",
  "bg-amber-500/20 text-amber-400","bg-pink-500/20 text-pink-400","bg-teal-500/20 text-teal-400",
  "bg-red-500/20 text-red-400","bg-indigo-500/20 text-indigo-400",
];
const STATUS_STYLES: Record<string, { badge: string; dot: string }> = {
  Paid:       { badge: "bg-emerald-500/15 text-emerald-400", dot: "bg-emerald-400" },
  Pending:    { badge: "bg-amber-500/15 text-amber-400",     dot: "bg-amber-400" },
  "On Leave": { badge: "bg-blue-500/15 text-blue-400",       dot: "bg-blue-400" },
  Hold:       { badge: "bg-red-500/15 text-red-400",         dot: "bg-red-400" },
};

export default function HRPayroll() {
  const { t } = useLanguage();
  const [search, setSearch]       = useState("");
  const [filterStatus, setFilter] = useState("all");

  const filtered = payrollData.filter((r) => {
    const matchSearch = r.employee.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || r.status.toLowerCase().replace(" ", "-") === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalNet   = payrollData.reduce((s, r) => s + parseFloat(r.net.replace(",", "")), 0);
  const totalBonus = payrollData.reduce((s, r) => s + parseFloat(r.bonus.replace(",", "")), 0);
  const paidCount  = payrollData.filter(r => r.status === "Paid").length;

  const card = "bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-white/[0.06] rounded-2xl transition-colors duration-300";

  const statusLabel = (s: string) => {
    const map: Record<string, string> = { Paid: t("paid"), Pending: t("pending"), "On Leave": t("onLeave"), Hold: t("hold") };
    return map[s] ?? s;
  };

  return (
    <ProtectedRoute allowedRoles={["HR_MANAGER"]}>
      <DashboardLayout>
        <div className="min-h-screen bg-gray-100 dark:bg-[#060a0f] text-gray-900 dark:text-white font-mono p-6 space-y-6 transition-colors duration-300">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight leading-none">
                {t("payroll")} <span className="text-emerald-400">{t("payrollManagement").split(" ").slice(1).join(" ")}</span>
              </h1>
              <p className="text-xs text-gray-500 mt-1.5 uppercase tracking-widest">Fév 2026 · EMM ERP · v2.4</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-emerald-400 text-xs uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse inline-block" />{t("live")}
              </span>
              <button className="flex items-center gap-2 border border-gray-300 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/20 px-4 py-2 rounded-xl text-xs uppercase tracking-wide transition text-gray-600 dark:text-gray-300">
                <Download size={13} /> {t("export")}
              </button>
              <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 px-4 py-2 rounded-xl text-xs uppercase tracking-wide transition text-black font-bold">
                <FileText size={13} /> {t("generatePayslips")}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            {[
              { label: t("totalNetPayroll"), value: `${totalNet.toLocaleString()} TND`,   sub: t("thisMonth"),      icon: <DollarSign size={14} />,  iconBg: "bg-emerald-500/10 text-emerald-400" },
              { label: t("totalBonuses"),    value: `${totalBonus.toLocaleString()} TND`, sub: t("distributed"),    icon: <TrendingUp size={14} />,  iconBg: "bg-blue-500/10 text-blue-400" },
              { label: t("slipsPaid"),       value: `${paidCount} / ${payrollData.length}`, sub: t("processed"),    icon: <FileText size={14} />,    iconBg: "bg-purple-500/10 text-purple-400" },
              { label: t("pendingHold"),     value: String(payrollData.filter(r => r.status === "Pending" || r.status === "Hold").length), sub: t("requiresAction"), icon: <AlertCircle size={14} />, iconBg: "bg-amber-500/10 text-amber-400" },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className={`${card} px-5 py-4 flex items-center gap-4`}>
                <div className={`p-2 rounded-xl ${s.iconBg}`}>{s.icon}</div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-0.5">{s.label}</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">{s.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className={`${card} overflow-hidden`}>
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-white/[0.05]">
              <div>
                <h2 className="text-base font-bold text-gray-900 dark:text-white">{t("payrollRecords")}</h2>
                <p className="text-xs text-gray-500">{filtered.length} {t("ofText")} {payrollData.length} {t("employees")}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input className="pl-8 pr-3 py-1.5 bg-gray-100 dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-lg text-xs focus:outline-none focus:border-emerald-500/40 transition text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600"
                    placeholder={t("searchEmployee")} value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <select className="px-3 py-1.5 bg-gray-100 dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-lg text-xs text-gray-600 dark:text-gray-300 focus:outline-none transition"
                  value={filterStatus} onChange={(e) => setFilter(e.target.value)}>
                  <option value="all">{t("allStatus")}</option>
                  <option value="paid">{t("paid")}</option>
                  <option value="pending">{t("pending")}</option>
                  <option value="on-leave">{t("onLeave")}</option>
                  <option value="hold">{t("hold")}</option>
                </select>
              </div>
            </div>

            <div className="grid px-6 py-3 text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-600 border-b border-gray-100 dark:border-white/[0.04]"
              style={{ gridTemplateColumns: "2fr 1.2fr 1fr 1.2fr 1.2fr 1fr 1fr" }}>
              <span>{t("employee")}</span><span>{t("baseTND")}</span><span>{t("bonus")}</span>
              <span>{t("deductions")}</span><span>{t("netTND")}</span><span>{t("status")}</span><span>{t("month")}</span>
            </div>

            {filtered.length === 0 ? (
              <div className="py-12 text-center text-xs text-gray-400">{t("noPayrollMatch")}</div>
            ) : (
              filtered.map((row, i) => {
                const sc = STATUS_STYLES[row.status];
                return (
                  <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                    className={`grid px-6 py-4 items-center hover:bg-gray-50 dark:hover:bg-white/[0.02] transition ${i < filtered.length - 1 ? "border-b border-gray-100 dark:border-white/[0.03]" : ""}`}
                    style={{ gridTemplateColumns: "2fr 1.2fr 1fr 1.2fr 1.2fr 1fr 1fr" }}>
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}>
                        {row.employee.split(" ").map(n => n[0]).join("")}
                      </div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{row.employee}</p>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300">{row.base}</p>
                    <p className="text-xs text-emerald-400 font-bold">+{row.bonus}</p>
                    <p className="text-xs text-red-400">-{row.deductions}</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{row.net}</p>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold w-fit ${sc.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />{statusLabel(row.status)}
                    </span>
                    <p className="text-[10px] text-gray-400 dark:text-gray-600">{row.month}</p>
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