"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { BarChart2, Search, Plus, Download, Star, TrendingUp } from "lucide-react";
import { useState } from "react";

const performanceData = [
  { employee: "Amira Benali",     rating: "Excellent", score: 96, review: "15 Jan 2026", manager: "Nour Hamdi",      dept: "HR"        },
  { employee: "Khalil Mansouri",  rating: "Excellent", score: 91, review: "10 Jan 2026", manager: "Amira Benali",    dept: "Marketing" },
  { employee: "Sarra Tlili",      rating: "Good",      score: 88, review: "12 Jan 2026", manager: "Fares Dridi",     dept: "Sales"     },
  { employee: "Nour Hamdi",       rating: "Good",      score: 85, review: "08 Jan 2026", manager: "Amira Benali",    dept: "HR"        },
  { employee: "Tarek Jebali",     rating: "Good",      score: 82, review: "20 Jan 2026", manager: "Khalil Mansouri", dept: "Marketing" },
  { employee: "Yasmine Chaabane", rating: "Average",   score: 74, review: "18 Jan 2026", manager: "Amira Benali",    dept: "HR"        },
  { employee: "Ines Jebali",      rating: "Average",   score: 70, review: "—",           manager: "Amira Benali",    dept: "HR"        },
  { employee: "Fares Dridi",      rating: "Poor",      score: 55, review: "05 Jan 2026", manager: "Nour Hamdi",      dept: "Sales"     },
];

