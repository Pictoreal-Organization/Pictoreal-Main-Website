"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import BlogBanner from "../../components/blogs/BlogBanner";

const PublishPreview = () => {
  const router = useRouter();

  const [blogData, setBlogData] = useState(null);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [bannerUploading, setBannerUploading] = useState(false);
  const [coAuthors, setCoAuthors] = useState("");
  const [copyEditors, setCopyEditors] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
      const draftData = localStorage.getItem("draft-blog");
      if (draftData) {
        setBlogData(JSON.parse(draftData));
      } else {
        router.push("/editor");
      }
    } else {
      alert("Please log in to publish a blog.");
      router.push("/auth/login");
    }
  }, [router]);

  const handlePublish = async () => {
    if (!blogData?.title?.trim()) return alert("Please add a title for your blog");
    if (!blogData?.banner) return alert("Please add a banner image for your blog");
    if (bannerUploading) return alert("Banner is still uploading. Please wait...");
    if (!user) return alert("User not logged in. Please log in.");

    const contentArray = Array.isArray(blogData.content) ? blogData.content : JSON.parse(blogData.content || "[]");
    if (!contentArray.length) return alert("Your blog content is empty. Please add some content");
    if (!description.trim()) return alert("Please add a description for your blog");

    setIsPublishing(true);

    try {
      const publishData = {
        ...blogData,
        content: JSON.stringify(contentArray),
        description: description.trim(),
        tags: tags.split(",").map(tag => tag.trim()).filter(tag => tag),
        coAuthors: coAuthors.split(",").map(name => name.trim()).filter(name => name),
        copyEditors: copyEditors.split(",").map(name => name.trim()).filter(name => name),
        isFeaturedByPictoreal: isFeatured,
        status: "pending_review",
        authorDetails: {
          name: user.name,
          department: user.department,
          passingYear: user.passingYear,
        },
      };

      console.log("Publishing data:", publishData);

      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(publishData),
      });

      if (!response.ok) {
        let errorText;
        try {
          errorText = await response.text();
          console.error("API response error:", errorText);
        } catch (e) {
          console.error("Could not read API error text", e);
        }
        throw new Error("Failed to publish blog");
      }

      const result = await response.json();
      localStorage.removeItem("draft-blog");
      alert("Your blog has been submitted for review! You are still on the preview page.");
    } catch (err) {
      console.error(err);
      alert("Failed to submit blog for review. See console for details.");
    } finally {
      setIsPublishing(false);
    }
  };

  if (!blogData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#DDF1FF] via-[#B8E4FF] to-[#DDF1FF]">
        <div className="p-6 text-center">
          <div className="w-16 h-16 border-4 border-[#001730] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#001730] font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  const content = Array.isArray(blogData.content) ? blogData.content : JSON.parse(blogData.content || "[]");

  return (
    <>
      <Head>
        <title>Publish Preview - Pictoreal</title>
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-[#DDF1FF] via-[#B8E4FF] to-[#DDF1FF]">
        {/* Header */}
        <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-[#001730] hover:text-[#003a5f] font-medium transition-colors group"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Editor
            </button>

            <button
              onClick={handlePublish}
              disabled={isPublishing || bannerUploading}
              className="px-6 py-3 bg-gradient-to-r from-[#001730] to-[#003a5f] text-[#DDF1FF] rounded-xl font-semibold hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
            >
              {isPublishing ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Publishing...
                </>
              ) : bannerUploading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading Banner...
                </>
              ) : (
                <>
                  Publish Now
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Preview Section */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 p-8 animate-fadeIn">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-[#001730] to-[#003a5f] rounded-lg">
                  <svg className="w-5 h-5 text-[#DDF1FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-[#001730]">Preview</h2>
              </div>

              {blogData.banner && (
                <div className="md:max-w-lg w-full py-5 mx-auto mb-6">
                  <img
                    src={blogData.banner}
                    alt="Blog banner"
                    className="w-full h-auto rounded-xl object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              )}

              <h1 className="text-4xl font-bold mb-4 text-[#001730]" style={{ fontFamily: "serif" }}>
                {blogData.title}
              </h1>

              <div className="prose max-w-none">
                {content.slice(0, 3).map((block, index) => (
                  <div key={index} className="mb-4">
                    {block.type === "text" && (
                      <p className="text-gray-700 leading-relaxed">{block.content}</p>
                    )}
                    {block.type === "heading" && (
                      <h3 className="text-2xl font-bold text-[#001730]">{block.content}</h3>
                    )}
                    {block.type === "image" && block.content && (
                      <figure className="mb-6">
                        <img
                          src={block.content}
                          alt={block.caption || "Blog image"}
                          className="w-full rounded"
                        />
                        {block.caption && (
                          <figcaption className="text-sm text-gray-500 text-center mt-2">
                            {block.caption}
                          </figcaption>
                        )}
                      </figure>
                    )}
                  </div>
                ))}
                {content.length > 3 && (
                  <p className="text-gray-500 italic text-sm">... and {content.length - 3} more blocks</p>
                )}
              </div>
            </div>

            {/* Publish Settings Section */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 p-8 animate-fadeIn">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-[#001730] to-[#003a5f] rounded-lg">
                  <svg className="w-5 h-5 text-[#DDF1FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-[#001730]">Publish Settings</h2>
              </div>

              <div className="space-y-5">
                {/* Banner Upload */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-[#001730]">
                    Banner Image <span className="text-red-500">*</span>
                  </label>
                  <BlogBanner
                    banner={blogData.banner}
                    setBanner={(url) => setBlogData({ ...blogData, banner: url })}
                    setLoading={setBannerUploading}
                  />
                  {bannerUploading && (
                    <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Uploading banner, please wait...
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-[#001730]">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Write a compelling description for your blog..."
                    className="w-full h-28 p-4 border border-gray-300 rounded-xl focus:outline-none focus:border-[#001730] transition-all resize-none"
                    maxLength={200}
                  />
                  <p className="text-xs text-gray-500 mt-1">{description.length}/200 characters</p>
                </div>

                {/* Co-authors */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-[#001730]">
                    Co-authors
                  </label>
                  <input
                    type="text"
                    value={coAuthors}
                    onChange={(e) => setCoAuthors(e.target.value)}
                    placeholder="Jane Doe, John Smith"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:border-[#001730] transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate names with commas</p>
                </div>

                {/* Copy Editors */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-[#001730]">
                    Copy Editors
                  </label>
                  <input
                    type="text"
                    value={copyEditors}
                    onChange={(e) => setCopyEditors(e.target.value)}
                    placeholder="Alex Johnson, Sarah Lee"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:border-[#001730] transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate names with commas</p>
                </div>

                {/* Featured Toggle */}
                <div className="flex items-center gap-3 p-4 bg-[#DDF1FF] bg-opacity-30 rounded-xl border border-[#001730] border-opacity-20">
                  <input
                    type="checkbox"
                    id="pictoreal-toggle"
                    checked={isFeatured}
                    onChange={() => setIsFeatured(!isFeatured)}
                    className="h-5 w-5 text-[#001730] focus:ring-[#001730] border-gray-300 rounded cursor-pointer"
                  />
                  <label
                    htmlFor="pictoreal-toggle"
                    className="text-sm font-semibold text-[#001730] cursor-pointer"
                  >
                    Mark as "Featured by Team Pictoreal"
                  </label>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-[#001730]">
                    Tags
                  </label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="tech, design, writing, photography"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:border-[#001730] transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate multiple tags with commas</p>
                </div>

                {/* Publishing Info */}
                <div className="pt-5 border-t border-gray-200">
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                    <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-[#001730] mb-1">Review Process</h3>
                      <p className="text-sm text-gray-600">
                        Your blog will be submitted for review by Team Pictoreal. Once approved, it will be published and visible to all readers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </>
  );
};

export default PublishPreview;