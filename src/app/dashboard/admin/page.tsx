"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import Card from "@/components/ui/Card";
import Table from "@/components/ui/Table";

export default function AdminDashboard() {
  const userHeaders = ["Name", "Email", "Role"];
  const userData = [
    { name: "John Doe", email: "john@example.com", role: "HR Manager" },
    { name: "Alice Smith", email: "alice@example.com", role: "Marketing Manager" },
    { name: "Bob Brown", email: "bob@example.com", role: "Employee" },
  ];

  const orderHeaders = ["Order ID", "Customer", "Amount"];
  const orderData = [
    { id: "#1001", customer: "Alice", amount: "$250" },
    { id: "#1002", customer: "Bob", amount: "$480" },
    { id: "#1003", customer: "Charlie", amount: "$120" },
  ];

  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <DashboardLayout>
        <div className="space-y-8">

          {/* 🔥 KPI CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <h3 className="text-gray-500 text-sm">Total Employees</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">124</p>
            </Card>

            <Card>
              <h3 className="text-gray-500 text-sm">Monthly Revenue</h3>
              <p className="text-3xl font-bold text-green-600 mt-2">$48,200</p>
            </Card>

            <Card>
              <h3 className="text-gray-500 text-sm">Total Orders</h3>
              <p className="text-3xl font-bold text-purple-600 mt-2">356</p>
            </Card>

            <Card>
              <h3 className="text-gray-500 text-sm">Active Campaigns</h3>
              <p className="text-3xl font-bold text-orange-500 mt-2">7</p>
            </Card>
          </div>

          {/* 📊 Charts Placeholder Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
              <div className="h-40 flex items-center justify-center text-gray-400">
                Chart Placeholder
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold mb-4">Orders Trend</h3>
              <div className="h-40 flex items-center justify-center text-gray-400">
                Chart Placeholder
              </div>
            </Card>
          </div>

          {/* 👥 Recent Users */}
          <Card>
            <h3 className="text-lg font-semibold mb-4">Recent Users</h3>
            <Table headers={userHeaders} data={userData} />
          </Card>

          {/* 📦 Recent Orders */}
          <Card>
            <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
            <Table headers={orderHeaders} data={orderData} />
          </Card>

          {/* 🚨 Alerts Section */}
          <Card>
            <h3 className="text-lg font-semibold mb-4">System Alerts</h3>
            <ul className="space-y-2 text-sm text-red-500">
              <li>⚠️ Low inventory on Product A</li>
              <li>⚠️ 3 pending user approvals</li>
              <li>⚠️ Server usage above 85%</li>
            </ul>
          </Card>

        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
