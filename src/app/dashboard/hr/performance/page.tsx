"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import Card from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import Button from "@/components/ui/Button";

export default function HRPerformance() {
  const headers = ["Employee", "Rating", "Last Review", "Manager"];

  const data = [
    {
      employee: "John Doe",
      rating: "Excellent",
      review: "2024-01-15",
      manager: "Sarah Johnson",
    },
    {
      employee: "Alice Smith",
      rating: "Good",
      review: "2024-02-10",
      manager: "Michael Brown",
    },
  ];

  return (
    <ProtectedRoute allowedRoles={["HR_MANAGER"]}>
      <DashboardLayout>
        <div className="space-y-6">

          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Performance Tracking</h1>
            <Button>Add Evaluation</Button>
          </div>

          <Card>
            <Table headers={headers} data={data} />
          </Card>

        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
