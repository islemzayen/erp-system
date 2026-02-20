"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import Table from "@/components/ui/Table";

export default function AdminMarketingPage() {
  const marketingEmployees = [
    { Name: "Sarah Lee", Position: "Marketing Manager" },
    { Name: "Tom Brown", Position: "SEO Specialist" },
    { Name: "Emma Davis", Position: "Content Creator" },
  ];

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">
        Marketing Department Employees
      </h2>

      <Table
        headers={["Name", "Position"]}
        data={marketingEmployees}
      />
    </DashboardLayout>
  );
}
