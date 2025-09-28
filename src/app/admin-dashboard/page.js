// "use client";
// import { useState, useEffect } from "react";
// import Link from "next/link";

// const AdminDashboard = () => {
//   const [pendingBlogs, setPendingBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchPendingBlogs = async () => {
//     try {
//       const res = await fetch("/api/admin/blogs");
//       if (!res.ok) {
//         throw new Error("Failed to fetch pending blogs");
//       }
//       const data = await res.json();
//       setPendingBlogs(data.data);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to load blogs for review.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPendingBlogs();
//   }, []);

//   const handleAction = async (blogId, action) => {
//     const rejectionReason = action === "reject" ? prompt("Enter rejection reason:") : null;
//     if (action === "reject" && !rejectionReason) {
//       return alert("Rejection reason is required to reject a blog.");
//     }

//     try {
//       const res = await fetch("/api/admin/blogs", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ action, blogId, rejectionReason, userId: "admin-123" }), // Replace with real user ID
//       });
//       if (!res.ok) {
//         throw new Error("Failed to perform action");
//       }
//       // Re-fetch the list to update the UI
//       fetchPendingBlogs();
//     } catch (err) {
//       console.error(err);
//       alert("Action failed. See console for details.");
//     }
//   };

//   if (loading) return <div className="p-6">Loading admin dashboard...</div>;

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Admin Blog Review Portal</h1>
//       {pendingBlogs.length === 0 && <p>No blogs are pending review.</p>}
//       <div className="space-y-6">
//         {pendingBlogs.map((blog) => (
//           <div key={blog._id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
//             <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
//             <p className="text-gray-600 mb-4">By {blog.author}</p>
//             <div className="flex space-x-4">
//               <Link href={`/blogs/${blog._id}`}>
//                 <span className="text-blue-600 hover:underline">View</span>
//               </Link>
//               <button
//                 onClick={() => handleAction(blog._id, "accept")}
//                 className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
//               >
//                 Accept
//               </button>
//               <button
//                 onClick={() => handleAction(blog._id, "reject")}
//                 className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//               >
//                 Reject
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AdminDashboard = () => {
  const [pendingBlogs, setPendingBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // ✅ Protect route: only allow admins
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      router.push("/auth/signup"); // redirect if not admin
    }
  }, [router]);

  // Fetch pending blogs
  const fetchPendingBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/blogs");
      if (!res.ok) {
        throw new Error("Failed to fetch pending blogs");
      }
      const data = await res.json();
      setPendingBlogs(data.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load blogs for review.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingBlogs();
  }, []);

  const handleAction = async (blogId, action) => {
    const rejectionReason = action === "reject" ? prompt("Enter rejection reason:") : null;
    if (action === "reject" && !rejectionReason) {
      return alert("Rejection reason is required to reject a blog.");
    }

    const updateData = {
      _id: blogId,
      status: action === "accept" ? "published" : "rejected",
      reviewedBy: "admin-123", // TODO: Replace with actual admin id/name
      reviewedAt: new Date(),
      rejectionReason: rejectionReason,
    };

    try {
      const res = await fetch("/api/admin/blogs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      if (!res.ok) {
        throw new Error("Failed to perform action");
      }

      fetchPendingBlogs();
    } catch (err) {
      console.error(err);
      alert("Action failed. See console for details.");
    }
  };

  if (loading) {
    return <div className="p-6">Loading admin dashboard...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Blog Review Portal</h1>

      {pendingBlogs.length === 0 && <p>No blogs are pending review.</p>}

      <div className="space-y-6">
        {pendingBlogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500"
          >
            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
            <p className="text-gray-600 mb-4">
              By {blog.authorDetails?.name || "Unknown Author"}
            </p>

            <div className="flex space-x-4">
              <Link href={`/blogs/${blog._id}`}>
                <span className="text-blue-600 hover:underline cursor-pointer">View</span>
              </Link>

              <button
                onClick={() => handleAction(blog._id, "accept")}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Accept
              </button>

              <button
                onClick={() => handleAction(blog._id, "reject")}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;

