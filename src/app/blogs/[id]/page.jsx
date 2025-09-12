import dbConnect from '../../../lib/mongodb';
import Blog from '../../../models/Blog';
import mongoose from 'mongoose';

const BlogPage = async ({ params }) => {
  const { id } = params;

  console.log("Received blog ID:", id);

  await dbConnect();

  let blog = null;

  // Ensure id is a valid ObjectId
  if (mongoose.Types.ObjectId.isValid(id)) {
    blog = await Blog.findById(id).lean(); // ✅ fixed here
  } else {
    console.warn("Invalid blog ID format:", id);
  }

  if (!blog) {
    // Optional: render a friendly "Blog not found" page instead of throwing
    return <div className="p-8 text-center text-red-500 font-bold">Blog not found.</div>;
  }

  let content = [];
  try {
    content = JSON.parse(blog.content || "[]");
  } catch (err) {
    console.error("Error parsing blog content JSON:", err);
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {blog.banner && (
        <img src={blog.banner} className="w-full h-64 object-cover rounded mb-6" alt="Blog banner" />
      )}

      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-600 mb-4">By {blog.author}</p>
      <p className="text-lg mb-6">{blog.description}</p>

      <div className="prose max-w-none">
        {content.map((block, idx) => (
          <div key={idx} className="mb-4">
            {block.type === 'text' && <p>{block.content}</p>}
            {block.type === 'heading' && <h2>{block.content}</h2>}
            {block.type === 'image' && <img src={block.content} className="w-full rounded" alt={block.caption || "Blog image"} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
