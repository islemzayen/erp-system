"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Table from "@/components/ui/Table";

const PromotionsPage = () => {
  const promotions = [
    { Name: "Black Friday", Discount: "30%", Status: "Active" },
    { Name: "New Year Sale", Discount: "20%", Status: "Scheduled" },
  ];

  return (
    <DashboardLayout>
      <div>
        <h2 className="text-2xl font-bold mb-6">Promotions</h2>

        <Table
          headers={["Name", "Discount", "Status"]}
          data={promotions}
        />
      </div>
    </DashboardLayout>
  );
};

export default PromotionsPage;
