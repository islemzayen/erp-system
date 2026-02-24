"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { Truck, Search, Plus, Download, ArrowDownToLine, Package, CheckCircle, Clock } from "lucide-react";

interface Shipment {
  id: string; orderId: string; customer: string; product: string;
  tracking: string; carrier: string;
  status: "delivered" | "in-transit" | "pending" | "failed";
  date: string; eta: string; avatar: string;
}

const SHIPMENTS: Shipment[] = [
  { id: "SHP-301", orderId: "ORD-7841", customer: "Amira Benali",    product: "Mortise Lock Pro × 12",      tracking: "TN-482910-DHL", carrier: "DHL",    status: "delivered",  date: "20 Feb", eta: "20 Feb", avatar: "AB" },
  { id: "SHP-300", orderId: "ORD-7840", customer: "Khalil Mansouri", product: "Brass Key Blank B2 × 500",   tracking: "TN-481002-ARW", carrier: "Aramex", status: "in-transit", date: "20 Feb", eta: "22 Feb", avatar: "KM" },
  { id: "SHP-299", orderId: "ORD-7839", customer: "Sarra Tlili",     product: "Smart Key Module × 8",       tracking: "TN-480714-DHL", carrier: "DHL",    status: "pending",    date: "19 Feb", eta: "23 Feb", avatar: "ST" },
  { id: "SHP-298", orderId: "ORD-7838", customer: "Fares Dridi",     product: "Padlock Shackle 50mm × 200", tracking: "TN-479983-TNT", carrier: "TNT",    status: "delivered",  date: "19 Feb", eta: "19 Feb", avatar: "FD" },
  { id: "SHP-297", orderId: "ORD-7836", customer: "Tarek Jebali",    product: "RFID Tag Sticker × 1000",    tracking: "TN-478820-ARW", carrier: "Aramex", status: "in-transit", date: "18 Feb", eta: "21 Feb", avatar: "TJ" },
  { id: "SHP-296", orderId: "ORD-7835", customer: "Yasmine Chaabane",product: "Deadbolt Lock Set × 20",     tracking: "TN-478102-DHL", carrier: "DHL",    status: "in-transit", date: "17 Feb", eta: "21 Feb", avatar: "YC" },
  { id: "SHP-295", orderId: "ORD-7834", customer: "Aziz Trabelsi",   product: "Key Duplicator Unit × 2",    tracking: "TN-477411-TNT", carrier: "TNT",    status: "failed",     date: "17 Feb", eta: "—",      avatar: "AT" },
  { id: "SHP-294", orderId: "ORD-7832", customer: "Nour Hamdi",      product: "Cylinder Lock Core × 30",    tracking: "TN-476009-ARW", carrier: "Aramex", status: "delivered",  date: "16 Feb", eta: "18 Feb", avatar: "NH" },
];

const CARRIER_BADGE: Record<string, string> = {
  DHL:    "bg-amber-500/10 text-amber-400",
  Aramex: "bg-blue-500/10 text-blue-400",
  TNT:    "bg-purple-500/10 text-purple-400",
};

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

