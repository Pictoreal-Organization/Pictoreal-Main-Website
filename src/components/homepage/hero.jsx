"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ArrowBtn from "./arrowbtn.jsx";
import Image from "next/image";

const Hero = () => {
  const [activeCard, setActiveCard] = useState(0);
  const router = useRouter();
  const iFrameSrc = "https://online.fliphtml5.com/vimxt/tepk/";

  const cards = [
    {
      id: 0,
      title: "Magazine V28",
      image: "/magazines/vol28.jpeg",
      path: iFrameSrc,
    },
    {
      id: 1,
      title: "Lost Threads",
      image: "/lost_threads.png",
      path: "https://anvesha.pictoreal.in",
    },
  ];

  // ✅ For swipe
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // ✅ Interval ref so we can reset
  const intervalRef = useRef(null);

  // Auto rotate with reset
  useEffect(() => {
    startAutoRotate();
    return () => stopAutoRotate();
  }, []);

  const startAutoRotate = () => {
    stopAutoRotate(); // clear if already running
    intervalRef.current = setInterval(() => {
      setActiveCard((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
    }, 4000);
  };

  const stopAutoRotate = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleSwipe = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    if (Math.abs(swipeDistance) > 50) {
      setActiveCard((prev) => {
        let nextCard;
        if (swipeDistance > 0) {
          // swipe left → next card
          nextCard = prev === cards.length - 1 ? 0 : prev + 1;
        } else {
          // swipe right → previous card
          nextCard = prev === 0 ? cards.length - 1 : prev - 1;
        }
        //  Restart timer after swipe
        stopAutoRotate();
        startAutoRotate();
        return nextCard;
      });
    }
  };

  return (
    <div className="relative w-full bg-[#D8ECEC] flex flex-col items-center justify-center min-h-[calc(100vh-5rem)]">
      {/* ------------------ DESKTOP / TABLET (≥ md) ------------------ */}
      <div className="hidden md:flex flex-col items-center justify-center w-full">
        {/* Center Text */}
        <div className="text-center max-w-full sm:max-w-[500px] md:max-w-[607px] mx-auto px-2 mt-16 md:mt-20">
          <div className="text-[3rem] sm:text-[4rem] md:text-[5rem] font-heading font-bold leading-[1.2] sm:leading-[1.1] lg:leading-[0.9] tracking-[-0.01em] text-[#083C3C]">
            Pictoreal
          </div>
        </div>

        {/* Subtitle */}
        <p className="mt-10 text-[15px] sm:text-[20px] md:text-[30px] text-[#083C3C] text-center px-4 font-heading">
          Where thoughts, colours, and words prevail!
        </p>

        {/* Cards Section */}
        <div className="flex flex-col md:block w-full items-center justify-center mt-10 gap-10">
          {/* Left Box */}
          <div className="flex flex-col items-center gap-4 md:absolute md:top-[20%] md:left-6 lg:left-16">
            <ArrowBtn text="Lost Threads" path="https://anvesha.pictoreal.in" />
            <div className="w-[180px] sm:w-[200px] md:w-[230px] aspect-[384/500] rounded-[10px] overflow-hidden shadow-lg bg-white">
              <Image
                src="/lost_threads.png"
                alt="Lost Threads"
                className="w-full h-full object-cover"
                priority={true}
                width={220}
                height={300}
              />
            </div>
          </div>

          {/* Right Box */}
          <div className="flex flex-col items-center gap-4 md:absolute md:top-[20%] md:right-6 lg:right-16">
            <div className="w-[180px] sm:w-[200px] md:w-[230px] aspect-[384/500] rounded-[10px] overflow-hidden shadow-lg bg-white">
              <Image
                src="/magazines/vol28.jpeg"
                alt="Pictoreal Magazine"
                className="w-full h-full object-cover"
                priority={true}
                width={220}
                height={300}
              />
            </div>
            <ArrowBtn text="Magazine V28" path={iFrameSrc} />
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <ArrowBtn text="PictoCreds" path="https://play.google.com/store/apps/details?id=com.pictoreal.pictocreds" />
          <ArrowBtn text="Blogs" path="/blogs" />
        </div>
      </div>

      {/* ------------------ MOBILE (< md) ------------------ */}
      <div className="md:hidden w-full max-w-sm mx-auto overflow-hidden">
        {/* Heading */}
        <div className="text-center mb-8">
          <div className="text-[3rem] sm:text-[4rem] font-heading font-bold leading-tight tracking-tight text-[#083C3C] mb-4">
            Pictoreal
            {/* <span className="text-[#083C3C]">It's Pictoreal</span> */}
          </div>
          <p className="text-[15px] sm:text-[20px] text-[#083C3C] font-heading px-4">
            Where thoughts, colours, and words prevail!
          </p>
        </div>

        {/* Cards Slider */}
        <div
          className="relative mb-1 sm:mb-1"
          onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            touchEndX.current = e.changedTouches[0].clientX;
            handleSwipe();
          }}
        >
          <div className="relative w-full h-96">
            {cards.map((card, index) => (
              <div
                key={card.id}
                className={`absolute inset-0 flex justify-center transition-all duration-700 transform-gpu ${
                  activeCard === index
                    ? "opacity-100 scale-100 z-20"
                    : "opacity-30 scale-90 z-10"
                } ${
                  activeCard === index
                    ? ""
                    : index < activeCard
                    ? "-rotate-6 -translate-x-6"
                    : "rotate-6 translate-x-6"
                }`}
              >
                <div className="relative w-full h-100 flex justify-center">
                  <div className="w-4/8 h-60 rounded-2xl overflow-hidden shadow-xl bg-white">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-20 ">
                    <ArrowBtn text={card.title} path={card.path} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Indicators */}
          <div className="flex justify-center space-x-3 absolute left-1/2 -translate-x-1/2 bottom-8">
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveCard(index);
                  stopAutoRotate();
                  startAutoRotate(); // ✅ restart timer
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeCard === index
                    ? "bg-[#083C3C] scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
