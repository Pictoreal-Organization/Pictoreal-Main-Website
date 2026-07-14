"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, Instagram, Youtube, ExternalLink } from "lucide-react";

const PictoTalentsPods = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const pictoTalentsReels = [
    {
      id: 1,
      thumbnail: "/talents-pods/talents1.png",
      title: "Soulful lyrics Singing",
      likes: "181",
      instagramUrl: "https://www.instagram.com/reel/DHiLwRYIUfR/?igsh=MXcyN3Nta3Q1dm9qbg=="
    },
    {
      id: 2,
      thumbnail: "/talents-pods/talents2.png",
      title: "Flute melody Musical instrument",
      likes: "145",
      instagramUrl: "https://www.instagram.com/reel/DEkGZ8tI7yW/?igsh=ajJpYWFsaGlpeGxr"
    },
    {
      id: 3,
      thumbnail: "/talents-pods/talents3.png",
      title: "Light and Shadow Photography",
      likes: "63",
      instagramUrl: "https://www.instagram.com/p/DB2zEqzS5Jc/?igsh=MW9xdGxlZXRpeGkydQ=="
    },
    {
      id: 4,
      thumbnail: "/talents-pods/talents4.png",
      title: "Waqt Poem",
      likes: "65",
      instagramUrl: "https://www.instagram.com/p/DAlBJZvogqs/?igsh=bHh6NjhhbGk2cHpj"
    },
    {
      id: 5,
      thumbnail: "/talents-pods/talents5.png",
      title: "Ganesha Painting",
      likes: "109",
      instagramUrl: "https://www.instagram.com/p/DOBCmtmiLuK/?igsh=ZGg2cTd6MGc5MTZp"
    }
  ];

  const pictoPodcast = {
    id: 1,
    thumbnail: "/talents-pods/pods1.png",
    title: "The Story Behind The Voice ft. Mr. Anand Bhate",
    description: `What does it take to become a legend at just 10 years old? In this episode, we bring you the extraordinary journey of Anand Bhate, the iconic voice that has kept the spirit of Marathi music alive across generations.`,
    duration: "1:17:02",
    views: "600",
    youtubeUrl: "https://www.youtube.com/watch?v=-j2gEDCxtJ0",
    publishDate: "Jun 20 2025"
  };

  useEffect(() => {
    if (activeSection === 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % pictoTalentsReels.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [activeSection, pictoTalentsReels.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % pictoTalentsReels.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + pictoTalentsReels.length) % pictoTalentsReels.length);
  };

  return (
    <div className="w-full min-h-screen bg-[#D8ECEC] py-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-3xl md:text-5xl font-bold text-[#083C3C] mb-4 font-heading leading-tight">
            Discover Our Creative Universe
          </p>
          <p className="text-base md:text-xl font-body text-[#186060] max-w-6xl mx-auto">
            Explore inspiring content from our Instagram reels and dive deep into conversations on our podcast
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <div className="bg-white/70 backdrop-blur-md rounded-3xl p-2 shadow-xl border border-white/20">
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
              <button
                onClick={() => { setActiveSection(0); setCurrentSlide(0); }}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${activeSection === 0
                  ? 'bg-[#083C3C] text-white shadow-lg scale-105'
                  : 'text-[#083C3C] hover:bg-white/50'
                  }`}
              >
                <Instagram size={20} />
                <span>PictoTalents</span>
              </button>
              <button
                onClick={() => setActiveSection(1)}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${activeSection === 1
                  ? 'bg-[#083C3C] text-white shadow-lg scale-105'
                  : 'text-[#083C3C] hover:bg-white/50'
                  }`}
              >
                <Youtube size={20} />
                <span>PictoPods</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative">
          {activeSection === 0 && (
            <div className="transition-all duration-700 ease-out">
              <div className="text-center mb-8">
                <p className="text-2xl md:text-3xl font-heading font-bold text-[#001730] mb-2">
                  Latest Instagram Reels
                </p>
                <p className="text-[#003A6B] text-base font-body">Swipe through our creative content</p>
              </div>

              {/* Mobile Carousel */}
              <div className="relative max-w-6xl mx-auto md:hidden">
                <div className="overflow-hidden rounded-2xl">
                  <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {pictoTalentsReels.map((reel) => (
                      <div key={reel.id} className="w-full flex-shrink-0">
                        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden h-full max-w-[calc(100vw-48px)] mx-auto">
                          <div className="relative aspect-[9/16]">
                            <Image
                              src={reel.thumbnail}
                              alt={reel.title}
                              fill
                              className="object-cover"
                              sizes="100vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-3 left-3 right-3 text-white">
                              <h3 className="font-bold text-lg leading-tight">{reel.title}</h3>
                              <div className="flex justify-between items-center text-sm opacity-90 mt-2">
                                <span>{reel.likes} ❤️</span>
                                <a
                                  href={reel.instagramUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-white/20 text-white px-3 py-1 text-xs rounded-full hover:bg-white/40 transition-colors flex items-center space-x-1"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <span>View</span>
                                  <ExternalLink size={12} />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Nav buttons */}
                {/* <button
                  onClick={prevSlide}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-all z-10"
                >
                  <ChevronLeft className="text-[#001730]" size={20} />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-all z-10"
                >
                  <ChevronRight className="text-[#001730]" size={20} />
                </button> */}

                {/* Dots */}
                <div className="flex justify-center mt-6 space-x-2">
                  {pictoTalentsReels.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index
                        ? 'bg-[#083C3C] scale-125'
                        : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                    />
                  ))}
                </div>
              </div>

              {/* Desktop Grid */}
              <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
                {pictoTalentsReels.map((reel) => (
                  <div
                    key={reel.id}
                    className="group relative transition-transform duration-300 hover:scale-105"
                  >
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                      <div className="relative aspect-[9/16]">
                        <Image
                          src={reel.thumbnail}
                          alt={reel.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 20vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-3 pt-8 text-white bg-gradient-to-t from-black/80 to-transparent">
                          <p className="font-bold text-md mb-2 font-heading leading-tight line-clamp-2">{reel.title}</p>
                          <div className="flex justify-between items-center text-xs opacity-90">
                            <span>{reel.likes} ❤️</span>
                            <a
                              href={reel.instagramUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-white/20 text-white px-3 py-1.5 text-xs rounded-full hover:bg-white/40 transition-colors flex items-center space-x-1"
                            >
                              <span>View</span>
                              <ExternalLink size={12} />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="text-center mt-12 flex justify-center items-center">
                <button
                  onClick={() => window.open('https://www.instagram.com/picto_talents?igsh=ZGwxc256OXM4NGtv', '_blank')}
                  className="group flex items-center bg-[#083C3C] text-white pl-6 pr-2 py-2 rounded-full hover:scale-105 font-sans cursor-pointer hover:bg-[#186060] transition duration-300"
                >
                  <span className="flex items-center space-x-3">
                    <Instagram size={20} className="text-[#D8ECEC]" />
                    <span className="text-[#D8ECEC] font-semibold">Follow on Instagram</span>
                  </span>
                  <span className="ml-4 w-9 h-9 flex items-center justify-center rounded-full bg-[#D8ECEC]">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="#083C3C"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 7L7 17M17 7h-6m6 0v6" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Podcast Section */}
          {activeSection === 1 && (
            <div className="transition-all duration-700 ease-out">
              <div className="text-center mb-6">
                <p className="text-2xl md:text-3xl font-heading font-bold text-[#083C3C] mb-2">
                  Latest Podcast Episode
                </p>
                <p className="text-[#186060] text-base font-body">Deep conversations about creativity and storytelling</p>
              </div>
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative aspect-video md:w-2/5">
                      <Image
                        src={pictoPodcast.thumbnail}
                        alt={pictoPodcast.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <button
                          onClick={() => window.open(pictoPodcast.youtubeUrl, '_blank')}
                          className="w-20 h-12 bg-red-600/90 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-red-700 transition hover:scale-110"
                        >
                          <Play className="text-white fill-white" size={28} />
                        </button>
                      </div>
                      <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        {pictoPodcast.duration}
                      </div>
                    </div>
                    <div className="md:w-3/5 p-6 flex flex-col justify-center">
                      <div className="flex items-center space-x-2 text-red-600 mb-3">
                        <Youtube size={16} />
                        <span className="text-xs font-heading font-semibold">PODCAST</span>
                      </div>
                      <p className="text-xl md:text-3xl font-heading font-bold text-[#083C3C] mb-3 leading-tight line-clamp-2">
                        {pictoPodcast.title}
                      </p>
                      <p className="text-[#186060] mb-4 font-body text-sm leading-relaxed line-clamp-3">
                        {pictoPodcast.description}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-600 mb-4">
                        <span>{pictoPodcast.views} views</span>
                        <span>{pictoPodcast.publishDate}</span>
                      </div>
                      <div className="space-y-3 mt-auto">
                        <button
                          onClick={() => window.open(pictoPodcast.youtubeUrl, '_blank')}
                          className="w-full bg-red-600 text-white py-3 rounded-full hover:bg-red-700 transition transform hover:scale-105 flex items-center justify-center space-x-2 shadow-md text-sm"
                        >
                          <Youtube size={16} />
                          <span>Watch on YouTube</span>
                        </button>
                        <button
                          onClick={() => window.open('https://www.youtube.com/@Pictoreal-yt', '_blank')}
                          className="w-full group flex items-center justify-center bg-[#083C3C] text-white pl-6 pr-2 py-2 rounded-full hover:scale-105 font-sans cursor-pointer hover:bg-[#186060] transition"
                        >
                          <span className="flex items-center space-x-3">
                            <Youtube size={20} className="text-[#D8ECEC]" />
                            <span className="text-[#D8ECEC] font-semibold">Subscribe to PictoPods</span>
                          </span>
                          <span className="ml-4 w-9 h-9 flex items-center justify-center rounded-full bg-[#D8ECEC]">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="#083C3C"
                              strokeWidth={2.5}
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17 7L7 17M17 7h-6m6 0v6" />
                            </svg>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PictoTalentsPods;
