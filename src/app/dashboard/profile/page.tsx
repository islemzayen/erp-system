"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const { user } = useAuth();
  const { t } = useLanguage();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <p className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-mono mb-1">
          {t("accountLabel")}
        </p>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-mono tracking-tight">
          {t("myProfile")}
        </h1>
      </div>

      <div className="bg-white dark:bg-[#161616] border border-gray-200 dark:border-[#2a2a2a] p-6 rounded-2xl max-w-xl transition-colors duration-300">
        <h2 className="text-xs font-mono tracking-[0.2em] uppercase text-gray-500 mb-6">
          {t("profileInformation")}
        </h2>

        <div className="space-y-5">
          <div>
            <label className="text-[11px] font-mono tracking-widest uppercase text-gray-500">
              {t("fullName")}
            </label>
            <input
              className="w-full mt-2 p-3 rounded-lg bg-gray-100 dark:bg-[#0d0d0d] border border-gray-200 dark:border-[#2a2a2a] text-gray-900 dark:text-white font-mono text-sm focus:outline-none focus:border-[#00ff9d]/50 transition-colors"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-[11px] font-mono tracking-widest uppercase text-gray-500">
              {t("emailField")}
            </label>
            <input
              className="w-full mt-2 p-3 rounded-lg bg-gray-100 dark:bg-[#0d0d0d] border border-gray-200 dark:border-[#2a2a2a] text-gray-900 dark:text-white font-mono text-sm focus:outline-none focus:border-[#00ff9d]/50 transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-[11px] font-mono tracking-widest uppercase text-gray-500">
              {t("roleField")}
            </label>
            <input
              className="w-full mt-2 p-3 rounded-lg bg-gray-100 dark:bg-[#0d0d0d] border border-gray-200 dark:border-[#2a2a2a] text-gray-400 dark:text-gray-500 font-mono text-sm cursor-not-allowed"
              value={user?.role || ""}
              disabled
            />
          </div>

          <button className="px-6 py-2.5 rounded-lg bg-[#00ff9d]/10 border border-[#00ff9d]/30 text-[#00c97a] dark:text-[#00ff9d] font-mono text-sm tracking-widest uppercase hover:bg-[#00ff9d]/20 transition-colors">
            {t("saveChanges")}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}