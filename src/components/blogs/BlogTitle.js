import React from 'react';
const BlogTitle = ({ title, setTitle }) => {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Enter your blog title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-4xl font-bold border-none outline-none resize-none placeholder-gray-400"
        style={{ fontFamily: 'serif' }}
      />
    </div>
  );
};

export default BlogTitle;