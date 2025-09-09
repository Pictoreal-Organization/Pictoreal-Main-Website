"use client";

import React, { useState, useLayoutEffect, useRef } from "react";

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

// Main Navbar Component
export default function Navbar() {
  const [activePath, setActivePath] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [sliderStyle, setSliderStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
    transition: "none",
  });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [prevIndex, setPrevIndex] = useState(null); // <-- keep track of previous active tab
  const navLinksRef = useRef([]);

  const navLinks = ["Home", "Gallery", "Blogs", "Articles", "OurTeam"];

  useLayoutEffect(() => {
    const currentPath = window.location.pathname;
    setActivePath(currentPath);

    const activeIndex = navLinks.findIndex((link) => {
      const href = link === "Home" ? "/" : `/${link.toLowerCase().replace(" ", "-")}`;
      return href === currentPath;
    });

    if (activeIndex !== -1 && navLinksRef.current[activeIndex]) {
      const activeTab = navLinksRef.current[activeIndex];
      setSliderStyle((prev) => ({
        ...prev,
        left: activeTab.offsetLeft,
        width: activeTab.offsetWidth,
        opacity: 1,
        transition: prevIndex !== null ? "all 300ms ease-in-out" : "none", // no animation on first load
      }));
      setPrevIndex(activeIndex);
    }
  }, [activePath]);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    if (navLinksRef.current[index]) {
      const tab = navLinksRef.current[index];
      setSliderStyle((prev) => ({
        ...prev,
        left: tab.offsetLeft,
        width: tab.offsetWidth,
        opacity: 1,
        transition: "all 300ms ease-in-out",
      }));
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    const activeIndex = navLinks.findIndex((link) => {
      const href = link === "Home" ? "/" : `/${link.toLowerCase().replace(" ", "-")}`;
      return href === activePath;
    });

    if (activeIndex !== -1 && navLinksRef.current[activeIndex]) {
      const activeTab = navLinksRef.current[activeIndex];
      setSliderStyle((prev) => ({
        ...prev,
        left: activeTab.offsetLeft,
        width: activeTab.offsetWidth,
        opacity: 1,
        transition: "all 300ms ease-in-out",
      }));
    } else {
      setSliderStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  };

  const activeIndex = navLinks.findIndex((link) => {
    const href = link === "Home" ? "/" : `/${link.toLowerCase().replace(" ", "-")}`;
    return href === activePath;
  });

  return (
    <nav className="w-full bg-transparent backdrop-blur-md sticky top-0 z-50 border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/">
              <img className="h-8 w-auto" src="/pictoreal.png" alt="Pictoreal Logo" />
            </a>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex justify-center flex-grow">
            <div
              onMouseLeave={handleMouseLeave}
              className="relative flex items-center space-x-4 p-2 bg-pastelskyblue rounded-full"
            >
              {navLinks.map((link, index) => {
                const href = link === "Home" ? "/" : `/${link.toLowerCase().replace(" ", "-")}`;
                const isHighlighted =
                  hoveredIndex !== null ? index === hoveredIndex : index === activeIndex;

                return (
                  <a
                    key={link}
                    href={href}
                    ref={(el) => (navLinksRef.current[index] = el)}
                    onMouseEnter={() => handleMouseEnter(index)}
                    className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                      isHighlighted ? "text-white" : "text-black"
                    }`}
                  >
                    {link}
                  </a>
                );
              })}
              <div
                className="absolute top-2 bottom-2 bg-[#111C33] rounded-full"
                style={{ ...sliderStyle, height: "calc(100% - 1rem)" }}
              />
            </div>
          </div>

          {/* Magazines Button */}
          <div className="hidden md:block">
            <a
              href="/magazines"
              className="group flex items-center bg-[#111C33] text-white pl-6 pr-1 py-1 rounded-full text-sm font-medium hover:bg-opacity-90 transition-all duration-300"
            >
              <span className="mr-3">Magazines</span>
              <span className="bg-paleskyblue rounded-full p-2 flex items-center justify-center">
                <ArrowIcon />
              </span>
            </a>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#0B2D4F] hover:bg-[#D0E5F7] focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
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
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isMobileMenuOpen ? "block" : "hidden"} md:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white mobile-menu-bottom{bg-transparent}">
          {navLinks.map((link) => {
            const href = link === "Home" ? "/" : `/${link.toLowerCase().replace(" ", "-")}`;
            const isActive = activePath === href;
            return (
              <a
                key={link}
                href={href}
                className={`block w-full text-center px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                  isActive ? "bg-[#111C33] text-white" : "text-black"
                }`}
              >
                {link}
              </a>
            );
          })}
          <div className="pt-4 pb-2 flex justify-center">
            <a
              href="/magazines"
              className="group flex items-center bg-[#111C33] text-white pl-6 pr-1 py-1 rounded-full text-sm font-medium hover:bg-opacity-90 transition-all duration-300"
            >
              <span className="mr-3">Magazines</span>
              <span className="bg-paleskyblue rounded-full p-2 flex items-center justify-center">
                <ArrowIcon />
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
