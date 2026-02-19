"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import Card from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import Button from "@/components/ui/Button";

export default function HREmployees() {
  const headers = ["Name", "Position", "Contract", "Status"];

  const data = [
    {
      name: "John Doe",
      position: "Developer",
      contract: "CDI",
      status: "Active",
    },
    {
      name: "Alice Smith",
      position: "Designer",
      contract: "CDD",
      status: "On Leave",
    },
  ];

  return (
    <ProtectedRoute allowedRoles={["HR_MANAGER"]}>
      <DashboardLayout>
        <div className="space-y-6">

          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Employee Management</h1>
            <Button>Add Employee</Button>
          </div>

          <Card>
            <Table headers={headers} data={data} />
          </Card>

        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
