"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    passingYear: "",
  });
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true); // start in verifying state to avoid flicker
  const [verified, setVerified] = useState(null); // holds decoded token if valid
  const [error, setError] = useState("");

  // 1) On mount, check token validity via /api/auth/verify
  useEffect(() => {
    let mounted = true;
    async function checkAuth() {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        if (mounted) {
          setVerifying(false);
          setVerified(null);
        }
        return;
      }

      try {
        const res = await fetch("/api/auth/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (!mounted) return;

        if (res.ok && data.valid) {
          // valid token — but DO NOT auto-redirect.
          // we store the decoded payload so we can show role/ID to the user
          setVerified(data.decoded || {});
          setVerifying(false);
        } else {
          // invalid token: remove it and allow signup
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          setVerified(null);
          setVerifying(false);
        }
      } catch (err) {
        console.error("Token verification failed:", err);
        // On any error, clear token and allow signup
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        if (mounted) {
          setVerified(null);
          setVerifying(false);
        }
      }
    }

    checkAuth();
    return () => {
      mounted = false;
    };
  }, []);

  // 2) Signup submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // basic client validation kept (you had it before)
    if (!form.name || !form.email || !form.password) {
      setError("Name, email and password are required");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || data.message || "Signup failed");
        setLoading(false);
        return;
      }

      // signup success — redirect user to login (don't auto-login unless signup route returns token)
      router.push("/auth/login");
    } catch (err) {
      console.error("Signup error:", err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // 3) If verified: show friendly non-forced UI instead of auto-redirect
  const handleGoToBlogs = () => router.push("/blogs");
  const handleLogoutAndContinue = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setVerified(null);
    setVerifying(false);
  };

  if (verifying) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-4 text-center">Checking login status…</div>
      </div>
    );
  }

  if (verified) {
    // Show explicit choice instead of redirecting automatically
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full text-center">
          <h2 className="text-lg font-semibold mb-2">You are already logged in</h2>
          <p className="mb-3 text-sm text-gray-600">
            We detected an active session{verified.role ? ` (role: ${verified.role})` : ""}.
          </p>

          <div className="flex gap-3 justify-center mb-3">
            <button
              onClick={handleGoToBlogs}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Go to Blogs
            </button>

            <button
              onClick={handleLogoutAndContinue}
              className="px-4 py-2 border rounded-md"
            >
              Logout & signup with another account
            </button>
          </div>

          <p className="text-xs text-gray-500">
            If you expected to sign up, choose “Logout & signup” — otherwise go to Blogs.
          </p>
        </div>
      </div>
    );
  }

  // 4) Normal signup form when not logged in
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>

        {error && (
          <div className="mb-4 text-red-500 text-center font-medium">{error}</div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
            required
            minLength={6}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Department</label>
          <input
            type="text"
            value={form.department}
            onChange={(e) => setForm((p) => ({ ...p, department: e.target.value }))}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Passing Year</label>
          <input
            type="text"
            value={form.passingYear}
            onChange={(e) => setForm((p) => ({ ...p, passingYear: e.target.value }))}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/auth/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
