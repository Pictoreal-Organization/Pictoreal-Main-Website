"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    // Check authentication status from localStorage
    const authStatus = localStorage.getItem("isAuthenticated");
    const userData = localStorage.getItem("user");
    
    if (authStatus !== "true" || !userData) {
      router.push("/pictoblogs/login");
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== "admin") {
      router.push("/pictoblogs");
      return;
    }
    
    setUser(parsedUser);
    setAuthLoading(false);
  }, [router]);

  useEffect(() => {
    if (user && user.role === "admin") {
      const fetchPending = async () => {
        try {
          const res = await fetch("/api/admin/posts");
          const data = await res.json();
          setPosts(data);
        } catch (error) {
          console.error("Failed to fetch posts:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchPending();
    }
  }, [user]);

  const approve = async (id) => {
    try {
      const res = await fetch(`/api/admin/posts/${id}/approve`, { method: "POST" });
      if (res.ok) setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Failed to approve post:", error);
    }
  };

  if (authLoading) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="text-center">Loading posts...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Pending Posts</h1>
      {posts.map((p) => (
        <div key={p._id} className="border p-4 space-y-2">
          <h2 className="text-xl font-medium">{p.title}</h2>
          <p className="text-sm text-gray-600">{p.description}</p>
          <div className="prose" dangerouslySetInnerHTML={{ __html: p.contentHtml }} />
          <div className="flex gap-2">
            <button className="bg-green-600 text-white px-3 py-1" onClick={() => approve(p._id)}>Approve</button>
          </div>
        </div>
      ))}
    </div>
  );
}

