"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const EventsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);

  const events = [
    { id: 1, name: "Magazine Release Event", image: "./home_page/Prahar.jpg" },
    { id: 2, name: "Manthan", image: "./home_page/Manthan.jpg" },
    { id: 3, name: "Parichay", image: "./home_page/Parichay1.jpg" },
    { id: 4, name: "Blood Donation Drive", image: "./home_page/BDD.jpg" },
    { id: 5, name: "PICTOFEST", image: "./home_page/Pictofest.jpg" },
    { id: 6, name: "BE Photoshoot", image: "./home_page/BE_Shoot.jpg" },
    { id: 7, name: "Interviews", image: "./home_page/Interview.jpg" },
    { id: 8, name: "Career Guidance", image: "./home_page/Career_guidance.jpg" },
    { id: 9, name: "Old Age Home Visit", image: "./home_page/Old_Age_Home_Visit.jpg" },
    { id: 10, name: "Picto Plants", image: "./home_page/Pictoplants.jpg" },
    { id: 11, name: "Orphanage Visit", image: "./home_page/Orphange_Visit.jpg" },
    { id: 12, name: "Cleanliness Drive", image: "./home_page/Cleanliness.jpg" },
    { id: 13, name: "Amche Bappa", image: "./home_page/amche_bappa.jpg" },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, events.length]);

  const getPrevIndex = () => (currentIndex - 1 + events.length) % events.length;
  const getNextIndex = () => (currentIndex + 1) % events.length;

  const handlePrevClick = () => {
    setDirection(-1);
    setCurrentIndex(getPrevIndex());
    setIsAutoPlaying(false);
  };

  const handleNextClick = () => {
    setDirection(1);
    setCurrentIndex(getNextIndex());
    setIsAutoPlaying(false);
  };

  return (
    <div className="min-h-screen bg-[#0A1631] py-12 flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-4">Our Events</h1>
        <p className="text-xl text-gray-300 italic">
          "Where connections are made and memories are created."
        </p>
      </div>

      {/* Carousel Section */}
      <div className="relative w-full max-w-[90rem]">
        {/* Left Arrow */}
        <button
          onClick={handlePrevClick}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 backdrop-blur-sm shadow-lg hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft size={32} />
        </button>

        {/* Right Arrow */}
        <button
          onClick={handleNextClick}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 backdrop-blur-sm shadow-lg hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight size={32} />
        </button>

        {/* Carousel Container */}
        <div
          className="relative flex items-center justify-center h-[600px] px-32"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Left Image */}
          <motion.div
            key={`left-${getPrevIndex()}`}
            className="absolute left-20 z-10"
            initial={{ x: direction === -1 ? 200 : -300, opacity: 0 }}
            animate={{ x: 0, opacity: 0.7, scale: 0.75 }}
            exit={{ x: direction === -1 ? 300 : -300, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <Link href="/gallery">
              <div className="relative group cursor-pointer">
                <img
                  src={events[getPrevIndex()].image}
                  alt={events[getPrevIndex()].name}
                  className="w-80 h-96 object-cover rounded-xl shadow-[0_0_20px_4px_rgba(190,227,248,0.6)] hover:shadow-[0_0_25px_6px_rgba(190,227,248,0.8)] transition-shadow duration-300"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 rounded-xl">
                  <p className="text-white text-lg font-semibold text-center px-2">
                    {events[getPrevIndex()].name}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Center Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`center-${currentIndex}`}
              className="z-20"
              initial={{ 
                x: direction === 1 ? 300 : -300,
                opacity: 0,
                scale: 0.75
              }}
              animate={{ 
                x: 0,
                opacity: 1,
                scale: 1
              }}
              exit={{ 
                x: direction === 1 ? -300 : 300,
                opacity: 0,
                scale: 0.75
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <Link href="/gallery">
                <div className="relative group cursor-pointer">
                  <img
                    src={events[currentIndex].image}
                    alt={events[currentIndex].name}
                    className="w-[40rem] h-[32rem] object-cover rounded-2xl shadow-[0_0_30px_8px_rgba(190,227,248,0.9)] hover:shadow-[0_0_35px_10px_rgba(190,227,248,1)] transition-shadow duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 rounded-2xl">
                    <p className="text-white text-3xl font-bold text-center px-4">
                      {events[currentIndex].name}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Right Image */}
          <motion.div
            key={`right-${getNextIndex()}`}
            className="absolute right-20 z-10"
            initial={{ x: direction === 1 ? -200 : 300, opacity: 0 }}
            animate={{ x: 0, opacity: 0.7, scale: 0.75 }}
            exit={{ x: direction === 1 ? -300 : 300, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <Link href="/gallery">
              <div className="relative group cursor-pointer">
                <img
                  src={events[getNextIndex()].image}
                  alt={events[getNextIndex()].name}
                  className="w-80 h-96 object-cover rounded-xl shadow-[0_0_20px_4px_rgba(190,227,248,0.6)] hover:shadow-[0_0_25px_6px_rgba(190,227,248,0.8)] transition-shadow duration-300"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 rounded-xl">
                  <p className="text-white text-lg font-semibold text-center px-2">
                    {events[getNextIndex()].name}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Dots Indicator */}
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-cyan-300 scale-125 shadow-[0_0_10px_2px_rgba(190,227,248,0.6)]'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Event Name Display */}
      <motion.div 
        key={currentIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mt-16 mb-6"
      >
        <h2 className="text-3xl font-bold text-white mb-2">
          {events[currentIndex].name}
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-cyan-300 to-blue-400 mx-auto rounded-full"></div>
      </motion.div>

      {/* Explore Button */}
      <div className="text-center mt-6">
        <Link href="/gallery">
          <button 
            className="flex items-center text-[#DDF1FF] pl-6 pr-2 py-1.5 rounded-full transform transition duration-500 ease-in-out hover:scale-110 font-body cursor-pointer bg-[#111C33] hover:bg-[#003366]"
          >
            <span>Explore Gallery</span>
            <span className="ml-3 w-8 h-8 flex items-center justify-center rounded-full bg-[#DDF1FF]">
              <ArrowRight size={18} className="text-[#111C33]" />
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EventsCarousel;