const RATING_CONFIG: Record<string, { badge: string; dot: string }> = {
  Excellent: { badge: "bg-emerald-500/15 text-emerald-400", dot: "bg-emerald-400" },
  Good:      { badge: "bg-blue-500/15 text-blue-400",       dot: "bg-blue-400" },
  Average:   { badge: "bg-amber-500/15 text-amber-400",     dot: "bg-amber-400" },
  Poor:      { badge: "bg-red-500/15 text-red-400",         dot: "bg-red-400" },
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

const maxScore = 96;

export default function HRPerformance() {
const { t, language } = useLanguage();  const [search, setSearch]       = useState("");
  const [filterRating, setFilter] = useState("all");

  const filtered = performanceData.filter((r) => {
    const matchSearch =
      r.employee.toLowerCase().includes(search.toLowerCase()) ||
      r.dept.toLowerCase().includes(search.toLowerCase());
    const matchRating = filterRating === "all" || r.rating.toLowerCase() === filterRating;
    return matchSearch && matchRating;
  });

  const avgScore       = Math.round(performanceData.reduce((s, r) => s + r.score, 0) / performanceData.length);
  const excellentCount = performanceData.filter(r => r.rating === "Excellent").length;
  const needsReview    = performanceData.filter(r => r.rating === "Poor" || r.rating === "Average").length;

  const card = "bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-white/[0.06] rounded-2xl transition-colors duration-300";

  const ratingLabel = (r: string) => {
    const map: Record<string, string> = {
      Excellent: t("excellent"),
      Good:      t("good"),
      Average:   t("average"),
      Poor:      t("poor"),
    };
    return map[r] ?? r;
  };

  return (
    <ProtectedRoute allowedRoles={["HR_MANAGER"]}>
      <DashboardLayout>
        <div className="min-h-screen bg-gray-100 dark:bg-[#060a0f] text-gray-900 dark:text-white font-mono p-6 space-y-6 transition-colors duration-300">

          {/* ── HEADER ── */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight leading-none">
  {language === "fr" ? (
    <>{t("tracking")}<span className="text-emerald-400">{t("performance")}</span></>
  ) : (
    <>{t("performance")} <span className="text-emerald-400">{t("tracking")}</span></>
  )}
</h1>
              <p className="text-xs text-gray-500 mt-1.5 uppercase tracking-widest">
                Jan 2026 · EMM ERP · v2.4
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-emerald-400 text-xs uppercase tracking-widest flex items-center gap-1.5">
                
              </span>
              <button className="flex items-center gap-2 border border-gray-300 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/20 px-4 py-2 rounded-xl text-xs uppercase tracking-wide transition text-gray-600 dark:text-gray-300">
                <Download size={13} /> {t("export")}
              </button>
              <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 px-4 py-2 rounded-xl text-xs uppercase tracking-wide transition text-black font-bold">
                <Plus size={13} /> {t("addEvaluation")}
              </button>
            </div>
          </div>

          {/* ── KPI STRIP ── */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            {[
              { label: t("avgScore"),     value: `${avgScore}%`,              sub: t("teamAverage"),    icon: <BarChart2 size={14} />,  iconBg: "bg-emerald-500/10 text-emerald-400" },
              { label: t("excellent"),    value: String(excellentCount),      sub: t("topPerformers"),  icon: <Star size={14} />,       iconBg: "bg-blue-500/10 text-blue-400" },
              { label: t("evaluations"), value: String(performanceData.length), sub: t("thisCycle"),   icon: <TrendingUp size={14} />, iconBg: "bg-purple-500/10 text-purple-400" },
              { label: t("needsReview"), value: String(needsReview),          sub: t("belowTarget"),    icon: <Search size={14} />,     iconBg: "bg-amber-500/10 text-amber-400" },
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

          {/* ── BOTTOM: Table + Top Performers ── */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

            {/* Table (2/3) */}
            <div className={`${card} overflow-hidden xl:col-span-2`}>
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-white/[0.05]">
                <div>
                  <h2 className="text-base font-bold text-gray-900 dark:text-white">{t("evaluations")}</h2>
                  <p className="text-xs text-gray-500">{filtered.length} {t("ofText")} {performanceData.length} {t("records")}</p>
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
                    className="px-3 py-1.5 bg-gray-100 dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-lg text-xs text-gray-600 dark:text-gray-300 focus:outline-none transition"
                    value={filterRating}
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    <option value="all">{t("allRatings")}</option>
                    <option value="excellent">{t("excellent")}</option>
                    <option value="good">{t("good")}</option>
                    <option value="average">{t("average")}</option>
                    <option value="poor">{t("poor")}</option>
                  </select>
                </div>
              </div>

              <div className="grid px-6 py-3 text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-600 border-b border-gray-100 dark:border-white/[0.04]"
                style={{ gridTemplateColumns: "2fr 1fr 1fr 1.5fr 1fr" }}>
                <span>{t("employee")}</span>
                <span>{t("dept")}</span>
                <span>{t("score")}</span>
                <span>{t("manager")}</span>
                <span>{t("rating")}</span>
              </div>

              {filtered.length === 0 ? (
                <div className="py-12 text-center text-xs text-gray-400 dark:text-gray-600">{t("noRecordsMatch")}</div>
              ) : (
                filtered.map((row, i) => {
                  const rc = RATING_CONFIG[row.rating];
                  return (
                    <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                      className={`grid px-6 py-4 items-center hover:bg-gray-50 dark:hover:bg-white/[0.02] transition ${i < filtered.length - 1 ? "border-b border-gray-100 dark:border-white/[0.03]" : ""}`}
                      style={{ gridTemplateColumns: "2fr 1fr 1fr 1.5fr 1fr" }}>

                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}>
                          {row.employee.split(" ").map(n => n[0]).join("")}
                        </div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{row.employee}</p>
                      </div>

                      <p className="text-xs text-gray-500 dark:text-gray-400">{row.dept}</p>
                      <p className="text-sm font-bold text-emerald-400">{row.score}%</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{row.manager}</p>

                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold w-fit ${rc.badge}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${rc.dot}`} />
                        {ratingLabel(row.rating)}
                      </span>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Top Performers sidebar (1/3) */}
            <div className={`${card} p-6`}>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">{t("topPerformers")}</h2>
              <p className="text-xs text-gray-500 mb-5">{t("performanceScoreThisCycle")}</p>
              <div className="space-y-5">
                {[...performanceData]
                  .sort((a, b) => b.score - a.score)
                  .slice(0, 5)
                  .map((emp, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-baseline mb-1.5">
                        <div>
                          <span className="text-gray-400 text-xs mr-2">{String(i + 1).padStart(2, "0")}</span>
                          <span className="text-sm font-bold text-gray-900 dark:text-white">{emp.employee}</span>
                        </div>
                        <span className="text-emerald-400 text-sm font-bold">{emp.score}</span>
                      </div>
                      <div className="h-1 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(emp.score / maxScore) * 100}%` }}
                          transition={{ delay: 0.3 + i * 0.07, duration: 0.6 }}
                          className="h-full bg-emerald-500 rounded-full"
                        />
                      </div>
                      <p className="text-[10px] text-gray-500 dark:text-gray-600 mt-0.5">{emp.dept}</p>
                    </div>
                  ))}
              </div>

              {/* Rating breakdown */}
              <div className="mt-8">
                <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-4">{t("ratingBreakdown")}</p>
                <div className="space-y-3">
                  {(["Excellent", "Good", "Average", "Poor"] as const).map((rating, i) => {
                    const count = performanceData.filter(r => r.rating === rating).length;
                    const pct   = Math.round((count / performanceData.length) * 100);
                    const colors: Record<string, string> = {
                      Excellent: "bg-emerald-500",
                      Good:      "bg-blue-500",
                      Average:   "bg-amber-500",
                      Poor:      "bg-red-500",
                    };
                    return (
                      <div key={i}>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-gray-500 dark:text-gray-400">{ratingLabel(rating)}</span>
                          <div className="flex gap-3">
                            <span className="text-xs text-gray-500">{count} {t("employees")}</span>
                            <span className="text-xs font-bold text-gray-900 dark:text-white">{pct}%</span>
                          </div>
                        </div>
                        <div className="h-1 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                            className={`h-full ${colors[rating]} rounded-full`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}