// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Head from "next/head";
// import BlogBanner from "../../components/blogs/BlogBanner"; // adjust path if needed

// const PublishPreview = () => {
//   const router = useRouter();
//   const [blogData, setBlogData] = useState(null);
//   const [description, setDescription] = useState("");
//   const [tags, setTags] = useState("");
//   const [isPublishing, setIsPublishing] = useState(false);
//   const [bannerUploading, setBannerUploading] = useState(false);

//   useEffect(() => {
//     const draftData = localStorage.getItem("draft-blog");
//     if (draftData) {
//       setBlogData(JSON.parse(draftData));
//     } else {
//       router.push("/editor");
//     }
//   }, [router]);

//   const handlePublish = async () => {
//     // Pre-checks
//     if (!blogData?.title?.trim()) return alert("Please add a title for your blog");
//     if (!blogData?.banner) return alert("Please add a banner image for your blog");
//     if (bannerUploading) return alert("Banner is still uploading. Please wait...");
//     const contentArray = Array.isArray(blogData.content)
//       ? blogData.content
//       : JSON.parse(blogData.content || "[]");
//     if (!contentArray.length) return alert("Your blog content is empty. Please add some content");
//     if (!description.trim()) return alert("Please add a description for your blog");

//     setIsPublishing(true);

//     try {
//       const publishData = {
//         ...blogData,
//         content: JSON.stringify(contentArray), // <-- serialize to string for MongoDB
//         description: description.trim(),
//         tags: tags.split(",").map(tag => tag.trim()).filter(tag => tag),
//         draft: false,
//         author: "Anonymous",
//       };

//       console.log("Publishing data:", publishData);

//       const response = await fetch("/api/blogs", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(publishData),
//       });

//       if (!response.ok) {
//         let errorText;
//         try {
//           errorText = await response.text();
//           console.error("API response error:", errorText); // <-- shows why publish failed
//         } catch (e) {
//           console.error("Could not read API error text", e);
//         }
//         throw new Error("Failed to publish blog");
//       }

//       const result = await response.json();
//       localStorage.removeItem("draft-blog");
//       router.push(`/blog/${result.data._id}`);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to publish blog. See console for details.");
//     } finally {
//       setIsPublishing(false);
//     }
//   };

//   if (!blogData) return <div>Loading...</div>;

//   const content = Array.isArray(blogData.content)
//     ? blogData.content
//     : JSON.parse(blogData.content || "[]");

//   return (
//     <>
//       <Head>
//         <title>Publish Preview</title>
//       </Head>

//       <div className="min-h-screen bg-gray-50">
//         {/* Header */}
//         <header className="bg-white border-b border-gray-200">
//           <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
//             <button
//               onClick={() => router.back()}
//               className="text-gray-600 hover:text-gray-800"
//             >
//               ← Back to Editor
//             </button>

//             <button
//               onClick={handlePublish}
//               disabled={isPublishing || bannerUploading}
//               className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors disabled:opacity-50"
//             >
//               {isPublishing
//                 ? "Publishing..."
//                 : bannerUploading
//                 ? "Uploading Banner..."
//                 : "Publish Now"}
//             </button>
//           </div>
//         </header>

//         <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Preview */}
//           <div className="bg-white rounded-lg shadow-sm p-6">
//             <h2 className="text-xl font-bold mb-4">Preview</h2>

//             {blogData.banner && (
//               <img
//                 src={blogData.banner}
//                 alt="Blog banner"
//                 className="w-full h-48 object-cover rounded-lg mb-4"
//               />
//             )}

//             <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: "serif" }}>
//               {blogData.title}
//             </h1>

//             <div className="prose max-w-none">
//               {content.slice(0, 3).map((block, index) => (
//                 <div key={index} className="mb-3">
//                   {block.type === "text" && <p className="text-gray-700 leading-relaxed">{block.content}</p>}
//                   {block.type === "heading" && <h3 className="text-xl font-bold">{block.content}</h3>}
//                   {block.type === "image" && block.content && (
//                     <img src={block.content} alt={block.caption || "Blog image"} className="w-full rounded" />
//                   )}
//                 </div>
//               ))}
//               {content.length > 3 && <p className="text-gray-500 italic">... and more content</p>}
//             </div>
//           </div>

