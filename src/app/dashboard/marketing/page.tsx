"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { Users, DollarSign, TrendingUp, RefreshCw, Download, Plus } from "lucide-react";
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

export default function MarketingDashboard() {
const { t, language } = useLanguage();
  const [search, setSearch] = useState("");
  const [activeRange, setActiveRange] = useState<"6m" | "3m" | "1m">("6m");

  const campaigns = [
    { name: "Spring Launch",       channel: "Email",  status: "Active",  leads: 342, spend: 4200 },
    { name: "Google Ads Q1",       channel: "PPC",    status: "Active",  leads: 518, spend: 9800 },
    { name: "Instagram Boost",     channel: "Social", status: "Paused",  leads: 210, spend: 3100 },
    { name: "Black Friday Teaser", channel: "Email",  status: "Planned", leads: 0,   spend: 0    },
    { name: "LinkedIn B2B",        channel: "Social", status: "Active",  leads: 175, spend: 6900 },
  ];

  const leadsSparkData  = [{ v:900 },{ v:1050 },{ v:980 },{ v:1180 },{ v:1245 },{ v:1300 }];
  const budgetSparkData = [{ v:18000 },{ v:20000 },{ v:21500 },{ v:23000 },{ v:24000 },{ v:25200 }];
  const roiSparkData    = [{ v:3.8 },{ v:4.0 },{ v:3.9 },{ v:4.4 },{ v:4.6 },{ v:4.9 }];
  const cplSparkData    = [{ v:22 },{ v:20 },{ v:19 },{ v:18 },{ v:18 },{ v:17 }];

  const leadsMonthly = [
    { month: "Jan", leads: 900  }, { month: "Feb", leads: 1050 },
    { month: "Mar", leads: 980  }, { month: "Apr", leads: 1180 },
    { month: "May", leads: 1245 }, { month: "Jun", leads: 1300 },
  ];
  const conversionMonthly = [
    { month: "Jan", rate: 6.2 }, { month: "Feb", rate: 7.0 },
    { month: "Mar", rate: 7.8 }, { month: "Apr", rate: 8.1 },
    { month: "May", rate: 8.4 }, { month: "Jun", rate: 8.9 },
  ];
  const topCampaignsList = [
    { name: "Google Ads Q1",   leads: 518 },
    { name: "Spring Launch",   leads: 342 },
    { name: "Instagram Boost", leads: 210 },
    { name: "LinkedIn B2B",    leads: 175 },
    { name: "Black Friday",    leads: 0   },
  ];
  const maxLeads = 518;

  const card = "bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-white/[0.06] rounded-2xl transition-colors duration-300";
  const tooltipStyle = { backgroundColor: "#0d1117", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "10px", fontSize: "11px" };

  const statusLabel = (s: string) => {
    const map: Record<string, string> = {
      Active: t("active"), Paused: t("paused"), Planned: t("planned"),
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
  {language === "fr" ? (
    <>{t("dashboard")} <span className="text-emerald-400">{t("marketing")}</span></>
  ) : (
    <>{t("marketing")} <span className="text-emerald-400">{t("dashboard")}</span></>
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
              <Plus size={13} /> {t("newCampaign")}
            </button>
          </div>
        </div>

        {/* ── TOP KPI CARDS ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { icon: <Users size={16} />,      iconBg: "bg-emerald-500/10 text-emerald-400", badge: "+12%",    badgeColor: "text-emerald-400", label: t("totalLeads"),  value: "1,245",   valueColor: "text-emerald-400", spark: leadsSparkData,  sparkColor: "#10b981" },
            { icon: <DollarSign size={16} />, iconBg: "bg-blue-500/10 text-blue-400",       badge: "+8.2%",   badgeColor: "text-blue-400",    label: t("budgetUsed"), value: "$24,000",  valueColor: "text-blue-400",    spark: budgetSparkData, sparkColor: "#60a5fa" },
            { icon: <TrendingUp size={16} />, iconBg: "bg-amber-500/10 text-amber-400",     badge: "+0.5x",   badgeColor: "text-amber-400",   label: t("campaignRoi"),value: "4.6x",    valueColor: "text-amber-400",   spark: roiSparkData,    sparkColor: "#f59e0b" },
            { icon: <RefreshCw size={16} />,  iconBg: "bg-red-500/10 text-red-400",         badge: "-$1 CPL", badgeColor: "text-red-400",     label: t("costPerLead"),value: "$18",     valueColor: "text-red-400",     spark: cplSparkData,    sparkColor: "#f87171" },
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

        {/* ── SECONDARY KPI ROW ── */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { label: t("activeCampaigns"), value: "12",    sub: t("currentlyRunning") },
            { label: t("conversionRate"),  value: "8.4%",  sub: "+2.1% vs last month" },
            { label: t("newLeads"),        value: "342",   sub: t("thisMonth") },
            { label: t("avgCpm"),          value: "$4.20", sub: t("costPerThousand") },
          ].map((s, i) => (
            <div key={i} className={`${card} px-5 py-4`}>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">{s.label}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* ── BOTTOM: Charts + Top Campaigns ── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

          {/* Charts panel (2/3) */}
          <div className={`${card} p-6 xl:col-span-2 space-y-2`}>
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-base font-bold text-gray-900 dark:text-white">{t("campaignOverview")}</h2>
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
                <p className="text-[10px] uppercase tracking-widest text-gray-500">{t("totalLeads")}</p>
                <p className="text-2xl font-bold text-emerald-400">6,675</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-500">{t("avgConversion")}</p>
                <p className="text-2xl font-bold text-blue-400">7.7%</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">{t("leadsPerMonth")}</p>
                <ResponsiveContainer width="100%" height={180}>
                  <ReBarChart data={leadsMonthly}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:[stroke:#1a2030]" />
                    <XAxis dataKey="month" stroke="#9ca3af" tick={{ fontSize: 11 }} />
                    <YAxis stroke="#9ca3af" tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="leads" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </ReBarChart>
                </ResponsiveContainer>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">{t("conversionRateChart")}</p>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={conversionMonthly}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:[stroke:#1a2030]" />
                    <XAxis dataKey="month" stroke="#9ca3af" tick={{ fontSize: 11 }} />
                    <YAxis stroke="#9ca3af" tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Line type="monotone" dataKey="rate" stroke="#60a5fa" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* Campaign table */}
            <div className="pt-4">
              <div className="flex justify-between items-center mb-3">
                <p className="text-[10px] uppercase tracking-widest text-gray-500">{t("allCampaigns")}</p>
                <input type="text" placeholder={t("search")} value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="px-3 py-1.5 bg-gray-100 dark:bg-black/30 border border-gray-300 dark:border-white/10 rounded-lg text-xs focus:outline-none focus:border-emerald-500/40 transition text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600"
                />
              </div>
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-600 border-b border-gray-200 dark:border-white/5">
                    <th className="text-left pb-2 pr-4">{t("campaign")}</th>
                    <th className="text-left pb-2 pr-4">{t("channel")}</th>
                    <th className="text-left pb-2 pr-4">{t("leads")}</th>
                    <th className="text-left pb-2">{t("status")}</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.filter(c => c.name.toLowerCase().includes(search.toLowerCase())).map((c, i) => (
                    <tr key={i} className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/[0.03] transition">
                      <td className="py-3 pr-4 font-bold text-gray-900 dark:text-white">{c.name}</td>
                      <td className="pr-4 text-gray-500 dark:text-gray-400">{c.channel}</td>
                      <td className="pr-4 text-gray-900 dark:text-white">{c.leads > 0 ? c.leads.toLocaleString() : "—"}</td>
                      <td>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          c.status === "Active" ? "bg-emerald-500/15 text-emerald-400" :
                          c.status === "Paused" ? "bg-amber-500/15 text-amber-400" :
                          "bg-blue-500/15 text-blue-400"}`}>
                          {statusLabel(c.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Campaigns panel (1/3) */}
          <div className={`${card} p-6`}>
            <h2 className="text-base font-bold text-gray-900 dark:text-white">{t("topCampaigns")}</h2>
            <p className="text-xs text-gray-500 mb-5">{t("leadsGeneratedThisMonth")}</p>
            <div className="space-y-5">
              {topCampaignsList.map((c, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-1.5">
                    <div>
                      <span className="text-gray-400 text-xs mr-2">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{c.name}</span>
                    </div>
                    <span className="text-emerald-400 text-sm font-bold">{c.leads > 0 ? c.leads.toLocaleString() : "—"}</span>
                  </div>
                  <div className="h-1 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${(c.leads / maxLeads) * 100}%` }}
                      transition={{ delay: 0.3 + i * 0.07, duration: 0.6 }}
                      className="h-full bg-emerald-500 rounded-full" />
                  </div>
                </div>
              ))}
            </div>

            {/* Growth Goals */}
            <div className="mt-8">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">{t("growthGoals")}</h3>
              <div className="space-y-4">
                {[
                  { label: t("conversionRateTarget"), pct: 70 },
                  { label: t("leadAcquisition"),      pct: 55 },
                  { label: t("budgetEfficiency"),     pct: 65 },
                ].map((g, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <p className="text-xs text-gray-500 dark:text-gray-400">{g.label}</p>
                      <p className="text-xs text-gray-500">{g.pct}%</p>
                    </div>
                    <div className="h-1 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${g.pct}%` }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                        className="h-full bg-blue-500 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}