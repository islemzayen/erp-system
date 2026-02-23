"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { Users, Search, Plus, Download, UserCheck, Clock, TrendingUp } from "lucide-react";
import { useState } from "react";

const employees = [
  { name: "Amira Benali",     position: "HR Manager",      status: "Active",   phone: "+216 22 333 444", joined: "Mar 2021" },
  { name: "Nour Hamdi",       position: "HR Coordinator",  status: "Active",   phone: "+216 55 111 222", joined: "Jul 2022" },
  { name: "Yasmine Chaabane", position: "Recruiter",       status: "Active",   phone: "+216 98 444 555", joined: "Jan 2023" },
  { name: "Ines Jebali",      position: "Payroll Officer", status: "On Leave", phone: "+216 27 666 777", joined: "Sep 2020" },
  { name: "Rim Belhaj",       position: "Training Lead",   status: "Active",   phone: "+216 54 888 999", joined: "Nov 2022" },
];

const AVATAR_COLORS = [
  "bg-emerald-500/20 text-emerald-400",
  "bg-blue-500/20 text-blue-400",
  "bg-purple-500/20 text-purple-400",
  "bg-amber-500/20 text-amber-400",
  "bg-pink-500/20 text-pink-400",
];

export default function AdminHRPage() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");

  const filtered = employees.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.position.toLowerCase().includes(search.toLowerCase())
  );

  const card = "bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-white/[0.06] rounded-2xl transition-colors duration-300";

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-100 dark:bg-[#060a0f] text-gray-900 dark:text-white font-mono p-6 space-y-6 transition-colors duration-300">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight leading-none">
              {t("hr")} <span className="text-emerald-400">{t("employees")}</span>
            </h1>
            <p className="text-xs text-gray-500 mt-1.5 uppercase tracking-widest">{t("hrDept")}</p>
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
              <Plus size={13} /> {t("addEmployee")}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { label: t("totalHRStaff"), value: "5",     sub: t("inDepartment"),    icon: <Users size={14} />,     iconBg: "bg-emerald-500/10 text-emerald-400" },
            { label: t("active"),       value: "4",     sub: t("currentlyWorking"),icon: <UserCheck size={14} />, iconBg: "bg-blue-500/10 text-blue-400" },
            { label: t("onLeave"),      value: "1",     sub: t("thisMonth"),       icon: <Clock size={14} />,     iconBg: "bg-amber-500/10 text-amber-400" },
            { label: t("avgTenure"),    value: "2.4yr", sub: t("avgPerEmployee"),  icon: <TrendingUp size={14} />,iconBg: "bg-purple-500/10 text-purple-400" },
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
              <h2 className="text-base font-bold text-gray-900 dark:text-white">HR Team</h2>
              <p className="text-xs text-gray-500">{filtered.length} {t("ofText")} {employees.length} {t("employees")}</p>
            </div>
            <div className="relative">
              <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                className="pl-8 pr-3 py-1.5 bg-gray-100 dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-lg text-xs focus:outline-none focus:border-emerald-500/40 transition text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600"
                placeholder={t("searchEmployee")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="grid px-6 py-3 text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-600 border-b border-gray-100 dark:border-white/[0.04]"
            style={{ gridTemplateColumns: "2fr 2fr 1.2fr 1.5fr 1fr" }}>
            <span>{t("employee")}</span><span>{t("position")}</span>
            <span>{t("status")}</span><span>{t("phone")}</span><span>{t("joined")}</span>
          </div>

          {filtered.length === 0 ? (
            <div className="py-12 text-center text-xs text-gray-400">{t("noEmployeesMatch")}</div>
          ) : (
            filtered.map((emp, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                className={`grid px-6 py-4 items-center hover:bg-gray-50 dark:hover:bg-white/[0.02] transition ${i < filtered.length - 1 ? "border-b border-gray-100 dark:border-white/[0.03]" : ""}`}
                style={{ gridTemplateColumns: "2fr 2fr 1.2fr 1.5fr 1fr" }}>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}>
                    {emp.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{emp.name}</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{emp.position}</p>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold w-fit ${emp.status === "Active" ? "bg-emerald-500/15 text-emerald-400" : "bg-amber-500/15 text-amber-400"}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${emp.status === "Active" ? "bg-emerald-400" : "bg-amber-400"}`} />
                  {emp.status === "Active" ? t("active") : t("onLeave")}
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-400">{emp.phone}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{emp.joined}</p>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}