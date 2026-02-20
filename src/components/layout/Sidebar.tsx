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
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        {!collapsed && (
          <h2 className="text-lg font-bold text-blue-600">ERP</h2>
        )}
        <button onClick={() => setCollapsed(!collapsed)}>
          <Menu size={20} />
        </button>
      </div>

      <ul className="space-y-4">
        {/* Main Dashboard (for ALL roles) */}
        <li>
          <Link
            href={dashboardPath}
            className="flex items-center gap-3 hover:text-blue-500 transition"
          >
            <LayoutDashboard size={18} />
            {!collapsed && "Dashboard"}
          </Link>
        </li>

        {/* ================= ADMIN ================= */}
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
                href="/dashboard/admin/marketing"
                className="flex items-center gap-3 hover:text-blue-500"
              >
                <Megaphone size={18} />
                {!collapsed && "Marketing"}
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard/admin/sales"
                className="flex items-center gap-3 hover:text-blue-500"
              >
                <ShoppingCart size={18} />
                {!collapsed && "Online sales"}
              </Link>
            </li>
          </>
        )}

        {/* ================= HR MANAGER ================= */}
        {user.role === "HR_MANAGER" && (
          <>
            <li>
              <Link href="/dashboard/hr/employees" className="flex items-center gap-3 hover:text-blue-500">
                <Users size={18} />
                {!collapsed && "Employees"}
              </Link>
            </li>

            <li>
              <Link href="/dashboard/hr/attendance" className="flex items-center gap-3 hover:text-blue-500">
                <Calendar size={18} />
                {!collapsed && "Attendance"}
              </Link>
            </li>

            <li>
              <Link href="/dashboard/hr/payroll" className="flex items-center gap-3 hover:text-blue-500">
                <DollarSign size={18} />
                {!collapsed && "Payroll"}
              </Link>
            </li>

            <li>
              <Link href="/dashboard/hr/performance" className="flex items-center gap-3 hover:text-blue-500">
                <BarChart size={18} />
                {!collapsed && "Performance"}
              </Link>
            </li>

            <li>
              <Link href="/dashboard/hr/reports" className="flex items-center gap-3 hover:text-blue-500">
                <FileText size={18} />
                {!collapsed && "Reports"}
              </Link>
            </li>
          </>
        )}

        {/* ================= SALES MANAGER ================= */}
{user.role === "SALES_MANAGER" && (
          <>
            <li>
              <Link href="/dashboard/sales/catalog" className="flex items-center gap-3 hover:text-blue-500">
                <ShoppingCart size={18} />
                {!collapsed && "Product Catalog"}
              </Link>
            </li>

            <li>
              <Link href="/dashboard/sales/orders" className="flex items-center gap-3 hover:text-blue-500">
                <FileText size={18} />
                {!collapsed && "Online Orders"}
              </Link>
            </li>

            <li>
              <Link href="/dashboard/sales/stock" className="flex items-center gap-3 hover:text-blue-500">
                <BarChart size={18} />
                {!collapsed && "Stock & Production"}
              </Link>
            </li>

            <li>
              <Link href="/dashboard/sales/tracking" className="flex items-center gap-3 hover:text-blue-500">
                <Calendar size={18} />
                {!collapsed && "Delivery Tracking"}
              </Link>
            </li>

            <li>
              <Link href="/dashboard/sales/returns" className="flex items-center gap-3 hover:text-blue-500">
                <DollarSign size={18} />
                {!collapsed && "Returns & Refunds"}
              </Link>
            </li>
          </>
        )}

        {/* ================= MARKETING MANAGER ================= */}
        {user.role === "MARKETING_MANAGER" && (
          <>
            <li>
              <Link href="/dashboard/marketing/campaigns" className="flex items-center gap-3 hover:text-blue-500">
                <Megaphone size={18} />
                {!collapsed && "Campaigns"}
              </Link>
            </li>

            <li>
              <Link href="/dashboard/marketing/analytics" className="flex items-center gap-3 hover:text-blue-500">
                <BarChart size={18} />
                {!collapsed && "Analytics"}
              </Link>
            </li>

            <li>
              <Link href="/dashboard/marketing/segmentation" className="flex items-center gap-3 hover:text-blue-500">
                <Users size={18} />
                {!collapsed && "Segmentation"}
              </Link>
            </li>

            <li>
              <Link href="/dashboard/marketing/budget" className="flex items-center gap-3 hover:text-blue-500">
                <DollarSign size={18} />
                {!collapsed && "Budget"}
              </Link>
            </li>

            <li>
              <Link href="/dashboard/marketing/promotions" className="flex items-center gap-3 hover:text-blue-500">
                <Calendar size={18} />
                {!collapsed && "Promotions"}
              </Link>
            </li>
          </>
        )}
      </ul>
    </motion.div>
  );
}
