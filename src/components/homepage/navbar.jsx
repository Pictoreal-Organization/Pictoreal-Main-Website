"use client";

import React, { useState, useLayoutEffect, useRef, useEffect } from "react";

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

  // Effect for setting active path and desktop slider position
  useLayoutEffect(() => {
    // Check if window is defined (for server-side rendering safety)
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      setActivePath(currentPath);

      const activeIndex = navLinks.findIndex((link) => {
        const href =
          link === "Home" ? "/" : `/${link.toLowerCase().replace(" ", "-")}`;
        return href === currentPath;
      });

      if (activeIndex !== -1 && navLinksRef.current[activeIndex]) {
        const activeTab = navLinksRef.current[activeIndex];
        setSliderStyle((prev) => ({
          ...prev,
          left: activeTab.offsetLeft,
          width: activeTab.offsetWidth,
          opacity: 1,
          transition:
            prevIndex !== null ? "all 300ms ease-in-out" : "none", // no animation on first load
        }));
        setPrevIndex(activeIndex);
      }
    }
  }, [activePath, prevIndex]);

  // Effect to disable body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // Cleanup function to reset scroll on component unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);


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
      const href =
        link === "Home" ? "/" : `/${link.toLowerCase().replace(" ", "-")}`;
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
      // If no active link, hide the slider
      setSliderStyle((prev) => ({ ...prev, opacity: 0, width: 0 }));
    }
  };

  const activeIndex = navLinks.findIndex((link) => {
    const href =
      link === "Home" ? "/" : `/${link.toLowerCase().replace(" ", "-")}`;
    return href === activePath;
  });

  return (
    <>
      <nav className="w-full bg-transparent backdrop-blur-md sticky top-0 z-50 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/">
                <img
                  className="h-8 w-auto"
                  src="https://placehold.co/150x40/ffffff/111C33?text=Pictoreal"
                  alt="Pictoreal Logo"
                />
              </a>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex justify-center flex-grow">
              <div
                onMouseLeave={handleMouseLeave}
                className="relative flex items-center space-x-4 p-2 bg-gray-100/80 rounded-full"
              >
                {navLinks.map((link, index) => {
                  const href =
                    link === "Home"
                      ? "/"
                      : `/${link.toLowerCase().replace(" ", "-")}`;
                  const isHighlighted =
                    hoveredIndex !== null
                      ? index === hoveredIndex
                      : index === activeIndex;

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
                <span className="bg-white/20 rounded-full p-2 flex items-center justify-center">
                  <ArrowIcon />
                </span>
              </a>
            </div>

            {/* Mobile Menu Button */}
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

      {/* --- Mobile Menu & Overlay --- */}

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      {/* Menu Content */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed top-0 left-0 h-full w-1/2 max-w-xs bg-white shadow-xl z-40 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="pt-24 px-2 space-y-2 sm:px-3">
          {navLinks.map((link) => {
            const href =
              link === "Home"
                ? "/"
                : `/${link.toLowerCase().replace(" ", "-")}`;
            const isActive = activePath === href;
            return (
              <a
                key={link}
                href={href}
                className={`block w-full text-center px-3 py-3 rounded-md text-base font-medium transition-colors duration-300 ${
                  isActive
                    ? "bg-[#111C33] text-white"
                    : "text-black hover:bg-gray-100"
                }`}
              >
                {link}
              </a>
            );
          })}
          <div className="pt-6 pb-2 flex justify-center">
            <a
              href="/magazines"
              className="group flex items-center bg-[#111C33] text-white pl-6 pr-1 py-1 rounded-full text-sm font-medium hover:bg-opacity-90 transition-all duration-300"
            >
              <span className="mr-3">Magazines</span>
              <span className="bg-white/20 rounded-full p-2 flex items-center justify-center">
                <ArrowIcon />
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
