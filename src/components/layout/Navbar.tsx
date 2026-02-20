"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  // Close dropdown when clicking outside
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
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get user initials
  const getInitials = (name: string | undefined) => {
    if (!name) return "";
    const parts = name.split(" ");
    return parts.map((p) => p[0]).join("").toUpperCase();
  };

  return (
    <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md relative">
      
      {/* Role Title */}
      <h1 className="text-lg font-semibold capitalize">
        {user?.role.replace("_", " ").toLowerCase()}
      </h1>

      {/* Profile Section */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 hover:opacity-80 transition"
        >
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
            {getInitials(user?.name)}
          </div>

          <span className="hidden md:block">{user?.name}</span>
        </button>

        {/* Dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-3 w-48 bg-white dark:bg-gray-700 rounded-xl shadow-xl overflow-hidden z-50"
            >
              {/* Profile */}
              <Link
                href="/dashboard/profile"
                className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                onClick={() => setOpen(false)}
              >
                Profile
              </Link>

              {/* ✅ Fixed Settings Link */}
              <Link
                href="/dashboard/settings"
                className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                onClick={() => setOpen(false)}
              >
                Settings
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 hover:bg-red-100 dark:hover:bg-red-600 transition text-red-500"
              >
                Logout
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
