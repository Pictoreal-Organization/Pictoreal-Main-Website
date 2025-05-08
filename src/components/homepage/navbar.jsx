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
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <>
    
      <header className="border-b border-[#d2b49a]-300 py-2 bg-mist sticky top-0 z-50">
        <div className="flex justify-between items-center xl:max-w-7xl xl:mx-auto max-w-full px-[8%] flex-wrap">
          <Link href="/">
            <Image
              src="/homepage/navrasLogo.png"
              alt="logo"
              width={220}
              height={55}
              className="cursor-pointer"
            />
          </Link>
          <FiMenu
            className="lg:hidden block h-6 w-6 cursor-pointer"
            onClick={() => setOpen(!open)}
          />
          <nav
            ref={navbarRef}
            className={`${
              open ? "block" : "hidden"
            } lg:flex lg:items-center lg:w-auto w-full transition-all duration-300 ease-in-out`}
          >
            <ul className="text-base text-firefly lg:flex lg:justify-between">
              <li className="lg:px-5 py-2 hover:text-[#D2B49A] font-semibold">
                <Link href="/" onClick={handleLinkClick}>Home</Link>
              </li>
              <li className="lg:px-5 py-2 hover:text-[#D2B49A] font-semibold">
                <Link href="/#events" onClick={handleLinkClick}>Events</Link>
              </li>
              <li className="lg:px-5 py-2 hover:text-[#D2B49A] font-semibold">
                <Link href="/gallery" onClick={handleLinkClick}>Gallery</Link>
              </li>
              <li className="lg:px-5 py-2 hover:text-[#D2B49A] font-semibold">
                <Link href="/blogs" onClick={handleLinkClick}>Blogs</Link>
              </li>
              <li className="lg:px-5 py-2 hover:text-[#D2B49A] font-semibold">
                <Link href="/ourteam" onClick={handleLinkClick}>Our Team</Link>
              </li>
              <li
                className="relative lg:px-5 py-2 hover:text-[#D2B49A] font-semibold"
                onMouseEnter={() => window.innerWidth >= 1024 && setDropdownOpen(true)}
                onMouseLeave={() => window.innerWidth >= 1024 && setDropdownOpen(false)}
              >
                <span
                  className="flex items-center cursor-pointer"
                  onClick={() => window.innerWidth < 1024 && toggleDropdown()} // Toggle on click for mobile
                >
                  Magazines
                  <span className="ml-1">
                    <IoMdArrowDropdown />
                  </span>
                </span>

                {dropdownOpen && (
                  <ul
                    ref={dropdownRef}
                    className="absolute left-0 mt-2 w-48 text-firefly ring-1 ring-[#3A0622] bg-white rounded-lg shadow-lg z-10 transition-transform duration-300 ease-in-out"
                  >
                    <li className="py-2 px-4 text-firefly">
                      <Link href="https://online.fliphtml5.com/ukioy/fyba/" onClick={handleLinkClick}>Volume 26</Link>
                    </li>
                    <li className="py-2 px-4 text-firefly">
                      <Link href="https://www.yumpu.com/xx/embed/view/hQFX2kOYlHIs8xA9" onClick={handleLinkClick}>Volume 25</Link>
                    </li>
                    <li className="py-2 px-4 text-firefly">
                      <Link href="https://www.yumpu.com/en/embed/view/s9BzGkJ7FHwVhtYP" onClick={handleLinkClick}>Volume 24</Link>
                    </li>
                    <li className="py-2 px-4 text-firefly">
                      <Link href="/magazines" onClick={handleLinkClick}>More...</Link>
                    </li>
                  </ul>
                )}
              </li>
              <li className="py-2 px-4 lg:px-6 lg:mx-4 lg:py-2 bg-firefly text-mist rounded-xl font-semibold hover:scale-110 transition-transform duration-300 ease-in-out hover:bg-[#D2B49A]">
                <Link href="https://online.fliphtml5.com/ukioy/fyba/" onClick={handleLinkClick}>Volume 26</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
