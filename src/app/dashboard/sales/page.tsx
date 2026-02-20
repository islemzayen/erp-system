"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";

export default function SalesDashboard() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">Online Sales Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-gray-800 shadow-lg">
          <h3 className="text-gray-400 text-sm">Total Orders</h3>
          <p className="text-3xl font-bold text-blue-500 mt-2">356</p>
        </div>

        <div className="p-6 rounded-2xl bg-gray-800 shadow-lg">
          <h3 className="text-gray-400 text-sm">Revenue</h3>
          <p className="text-3xl font-bold text-green-500 mt-2">$48,200</p>
        </div>

        <div className="p-6 rounded-2xl bg-gray-800 shadow-lg">
          <h3 className="text-gray-400 text-sm">Pending Shipments</h3>
          <p className="text-3xl font-bold text-purple-500 mt-2">23</p>
        </div>

        <div className="p-6 rounded-2xl bg-gray-800 shadow-lg">
          <h3 className="text-gray-400 text-sm">Returns</h3>
          <p className="text-3xl font-bold text-red-500 mt-2">5</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
