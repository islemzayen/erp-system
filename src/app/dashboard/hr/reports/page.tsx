"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function HRReports() {
  return (
    <ProtectedRoute allowedRoles={["HR_MANAGER"]}>
      <DashboardLayout>
        <div className="space-y-6">

          <h1 className="text-2xl font-bold">HR Reports</h1>

          <Card>
            <div className="flex flex-col md:flex-row gap-4">
              <Button>Export Payroll Report (PDF)</Button>
              <Button>Export Absence Report (Excel)</Button>
              <Button>Export Employee List</Button>
            </div>
          </Card>

        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
