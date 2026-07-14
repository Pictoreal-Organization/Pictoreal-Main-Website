"use client";
import React from "react";
import Image from "next/image";


const Modal = ({ isOpen, onClose, images, onImageClick }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 !m-auto  bg-[#86C5C5] bg-opacity-90 flex items-center justify-center z-50 p-4 transition-opacity duration-500 ease-in-out">
      <div className="relative bg-[#EAF5F5] p-6 rounded-lg max-w-5xl w-full max-h-screen overflow-y-auto shadow-lg transition-transform duration-300 transform scale-95 ">
        <div className="absolut sticky top-0 right-0 flex justify-end rounded-full">
          <div
            className="bg-red-600 flex items-center justify-center h-10 w-10 p-2 absolute top-0 right-0 rounded-full hover:bg-red-700 "
            onClick={onClose}>
            <button
              onClick={onClose}
              className=" text-white z-50 m-auto transition-colors duration-300"
            >
              &#10005;
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-10 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <Image
              priority={false}
              height={700}
              width={900}
              key={index}
              src={image}
              alt={`Image ${index}`}
              className="w-full h-64 object-cover border-2 rounded-lg cursor-pointer transition-transform duration-300 hover:scale-102 hover:shadow-lg"
              onClick={() => onImageClick(image)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
