'use client';

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll } from "framer-motion";
import { useRef } from "react";

const magazines = [
  {
    title: "Prahar",
    volume: "27",
    imgLink: "/components/magazine/vol27.png", 
    iFrameSrc: "https://link-to-your-magazine-27",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque finibus ex eu eleifend rutrum. Integer felis lorem, egestas vel dignissim a, facilisis et dolor."
  },
  {
    title: "Navras",
    volume: "26",
    imgLink: "/magazines/navras-logo.png",
    iFrameSrc: "https://link-to-your-magazine-26",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque finibus ex eu eleifend rutrum. Integer felis lorem, egestas vel dignissim a, facilisis et dolor."
  },
  {
    title: "Navras",
    volume: "25",
    imgLink: "/magazines/navras-logo.png",
    iFrameSrc: "https://link-to-your-magazine-25",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque finibus ex eu eleifend rutrum. Integer felis lorem, egestas vel dignissim a, facilisis et dolor."
  }
];

export default function MagazinePage() {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end end"],
  });

  return (
    <div className="min-h-screen bg-[#DDF1FF] py-24 px-4">
      <h1 className="text-4xl font-bold text-center text-[#0A192E] mb-20 tracking-widest">MAGAZINE</h1>

      <div ref={timelineRef} className="max-w-5xl mx-auto relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gray-300"></div>
        <motion.div
          className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-[#0A192E] origin-top"
          style={{ scaleY: scrollYProgress }}
        />

        {magazines.map((magazine, index) => (
          <motion.div
            key={magazine.volume}
            className="relative flex items-center justify-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`w-full flex ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
              <div className="w-1/2 px-10">
                <div className="bg-white rounded-xl shadow-lg p-10">
                  <div className="flex items-center mb-4">
                    {/* 1. Added a positioned parent container for the image */}
                    <div className="relative w-10 h-10 mr-4 flex-shrink-0">
                      {/* 2. Used the 'fill' prop on the Image component */}
                      <Image
                        src={magazine.imgLink}
                        alt={`${magazine.title} logo`}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h2 className="text-3xl font-bold text-[#0A192E]">{magazine.title}</h2>
                  </div>
                  <p className="text-gray-400 uppercase tracking-wider text-sm mb-4">VOLUME {magazine.volume}</p>
                  <p className="text-gray-600 text-base mb-6">{magazine.description}</p>
                  <Link
                    href={magazine.iFrameSrc}
                    target="_blank"
                    className="inline-block bg-[#0A192E] text-white px-6 py-2 rounded-lg hover:bg-opacity-80 transition-colors text-sm font-semibold"
                  >
                    Read More
                  </Link>
                </div>
              </div>
              <div className="w-1/2"></div>
            </div>
            
            <motion.div
              className="w-3 h-3 bg-[#0A192E] rounded-full absolute left-1/2 transform -translate-x-1/2"
              whileInView={{ scale: [1, 1.5, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}