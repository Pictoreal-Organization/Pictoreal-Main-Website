"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Instagram, Youtube, ExternalLink } from "lucide-react";

const PictoTalentsPods = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const pictoTalentsReels = [
    {
      id: 1,
      thumbnail: "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=400&h=600&fit=crop",
      title: "Creative Writing Workshop",
      views: "12K",
      likes: "890",
      instagramUrl: "#"
    },
    {
      id: 2,
      thumbnail: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=600&fit=crop",
      title: "Photography Tips & Tricks",
      views: "8.5K",
      likes: "654",
      instagramUrl: "#"
    },
    {
      id: 3,
      thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=600&fit=crop",
      title: "Storytelling Techniques",
      views: "15K",
      likes: "1.2K",
      instagramUrl: "#"
    },
    {
      id: 4,
      thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
      title: "Magazine Layout Design",
      views: "9.8K",
      likes: "723",
      instagramUrl: "#"
    },
    {
      id: 5,
      thumbnail: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=600&fit=crop",
      title: "Interview Skills Masterclass",
      views: "11K",
      likes: "956",
      instagramUrl: "#"
    }
  ];

  const pictoPodcast = {
    id: 1,
    thumbnail: "/talents-pods/Thumbnail.png",
    title: "The Story Behind The Voice ft. Mr. Anand Bhate",
    description: "Join us for an inspiring conversation with the legendary Mr. Anand Bhate as we explore his journey and the powerful stories behind his voice.",
    duration: "38:15",
    views: "5.1K",
    youtubeUrl: "#",
    publishDate: "5 days ago"
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
    <div className="w-full min-h-screen bg-gradient-to-br from-[#DDF1FF] via-[#E8F4FF] to-[#F0F8FF] py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#001730] mb-6 leading-tight">
            Discover Our Creative Universe
          </h1>
          <p className="text-lg md:text-xl text-[#003A6B] max-w-3xl mx-auto">
            Explore inspiring content from our Instagram reels and dive deep into conversations on our podcast
          </p>
        </div>
        <div className="flex justify-center mb-12">
          <div className="bg-white/70 backdrop-blur-md rounded-3xl p-2 shadow-xl border border-white/20">
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
              <button
                onClick={() => {setActiveSection(0); setCurrentSlide(0);}}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                  activeSection === 0
                    ? 'bg-[#001730] text-white shadow-lg scale-105'
                    : 'text-[#001730] hover:bg-white/50'
                }`}
              >
                <Instagram size={20} />
                <span>PictoTalents</span>
              </button>
              <button
                onClick={() => setActiveSection(1)}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                  activeSection === 1
                    ? 'bg-[#001730] text-white shadow-lg scale-105'
                    : 'text-[#001730] hover:bg-white/50'
                }`}
              >
                <Youtube size={20} />
                <span>PictoPods</span>
              </button>
            </div>
          </div>
        </div>
        <div className="relative">
          {activeSection === 0 && (
            <div className="transition-all duration-700 ease-out">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-[#001730] mb-4">
                  Latest Instagram Reels
                </h2>
                <p className="text-[#003A6B]">Swipe through our creative content</p>
              </div>
              <div className="relative max-w-6xl mx-auto">
                <div className="md:hidden">
                  <div className="relative">
                    <div className="overflow-hidden rounded-2xl">
                      <div 
                        className="flex transition-transform duration-500 ease-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                      >
                        {pictoTalentsReels.map((reel) => (
                          <div key={reel.id} className="w-full flex-shrink-0">
                            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden h-full max-w-[calc(100vw-48px)] mx-auto">
                              <div className="relative aspect-[9/16]">
                                <img
                                  src={reel.thumbnail}
                                  alt={reel.title}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                                  <Play className="text-white ml-1" size={20} />
                                </button>
                                <div className="absolute bottom-2 left-2 right-2 text-white">
                                  <h3 className="font-bold text-sm leading-tight">{reel.title}</h3>
                                  <div className="flex justify-between text-xs opacity-90 mt-1">
                                    <span>{reel.views} views</span>
                                    <span>❤️ {reel.likes}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={prevSlide}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-all z-10"
                    >
                      <ChevronLeft className="text-[#001730]" size={20} />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-all z-10"
                    >
                      <ChevronRight className="text-[#001730]" size={20} />
                    </button>
                  </div>
                  <div className="flex justify-center mt-6 space-x-2">
                    {pictoTalentsReels.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          currentSlide === index
                            ? 'bg-[#001730] scale-125'
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="hidden md:flex md:justify-center">
                  <div className="grid md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-4xl">
                    {pictoTalentsReels.map((reel, index) => (
                      <div
                        key={reel.id}
                        className="group cursor-pointer transition-transform duration-300 hover:scale-105"
                        onClick={() => setCurrentSlide(index)}
                      >
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                          <div className="relative aspect-[9/16]">
                            <img
                              src={reel.thumbnail}
                              alt={reel.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-transform hover:scale-110">
                              <Play className="text-white ml-0.5" size={12} />
                            </button>
                            <div className="absolute bottom-1.5 left-1.5 right-1.5 text-white">
                              <p className="text-xl font-bold mb-0.5 leading-tight">{reel.title}</p>
                              <div className="flex justify-between text-xs opacity-90">
                                <span className="text-xs">{reel.views}</span>
                                <span className="text-xs">❤️ {reel.likes}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-center mt-12">
                  <button className="bg-[#001730] text-white px-8 py-4 rounded-full hover:bg-[#003A6B] transition-colors shadow-lg hover:shadow-xl flex items-center space-x-2 mx-auto">
                    <Instagram size={20} />
                    <span>Follow on Instagram</span>
                    <ExternalLink size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
          {activeSection === 1 && (
            <div className="transition-all duration-700 ease-out">
              <div className="text-center mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-[#001730] mb-2">
                  Latest Podcast Episode
                </h2>
                <p className="text-[#003A6B] text-sm">Deep conversations about creativity and storytelling</p>
              </div>
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    
                    {/* ===== START OF CORRECTED CODE ===== */}
                    {/* The structure here is changed to remove the fixed aspect ratio and allow the image to fill the container. */}
                    <div className="aspect-video md:aspect-auto md:w-2/5 relative">
                      <img
                        src={pictoPodcast.thumbnail}
                        alt={pictoPodcast.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <button 
                          onClick={() => window.open(pictoPodcast.youtubeUrl, '_blank')}
                          className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors hover:scale-110 transform"
                        >
                          <Play className="text-white ml-1" size={24} />
                        </button>
                      </div>
                      <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        {pictoPodcast.duration}
                      </div>
                    </div>
                    {/* ===== END OF CORRECTED CODE ===== */}

                    <div className="md:w-3/5 p-6 flex flex-col justify-center">
                      <div className="flex items-center space-x-2 text-red-600 mb-3">
                        <Youtube size={16} />
                        <span className="text-xs font-semibold">PODCAST</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-[#001730] mb-3 leading-tight line-clamp-2">
                        {pictoPodcast.title}
                      </h3>
                      <p className="text-[#003A6B] mb-4 text-sm leading-relaxed line-clamp-3">
                        {pictoPodcast.description}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-600 mb-4">
                        <span>{pictoPodcast.views} views</span>
                        <span>{pictoPodcast.publishDate}</span>
                      </div>
                      <div className="space-y-3 mt-auto">
                        <button 
                          onClick={() => window.open(pictoPodcast.youtubeUrl, '_blank')}
                          className="w-full bg-red-600 text-white py-3 rounded-full hover:bg-red-700 transition-colors flex items-center justify-center space-x-2 shadow-md text-sm"
                        >
                          <Youtube size={16} />
                          <span>Watch on YouTube</span>
                        </button>
                        <button className="w-full border-2 border-[#001730] text-[#001730] py-3 rounded-full hover:bg-[#001730] hover:text-white transition-colors flex items-center justify-center space-x-2 text-sm">
                          <span>Subscribe to PictoPods</span>
                          <ExternalLink size={14} />
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