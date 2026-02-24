"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { Users, Search, Plus, Download, UserCheck, Clock, FileText } from "lucide-react";
import { useState } from "react";

const employees = [
  { name: "Sarra Tlili",      position: "Sales Executive",     contract: "CDI", status: "Active",   dept: "Sales", joined: "May 2021", email: "s.tlili@emm.tn",      phone: "+216 71 234 001" },
  { name: "Fares Dridi",      position: "Sales Manager",       contract: "CDI", status: "Active",   dept: "Sales", joined: "Nov 2019", email: "f.dridi@emm.tn",      phone: "+216 71 234 002" },
  { name: "Lina Sfar",        position: "Account Manager",     contract: "CDI", status: "Active",   dept: "Sales", joined: "Feb 2022", email: "l.sfar@emm.tn",       phone: "+216 71 234 003" },
  { name: "Mariem Zouari",    position: "Sales Representative",contract: "CDD", status: "Active",   dept: "Sales", joined: "Jun 2023", email: "m.zouari@emm.tn",     phone: "+216 71 234 004" },
  { name: "Aziz Trabelsi",    position: "Key Account Manager", contract: "CDI", status: "On Leave", dept: "Sales", joined: "Aug 2020", email: "a.trabelsi@emm.tn",   phone: "+216 71 234 005" },
  { name: "Rim Belhaj",       position: "Sales Coordinator",   contract: "CDD", status: "Active",   dept: "Sales", joined: "Mar 2023", email: "r.belhaj@emm.tn",     phone: "+216 71 234 006" },
  { name: "Yasmine Chaabane", position: "Business Developer",  contract: "CDI", status: "Active",   dept: "Sales", joined: "Jan 2021", email: "y.chaabane@emm.tn",   phone: "+216 71 234 007" },
  { name: "Tarek Jebali",     position: "Sales Analyst",       contract: "CDD", status: "Inactive", dept: "Sales", joined: "Oct 2023", email: "t.jebali@emm.tn",     phone: "+216 71 234 008" },
];

const AVATAR_COLORS = [
  "bg-emerald-500/20 text-emerald-400", "bg-blue-500/20 text-blue-400",
  "bg-purple-500/20 text-purple-400",   "bg-amber-500/20 text-amber-400",
  "bg-pink-500/20 text-pink-400",       "bg-teal-500/20 text-teal-400",
  "bg-red-500/20 text-red-400",         "bg-indigo-500/20 text-indigo-400",
];
const CONTRACT_BADGE: Record<string, string> = {
  CDI: "bg-blue-500/15 text-blue-400",
  CDD: "bg-purple-500/15 text-purple-400",
};
const STATUS_CONFIG: Record<string, { badge: string; dot: string }> = {
  Active:    { badge: "bg-emerald-500/15 text-emerald-400", dot: "bg-emerald-400" },
  "On Leave":{ badge: "bg-amber-500/15 text-amber-400",     dot: "bg-amber-400" },
  Inactive:  { badge: "bg-red-500/15 text-red-400",         dot: "bg-red-400" },
};

