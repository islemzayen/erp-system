"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import Table from "@/components/ui/Table";

export default function OrdersPage() {
  const orders = [
    { OrderID: "#1001", Customer: "Alice", Status: "Shipped" },
    { OrderID: "#1002", Customer: "Bob", Status: "Processing" },
  ];

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">Online Orders</h2>
      <Table headers={["OrderID", "Customer", "Status"]} data={orders} />
    </DashboardLayout>
  );
}
