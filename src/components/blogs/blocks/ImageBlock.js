import React, { useState } from 'react';

const ImageBlock = ({ block, updateBlock, deleteBlock, isActive, setActive }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleFileUpload = async (file) => {
    if (file && file.type.startsWith('image/')) {
      setUploading(true);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(`Cloudinary upload failed: ${response.status}`);
        }

        const data = await response.json();
        updateBlock(block.id, { content: data.secure_url }); // save image URL
      } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleDeleteImage = () => {
    updateBlock(block.id, { content: '', caption: '' });
  };

  return (
    <div
      className={`group relative mb-6 ${
        isActive ? 'ring-2 ring-blue-500 rounded' : ''
      }`}
    >
      {block.content ? (
        <div className="space-y-2">
          <div className="relative">
            <img
              src={block.content}
              alt={block.caption || 'Blog image'}
              className="w-full h-auto rounded-lg object-contain cursor-pointer"
              onClick={setActive}
            />
            <button
              onClick={handleDeleteImage}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-80 hover:opacity-100 transition"
            >
              ✕
            </button>
          </div>
          <input
            type="text"
            placeholder="Add a caption..."
            value={block.caption || ''}
            onChange={(e) =>
              updateBlock(block.id, { caption: e.target.value })
            }
            onFocus={setActive}
            className="w-full text-center text-sm text-gray-500 border-none outline-none italic"
          />
        </div>
      ) : (
        <div
          className={`w-full h-48 border-2 border-dashed ${
            dragActive ? 'border-blue-500' : 'border-gray-300'
          } rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-colors`}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => setDragActive(true)}
          onDragLeave={() => setDragActive(false)}
          onClick={() => {
            setActive();
            document.getElementById(`image-upload-${block.id}`).click();
          }}
        >
          {uploading ? (
            <p className="text-gray-500">Uploading...</p>
          ) : (
            <div className="text-center">
              <div className="text-4xl text-gray-400 mb-2">🖼️</div>
              <p className="text-gray-500">Drop image here or click to upload</p>
            </div>
          )}
          <input
            id={`image-upload-${block.id}`}
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

export default ImageBlock;
