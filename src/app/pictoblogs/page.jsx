"use client";
import { useEffect, useState } from "react";

export default function PictoBlogsDashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/posts?status=approved");
      const data = await res.json();
      setPosts(data);
      setLoading(false);
    })();
  }, []);
  if (loading) return null;
  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((p) => (
        <div key={p._id} className="border rounded overflow-hidden bg-white">
          {p.thumbnailUrl ? (
            <img src={p.thumbnailUrl} alt={p.title} className="w-full h-40 object-cover" />
          ) : null}
          <div className="p-4 space-y-2">
            <h2 className="text-lg font-semibold">{p.title}</h2>
            <p className="text-sm text-gray-700">{p.description}</p>
            <div className="text-xs text-gray-500">
              <span>{p.author?.name}</span> · <span>{p.author?.department}</span> · <span>{p.author?.yearOfPassing}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}


