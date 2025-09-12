"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import ArrowBtn from "./arrowbtn";

const EventsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, events.length]);

  const getPrevIndex = () => (currentIndex - 1 + events.length) % events.length;
  const getNextIndex = () => (currentIndex + 1) % events.length;

  const handlePrevClick = () => {
    setCurrentIndex(getPrevIndex());
    setIsAutoPlaying(false);
  };

  const handleNextClick = () => {
    setCurrentIndex(getNextIndex());
    setIsAutoPlaying(false);
  };

  return (
    <div className="min-h-screen max-w-screen bg-[#0A1631] py-12 flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-4">Our Events</h1>
        <p className="text-xl text-gray-300 italic">
          "Where connections are made and memories are created."
        </p>
      </div>

      {/* Carousel */}
      <div className="relative w-full max-w-[85rem] flex items-center justify-center">
        {/* Left Arrow */}
        <button
          onClick={handlePrevClick}
          className="absolute left-0 translate-x-2 top-1/2 -translate-y-1/2 z-35 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-md shadow-lg hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Right Arrow */}
        <button
          onClick={handleNextClick}
          className="absolute right-0 -translate-x-2 top-1/2 -translate-y-1/2 z-35 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-md shadow-lg hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight size={18} />
        </button>

        {/* 3-Image Layout */}
        <div
          className="relative flex items-center justify-center h-[480px] gap-8"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Left Image */}
          <Link href="/gallery" className="block z-10">
            <div className="relative group cursor-pointer">
              <img
                src={events[getPrevIndex()].image}
                alt={events[getPrevIndex()].name}
                className="w-56 h-72 object-cover rounded-xl shadow-[0_0_15px_3px_rgba(190,227,248,0.3)] hover:shadow-[0_0_20px_4px_rgba(190,227,248,0.4)] transition-shadow duration-300"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 rounded-xl">
                <p className="text-white text-lg font-semibold text-center px-2">
                  {events[getPrevIndex()].name}
                </p>
              </div>
            </div>
          </Link>

          {/* Center Image */}
          <Link href="/gallery" className="block z-20">
            <div className="relative group cursor-pointer">
              <img
                src={events[currentIndex].image}
                alt={events[currentIndex].name}
                className="w-[32rem] h-[26rem] object-cover rounded-2xl shadow-[0_0_20px_5px_rgba(190,227,248,0.4)] hover:shadow-[0_0_25px_6px_rgba(190,227,248,0.5)] transition-shadow duration-300"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 rounded-2xl">
                <p className="text-white text-3xl font-bold text-center px-4">
                  {events[currentIndex].name}
                </p>
              </div>
            </div>
          </Link>

          {/* Right Image */}
          <Link href="/gallery" className="block z-10">
            <div className="relative group cursor-pointer">
              <img
                src={events[getNextIndex()].image}
                alt={events[getNextIndex()].name}
                className="w-56 h-72 object-cover rounded-xl shadow-[0_0_15px_3px_rgba(190,227,248,0.3)] hover:shadow-[0_0_20px_4px_rgba(190,227,248,0.4)] transition-shadow duration-300"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 rounded-xl">
                <p className="text-white text-lg font-semibold text-center px-2">
                  {events[getNextIndex()].name}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Explore Button */}
      <div className="text-center mt-6">
        <Link
          href="/gallery"
          className="flex items-center text-[#DDF1FF] pl-6 pr-2 py-1.5 rounded-full transform transition duration-300 ease-in-out hover:scale-110 font-body cursor-pointer bg-[#111C33] hover:bg-[#003366]"
        >
          <span>Explore Gallery</span>
          <span className="ml-3 w-8 h-8 flex items-center justify-center rounded-full bg-[#DDF1FF]">
            <ArrowRight size={18} className="text-[#111C33]" />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default EventsCarousel;