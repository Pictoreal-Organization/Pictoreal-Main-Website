'use client';

import React, { useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BlogBanner from '../../components/blogs/BlogBanner';
import BlogTitle from '../../components/blogs/BlogTitle';
import ContentEditor from '../../components/blogs/ContentEditor';
import Preview from '../preview/page';

export default function BlogEditor() {
  const router = useRouter();

  // ------------------- Auth Protection -------------------
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to signup if not logged in
      router.replace('/auth/signup');
    }
  }, [router]);

  // Optional loading state while checking token
  const token = typeof window !== 'undefined' && localStorage.getItem('token');
  if (!token) {
    return <p className="text-center mt-20">Redirecting to signup...</p>;
  }
  // -------------------------------------------------------

  const [banner, setBanner] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState([{ id: '1', type: 'text', content: '' }]);
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = () => {
    if (!title.trim()) {
      alert('Please add a title to your blog');
      return;
    }

    if (!content.some(block => block.content.trim())) {
      alert('Please add some content to your blog');
      return;
    }

    const blogData = {
      banner,
      title,
      content: JSON.stringify(content),
    };

    localStorage.setItem('draft-blog', JSON.stringify(blogData));
    router.push('../preview');
  };

  const handleSaveDraft = async () => {
    try {
      const blogData = {
        title: title || 'Untitled Draft',
        content: JSON.stringify(content),
        banner,
        description: 'Draft post',
        tags: [],
        author: 'Anonymous',
        draft: true,
      };

      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogData),
      });

      if (response.ok) {
        alert('Draft saved successfully!');
      }
    } catch (error) {
      console.error('Error saving draft:', error);
      alert('Failed to save draft');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="text-2xl font-bold"
          >
            Pictoblogs
          </button>

          <div className="flex gap-3">
            <button
              onClick={handleSaveDraft}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Save Draft
            </button>
            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {isPublishing ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </div>
      </header>

      {/* Editor */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <BlogBanner banner={banner} setBanner={setBanner} />
        <BlogTitle title={title} setTitle={setTitle} />
        <ContentEditor content={content} setContent={setContent} />
      </main>
    </div>
  );
}
