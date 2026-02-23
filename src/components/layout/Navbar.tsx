"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "fr" : "en");
  };

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = (name: string | undefined) => {
    if (!name) return "";
    return name.split(" ").map((p) => p[0]).join("").toUpperCase();
  };

  return (
    <div className="flex justify-between items-center bg-white dark:bg-[#161616] border border-gray-200 dark:border-[#2a2a2a] p-4 rounded-2xl relative transition-colors duration-300">
      {/* Role Title */}
      <div>
        <p className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-mono mb-0.5">
          {t("erpSubtitle")}
        </p>
        <h1 className="text-sm font-semibold capitalize text-gray-900 dark:text-white tracking-wide font-mono">
          {user?.role.replace("_", " ").toLowerCase()}
        </h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Live indicator */}
        <div className="flex items-center gap-2 text-[11px] font-mono text-gray-400 tracking-widest">
          <span className="w-2 h-2 rounded-full bg-[#00ff9d] animate-pulse inline-block" />
          {t("live")}
        </div>

        {/* Language Toggle */}
        <button
          onClick={toggleLanguage}
          title={language === "en" ? "Switch to French" : "Passer en anglais"}
          className="w-8 h-8 rounded-lg border border-gray-200 dark:border-[#2a2a2a] bg-gray-100 dark:bg-[#0d0d0d] flex items-center justify-center text-base hover:border-[#00ff9d]/40 transition-all duration-200"
        >
          {language === "en" ? "EN" : "FR"}
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          className="w-8 h-8 rounded-lg border border-gray-200 dark:border-[#2a2a2a] bg-gray-100 dark:bg-[#0d0d0d] flex items-center justify-center text-gray-400 hover:text-[#00ff9d] hover:border-[#00ff9d]/40 transition-all duration-200"
        >
          {isDark ? <Sun size={14} /> : <Moon size={14} />}
        </button>

        {/* Profile Section */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 hover:opacity-80 transition"
          >
            <div className="w-9 h-9 rounded-full bg-[#00ff9d]/20 border border-[#00ff9d]/40 flex items-center justify-center text-[#00ff9d] font-bold text-sm font-mono">
              {getInitials(user?.name)}
            </div>
            <span className="hidden md:block text-sm text-gray-700 dark:text-white font-mono">
              {user?.name}
            </span>
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-3 w-48 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-xl shadow-2xl overflow-hidden z-50"
              >
                <Link
                  href="/dashboard/profile"
                  className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 font-mono hover:bg-gray-50 dark:hover:bg-[#222] hover:text-gray-900 dark:hover:text-white transition"
                  onClick={() => setOpen(false)}
                >
                  {t("profile")}
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 font-mono hover:bg-gray-50 dark:hover:bg-[#222] hover:text-gray-900 dark:hover:text-white transition"
                  onClick={() => setOpen(false)}
                >
                  {t("settings")}
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-sm font-mono text-red-400 hover:bg-red-500/10 transition"
                >
                  {t("logout")}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}