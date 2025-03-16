"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const ADMIN_USERNAME = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") === "true") {
      router.push("/bdd/admin");
    }
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem("isAuthenticated", "true");
      router.push("/bdd/admin");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    
    
    <div className="flex items-center justify-center min-h-screen bg-[url('/Doodle.jpg')] bg-cover bg-center">
    <div className="p-6 bg-white rounded shadow-md w-80">
      <h1 className="text-xl font-bold mb-4 text-center">Login</h1>
      {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block mb-1">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="w-full border rounded px-3 py-2"
            autoComplete="username"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-1">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full border rounded px-3 py-2"
            autoComplete="current-password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  </div>
  );
}
