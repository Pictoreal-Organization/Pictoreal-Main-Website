"use client";

import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image"; 
import ArrowBtn from "./arrowbtn";

// Arrow Icon SVG Component
const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#0B2D4F"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 17L17 7"></path>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
);

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [sliderStyle, setSliderStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
    transition: "none",
  });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [prevIndex, setPrevIndex] = useState(null);
  const [bgOpaque, setBgOpaque] = useState(false);

  const navLinksRef = useRef([]);
  const pathname = usePathname();

  const navLinks = [
    { text: "Home", href: "/" },
    { text: "Events", href: "/events" },
    { text: "Blogs", href: "/blogs" },
    { text: "Articles", href: "/audio/v27" },
    { text: "OurTeam", href: "/ourteam" },
  ];

  const getActiveIndex = () => {
    return navLinks.findIndex((link) => {
      if (link.text === "Articles") {
        return pathname.startsWith("/audio");
      }
      if (link.href === "/") {
        return pathname === "/";
      }
      return pathname.startsWith(link.href);
    });
  };

  const activeIndex = getActiveIndex();

  useLayoutEffect(() => {
    const currentActiveIndex = getActiveIndex();
    if (currentActiveIndex !== -1 && navLinksRef.current[currentActiveIndex]) {
      const activeTab = navLinksRef.current[currentActiveIndex];
      setSliderStyle((prev) => ({
        ...prev,
        left: activeTab.offsetLeft,
        width: activeTab.offsetWidth,
        opacity: 1,
        transition: prevIndex !== null ? "all 300ms ease-in-out" : "none",
      }));
      setPrevIndex(currentActiveIndex);
    } else {
      setSliderStyle((prev) => ({
        ...prev,
        opacity: 0,
        transition: "all 300ms ease-in-out",
      }));
    }
  }, [pathname, prevIndex]);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    if (navLinksRef.current[index]) {
      const tab = navLinksRef.current[index];
      setSliderStyle({
        left: tab.offsetLeft,
        width: tab.offsetWidth,
        opacity: 1,
        transition: "all 300ms ease-in-out",
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    const currentActiveIndex = getActiveIndex();

    if (currentActiveIndex !== -1 && navLinksRef.current[currentActiveIndex]) {
      const activeTab = navLinksRef.current[currentActiveIndex];
      setSliderStyle({
        left: activeTab.offsetLeft,
        width: activeTab.offsetWidth,
        opacity: 1,
        transition: "all 300ms ease-in-out",
      });
    } else {
      setSliderStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  };

  // Scroll-based section detection
  useEffect(() => {
    if (pathname !== "/") {
      setBgOpaque(false);
      return;
    }

    const events = document.getElementById("events-carousel");
    const blogs = document.getElementById("recent-blogs");
    const footer = document.getElementById("footer");
    const sections = [events, blogs ,footer].filter(Boolean);

    if (sections.length === 0) return;

    const navHeight = 80; // navbar height

    const handleScroll = () => {
      const scrollY = window.scrollY + navHeight;
      let inside = false;

      sections.forEach((sec) => {
        const top = sec.offsetTop;
        const bottom = sec.offsetTop + sec.offsetHeight;
        if (scrollY >= top && scrollY < bottom) {
          inside = true;
        }
      });

      setBgOpaque(inside);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); 

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <>
      <nav
        className={`w-full fixed top-0 z-50 border-b border-gray-200/50 transition-colors duration-300 ${
          pathname === "/"
            ? bgOpaque
              ? "bg-paleskyblue shadow-md"
              : "bg-transparent backdrop-blur-md"
            : "bg-transparent backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/">
                <Image
                  className="h-8 w-auto"
                  src="/pictoreal.png"
                  alt="Pictoreal Logo"
                  width={150}
                  height={32}
                  priority={true}
                />
              </a>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex justify-center flex-grow">
              <div
                onMouseLeave={handleMouseLeave}
                className="relative flex items-center px-2 py-2 bg-pastelskyblue rounded-full"
              >
                {navLinks.map((link, index) => {
                  const isHighlighted =
                    hoveredIndex !== null
                      ? index === hoveredIndex
                      : index === activeIndex;

                  return (
                    <a
                      key={link.text}
                      href={link.href}
                      ref={(el) => (navLinksRef.current[index] = el)}
                      onMouseEnter={() => handleMouseEnter(index)}
                      className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                        isHighlighted ? "text-white" : "text-black"
                      }`}
                    >
                      {link.text}
                    </a>
                  );
                })}

                {/* Slider */}
                <div
                  className="absolute top-2 bottom-2 bg-[#111C33] rounded-full"
                  style={{ ...sliderStyle, height: "calc(100% - 1rem)" }}
                />
              </div>
            </div>

            {/* Magazines Button */}
            <div className="hidden md:block">
              <ArrowBtn text="Magazines" path="/magazines" />
            </div>

            {/* Mobile Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-[#0B2D4F] hover:bg-gray-100 focus:outline-none z-50"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed top-20 right-0 h-auto w-1/2 rounded-3xl max-w-xs bg-[#EAF7FF]   shadow-xl z-40 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="pt-4 px-4 space-y-2 sm:px-3">
          {navLinks.map((link) => {
            const isActive = activeIndex === navLinks.indexOf(link);
            return (
              <a
                key={link.text}
                href={link.href}
                className={`block w-full text-center py-3 rounded-3xl text-base font-medium transition-colors duration-300 ${
                  isActive
                    ? "bg-[#111C33] text-white"
                    : "text-black hover:bg-gray-100"
                }`}
              >
                {link.text}
              </a>
            );
          })}
          <div className="pt-2 pb-4 flex justify-center">
            <ArrowBtn text="Magazines" path="/magazines" />
          </div>
        </div>
      </div>
    </>
  );
}