//           {/* Publish Form */}
//           <div className="bg-white rounded-lg shadow-sm p-6">
//             <h2 className="text-xl font-bold mb-4">Publish Settings</h2>

//             <div className="space-y-4">
//               {/* Banner Upload */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Banner *
//                 </label>
//                 <BlogBanner
//                   banner={blogData.banner}
//                   setBanner={(url) => setBlogData({ ...blogData, banner: url })}
//                   setLoading={setBannerUploading} // track upload state
//                 />
//                 {bannerUploading && <p className="text-sm text-gray-500 mt-1">Uploading banner, please wait...</p>}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Description *
//                 </label>
//                 <textarea
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   placeholder="Write a short description of your blog post..."
//                   className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   maxLength={200}
//                 />
//                 <p className="text-xs text-gray-500 mt-1">{description.length}/200 characters</p>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Tags
//                 </label>
//                 <input
//                   type="text"
//                   value={tags}
//                   onChange={(e) => setTags(e.target.value)}
//                   placeholder="Enter tags separated by commas (e.g., tech, programming, web)"
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Separate multiple tags with commas</p>
//               </div>

//               <div className="pt-4 border-t border-gray-200">
//                 <h3 className="font-medium text-gray-900 mb-2">Publishing Info</h3>
//                 <p className="text-sm text-gray-600">
//                   Your blog will be published immediately and will be visible to all readers.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PublishPreview;




// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Head from "next/head";
// import BlogBanner from "../../components/blogs/BlogBanner"; // adjust path if needed

// const PublishPreview = () => {
//   const router = useRouter();
//   const [blogData, setBlogData] = useState(null);
//   const [description, setDescription] = useState("");
//   const [tags, setTags] = useState("");
//   const [isPublishing, setIsPublishing] = useState(false);
//   const [bannerUploading, setBannerUploading] = useState(false);

//   // New states
//   const [coAuthors, setCoAuthors] = useState("");
//   const [copyEditors, setCopyEditors] = useState("");
//   const [isFeatured, setIsFeatured] = useState(false);

//   useEffect(() => {
//     const draftData = localStorage.getItem("draft-blog");
//     if (draftData) {
//       setBlogData(JSON.parse(draftData));
//     } else {
//       router.push("/editor");
//     }
//   }, [router]);

//   const handlePublish = async () => {
//     // Pre-checks
//     if (!blogData?.title?.trim()) return alert("Please add a title for your blog");
//     if (!blogData?.banner) return alert("Please add a banner image for your blog");
//     if (bannerUploading) return alert("Banner is still uploading. Please wait...");

//     const contentArray = Array.isArray(blogData.content)
//       ? blogData.content
//       : JSON.parse(blogData.content || "[]");
//     if (!contentArray.length) return alert("Your blog content is empty. Please add some content");
//     if (!description.trim()) return alert("Please add a description for your blog");

//     setIsPublishing(true);

//     try {
//       const publishData = {
//         ...blogData,
//         content: JSON.stringify(contentArray), // serialize to string for MongoDB
//         description: description.trim(),
//         tags: tags.split(",").map(tag => tag.trim()).filter(tag => tag),
//         coAuthors: coAuthors.split(",").map(name => name.trim()).filter(name => name),
//         copyEditors: copyEditors.split(",").map(name => name.trim()).filter(name => name),
//         isFeaturedByPictoreal: isFeatured,
//         status: "pending_review", // moderation workflow
//         author: "Anonymous", // replace with logged-in user later
//       };

//       console.log("Publishing data:", publishData);

//       const response = await fetch("/api/blogs", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(publishData),
//       });

//       if (!response.ok) {
//         let errorText;
//         try {
//           errorText = await response.text();
//           console.error("API response error:", errorText);
//         } catch (e) {
//           console.error("Could not read API error text", e);
//         }
//         throw new Error("Failed to publish blog");
//       }

//       const result = await response.json();
//       localStorage.removeItem("draft-blog");
//       alert("Your blog has been submitted for review!");
//       router.push("/"); // redirect to dashboard
//     } catch (err) {
//       console.error(err);
//       alert("Failed to submit blog for review. See console for details.");
//     } finally {
//       setIsPublishing(false);
//     }
//   };

