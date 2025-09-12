"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const Carousel = ({ images, onImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const timerRef = useRef(null);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
  };

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [images.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    resetTimer();
  };
  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
    resetTimer();
  };

  return (
    <div
      className="relative lg:max-w-full max-w-[85%] mx-auto my-2 lg:my-8 z-5"
      ref={containerRef}
    >
      <div className="relative w-full h-auto flex overflow-hidden items-center py-2 sm:py-10 justify-center bg-white-200 rounded-lg">
        <div
          className="flex transition-transform  duration-1000 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            width: `${images.length * 100}%`,
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 h-80 flex items-center justify-center w-full"
            >
              <Image
                priority={false}
                height={500}
                width={900}
                ref={index === 0 ? imageRef : null}
                src={image}
                alt={`Slide ${index}`}
                className="max-h-full object-contain border-2 cursor-pointer rounded-lg transition-transform duration-500 hover:scale-105"
                onClick={() => onImageClick(images)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Prev Button */}
      {/* <button
        onClick={prevSlide}
        className="md:block absolute top-1/2 -left-9 transform -translate-y-1/2 bg-firefly text-white bg-deepnavy p-3 rounded-full hover:bg-[#00426b] transition-colors duration-300 z-10"
      >
        &#10094;
      </button> */}
      {/* Next Button */}
      {/* <button
        onClick={nextSlide}
        className="md:block absolute top-1/2 -right-9 transform -translate-y-1/2 bg-firefly text-white bg-deepnavy p-3 rounded-full hover:bg-[#00426b] transition-colors duration-300 z-10"
      >
        &#10095;
      </button> */}

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              resetTimer();
            }}
            className={`h-3 w-3 rounded-full cursor-pointer transition-all ${currentIndex === index
                ? "bg-deepnavy scale-125"
                : "bg-gray-400 hover:bg-gray-600"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
