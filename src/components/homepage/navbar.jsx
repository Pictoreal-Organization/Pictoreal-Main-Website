"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navbarRef = useRef(null); // Create a ref for the navbar

  const handleClickOutside = (event) => {
    // Check if the click was outside the navbar
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setOpen(false);
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up the event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to handle link click
  const handleLinkClick = () => {
    setOpen(false); // Close the navbar when a link is clicked
  };

  return (
    <>
      <header className="border-b border-[#d2b49a]-300 py-2 bg-white sticky top-0 z-50">
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
            ref={navbarRef} // Attach the ref to the nav element
            className={`${
              open ? "block" : "hidden"
            } lg:flex lg:items-center lg:w-auto w-full transition-all duration-300 ease-in-out`} // Added transition classes
          >
            <ul className="text-base text-[#3A0622] lg:flex lg:justify-between">
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
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <span className="flex items-center cursor-pointer">
                  <Link href="" onClick={handleLinkClick}>Magazines</Link>
                  <span className="ml-1 ">
                    <IoMdArrowDropdown />
                  </span>
                </span>

                {dropdownOpen && (
                  <ul className="absolute left-0 mt-2 w-48 text-[#3A0622] ring-1 ring-[#3A0622] bg-white rounded-lg shadow-lg z-10  transition-transform duration-300 ease-in-out">
                    <li className="py-2 px-4 text-[#3A0622]">
                      <Link href="https://online.fliphtml5.com/ukioy/fyba/">Volume 26</Link>
                    </li>
                    <li className="py-2 px-4 text-[#3A0622]">
                      <Link href="https://www.yumpu.com/xx/embed/view/hQFX2kOYlHIs8xA9">Volume 25</Link>
                    </li>
                    <li className="py-2 px-4 text-[#3A0622]">
                      <Link href="https://www.yumpu.com/en/embed/view/s9BzGkJ7FHwVhtYP">Volume 24</Link>
                    </li>
                    <li className="py-2 px-4 text-[#3A0622]">
                      <Link href="/magazines" onClick={handleLinkClick}>More...</Link>
                    </li>
                  </ul>
                )}
              </li>
              <li className="py-2 px-4 lg:px-6 lg:mx-4 lg:py-2 bg-[#3A0622] text-white rounded-xl font-semibold hover:scale-110 transition-transform duration-300 ease-in-out hover:bg-[#D2B49A]">
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
