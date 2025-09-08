"use client";
import React from "react";

const Modal = ({ isOpen, onClose, images, onImageClick }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 !m-auto  bg-[#b9dbf2] bg-opacity-90 flex items-center justify-center z-50 p-4 transition-opacity duration-500 ease-in-out">
      <div className="relative bg-[#dddddd] p-6 rounded-lg max-w-5xl w-full max-h-screen overflow-y-auto shadow-lg transition-transform duration-300 transform scale-95 hover:scale-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#141414] z-50 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors duration-300"
        >
          &#10005;
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index}`}
              className="w-full h-64 object-cover border-2 rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => onImageClick(image)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
