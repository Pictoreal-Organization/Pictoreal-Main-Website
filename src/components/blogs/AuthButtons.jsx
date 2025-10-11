"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AuthButtons() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role");
      }
    }
    
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setUser(null);
    router.push("/blogs");
  };

  if (loading) {
    return (
      <div className="flex gap-4 justify-end">
        <div className="px-4 py-2 bg-gray-300 rounded animate-pulse">
          <div className="w-12 h-4"></div>
        </div>
        <div className="px-4 py-2 bg-gray-300 rounded animate-pulse">
          <div className="w-16 h-4"></div>
        </div>
      </div>
    );
  }

  if (isLoggedIn) {
    return (
      <div className="flex gap-4 justify-end items-center">
        <span className="text-sm text-gray-600">
          Welcome, {user?.name || user?.email || "User"}
        </span>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-4 justify-end">
      <Link
        href="/auth/login"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Login
      </Link>
      <Link
        href="/auth/signup"
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Sign Up
      </Link>
    </div>
  );
}
