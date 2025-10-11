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
    const userStr = localStorage.getItem("user");
    const role = localStorage.getItem("role");

    if (!token || (!userStr && !role)) {
      router.push("/auth/login");
      return;
    }

    // Check if user is admin
    let isAdmin = false;
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        isAdmin = user.role === "admin";
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }
    
    if (role) {
      isAdmin = role === "admin";
    }

    if (!isAdmin) {
      router.push("/auth/login");
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    router.push("/auth/login");
  };

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
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#DDF1FF] via-[#B8E4FF] to-[#DDF1FF] flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-[#001730] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-[#003a5f] rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <h2 className="text-2xl font-bold text-[#001730] mb-2">Loading Admin Dashboard</h2>
          <p className="text-gray-600">Please wait while we fetch your data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header with Logout Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Blog Review Portal</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>

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

