'use client';

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll } from "framer-motion";
import { useRef } from "react";

const magazines = [
  {
    title: "Prahar",
    volume: "27",
    imgLink: "/magazines/vol27.png",
    iFrameSrc: "https://online.fliphtml5.com/vimxt/lkrg/#p=1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque finibus ex eu eleifend rutrum. Integer felis lorem, egestas vel dignissim a, facilisis et dolor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque finibus ex eu eleifend rutrum. Integer felis lorem, egestas vel dignissim a ",
  },
  {
    title: "Navras",
    volume: "26",
    imgLink: "/magazines/vol26.png",
    iFrameSrc: "https://online.fliphtml5.com/ukioy/fyba/#p=1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque finibus ex eu eleifend rutrum. Integer felis lorem, egestas vel dignissim a, facilisis et dolor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque finibus ex eu eleifend rutrum. Integer felis lorem, egestas vel dignissim a",
  },
  {
    title: "Navras",
    volume: "25",
    imgLink: "/magazines/vol26.png",
    iFrameSrc: "https://online.fliphtml5.com/ukioy/fyba/#p=1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque finibus ex eu eleifend rutrum. Integer felis lorem, egestas vel dignissim a, facilisis et dolor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque finibus ex eu eleifend rutrum. Integer felis lorem, egestas vel dignissim a",
  },
];

export default function MagazinePage() {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end end"],
  });

  return (
    <div className="min-h-screen bg-[#DDF1FF] py-12 px-4 md:py-24">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-[#0A192E] mb-12 md:mb-20 tracking-widest">
        MAGAZINE
      </h1>

      <div ref={timelineRef} className="max-w-7xl mx-auto relative">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-px bg-gray-300"></div>
        <motion.div
          className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-px bg-[#0A192E] origin-top"
          style={{ scaleY: scrollYProgress }}
        />

        {magazines.map((magazine, index) => (
          <motion.div
            key={magazine.volume}
            className="relative flex items-start justify-start md:items-center md:justify-center mb-16 md:mb-24"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-full pl-12 md:pl-0">
              <div
                className={`w-full flex flex-col md:flex-row ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Card with Image + Content */}
                <div className="w-full md:w-[45%] md:px-4">
                  <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                      {/* Title for mobile */}
                      <div className="md:hidden">
                        <h3 className="text-lg font-bold text-[#0A192E] mb-1">
                          {magazine.title}
                        </h3>
                        <p className="text-gray-400 font-bold mb-4">
                          VOLUME {magazine.volume}
                        </p>
                      </div>

                      {/* Cover Image */}
                      <div className="relative w-full md:w-1/3 h-[200px] md:h-[280px] flex-shrink-0">
                        <Image
                          src={magazine.imgLink}
                          alt={`${magazine.title} cover`}
                          fill
                          className="object-contain rounded-lg"
                        />
                      </div>

                      {/* Text Content */}
                      <div className="flex-1 flex flex-col justify-start">
                        {/* Title for desktop */}
                        <div className="hidden md:block">
                          <p className="text-[#0A192E] font-bold mb-1 text-xl">
                            {magazine.title}
                          </p>
                          <h2 className="text-xl font-bold text-gray-400 mb-4">
                            VOLUME {magazine.volume}
                          </h2>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                          {magazine.description}
                        </p>
                        <Link
                          href={magazine.iFrameSrc}
                          target="_blank"
                          className="inline-block bg-[#0A192E] text-white px-6 py-2 rounded-md hover:bg-opacity-80 transition-colors text-sm w-fit"
                        >
                          Read More
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block w-[45%]"></div>
              </div>
            </div>

            {/* Timeline dot */}
            <motion.div
              className="w-3 h-3 bg-[#0A192E] rounded-full absolute left-4 md:left-1/2 top-8 md:top-1/2 transform -translatex-[6px] md:-translate-x-1/2 md:-translate-y-1/2"
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