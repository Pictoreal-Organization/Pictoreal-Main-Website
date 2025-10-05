'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BlogBanner from '../../components/blogs/BlogBanner';
import BlogTitle from '../../components/blogs/BlogTitle';
import ContentEditor from '../../components/blogs/ContentEditor';

export default function BlogEditor() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [banner, setBanner] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState([{ id: '1', type: 'text', content: '' }]);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Auth Protection and Load User Data
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    console.log('Editor - Token:', token ? 'exists' : 'missing');
    console.log('Editor - User data:', userData);
    
    if (!token || !userData) {
      router.replace('/auth/login');
      return;
    }
    
    try {
      const parsedUser = JSON.parse(userData);
      console.log('Editor - Parsed user:', parsedUser);
      setUser(parsedUser);
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.clear();
      router.replace('/auth/login');
    }
  }, [router]);

  // Show loading while checking auth
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#DDF1FF] via-[#B8E4FF] to-[#DDF1FF]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#001730] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#001730] font-medium">Loading editor...</p>
        </div>
      </div>
    );
  }

  const handlePublish = () => {
    if (!title.trim()) {
      alert('Please add a title to your blog');
      return;
    }

    if (!content.some(block => block.content.trim())) {
      alert('Please add some content to your blog');
      return;
    }

    // Store blog data with current user info
    const blogData = {
      banner,
      title,
      content,
    };

    console.log('Storing draft with user:', user);
    localStorage.setItem('draft-blog', JSON.stringify(blogData));
    router.push('/preview');
  };

  const handleSaveDraft = async () => {
    if (!title.trim() && !content.some(block => block.content.trim())) {
      alert('Please add some content before saving');
      return;
    }

    setIsSaving(true);

    try {
      const blogData = {
        title: title || 'Untitled Draft',
        content: JSON.stringify(content),
        banner,
        description: 'Draft post',
        tags: [],
        draft: true,
        status: 'draft',
        authorDetails: {
          name: user.name,
          department: user.department || '',
          passingYear: user.passingYear || '',
        },
      };

      const token = localStorage.getItem('token');
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(blogData),
      });

      if (response.ok) {
        alert('Draft saved successfully!');
      } else if (response.status === 401) {
        alert('Session expired. Please login again.');
        localStorage.clear();
        router.push('/auth/login');
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to save draft');
      }
    } catch (error) {
      console.error('Error saving draft:', error);
      alert('Error saving draft. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout? Unsaved changes will be lost.')) {
      localStorage.clear();
      router.push('/auth/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DDF1FF] via-[#B8E4FF] to-[#DDF1FF]">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="text-2xl font-bold text-[#001730] hover:text-[#003a5f] transition-colors"
          >
            Pictoreal
          </button>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#DDF1FF] bg-opacity-50 rounded-xl">
              <svg className="w-4 h-4 text-[#001730]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-sm text-gray-600">Welcome, </span>
              <span className="text-sm font-semibold text-[#001730]">{user.name}</span>
            </div>
            
            <button
              onClick={handleSaveDraft}
              disabled={isSaving}
              className="px-5 py-2.5 text-[#001730] border border-[#001730] rounded-xl hover:bg-[#001730] hover:text-[#DDF1FF] transition-all font-medium disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save Draft'}
            </button>
            
            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className="px-6 py-2.5 bg-gradient-to-r from-[#001730] to-[#003a5f] text-[#DDF1FF] rounded-xl hover:shadow-xl transition-all duration-300 disabled:opacity-50 font-semibold flex items-center gap-2"
            >
              {isPublishing ? 'Publishing...' : 'Publish'}
              {!isPublishing && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              )}
            </button>

            <button
              onClick={handleLogout}
              className="px-5 py-2.5 text-gray-600 hover:text-red-600 transition-colors font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Editor */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 p-8">
          <BlogBanner banner={banner} setBanner={setBanner} />
          <BlogTitle title={title} setTitle={setTitle} />
          <ContentEditor content={content} setContent={setContent} />
        </div>
      </main>
    </div>
  );
}