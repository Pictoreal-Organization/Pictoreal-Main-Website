"use client";
import React from "react";

const ExpandedImage = ({ image, onClose }) => (
  <div className="fixed inset-0 !m-auto bg-[#A8DCEC]  flex items-center justify-center z-50 p-4 transition-opacity duration-500 ease-in-out">
    <img
      src={image}
      alt="Expanded"
      className="max-w-full max-h-full  border-2 object-contain transition-transform duration-300 ease-in-out transform"
    />
    <button
      onClick={onClose}
      className="absolute top-4 right-4 h-10 w-10 flex items-center justify-center text-white bg-red-600 p-3 rounded-full hover:bg-red-700 transition-colors duration-300"
    >
      &#10005;
    </button>
  </div>
);

export default ExpandedImage;
