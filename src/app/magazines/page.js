"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll } from "framer-motion";
import { useRef, useState } from "react";

const magazines = [
  { 
    title: "Prahar", 
    volume: "27", 
    imgLink: "/magazines/vol27.png", 
    iFrameSrc: "https://online.fliphtml5.com/vimxt/lkrg/#p=1",
    description: "Prahar Vol. 27 symbolises a new dawn or era, focusing on changes, significant transitions, and the passage of time in society or personal narratives."
  },
  { 
    title: "Navras", 
    volume: "26", 
    imgLink: "/magazines/vol26.png", 
    iFrameSrc: "https://online.fliphtml5.com/ukioy/fyba/#p=1",
    description: "Navras Vol. 26 represents the nine emotions of Indian art and literature, covering themes of love, anger, courage, wonder, peace, disgust, fear, humour, and compassion, reflecting human experience."
  },
  { 
    title: "Odyssey", 
    volume: "25", 
    imgLink: "/magazines/vol_2024_25.png", 
    iFrameSrc: "https://www.yumpu.com/xx/embed/view/hQFX2kOYlHIs8xA9",
    description: "Odyssey Vol. 25 explores the journey of discovery and adventure, emphasising transformative quests, personal growth, and the pursuit of knowledge or new horizons."
  },
  { 
    title: "Phoenix", 
    volume: "24", 
    imgLink: "/magazines/vol_2023_24.png", 
    iFrameSrc: "https://www.yumpu.com/en/embed/view/s9BzGkJ7FHwVhtYP",
    description: "Phoenix Vol. 24 stands for rebirth and resilience, highlighting stories of overcoming adversity, renewal, and rising from the ashes stronger than before."
  },
  { 
    title: "Kshitij", 
    volume: "23", 
    imgLink: "/magazines/vol_2021_23.jpg", 
    iFrameSrc: "https://www.yumpu.com/en/embed/view/XfPDm7HNEop26LMr",
    description: "Kshitij Vol. 23 means horizon, symbolising aspiration, hope, and the ever-expanding boundary of dreams and possibilities."
  },
  { 
    title: "Abstract", 
    volume: "22", 
    imgLink: "/magazines/vol_2020_22.png", 
    iFrameSrc: "https://www.yumpu.com/en/embed/view/3makuPpAxhKOsyoj",
    description: "Abstract Vol. 22 features creative expression and unconventional ideas, focusing on unique perspectives, experimental art, and open-ended interpretations."
  },
  { 
    title: "Alchemy", 
    volume: "21", 
    imgLink: "/magazines/vol_2019_21.jpg", 
    iFrameSrc: "https://www.yumpu.com/en/embed/view/1Nxq8IadrnWpzeBO",
    description: "Alchemy Vol. 21 theme is about transformation and creativity, centering on the process of turning ordinary experiences into something extraordinary and magical."
  },
  { 
    title: "Perspective", 
    volume: "20", 
    imgLink: "/magazines/vol_2018_20.jpg", 
    iFrameSrc: "https://www.yumpu.com/en/embed/view/ZQWHTJI3yPDF8M1m",
    description: "Perspective Vol. 20 dives into different viewpoints and insights, examining the world through varied lenses and encouraging understanding through diversity."
  },
  { 
    title: "Change", 
    volume: "19", 
    imgLink: "/magazines/vol_2017_19.png", 
    iFrameSrc: "https://www.yumpu.com/en/embed/view/mi1wtA6cOuJpjSFY",
    description: "Change Vol. 19 encapsulates evolution and transition, celebrating adaptation, innovation, and the inevitable shifts that shape individuals and communities."
  },
];

export default function MagazinePage() {
  const timelineRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end end"],
  });

  return (
    <div className="min-h-screen bg-[#DDF1FF] py-12 px-4 md:py-20">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-[#0A192E] mb-12 md:mb-16 tracking-widest">
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
            className="relative flex items-start justify-start md:items-center md:justify-center mb-10 md:mb-14"
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
                {/* Card */}
                <div className="w-full md:w-[45%] md:px-8">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    onHoverStart={() => setHoveredIndex(index)}
                    onHoverEnd={() => setHoveredIndex(null)}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl shadow-lg hover:shadow-2xl p-3 md:p-4 transition-all"
                  >
                    <div className="flex flex-col md:flex-row gap-3 md:gap-6">
                      {/* Cover Image */}
                      <div className="relative w-full md:w-1/3 h-[120px] md:h-[180px] flex-shrink-0">
                        <Image
                          src={magazine.imgLink}
                          alt={`${magazine.title} cover`}
                          fill
                          className="object-contain rounded-lg"
                        />
                      </div>

                      {/* Text */}
                      <div className="flex-1 flex flex-col justify-center">
                        <p className="text-[#0A192E] font-bold mb-1 text-base md:text-4xl">
                          {magazine.title}
                        </p>
                        <h2 className="text-sm md:text-sm font-bold text-gray-400 mb-2">
                          VOLUME {magazine.volume}
                        </h2>
                        <Link
                          href={magazine.iFrameSrc}
                          target="_blank"
                          className="inline-block bg-[#0A192E] text-white px-4 py-2 rounded-md hover:bg-opacity-80 transition-colors text-sm w-fit"
                        >
                          Read More
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Description Card - appears on opposite side when hovered (desktop) */}
                <div className="hidden md:block w-[45%] md:px-20">
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? 80 : -80 }}
                    animate={{ 
                      opacity: hoveredIndex === index ? 1 : 0,
                      x: hoveredIndex === index ? 0 : (index % 2 === 0 ? 80 : -80)
                    }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl shadow-lg p-4 h-full flex items-center"
                  >
                    <div>
                      <h3 className="text-[#0A192E] font-bold mb-3 text-lg">
                        About {magazine.title} Vol. {magazine.volume}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {magazine.description}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Description Card for Mobile - appears below card when hovered */}
                <div className="block md:hidden w-full mt-4">
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: hoveredIndex === index ? 1 : 0,
                      height: hoveredIndex === index ? "auto" : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl shadow-lg p-4 overflow-hidden"
                  >
                    <div>
                      <h3 className="text-[#0A192E] font-bold mb-3 text-lg">
                        About {magazine.title} Vol. {magazine.volume}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {magazine.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Timeline dot */}
            <motion.div
              className="w-3 h-3 bg-[#0A192E] rounded-full absolute left-4 md:left-1/2 top-8 md:top-1/2 transform -translate-x-[6px] md:-translate-x-1/2 md:-translate-y-1/2"
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
