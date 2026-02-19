"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import Card from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import Button from "@/components/ui/Button";

export default function HRPayroll() {
  const headers = ["Employee", "Base Salary", "Bonus", "Deductions", "Net Salary"];

  const data = [
    {
      employee: "John Doe",
      base: "$3000",
      bonus: "$500",
      deductions: "$200",
      net: "$3300",
    },
    {
      employee: "Alice Smith",
      base: "$2800",
      bonus: "$300",
      deductions: "$150",
      net: "$2950",
    },
  ];

  return (
    <ProtectedRoute allowedRoles={["HR_MANAGER"]}>
      <DashboardLayout>
        <div className="space-y-6">

          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Payroll Management</h1>
            <Button>Generate Payslips</Button>
          </div>

          <Card>
            <Table headers={headers} data={data} />
          </Card>

        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
