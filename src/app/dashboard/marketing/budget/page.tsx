"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { Mail, MousePointerClick, TrendingUp, Download, Eye } from "lucide-react";
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

const openRateData    = [{ v:38 },{ v:41 },{ v:40 },{ v:43 },{ v:44 },{ v:45 }];
const ctrData         = [{ v:14 },{ v:16 },{ v:15 },{ v:17 },{ v:18 },{ v:18 }];
const conversionData  = [{ v:5.2 },{ v:6.0 },{ v:6.5 },{ v:6.8 },{ v:7.0 },{ v:7.0 }];
const impressionsData = [{ v:42000 },{ v:48000 },{ v:45000 },{ v:51000 },{ v:54000 },{ v:57000 }];

const monthlyMetrics = [
  { month: "Jan", open: 38, ctr: 14 },
  { month: "Fév", open: 41, ctr: 16 },
  { month: "Mar", open: 40, ctr: 15 },
  { month: "Avr", open: 43, ctr: 17 },
  { month: "Mai", open: 44, ctr: 18 },
  { month: "Jun", open: 45, ctr: 18 },
];

const channelPerf = [
  { channel: "Email",   open: 45, ctr: 18, conv: 7.0 },
  { channel: "PPC",     open: 62, ctr: 24, conv: 9.2 },
  { channel: "Social",  open: 31, ctr: 11, conv: 4.8 },
  { channel: "Display", open: 18, ctr:  6, conv: 2.1 },
];

export default function AnalyticsPage() {
  const { t } = useLanguage();
  const [activeRange, setActiveRange] = useState<"6m" | "3m" | "1m">("6m");

  const card = "bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-white/[0.06] rounded-2xl transition-colors duration-300";
  const tooltipStyle = { backgroundColor: "#0d1117", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "10px", fontSize: "11px" };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-100 dark:bg-[#060a0f] text-gray-900 dark:text-white font-mono p-6 space-y-6 transition-colors duration-300">

        {/* ── HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight leading-none">
              {t("marketing")} <span className="text-emerald-400">{t("analytics")}</span>
            </h1>
            <p className="text-xs text-gray-500 mt-1.5 uppercase tracking-widest">Fév 2026 · EMM ERP · v2.4</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-emerald-400 text-xs uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse inline-block" />
              {t("live")}
            </span>
            <button className="flex items-center gap-2 border border-gray-300 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/20 px-4 py-2 rounded-xl text-xs uppercase tracking-wide transition text-gray-600 dark:text-gray-300">
              <Download size={13} /> {t("export")}
            </button>
          </div>
        </div>

        {/* ── TOP KPI CARDS ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { icon: <Mail size={16} />,             iconBg: "bg-emerald-500/10 text-emerald-400", badge: "+3.2%", badgeColor: "text-emerald-400", label: t("emailOpenRate"),    value: "45%",    valueColor: "text-emerald-400", spark: openRateData,    sparkColor: "#10b981" },
            { icon: <MousePointerClick size={16} />, iconBg: "bg-blue-500/10 text-blue-400",       badge: "+2.1%", badgeColor: "text-blue-400",    label: t("clickThroughRate"), value: "18%",    valueColor: "text-blue-400",    spark: ctrData,         sparkColor: "#60a5fa" },
            { icon: <TrendingUp size={16} />,        iconBg: "bg-amber-500/10 text-amber-400",     badge: "+1.8%", badgeColor: "text-amber-400",   label: t("conversionRate"),   value: "7%",     valueColor: "text-amber-400",   spark: conversionData,  sparkColor: "#f59e0b" },
            { icon: <Eye size={16} />,               iconBg: "bg-purple-500/10 text-purple-400",   badge: "+5.6%", badgeColor: "text-purple-400",  label: t("impressions"),      value: "57,000", valueColor: "text-purple-400",  spark: impressionsData, sparkColor: "#a78bfa" },
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

        {/* ── SECONDARY KPI STRIP ── */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { label: t("bounceRate"),   value: "32%",   sub: "-4% vs last month" },
            { label: t("avgSession"),   value: "2m 48s",sub: t("timeOnSite") },
            { label: t("totalReach"),   value: "84K",   sub: t("uniqueVisitors") },
            { label: t("unsubscribes"), value: "0.4%",  sub: t("emailList") },
          ].map((s, i) => (
            <div key={i} className={`${card} px-5 py-4`}>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">{s.label}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* ── BOTTOM: Charts + Channel Performance ── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

          {/* Charts (2/3) */}
          <div className={`${card} p-6 xl:col-span-2 space-y-2`}>
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-base font-bold text-gray-900 dark:text-white">{t("performanceTrends")}</h2>
                <p className="text-xs text-gray-500">{t("monthlyEmailCtr")}</p>
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
                <p className="text-[10px] uppercase tracking-widest text-gray-500">{t("avgOpenRate")}</p>
                <p className="text-2xl font-bold text-emerald-400">41.8%</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-500">{t("avgCtr")}</p>
                <p className="text-2xl font-bold text-blue-400">16.3%</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">{t("emailOpenRateChart")}</p>
                <ResponsiveContainer width="100%" height={180}>
                  <ReBarChart data={monthlyMetrics}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#9ca3af" tick={{ fontSize: 11 }} />
                    <YAxis stroke="#9ca3af" tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="open" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </ReBarChart>
                </ResponsiveContainer>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">{t("clickThroughRateChart")}</p>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={monthlyMetrics}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#9ca3af" tick={{ fontSize: 11 }} />
                    <YAxis stroke="#9ca3af" tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Line type="monotone" dataKey="ctr" stroke="#60a5fa" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Channel Performance (1/3) */}
          <div className={`${card} p-6`}>
            <h2 className="text-base font-bold text-gray-900 dark:text-white">{t("channelPerformance")}</h2>
            <p className="text-xs text-gray-500 mb-5">{t("openCtrConv")}</p>
            <div className="space-y-5">
              {channelPerf.map((c, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-1.5">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{c.channel}</span>
                    <span className="text-emerald-400 text-sm font-bold">{c.conv}%</span>
                  </div>
                  <div className="h-1 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden mb-1">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${c.open}%` }}
                      transition={{ delay: 0.3 + i * 0.07, duration: 0.6 }}
                      className="h-full bg-emerald-500 rounded-full" />
                  </div>
                  <div className="flex gap-4 text-[10px] text-gray-500 dark:text-gray-600">
                    <span>Open {c.open}%</span>
                    <span>CTR {c.ctr}%</span>
                    <span>Conv {c.conv}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}