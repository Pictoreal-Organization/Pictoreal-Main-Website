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
        <h1 className="text-[32px] sm:text-[48px] md:text-[64px] lg:text-[90px] font-heading font-normal leading-[1.2] sm:leading-[1.1] lg:leading-[0.9] tracking-[-0.01em] text-gray-900">
          Write Articles, <br /> Create Stories.
        </h1>
      </div>

      {/* Subtitle */}
      <p className="mt-4 text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] text-gray-700 text-center px-4 font-subheading">
        Get involved with Pictoreal's annual magazine and social drives.
      </p>

      {/* Cards Section */}
      <div className="flex flex-col md:block w-full items-center justify-center mt-10 gap-10">

        {/* Left Box */}
        <div className="flex flex-col items-center gap-4 md:absolute md:top-[20%] md:left-6 lg:left-16">
          <button
            onClick={() => router.push("/know-your-prahar")}
            className="flex items-center bg-[#001730] text-white pl-6 pr-2 py-1.5 rounded-full border border-black 
             transform transition duration-500 ease-in-out 
             hover:scale-110 hover:bg-[#002A50] font-body"
          >
            <span>Know Your Prahar</span>
            <span className="ml-3 w-8 h-8 flex items-center justify-center rounded-full bg-[#DDF1FF] border border-black">
              <svg
                className="w-4.5 h-4.5 text-[#00224A]"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 7L7 17M17 7h-6m6 0v6"
                />
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
            onClick={() => router.push("/magazines")}
            className="flex items-center bg-[#001730] text-white pl-6 pr-2 py-1.5 rounded-full border border-black 
             transform transition duration-500 ease-in-out 
             hover:scale-110 hover:bg-[#002A50]"
          >
            <span>Magazines</span>
            <span className="ml-3 w-8 h-8 flex items-center justify-center rounded-full bg-[#DDF1FF] border border-black">
              <svg
                className="w-4.5 h-4.5 text-[#00224A]"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 7L7 17M17 7h-6m6 0v6"
                />
              </svg>
            </span>
          </button>

        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-10">
        <button
          onClick={() => router.push("/articles")}
          className="flex items-center bg-[#001730] text-white pl-6 pr-2 py-1.5 rounded-full border border-black 
             transform transition duration-500 ease-in-out 
             hover:scale-110 hover:bg-[#002A50]"
        >
          <span>Audio Articles</span>
          <span className="ml-3 w-8 h-8 flex items-center justify-center rounded-full bg-[#DDF1FF] border border-black">
            <svg
              className="w-4.5 h-4.5 text-[#00224A]"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 7L7 17M17 7h-6m6 0v6"
              />
            </svg>
          </span>
        </button>


        <button
          onClick={() => router.push("/events")}
          className="flex items-center bg-[#001730] text-white pl-6 pr-2 py-1.5 rounded-full border border-black font-subheading
             transform transition duration-500 ease-in-out 
             hover:scale-110 hover:bg-[#002A50]"
        >
          <span>View Events</span>
          <span className="ml-3 w-8 h-8 flex items-center justify-center rounded-full bg-[#DDF1FF] border border-black">
            <svg
              className="w-4.5 h-4.5 text-[#00224A]"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 7L7 17M17 7h-6m6 0v6"
              />
            </svg>
          </span>
        </button>



      </div>
    </div >
  );
};

export default Hero;

