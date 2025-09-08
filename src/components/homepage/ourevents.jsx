"use client";
import React, { useState, useEffect } from 'react';
import Link from "next/link";

const EventsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const events = [
    { id: 1, name: "Magazine Release Event", image: "./home_page/Prahar.jpg" },
    { id: 2, name: "Manthan", image: "./home_page/Manthan.jpg" },
    { id: 3, name: "Parichay", image: "./home_page/Parichay1.jpg" },
    { id: 4, name: "Blood Donation Drive", image: "./home_page/BDD.jpg" },
    { id: 5, name: "PICTOFEST", image: "./home_page/pictofest_2.jpg" },
    { id: 6, name: "BE Photoshoot", image: "./home_page/BE_Shoot.jpg" },
    { id: 7, name: "Interviews", image: "./home_page/Interview.jpg" },
    { id: 8, name: "Career Guidance", image: "./home_page/Career_guidance.jpg" },
    { id: 9, name: "Old Age Home Visit", image: "./home_page/Old Age Home Visit.jpg" },
    { id: 10, name: "Picto Plants", image: "./home_page/Pictoplants.jpg" },
    { id: 11, name: "Orphanage Visit", image: "./home_page/Orphange_Visit.jpg" },
    { id: 12, name: "Cleanliness Drive", image: "./home_page/CD.jpg" },
    { id: 13, name: "Amche Bappa", image: "./home_page/Amche Bappa.jpg" }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev >= events.length - 3 ? 0 : prev + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, events.length]);

  const getCurrentEvents = () => events.slice(currentIndex, currentIndex + 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Our Events</h1>
          <p className="text-xl text-gray-600 italic">
            "Where connections are made and memories are created."
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Three Event Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-16 transition-all duration-700 ease-in-out">
            {getCurrentEvents().map((event) => (
              <Link href="/gallery" key={event.id}>
                <div className="group relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer">
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                      <h3 className="text-white text-2xl font-bold text-center drop-shadow-lg">
                        {event.name}
                      </h3>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Event Counter */}
          <div className="text-center mt-8">
            <span className="bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium">
              Showing {currentIndex + 1}-{currentIndex + 3} of {events.length} events
            </span>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-3">
          {Array.from({ length: events.length - 2 }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-200 ${
                index === currentIndex 
                  ? 'w-8 h-3 bg-indigo-600 rounded-full' 
                  : 'w-3 h-3 bg-gray-300 hover:bg-gray-400 rounded-full'
              }`}
            />
          ))}
        </div>

        {/* Explore Button */}
        <div className="text-center mt-12">
          <Link href="/gallery">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-12 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
              Explore
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventsCarousel;
