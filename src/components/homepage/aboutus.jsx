"use client"; 
import React, { useState, useEffect } from "react";

const AboutUs = () => {
  const images = [
    '/Pictofam.JPG',
    '/Pictofam2.jpg',
    '/Pictofam3.jpg',
    '/Pictofam4.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="bg-white shadow-lg p-12 max-w-7xl w-full">
      <div className="flex flex-col lg:flex-row items-start lg:space-x-12">

        {/* LEFT: Carousel Section */}
        <div className="flex-shrink-0 mt-10 lg:w-1/2 flex justify-center relative h-96">
          <div className="w-full h-full relative overflow-hidden rounded-lg shadow-lg">
            {/* Carousel images */}
            {images.map((src, index) => (
              <div
                key={index}
                className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-40"></div> {/* Optional overlay */}
              </div>
            ))}

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-75 transition"
            >
              ‹
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-75 transition"
            >
              ›
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`w-3 h-3 rounded-full ${
                    currentIndex === index ? 'bg-white' : 'bg-gray-400'
                  }`}
                ></button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: About Us Content */}
        <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left relative">
          <h1 className="text-5xl font-heading font-light text-gray-800 absolute top-0 lg:left-1/2 lg:-translate-x-1/2 z-10 lg:w-auto text-center">
            About Us
          </h1>

          <div className="flex flex-col items-center lg:items-start space-y-8 mt-20">
            {/* Logo Section */}
            <div className="flex-shrink-0 mb-4 self-center">
              <div className="relative w-40 h-40 rounded-full flex flex-col items-center justify-center overflow-hidden ml-10">
                <img
                  src="./V27_FINAL_LOGO.png"
                  alt="Pictoreal logo"
                  className="w-full h-full object-contain p-4"
                />
              </div>
            </div>

            {/* Text */}
            <p className="text-sm text-gray-700 leading-relaxed max-w-md text-center">
              We are Pictoreal: a community that publishes a magazine and serves our community.
              Join us to write the story and be the change on campus this year.
            </p>

            {/* Stats */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-8 justify-center lg:justify-start w-full">
              <div className="bg-blue-200 text-blue-800 rounded-lg px-6 py-2 text-sm font-semibold flex flex-col items-center justify-center min-w-[150px] h-16 shadow-md">
                <span className="text-xl font-bold">35+</span>
                <span className="text-xs">Years since inception</span>
              </div>
              <div className="bg-gray-300 rounded-lg w-full sm:w-28 h-16 shadow-md"></div>
              <div className="bg-gray-300 rounded-lg w-full sm:w-28 h-16 shadow-md"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