//   if (!blogData) return <div>Loading...</div>;

//   const content = Array.isArray(blogData.content)
//     ? blogData.content
//     : JSON.parse(blogData.content || "[]");

//   return (
//     <>
//       <Head>
//         <title>Publish Preview</title>
//       </Head>

//       <div className="min-h-screen bg-gray-50">
//         {/* Header */}
//         <header className="bg-white border-b border-gray-200">
//           <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
//             <button
//               onClick={() => router.back()}
//               className="text-gray-600 hover:text-gray-800"
//             >
//               ← Back to Editor
//             </button>

//             <button
//               onClick={handlePublish}
//               disabled={isPublishing || bannerUploading}
//               className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors disabled:opacity-50"
//             >
//               {isPublishing
//                 ? "Publishing..."
//                 : bannerUploading
//                 ? "Uploading Banner..."
//                 : "Submit for Review"}
//             </button>
//           </div>
//         </header>

//         <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Preview */}
//           <div className="bg-white rounded-lg shadow-sm p-6">
//             <h2 className="text-xl font-bold mb-4">Preview</h2>

//             {blogData.banner && (
//               <img
//                 src={blogData.banner}
//                 alt="Blog banner"
//                 className="w-full h-48 object-cover rounded-lg mb-4"
//               />
//             )}

//             <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: "serif" }}>
//               {blogData.title}
//             </h1>

//             <div className="prose max-w-none">
//               {content.slice(0, 3).map((block, index) => (
//                 <div key={index} className="mb-3">
//                   {block.type === "text" && (
//                     <p className="text-gray-700 leading-relaxed">{block.content}</p>
//                   )}
//                   {block.type === "heading" && (
//                     <h3 className="text-xl font-bold">{block.content}</h3>
//                   )}
//                   {block.type === "image" && block.content && (
//                     <img
//                       src={block.content}
//                       alt={block.caption || "Blog image"}
//                       className="w-full rounded"
//                     />
//                   )}
//                 </div>
//               ))}
//               {content.length > 3 && (
//                 <p className="text-gray-500 italic">... and more content</p>
//               )}
//             </div>
//           </div>

//           {/* Publish Form */}
//           <div className="bg-white rounded-lg shadow-sm p-6">
//             <h2 className="text-xl font-bold mb-4">Publish Settings</h2>

//             <div className="space-y-4">
//               {/* Banner Upload */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Banner *
//                 </label>
//                 <BlogBanner
//                   banner={blogData.banner}
//                   setBanner={(url) => setBlogData({ ...blogData, banner: url })}
//                   setLoading={setBannerUploading}
//                 />
//                 {bannerUploading && (
//                   <p className="text-sm text-gray-500 mt-1">
//                     Uploading banner, please wait...
//                   </p>
//                 )}
//               </div>

//               {/* Description */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Description *
//                 </label>
//                 <textarea
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   placeholder="Write a short description of your blog post..."
//                   className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   maxLength={200}
//                 />
//                 <p className="text-xs text-gray-500 mt-1">
//                   {description.length}/200 characters
//                 </p>
//               </div>

//               {/* Co-authors */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Co-authors
//                 </label>
//                 <input
//                   type="text"
//                   value={coAuthors}
//                   onChange={(e) => setCoAuthors(e.target.value)}
//                   placeholder="e.g., Jane Doe, John Smith"
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">
//                   Separate names with commas
//                 </p>
//               </div>

//               {/* Copy Editors */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Copy Editors
//                 </label>
//                 <input
//                   type="text"
//                   value={copyEditors}
//                   onChange={(e) => setCopyEditors(e.target.value)}
//                   placeholder="e.g., Alex Johnson, Sarah Lee"
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">
//                   Separate names with commas
//                 </p>
//               </div>

//               {/* Featured Toggle */}
//               <div className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   id="pictoreal-toggle"
//                   checked={isFeatured}
//                   onChange={() => setIsFeatured(!isFeatured)}
//                   className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
//                 />
//                 <label
//                   htmlFor="pictoreal-toggle"
//                   className="text-sm font-medium text-gray-700"
//                 >
//                   Mark as "Featured by Team Pictoreal"
//                 </label>
//               </div>

