"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import Card from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import Button from "@/components/ui/Button";

export default function HRAttendance() {
  const headers = ["Employee", "Date", "Type", "Hours", "Status"];

  const data = [
    {
      employee: "John Doe",
      date: "2024-03-01",
      type: "Sick Leave",
      hours: "8",
      status: "Approved",
    },
    {
      employee: "Alice Smith",
      date: "2024-03-02",
      type: "Vacation",
      hours: "8",
      status: "Pending",
    },
  ];

  return (
    <ProtectedRoute allowedRoles={["HR_MANAGER"]}>
      <DashboardLayout>
        <div className="space-y-6">

          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Attendance & Absences</h1>
            <Button>Approve Requests</Button>
          </div>

          <Card>
            <Table headers={headers} data={data} />
          </Card>

        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
