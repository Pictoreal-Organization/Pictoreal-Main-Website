import { useState } from 'react';
import React from 'react';

const BlogBanner = ({ banner, setBanner }) => {
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleFileUpload = async (file) => {
    if (file && file.type.startsWith("image/")) {
      // Show local preview immediately
      const localUrl = URL.createObjectURL(file);
      setBanner(localUrl);

      setLoading(true);

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!res.ok) {
          throw new Error(`Upload failed with status ${res.status}`);
        }

        const data = await res.json();

        if (data.secure_url) {
          setBanner(data.secure_url); // Replace local preview with Cloudinary URL
        } else {
          console.error("No secure_url returned from Cloudinary", data);
        }
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full h-64 mb-6 relative">
      {banner ? (
        <div className="relative w-full h-full">
          <img
            src={banner}
            alt="Blog banner"
            className={`w-full h-full object-contain rounded-lg ${loading ? 'opacity-50' : ''}`}
          />
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg">
              <div className="text-white text-lg">Uploading...</div>
            </div>
          )}
          <button
            onClick={() => setBanner('')}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
          >
            ✕
          </button>
        </div>
      ) : (
        <div
          className={`w-full h-full border-2 border-dashed ${dragActive ? 'border-blue-500' : 'border-gray-300'} rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-colors`}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => setDragActive(true)}
          onDragLeave={() => setDragActive(false)}
          onClick={() => document.getElementById('banner-upload').click()}
        >
          <div className="text-center">
            <div className="text-4xl text-gray-400 mb-2">📷</div>
            <p className="text-gray-500">Drop banner image here or click to upload</p>
            <p className="text-sm text-gray-400 mt-1">Recommended size: 1200x400px</p>
          </div>
          <input
            id="banner-upload"
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e.target.files[0])}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
};

export default BlogBanner;
