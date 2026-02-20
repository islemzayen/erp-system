"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import Table from "@/components/ui/Table";

export default function CatalogPage() {
  const products = [
    { Name: "Laptop", Price: "$1200", Stock: 15 },
    { Name: "Smartphone", Price: "$800", Stock: 30 },
  ];

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">Product Catalog</h2>
      <Table headers={["Name", "Price", "Stock"]} data={products} />
    </DashboardLayout>
  );
}
