"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const AboutUs = () => {
  const images = [
    "/Pictofam.jpg",
    "/Pictofam2.jpg",
    "/Pictofam3.jpg",
    "/Pictofam4.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handlePrev = () => {
    if (isTransitioning) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToImage = (index) => {
    if (isTransitioning) return;
    setCurrentIndex(index);
  };

  // Handle transition state
  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500); // Match the transition duration

    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <div className="bg-white w-full h-full justify-center items-center flex shadow-lg">
    <div className="p-5 max-w-7xl w-full h-full sm:p-12 ">
      <div className="flex flex-col lg:flex-row items-start lg:space-x-12">

        {/* LEFT: Carousel Section (HIDE on mobile) */}
        <div className="hidden lg:flex flex-shrink-0 w-682px h-411px mt-28 lg:w-1/2 justify-center relative h-96">
          <div className="w-full h-full relative overflow-hidden rounded-lg shadow-lg">
            {/* Carousel container with sliding effect */}
            <div
              className="flex h-full transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / images.length)}%)`,
                width: `${images.length * 100}%`,
              }}
            >
              {images.map((src, index) => (
                <div
                  key={index}
                  className="relative flex-shrink-0 h-full"
                  style={{ width: `${100 / images.length}%` }}
                >
                  <Image
                    src={src}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                    width={682}
                    height={411}
                    loading="lazy"
                  />
                  
                </div>
              ))}
            </div>

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              disabled={isTransitioning}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-75 transition disabled:opacity-50"
            >
              ‹
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={isTransitioning}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-75 transition disabled:opacity-50"
            >
              ›
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  disabled={isTransitioning}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentIndex === index ? "bg-white" : "bg-gray-400"
                  } disabled:opacity-50`}
                ></button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: About Us Content */}
        <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left relative w-full">
          <h1 className="text-5xl font-heading font-light text-gray-800 lg:absolute top-0 lg:left-1/2 lg:-translate-x-1/2 z-10 lg:w-auto text-center">
            About Us
          </h1>

          <div className="flex flex-col items-center lg:items-start space-y-8 mt-3 lg:mt-20 w-full">
            {/* Logo Section */}
            {/* Logo Section with Flip */}
            <div className="flex-shrink-0 mb-4 self-center">
              <div className="relative w-[186px] h-[186px] perspective">
                <div className={`flip-inner ${isFlipped ? "flipped" : ""} w-full h-full`}>
                  {/* Front side */}
                  <div className="flip-front absolute w-full h-full backface-hidden rounded-full overflow-hidden">
                    <Image
                      src="/icon.png"
                      alt="Volume 26 logo"
                      className="w-full h-full object-contain p-4"
                      loading="lazy"
                      width={186}
                      height={186}  
                    />
                  </div>

                  {/* Back side */}
                  <div className="flip-back absolute w-full h-full backface-hidden rounded-full overflow-hidden rotate-y-180">
                    <Image
                      src="/V27_FINAL_LOGO.png"
                      alt="Volume 27 logo"
                      className="w-full h-full object-contain p-4"
                      loading="lazy"
                      width={186}
                      height={186}
                    />
                  </div>
                </div>
              </div>

              {/* Flip Button */}
              <div className="flex justify-center mt-4">
                <button onClick={() => setIsFlipped(!isFlipped)}
                  className="transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-[#407499]/30 hover:shadow-lg bg-[#407499] hover:bg-[#0A192E]
                text-[#DCF1FF] text-sm font-semibold px-3 py-1.5 rounded-md shadow-md border
                border-[#407499]/30
                hover:border-[#DCF1FF]/30
                  backdrop-blur-sm
                  active:scale-95
                  hover:bg-opacity-80">Reveal Logo
                </button>
              </div>
            </div>

            {/* Text */}
            <p className="text-sm text-gray-700 font-body leading-relaxed max-w-md text-center lg:ml-15">
              We are Pictoreal: a community that publishes a magazine and serves
              our community. Join us to write the story and be the change on
              campus this year.
            </p>

            {/* Stats (side by side in mobile too) */}
           <div className="flex flex-row flex-wrap justify-center lg:justify-start gap-2 sm:gap-2 mt-1 w-full lg:ml-15 sm:ml-0">
            {/* Stat 1 */}
              <div className="flex flex-col items-center justify-center text-white text-center w-[90px] h-[60px] sm:w-[100px] sm:h-[65px] md:w-[137px] md:h-[76px]"
                style={{
                  backgroundColor: "#407499",
                  borderTopLeftRadius: "30px",
                  borderTopRightRadius: "50px",
                  borderBottomRightRadius: "20px",
                  borderBottomLeftRadius: "0px",
                }}>
                <span className="text-sm sm:text-base md:text-xl leading-none">35+</span>
                <span className="text-[10px] sm:text-xs mt-1">Years since inception</span>
              </div>

            {/* Stat 2 */}
              <div className="flex flex-col items-center justify-center text-black text-center w-[90px] h-[60px] sm:w-[100px] sm:h-[65px] md:w-[126px] md:h-[76px]"
                style={{
                  backgroundColor: "#A4CDE4",
                  borderTopLeftRadius: "30px",
                  borderTopRightRadius: "50px",
                  borderBottomRightRadius: "20px",
                  borderBottomLeftRadius: "10px",
                }}>
                <span className="text-sm sm:text-base md:text-xl leading-none">10+</span>
                <span className="text-[10px] sm:text-xs mt-1">Events every year</span>
              </div>

            {/* Stat 3 */}
              <div className="flex flex-col items-center justify-center text-black text-center w-[90px] h-[60px] sm:w-[100px] sm:h-[65px] md:w-[126px] md:h-[76px]"
                style={{
                  backgroundColor: "#DCF1FF",
                  borderTopLeftRadius: "30px",
                  borderTopRightRadius: "50px",
                  borderBottomRightRadius: "20px",
                  borderBottomLeftRadius: "10px",
                }}>
                <span className="text-sm sm:text-base md:text-xl leading-none">120+</span>
                <span className="text-[10px] sm:text-xs mt-1">Members</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AboutUs;
