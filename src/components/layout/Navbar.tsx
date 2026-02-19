"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();              // clear user
    router.replace("/login"); // redirect to login
  };

  return (
    <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md transition">

      <h1 className="text-lg font-semibold capitalize">
        {user?.role.replace("_", " ").toLowerCase()}
      </h1>

      <div className="flex items-center gap-4">
        
        <span>{user?.name}</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
