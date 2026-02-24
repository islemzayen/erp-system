"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import {
  DollarSign, ShoppingCart, Truck, RefreshCw,
  Download, Plus, Search, ArrowDownToLine,
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Order {
  id: string; customer: string; product: string;
  amount: number; status: "completed" | "pending" | "processing" | "cancelled";
  date: string; avatar: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const CHART_DATA = [
  { label: "Jan", revenue: 28400, orders: 210 },
  { label: "Feb", revenue: 32100, orders: 248 },
  { label: "Mar", revenue: 29800, orders: 231 },
  { label: "Apr", revenue: 41200, orders: 312 },
  { label: "May", revenue: 38700, orders: 289 },
  { label: "Jun", revenue: 48200, orders: 356 },
];

const RECENT_ORDERS: Order[] = [
  { id: "ORD-7841", customer: "Amira Benali",    product: "Mortise Lock Pro × 12",       amount: 2400, status: "completed",  date: "20 Feb", avatar: "AB" },
  { id: "ORD-7840", customer: "Khalil Mansouri", product: "Brass Key Blank B2 × 500",    amount: 875,  status: "processing", date: "20 Feb", avatar: "KM" },
  { id: "ORD-7839", customer: "Sarra Tlili",     product: "Smart Key Module × 8",        amount: 3200, status: "pending",    date: "19 Feb", avatar: "ST" },
  { id: "ORD-7838", customer: "Fares Dridi",     product: "Padlock Shackle 50mm × 200",  amount: 1600, status: "completed",  date: "19 Feb", avatar: "FD" },
  { id: "ORD-7837", customer: "Nour Hamdi",      product: "Cylinder Lock Core × 30",     amount: 5100, status: "cancelled",  date: "18 Feb", avatar: "NH" },
  { id: "ORD-7836", customer: "Tarek Jebali",    product: "RFID Tag Sticker × 1000",     amount: 740,  status: "completed",  date: "18 Feb", avatar: "TJ" },
];

const TOP_PRODUCTS = [
  { name: "Brass Key Blank B2",    sales: 4210, pct: 92 },
  { name: "Padlock Shackle 50mm",  sales: 2780, pct: 68 },
  { name: "Mortise Lock Pro",      sales: 1950, pct: 52 },
  { name: "Smart Key Module",      sales: 1400, pct: 38 },
  { name: "RFID Tag Sticker",      sales: 880,  pct: 24 },
];

const AVATAR_COLORS = [
  "bg-emerald-500/20 text-emerald-400",
  "bg-blue-500/20 text-blue-400",
  "bg-purple-500/20 text-purple-400",
  "bg-amber-500/20 text-amber-400",
  "bg-pink-500/20 text-pink-400",
  "bg-teal-500/20 text-teal-400",
];

// ─── Sparkline ────────────────────────────────────────────────────────────────
function Sparkline({ data, dataKey, color }: { data: any[]; dataKey: string; color: string }) {
  return (
    <ResponsiveContainer width="100%" height={48}>
      <LineChart data={data}>
        <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

// ─── Animated Counter ─────────────────────────────────────────────────────────
function Counter({ value, prefix = "" }: { value: number; prefix?: string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1200, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.floor(e * value));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value]);
  return <>{prefix}{display.toLocaleString()}</>;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function SalesDashboard() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"6m" | "3m" | "1m">("6m");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const STATUS_CONFIG = {
    completed:  { label: t("completed"),  badge: "bg-emerald-500/15 text-emerald-400", dot: "bg-emerald-400" },
    processing: { label: t("processing"), badge: "bg-blue-500/15 text-blue-400",       dot: "bg-blue-400" },
    pending:    { label: t("pending"),    badge: "bg-amber-500/15 text-amber-400",     dot: "bg-amber-400" },
    cancelled:  { label: t("cancelled"),  badge: "bg-red-500/15 text-red-400",         dot: "bg-red-400" },
  };

  const filteredOrders = RECENT_ORDERS.filter(o => {
    const matchStatus = filterStatus === "all" || o.status === filterStatus;
    const matchSearch =
      o.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  const card = "bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-white/[0.06] rounded-2xl transition-colors duration-300";
  const tooltipStyle = { backgroundColor: "#0d1117", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "10px", fontSize: "11px" };

  const kpis = [
    { label: t("totalRevenue2"),     value: 48200, prefix: "$", change: "+12.4%",       changeColor: "text-emerald-400", valueColor: "text-emerald-400", sparkColor: "#10b981", icon: <DollarSign size={16} />,  iconBg: "bg-emerald-500/10 text-emerald-400", spark: [{ v:28400 },{ v:32100 },{ v:29800 },{ v:41200 },{ v:38700 },{ v:48200 }] },
    { label: t("totalOrdersKpi2"),   value: 356,   prefix: "",  change: "+8.2%",        changeColor: "text-blue-400",    valueColor: "text-blue-400",    sparkColor: "#60a5fa", icon: <ShoppingCart size={16} />, iconBg: "bg-blue-500/10 text-blue-400",    spark: [{ v:210 },{ v:248 },{ v:231 },{ v:312 },{ v:289 },{ v:356 }] },
    { label: t("pendingShipments"),  value: 23,    prefix: "",  change: t("todayChange"),changeColor: "text-amber-400", valueColor: "text-amber-400",   sparkColor: "#f59e0b", icon: <Truck size={16} />,        iconBg: "bg-amber-500/10 text-amber-400",  spark: [{ v:18 },{ v:24 },{ v:20 },{ v:29 },{ v:26 },{ v:23 }] },
    { label: t("returns"),           value: 5,     prefix: "",  change: "-40%",         changeColor: "text-red-400",     valueColor: "text-red-400",     sparkColor: "#f87171", icon: <RefreshCw size={16} />,   iconBg: "bg-red-500/10 text-red-400",      spark: [{ v:12 },{ v:9 },{ v:14 },{ v:8 },{ v:10 },{ v:5 }] },
  ];

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-100 dark:bg-[#060a0f] text-gray-900 dark:text-white font-mono p-6 space-y-6 transition-colors duration-300">

        {/* ── HEADER ─────────────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight leading-none">
  {t("dashboard")}{" "}
  <span className="text-emerald-400">{t("onlineSales")}</span>
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
              <Plus size={13} /> {t("newOrder2")}
            </button>
          </div>
        </div>

        {/* ── TOP KPI CARDS ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {kpis.map((kpi, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className={`${card} p-5 flex flex-col gap-3`}>
              <div className="flex items-start justify-between">
                <div className={`p-2 rounded-xl ${kpi.iconBg}`}>{kpi.icon}</div>
                <span className={`text-xs font-bold ${kpi.changeColor}`}>{kpi.change}</span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-gray-500">{kpi.label}</p>
              <p className={`text-3xl font-bold tracking-tight ${kpi.valueColor}`}>
                {mounted ? <Counter value={kpi.value} prefix={kpi.prefix} /> : `${kpi.prefix}${kpi.value}`}
              </p>
              <div className="-mx-1">
                <Sparkline data={kpi.spark} dataKey="v" color={kpi.sparkColor} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── SECONDARY KPI STRIP ────────────────────────────────────────── */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { label: t("avgOrderValue"),  value: "$135.40", sub: t("perTransaction") },
            { label: t("conversionRate"), value: "68.4%",   sub: "+2.1% vs last month" },
            { label: t("newCustomers"),   value: "142",     sub: t("thisMonth") },
            { label: t("customerLtv"),    value: "$2,840",  sub: t("avgLifetime") },
          ].map((s, i) => (
            <div key={i} className={`${card} px-5 py-4`}>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">{s.label}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* ── CHARTS ROW ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

          {/* Revenue Overview (2/3) */}
          <div className={`${card} p-6 xl:col-span-2 space-y-2`}>
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-base font-bold text-gray-900 dark:text-white">{t("revenueOverview")}</h2>
                <p className="text-xs text-gray-500">{t("monthlyPerf")}</p>
              </div>
              <div className="flex gap-1">
                {(["6m", "3m", "1m"] as const).map((r) => (
                  <button key={r} onClick={() => setActiveTab(r)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition ${activeTab === r ? "bg-emerald-500 text-black" : "text-gray-400 hover:text-gray-900 dark:hover:text-white"}`}>
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-8 py-2">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-500">{t("totalRevenue2")}</p>
                <p className="text-2xl font-bold text-emerald-400">$218,400</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-500">{t("totalOrdersKpi2")}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">1,646</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">{t("revenueUSD")}</p>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={CHART_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:[stroke:#1a2030]" />
                    <XAxis dataKey="label" stroke="#9ca3af" tick={{ fontSize: 11 }} />
                    <YAxis stroke="#9ca3af" tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">{t("ordersPerMonth")}</p>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={CHART_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:[stroke:#1a2030]" />
                    <XAxis dataKey="label" stroke="#9ca3af" tick={{ fontSize: 11 }} />
                    <YAxis stroke="#9ca3af" tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Line type="monotone" dataKey="orders" stroke="#60a5fa" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Top Products (1/3) */}
          <div className={`${card} p-6`}>
            <h2 className="text-base font-bold text-gray-900 dark:text-white">{t("topProducts")}</h2>
            <p className="text-xs text-gray-500 mb-5">{t("unitsSoldMonth")}</p>
            <div className="space-y-5">
              {TOP_PRODUCTS.map((p, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-1.5">
                    <div>
                      <span className="text-gray-400 text-xs mr-2">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{p.name}</span>
                    </div>
                    <span className="text-emerald-400 text-sm font-bold">{p.sales.toLocaleString()}</span>
                  </div>
                  <div className="h-1 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: mounted ? `${p.pct}%` : "0%" }}
                      transition={{ delay: 0.3 + i * 0.07, duration: 0.6 }}
                      className="h-full bg-emerald-500 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── ORDERS TABLE ───────────────────────────────────────────────── */}
        <div className={`${card} overflow-hidden`}>
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-white/[0.05]">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">{t("recentOrders")}</h2>
              <p className="text-xs text-gray-500">{filteredOrders.length} of {RECENT_ORDERS.length} {t("orders")}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  className="pl-8 pr-3 py-1.5 bg-gray-100 dark:bg-black/30 border border-gray-300 dark:border-white/10 rounded-lg text-xs focus:outline-none focus:border-emerald-500/40 transition text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600"
                  placeholder={t("searchOrdersPlaceholder")}
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
                <option value="completed">{t("completed")}</option>
                <option value="processing">{t("processing")}</option>
                <option value="pending">{t("pending")}</option>
                <option value="cancelled">{t("cancelled")}</option>
              </select>
              <button className="flex items-center gap-2 border border-gray-300 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/20 px-3 py-1.5 rounded-lg text-xs text-gray-500 dark:text-gray-400 transition">
                <ArrowDownToLine size={12} /> {t("export")}
              </button>
            </div>
          </div>

          {/* Table header */}
          <div className="grid px-6 py-3 text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-600 border-b border-gray-100 dark:border-white/[0.04]"
            style={{ gridTemplateColumns: "2fr 2.5fr 1fr 1.2fr 0.7fr" }}>
            <span>{t("order")}</span>
            <span>{t("product")}</span>
            <span>{t("amount")}</span>
            <span>{t("status")}</span>
            <span>{t("date")}</span>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="py-12 text-center text-xs text-gray-500 dark:text-gray-600">{t("noOrdersMatchFilter")}</div>
          ) : (
            filteredOrders.map((order, i) => {
              const sc = STATUS_CONFIG[order.status];
              return (
                <div key={order.id}
                  className={`grid px-6 py-4 items-center hover:bg-gray-50 dark:hover:bg-white/[0.02] transition ${i < filteredOrders.length - 1 ? "border-b border-gray-100 dark:border-white/[0.03]" : ""}`}
                  style={{ gridTemplateColumns: "2fr 2.5fr 1fr 1.2fr 0.7fr" }}>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}>
                      {order.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{order.customer}</p>
                      <p className="text-[10px] text-gray-400 dark:text-gray-600">{order.id}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 pr-4">{order.product}</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">${order.amount.toLocaleString()}</p>
                  <div>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${sc.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                      {sc.label}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400 dark:text-gray-600">{order.date}</p>
                </div>
              );
            })
          )}
        </div>

        {/* ── BOTTOM ROW ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

          {/* Sales by Channel */}
          <div className={`${card} p-6`}>
            <h2 className="text-base font-bold text-gray-900 dark:text-white mb-1">{t("salesByChannel")}</h2>
            <p className="text-xs text-gray-500 mb-5">{t("revenueSplitMonth")}</p>
            <div className="space-y-4">
              {[
                { name: t("directSales"), pct: 48, val: "$23,136", color: "bg-emerald-500" },
                { name: t("wholesale"),   pct: 31, val: "$14,942", color: "bg-blue-500" },
                { name: t("distributor"), pct: 14, val: "$6,748",  color: "bg-purple-500" },
                { name: t("onlineStore"), pct: 7,  val: "$3,374",  color: "bg-amber-500" },
              ].map((c, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-xs text-gray-500 dark:text-gray-400">{c.name}</span>
                    <div className="flex gap-3">
                      <span className="text-xs text-gray-400 dark:text-gray-500">{c.val}</span>
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

          {/* Activity Feed */}
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
                { text: "Order ORD-7841 completed",       time: "2m ago",  icon: "✓", iconBg: "bg-emerald-500/15 text-emerald-400" },
                { text: "Low stock alert: Cylinder Lock", time: "18m ago", icon: "⚠", iconBg: "bg-amber-500/15 text-amber-400" },
                { text: "New customer registered",        time: "34m ago", icon: "+", iconBg: "bg-blue-500/15 text-blue-400" },
                { text: "Shipment SHP-291 dispatched",    time: "1h ago",  icon: "→", iconBg: "bg-purple-500/15 text-purple-400" },
                { text: "Return request RET-045 opened",  time: "2h ago",  icon: "↺", iconBg: "bg-red-500/15 text-red-400" },
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

          {/* Quick Actions + Monthly Goal */}
          <div className={`${card} p-6 flex flex-col gap-6`}>
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white mb-1">{t("quickActions")}</h2>
              <p className="text-xs text-gray-500 mb-4">{t("shortcuts")}</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: t("newOrder2"),   icon: "📋", cls: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" },
                  { label: t("addProduct"),  icon: "📦", cls: "bg-blue-500/10 border-blue-500/20 text-blue-400" },
                  { label: t("invoice"),     icon: "🧾", cls: "bg-purple-500/10 border-purple-500/20 text-purple-400" },
                  { label: t("report"),      icon: "📊", cls: "bg-amber-500/10 border-amber-500/20 text-amber-400" },
                  { label: t("shipment"),    icon: "🚚", cls: "bg-teal-500/10 border-teal-500/20 text-teal-400" },
                  { label: t("returns"),     icon: "↩️", cls: "bg-red-500/10 border-red-500/20 text-red-400" },
                ].map((a, i) => (
                  <button key={i} className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold border transition hover:brightness-125 ${a.cls}`}>
                    <span>{a.icon}</span>
                    <span className="text-gray-900 dark:text-white/80">{a.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Monthly Goal */}
            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
              <div className="flex justify-between mb-2">
                <span className="text-xs font-bold text-gray-700 dark:text-white/70">{t("monthlyGoal")}</span>
                <span className="text-xs font-bold text-emerald-400">80.3%</span>
              </div>
              <div className="h-1.5 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: mounted ? "80.3%" : "0%" }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-blue-500"
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-[10px] text-gray-400 dark:text-gray-600">$48,200 / $60,000</span>
                <span className="text-[10px] text-amber-400">{t("daysLeft")}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}