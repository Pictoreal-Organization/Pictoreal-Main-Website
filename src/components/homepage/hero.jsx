"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ArrowBtn from "./arrowbtn.jsx";
import Image from "next/image";

const Hero = () => {
  const [activeCard, setActiveCard] = useState(0);
  const router = useRouter();
  const iFrameSrc = "https://online.fliphtml5.com/vimxt/lkrg/#p=1";

  // Auto rotate mobile cards
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev === 0 ? 1 : 0));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const cards = [
    {
      id: 0,
      title: "Know Your Prahar",
      image: "/know-your-prahar.png",
      path: "/know-your-prahar",
    },
    {
      id: 1,
      title: "Magazine V27",
      image: "/magazines/vol27.png",
      path: iFrameSrc,
    },
  ];
  return (
    <div className="relative w-full bg-[#DDF1FF] flex flex-col items-center justify-center min-h-[calc(100vh-5rem)]">


      {/* ------------------ DESKTOP / TABLET (≥ md) ------------------ */}
      <div className="hidden md:flex flex-col items-center justify-center w-full">
        {/* Center Text */}
        <div className="text-center max-w-full sm:max-w-[500px] md:max-w-[607px] mx-auto px-2 mt-16 md:mt-20">
          <h1 className="text-[40px] sm:text-[56px] md:text-[72px] lg:text-[110px] font-heading font-normal leading-[1.2] sm:leading-[1.1] lg:leading-[0.9] tracking-[-0.01em] text-[#001730]">
            Welcome to <br /> Pictoreal
          </h1>
        </div>


        {/* Subtitle */}
        <p className="mt-4 text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] text-[#001730] text-center px-4 font-subheading">
          We are the official magazine club of PICT.
        </p>

        {/* Cards Section */}
        <div className="flex flex-col md:block w-full items-center justify-center mt-10 gap-10">
          {/* Left Box */}
          <div className="flex flex-col items-center gap-4 md:absolute md:top-[20%] md:left-6 lg:left-16">

            <ArrowBtn text="Know Your Prahar" path="/know-your-prahar" />
            <div className="w-[180px] sm:w-[200px] md:w-[220px] rounded-[10px] overflow-hidden shadow-lg bg-white">
              <Image
                src="/know-your-prahar.png"
                alt="Know Your Prahar"
                className="w-full h-full object-cover"
                priority={true}
                width={220}   // add some width
                height={300}
              />
            </div>
          </div>

          {/* Right Box */}
          <div className="flex flex-col items-center gap-4 md:absolute md:top-[20%] md:right-6 lg:right-16">
            <div className="w-[180px] sm:w-[200px] md:w-[230px] rounded-[10px] overflow-hidden shadow-lg bg-white">
              <Image
                src="/magazines/vol27.png"
                alt="Pictoreal Magazine"
                className="w-full h-full object-cover"
                priority={true}
                width={220}
                height={300}
              />
            </div>
            <ArrowBtn text="Magazine V27" path={iFrameSrc} />
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <ArrowBtn text="Audio Articles" path="/articles" />
          <ArrowBtn text="Blogs" path="/blogs" />
        </div>
      </div>

      {/* ------------------ MOBILE (< md) ------------------ */}
      <div className="md:hidden w-full max-w-sm mx-auto overflow-hidden">
        {/* Heading */}
        <div className="text-center mb-8">
          <div className="text-3xl sm:text-4xl font-heading font-bold leading-tight tracking-tight text-[#001730] mb-4">
            Welcome to <br />
            <span className="text-[#001730]">Pictoreal</span>
          </div>
          <p className="text-sm sm:text-base text-[#001730] font-subheading px-4">
            We are the official magazine club of PICT.
          </p>
        </div>

        {/* Cards Slider */}
        <div className="relative mb-1 sm:mb-1">

          {/* increased height from h-64 → h-96 */}
          <div className="relative w-full h-96">
            {cards.map((card, index) => (
              <div
                key={card.id}
                className={`absolute inset-0 flex justify-center transition-all duration-700 transform-gpu ${activeCard === index
                  ? "opacity-100 scale-100 z-20"
                  : "opacity-30 scale-90 z-10"
                  } ${activeCard === index
                    ? ""
                    : index < activeCard
                      ? "-rotate-6 -translate-x-6"
                      : "rotate-6 translate-x-6"
                  }`}
                onClick={() => setActiveCard(index)}
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
                onClick={() => setActiveCard(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${activeCard === index
                  ? "bg-[#001730] scale-125"
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

