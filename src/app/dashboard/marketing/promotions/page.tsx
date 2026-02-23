"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { Tag, Search, Plus, Download, Percent, Calendar, CheckCircle, Clock } from "lucide-react";
import { useState } from "react";

const promotions = [
  { name: "Black Friday Sale",  discount: "30%", type: "Seasonal", status: "Active",    start: "20 Nov 2025", end: "30 Nov 2025", code: "BF2025",   reach: "8,400" },
  { name: "New Year Offer",     discount: "20%", type: "Seasonal", status: "Scheduled", start: "01 Jan 2026", end: "07 Jan 2026", code: "NY2026",   reach: "—"     },
  { name: "Loyalty Discount",   discount: "15%", type: "Loyalty",  status: "Active",    start: "01 Jan 2026", end: "Ongoing",     code: "LOYAL15",  reach: "1,250" },
  { name: "Referral Bonus",     discount: "10%", type: "Referral", status: "Active",    start: "15 Fév 2026", end: "15 Mar 2026", code: "REF10",    reach: "320"   },
  { name: "Spring Clearance",   discount: "25%", type: "Seasonal", status: "Scheduled", start: "01 Mar 2026", end: "15 Mar 2026", code: "SPRING25", reach: "—"     },
  { name: "VIP Early Access",   discount: "12%", type: "VIP",      status: "Completed", start: "10 Jan 2026", end: "20 Jan 2026", code: "VIP12",    reach: "540"   },
];

const STATUS_CONFIG: Record<string, { badge: string; dot: string }> = {
  Active:    { badge: "bg-emerald-500/15 text-emerald-400", dot: "bg-emerald-400" },
  Scheduled: { badge: "bg-blue-500/15 text-blue-400",       dot: "bg-blue-400" },
  Completed: { badge: "bg-gray-500/15 text-gray-400",       dot: "bg-gray-500" },
  Paused:    { badge: "bg-amber-500/15 text-amber-400",     dot: "bg-amber-400" },
};

const TYPE_BADGE: Record<string, string> = {
  Seasonal: "bg-amber-500/10 text-amber-400",
  Loyalty:  "bg-emerald-500/10 text-emerald-400",
  Referral: "bg-blue-500/10 text-blue-400",
  VIP:      "bg-purple-500/10 text-purple-400",
};

export default function PromotionsPage() {
  const { t } = useLanguage();
  const [search, setSearch]       = useState("");
  const [filterStatus, setFilter] = useState("all");

  const filtered = promotions.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.code.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || p.status.toLowerCase() === filterStatus;
    return matchSearch && matchStatus;
  });

  const activeCount    = promotions.filter(p => p.status === "Active").length;
  const scheduledCount = promotions.filter(p => p.status === "Scheduled").length;

  const card = "bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-white/[0.06] rounded-2xl transition-colors duration-300";

  const statusLabel = (s: string) => {
    const map: Record<string, string> = {
      Active: t("active"), Scheduled: t("scheduled"), Completed: t("completed"), Paused: t("paused"),
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
              {t("promotions")} <span className="text-emerald-400">{t("promotionsManagement").split(" ").slice(1).join(" ")}</span>
            </h1>
            <p className="text-xs text-gray-500 mt-1.5 uppercase tracking-widest">
              {t("promotionsSubtitle")}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-emerald-400 text-xs uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse inline-block" />
              {t("live")}
            </span>
            <button className="flex items-center gap-2 border border-gray-300 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/20 px-4 py-2 rounded-xl text-xs uppercase tracking-wide transition text-gray-600 dark:text-gray-300">
              <Download size={13} /> {t("export")}
            </button>
            <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 px-4 py-2 rounded-xl text-xs uppercase tracking-wide transition text-black font-bold">
              <Plus size={13} /> {t("newPromotion")}
            </button>
          </div>
        </div>

        {/* ── KPI STRIP ── */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { label: t("totalPromos"),  value: String(promotions.length), sub: t("allTime"),          icon: <Tag size={14} />,         iconBg: "bg-emerald-500/10 text-emerald-400" },
            { label: t("active"),       value: String(activeCount),       sub: t("runningNow"),        icon: <CheckCircle size={14} />, iconBg: "bg-blue-500/10 text-blue-400" },
            { label: t("scheduledKpi"), value: String(scheduledCount),    sub: t("upcoming"),          icon: <Calendar size={14} />,   iconBg: "bg-amber-500/10 text-amber-400" },
            { label: t("avgDiscount"),  value: "18.7%",                   sub: t("acrossAllPromos"),   icon: <Percent size={14} />,    iconBg: "bg-purple-500/10 text-purple-400" },
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

        {/* ── TABLE ── */}
        <div className={`${card} overflow-hidden`}>
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-5 border-b border-gray-200 dark:border-white/[0.05]">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">{t("allPromotions")}</h2>
              <p className="text-xs text-gray-500">{filtered.length} {t("ofText")} {promotions.length} {t("promotions").toLowerCase()}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  className="pl-8 pr-3 py-1.5 bg-gray-100 dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-lg text-xs focus:outline-none focus:border-emerald-500/40 transition text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600"
                  placeholder={t("searchPromotion")}
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
                <option value="scheduled">{t("scheduled")}</option>
                <option value="completed">{t("completed")}</option>
              </select>
            </div>
          </div>

          <div className="grid px-6 py-3 text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-600 border-b border-gray-100 dark:border-white/[0.04]"
            style={{ gridTemplateColumns: "2fr 0.8fr 1fr 1fr 1.2fr 1.2fr 1fr" }}>
            <span>{t("promotion")}</span><span>{t("discount")}</span><span>{t("type")}</span>
            <span>{t("code")}</span><span>{t("start")}</span><span>{t("end")}</span><span>{t("status")}</span>
          </div>

          {filtered.length === 0 ? (
            <div className="py-12 text-center text-xs text-gray-400">{t("noPromotionsMatch")}</div>
          ) : (
            filtered.map((p, i) => {
              const sc = STATUS_CONFIG[p.status];
              const tc = TYPE_BADGE[p.type] ?? "bg-gray-500/10 text-gray-400";
              return (
                <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                  className={`grid px-6 py-4 items-center hover:bg-gray-50 dark:hover:bg-white/[0.02] transition ${i < filtered.length - 1 ? "border-b border-gray-100 dark:border-white/[0.03]" : ""}`}
                  style={{ gridTemplateColumns: "2fr 0.8fr 1fr 1fr 1.2fr 1.2fr 1fr" }}>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{p.name}</p>
                  <p className="text-sm font-bold text-emerald-400">{p.discount}</p>
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold w-fit ${tc}`}>{p.type}</span>
                  <p className="text-xs font-bold text-gray-500 dark:text-gray-400 tracking-wider">{p.code}</p>
                  <p className="text-xs text-gray-500">{p.start}</p>
                  <p className="text-xs text-gray-500">{p.end}</p>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold w-fit ${sc.badge}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                    {statusLabel(p.status)}
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