//               {/* Tags */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Tags
//                 </label>
//                 <input
//                   type="text"
//                   value={tags}
//                   onChange={(e) => setTags(e.target.value)}
//                   placeholder="Enter tags separated by commas (e.g., tech, programming, web)"
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">
//                   Separate multiple tags with commas
//                 </p>
//               </div>

//               {/* Publishing Info */}
//               <div className="pt-4 border-t border-gray-200">
//                 <h3 className="font-medium text-gray-900 mb-2">Publishing Info</h3>
//                 <p className="text-sm text-gray-600">
//                   Your blog will be submitted for review. Once approved by Team
//                   Pictoreal, it will be published and visible to all readers.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PublishPreview;




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
  const [user, setUser] = useState(null); // New state for user details

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
      const draftData = localStorage.getItem("draft-blog");
      if (draftData) {
        setBlogData(JSON.parse(draftData));
      } else {
        // Redirect to editor if no draft exists
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
      alert("Your blog has been submitted for review!");
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Failed to submit blog for review. See console for details.");
    } finally {
      setIsPublishing(false);
    }
  };

  if (!blogData) return <div>Loading...</div>;

  const content = Array.isArray(blogData.content) ? blogData.content : JSON.parse(blogData.content || "[]");

  return (
    // ... rest of the component's return statement ...
    <>
    <Head>
      <title>Publish Preview</title>
    </Head>
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4x1 mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => router.back()} className="text-gray-600 hover:text-gray-800">
            Back to Editor
          </button>
          <button
            onClick={handlePublish}
            disabled={isPublishing || bannerUploading}
            className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            {isPublishing
              ? "Publishing..."
              : bannerUploading
              ? "Uploading Banner..."
              : "Publish Now"}
          </button>
        </div>
      </header>
      <div className="max-w-6x1 mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">Preview</h2>
          {blogData.banner && (
            <img src={blogData.banner} alt="Blog banner" className="w-full h-48 object-cover rounded-lg mb-4" />
          )}
          <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: "serif" }}>
            {blogData.title}
          </h1>
          <div className="prose max-w-none">
            {content.slice(0, 3).map((block, index) => (
              <div key={index} className="mb-3">
                {block.type === "text" && <p className="text-gray-700 leading-relaxed">{block.content}</p>}
                {block.type === "heading" && <h3 className="text-xl font-bold">{block.content}</h3>}
                {block.type === "image" && block.content && (
                  <img src={block.content} alt={block.caption || "Blog image"} className="w-full rounded" />
                )}
              </div>
            ))}
            {content.length > 3 && <p className="text-gray-500 italic">... and more content</p>}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">Publish Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Banner *</label>
              <BlogBanner
                banner={blogData.banner}
                setBanner={(url) => setBlogData({ ...blogData, banner: url })}
                setLoading={setBannerUploading}
              />
              {bannerUploading && <p className="text-sm text-gray-500 mt-1">Uploading banner, please wait...</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write a short description of your blog post..."
                className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={200}
              />
              <p className="text-xs text-gray-500 mt-1">{description.length}/200 characters</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Co-authors</label>
              <input
                type="text"
                value={coAuthors}
                onChange={(e) => setCoAuthors(e.target.value)}
                placeholder="e.g., Jane Doe, John Smith"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">Separate names with commas</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Copy Editors</label>
              <input
                type="text"
                value={copyEditors}
                onChange={(e) => setCopyEditors(e.target.value)}
                placeholder="e.g., Alex Johnson, Sarah Lee"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">Separate names with commas</p>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="pictoreal-toggle"
                checked={isFeatured}
                onChange={() => setIsFeatured(!isFeatured)}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="pictoreal-toggle" className="text-sm font-medium text-gray-700">
                Mark as "Featured by Team Pictoreal"
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Enter tags separated by commas (e.g., tech, programming, web)"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">Separate with commas</p>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <h3 className="font-medium text-gray-900 mb-2">Publishing Info</h3>
              <p className="text-sm text-gray-600">
                Your blog will be submitted for review by an admin. You will be notified when it is published.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default PublishPreview;