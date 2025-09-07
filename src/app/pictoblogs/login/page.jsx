"use client";
import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/pictoblogs");
    }
  }, [status, router]);

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      setError("Authentication failed. Please try again.");
    }
  }, [searchParams]);
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      // Direct API call to login
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        setError(data.error || "Login failed");
        return;
      }

      // Store user data in localStorage for session management
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("isAuthenticated", "true");
      
      console.log("Login successful, redirecting to editor...");
      router.push("/pictoblogs/editor");
      
    } catch (error) {
      setLoading(false);
      console.error("Login error:", error);
      setError("Login failed. Please try again.");
    }
  };

  if (status === "loading") {
    return (
      <div className="max-w-md mx-auto p-6">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full border p-2" placeholder="Email" type="email" value={email} onChange={(e)=>{setEmail(e.target.value); setError("");}} />
        <input className="w-full border p-2" placeholder="Password" type="password" value={password} onChange={(e)=>{setPassword(e.target.value); setError("");}} />
        <button disabled={loading} className="bg-black text-white px-4 py-2 disabled:opacity-50">{loading?"Logging in...":"Login"}</button>
      </form>
    </div>
  );
}

