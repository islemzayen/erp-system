"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { mockUsers } from "@/services/mockUsers";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // 🚀 Prevent page refresh

    const foundUser = mockUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (!foundUser) {
      setError("Invalid email or password");
      return;
    }

    login({
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
      token: "fake-jwt-token",
    });

    router.push(
      `/dashboard/${foundUser.role.toLowerCase().replace("_manager", "")}`
    );
  };

  return (
    <div className="min-h-screen flex bg-gray-950 text-gray-200">
      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 items-center justify-center border-r border-gray-800">
        <div className="text-center px-12">
          <h1 className="text-4xl font-bold tracking-wide mb-6 text-white">
            ERP SYSTEM
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Secure enterprise management platform for HR, Marketing,
            Sales and Operations.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full md:w-1/2 items-center justify-center">
        <div className="bg-gray-900 p-10 rounded-2xl shadow-2xl w-96 border border-gray-800">
          <h2 className="text-2xl font-semibold mb-8 text-white">
            Sign in to your account
          </h2>

          {/* ✅ FORM STARTS HERE */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-3 rounded-lg transition-all outline-none text-white placeholder-gray-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-3 rounded-lg transition-all outline-none text-white placeholder-gray-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            {/* ✅ SUBMIT BUTTON */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-all duration-300"
            >
              Sign In
            </button>
          </form>

          <p className="text-xs text-gray-500 mt-8 text-center">
            © 2026 ERP System. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
