"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status from localStorage
    const authStatus = localStorage.getItem("isAuthenticated");
    const userData = localStorage.getItem("user");
    
    if (authStatus === "true" && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    window.location.href = "/pictoblogs/login";
  };

  return (
    <div className="w-full bg-white border-b">
      <div className="max-w-6xl mx-auto p-4 flex items-center gap-4">
        <Link href="/">Home</Link>
        <Link href="/pictoblogs">PictoBlogs</Link>
        {isAuthenticated && user ? (
          <>
            <Link href="/pictoblogs/editor">Write</Link>
            {user.role === "admin" && <Link href="/pictoblogs/admin">Admin</Link>}
            <span className="text-sm text-gray-600">Welcome, {user.name}</span>
            <button onClick={handleLogout} className="text-red-600 hover:underline">Logout</button>
          </>
        ) : (
          <>
            <Link href="/pictoblogs/login">Login</Link>
            <Link href="/pictoblogs/signup">Signup</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;