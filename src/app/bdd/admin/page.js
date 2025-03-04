"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminPanel from "../../../components/bdd/admin/adminpannel";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

    if (!isAuthenticated) {
      router.push("/bdd/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return <AdminPanel />;
}
