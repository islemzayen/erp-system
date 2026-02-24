"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { RefreshCw, Search, Plus, Download, ArrowDownToLine, CheckCircle, Clock, DollarSign } from "lucide-react";

interface Return {
  id: string; orderId: string; customer: string; product: string;
  amount: number; reason: string;
  status: "approved" | "pending" | "rejected" | "refunded";
  date: string; avatar: string;
}

const RETURNS: Return[] = [
  { id: "RET-045", orderId: "ORD-7820", customer: "Amira Benali",    product: "Smart Key Module × 2",       amount: 264,  reason: "Defective",       status: "pending",  date: "20 Feb", avatar: "AB" },
  { id: "RET-044", orderId: "ORD-7815", customer: "Sarra Tlili",     product: "Mortise Lock Pro × 3",       amount: 144,  reason: "Wrong item",      status: "approved", date: "19 Feb", avatar: "ST" },
  { id: "RET-043", orderId: "ORD-7808", customer: "Khalil Mansouri", product: "Padlock Shackle 50mm × 50",  amount: 480,  reason: "Not as described",status: "refunded", date: "18 Feb", avatar: "KM" },
  { id: "RET-042", orderId: "ORD-7801", customer: "Nour Hamdi",      product: "RFID Tag Sticker × 200",     amount: 148,  reason: "Changed mind",    status: "rejected", date: "17 Feb", avatar: "NH" },
  { id: "RET-041", orderId: "ORD-7798", customer: "Fares Dridi",     product: "Brass Key Blank B2 × 100",   amount: 120,  reason: "Defective",       status: "refunded", date: "16 Feb", avatar: "FD" },
  { id: "RET-040", orderId: "ORD-7790", customer: "Tarek Jebali",    product: "Deadbolt Lock Set × 5",      amount: 270,  reason: "Wrong item",      status: "approved", date: "15 Feb", avatar: "TJ" },
];

const AVATAR_COLORS = [
  "bg-emerald-500/20 text-emerald-400",
  "bg-blue-500/20 text-blue-400",
  "bg-purple-500/20 text-purple-400",
  "bg-amber-500/20 text-amber-400",
  "bg-pink-500/20 text-pink-400",
  "bg-teal-500/20 text-teal-400",
];