export default function TrackingPage() {
  const { t } = useLanguage();
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery]   = useState("");
  const [mounted, setMounted]           = useState(false);
  useEffect(() => setMounted(true), []);

  const STATUS_CONFIG = {
    delivered:    { label: t("delivered"),  badge: "bg-emerald-500/15 text-emerald-400", dot: "bg-emerald-400" },
    "in-transit": { label: t("inTransit"),  badge: "bg-blue-500/15 text-blue-400",       dot: "bg-blue-400" },
    pending:      { label: t("pending"),    badge: "bg-amber-500/15 text-amber-400",     dot: "bg-amber-400" },
    failed:       { label: t("failedKpi"), badge: "bg-red-500/15 text-red-400",          dot: "bg-red-400" },
  };

  const filtered = SHIPMENTS.filter(s => {
    const matchStatus = filterStatus === "all" || s.status === filterStatus;
    const matchSearch =
      s.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tracking.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.product.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  const deliveredCount  = SHIPMENTS.filter(s => s.status === "delivered").length;
  const inTransitCount  = SHIPMENTS.filter(s => s.status === "in-transit").length;
  const pendingCount    = SHIPMENTS.filter(s => s.status === "pending").length;
  const failedCount     = SHIPMENTS.filter(s => s.status === "failed").length;

  const card = "bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-white/[0.06] rounded-2xl transition-colors duration-300";

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-100 dark:bg-[#060a0f] text-gray-900 dark:text-white font-mono p-6 space-y-6 transition-colors duration-300">

        {/* ── HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
           <h1 className="text-3xl font-bold tracking-tight leading-none">
  {t("deliveryTracking").split(" ")[0]}{" "}
  <span className="text-emerald-400">
    {t("deliveryTracking").split(" ").slice(1).join(" ")}
  </span>
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
              <Plus size={13} /> {t("newShipment")}
            </button>
          </div>
        </div>

        {/* ── KPI CARDS ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { label: t("totalShipments"), value: SHIPMENTS.length, change: t("thisMonthSub"),  changeColor: "text-emerald-400", valueColor: "text-emerald-400", icon: <Truck size={16} />,       iconBg: "bg-emerald-500/10 text-emerald-400" },
            { label: t("delivered"),      value: deliveredCount,   change: t("completedSub"), changeColor: "text-blue-400",    valueColor: "text-blue-400",    icon: <CheckCircle size={16} />, iconBg: "bg-blue-500/10 text-blue-400" },
            { label: t("inTransit"),      value: inTransitCount,   change: t("onTheWay"),     changeColor: "text-amber-400",   valueColor: "text-amber-400",   icon: <Package size={16} />,     iconBg: "bg-amber-500/10 text-amber-400" },
            { label: t("failedKpi"),      value: failedCount,      change: t("needsActionSub"),changeColor: "text-red-400",    valueColor: "text-red-400",     icon: <Clock size={16} />,       iconBg: "bg-red-500/10 text-red-400" },
          ].map((kpi, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className={`${card} p-5 flex flex-col gap-3`}>
              <div className="flex items-start justify-between">
                <div className={`p-2 rounded-xl ${kpi.iconBg}`}>{kpi.icon}</div>
                <span className={`text-xs font-bold ${kpi.changeColor}`}>{kpi.change}</span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-gray-500">{kpi.label}</p>
              <p className={`text-3xl font-bold tracking-tight ${kpi.valueColor}`}>{kpi.value}</p>
            </motion.div>
          ))}
        </div>

        {/* ── SECONDARY STRIP ── */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { label: t("pendingShip"),   value: String(pendingCount),                                              sub: t("awaitingDispatch") },
            { label: t("deliveryRate"),  value: `${Math.round((deliveredCount / SHIPMENTS.length) * 100)}%`,       sub: t("successRate") },
            { label: t("carriersKpi"),   value: "3",                                                               sub: "DHL · Aramex · TNT" },
            { label: t("avgEta"),        value: "2.4d",                                                            sub: t("daysToDeliver") },
          ].map((s, i) => (
            <div key={i} className={`${card} px-5 py-4`}>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">{s.label}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* ── SHIPMENTS TABLE ── */}
        <div className={`${card} overflow-hidden`}>
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-white/[0.05]">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">{t("shipmentTracker")}</h2>
              <p className="text-xs text-gray-500">{filtered.length} of {SHIPMENTS.length} {t("shipments")}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  className="pl-8 pr-3 py-1.5 bg-gray-100 dark:bg-black/30 border border-gray-300 dark:border-white/10 rounded-lg text-xs focus:outline-none focus:border-emerald-500/40 transition text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600"
                  placeholder={t("searchShipments")}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              <select
                className="px-3 py-1.5 bg-gray-100 dark:bg-black/30 border border-gray-300 dark:border-white/10 rounded-lg text-xs text-gray-600 dark:text-gray-300 focus:outline-none focus:border-emerald-500/40 transition"
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
              >
                <option value="all">{t("allStatus")}</option>
                <option value="delivered">{t("delivered")}</option>
                <option value="in-transit">{t("inTransit")}</option>
                <option value="pending">{t("pending")}</option>
                <option value="failed">{t("failedKpi")}</option>
              </select>
              <button className="flex items-center gap-2 border border-gray-300 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/20 px-3 py-1.5 rounded-lg text-xs text-gray-500 dark:text-gray-400 transition">
                <ArrowDownToLine size={12} /> {t("export")}
              </button>
            </div>
          </div>

          <div className="grid px-6 py-3 text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-600 border-b border-gray-100 dark:border-white/[0.04]"
            style={{ gridTemplateColumns: "2fr 2fr 1.5fr 1fr 1fr 1fr 1fr" }}>
            <span>{t("customer")}</span><span>{t("product")}</span><span>{t("trackingNo")}</span>
            <span>{t("carrier")}</span><span>{t("shipped")}</span><span>{t("eta")}</span><span>{t("status")}</span>
          </div>

          {filtered.length === 0 ? (
            <div className="py-12 text-center text-xs text-gray-500 dark:text-gray-600">{t("noShipmentsMatch")}</div>
          ) : (
            filtered.map((s, i) => {
              const sc = STATUS_CONFIG[s.status];
              const cc = CARRIER_BADGE[s.carrier] ?? "bg-gray-500/10 text-gray-400";
              return (
                <div key={s.id}
                  className={`grid px-6 py-4 items-center hover:bg-gray-50 dark:hover:bg-white/[0.02] transition ${i < filtered.length - 1 ? "border-b border-gray-100 dark:border-white/[0.03]" : ""}`}
                  style={{ gridTemplateColumns: "2fr 2fr 1.5fr 1fr 1fr 1fr 1fr" }}>

                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}>
                      {s.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{s.customer}</p>
                      <p className="text-[10px] text-gray-400 dark:text-gray-600">{s.id} · {s.orderId}</p>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 dark:text-gray-400 pr-4">{s.product}</p>

                  <p className="text-xs text-gray-700 dark:text-gray-300 font-bold tracking-wider">{s.tracking}</p>

                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold w-fit ${cc}`}>
                    {s.carrier}
                  </span>

                  <p className="text-[10px] text-gray-400 dark:text-gray-600">{s.date}</p>

                  <p className={`text-xs font-bold ${s.status === "delivered" ? "text-emerald-400" : s.status === "failed" ? "text-red-400" : "text-gray-500 dark:text-gray-400"}`}>
                    {s.eta}
                  </p>

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

        {/* ── BOTTOM ROW: Carrier split + Activity + Quick Actions ── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

          {/* Carrier breakdown */}
          <div className={`${card} p-6`}>
            <h2 className="text-base font-bold text-gray-900 dark:text-white mb-1">{t("shipmentsByCarrier")}</h2>
            <p className="text-xs text-gray-500 mb-5">{t("volumeSplitMonth")}</p>
            <div className="space-y-4">
              {[
                { name: "DHL",    count: SHIPMENTS.filter(s => s.carrier === "DHL").length,    color: "bg-amber-500",  pct: 38 },
                { name: "Aramex", count: SHIPMENTS.filter(s => s.carrier === "Aramex").length, color: "bg-blue-500",   pct: 37 },
                { name: "TNT",    count: SHIPMENTS.filter(s => s.carrier === "TNT").length,    color: "bg-purple-500", pct: 25 },
              ].map((c, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-xs text-gray-500 dark:text-gray-400">{c.name}</span>
                    <div className="flex gap-3">
                      <span className="text-xs text-gray-400 dark:text-gray-500">{c.count} {t("shipments")}</span>
                      <span className="text-xs font-bold text-gray-900 dark:text-white">{c.pct}%</span>
                    </div>
                  </div>
                  <div className="h-1 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: mounted ? `${c.pct}%` : "0%" }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                      className={`h-full ${c.color} rounded-full`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity feed */}
          <div className={`${card} p-6`}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-base font-bold text-gray-900 dark:text-white">{t("activityFeed")}</h2>
                <p className="text-xs text-gray-500">{t("liveUpdates")}</p>
              </div>
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse inline-block" />
            </div>
            <div className="space-y-1">
              {[
                { text: "SHP-301 delivered to Amira Benali",     time: "12m ago", icon: "✓", iconBg: "bg-emerald-500/15 text-emerald-400" },
                { text: "SHP-295 failed — address not found",    time: "1h ago",  icon: "✕", iconBg: "bg-red-500/15 text-red-400" },
                { text: "SHP-300 arrived at Tunis hub",          time: "2h ago",  icon: "→", iconBg: "bg-blue-500/15 text-blue-400" },
                { text: "SHP-298 delivered to Fares Dridi",      time: "3h ago",  icon: "✓", iconBg: "bg-emerald-500/15 text-emerald-400" },
                { text: "SHP-299 dispatched from warehouse",     time: "5h ago",  icon: "↑", iconBg: "bg-amber-500/15 text-amber-400" },
              ].map((a, i) => (
                <div key={i} className={`flex items-start gap-3 py-3 ${i < 4 ? "border-b border-gray-100 dark:border-white/[0.04]" : ""}`}>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${a.iconBg}`}>
                    {a.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900 dark:text-white">{a.text}</p>
                    <p className="text-[10px] text-gray-400 dark:text-gray-600 mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions + Delivery goal */}
          <div className={`${card} p-6 flex flex-col gap-6`}>
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white mb-1">{t("quickActions")}</h2>
              <p className="text-xs text-gray-500 mb-4">{t("shortcuts")}</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: t("newShipment"), icon: "🚚", cls: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" },
                  { label: "Track Order",    icon: "📍", cls: "bg-blue-500/10 border-blue-500/20 text-blue-400" },
                  { label: "Print Label",    icon: "🖨️", cls: "bg-purple-500/10 border-purple-500/20 text-purple-400" },
                  { label: "Report Issue",   icon: "⚠️", cls: "bg-amber-500/10 border-amber-500/20 text-amber-400" },
                  { label: "Schedule",       icon: "📅", cls: "bg-teal-500/10 border-teal-500/20 text-teal-400" },
                  { label: "Returns",        icon: "↩️", cls: "bg-red-500/10 border-red-500/20 text-red-400" },
                ].map((a, i) => (
                  <button key={i} className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold border transition hover:brightness-125 ${a.cls}`}>
                    <span>{a.icon}</span>
                    <span className="text-gray-900 dark:text-white/80">{a.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Delivery goal */}
            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
              <div className="flex justify-between mb-2">
                <span className="text-xs font-bold text-gray-700 dark:text-white/70">{t("deliveryGoal")}</span>
                <span className="text-xs font-bold text-emerald-400">
                  {Math.round((deliveredCount / SHIPMENTS.length) * 100)}%
                </span>
              </div>
              <div className="h-1.5 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: mounted ? `${Math.round((deliveredCount / SHIPMENTS.length) * 100)}%` : "0%" }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-blue-500"
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-[10px] text-gray-400 dark:text-gray-600">{deliveredCount} / {SHIPMENTS.length} {t("delivered")}</span>
                <span className="text-[10px] text-amber-400">{inTransitCount} {t("stillMoving")}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}