"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Security */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-6">Security</h2>

          <button className="w-full text-left bg-gray-900 p-4 rounded-lg hover:bg-gray-700 transition mb-4">
            Change Password
          </button>

          <button className="w-full text-left bg-gray-900 p-4 rounded-lg hover:bg-gray-700 transition">
            Enable Two-Factor Authentication
          </button>
        </div>

        {/* Preferences */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-6">Preferences</h2>

          <button className="w-full text-left bg-gray-900 p-4 rounded-lg hover:bg-gray-700 transition mb-4">
            Enable Notifications
          </button>

          <button className="w-full text-left bg-gray-900 p-4 rounded-lg hover:bg-gray-700 transition">
            Toggle Dark Mode
          </button>
        </div>

        {/* Danger Zone */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg md:col-span-2">
          <h2 className="text-xl font-semibold mb-6 text-red-400">
            Danger Zone
          </h2>

          <button className="w-full text-left bg-red-600 p-4 rounded-lg hover:bg-red-700 transition">
            Delete Account
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
