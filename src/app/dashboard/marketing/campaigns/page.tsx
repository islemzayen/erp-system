"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { Megaphone, Search, Plus, Download, Users, DollarSign, Play } from "lucide-react";
import { useState } from "react";

const campaigns = [
  { name: "Spring Launch",       channel: "Email",   status: "Active",    budget: "10,500 TND", leads: 342, spend: "6,500 TND"  },
  { name: "Google Ads Q1",       channel: "PPC",     status: "Active",    budget: "24,500 TND", leads: 518, spend: "19,800 TND" },
  { name: "Instagram Boost",     channel: "Social",  status: "Paused",    budget: "7,800 TND",  leads: 210, spend: "7,200 TND"  },
  { name: "Black Friday Teaser", channel: "Email",   status: "Planned",   budget: "12,000 TND", leads: 0,   spend: "0 TND"      },
  { name: "LinkedIn B2B",        channel: "Social",  status: "Active",    budget: "17,250 TND", leads: 175, spend: "9,800 TND"  },
  { name: "Display Retargeting", channel: "Display", status: "Active",    budget: "5,000 TND",  leads: 98,  spend: "3,100 TND"  },
  { name: "YouTube Pre-Roll",    channel: "Video",   status: "Planned",   budget: "8,000 TND",  leads: 0,   spend: "0 TND"      },
  { name: "Summer Sale",         channel: "Email",   status: "Completed", budget: "9,000 TND",  leads: 620, spend: "8,750 TND"  },
];

const STATUS_CONFIG: Record<string, { badge: string; dot: string }> = {
  Active:    { badge: "bg-emerald-500/15 text-emerald-400", dot: "bg-emerald-400" },
  Paused:    { badge: "bg-amber-500/15 text-amber-400",     dot: "bg-amber-400" },
  Planned:   { badge: "bg-blue-500/15 text-blue-400",       dot: "bg-blue-400" },
  Completed: { badge: "bg-gray-500/15 text-gray-400",       dot: "bg-gray-500" },
};

const CHANNEL_BADGE: Record<string, string> = {
  Email:   "bg-emerald-500/10 text-emerald-400",
  PPC:     "bg-blue-500/10 text-blue-400",
  Social:  "bg-purple-500/10 text-purple-400",
  Display: "bg-amber-500/10 text-amber-400",
  Video:   "bg-pink-500/10 text-pink-400",
};

export default function CampaignsPage() {
  const { t } = useLanguage();
  const [search, setSearch]       = useState("");
  const [filterStatus, setFilter] = useState("all");

  const filtered = campaigns.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.channel.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || c.status.toLowerCase() === filterStatus;
    return matchSearch && matchStatus;
  });

  const activeCount    = campaigns.filter(c => c.status === "Active").length;
  const totalLeads     = campaigns.reduce((s, c) => s + c.leads, 0);
  const totalBudgetNum = 94050;

  const card = "bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-white/[0.06] rounded-2xl transition-colors duration-300";

  const statusLabel = (s: string) => {
    const map: Record<string, string> = {
      Active: t("active"), Paused: t("paused"), Planned: t("planned"), Completed: t("completed"),
    };
    return map[s] ?? s;
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-100 dark:bg-[#060a0f] text-gray-900 dark:text-white font-mono p-6 space-y-6 transition-colors duration-300">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight leading-none">
              {t("campaignManagement").split(" ")[0]} <span className="text-emerald-400">{t("campaignManagement").split(" ").slice(1).join(" ")}</span>
            </h1>
            <p className="text-xs text-gray-500 mt-1.5 uppercase tracking-widest">{t("campaignSubtitle")}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-emerald-400 text-xs uppercase tracking-widest flex items-center gap-1.5">
              
            </span>
            <button className="flex items-center gap-2 border border-gray-300 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/20 px-4 py-2 rounded-xl text-xs uppercase tracking-wide transition text-gray-600 dark:text-gray-300">
              <Download size={13} /> {t("export")}
            </button>
            <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 px-4 py-2 rounded-xl text-xs uppercase tracking-wide transition text-black font-bold">
              <Plus size={13} /> {t("newCampaign")}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { label: t("totalCampaigns"), value: String(campaigns.length),                sub: t("allTime"),   icon: <Megaphone size={14} />,  iconBg: "bg-emerald-500/10 text-emerald-400" },
            { label: t("activeNow"),      value: String(activeCount),                     sub: t("running"),   icon: <Play size={14} />,       iconBg: "bg-blue-500/10 text-blue-400" },
            { label: t("totalLeads"),     value: totalLeads.toLocaleString(),              sub: t("generated"), icon: <Users size={14} />,      iconBg: "bg-amber-500/10 text-amber-400" },
            { label: t("totalBudget"),    value: `${totalBudgetNum.toLocaleString()} TND`, sub: t("allocated"), icon: <DollarSign size={14} />, iconBg: "bg-purple-500/10 text-purple-400" },
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
              <h2 className="text-base font-bold text-gray-900 dark:text-white">{t("allCampaigns")}</h2>
              <p className="text-xs text-gray-500">{filtered.length} {t("ofText")} {campaigns.length} {t("campaigns").toLowerCase()}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  className="pl-8 pr-3 py-1.5 bg-gray-100 dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-lg text-xs focus:outline-none focus:border-emerald-500/40 transition text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600"
                  placeholder={t("searchCampaign")}
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
                <option value="active">{t("active")}</option>
                <option value="paused">{t("paused")}</option>
                <option value="planned">{t("planned")}</option>
                <option value="completed">{t("completed")}</option>
              </select>
            </div>
          </div>

          <div className="grid px-6 py-3 text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-600 border-b border-gray-100 dark:border-white/[0.04]"
            style={{ gridTemplateColumns: "2fr 1fr 1fr 1.4fr 1fr 1.2fr" }}>
            <span>{t("campaign")}</span><span>{t("channel")}</span><span>{t("leads")}</span>
            <span>{t("budgetCol")}</span><span>{t("spent")}</span><span>{t("status")}</span>
          </div>

          {filtered.length === 0 ? (
            <div className="py-12 text-center text-xs text-gray-400 dark:text-gray-600">{t("noCampaignsMatch")}</div>
          ) : (
            filtered.map((c, i) => {
              const sc = STATUS_CONFIG[c.status];
              const ch = CHANNEL_BADGE[c.channel] ?? "bg-gray-500/10 text-gray-400";
              return (
                <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                  className={`grid px-6 py-4 items-center hover:bg-gray-50 dark:hover:bg-white/[0.02] transition ${i < filtered.length - 1 ? "border-b border-gray-100 dark:border-white/[0.03]" : ""}`}
                  style={{ gridTemplateColumns: "2fr 1fr 1fr 1.4fr 1fr 1.2fr" }}>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{c.name}</p>
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold w-fit ${ch}`}>{c.channel}</span>
                  <p className="text-xs text-gray-900 dark:text-white font-bold">{c.leads > 0 ? c.leads.toLocaleString() : "—"}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">{c.budget}</p>
                  <p className="text-xs text-blue-400 font-bold">{c.spend}</p>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold w-fit ${sc.badge}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                    {statusLabel(c.status)}
                  </span>
                </motion.div>
              );
            })
          )}
        </div>

      </div>
    </DashboardLayout>
  );
}