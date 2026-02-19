"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import Card from "@/components/ui/Card";

export default function MarketingPage() {
  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">Campaign Management</h2>

      <div className="grid grid-cols-3 gap-6">
        <Card>
          <h3>Active Campaigns</h3>
          <p className="text-2xl font-bold">5</p>
        </Card>

        <Card>
          <h3>ROI</h3>
          <p className="text-2xl font-bold">+23%</p>
        </Card>

        <Card>
          <h3>Budget Used</h3>
          <p className="text-2xl font-bold">$12,000</p>
        </Card>
      </div>
    </DashboardLayout>
  );
}
