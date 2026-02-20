"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { Megaphone, BarChart, DollarSign, Users } from "lucide-react";

export default function MarketingDashboard() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">Marketing Dashboard</h1>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="p-6 rounded-2xl bg-gray-800 shadow-lg">
          <h3 className="text-gray-400 text-sm">Active Campaigns</h3>
          <p className="text-3xl font-bold text-blue-500 mt-2">12</p>
        </div>

        <div className="p-6 rounded-2xl bg-gray-800 shadow-lg">
          <h3 className="text-gray-400 text-sm">Total Leads</h3>
          <p className="text-3xl font-bold text-green-500 mt-2">1,245</p>
        </div>

        <div className="p-6 rounded-2xl bg-gray-800 shadow-lg">
          <h3 className="text-gray-400 text-sm">Conversion Rate</h3>
          <p className="text-3xl font-bold text-purple-500 mt-2">8.4%</p>
        </div>

        <div className="p-6 rounded-2xl bg-gray-800 shadow-lg">
          <h3 className="text-gray-400 text-sm">Marketing Budget Used</h3>
          <p className="text-3xl font-bold text-orange-500 mt-2">$24,000</p>
        </div>
      </div>

      {/* Quick Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-gray-800 shadow-lg">
          <div className="flex items-center gap-4 mb-4">
            <Megaphone />
            <h2 className="text-xl font-semibold">Campaign Performance</h2>
          </div>
          <p className="text-gray-400">
            Track campaign results, engagement rates and ROI.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-gray-800 shadow-lg">
          <div className="flex items-center gap-4 mb-4">
            <BarChart />
            <h2 className="text-xl font-semibold">Analytics Overview</h2>
          </div>
          <p className="text-gray-400">
            Monitor open rates, click-through rates and conversions.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-gray-800 shadow-lg">
          <div className="flex items-center gap-4 mb-4">
            <DollarSign />
            <h2 className="text-xl font-semibold">Budget Tracking</h2>
          </div>
          <p className="text-gray-400">
            Compare allocated budgets with actual spending.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-gray-800 shadow-lg">
          <div className="flex items-center gap-4 mb-4">
            <Users />
            <h2 className="text-xl font-semibold">Customer Segmentation</h2>
          </div>
          <p className="text-gray-400">
            Analyze customer groups and targeted campaigns.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
