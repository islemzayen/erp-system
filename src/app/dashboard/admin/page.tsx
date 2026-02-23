"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { Users, DollarSign, ShoppingCart, Megaphone, Download, Plus } from "lucide-react";
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

export default function AdminDashboard() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [activeRange, setActiveRange] = useState<"6m" | "3m" | "1m">("6m");

  const users = [
    { name: "Amira Benali",    email: "amira@emm.tn",  role: "HR Manager",        status: "Active"   },
    { name: "Khalil Mansouri", email: "khalil@emm.tn", role: "Marketing Manager", status: "Active"   },
    { name: "Sarra Tlili",     email: "sarra@emm.tn",  role: "Employee",          status: "Active"   },
    { name: "Fares Dridi",     email: "fares@emm.tn",  role: "Sales Manager",     status: "Inactive" },
    { name: "Nour Hamdi",      email: "nour@emm.tn",   role: "Admin",             status: "Active"   },
  ];

  const employeesSparkData = [{ v:110 },{ v:115 },{ v:118 },{ v:120 },{ v:122 },{ v:124 }];
  const revenueSparkData   = [{ v:95000 },{ v:103000 },{ v:98500 },{ v:110000 },{ v:115000 },{ v:120500 }];
  const ordersSparkData    = [{ v:280 },{ v:310 },{ v:295 },{ v:330 },{ v:348 },{ v:356 }];
  const campaignsSparkData = [{ v:4 },{ v:5 },{ v:6 },{ v:5 },{ v:7 },{ v:7 }];

  const revenueMonthly = [
    { month: "Jan", revenue: 95000  },{ month: "Feb", revenue: 103000 },{ month: "Mar", revenue: 98500 },
    { month: "Apr", revenue: 110000 },{ month: "May", revenue: 115000 },{ month: "Jun", revenue: 120500 },
  ];
  const ordersMonthly = [
    { month: "Jan", orders: 280 },{ month: "Feb", orders: 310 },{ month: "Mar", orders: 295 },
    { month: "Apr", orders: 330 },{ month: "May", orders: 348 },{ month: "Jun", orders: 356 },
  ];
  const topModules = [
    { name: "Online Sales", usage: 97 },{ name: "HR Module", usage: 88 },
    { name: "Marketing", usage: 75 },{ name: "Inventory", usage: 61 },{ name: "Finance", usage: 54 },
  ];
  const maxUsage = 97;

  const tooltipStyle = { backgroundColor: "#0d1117", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "10px", fontSize: "11px" };
  const card = "bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-white/[0.06] rounded-2xl transition-colors duration-300";

  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <DashboardLayout>
        <div className="min-h-screen bg-gray-100 dark:bg-[#060a0f] text-gray-900 dark:text-white font-mono p-6 space-y-6 transition-colors duration-300">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight leading-none">
                Admin <span className="text-emerald-400">{t("dashboard")}</span>
              </h1>
              <p className="text-xs text-gray-500 mt-1.5 uppercase tracking-widest">{t("adminSubtitle")}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-emerald-400 text-xs uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse inline-block" />{t("live")}
              </span>
              <button className="flex items-center gap-2 border border-gray-300 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/20 px-4 py-2 rounded-xl text-xs uppercase tracking-wide transition text-gray-600 dark:text-gray-300">
                <Download size={13} /> {t("exportCsv")}
              </button>
              <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 px-4 py-2 rounded-xl text-xs uppercase tracking-wide transition text-black font-bold">
                <Plus size={13} /> {t("newReport")}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {[
              { icon: <Users size={16} />, iconBg: "bg-emerald-500/10 text-emerald-400", badge: "+4",    badgeColor: "text-emerald-400", label: t("totalEmployees"),  value: "124", valueColor: "text-emerald-400", spark: employeesSparkData, sparkColor: "#10b981" },
              { icon: <DollarSign size={16} />, iconBg: "bg-blue-500/10 text-blue-400", badge: "+8.2%", badgeColor: "text-blue-400",    label: t("monthlyRevenue"), value: "120,500", valueColor: "text-blue-400", spark: revenueSparkData, sparkColor: "#60a5fa" },
              { icon: <ShoppingCart size={16} />, iconBg: "bg-amber-500/10 text-amber-400", badge: "+18", badgeColor: "text-amber-400", label: t("totalOrders"),    value: "356", valueColor: "text-amber-400", spark: ordersSparkData, sparkColor: "#f59e0b" },
              { icon: <Megaphone size={16} />, iconBg: "bg-purple-500/10 text-purple-400", badge: "+2", badgeColor: "text-purple-400",  label: t("activeCampaigns"), value: "7", valueColor: "text-purple-400", spark: campaignsSparkData, sparkColor: "#a78bfa" },
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

          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            {[
              { label: t("newUsers"),         value: "32",  sub: "↑ 18% this month" },
              { label: t("serverLoad"),       value: "72%", sub: t("optimalPerformance") },
              { label: t("pendingApprovals"), value: "5",   sub: t("requiresAction") },
              { label: t("securityScore"),    value: "80%", sub: t("lastAuditPassed") },
            ].map((s, i) => (
              <div key={i} className={`${card} px-5 py-4`}>
                <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">{s.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{s.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <div className={`${card} p-6 xl:col-span-2 space-y-2`}>
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-base font-bold text-gray-900 dark:text-white">{t("businessOverview")}</h2>
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
                  <p className="text-[10px] uppercase tracking-widest text-gray-500">{t("totalRevenue")}</p>
                  <p className="text-2xl font-bold text-emerald-400">642,000 TND</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500">{t("totalOrders")}</p>
                  <p className="text-2xl font-bold text-blue-400">1,919</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">{t("revenueTND")}</p>
                  <ResponsiveContainer width="100%" height={180}>
                    <ReBarChart data={revenueMonthly}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:[stroke:#1a2030]" />
                      <XAxis dataKey="month" stroke="#9ca3af" tick={{ fontSize: 11 }} />
                      <YAxis stroke="#9ca3af" tick={{ fontSize: 11 }} />
                      <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${Number(v).toLocaleString()} TND`, t("totalRevenue")]} />
                      <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </ReBarChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">{t("ordersPerMonth")}</p>
                  <ResponsiveContainer width="100%" height={180}>
                    <LineChart data={ordersMonthly}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:[stroke:#1a2030]" />
                      <XAxis dataKey="month" stroke="#9ca3af" tick={{ fontSize: 11 }} />
                      <YAxis stroke="#9ca3af" tick={{ fontSize: 11 }} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Line type="monotone" dataKey="orders" stroke="#60a5fa" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="pt-4">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-[10px] uppercase tracking-widest text-gray-500">{t("recentUsers")}</p>
                  <input type="text" placeholder={t("searchUser")} value={search} onChange={(e) => setSearch(e.target.value)}
                    className="px-3 py-1.5 bg-gray-100 dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-lg text-xs text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500/40 transition" />
                </div>
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-widest text-gray-500 border-b border-gray-200 dark:border-white/5">
                      <th className="text-left pb-2 pr-4">{t("fullName")}</th>
                      <th className="text-left pb-2 pr-4">{t("emailField")}</th>
                      <th className="text-left pb-2 pr-4">{t("roleField")}</th>
                      <th className="text-left pb-2">{t("status")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.filter(u => u.name.toLowerCase().includes(search.toLowerCase())).map((u, i) => (
                      <tr key={i} className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/[0.03] transition">
                        <td className="py-3 pr-4 font-bold text-gray-900 dark:text-white">{u.name}</td>
                        <td className="pr-4 text-gray-500 dark:text-gray-400">{u.email}</td>
                        <td className="pr-4 text-gray-600 dark:text-gray-300">{u.role}</td>
                        <td>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${u.status === "Active" ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"}`}>
                            {u.status === "Active" ? t("active") : t("inactive")}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className={`${card} p-6 flex flex-col gap-8`}>
              <div>
                <h2 className="text-base font-bold text-gray-900 dark:text-white">{t("topModules")}</h2>
                <p className="text-xs text-gray-500 mb-5">{t("usageThisMonth")}</p>
                <div className="space-y-5">
                  {topModules.map((m, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-baseline mb-1.5">
                        <div>
                          <span className="text-gray-400 text-xs mr-2">{String(i + 1).padStart(2, "0")}</span>
                          <span className="text-sm font-bold text-gray-900 dark:text-white">{m.name}</span>
                        </div>
                        <span className="text-emerald-400 text-sm font-bold">{m.usage}%</span>
                      </div>
                      <div className="h-1 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${(m.usage / maxUsage) * 100}%` }}
                          transition={{ delay: 0.3 + i * 0.07, duration: 0.6 }}
                          className="h-full bg-emerald-500 rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">{t("systemHealth")}</h3>
                <div className="space-y-4">
                  {[
                    { label: t("databaseUsage"), pct: 65, color: "bg-blue-500" },
                    { label: t("apiStability"),  pct: 90, color: "bg-emerald-500" },
                    { label: t("securityScore"), pct: 80, color: "bg-purple-500" },
                  ].map((g, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-1">
                        <p className="text-xs text-gray-500 dark:text-gray-400">{g.label}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">{g.pct}%</p>
                      </div>
                      <div className="h-1 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${g.pct}%` }}
                          transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                          className={`h-full ${g.color} rounded-full`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}