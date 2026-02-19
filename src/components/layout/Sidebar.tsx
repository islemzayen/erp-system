"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  Users,
  Megaphone,
  ShoppingCart,
  Menu,
  Calendar,
  DollarSign,
  BarChart,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Sidebar() {
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  if (!user) return null;

  const dashboardPath = `/dashboard/${user.role
    .toLowerCase()
    .replace("_manager", "")}`;

  return (
    <motion.div
      animate={{ width: collapsed ? 80 : 240 }}
      className="m-4 p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-xl transition-all"
    >
      <div className="flex justify-between items-center mb-6">
        {!collapsed && (
          <h2 className="text-lg font-bold text-blue-600">ERP</h2>
        )}
        <button onClick={() => setCollapsed(!collapsed)}>
          <Menu size={20} />
        </button>
      </div>

      <ul className="space-y-4">

        <li>
          <Link
            href={dashboardPath}
            className="flex items-center gap-3 hover:text-blue-500 transition"
          >
            <LayoutDashboard size={18} />
            {!collapsed && "Dashboard"}
          </Link>
        </li>

        
        {user.role === "ADMIN" && (
          <>
            <li>
              <Link
                href="/dashboard/admin/hr"
                className="flex items-center gap-3 hover:text-blue-500"
              >
                <Users size={18} />
                {!collapsed && "HR"}
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard/marketing"
                className="flex items-center gap-3 hover:text-blue-500"
              >
                <Megaphone size={18} />
                {!collapsed && "Marketing"}
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard/sales"
                className="flex items-center gap-3 hover:text-blue-500"
              >
                <ShoppingCart size={18} />
                {!collapsed && "Sales"}
              </Link>
            </li>
          </>
        )}

        
        {user.role === "HR_MANAGER" && (
          <>
            <li>
              <Link
                href="/dashboard/hr/employees"
                className="flex items-center gap-3 hover:text-blue-500"
              >
                <Users size={18} />
                {!collapsed && "Employees"}
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard/hr/attendance"
                className="flex items-center gap-3 hover:text-blue-500"
              >
                <Calendar size={18} />
                {!collapsed && "Attendance"}
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard/hr/payroll"
                className="flex items-center gap-3 hover:text-blue-500"
              >
                <DollarSign size={18} />
                {!collapsed && "Payroll"}
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard/hr/performance"
                className="flex items-center gap-3 hover:text-blue-500"
              >
                <BarChart size={18} />
                {!collapsed && "Performance"}
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard/hr/reports"
                className="flex items-center gap-3 hover:text-blue-500"
              >
                <FileText size={18} />
                {!collapsed && "Reports"}
              </Link>
            </li>
          </>
        )}
      </ul>
    </motion.div>
  );
}
