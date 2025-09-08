// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation"; // for app directory
// // import { useRouter } from "next/router"; // if using pages directory

// const Hero = () => {
//   const [clicked, setClicked] = useState(false);
//   const router = useRouter();

//   return (
//     <div className="relative w-full min-h-screen bg-[#DDF1FF] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-16">

//       {/* Center Text */}
//       <div className="text-center max-w-full sm:max-w-[500px] md:max-w-[607px] mx-auto px-2 mt-12 md:mt-0">
//         <h1 className="text-[32px] sm:text-[48px] md:text-[64px] lg:text-[90px] font-heading font-normal leading-[1.2] sm:leading-[1.1] lg:leading-[0.9] tracking-[-0.01em] text-gray-900">
//           Write Articles, <br /> Create Stories.
//         </h1>
//       </div>

//       {/* Subtitle */}
//       <p className="mt-4 text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] text-gray-700 text-center px-4 font-subheading">
//         Get involved with Pictoreal's annual magazine and social drives.
//       </p>

//       {/* Cards Section */}
//       <div className="flex flex-col md:block w-full items-center justify-center mt-10 gap-10">

//         {/* Left Box */}
//         <div className="flex flex-col items-center gap-4 md:absolute md:top-[20%] md:left-6 lg:left-16">
//           <button
//             onClick={() => router.push("/know-your-prahar")}
//             className="flex items-center bg-[#001730] text-white pl-6 pr-2 py-1.5 rounded-full border border-black 
//              transform transition duration-500 ease-in-out 
//              hover:scale-110 hover:bg-[#002A50] font-body"
//           >
//             <span>Know Your Prahar</span>
//             <span className="ml-3 w-8 h-8 flex items-center justify-center rounded-full bg-[#DDF1FF] border border-black">
//               <svg
//                 className="w-4.5 h-4.5 text-[#00224A]"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth={2}
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M17 7L7 17M17 7h-6m6 0v6"
//                 />
//               </svg>
//             </span>
//           </button>



//           <div className="w-[180px] sm:w-[200px] md:w-[220px] rounded-[10px] overflow-hidden shadow-lg bg-white">
//             <img src="/know your prahar.png" alt="Know Your Prahar" className="w-full h-full object-cover" />
//           </div>
//         </div>

//         {/* Right Box */}
//         <div className="flex flex-col items-center gap-4 md:absolute md:top-[20%] md:right-6 lg:right-16">
//           <div className="w-[180px] sm:w-[200px] md:w-[230px] rounded-[10px] overflow-hidden shadow-lg bg-white">
//             <img src="/CoverPage.png" alt="Pictoreal Magazine" className="w-full h-full object-cover" />
//           </div>

//           <button
//             onClick={() => router.push("/magazines")}
//             className="flex items-center bg-[#001730] text-white pl-6 pr-2 py-1.5 rounded-full border border-black 
//              transform transition duration-500 ease-in-out 
//              hover:scale-110 hover:bg-[#002A50]"
//           >
//             <span>Magazines</span>
//             <span className="ml-3 w-8 h-8 flex items-center justify-center rounded-full bg-[#DDF1FF] border border-black">
//               <svg
//                 className="w-4.5 h-4.5 text-[#00224A]"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth={2}
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M17 7L7 17M17 7h-6m6 0v6"
//                 />
//               </svg>
//             </span>
//           </button>

//         </div>
//       </div>

//       {/* Bottom Buttons */}
//       <div className="flex flex-wrap justify-center gap-4 mt-10">
//         <button
//           onClick={() => router.push("/articles")}
//           className="flex items-center bg-[#001730] text-white pl-6 pr-2 py-1.5 rounded-full border border-black 
//              transform transition duration-500 ease-in-out 
//              hover:scale-110 hover:bg-[#002A50]"
//         >
//           <span>Audio Articles</span>
//           <span className="ml-3 w-8 h-8 flex items-center justify-center rounded-full bg-[#DDF1FF] border border-black">
//             <svg
//               className="w-4.5 h-4.5 text-[#00224A]"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth={2}
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M17 7L7 17M17 7h-6m6 0v6"
//               />
//             </svg>
//           </span>
//         </button>


//         <button
//           onClick={() => router.push("/events")}
//           className="flex items-center bg-[#001730] text-white pl-6 pr-2 py-1.5 rounded-full border border-black font-subheading
//              transform transition duration-500 ease-in-out 
//              hover:scale-110 hover:bg-[#002A50]"
//         >
//           <span>View Events</span>
//           <span className="ml-3 w-8 h-8 flex items-center justify-center rounded-full bg-[#DDF1FF] border border-black">
//             <svg
//               className="w-4.5 h-4.5 text-[#00224A]"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth={2}
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M17 7L7 17M17 7h-6m6 0v6"
//               />
//             </svg>
//           </span>
//         </button>



