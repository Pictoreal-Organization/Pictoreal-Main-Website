"use client"
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from "next/link";

const EventsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const events = [
    { id: 1, name: "Magazine Release Event", image: "./gallery/Prahar.JPG" },
    { id: 2, name: "Manthan", image: "./gallery/Manthan.JPG" },
    { id: 3, name: "Parichay", image: "./gallery/Parichay1.JPG" },
    { id: 4, name: "Blood Donation Drive", image: "./gallery/BDD.JPG" },
    { id: 5, name: "PICTOFEST", image: "./gallery/pictofest_2.jpg" },
    { id: 6, name: "BE Photoshoot", image: "./gallery/BE_Shoot.jpg" },
    { id: 7, name: "Interviews", image: "./gallery/Interview.JPG" },
    { id: 8, name: "Career Guidance", image: "./gallery/Career_guidance.jpg" },
    { id: 9, name: "Old Age Home Visit", image: "./gallery/Old Age Home Visit.JPG" },
    { id: 10, name: "Picto Plants", image: "./gallery/Pictoplants.JPG" },
    { id: 11, name: "Orphanage Visit", image: "./gallery/Orphange_Visit.jpg" },
    { id: 12, name: "Cleanliness Drive", image: "./gallery/CD.JPG" },
    { id: 13, name: "Amche Bappa", image: "./gallery/Amche Bappa.JPG" }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= events.length - 3 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, events.length]);

  const goToPrevious = () => setCurrentIndex((prev) => Math.max(0, prev - 1));
  const goToNext = () => setCurrentIndex((prev) => Math.min(events.length - 3, prev + 1));
  const goToSlide = (index) => setCurrentIndex(index);
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
          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={goToNext}
            disabled={currentIndex >= events.length - 3}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <ChevronRight size={24} />
          </button>

          {/* Three Event Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-16">
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
              onClick={() => goToSlide(index)}
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

        {/* All Events Preview Grid */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">All Events</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 max-w-6xl mx-auto">
            {events.map((event, index) => (
              <Link href="/gallery" key={event.id}>
                <div
                  className={`relative group overflow-hidden rounded-lg transition-all duration-200 cursor-pointer ${
                    index >= currentIndex && index < currentIndex + 3 
                      ? 'ring-4 ring-indigo-500 scale-105' 
                      : 'hover:scale-105'
                  }`}
                >
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-20 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <p className="text-white text-xs font-medium text-center px-1">
                      {event.name}
                    </p>
                  </div>
                  <div className="absolute top-1 right-1 bg-white/80 text-xs font-bold text-gray-800 rounded-full w-5 h-5 flex items-center justify-center">
                    {index + 1}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsCarousel;
