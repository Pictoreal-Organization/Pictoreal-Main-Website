"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

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
    { id: 12, name: "Cleanliness Drive", image: "./home_page/CD.jpg" },
    { id: 13, name: "Amche Bappa", image: "./home_page/amche_bappa.jpg" },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, events.length]);

  const getPrevIndex = () => (currentIndex - 1 + events.length) % events.length;
  const getNextIndex = () => (currentIndex + 1) % events.length;

  return (
    <div className="min-h-screen bg-[#0A1631] py-12 flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-4">Our Events</h1>
        <p className="text-xl text-gray-300 italic">
          "Where connections are made and memories are created."
        </p>
      </div>

      {/* Carousel */}
      <div
        className="relative flex items-center justify-center w-full max-w-6xl"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Previous (smaller) */}
        <div className="absolute left-0 md:left-20 transform scale-75 opacity-70 transition-all duration-700">
          <div className="relative group">
            <img
              src={events[getPrevIndex()].image}
              alt={events[getPrevIndex()].name}
              className="w-52 h-72 object-cover rounded-xl shadow-lg"
            />
            {/* Hover name */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
              <p className="text-white text-lg font-semibold text-center px-2">
                {events[getPrevIndex()].name}
              </p>
            </div>
          </div>
        </div>

        {/* Current (center, wider horizontally) */}
        <div className="z-10 transform scale-100 transition-all duration-700">
          <div className="relative group">
            <img
              src={events[currentIndex].image}
              alt={events[currentIndex].name}
              className="w-[32rem] h-80 object-cover rounded-2xl shadow-2xl"
            />
            {/* Hover name */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
              <p className="text-white text-2xl font-bold text-center px-4">
                {events[currentIndex].name}
              </p>
            </div>
          </div>
        </div>

        {/* Next (smaller) */}
        <div className="absolute right-0 md:right-20 transform scale-75 opacity-70 transition-all duration-700">
          <div className="relative group">
            <img
              src={events[getNextIndex()].image}
              alt={events[getNextIndex()].name}
              className="w-52 h-72 object-cover rounded-xl shadow-lg"
            />
            {/* Hover name */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
              <p className="text-white text-lg font-semibold text-center px-2">
                {events[getNextIndex()].name}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Explore Button */}
      <div className="text-center mt-12">
        <Link href="/gallery">
          <button className="bg-[#191970] hover:bg-[#1e1e90] text-white font-semibold py-4 px-12 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
            Explore
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EventsCarousel;
