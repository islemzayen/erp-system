"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import Table from "@/components/ui/Table";

export default function CampaignsPage() {
  const campaigns = [
    {
      Name: "Summer Sale",
      Channel: "Email",
      Status: "Active",
      Budget: "$5,000",
    },
    {
      Name: "Instagram Ads",
      Channel: "Social Media",
      Status: "Paused",
      Budget: "$3,000",
    },
  ];

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">Campaign Management</h2>

      <Table
        headers={["Name", "Channel", "Status", "Budget"]}
        data={campaigns}
      />
    </DashboardLayout>
  );
}
