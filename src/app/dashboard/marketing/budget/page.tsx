"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { DollarSign, Search, Plus, Download, TrendingUp, AlertCircle, PieChart } from "lucide-react";
import { useState } from "react";
import {
  BarChart as ReBarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

const budgets = [
  { campaign: "Google Ads Q1",       allocated: 24500, used: 19800, remaining: 4700,  status: "On Track"   },
  { campaign: "Spring Launch Email", allocated: 10500, used: 6500,  remaining: 4000,  status: "On Track"   },
  { campaign: "Instagram Boost",     allocated: 7800,  used: 7200,  remaining: 600,   status: "Critical"   },
  { campaign: "LinkedIn B2B",        allocated: 17250, used: 9800,  remaining: 7450,  status: "On Track"   },
  { campaign: "Black Friday Teaser", allocated: 12000, used: 0,     remaining: 12000, status: "Not Started"},
  { campaign: "Display Retargeting", allocated: 5000,  used: 3100,  remaining: 1900,  status: "On Track"   },
];

const monthlySpend = [
  { month: "Jan", spend: 9500  },
  { month: "Fév", spend: 11200 },
  { month: "Mar", spend: 10800 },
  { month: "Avr", spend: 13500 },
  { month: "Mai", spend: 12600 },
  { month: "Jun", spend: 14400 },
];

const STATUS_CONFIG: Record<string, { badge: string; dot: string }> = {
  "On Track":    { badge: "bg-emerald-500/15 text-emerald-400", dot: "bg-emerald-400" },
  "Critical":    { badge: "bg-red-500/15 text-red-400",         dot: "bg-red-400" },
  "Not Started": { badge: "bg-gray-500/15 text-gray-400",       dot: "bg-gray-500" },
};

export default function BudgetPage() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");

  const filtered = budgets.filter(b =>
    b.campaign.toLowerCase().includes(search.toLowerCase())
  );

  const totalAllocated = budgets.reduce((s, b) => s + b.allocated, 0);
  const totalUsed      = budgets.reduce((s, b) => s + b.used, 0);
  const totalRemaining = totalAllocated - totalUsed;
  const usedPct        = Math.round((totalUsed / totalAllocated) * 100);

  const card = "bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-white/[0.06] rounded-2xl transition-colors duration-300";
  const tooltipStyle = { backgroundColor: "#0d1117", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "10px", fontSize: "11px" };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-100 dark:bg-[#060a0f] text-gray-900 dark:text-white font-mono p-6 space-y-6 transition-colors duration-300">

        {/* ── HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight leading-none">
              {t("marketingBudgetTitle").split(" ")[0]}{" "}
              <span className="text-emerald-400">
                {t("marketingBudgetTitle").split(" ").slice(1).join(" ")}
              </span>
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
              <Plus size={13} /> {t("addBudget")}
            </button>
          </div>
        </div>

        {/* ── KPI STRIP ── */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { label: t("totalAllocated"), value: `${totalAllocated.toLocaleString()} TND`, sub: t("thisPeriod"),     icon: <DollarSign size={14} />,  iconBg: "bg-emerald-500/10 text-emerald-400" },
            { label: t("totalSpent"),     value: `${totalUsed.toLocaleString()} TND`,      sub: `${usedPct}% used`,  icon: <TrendingUp size={14} />,  iconBg: "bg-blue-500/10 text-blue-400" },
            { label: t("remaining"),      value: `${totalRemaining.toLocaleString()} TND`, sub: t("available"),      icon: <PieChart size={14} />,    iconBg: "bg-purple-500/10 text-purple-400" },
            { label: t("critical"),       value: String(budgets.filter(b => b.status === "Critical").length), sub: t("overBudgetRisk"), icon: <AlertCircle size={14} />, iconBg: "bg-red-500/10 text-red-400" },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className={`${card} px-5 py-4 flex items-center gap-4`}>
              <div className={`p-2 rounded-xl ${s.iconBg}`}>{s.icon}</div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-0.5">{s.label}</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">{s.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{s.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── BOTTOM: Table + Chart ── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

          {/* Table (2/3) */}
          <div className={`${card} overflow-hidden xl:col-span-2`}>
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-white/[0.05]">
              <div>
                <h2 className="text-base font-bold text-gray-900 dark:text-white">{t("budgetAllocation")}</h2>
                <p className="text-xs text-gray-500">{filtered.length} of {budgets.length} {t("campaigns")}</p>
              </div>
              <div className="relative">
                <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  className="pl-8 pr-3 py-1.5 bg-gray-100 dark:bg-black/30 border border-gray-300 dark:border-white/10 rounded-lg text-xs focus:outline-none focus:border-emerald-500/40 transition text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600"
                  placeholder={t("searchCampaign")}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="grid px-6 py-3 text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-600 border-b border-gray-200 dark:border-white/[0.04]"
              style={{ gridTemplateColumns: "2fr 1.2fr 1.2fr 1.2fr 1.5fr 1.5fr" }}>
              <span>{t("campaign")}</span><span>{t("allocated")}</span><span>{t("used")}</span>
              <span>{t("remaining")}</span><span>{t("usage")}</span><span>{t("status")}</span>
            </div>

            {filtered.map((b, i) => {
              const sc  = STATUS_CONFIG[b.status];
              const pct = b.allocated > 0 ? Math.round((b.used / b.allocated) * 100) : 0;
              return (
                <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                  className={`grid px-6 py-4 items-center hover:bg-gray-50 dark:hover:bg-white/[0.02] transition ${i < filtered.length - 1 ? "border-b border-gray-100 dark:border-white/[0.03]" : ""}`}
                  style={{ gridTemplateColumns: "2fr 1.2fr 1.2fr 1.2fr 1.5fr 1.5fr" }}>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{b.campaign}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">{b.allocated.toLocaleString()}</p>
                  <p className="text-xs text-blue-400 font-bold">{b.used.toLocaleString()}</p>
                  <p className={`text-xs font-bold ${b.remaining < 1000 && b.remaining > 0 ? "text-amber-400" : "text-gray-600 dark:text-gray-300"}`}>{b.remaining.toLocaleString()}</p>
                  <div className="pr-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-[10px] text-gray-500 dark:text-gray-600">{pct}%</span>
                    </div>
                    <div className="h-1 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                        transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }}
                        className={`h-full rounded-full ${pct >= 90 ? "bg-red-500" : pct >= 70 ? "bg-amber-500" : "bg-emerald-500"}`} />
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold w-fit ${sc.badge}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                    {b.status}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Monthly Spend Chart (1/3) */}
          <div className={`${card} p-6`}>
            <h2 className="text-base font-bold text-gray-900 dark:text-white">{t("monthlySpend")}</h2>
            <p className="text-xs text-gray-500 mb-4">{t("totalSpendPerMonth")}</p>
            <ResponsiveContainer width="100%" height={200}>
              <ReBarChart data={monthlySpend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#9ca3af" tick={{ fontSize: 11 }} />
                <YAxis stroke="#9ca3af" tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={tooltipStyle}
                  formatter={(v) => [`${(v as number).toLocaleString()} TND`, t("spend")]} />
                <Bar dataKey="spend" fill="#60a5fa" radius={[4, 4, 0, 0]} />
              </ReBarChart>
            </ResponsiveContainer>

            {/* Budget utilisation goal */}
            <div className="mt-6 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
              <div className="flex justify-between mb-2">
                <span className="text-xs font-bold text-gray-700 dark:text-white/70">{t("budgetUtilisation")}</span>
                <span className="text-xs font-bold text-emerald-400">{usedPct}%</span>
              </div>
              <div className="h-1.5 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${usedPct}%` }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-blue-500" />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-[10px] text-gray-500 dark:text-gray-600">{totalUsed.toLocaleString()} / {totalAllocated.toLocaleString()} TND</span>
                <span className="text-[10px] text-amber-400">{totalRemaining.toLocaleString()} {t("left")}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}