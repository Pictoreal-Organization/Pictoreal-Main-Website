'use client';

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll } from "framer-motion";
import { useRef } from "react";

const magazines = [
  {
    title: "Prahar",
    volume: "27",
    imgLink: "/magazines/volume27.jpg",
    iFrameSrc: "https://link-to-your-magazine-27",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque finibus ex eu eleifend rutrum."
  },
  {
    title: "Navras",
    volume: "26",
    imgLink: "/magazines/volume26.jpg",
    iFrameSrc: "https://link-to-your-magazine-26",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque finibus ex eu eleifend rutrum."
  },
  {
    title: "Navras",
    volume: "25",
    imgLink: "/magazines/volume25.jpg",
    iFrameSrc: "https://link-to-your-magazine-25",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque finibus ex eu eleifend rutrum."
  }
  // ...existing magazine data...
];

export default function MagazinePage() {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end end"],
  });

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-16">MAGAZINES</h1>

      <div ref={timelineRef} className="max-w-4xl mx-auto relative">
        <motion.div
          className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-500 origin-top"
          style={{ scaleY: scrollYProgress }}
        />

        {magazines.map((magazine, index) => (
          <motion.div
            key={magazine.volume}
            className={`flex items-center mb-24 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={`w-1/2 ${index % 2 === 0 ? "pr-12" : "pl-12"}`}>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <Image
                  src={magazine.imgLink}
                  alt={magazine.title}
                  width={200}
                  height={300}
                  className="mx-auto mb-4 rounded-md"
                />
                <h2 className="text-2xl font-bold mb-2">{magazine.title}</h2>
                <p className="text-gray-600 mb-4">VOLUME {magazine.volume}</p>
                <p className="text-gray-600 mb-4">{magazine.description}</p>
                <Link 
                  href={magazine.iFrameSrc}
                  target="_blank"
                  className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Read More
                </Link>
              </div>
            </div>

            <motion.div
              className="w-4 h-4 bg-blue-500 rounded-full absolute left-1/2 transform -translate-x-1/2"
              whileInView={{ scale: [1, 1.5, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}