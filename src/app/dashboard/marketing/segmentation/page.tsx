"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { Users, Search, Plus, Download, TrendingUp, DollarSign, Target } from "lucide-react";
import { useState } from "react";
import {
  BarChart as ReBarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

const segments = [
  { segment: "Young Adults (18–25)", customers: 320,  avgSpend: "180 TND",   growth: "+12%", channel: "Social",   status: "Growing"  },
  { segment: "Returning Customers",  customers: 150,  avgSpend: "420 TND",   growth: "+8%",  channel: "Email",    status: "Stable"   },
  { segment: "High Spenders",        customers: 75,   avgSpend: "1,200 TND", growth: "+5%",  channel: "Direct",   status: "Stable"   },
  { segment: "One-Time Buyers",      customers: 540,  avgSpend: "95 TND",    growth: "-3%",  channel: "PPC",      status: "Declining"},
  { segment: "B2B Clients",          customers: 42,   avgSpend: "3,800 TND", growth: "+18%", channel: "LinkedIn", status: "Growing"  },
  { segment: "Loyalty Program",      customers: 210,  avgSpend: "560 TND",   growth: "+9%",  channel: "Email",    status: "Growing"  },
  { segment: "Inactive (90d+)",      customers: 390,  avgSpend: "0 TND",     growth: "—",    channel: "—",        status: "At Risk"  },
];

const chartData = segments
  .filter(s => s.customers > 0 && s.segment !== "Inactive (90d+)")
  .map(s => ({ name: s.segment.split(" ").slice(0, 2).join(" "), customers: s.customers }));

const STATUS_CONFIG: Record<string, { badge: string; dot: string }> = {
  Growing:   { badge: "bg-emerald-500/15 text-emerald-400", dot: "bg-emerald-400" },
  Stable:    { badge: "bg-blue-500/15 text-blue-400",       dot: "bg-blue-400" },
  Declining: { badge: "bg-amber-500/15 text-amber-400",     dot: "bg-amber-400" },
  "At Risk": { badge: "bg-red-500/15 text-red-400",         dot: "bg-red-400" },
};

const tooltipStyle = {
  backgroundColor: "#0d1117",
  border: "1px solid rgba(255,255,255,0.05)",
  borderRadius: "10px",
  fontSize: "11px",
};

export default function SegmentationPage() {
  const { t } = useLanguage();
  const [search, setSearch]       = useState("");
  const [filterStatus, setFilter] = useState("all");

  const filtered = segments.filter((s) => {
    const matchSearch = s.segment.toLowerCase().includes(search.toLowerCase()) || s.channel.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || s.status.toLowerCase().replace(" ", "-") === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalCustomers = segments.reduce((s, r) => s + r.customers, 0);
  const growingCount   = segments.filter(s => s.status === "Growing").length;
  const atRiskCount    = segments.filter(s => s.status === "At Risk" || s.status === "Declining").length;

  const card = "bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-white/[0.06] rounded-2xl transition-colors duration-300";

  const statusLabel = (s: string) => {
    const map: Record<string, string> = {
      Growing: t("growing"), Stable: t("stable"), Declining: t("declining"), "At Risk": t("atRisk"),
    };
    return map[s] ?? s;
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-100 dark:bg-[#060a0f] text-gray-900 dark:text-white font-mono p-6 space-y-6 transition-colors duration-300">

        {/* ── HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight leading-none">
              {t("customerSegmentation").split(" ")[0]}{" "}
              <span className="text-emerald-400">
                {t("customerSegmentation").split(" ").slice(1).join(" ")}
              </span>
            </h1>
            <p className="text-xs text-gray-500 mt-1.5 uppercase tracking-widest">
              {t("segmentationSubtitle")}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-emerald-400 text-xs uppercase tracking-widest flex items-center gap-1.5">
              
            </span>
            <button className="flex items-center gap-2 border border-gray-300 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/20 px-4 py-2 rounded-xl text-xs uppercase tracking-wide transition text-gray-600 dark:text-gray-300">
              <Download size={13} /> {t("export")}
            </button>
            <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 px-4 py-2 rounded-xl text-xs uppercase tracking-wide transition text-black font-bold">
              <Plus size={13} /> {t("newSegment")}
            </button>
          </div>
        </div>

        {/* ── KPI STRIP ── */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { label: t("totalCustomers"), value: totalCustomers.toLocaleString(), sub: t("acrossAllSegments"), icon: <Users size={14} />,      iconBg: "bg-emerald-500/10 text-emerald-400" },
            { label: t("segments"),       value: String(segments.length),         sub: t("defined"),           icon: <Target size={14} />,     iconBg: "bg-blue-500/10 text-blue-400" },
            { label: t("growingKpi"),     value: String(growingCount),            sub: t("positiveTrend"),     icon: <TrendingUp size={14} />, iconBg: "bg-purple-500/10 text-purple-400" },
            { label: t("atRiskKpi"),      value: String(atRiskCount),             sub: t("needsAttention"),    icon: <DollarSign size={14} />, iconBg: "bg-amber-500/10 text-amber-400" },
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

        {/* ── BOTTOM: Table + Chart ── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

          {/* Table (2/3) */}
          <div className={`${card} overflow-hidden xl:col-span-2`}>
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-5 border-b border-gray-200 dark:border-white/[0.05]">
              <div>
                <h2 className="text-base font-bold text-gray-900 dark:text-white">{t("customerSegmentsTable")}</h2>
                <p className="text-xs text-gray-500">{filtered.length} {t("ofText")} {segments.length} {t("segments").toLowerCase()}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    className="pl-8 pr-3 py-1.5 bg-gray-100 dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-lg text-xs focus:outline-none focus:border-emerald-500/40 transition text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600"
                    placeholder={t("searchSegment")}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <select
                  className="px-3 py-1.5 bg-gray-100 dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-lg text-xs text-gray-600 dark:text-gray-300 focus:outline-none focus:border-emerald-500/40 transition"
                  value={filterStatus}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">{t("allStatus")}</option>
                  <option value="growing">{t("growing")}</option>
                  <option value="stable">{t("stable")}</option>
                  <option value="declining">{t("declining")}</option>
                  <option value="at-risk">{t("atRisk")}</option>
                </select>
              </div>
            </div>

            <div className="grid px-6 py-3 text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-600 border-b border-gray-100 dark:border-white/[0.04]"
              style={{ gridTemplateColumns: "2.5fr 1fr 1.3fr 0.8fr 1fr 1fr" }}>
              <span>{t("segment")}</span><span>{t("customers")}</span><span>{t("avgSpend")}</span>
              <span>{t("growth")}</span><span>{t("channel")}</span><span>{t("status")}</span>
            </div>

            {filtered.length === 0 ? (
              <div className="py-12 text-center text-xs text-gray-400 dark:text-gray-600">{t("noSegmentsMatch")}</div>
            ) : (
              filtered.map((s, i) => {
                const sc = STATUS_CONFIG[s.status];
                const isPos = s.growth.startsWith("+");
                const isNeg = s.growth.startsWith("-");
                return (
                  <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                    className={`grid px-6 py-4 items-center hover:bg-gray-50 dark:hover:bg-white/[0.02] transition ${i < filtered.length - 1 ? "border-b border-gray-100 dark:border-white/[0.03]" : ""}`}
                    style={{ gridTemplateColumns: "2.5fr 1fr 1.3fr 0.8fr 1fr 1fr" }}>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{s.segment}</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{s.customers.toLocaleString()}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">{s.avgSpend}</p>
                    <p className={`text-xs font-bold ${isPos ? "text-emerald-400" : isNeg ? "text-red-400" : "text-gray-500"}`}>{s.growth}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{s.channel}</p>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold w-fit ${sc.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                      {statusLabel(s.status)}
                    </span>
                  </motion.div>
                );
              })
            )}
          </div>

          {/* Segment Size Chart (1/3) */}
          <div className={`${card} p-6`}>
            <h2 className="text-base font-bold text-gray-900 dark:text-white">{t("segmentSizes")}</h2>
            <p className="text-xs text-gray-500 mb-4">{t("customersPerSegment")}</p>
            <ResponsiveContainer width="100%" height={220}>
              <ReBarChart data={chartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:[stroke:#1a2030]" horizontal={false} />
                <XAxis type="number" stroke="#9ca3af" tick={{ fontSize: 10 }} />
                <YAxis type="category" dataKey="name" stroke="#9ca3af" tick={{ fontSize: 10 }} width={72} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="customers" fill="#10b981" radius={[0, 4, 4, 0]} />
              </ReBarChart>
            </ResponsiveContainer>

            <div className="mt-4 space-y-3">
              <p className="text-[10px] uppercase tracking-widest text-gray-500">{t("fastestGrowing")}</p>
              {segments.filter(s => s.status === "Growing").slice(0, 3).map((s, i) => (
                <div key={i} className="flex justify-between items-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate pr-2">{s.segment}</p>
                  <span className="text-xs font-bold text-emerald-400 flex-shrink-0">{s.growth}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}