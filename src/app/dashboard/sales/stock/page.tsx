"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { Package, Search, Plus, Download, ArrowDownToLine, AlertTriangle, CheckCircle, Archive, BarChart2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

// ─── Types ────────────────────────────────────────────────────────────────────
interface StockItem {
  id: string;
  name: string;
  category: string;
  current: number;
  minimum: number;
  reorderQty: number;
  status: "in-stock" | "low-stock" | "out-of-stock";
  sku: string;
  avatar: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const STOCK: StockItem[] = [
  { id: "PRD-001", name: "Mortise Lock Pro",     category: "Locks",      current: 124,  minimum: 50,   reorderQty: 200,  status: "in-stock",     sku: "MLP-48",  avatar: "ML" },
  { id: "PRD-002", name: "Brass Key Blank B2",   category: "Keys",       current: 5400, minimum: 1000, reorderQty: 5000, status: "in-stock",     sku: "BKB-B2",  avatar: "BK" },
  { id: "PRD-003", name: "Smart Key Module",     category: "Electronic", current: 18,   minimum: 25,   reorderQty: 100,  status: "low-stock",    sku: "SKM-132", avatar: "SK" },
  { id: "PRD-004", name: "Padlock Shackle 50mm", category: "Padlocks",   current: 312,  minimum: 100,  reorderQty: 500,  status: "in-stock",     sku: "PLS-50",  avatar: "PS" },
  { id: "PRD-005", name: "Cylinder Lock Core",   category: "Locks",      current: 7,    minimum: 30,   reorderQty: 150,  status: "low-stock",    sku: "CLC-22",  avatar: "CL" },
  { id: "PRD-006", name: "RFID Tag Sticker",     category: "Electronic", current: 0,    minimum: 200,  reorderQty: 1000, status: "out-of-stock", sku: "RFT-01",  avatar: "RT" },
  { id: "PRD-007", name: "Deadbolt Lock Set",    category: "Locks",      current: 88,   minimum: 40,   reorderQty: 200,  status: "in-stock",     sku: "DLS-54",  avatar: "DL" },
  { id: "PRD-008", name: "Key Duplicator Unit",  category: "Equipment",  current: 3,    minimum: 5,    reorderQty: 10,   status: "low-stock",    sku: "KDU-12",  avatar: "KD" },
];

const AVATAR_COLORS = [
  "bg-emerald-500/20 text-emerald-400",
  "bg-blue-500/20 text-blue-400",
  "bg-purple-500/20 text-purple-400",
  "bg-amber-500/20 text-amber-400",
  "bg-pink-500/20 text-pink-400",
  "bg-teal-500/20 text-teal-400",
  "bg-red-500/20 text-red-400",
  "bg-indigo-500/20 text-indigo-400",
];

const CHART_DATA = STOCK.map(s => ({
  name: s.name.split(" ").slice(0, 2).join(" "),
  current: s.current,
  minimum: s.minimum,
}));

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function StockPage() {
  const { t } = useLanguage();
  const [filterStatus, setFilterStatus]     = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchQuery, setSearchQuery]       = useState("");
  const [mounted, setMounted]               = useState(false);
  useEffect(() => setMounted(true), []);

  const STATUS_CONFIG = {
    "in-stock":     { label: t("inStockLabel"),    badge: "bg-emerald-500/15 text-emerald-400", dot: "bg-emerald-400" },
    "low-stock":    { label: t("lowStockLabel"),   badge: "bg-amber-500/15 text-amber-400",     dot: "bg-amber-400"   },
    "out-of-stock": { label: t("outOfStockLabel"), badge: "bg-red-500/15 text-red-400",         dot: "bg-red-400"     },
  };

  const categories = ["all", ...Array.from(new Set(STOCK.map(s => s.category)))];

  const filtered = STOCK.filter(s => {
    const matchStatus   = filterStatus === "all"   || s.status === filterStatus;
    const matchCategory = filterCategory === "all" || s.category === filterCategory;
    const matchSearch   =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchCategory && matchSearch;
  });

  const inStockCount  = STOCK.filter(s => s.status === "in-stock").length;
  const alertsCount   = STOCK.filter(s => s.status === "low-stock").length;
  const outCount      = STOCK.filter(s => s.status === "out-of-stock").length;
  const totalUnits    = STOCK.reduce((sum, s) => sum + s.current, 0);
  const reorderNeeded = STOCK.filter(s => s.current <= s.minimum).length;

