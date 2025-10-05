"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    department: "",
    passingYear: "",
  });
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(null);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
          setVerified(data.decoded || {});
          setVerifying(false);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          setVerified(null);
          setVerifying(false);
        }
      } catch (err) {
        console.error("Token verification failed:", err);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

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
      console.log("Signup response:", data);

      if (!res.ok) {
        setError(data.error || data.message || "Signup failed");
        setLoading(false);
        return;
      }

      // Clear any old data first
      localStorage.clear();

      // Auto-login after successful signup
      if (data.token && data.user) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        console.log("Stored user data:", data.user);
        
        // Redirect based on user's chosen role
        if (data.user.role === "admin") {
          router.push("/admin-dashboard");
        } else {
          router.push("/editor");
        }
      } else {
        // Fallback: redirect to login if no token returned
        router.push("/auth/login");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoToBlogs = () => router.push("/blogs");
  const handleLogoutAndContinue = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setVerified(null);
    setVerifying(false);
  };

  if (verifying) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#DDF1FF] via-[#B8E4FF] to-[#DDF1FF]">
        <div className="p-6 text-center">
          <div className="w-16 h-16 border-4 border-[#001730] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#001730] font-medium">Checking login status…</p>
        </div>
      </div>
    );
  }

  if (verified) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-[#DDF1FF] via-[#B8E4FF] to-[#DDF1FF]">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-md w-full text-center border border-gray-100 animate-fadeIn">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-[#001730] to-[#003a5f] rounded-full mx-auto flex items-center justify-center mb-4 shadow-lg">
              <svg className="w-10 h-10 text-[#DDF1FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-3 text-[#001730]">You're already logged in!</h2>
          <p className="mb-6 text-gray-600">
            We detected an active session{verified.role ? ` as ${verified.role}` : ""}.
          </p>

          <div className="flex flex-col gap-3 mb-4">
            <button
              onClick={handleGoToBlogs}
              className="group px-6 py-3.5 bg-gradient-to-r from-[#001730] to-[#003a5f] text-[#DDF1FF] rounded-xl font-medium hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span className="flex items-center justify-center gap-2">
                Go to Blogs
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>

            <button
              onClick={handleLogoutAndContinue}
              className="px-6 py-3.5 border-2 border-[#001730] text-[#001730] rounded-xl font-medium hover:bg-[#001730] hover:text-[#DDF1FF] transition-all duration-300"
            >
              Logout & create new account
            </button>
          </div>

          <p className="text-xs text-gray-500">
            Choose "Logout & create new account" if you want to sign up with different credentials.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#DDF1FF] via-[#B8E4FF] to-[#DDF1FF] p-4">
      <div className="w-full max-w-md animate-fadeIn">
        <form
          onSubmit={handleSubmit}
          className="bg-white/95 backdrop-blur-sm p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-gradient-to-br from-[#001730] to-[#003a5f] rounded-2xl mb-4 shadow-lg">
              <svg className="w-8 h-8 text-[#DDF1FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-[#001730] mb-2 tracking-tight">Signup</h1>
            <p className="text-gray-500">Join the Pictoreal community</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg text-sm font-medium animate-shake">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            </div>
          )}

          <div className="space-y-5">
            {/* Name */}
            <div className="group">
              <label className="block text-sm font-semibold mb-2 text-[#001730]">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400 group-focus-within:text-[#001730] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  required
                  placeholder="Enter your full name"
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#001730] transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div className="group">
              <label className="block text-sm font-semibold mb-2 text-[#001730]">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400 group-focus-within:text-[#001730] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  required
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#001730] transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="group">
              <label className="block text-sm font-semibold mb-2 text-[#001730]">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400 group-focus-within:text-[#001730] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                  required
                  minLength={6}
                  placeholder="Minimum 6 characters"
                  className="w-full pl-12 pr-12 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#001730] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#001730] transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Role */}
            <div className="group">
              <label className="block text-sm font-semibold mb-2 text-[#001730]">
                Role <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400 group-focus-within:text-[#001730] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <select
                  value={form.role}
                  onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
                  required
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#001730] transition-all bg-white cursor-pointer appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23001730'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                    backgroundSize: "1.25rem",
                  }}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            {/* Department */}
            <div className="group">
              <label className="block text-sm font-semibold mb-2 text-[#001730]">
                Department
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400 group-focus-within:text-[#001730] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <select
                  value={form.department}
                  onChange={(e) => setForm((p) => ({ ...p, department: e.target.value }))}
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#001730] transition-all bg-white cursor-pointer appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23001730'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                    backgroundSize: "1.25rem",
                  }}
                >
                  <option value="">Select Department</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="ENTC">ENTC</option>
                  <option value="ECE">ECE</option>
                  <option value="AIDS">AIDS</option>
                </select>
              </div>
            </div>

            {/* Passing Year */}
            <div className="group">
              <label className="block text-sm font-semibold mb-2 text-[#001730]">
                Passing Year
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400 group-focus-within:text-[#001730] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={form.passingYear}
                  onChange={(e) => setForm((p) => ({ ...p, passingYear: e.target.value }))}
                  placeholder="e.g., 2025"
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#001730] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-8 bg-gradient-to-r from-[#001730] to-[#003a5f] text-[#DDF1FF] py-4 px-6 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <svg className="animate-spin h-5 w-5 text-[#DDF1FF]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating your account...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Create Account
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            )}
          </button>

          {/* Login Link */}
          <div className="text-center mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/auth/login" className="text-[#001730] font-semibold hover:underline inline-flex items-center gap-1 group">
                Login here
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </p>
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}