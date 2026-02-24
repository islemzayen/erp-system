"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { DollarSign, Clock, AlertCircle, RefreshCw, Download, Plus } from "lucide-react";
import { useState } from "react";
import {
  LineChart, Line, BarChart as ReBarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

function Sparkline({ data, dataKey, color }: { data: any[]; dataKey: string; color: string }) {
  return (
    <ResponsiveContainer width="100%" height={48}>
      <LineChart data={data}>
        <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default function HRDashboardPage() {
const { t, language } = useLanguage();  const [activeRange, setActiveRange] = useState<"6m" | "3m" | "1m">("6m");

  const payrollSparkData   = [{ v:29000 },{ v:31000 },{ v:28500 },{ v:33000 },{ v:35000 },{ v:32000 }];
  const hoursSparkData     = [{ v:155 },{ v:162 },{ v:158 },{ v:170 },{ v:165 },{ v:172 }];
  const leavesSparkData    = [{ v:8 },{ v:5 },{ v:11 },{ v:7 },{ v:3 },{ v:6 }];
  const attritionSparkData = [{ v:4 },{ v:2 },{ v:6 },{ v:3 },{ v:5 },{ v:7 }];

  const payrollMonthly = [
    { month: "Jan", payroll: 32000 },{ month: "Fév", payroll: 29500 },{ month: "Mar", payroll: 35000 },
    { month: "Avr", payroll: 38000 },{ month: "Mai", payroll: 36000 },{ month: "Jun", payroll: 40000 },
  ];
  const performanceMonthly = [
    { month: "Jan", performance: 78 },{ month: "Fév", performance: 82 },{ month: "Mar", performance: 88 },
    { month: "Avr", performance: 91 },{ month: "Mai", performance: 86 },{ month: "Jun", performance: 90 },
  ];
  const topEmployees = [
    { name: "Amira Benali",    dept: "HR",        score: 96 },
    { name: "Khalil Mansouri", dept: "Marketing", score: 91 },
    { name: "Sarra Tlili",     dept: "Sales",     score: 88 },
    { name: "Nour Hamdi",      dept: "HR",        score: 85 },
    { name: "Tarek Jebali",    dept: "Marketing", score: 82 },
  ];
  const maxScore = 96;
  const tooltipStyle = { backgroundColor: "#0d1117", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "10px", fontSize: "11px" };
  const card = "bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-white/[0.06] rounded-2xl transition-colors duration-300";

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-100 dark:bg-[#060a0f] text-gray-900 dark:text-white font-mono p-6 space-y-6 transition-colors duration-300">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight leading-none">
  {language === "fr" ? (
    <>{t("dashboard")} <span className="text-emerald-400">{t("hr")}</span></>
  ) : (
    <>{t("hr")} <span className="text-emerald-400">{t("dashboard")}</span></>
  )}
</h1>
            <p className="text-xs text-gray-500 mt-1.5 uppercase tracking-widest">Fév 2026 · EMM ERP · v2.4</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-emerald-400 text-xs uppercase tracking-widest flex items-center gap-1.5">
            </span>
            <button className="flex items-center gap-2 border border-gray-300 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/20 px-4 py-2 rounded-xl text-xs uppercase tracking-wide transition text-gray-600 dark:text-gray-300">
              <Download size={13} /> {t("exportCsv")}
            </button>
            <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 px-4 py-2 rounded-xl text-xs uppercase tracking-wide transition text-black font-bold">
              <Plus size={13} /> {t("addEmployee")}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { icon: <DollarSign size={16} />, iconBg: "bg-emerald-500/10 text-emerald-400", badge: "+5.3%",    badgeColor: "text-emerald-400", label: t("pendingPayroll"),   value: "32,000", valueColor: "text-emerald-400", spark: payrollSparkData,   sparkColor: "#10b981" },
            { icon: <Clock size={16} />,       iconBg: "bg-blue-500/10 text-blue-400",       badge: "+8.2%",    badgeColor: "text-blue-400",    label: t("workingHours"),     value: "822h",   valueColor: "text-blue-400",    spark: hoursSparkData,     sparkColor: "#60a5fa" },
            { icon: <AlertCircle size={16} />, iconBg: "bg-amber-500/10 text-amber-400",     badge: "-3 today", badgeColor: "text-amber-400",   label: t("onLeave"),          value: "6",      valueColor: "text-amber-400",   spark: leavesSparkData,    sparkColor: "#f59e0b" },
            { icon: <RefreshCw size={16} />,   iconBg: "bg-red-500/10 text-red-400",         badge: "-40%",     badgeColor: "text-red-400",     label: t("attrition"),        value: "3",      valueColor: "text-red-400",     spark: attritionSparkData, sparkColor: "#f87171" },
          ].map((kpi, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className={`${card} p-5 flex flex-col gap-3`}>
              <div className="flex items-start justify-between">
                <div className={`p-2 rounded-xl ${kpi.iconBg}`}>{kpi.icon}</div>
                <span className={`text-xs font-bold ${kpi.badgeColor}`}>{kpi.badge}</span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-gray-500">{kpi.label}</p>
              <p className={`text-3xl font-bold tracking-tight ${kpi.valueColor}`}>{kpi.value}</p>
              <div className="-mx-1"><Sparkline data={kpi.spark} dataKey="v" color={kpi.sparkColor} /></div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { label: t("totalEmployeesKpi"),  value: "124",    sub: t("activeWorkforce") },
            { label: t("performanceScore"),   value: "87%",    sub: "+2.1% vs last month" },
            { label: t("newHires"),           value: "8",      sub: t("thisMonth") },
            { label: t("avgTenure"),          value: "3.4 yr", sub: t("avgPerEmployee") },
          ].map((s, i) => (
            <div key={i} className={`${card} px-5 py-4`}>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">{s.label}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className={`${card} p-6 xl:col-span-2 space-y-2`}>
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-base font-bold text-gray-900 dark:text-white">{t("payrollOverview")}</h2>
                <p className="text-xs text-gray-500">{t("monthlyPerformance")}</p>
              </div>
              <div className="flex gap-1">
                {(["6m", "3m", "1m"] as const).map((r) => (
                  <button key={r} onClick={() => setActiveRange(r)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition ${activeRange === r ? "bg-emerald-500 text-black" : "text-gray-400 hover:text-gray-900 dark:hover:text-white"}`}>
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-8 py-2">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-500">{t("totalPayroll")}</p>
                <p className="text-2xl font-bold text-emerald-400">190,500 TND</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-500">{t("avgPerformance")}</p>
                <p className="text-2xl font-bold text-blue-400">87%</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">{t("payrollTND")}</p>
                <ResponsiveContainer width="100%" height={180}>
                  <ReBarChart data={payrollMonthly}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#9ca3af" tick={{ fontSize: 11 }} />
                    <YAxis stroke="#9ca3af" tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={tooltipStyle} formatter={(v: any) => [`${Number(v).toLocaleString()} TND`, t("payroll")]} />
                    <Bar dataKey="payroll" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </ReBarChart>
                </ResponsiveContainer>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">{t("performanceScoreChart")}</p>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={performanceMonthly}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#9ca3af" tick={{ fontSize: 11 }} />
                    <YAxis stroke="#9ca3af" tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Line type="monotone" dataKey="performance" stroke="#60a5fa" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className={`${card} p-6`}>
            <h2 className="text-base font-bold text-gray-900 dark:text-white">{t("topPerformers")}</h2>
            <p className="text-xs text-gray-500 mb-5">{t("performanceScoreThisMonth")}</p>
            <div className="space-y-5">
              {topEmployees.map((emp, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-1.5">
                    <div>
                      <span className="text-gray-400 text-xs mr-2">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{emp.name}</span>
                    </div>
                    <span className="text-emerald-400 text-sm font-bold">{emp.score}</span>
                  </div>
                  <div className="h-1 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${(emp.score / maxScore) * 100}%` }}
                      transition={{ delay: 0.3 + i * 0.07, duration: 0.6 }}
                      className="h-full bg-emerald-500 rounded-full" />
                  </div>
                  <p className="text-[10px] text-gray-400 dark:text-gray-600 mt-0.5">{emp.dept}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}