export default function OnlineSalesEmployees() {
  const { t } = useLanguage();
  const [search, setSearch]       = useState("");
  const [filterStatus, setFilter] = useState("all");

  const filtered = employees.filter((e) => {
    const matchSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.position.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || e.status.toLowerCase().replace(" ", "-") === filterStatus;
    return matchSearch && matchStatus;
  });

  const activeCount   = employees.filter(e => e.status === "Active").length;
  const onLeaveCount  = employees.filter(e => e.status === "On Leave").length;
  const cdiCount      = employees.filter(e => e.contract === "CDI").length;

  const card = "bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-white/[0.06] rounded-2xl transition-colors duration-300";

  const statusLabel = (s: string) => {
    const map: Record<string, string> = { Active: t("active"), "On Leave": t("onLeave"), Inactive: t("inactive") };
    return map[s] ?? s;
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-100 dark:bg-[#060a0f] text-gray-900 dark:text-white font-mono p-6 space-y-6 transition-colors duration-300">

        {/* ── HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight leading-none">
              {t("onlineSales")} <span className="text-emerald-400">{t("employees")}</span>
            </h1>
            <p className="text-xs text-gray-500 mt-1.5 uppercase tracking-widest">{t("onlineSalesSubtitle")}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-emerald-400 text-xs uppercase tracking-widest flex items-center gap-1.5">
             
            </span>
            <button className="flex items-center gap-2 border border-gray-300 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/20 px-4 py-2 rounded-xl text-xs uppercase tracking-wide transition text-gray-600 dark:text-gray-300">
              <Download size={13} /> {t("export")}
            </button>
            <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 px-4 py-2 rounded-xl text-xs uppercase tracking-wide transition text-black font-bold">
              <Plus size={13} /> {t("addEmployee")}
            </button>
          </div>
        </div>

        {/* ── KPI STRIP ── */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { label: t("totalEmployeesKpiShort"), value: String(employees.length), sub: t("inDepartment"),  icon: <Users size={14} />,     iconBg: "bg-emerald-500/10 text-emerald-400" },
            { label: t("active"),                 value: String(activeCount),       sub: t("currentlyWorking"), icon: <UserCheck size={14} />, iconBg: "bg-blue-500/10 text-blue-400" },
            { label: t("onLeave"),                value: String(onLeaveCount),      sub: t("thisMonth"),     icon: <Clock size={14} />,     iconBg: "bg-amber-500/10 text-amber-400" },
            { label: t("cdiContracts"),           value: String(cdiCount),          sub: t("permanentStaff"),icon: <FileText size={14} />,  iconBg: "bg-purple-500/10 text-purple-400" },
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
              <h2 className="text-base font-bold text-gray-900 dark:text-white">{t("allEmployees")}</h2>
              <p className="text-xs text-gray-500">{filtered.length} {t("ofText")} {employees.length} {t("records")}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  className="pl-8 pr-3 py-1.5 bg-gray-100 dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-lg text-xs focus:outline-none focus:border-emerald-500/40 transition text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600"
                  placeholder={t("searchEmployee")}
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
                <option value="on-leave">{t("onLeave")}</option>
                <option value="inactive">{t("inactive")}</option>
              </select>
            </div>
          </div>

          {/* Table header */}
          <div className="grid px-6 py-3 text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-600 border-b border-gray-100 dark:border-white/[0.04]"
            style={{ gridTemplateColumns: "2fr 2fr 1.2fr 1.8fr 1fr 1fr 0.8fr" }}>
            <span>{t("employee")}</span>
            <span>{t("position")}</span>
            <span>{t("contract")}</span>
            <span>Email</span>
            <span>{t("phone")}</span>
            <span>{t("status")}</span>
            <span>{t("joined")}</span>
          </div>

          {filtered.length === 0 ? (
            <div className="py-12 text-center text-xs text-gray-400 dark:text-gray-600">{t("noEmployeesMatch")}</div>
          ) : (
            filtered.map((emp, i) => {
              const sc = STATUS_CONFIG[emp.status];
              return (
                <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                  className={`grid px-6 py-4 items-center hover:bg-gray-50 dark:hover:bg-white/[0.02] transition ${i < filtered.length - 1 ? "border-b border-gray-100 dark:border-white/[0.03]" : ""}`}
                  style={{ gridTemplateColumns: "2fr 2fr 1.2fr 1.8fr 1fr 1fr 0.8fr" }}>

                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}>
                      {emp.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{emp.name}</p>
                  </div>

                  <p className="text-xs text-gray-500 dark:text-gray-400">{emp.position}</p>

                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold w-fit ${CONTRACT_BADGE[emp.contract]}`}>
                    {emp.contract}
                  </span>

                  <p className="text-xs text-gray-500 dark:text-gray-400">{emp.email}</p>

                  <p className="text-xs text-gray-500 dark:text-gray-400">{emp.phone}</p>

                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold w-fit ${sc.badge}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                    {statusLabel(emp.status)}
                  </span>

                  <p className="text-xs text-gray-500 dark:text-gray-400">{emp.joined}</p>
                </motion.div>
              );
            })
          )}
        </div>

      </div>
    </DashboardLayout>
  );
}