"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // for app directory
// import { useRouter } from "next/router"; // if using pages directory

const Hero = () => {
  const [clicked, setClicked] = useState(false);
  const router = useRouter();

  return (
    <div className="relative w-full min-h-screen bg-[#DDF1FF] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-16">

      {/* Center Text */}
      <div className="text-center max-w-full sm:max-w-[500px] md:max-w-[607px] mx-auto px-2 mt-12 md:mt-0">
        <h1 className="text-[32px] sm:text-[48px] md:text-[64px] lg:text-[90px] font-lora font-normal leading-[1.2] sm:leading-[1.1] lg:leading-[0.9] tracking-[-0.01em] text-gray-900">
          Write Articles, <br /> Create Stories.
        </h1>
      </div>

      {/* Subtitle */}
      <p className="mt-4 text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] text-gray-700 text-center px-4">
        Get involved with Pictoreal's annual magazine and social drives.
      </p>

      {/* Cards Section */}
      <div className="flex flex-col md:block w-full items-center justify-center mt-10 gap-10">

        {/* Left Box */}
        <div className="flex flex-col items-center gap-4 md:absolute md:top-[20%] md:left-6 lg:left-16">
          <button
            onClick={() => router.push("/know-your-prahar")} // navigate to route
            className="flex items-center gap-3 bg-[#DDF1FF] text-black px-6 py-2 rounded-full border border-black transition hover:bg-[#001730] hover:text-white"
          >
            <span>Know Your Prahar</span>
            <span className="w-7 h-7 flex items-center justify-center rounded-full bg-[#DDF1FF] border border-black">
              <svg className="w-4 h-4 text-[#00224A]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 7L7 17M17 7h-6m6 0v6" />
              </svg>
            </span>
          </button>

          <div className="w-[180px] sm:w-[200px] md:w-[220px] rounded-[10px] overflow-hidden shadow-lg bg-white">
            <img src="/know your prahar.png" alt="Know Your Prahar" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Right Box */}
        <div className="flex flex-col items-center gap-4 md:absolute md:top-[20%] md:right-6 lg:right-16">
          <div className="w-[180px] sm:w-[200px] md:w-[230px] rounded-[10px] overflow-hidden shadow-lg bg-white">
            <img src="/CoverPage.png" alt="Pictoreal Magazine" className="w-full h-full object-cover" />
          </div>

          <button
            onClick={() => router.push("/magazines")} // navigate to route
            className="flex items-center gap-3 bg-[#DDF1FF] text-black px-6 py-2 rounded-full border border-black transition hover:bg-[#001730] hover:text-white"
          >
            <span>Magazines</span>
            <span className="w-7 h-7 flex items-center justify-center rounded-full bg-[#DDF1FF] border border-black">
              <svg className="w-4 h-4 text-[#00224A]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 7L7 17M17 7h-6m6 0v6" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-10">
        <button
          onClick={() => router.push("/articles")} // navigate to route
          className="flex items-center gap-3 bg-[#DDF1FF] text-black px-6 py-2 rounded-full border border-black transition hover:bg-[#001730] hover:text-white"
        >
          <span>Audio Articles</span>
          <span className="w-7 h-7 flex items-center justify-center rounded-full bg-[#DDF1FF] border border-black">
            <svg className="w-4 h-4 text-[#00224A]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 7L7 17M17 7h-6m6 0v6" />
            </svg>
          </span>
        </button>

        <button
          onClick={() => router.push("/events")} // navigate to route
          className="flex items-center gap-3 bg-[#DDF1FF] text-black px-6 py-2 rounded-full border border-black transition hover:bg-[#001730] hover:text-white"
        >
          <span>View Events</span>
          <span className="w-7 h-7 flex items-center justify-center rounded-full bg-[#DDF1FF] border border-black">
            <svg className="w-4 h-4 text-[#00224A]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 7L7 17M17 7h-6m6 0v6" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Hero;

