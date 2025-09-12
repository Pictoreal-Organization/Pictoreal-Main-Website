import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs');
      const data = await response.json();
      if (data.success) {
        setBlogs(data.data);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Head>
        <title>Blogs - BlogApp</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">All Blogs</h1>
                <p className="text-gray-600 mt-1">Discover amazing stories and insights</p>
              </div>
              <div className="flex gap-3">
                <Link href="/editor" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Write a Blog
                </Link>
                <Link href="/dashboard" className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Dashboard
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-6xl mx-auto px-4 py-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-500 mt-4">Loading blogs...</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No blogs published yet</h3>
              <p className="text-gray-500 mb-6">Be the first one to share your story!</p>
              <Link href="/editor" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Write First Blog
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

const BlogCard = ({ blog }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Link href={`/blog/${blog._id}`} className="block">
      <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        {blog.banner && (
          <div className="aspect-video overflow-hidden">
            <img 
              src={blog.banner} 
              alt={blog.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        <div className="p-6">
          <div className="mb-3">
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {blog.tags.slice(0, 2).map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                    {tag}
                  </span>
                ))}
                {blog.tags.length > 2 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">
                    +{blog.tags.length - 2} more
                  </span>
                )}
              </div>
            )}
          </div>
          
          <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {blog.title}
          </h2>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {blog.description}
          </p>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <span>{formatDate(blog.publishedAt)}</span>
              <span>•</span>
              <span>{blog.activity.reads} reads</span>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                ❤️ {blog.activity.likes}
              </span>
              <span className="flex items-center gap-1">
                💬 {blog.activity.comments}
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogsPage;