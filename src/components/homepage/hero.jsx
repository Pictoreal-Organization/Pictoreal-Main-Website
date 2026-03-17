"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ArrowBtn from "./arrowbtn.jsx";
import Image from "next/image";

const Hero = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [animateFeatured, setAnimateFeatured] = useState(false);
  const router = useRouter();

  // 🎯 EASY CONFIGURATION
  const SHOW_FEATURED = false;

  // 🎨 CHOOSE YOUR ANIMATION STYLE (1, 2, or 3)
  const ANIMATION_STYLE = 2;
  // Style 1: Slide Up from Bottom (classic reveal)
  // Style 2: Scale + Fade In (zoom entrance)
  // Style 3: Flip + Slide (dramatic 3D flip)

  const featuredBanner = {
    title: "Blood Donation Drive",
    image: "/current_banner_horiz.png",
    path: "https://bdd.pictoreal.in/",
  };

  // Trigger animation after 300ms
  useEffect(() => {
    if (SHOW_FEATURED) {
      const timer = setTimeout(() => setAnimateFeatured(true), 300);
      return () => clearTimeout(timer);
    }
  }, [SHOW_FEATURED]);

  // ---------------- MOBILE CARDS ----------------
  const cards = [
    // {
    //   id: 0,
    //   title: featuredBanner.title,
    //   image: "/current_banner_vert.png",
    //   path: featuredBanner.path,
    // },
    {
      id: 1,
      title: "Magazine V27",
      image: "/magazines/vol27.png",
      path: "https://online.fliphtml5.com/vimxt/lkrg/#p=1",
    },
    {
      id: 2,
      title: "Know Your Prahar",
      image: "/know-your-prahar.png",
      path: "/know-your-prahar",
    },
  ];

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    startAutoRotate();
    return () => stopAutoRotate();
  }, []);

  const startAutoRotate = () => {
    stopAutoRotate();
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
          nextCard = prev === cards.length - 1 ? 0 : prev + 1;
        } else {
          nextCard = prev === 0 ? cards.length - 1 : prev - 1;
        }
        stopAutoRotate();
        startAutoRotate();
        return nextCard;
      });
    }
  };

  // Animation class generators
  const getHeadingAnimation = () => {
    if (!SHOW_FEATURED) return "";
    return animateFeatured
      ? "-translate-y-12 opacity-100"
      : "translate-y-30 opacity-100";
  };

  const getBannerAnimation = () => {
    if (!animateFeatured) {
      // Initial hidden state for all styles
      switch (ANIMATION_STYLE) {
        case 1:
          return "opacity-0 translate-y-32"; // Slide up
        case 2:
          return "opacity-0 scale-50"; // Scale zoom
        case 3:
          return "opacity-0 translate-y-20 rotateX-90"; // Flip
        default:
          return "opacity-0 translate-y-32";
      }
    }
    // Animated visible state
    return "opacity-100 translate-y-0 scale-100 rotateX-0";
  };

  return (
    <div className="relative w-full bg-[#DDF1FF] flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] overflow-hidden">
      {/* ------------------ DESKTOP / TABLET ------------------ */}
      <div className="hidden md:flex flex-col items-center justify-center w-full px-6 lg:px-12 py-8">
        {/* Heading - Only this moves up */}
        {SHOW_FEATURED && (
          <div
            className={`text-center transition-all duration-1000 ease-out ${getHeadingAnimation()}`}
          >
            <div className="text-[4rem] lg:text-[5rem] font-heading font-bold leading-tight tracking-tight text-[#001730]">
              Pictoreal
            </div>
            <p className="mt-2 text-[20px] lg:text-[26px] text-[#001730] font-heading">
              Where thoughts, colours, and words prevail!
            </p>
          </div>
        )}

        {/* ------------------ MAIN CONTENT ------------------ */}
        <div
          className="w-full max-w-7xl mx-auto mt-8 relative"
          style={{ perspective: "1200px" }}
        >
          {SHOW_FEATURED ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* LEFT COLUMN - Static, no animation */}
              <div className="flex flex-col items-center gap-4 mt-[-100px] ml-[-200px]">
                <ArrowBtn text="Know Your Prahar" path="/know-your-prahar" />
                <div className="w-full max-w-[230px] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <Image
                    src="/know-your-prahar.png"
                    alt="Know Your Prahar"
                    width={280}
                    height={380}
                    className="w-full h-auto"
                  />
                </div>
              </div>

              {/* CENTER COLUMN - Featured Banner with Animation */}
              <div
                className={`flex flex-col items-center gap-4 transition-all duration-1200 ease-out ${getBannerAnimation()}`}
                style={{
                  transitionDelay: "400ms",
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="px-4 py-1.5 bg-red-500 text-white text-sm font-bold rounded-full animate-pulse shadow-lg mb-10">
                  🔴 LIVE NOW
                </div>

                <div
                  className="w-full cursor-pointer group mb-5"
                  onClick={() => router.push(featuredBanner.path)}
                >
                  <div className="relative rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 max-w-[650px] scale-130 mb-7">
                    <div className="relative rounded-2xl">
                      <Image
                        src={featuredBanner.image}
                        alt={featuredBanner.title}
                        width={500}
                        height={281}
                        className="w-full h-auto"
                      />

                      <div className="absolute inset-0 bg-gray-950/0 group-hover:bg-gray-950/20 transition-all duration-300 flex items-center justify-center">
                        <span className="px-6 py-2 bg-white text-[#001730] font-bold rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300">
                          View Details →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <ArrowBtn
                  text={featuredBanner.title}
                  path={featuredBanner.path}
                />
              </div>

              {/* Yeh use karenge jab horizontal poster nahi milega*/}
              {/* CENTER COLUMN - Featured Banner with Animation */}
              {/* 
              <div className="flex-1 flex items-center justify-center px-8">
                <div
                  className={`flex flex-col items-center gap-4 transition-all duration-1200 ease-out ${getBannerAnimation()}`}
                  style={{
                    transitionDelay: "400ms",
                    transformStyle: "preserve-3d"
                  }}
                >
                  <div className="px-4 py-1.5 bg-red-500 text-white text-sm font-bold rounded-full animate-pulse shadow-lg mb-6">
                    🔴 LIVE NOW
                  </div>

                  <div 
                    className="w-full cursor-pointer group mb-5"
                    onClick={() => router.push(featuredBanner.path)}
                  >
                    <div className="relative rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 max-w-[400px] mx-auto">
                      <div className="absolute rounded-xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                      
                      <div className="relative bg-white rounded-2xl overflow-hidden">
                        <Image
                          src={featuredBanner.image}
                          alt={featuredBanner.title}
                          width={100}
                          height={300}
                          className="w-full h-auto object-contain"
                          priority
                        />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-8">
                          <span className="text-white font-bold text-lg">
                            View Details →
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <ArrowBtn text={featuredBanner.title} path={featuredBanner.path} />
                </div>
              </div> */}

              {/* RIGHT COLUMN - Static, no animation */}
              <div className="flex flex-col items-center gap-4 mt-[-100px] mr-[-200px]">
                <div className="w-full max-w-[230px] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <Image
                    src="/magazines/vol27.png"
                    alt="Magazine V27"
                    width={280}
                    height={380}
                    className="w-full h-auto"
                  />
                </div>
                <ArrowBtn
                  text="Magazine V27"
                  path="https://online.fliphtml5.com/vimxt/lkrg/#p=1"
                />
              </div>
            </div>
          ) : (
            /* Layout WITHOUT Featured Banner */
            <div className="flex justify-center items-center gap-24 lg:gap-32 mt-10">
              <div className="flex flex-col items-center gap-4">
                <ArrowBtn text="Know Your Prahar" path="/know-your-prahar" />
                <div className="w-[260px] lg:w-[240px] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <Image
                    src="/know-your-prahar.png"
                    alt="Know Your Prahar"
                    width={320}
                    height={440}
                    className="w-full h-auto"
                  />
                </div>
              </div>

              <div className="text-center mb-3">
                <div className="text-[4rem] lg:text-[5rem] font-heading font-bold leading-tight tracking-tight text-[#001730]">
                  Pictoreal
                </div>
                <p className="mt-2 text-[20px] lg:text-[26px] text-[#001730] font-heading">
                  Where thoughts, colours, and words prevail!
                </p>
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="w-[260px] lg:w-[240px] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <Image
                    src="/magazines/vol27.png"
                    alt="Magazine V27"
                    width={320}
                    height={440}
                    className="w-full h-auto"
                  />
                </div>
                <ArrowBtn
                  text="Magazine V27"
                  path="https://online.fliphtml5.com/vimxt/lkrg/#p=1"
                />
              </div>
            </div>
          )}
        </div>

        {/* Bottom Buttons */}
        {!SHOW_FEATURED && (
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            <ArrowBtn text="Audio Articles" path="/audio/v27" />
            <ArrowBtn text="Blogs" path="/blogs" />
          </div>
        )}
      </div>

      {/* ------------------ MOBILE ------------------ */}
      <div className="md:hidden w-full max-w-sm mx-auto overflow-hidden">
        <div className="text-center mb-8 mt-10">
          <div className="text-[3rem] font-heading font-bold leading-tight text-[#001730] mb-4">
            Pictoreal
          </div>
          <p className="text-[16px] text-[#001730] font-heading px-4">
            Where thoughts, colours, and words prevail!
          </p>
        </div>

        <div
          className="relative mb-1"
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
                  <div className="absolute bottom-20">
                    <ArrowBtn text={card.title} path={card.path} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-3 absolute left-1/2 -translate-x-1/2 bottom-8">
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveCard(index);
                  stopAutoRotate();
                  startAutoRotate();
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeCard === index
                    ? "bg-[#001730] scale-125"
                    : "bg-gray-300"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .rotateX-90 {
          transform: rotateX(90deg);
        }
        .rotateX-0 {
          transform: rotateX(0deg);
        }
      `}</style>
    </div>
  );
};

export default Hero;
