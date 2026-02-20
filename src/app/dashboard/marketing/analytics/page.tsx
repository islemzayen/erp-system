"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-8">Marketing Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-gray-800 shadow-lg">
          <h3 className="text-gray-400 text-sm">Email Open Rate</h3>
          <p className="text-3xl font-bold text-blue-500 mt-2">45%</p>
        </div>

        <div className="p-6 rounded-2xl bg-gray-800 shadow-lg">
          <h3 className="text-gray-400 text-sm">Click Through Rate</h3>
          <p className="text-3xl font-bold text-green-500 mt-2">18%</p>
        </div>

        <div className="p-6 rounded-2xl bg-gray-800 shadow-lg">
          <h3 className="text-gray-400 text-sm">Conversion Rate</h3>
          <p className="text-3xl font-bold text-purple-500 mt-2">7%</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
