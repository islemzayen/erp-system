"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import Table from "@/components/ui/Table";

export default function BudgetPage() {
  const budgets = [
    { Campaign: "Summer Sale", Allocated: "$10,000", Used: "$6,500" },
    { Campaign: "Instagram Ads", Allocated: "$5,000", Used: "$3,200" },
  ];

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">Marketing Budget</h2>

      <Table
        headers={["Campaign", "Allocated", "Used"]}
        data={budgets}
      />
    </DashboardLayout>
  );
}
