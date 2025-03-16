"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminPanel from "../../../components/bdd/admin/adminpannel";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for user authentication in sessionStorage
    const checkAuthentication = () => {
      try {
        const authUser = sessionStorage.getItem("authUser");
        
        if (!authUser) {
          // No user found, redirect to login
          router.push("/bdd/login");
          return;
        }
        
        // Parse the user data
        const userData = JSON.parse(authUser);
        
        // Check if user data exists and has expected properties
        if (!userData || !userData.id || !userData.username) {
          // Invalid user data, redirect to login
          sessionStorage.removeItem("authUser");
          router.push("/bdd/login");
          return;
        }
        
        // User is authenticated
        setUser(userData);
        setLoading(false);
      } catch (error) {
        console.error("Authentication error:", error);
        // On any error, clear session and redirect
        sessionStorage.removeItem("authUser");
        router.push("/bdd/login");
      }
    };
    
    checkAuthentication();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return <AdminPanel user={user} />;
}