//       </div>
//     </div >
//   );
// };

// export default Hero;




"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Hero = () => {
  const [activeCard, setActiveCard] = useState(0);
  const router = useRouter();

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
      image: "/know your prahar.png",
      path: "/know-your-prahar",
    },
    {
      id: 1,
      title: "Magazines",
      image: "/CoverPage.png",
      path: "/magazines",
    },
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#DDF1FF] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-16">

      {/* ------------------ DESKTOP / TABLET (≥ md) ------------------ */}
      <div className="hidden md:flex flex-col items-center justify-center w-full">
        {/* Center Text */}
        <div className="text-center max-w-full sm:max-w-[500px] md:max-w-[607px] mx-auto px-2 mt-12 md:mt-0">
          <h1 className="text-[32px] sm:text-[48px] md:text-[64px] lg:text-[90px] font-heading font-normal leading-[1.2] sm:leading-[1.1] lg:leading-[0.9] tracking-[-0.01em] text-[#001730]">
            Write Articles, <br /> Create Stories.
          </h1>
        </div>

        {/* Subtitle */}
        <p className="mt-4 text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] text-[#001730] text-center px-4 font-subheading">
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
              <img
                src="/know your prahar.png"
                alt="Know Your Prahar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Box */}
          <div className="flex flex-col items-center gap-4 md:absolute md:top-[20%] md:right-6 lg:right-16">
            <div className="w-[180px] sm:w-[200px] md:w-[230px] rounded-[10px] overflow-hidden shadow-lg bg-white">
              <img
                src="/CoverPage.png"
                alt="Pictoreal Magazine"
                className="w-full h-full object-cover"
              />
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
      </div>

      {/* ------------------ MOBILE (< md) ------------------ */}
      <div className="md:hidden w-full max-w-sm mx-auto overflow-hidden">
        {/* Heading */}
        <div className="text-center mb-8">
          <div className="text-3xl sm:text-4xl font-heading font-bold leading-tight tracking-tight text-[#001730] mb-4">
            Write Articles,<br />
            <span className="text-[#001730]">Create Stories.</span>
          </div>
          <p className="text-sm sm:text-base text-[#001730] font-subheading px-4">
            Get involved with Pictoreal's annual magazine and social drives.
          </p>
        </div>

        {/* Cards Slider */}
        <div className="relative mb-8">
          {/* increased height from h-64 → h-96 */}
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
                onClick={() => setActiveCard(index)}
              >
                <div className="relative w-full h-100 flex justify-center">
                  {/* Card → taller (h-80 instead of h-48) */}
                  <div className="w-4/8 h-60 rounded-2xl overflow-hidden shadow-xl bg-white">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Button */}
                  {/* <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(card.path);
                    }}
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center bg-[#001730] text-white pl-6 pr-2 py-2 rounded-full border border-black shadow-md hover:scale-105 transition-transform"
                  >
                    <span className="font-medium text-sm">{card.title}</span>
                    <span className="ml-3 w-8 h-8 flex items-center justify-center rounded-full bg-[#DDF1FF] border border-black">
                      <svg
                        className="w-4 h-4 text-[#001730]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 7L7 17M17 7h-6m6 0v6"
                        />
                      </svg>
                    </span>
                  </button> */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(card.path);
                    }}
                    className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center bg-[#001730] text-white pl-4 pr-2 py-1.5 rounded-full border border-black shadow-md hover:scale-105 transition-transform"
                  >
                    <span className="font-medium text-xs">{card.title}</span>
                    <span className="ml-2 w-6 h-6 flex items-center justify-center rounded-full bg-[#DDF1FF] border border-black">
                      <svg
                        className="w-3 h-3 text-[#001730]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
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
            ))}
          </div>

          {/* Indicators */}
          <div className="flex justify-center space-x-3 absolute left-1/2 -translate-x-1/2 bottom-8">
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveCard(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeCard === index
                    ? "bg-[#001730] scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          {/* Swipe Hint
          <p className="text-center text-xs text-gray-500 mt-4 animate-pulse">
            Tap cards or dots to switch • Auto-rotates every 4s
          </p> */}
        </div>
      </div>

    </div>
  );
};

export default Hero;
