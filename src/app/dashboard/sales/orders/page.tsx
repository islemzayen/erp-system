"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import {
  ShoppingCart, CheckCircle, Clock, TrendingUp,
  Search, Plus, Download, ArrowDownToLine,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Order {
  id: string;
  customer: string;
  product: string;
  amount: number;
  status: "completed" | "processing" | "pending" | "cancelled";
  date: string;
  avatar: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const ORDERS: Order[] = [
  { id: "ORD-7841", customer: "Amira Benali",    product: "Mortise Lock Pro × 12",      amount: 2400,  status: "completed",  date: "20 Feb", avatar: "AB" },
  { id: "ORD-7840", customer: "Khalil Mansouri", product: "Brass Key Blank B2 × 500",   amount: 875,   status: "processing", date: "20 Feb", avatar: "KM" },
  { id: "ORD-7839", customer: "Sarra Tlili",     product: "Smart Key Module × 8",       amount: 3200,  status: "pending",    date: "19 Feb", avatar: "ST" },
  { id: "ORD-7838", customer: "Fares Dridi",     product: "Padlock Shackle 50mm × 200", amount: 1600,  status: "completed",  date: "19 Feb", avatar: "FD" },
  { id: "ORD-7837", customer: "Nour Hamdi",      product: "Cylinder Lock Core × 30",    amount: 5100,  status: "cancelled",  date: "18 Feb", avatar: "NH" },
  { id: "ORD-7836", customer: "Tarek Jebali",    product: "RFID Tag Sticker × 1000",    amount: 740,   status: "completed",  date: "18 Feb", avatar: "TJ" },
  { id: "ORD-7835", customer: "Rim Chaibi",      product: "Deadbolt Lock Set × 5",      amount: 1620,  status: "processing", date: "17 Feb", avatar: "RC" },
  { id: "ORD-7834", customer: "Yassine Karray",  product: "Key Duplicator Unit × 1",    amount: 1200,  status: "pending",    date: "17 Feb", avatar: "YK" },
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

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function OrdersPage() {
  const { t } = useLanguage();
  const [search, setSearch]       = useState("");
  const [filterStatus, setFilter] = useState("all");
  const [mounted, setMounted]     = useState(false);
  useEffect(() => setMounted(true), []);

  const STATUS_CONFIG = {
    completed:  { label: t("completed"),  badge: "bg-emerald-500/15 text-emerald-400", dot: "bg-emerald-400" },
    processing: { label: t("processing"), badge: "bg-blue-500/15 text-blue-400",       dot: "bg-blue-400"    },
    pending:    { label: t("pending"),    badge: "bg-amber-500/15 text-amber-400",     dot: "bg-amber-400"   },
    cancelled:  { label: t("cancelled"),  badge: "bg-red-500/15 text-red-400",         dot: "bg-red-400"     },
  };

  const filtered = ORDERS.filter(o => {
    const matchSearch =
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.product.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const completedCount  = ORDERS.filter(o => o.status === "completed").length;
  const processingCount = ORDERS.filter(o => o.status === "processing").length;
  const pendingCount    = ORDERS.filter(o => o.status === "pending").length;
  const cancelledCount  = ORDERS.filter(o => o.status === "cancelled").length;
  const activeOrders    = ORDERS.filter(o => o.status !== "cancelled");
  const totalRevenue    = activeOrders.reduce((s, o) => s + o.amount, 0);
  const avgOrderVal     = Math.round(totalRevenue / activeOrders.length);
  const completionRate  = Math.round((completedCount / ORDERS.length) * 100);

  const card = "bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-white/[0.06] rounded-2xl transition-colors duration-300";

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-100 dark:bg-[#060a0f] text-gray-900 dark:text-white font-mono p-6 space-y-6 transition-colors duration-300">

        {/* ── HEADER ─────────────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
           <h1 className="text-3xl font-bold tracking-tight leading-none">
  {t("orders")} <span className="text-emerald-400">{t("onlineOrdersTitle")}</span>
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

        {/* ── KPI CARDS ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            {
              label: t("totalOrdersKpi2"), value: ORDERS.length,    suffix: "",
              change: `+${ORDERS.length} ${t("thisMonth")}`,        changeColor: "text-emerald-400",
              valueColor: "text-emerald-400", icon: <ShoppingCart size={16} />,
              iconBg: "bg-emerald-500/10 text-emerald-400",
            },
            {
              label: t("completedKpi2"),  value: completedCount,    suffix: "",
              change: t("successfullyDone"),                         changeColor: "text-blue-400",
              valueColor: "text-blue-400", icon: <CheckCircle size={16} />,
              iconBg: "bg-blue-500/10 text-blue-400",
            },
            {
              label: t("processingKpi"),  value: processingCount,   suffix: "",
              change: t("inTransitSub"),                             changeColor: "text-amber-400",
              valueColor: "text-amber-400", icon: <Clock size={16} />,
              iconBg: "bg-amber-500/10 text-amber-400",
            },
            {
              label: t("totalRevenue"),   value: totalRevenue,      suffix: "",
              change: t("revenueThisPeriod"),                        changeColor: "text-purple-400",
              valueColor: "text-purple-400", icon: <TrendingUp size={16} />,
              iconBg: "bg-purple-500/10 text-purple-400",
            },
          ].map((kpi, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className={`${card} p-5 flex flex-col gap-3`}>
              <div className="flex items-start justify-between">
                <div className={`p-2 rounded-xl ${kpi.iconBg}`}>{kpi.icon}</div>
                <span className={`text-xs font-bold ${kpi.changeColor}`}>{kpi.change}</span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-gray-500">{kpi.label}</p>
              {i === 3 ? (
                <div>
                  <p className={`text-3xl font-bold tracking-tight ${kpi.valueColor}`}>
                    {(kpi.value / 1000).toFixed(1)}K
                  </p>
                  <p className="text-[10px] text-gray-500 mt-0.5">TND {kpi.value.toLocaleString()}</p>
                </div>
              ) : (
                <p className={`text-3xl font-bold tracking-tight ${kpi.valueColor}`}>
                  {kpi.value.toLocaleString()}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* ── SECONDARY STRIP ────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { label: t("pendingKpi2"),    value: String(pendingCount),                    sub: t("awaitingSub")     },
            { label: t("completionRate"), value: `${completionRate}%`,                    sub: t("fulfilled")       },
            { label: t("avgOrder"),       value: `TND ${avgOrderVal.toLocaleString()}`,   sub: t("perOrder")        },
            { label: t("cancelled"),      value: String(cancelledCount),                  sub: t("thisMonth")       },
          ].map((s, i) => (
            <div key={i} className={`${card} px-5 py-4`}>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">{s.label}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* ── TABLE ──────────────────────────────────────────────────────── */}
        <div className={`${card} overflow-hidden`}>
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-white/[0.05]">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">{t("allOrdersTitle")}</h2>
              <p className="text-xs text-gray-500">
                {filtered.length} {t("ofText")} {ORDERS.length} {t("orders")}
              </p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative">
                <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  className="pl-8 pr-3 py-1.5 bg-gray-100 dark:bg-black/30 border border-gray-300 dark:border-white/10 rounded-lg text-xs focus:outline-none focus:border-emerald-500/40 transition text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600"
                  placeholder={t("searchOrders2")}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <select
                className="px-3 py-1.5 bg-gray-100 dark:bg-black/30 border border-gray-300 dark:border-white/10 rounded-lg text-xs text-gray-600 dark:text-gray-300 focus:outline-none focus:border-emerald-500/40 transition"
                value={filterStatus}
                onChange={e => setFilter(e.target.value)}
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
          <div
            className="grid px-6 py-3 text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-600 border-b border-gray-100 dark:border-white/[0.04]"
            style={{ gridTemplateColumns: "2.2fr 2.5fr 1.2fr 1.2fr 0.8fr" }}
          >
            <span>{t("order")}</span>
            <span>{t("product")}</span>
            <span>{t("amount")}</span>
            <span>{t("status")}</span>
            <span>{t("date")}</span>
          </div>

          {filtered.length === 0 ? (
            <div className="py-12 text-center text-xs text-gray-500 dark:text-gray-600">
              {t("noOrdersMatch2")}
            </div>
          ) : (
            filtered.map((order, i) => {
              const sc = STATUS_CONFIG[order.status];
              return (
                <div
                  key={order.id}
                  className={`grid px-6 py-4 items-center hover:bg-gray-50 dark:hover:bg-white/[0.02] transition ${i < filtered.length - 1 ? "border-b border-gray-100 dark:border-white/[0.03]" : ""}`}
                  style={{ gridTemplateColumns: "2.2fr 2.5fr 1.2fr 1.2fr 0.8fr" }}
                >
                  {/* Customer + Order ID */}
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}>
                      {order.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{order.customer}</p>
                      <p className="text-[10px] text-gray-400 dark:text-gray-600">{order.id}</p>
                    </div>
                  </div>

                  {/* Product */}
                  <p className="text-xs text-gray-500 dark:text-gray-400 pr-4 truncate">{order.product}</p>

                  {/* Amount in TND */}
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    TND {order.amount.toLocaleString()}
                  </p>

                  {/* Status badge */}
                  <div>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${sc.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                      {sc.label}
                    </span>
                  </div>

                  {/* Date */}
                  <p className="text-[10px] text-gray-400 dark:text-gray-600">{order.date}</p>
                </div>
              );
            })
          )}
        </div>

      </div>
    </DashboardLayout>
  );
}