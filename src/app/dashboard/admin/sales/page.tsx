"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import Table from "@/components/ui/Table";

export default function SalesPage() {
  const orders = [
    { OrderID: "#1001", Customer: "Alice", Total: "$200" },
    { OrderID: "#1002", Customer: "Bob", Total: "$450" },
  ];

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">Orders</h2>

      <Table
        headers={["OrderID", "Customer", "Total"]}
        data={orders}
      />
    </DashboardLayout>
  );
}
