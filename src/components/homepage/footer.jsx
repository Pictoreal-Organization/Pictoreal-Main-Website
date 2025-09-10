import React from 'react';
import { AiFillHeart } from 'react-icons/ai';

const Footer = () => {
  return (
    <footer id="footer" className="bg-gray-900 text-gray-300 font-sans scroll-mt-20">
      <div className="container mx-auto py-12 px-8">
        <div className="flex flex-col lg:flex-row justify-between gap-10">

          {/* Left Section: Address and Map */}
          <div className="w-full lg:w-5/12">
            <h3 className="text-xl font-bold text-white mb-4">PICTOREAL</h3>
            <p className="mb-4 leading-relaxed">
              SCTR'S Pune Institute of Computer Technology, <br />
              Survey No. 27, Near Trimurti Chowk, Dhankwadi, <br />
              Pune, Maharashtra 411043
            </p>
            <div className="w-full h-48 rounded-lg overflow-hidden border-2 border-gray-700">
              <iframe
                src="https://maps.google.com/maps?q=SCTR'S%20Pune%20Institute%20of%20Computer%20Technology&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="PICT Location"
              ></iframe>
            </div>
          </div>

          {/* Middle Section: Useful Links */}
          <div className="w-full lg:w-2/12">
            <h3 className="text-xl font-bold text-white mb-4">Useful Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-[#b3dfff] hover:underline transition-colors duration-300">Home</a></li>
              <li><a href="/events" className="hover:text-[#b3dfff] hover:underline transition-colors duration-300">Events</a></li>
              <li><a href="/gallery" className="hover:text-[#b3dfff] hover:underline transition-colors duration-300">Gallery</a></li>
              <li><a href="/ourteam" className="hover:text-[#b3dfff] hover:underline transition-colors duration-300">Our Team</a></li>
              <li><a href="#footer" className="hover:text-[#b3dfff] hover:underline transition-colors duration-300">Contact</a></li>
            </ul>
          </div>

          {/* Right Section: Socials/Contact */}
          <div className="w-full lg:w-3/12">
            <h3 className="text-xl font-bold text-white mb-4">Socials</h3>
            <p className="mb-2">
              <strong className="text-white">Phone :</strong> +91 20 24371101
            </p>
            <p>
              <strong className="text-white">Email :</strong> pictoreal@pict.edu
            </p>
          </div>

        </div>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-500 mt-10">&copy; {new Date().getFullYear()} Pictoreal. All Rights Reserved.</p>
      </div>
      <div className="text-center border-t border-gray-800 bg-[#112b45] mt-2 p-2">
        Made with <AiFillHeart className="inline text-red-500" /> by{' '}
        <a href="/developers" className="hover:text-[#b3dfff] font-semibold transition-colors hover:underline">
          Pictoreal Tech Team
        </a>
      </div>
    </footer>
  );
};

export default Footer;






