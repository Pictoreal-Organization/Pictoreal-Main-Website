"use client";

import React, { useState, useEffect } from 'react';

// You can place this SVG component in the same file or import it
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
  const [activePath, setActivePath] = useState('');

  useEffect(() => {
    // On component mount, set the active path from the current window location
    setActivePath(window.location.pathname);
  }, []);
  
  // Navigation items
  const navLinks = ['Home', 'Gallery', 'Blogs', 'Articles', 'OurTeam'];

  return (
    <nav className="w-full bg-transparent backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/">
              <img 
                className="h-8 w-auto" 
                src="/pictoreal.png" 
                alt="Pictoreal Logo" 
              />
            </a>
          </div>

          {/* Centered Navigation Links - Absolutely positioned to ensure perfect centering */}
          <div className="hidden md:block absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
            <div className="flex items-baseline space-x-4 p-2 bg-pastelskyblue rounded-full">
              {navLinks.map((link) => {
                const href = link === 'Home' ? '/' : `/${link.toLowerCase().replace(' ', '-')}`;
                const isActive = activePath === href;

                return (
                  <a
                    key={link}
                    href={href}
                    className={`px-6 py-2 rounded-full text-sm font-body transition-colors 
                      ${
                        isActive
                          ? 'bg-[#0B2D4F] text-white'
                          : 'text-[#0B2D4F] hover:bg-[#0B2D4F]/20'
                      }
                    `}
                  >
                    {link}
                  </a>
                );
              })}
            </div>
          </div>
          
          {/* Magazines Button */}
          <div className="hidden md:block">
            <a
              href="/magazines"
              className="group flex items-center bg-[#0B2D4F] text-white pl-6 pr-1 py-1 rounded-full text-sm font-medium hover:bg-opacity-90 transition-all duration-300"
            >
              <span className="mr-3">Magazines</span>
              <span className="bg-white rounded-full p-2 flex items-center justify-center">
                <ArrowIcon />
              </span>
            </a>
          </div>

           {/* Mobile Menu Button (optional) */}
           <div className="md:hidden flex items-center">
              <button className="inline-flex items-center justify-center p-2 rounded-md text-[#0B2D4F] hover:bg-[#D0E5F7]">
                  <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
              </button>
           </div>

        </div>
      </div>
    </nav>
  );
}

