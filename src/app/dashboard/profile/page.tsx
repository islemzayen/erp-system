"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const { user } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // ✅ Sync state when user loads
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg max-w-xl">
        <h2 className="text-xl font-semibold mb-6">
          Profile Information
        </h2>

        <div className="space-y-4">
          <div>
            <label className="text-gray-400 text-sm">
              Full Name
            </label>
            <input
              className="w-full mt-2 p-3 rounded-lg bg-gray-900 border border-gray-700"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm">
              Email
            </label>
            <input
              className="w-full mt-2 p-3 rounded-lg bg-gray-900 border border-gray-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm">
              Role
            </label>
            <input
              className="w-full mt-2 p-3 rounded-lg bg-gray-900 border border-gray-700"
              value={user?.role || ""}
              disabled
            />
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg">
            Save Changes
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
