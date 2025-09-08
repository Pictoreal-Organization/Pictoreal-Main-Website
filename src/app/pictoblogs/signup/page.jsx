"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", department: "", yearOfPassing: "" });
  const [loading, setLoading] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/auth/signup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, yearOfPassing: Number(form.yearOfPassing) }) });
    setLoading(false);
    if (!res.ok) {
      const j = await res.json();
      alert(j.error || "Failed");
      return;
    }
    alert("Account created successfully! Please login.");
    router.push("/pictoblogs/login");
  };
  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Signup</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full border p-2" placeholder="Name" value={form.name} onChange={(e)=>setForm({ ...form, name: e.target.value })} />
        <input className="w-full border p-2" placeholder="Email" type="email" value={form.email} onChange={(e)=>setForm({ ...form, email: e.target.value })} />
        <input className="w-full border p-2" placeholder="Password" type="password" value={form.password} onChange={(e)=>setForm({ ...form, password: e.target.value })} />
        <input className="w-full border p-2" placeholder="Department" value={form.department} onChange={(e)=>setForm({ ...form, department: e.target.value })} />
        <input className="w-full border p-2" placeholder="Year of Passing" type="number" value={form.yearOfPassing} onChange={(e)=>setForm({ ...form, yearOfPassing: e.target.value })} />
        <button disabled={loading} className="bg-black text-white px-4 py-2 disabled:opacity-50">{loading?"Creating Account...":"Create Account"}</button>
      </form>
    </div>
  );
}

