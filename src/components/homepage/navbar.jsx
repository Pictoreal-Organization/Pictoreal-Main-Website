"use client";

import React, { useState, useLayoutEffect, useRef } from "react";
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
  const [activePath, setActivePath] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [sliderStyle, setSliderStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
    transition: "none",
  });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [prevIndex, setPrevIndex] = useState(null);

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
        transition: prevIndex !== null ? "all 300ms ease-in-out" : "none",
      }));
      setPrevIndex(activeIndex);
    }
  }, [activePath]);

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
    const activeIndex = navLinks.findIndex((link) => {
      const href = link === "Home" ? "/" : `/${link.toLowerCase().replace(" ", "-")}`;
      return href === activePath;
    });

    if (activeIndex !== -1 && navLinksRef.current[activeIndex]) {
      const activeTab = navLinksRef.current[activeIndex];
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

  const activeIndex = navLinks.findIndex((link) => {
    const href = link === "Home" ? "/" : `/${link.toLowerCase().replace(" ", "-")}`;
    return href === activePath;
  });

  return (
    <>
      <nav className="w-full bg-transparent backdrop-blur-md fixed top-0 z-50 border-b border-gray-200/50">
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
            const href = link === "Home" ? "/" : `/${link.toLowerCase().replace(" ", "-")}`;
            const isActive = activePath === href;
            return (
              <a
                key={link}
                href={href}
                className={`block w-full text-center py-3 rounded-3xl text-base font-medium transition-colors duration-300 ${
                  isActive ? "bg-[#111C33] text-white" : "text-black hover:bg-gray-100"
                }`}
              >
                {link}
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
