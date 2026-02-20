"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import Table from "@/components/ui/Table";

export default function SegmentationPage() {
  const segments = [
    { Segment: "Young Adults (18-25)", Customers: 320 },
    { Segment: "Returning Customers", Customers: 150 },
    { Segment: "High Spenders", Customers: 75 },
  ];

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">Customer Segmentation</h2>

      <Table
        headers={["Segment", "Customers"]}
        data={segments}
      />
    </DashboardLayout>
  );
}
