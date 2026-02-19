"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">
        Welcome, {user?.name}
      </h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h3>Total Employees</h3>
          <p className="text-3xl font-bold">124</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3>Total Sales</h3>
          <p className="text-3xl font-bold">$24,000</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3>Active Campaigns</h3>
          <p className="text-3xl font-bold">8</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
