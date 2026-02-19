"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import Link from "next/link";
import {
  Users,
  Calendar,
  DollarSign,
  BarChart,
  FileText,
} from "lucide-react";

export default function HRDashboardPage() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">HR Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="p-6 rounded-2xl bg-gray-800 shadow-lg">
          <h3 className="text-gray-400 text-sm">Total Employees</h3>
          <p className="text-3xl font-bold text-blue-500 mt-2">124</p>
        </div>

        <div className="p-6 rounded-2xl bg-gray-800 shadow-lg">
          <h3 className="text-gray-400 text-sm">Pending Payroll</h3>
          <p className="text-3xl font-bold text-green-500 mt-2">$32,000</p>
        </div>

        <div className="p-6 rounded-2xl bg-gray-800 shadow-lg">
          <h3 className="text-gray-400 text-sm">Attendance Today</h3>
          <p className="text-3xl font-bold text-purple-500 mt-2">110</p>
        </div>

        <div className="p-6 rounded-2xl bg-gray-800 shadow-lg">
          <h3 className="text-gray-400 text-sm">Performance Reviews</h3>
          <p className="text-3xl font-bold text-orange-500 mt-2">8 Due</p>
        </div>
      </div>

      {/* Quick Access Section */}
      <h2 className="text-xl font-semibold mb-6">Manage HR</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          href="/dashboard/hr/employees"
          className="p-6 rounded-2xl bg-gray-800 hover:bg-gray-700 transition shadow-lg flex items-center gap-4"
        >
          <Users size={24} />
          <span className="font-medium">Employees</span>
        </Link>

        <Link
          href="/dashboard/hr/attendance"
          className="p-6 rounded-2xl bg-gray-800 hover:bg-gray-700 transition shadow-lg flex items-center gap-4"
        >
          <Calendar size={24} />
          <span className="font-medium">Attendance</span>
        </Link>

        <Link
          href="/dashboard/hr/payroll"
          className="p-6 rounded-2xl bg-gray-800 hover:bg-gray-700 transition shadow-lg flex items-center gap-4"
        >
          <DollarSign size={24} />
          <span className="font-medium">Payroll</span>
        </Link>

        <Link
          href="/dashboard/hr/performance"
          className="p-6 rounded-2xl bg-gray-800 hover:bg-gray-700 transition shadow-lg flex items-center gap-4"
        >
          <BarChart size={24} />
          <span className="font-medium">Performance</span>
        </Link>

        <Link
          href="/dashboard/hr/reports"
          className="p-6 rounded-2xl bg-gray-800 hover:bg-gray-700 transition shadow-lg flex items-center gap-4"
        >
          <FileText size={24} />
          <span className="font-medium">Reports</span>
        </Link>
      </div>
    </DashboardLayout>
  );
}
