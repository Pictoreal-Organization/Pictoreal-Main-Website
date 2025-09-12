"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ use navigation API
import Head from "next/head";

const Dashboard = () => {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [activeTab, setActiveTab] = useState("published");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/blogs");
      const data = await response.json();
      if (data.success) {
        setBlogs(data.data);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (blogId) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      try {
        const response = await fetch(`/api/blogs/${blogId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setBlogs(blogs.filter((blog) => blog._id !== blogId));
        }
      } catch (error) {
        console.error("Error deleting blog:", error);
        alert("Failed to delete blog");
      }
    }
  };

  const publishedBlogs = blogs.filter((blog) => !blog.draft);
  const draftBlogs = blogs.filter((blog) => blog.draft);

  return (
    <>
      <Head>
        <title>Dashboard - BlogApp</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Dashboard</h1>

            <div className="flex gap-3">
              <button
                onClick={() => router.push("/")}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                View Site
              </button>
              <button
                onClick={() => router.push("/editor")}
                className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
              >
                New Post
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">
                Total Posts
              </h3>
              <p className="text-3xl font-bold text-blue-600">
                {publishedBlogs.length}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">Drafts</h3>
              <p className="text-3xl font-bold text-orange-600">
                {draftBlogs.length}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">
                Total Reads
              </h3>
              <p className="text-3xl font-bold text-green-600">
                {publishedBlogs.reduce(
                  (sum, blog) => sum + (blog.activity?.reads || 0),
                  0
                )}
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab("published")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "published"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Published ({publishedBlogs.length})
                </button>
                <button
                  onClick={() => setActiveTab("drafts")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "drafts"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Drafts ({draftBlogs.length})
                </button>
              </nav>
            </div>

            {/* Content */}
            <div className="p-6">
              {loading ? (
                <div className="text-center py-8">Loading...</div>
              ) : (
                <BlogList
                  blogs={activeTab === "published" ? publishedBlogs : draftBlogs}
                  onDelete={handleDelete}
                  isDraft={activeTab === "drafts"}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const BlogList = ({ blogs, onDelete, isDraft }) => {
  const router = useRouter();

  if (blogs.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📝</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No {isDraft ? "drafts" : "published posts"} yet
        </h3>
        <p className="text-gray-500">
          {isDraft
            ? "Your draft posts will appear here"
            : "Start writing and publish your first blog post"}
        </p>
        <button
          onClick={() => router.push("/editor")}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Write New Post
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {blogs.map((blog) => (
        <div
          key={blog._id}
          className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3
                  className="text-xl font-semibold text-gray-900 hover:text-blue-600 cursor-pointer"
                  onClick={() => router.push(`/blog/${blog._id}`)}
                >
                  {blog.title}
                </h3>
                {isDraft && (
                  <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded">
                    Draft
                  </span>
                )}
              </div>

              <p className="text-gray-600 mb-3 line-clamp-2">
                {blog.description}
              </p>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>{formatDate(blog.publishedAt)}</span>
                {!isDraft && (
                  <>
                    <span>•</span>
                    <span>{blog.activity?.reads || 0} reads</span>
                    <span>•</span>
                    <span>{blog.activity?.likes || 0} likes</span>
                    <span>•</span>
                    <span>{blog.activity?.comments || 0} comments</span>
                  </>
                )}
              </div>

              {blog.tags && blog.tags.length > 0 && (
                <div className="flex gap-2 mt-2">
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {blog.banner && (
              <img
                src={blog.banner}
                alt={blog.title}
                className="w-24 h-24 object-cover rounded-lg ml-4"
              />
            )}
          </div>

          <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-100">
            <button
              onClick={() => router.push(`/blog/${blog._id}`)}
              className="px-3 py-1 text-blue-600 hover:text-blue-800 text-sm"
            >
              View
            </button>
            <button
              onClick={() => router.push(`/editor?edit=${blog._id}`)}
              className="px-3 py-1 text-green-600 hover:text-green-800 text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(blog._id)}
              className="px-3 py-1 text-red-600 hover:text-red-800 text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default Dashboard;
