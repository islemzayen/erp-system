"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import Table from "@/components/ui/Table";

export default function AdminHRPage() {
  const employees = [
    { Name: "John Doe", Position: "HR Manager" },
    { Name: "Jane Smith", Position: "Recruiter" },
  ];

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">HR Employees</h2>

      <Table
        headers={["Name", "Position"]}
        data={employees}
      />
    </DashboardLayout>
  );
}
