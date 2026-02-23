"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { ShoppingCart, Search, Plus, Download, ArrowDownToLine, DollarSign, Clock, CheckCircle } from "lucide-react";
import { useState } from "react";

const orders = [
  { id: "#ORD-1001", customer: "Sarra Tlili",     product: "Mortise Lock Pro × 12",      total: "2,880 TND",  status: "Completed",  date: "20 Fév" },
  { id: "#ORD-1002", customer: "Fares Dridi",      product: "Brass Key Blank B2 × 500",   total: "2,187 TND",  status: "Processing", date: "20 Fév" },
  { id: "#ORD-1003", customer: "Amira Benali",     product: "Smart Key Module × 8",       total: "7,680 TND",  status: "Pending",    date: "19 Fév" },
  { id: "#ORD-1004", customer: "Khalil Mansouri",  product: "Padlock Shackle 50mm × 200", total: "3,840 TND",  status: "Completed",  date: "19 Fév" },
  { id: "#ORD-1005", customer: "Nour Hamdi",       product: "Cylinder Lock Core × 30",    total: "12,240 TND", status: "Cancelled",  date: "18 Fév" },
  { id: "#ORD-1006", customer: "Tarek Jebali",     product: "RFID Tag Sticker × 1000",    total: "1,776 TND",  status: "Completed",  date: "18 Fév" },
  { id: "#ORD-1007", customer: "Yasmine Chaabane", product: "Deadbolt Lock Set × 20",     total: "4,320 TND",  status: "Processing", date: "17 Fév" },
  { id: "#ORD-1008", customer: "Aziz Trabelsi",    product: "Key Duplicator Unit × 2",    total: "9,600 TND",  status: "Pending",    date: "17 Fév" },
];

const STATUS_KEYS: Record<string, string> = {
  Completed: "completed", Processing: "processing", Pending: "pending", Cancelled: "cancelled",
};
const STATUS_STYLES: Record<string, { badge: string; dot: string }> = {
  Completed:  { badge: "bg-emerald-500/15 text-emerald-400", dot: "bg-emerald-400" },
  Processing: { badge: "bg-blue-500/15 text-blue-400",       dot: "bg-blue-400" },
  Pending:    { badge: "bg-amber-500/15 text-amber-400",     dot: "bg-amber-400" },
  Cancelled:  { badge: "bg-red-500/15 text-red-400",         dot: "bg-red-400" },
};
const AVATAR_COLORS = [
  "bg-emerald-500/20 text-emerald-400","bg-blue-500/20 text-blue-400","bg-purple-500/20 text-purple-400",
  "bg-amber-500/20 text-amber-400","bg-pink-500/20 text-pink-400","bg-teal-500/20 text-teal-400",
  "bg-red-500/20 text-red-400","bg-indigo-500/20 text-indigo-400",
];

export default function AdminSalesPage() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filtered = orders.filter((o) => {
    const matchStatus = filterStatus === "all" || o.status.toLowerCase() === filterStatus;
    const matchSearch =
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.product.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const card = "bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-white/[0.06] rounded-2xl transition-colors duration-300";
  const completedCount  = orders.filter((o) => o.status === "Completed").length;
  const pendingCount    = orders.filter((o) => o.status === "Pending").length;

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-100 dark:bg-[#060a0f] text-gray-900 dark:text-white font-mono p-6 space-y-6 transition-colors duration-300">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight leading-none">
              {t("onlineSales")} <span className="text-emerald-400">{t("totalOrdersKpi")}</span>
            </h1>
            <p className="text-xs text-gray-500 mt-1.5 uppercase tracking-widest">{t("onlineSalesSubtitle")}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-emerald-400 text-xs uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse inline-block" />
              {t("live")}
            </span>
            <button className="flex items-center gap-2 border border-gray-300 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/20 px-4 py-2 rounded-xl text-xs uppercase tracking-wide transition text-gray-600 dark:text-gray-300">
              <Download size={13} /> {t("exportCsv")}
            </button>
            <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 px-4 py-2 rounded-xl text-xs uppercase tracking-wide transition text-black font-bold">
              <Plus size={13} /> {t("newOrder")}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { label: t("totalOrdersKpi"), value: String(orders.length), sub: t("allTime"),           icon: <ShoppingCart size={14} />, iconBg: "bg-emerald-500/10 text-emerald-400" },
            { label: t("completedKpi"),   value: String(completedCount), sub: t("successfullyDone"),  icon: <CheckCircle size={14} />,  iconBg: "bg-blue-500/10 text-blue-400" },
            { label: t("pendingCount"),   value: String(pendingCount),   sub: t("awaitingAction"),    icon: <Clock size={14} />,        iconBg: "bg-amber-500/10 text-amber-400" },
            { label: "TOTAL (TND)",       value: "43,523",               sub: t("revenueThisPeriod"), icon: <DollarSign size={14} />,   iconBg: "bg-purple-500/10 text-purple-400" },
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
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-white/[0.05]">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">{t("recentOrders")}</h2>
              <p className="text-xs text-gray-500">{filtered.length} {t("ofText")} {orders.length} {t("totalOrdersKpi").toLowerCase()}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  className="pl-8 pr-3 py-1.5 bg-gray-100 dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-lg text-xs focus:outline-none focus:border-emerald-500/40 transition text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600"
                  placeholder={t("searchOrders")}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <select
                className="px-3 py-1.5 bg-gray-100 dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-lg text-xs text-gray-600 dark:text-gray-300 focus:outline-none focus:border-emerald-500/40 transition"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">{t("allStatus")}</option>
                <option value="completed">{t("completed")}</option>
                <option value="processing">{t("processing")}</option>
                <option value="pending">{t("pending")}</option>
                <option value="cancelled">{t("cancelled")}</option>
              </select>
              <button className="flex items-center gap-2 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 px-3 py-1.5 rounded-lg text-xs text-gray-400 transition">
                <ArrowDownToLine size={12} /> {t("export")}
              </button>
            </div>
          </div>

          <div className="grid px-6 py-3 text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-600 border-b border-gray-100 dark:border-white/[0.04]"
            style={{ gridTemplateColumns: "1.5fr 1.8fr 2.5fr 1.2fr 1.2fr 0.8fr" }}>
            <span>{t("orderId")}</span><span>{t("customer")}</span><span>{t("product")}</span>
            <span>{t("totalTND")}</span><span>{t("status")}</span><span>Date</span>
          </div>

          {filtered.length === 0 ? (
            <div className="py-12 text-center text-xs text-gray-400">{t("noOrdersMatch")}</div>
          ) : (
            filtered.map((order, i) => {
              const sc = STATUS_STYLES[order.status];
              return (
                <motion.div key={order.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                  className={`grid px-6 py-4 items-center hover:bg-gray-50 dark:hover:bg-white/[0.02] transition ${i < filtered.length - 1 ? "border-b border-gray-100 dark:border-white/[0.03]" : ""}`}
                  style={{ gridTemplateColumns: "1.5fr 1.8fr 2.5fr 1.2fr 1.2fr 0.8fr" }}>
                  <p className="text-xs font-bold text-gray-400 dark:text-gray-400">{order.id}</p>
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}>
                      {order.customer.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{order.customer}</p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 pr-4">{order.product}</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{order.total}</p>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold w-fit ${sc.badge}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                    {t(STATUS_KEYS[order.status] as any)}
                  </span>
                  <p className="text-[10px] text-gray-400 dark:text-gray-600">{order.date}</p>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}