  const card = "bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-white/[0.06] rounded-2xl transition-colors duration-300";
  const tooltipStyle = { backgroundColor: "#0d1117", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "10px", fontSize: "11px" };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-100 dark:bg-[#060a0f] text-gray-900 dark:text-white font-mono p-6 space-y-6 transition-colors duration-300">

        {/* ── HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight leading-none">
              Stock <span className="text-emerald-400">&amp; Production</span>
            </h1>
            <p className="text-xs text-gray-500 mt-1.5 uppercase tracking-widest">
              Feb 20, 2026 · EMM Hardware ERP · v2.4
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-emerald-400 text-xs uppercase tracking-widest flex items-center gap-1.5">
              
            </span>
            <button className="flex items-center gap-2 border border-gray-300 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/20 px-4 py-2 rounded-xl text-xs uppercase tracking-wide transition text-gray-600 dark:text-gray-300">
              <Download size={13} /> {t("exportCsv")}
            </button>
            <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 px-4 py-2 rounded-xl text-xs uppercase tracking-wide transition text-black font-bold">
              <Plus size={13} /> {t("restockOrder")}
            </button>
          </div>
        </div>

        {/* ── KPI CARDS ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { label: t("totalSkusKpi"),  value: STOCK.length, change: t("tracked"),     changeColor: "text-emerald-400", valueColor: "text-emerald-400", icon: <Package size={16} />,       iconBg: "bg-emerald-500/10 text-emerald-400" },
            { label: t("inStockKpi"),    value: inStockCount,  change: t("healthy"),     changeColor: "text-blue-400",    valueColor: "text-blue-400",    icon: <CheckCircle size={16} />,   iconBg: "bg-blue-500/10 text-blue-400"       },
            { label: t("alertsKpi"),     value: alertsCount,   change: t("needsAction"), changeColor: "text-amber-400",   valueColor: "text-amber-400",   icon: <AlertTriangle size={16} />, iconBg: "bg-amber-500/10 text-amber-400"     },
            { label: t("outOfStockKpi"), value: outCount,      change: t("reorderNow"),  changeColor: "text-red-400",     valueColor: "text-red-400",     icon: <Archive size={16} />,       iconBg: "bg-red-500/10 text-red-400"         },
          ].map((kpi, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className={`${card} p-5 flex flex-col gap-3`}>
              <div className="flex items-start justify-between">
                <div className={`p-2 rounded-xl ${kpi.iconBg}`}>{kpi.icon}</div>
                <span className={`text-xs font-bold ${kpi.changeColor}`}>{kpi.change}</span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-gray-500">{kpi.label}</p>
              <p className={`text-3xl font-bold tracking-tight ${kpi.valueColor}`}>
                {kpi.value.toLocaleString()}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── SECONDARY STRIP ── */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { label: t("totalUnits"),    value: totalUnits.toLocaleString(),   sub: t("acrossAllSkus")    },
            { label: t("reorderNeeded"), value: String(reorderNeeded),          sub: t("skusBelowMinimum") },
            { label: t("categories"),    value: String(categories.length - 1),  sub: t("productTypes")     },
            { label: t("lastSync"),      value: "Just now",                     sub: t("realTimeData")     },
          ].map((s, i) => (
            <div key={i} className={`${card} px-5 py-4`}>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">{s.label}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* ── CHART ── */}
        <div className={`${card} p-6`}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">{t("stockVsMinimum")}</h2>
              <p className="text-xs text-gray-500">{t("currentLevelsVsThreshold")}</p>
            </div>
            <div className="flex gap-4 text-[10px] uppercase tracking-widest">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-sm bg-emerald-500 inline-block" />{t("current")}
              </span>
              <span className="flex items-center gap-1.5 text-red-400">
                <span className="w-2 h-2 rounded-sm bg-red-500 inline-block" />{t("minimum")}
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={CHART_DATA} barSize={16}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:[stroke:#1a2030]" />
              <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 10 }} />
              <YAxis stroke="#9ca3af" tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="current" fill="#10b981" radius={[3, 3, 0, 0]} name="Current" />
              <Bar dataKey="minimum" fill="#f87171" radius={[3, 3, 0, 0]} name="Minimum" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ── STOCK TABLE ── */}
        <div className={`${card} overflow-hidden`}>
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-white/[0.05]">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">{t("stockLevels")}</h2>
              <p className="text-xs text-gray-500">{filtered.length} {t("ofText")} {STOCK.length} {t("records")}</p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative">
                <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  className="pl-8 pr-3 py-1.5 bg-gray-100 dark:bg-black/30 border border-gray-300 dark:border-white/10 rounded-lg text-xs focus:outline-none focus:border-emerald-500/40 transition text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600"
                  placeholder={t("searchStock")}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              <select
                className="px-3 py-1.5 bg-gray-100 dark:bg-black/30 border border-gray-300 dark:border-white/10 rounded-lg text-xs text-gray-600 dark:text-gray-300 focus:outline-none focus:border-emerald-500/40 transition"
                value={filterCategory}
                onChange={e => setFilterCategory(e.target.value)}
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c === "all" ? t("allStatus") : c}</option>
                ))}
              </select>
              <select
                className="px-3 py-1.5 bg-gray-100 dark:bg-black/30 border border-gray-300 dark:border-white/10 rounded-lg text-xs text-gray-600 dark:text-gray-300 focus:outline-none focus:border-emerald-500/40 transition"
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
              >
                <option value="all">{t("allStatus")}</option>
                <option value="in-stock">{t("inStockLabel")}</option>
                <option value="low-stock">{t("lowStockLabel")}</option>
                <option value="out-of-stock">{t("outOfStockLabel")}</option>
              </select>
              <button className="flex items-center gap-2 border border-gray-300 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/20 px-3 py-1.5 rounded-lg text-xs text-gray-500 dark:text-gray-400 transition">
                <ArrowDownToLine size={12} /> {t("export")}
              </button>
            </div>
          </div>

          {/* Table header */}
          <div
            className="grid px-6 py-3 text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-600 border-b border-gray-100 dark:border-white/[0.04]"
            style={{ gridTemplateColumns: "2.2fr 1.2fr 1fr 1fr 1fr 1.2fr 1.2fr" }}
          >
            <span>{t("product")}</span>
            <span>{t("category")}</span>
            <span>{t("current")}</span>
            <span>{t("minimum")}</span>
            <span>{t("reorderQty")}</span>
            <span>SKU</span>
            <span>{t("status")}</span>
          </div>

          {filtered.length === 0 ? (
            <div className="py-12 text-center text-xs text-gray-500 dark:text-gray-600">{t("noStockMatch")}</div>
          ) : (
            filtered.map((s, i) => {
              const sc  = STATUS_CONFIG[s.status];
              const pct = Math.min(Math.round((s.current / Math.max(s.minimum, 1)) * 100), 100);
              return (
                <div key={s.id}
                  className={`grid px-6 py-4 items-center hover:bg-gray-50 dark:hover:bg-white/[0.02] transition ${i < filtered.length - 1 ? "border-b border-gray-100 dark:border-white/[0.03]" : ""}`}
                  style={{ gridTemplateColumns: "2.2fr 1.2fr 1fr 1fr 1fr 1.2fr 1.2fr" }}>

                  {/* Product */}
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}>
                      {s.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{s.name}</p>
                      <p className="text-[10px] text-gray-400 dark:text-gray-600">{s.id}</p>
                    </div>
                  </div>

                  {/* Category */}
                  <p className="text-xs text-gray-500 dark:text-gray-400">{s.category}</p>

                  {/* Current stock + mini bar */}
                  <div>
                    <p className={`text-sm font-bold ${s.current === 0 ? "text-red-400" : s.current <= s.minimum ? "text-amber-400" : "text-gray-900 dark:text-white"}`}>
                      {s.current.toLocaleString()}
                    </p>
                    <div className="mt-1 h-1 w-14 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: mounted ? `${pct}%` : "0%" }}
                        transition={{ delay: 0.2 + i * 0.05, duration: 0.5 }}
                        className={`h-full rounded-full ${s.current === 0 ? "bg-red-500" : s.current <= s.minimum ? "bg-amber-500" : "bg-emerald-500"}`}
                      />
                    </div>
                  </div>

                  {/* Minimum */}
                  <p className="text-sm text-gray-500 dark:text-gray-400">{s.minimum.toLocaleString()}</p>

                  {/* Reorder Qty */}
                  <p className="text-sm text-gray-500 dark:text-gray-400">{s.reorderQty.toLocaleString()}</p>

                  {/* SKU */}
                  <p className="text-xs text-gray-400 dark:text-gray-500 tracking-wider">{s.sku}</p>

                  {/* Status badge */}
                  <div>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${sc.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                      {sc.label}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </DashboardLayout>
  );
}