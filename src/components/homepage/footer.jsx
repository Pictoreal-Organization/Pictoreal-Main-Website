import React from 'react';
import Link from 'next/link';
import BackToTopButton from './backtotop';
import { AiFillHeart } from "react-icons/ai";

const Footer = () => {
  return (
    <footer id="footer" className="bg-[#3e0d23] text-white pt-10">
      <div className="footer-top">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Address Section */}
            <div className="flex justify-start md:justify-center mb-3">
              <div className="footer-info">
                <h3 className="text-xl font-bold mb-4">PICTOREAL</h3>
                <p className="mb-0">
                  Pune Institute Of Computer Technology,
                  <br />
                  Survey No. 27, Near Trimurti Chowk, Dhankwadi,
                  <br />
                  Pune, Maharashtra 411043
                </p>
                <div className="mt-4">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.576189725422!2d73.84864491501206!3d18.457542087445685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2eac85230ba47%3A0x871eddd0a8a0a108!2sSCTR&#39;S%20Pune%20Institute%20of%20Computer%20Technology!5e0!3m2!1sen!2sin!4v1663048141570!5m2!1sen!2sin"
                    className="rounded-lg w-full"
                    height="150"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Useful Links Section */}
            <div className="flex justify-start md:justify-center mb-3">
              <div className="footer-info">
                <h3 className="text-xl font-bold mb-4">Useful Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/" className="hover:text-[#caa656]">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/#events" className="hover:text-[#caa656]">
                      Events
                    </Link>
                  </li>
                  <li>
                    <Link href="/gallery" className="hover:text-[#caa656]">
                      Gallery
                    </Link>
                  </li>
                  <li>
                    <Link href="/ourteam" className="hover:text-[#caa656]">
                      Our Team
                    </Link>
                  </li>
                  <li>
                    <Link href="/contactus" className="hover:text-[#caa656]">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Socials Section */}
            <div className="flex justify-start md:justify-center mb-3">
              <div className="footer-info">
                <h3 className="text-xl font-bold mb-4">Socials</h3>
                <p>
                  <strong>Phone: </strong>+91 20 24371101
                  <br />
                  <strong>Email: </strong>pictoreal@pict.edu
                </p>
                <div className="social-links mt-4 flex space-x-4">
                  <a
                    href="https://twitter.com/pictoreal_pict?t=XhwLRHsW8b9pJXjwpw5NSA&s=08"
                    className="text-white hover:text-blue-500 transition duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="bx bxl-twitter text-2xl"></i>
                  </a>
                  <a
                    href="https://www.facebook.com/pictoreal/"
                    className="text-white hover:text-blue-700 transition duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="bx bxl-facebook text-2xl"></i>
                  </a>
                  <a
                    href="https://www.instagram.com/pictoreal/"
                    className="text-white hover:text-pink-500 transition duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="bx bxl-instagram text-2xl"></i>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/pictoreal/"
                    className="text-white hover:text-blue-600 transition duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="bx bxl-linkedin text-2xl"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="text-center mt-10 bg-[#561a34] p-2">
      Made with <AiFillHeart className="inline text-red-500" /> by{' '}
      <a href="/developers" className="hover:text-[#caa656]">
        Pictoreal Tech Team
      </a>
    </div>
      <BackToTopButton/>
    </footer>
  );
};

export default Footer;