export default function ReturnsPage() {
  const { t } = useLanguage();
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery]   = useState("");
  const [mounted, setMounted]           = useState(false);
  useEffect(() => setMounted(true), []);

  const STATUS_CONFIG = {
    approved: { label: t("approved"), badge: "bg-blue-500/15 text-blue-400",       dot: "bg-blue-400" },
    pending:  { label: t("pending"),  badge: "bg-amber-500/15 text-amber-400",     dot: "bg-amber-400" },
    rejected: { label: t("rejected"), badge: "bg-red-500/15 text-red-400",         dot: "bg-red-400" },
    refunded: { label: t("refunded"), badge: "bg-emerald-500/15 text-emerald-400", dot: "bg-emerald-400" },
  };

  const filtered = RETURNS.filter(r => {
    const matchStatus = filterStatus === "all" || r.status === filterStatus;
    const matchSearch =
      r.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.product.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  const pendingCount  = RETURNS.filter(r => r.status === "pending").length;
  const refundedCount = RETURNS.filter(r => r.status === "refunded").length;
  const totalRefunded = RETURNS.filter(r => r.status === "refunded").reduce((s, r) => s + r.amount, 0);
  const totalReturns  = RETURNS.reduce((s, r) => s + r.amount, 0);

  const card = "bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-white/[0.06] rounded-2xl transition-colors duration-300";

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-100 dark:bg-[#060a0f] text-gray-900 dark:text-white font-mono p-6 space-y-6 transition-colors duration-300">

        {/* ── HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
           <h1 className="text-3xl font-bold tracking-tight leading-none">
  {t("returnsRefunds").split("& ")[0]}<span className="text-emerald-400">&amp; {t("returnsRefunds").split("& ")[1]}</span>
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
              <Plus size={13} /> {t("newReturn")}
            </button>
          </div>
        </div>

        {/* ── KPI CARDS ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { label: t("totalReturns"),  value: RETURNS.length,  change: "-40%",              changeColor: "text-emerald-400", valueColor: "text-emerald-400", icon: <RefreshCw size={16} />,   iconBg: "bg-emerald-500/10 text-emerald-400" },
            { label: t("pendingReview"), value: pendingCount,    change: t("actionNeeded"),   changeColor: "text-amber-400",   valueColor: "text-amber-400",   icon: <Clock size={16} />,       iconBg: "bg-amber-500/10 text-amber-400" },
            { label: t("refunded"),      value: refundedCount,   change: t("processed"),      changeColor: "text-blue-400",    valueColor: "text-blue-400",    icon: <CheckCircle size={16} />, iconBg: "bg-blue-500/10 text-blue-400" },
            { label: t("totalValue"),    value: totalReturns,    change: t("inReturns"),      changeColor: "text-red-400",     valueColor: "text-red-400",     icon: <DollarSign size={16} />,  iconBg: "bg-red-500/10 text-red-400" },
          ].map((kpi, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className={`${card} p-5 flex flex-col gap-3`}>
              <div className="flex items-start justify-between">
                <div className={`p-2 rounded-xl ${kpi.iconBg}`}>{kpi.icon}</div>
                <span className={`text-xs font-bold ${kpi.changeColor}`}>{kpi.change}</span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-gray-500">{kpi.label}</p>
              <p className={`text-3xl font-bold tracking-tight ${kpi.valueColor}`}>
                {typeof kpi.value === "number" && kpi.label === t("totalValue") ? `$${kpi.value}` : kpi.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── SECONDARY STRIP ── */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { label: t("refundRate"),    value: "1.4%",                                         sub: t("ofTotalOrders") },
            { label: t("refundedValue"), value: `$${totalRefunded}`,                            sub: t("paidOut") },
            { label: t("avgReturn"),     value: `$${Math.round(totalReturns / RETURNS.length)}`, sub: t("perReturn") },
            { label: t("rejectedKpi2"), value: String(RETURNS.filter(r => r.status === "rejected").length), sub: t("notApproved") },
          ].map((s, i) => (
            <div key={i} className={`${card} px-5 py-4`}>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">{s.label}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* ── RETURNS TABLE ── */}
        <div className={`${card} overflow-hidden`}>
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-white/[0.05]">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">{t("returnRequests")}</h2>
              <p className="text-xs text-gray-500">{filtered.length} of {RETURNS.length} {t("requests")}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  className="pl-8 pr-3 py-1.5 bg-gray-100 dark:bg-black/30 border border-gray-300 dark:border-white/10 rounded-lg text-xs focus:outline-none focus:border-emerald-500/40 transition text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600"
                  placeholder={t("searchReturns")}
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
                <option value="pending">{t("pending")}</option>
                <option value="approved">{t("approved")}</option>
                <option value="refunded">{t("refunded")}</option>
                <option value="rejected">{t("rejected")}</option>
              </select>
              <button className="flex items-center gap-2 border border-gray-300 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/20 px-3 py-1.5 rounded-lg text-xs text-gray-500 dark:text-gray-400 transition">
                <ArrowDownToLine size={12} /> {t("export")}
              </button>
            </div>
          </div>

          <div className="grid px-6 py-3 text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-600 border-b border-gray-100 dark:border-white/[0.04]"
            style={{ gridTemplateColumns: "2fr 2fr 1fr 1.2fr 1fr 1fr" }}>
            <span>{t("customer")}</span><span>{t("product")}</span><span>{t("amount")}</span>
            <span>{t("reason")}</span><span>{t("status")}</span><span>{t("date")}</span>
          </div>

          {filtered.length === 0 ? (
            <div className="py-12 text-center text-xs text-gray-500 dark:text-gray-600">{t("noReturnsMatch")}</div>
          ) : (
            filtered.map((r, i) => {
              const sc = STATUS_CONFIG[r.status];
              return (
                <div key={r.id}
                  className={`grid px-6 py-4 items-center hover:bg-gray-50 dark:hover:bg-white/[0.02] transition ${i < filtered.length - 1 ? "border-b border-gray-100 dark:border-white/[0.03]" : ""}`}
                  style={{ gridTemplateColumns: "2fr 2fr 1fr 1.2fr 1fr 1fr" }}>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}>
                      {r.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{r.customer}</p>
                      <p className="text-[10px] text-gray-400 dark:text-gray-600">{r.id} · {r.orderId}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 pr-4">{r.product}</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">${r.amount}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">{r.reason}</p>
                  <div>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${sc.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                      {sc.label}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400 dark:text-gray-600">{r.date}</p>
                </div>
              );
            })
          )}
        </div>

      </div>
    </DashboardLayout>
  );
}