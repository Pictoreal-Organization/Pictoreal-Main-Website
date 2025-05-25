"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navbarRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setOpen(false);
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLinkClick = () => {
    setOpen(false);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <header className="border-b border-[#d2b49a] bg-white sticky top-0 z-50">
     <div className="flex justify-between items-center min-h-[64px] xl:max-w-7xl xl:mx-auto w-full px-4 md:px-6 lg:px-8 py-2">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/homepage/Prahar_Logo.png"
            alt="logo"
            width={110}
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        {/* Hamburger Icon */}
        <FiMenu
          className="lg:hidden block h-6 w-6 cursor-pointer"
          onClick={() => setOpen(!open)}
        />

        {/* Navigation */}
        <nav
          ref={navbarRef}
          className={`${open ? "block" : "hidden"
            } lg:flex lg:items-center lg:w-auto w-full transition-all duration-300 ease-in-out`}
        >
          <ul className="text-base text-firefly lg:flex lg:items-center lg:gap-2">
            <li className="px-4 py-2 hover:text-[#76879E] font-semibold">
              <Link href="/" onClick={handleLinkClick}>Home</Link>
            </li>
            <li className="px-4 py-2 hover:text-[#76879E] font-semibold">
              <Link href="/#events" onClick={handleLinkClick}>Events</Link>
            </li>
            <li className="px-4 py-2 hover:text-[#76879E] font-semibold">
              <Link href="/gallery" onClick={handleLinkClick}>Gallery</Link>
            </li>
            <li className="px-4 py-2 hover:text-[#76879E] font-semibold">
              <Link href="/blogs" onClick={handleLinkClick}>Blogs</Link>
            </li>
            <li className="px-4 py-2 hover:text-[#76879E] font-semibold">
              <Link href="/audio/V27/eng" onClick={handleLinkClick}>Articles</Link>
            </li>
            <li className="px-4 py-2 hover:text-[#76879E] font-semibold">
              <Link href="/ourteam" onClick={handleLinkClick}>Our Team</Link>
            </li>

            {/* Magazines Dropdown */}
            <li
              className="relative px-4 py-2 hover:text-[#76879E] font-semibold"
              onMouseEnter={() => window.innerWidth >= 1024 && setDropdownOpen(true)}
              onMouseLeave={() => window.innerWidth >= 1024 && setDropdownOpen(false)}
            >
              <span
                className="flex items-center cursor-pointer"
                onClick={() => window.innerWidth < 1024 && toggleDropdown()}
              >
                <Link href="/magazines" onClick={handleLinkClick}>Magazines</Link>
                <span className="ml-1">
                  <IoMdArrowDropdown />
                </span>
              </span>

              <ul
                ref={dropdownRef}
                className={`absolute left-0 mt-2 w-32 bg-mist rounded-lg shadow-lg z-10 transform transition-all duration-500 ease-in-out ${dropdownOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 translate-y-2 pointer-events-none"
                  }`}
              >
                <li className="py-2 px-4 hover:text-[#76879E]">
                  <Link href="https://online.fliphtml5.com/ukioy/fyba/" onClick={handleLinkClick}>Volume 27</Link>
                </li>
                <li className="py-2 px-4 hover:text-[#76879E]">
                  <Link href="https://www.yumpu.com/xx/embed/view/hQFX2kOYlHIs8xA9" onClick={handleLinkClick}>Volume 26</Link>
                </li>
                <li className="py-2 px-4 hover:text-[#76879E]">
                  <Link href="https://www.yumpu.com/en/embed/view/s9BzGkJ7FHwVhtYP" onClick={handleLinkClick}>Volume 25</Link>
                </li>
                <li className="py-2 px-4 hover:text-[#76879E]">
                  <Link href="/magazines" onClick={handleLinkClick}>More...</Link>
                </li>
              </ul>
            </li>

            {/* CTA Button */}
            <li className="py-2 px-4 lg:px-6 lg:mx-2 bg-firefly text-mist rounded-xl font-semibold hover:scale-110 transition-transform duration-300 ease-in-out hover:bg-[#76879E] text-center">
              <Link href="https://online.fliphtml5.com/ukioy/fyba/" onClick={handleLinkClick}>Volume 27</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
