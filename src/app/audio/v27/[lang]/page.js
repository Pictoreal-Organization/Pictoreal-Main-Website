// File: app/audio/v27/[lang]/page.js
"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Play, Pause, Rewind, FastForward } from "lucide-react";

const backendUrl = process.env.NEXT_PUBLIC_AUDIO_API_URL;

export default function AudioArticlePage() {
  const params = useParams();
  const selectedLang = params.lang;

  const languages = ["eng", "hin", "mar"];
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false); // State for mobile controls
  const audioRef = useRef(null);

  // Effect to reset play state when a new article is selected
  useEffect(() => {
    setIsPlaying(false);
    setShowControls(false);
  }, [selectedArticle]);

  useEffect(() => {
    if (!selectedLang) return;

    let mounted = true;
    setIsLoading(true);

    fetch(`${backendUrl}/tracks/27/${selectedLang}`)
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;
        const arr = Array.isArray(data) ? data : data?.tracks ?? [];
        setArticles(arr);
        setSelectedArticle(arr.length > 0 ? arr[0] : null);
      })
      .catch((err) => {
        console.error("Error fetching articles:", err);
        setArticles([]);
        setSelectedArticle(null);
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [selectedLang]);

  // Handlers for custom audio controls
  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
  };

  const handleSeek = (amount) => {
    if (audioRef.current) {
      audioRef.current.currentTime += amount;
    }
  };
  
  // Handler to show/hide controls on mobile tap
  const handleToggleControls = () => {
    if (isPlaying) {
      setShowControls((prev) => !prev);
    }
  };

  return (
    <div className="min-h-screen bg-[#DDF1Ff] p-4 flex flex-col">
      {/* Title */}
      <p className="text-3xl md:text-5xl font-heading font-bold text-center mb-4 text-[#111C33] drop-shadow-lg">
        AUDIO ARTICLES
      </p>

      {/* Language switcher */}
      <div className="flex gap-3 flex-wrap justify-center mb-6">
        {languages.map((lang) => (
          <Link
            key={lang}
            href={`/audio/v27/${lang}`}
            className={`px-4 py-2 rounded-lg shadow text-sm transition-all duration-300 border ${
              selectedLang === lang
                ? "bg-[#001730] text-white border-[#001730]"
                : "bg-white text-gray-700 border-transparent hover:border-[#001730] hover:text-black"
            }`}
          >
            {lang.toUpperCase()}
          </Link>
        ))}
      </div>

      {/* Main layout */}
      <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0">
        {/* LEFT: Article list */}
        <div className="w-full md:w-1/3 max-h-[75vh] overflow-y-auto pr-2 space-y-2 custom-scrollbar order-2 md:order-1">
          {isLoading ? (
            <p className="text-center text-gray-600 mt-6">Loading articles...</p>
          ) : articles.length === 0 ? (
            <p className="text-center text-gray-600 mt-6">
              No articles found for this language.
            </p>
          ) : (
            articles.map((article) => {
              const idKey = article.id ?? article._id;
              const isSelected = selectedArticle === article;
              const activeClass =
                "bg-[#003366] text-white shadow-lg shadow-[#407499]/30";

              return (
                <div
                  key={idKey}
                  onClick={() => setSelectedArticle(article)}
                  className={`group max-w-[90%] mx-auto relative overflow-hidden rounded-lg px-2 py-3 cursor-pointer flex items-center transition-all duration-300 transform hover:scale-[1.03] ${
                    isSelected
                      ? activeClass
                      : "bg-[#f5f8fa] text-[#111C33]/70 hover:bg-white/80 hover:transform hover:text-[#111C33] hover:shadow-md"
                  }`}
                >
                  <Image
                    src={`${backendUrl}/images/${
                      article.image ?? article.cover ?? ""
                    }`}
                    alt={article.title ?? article.name ?? "Article"}
                    width={48}
                    height={48}
                    unoptimized
                    className="object-cover rounded-md mr-3 flex-shrink-0 border transition-all duration-300"
                  />
                  <div
                    className={`text-sm font-medium line-clamp-2 transition-all duration-300 ${
                      isSelected
                        ? "text-white"
                        : "text-[#111C33]/70 group-hover:text-[#111C33]"
                    }`}
                  >
                    {article.title ?? article.name ?? "Untitled"}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* RIGHT: Selected article player */}
        <div className="w-full md:w-2/3 flex flex-col bg-[#f5f8fa] shadow-2xl rounded-3xl p-8 order-1 md:order-2 border border-blue-100/50 backdrop-blur-sm">
          {selectedArticle ? (
            <>
              {/* Image container with custom player overlay */}
              <div className="flex justify-center items-center mb-6 relative">
                <div
                  className="relative group w-full max-w-sm"
                  onClick={handleToggleControls}
                >
                  {/* The Image Itself */}
                  <Image
                    src={`${backendUrl}/images/${
                      selectedArticle.image ?? selectedArticle.cover ?? ""
                    }`}
                    alt={selectedArticle.title ?? "Selected article"}
                    width={270}
                    height={400}
                    unoptimized
                    className={`
                      relative w-full h-auto object-contain rounded-2xl shadow-2xl border-2 border-white/50 transition-all duration-300
                      ${!isPlaying ? "blur-sm" : "blur-none"}
                    `}
                  />

                  {/* --- Custom Controls Overlay --- */}
                  <div
                    className={`
                      absolute inset-0 flex items-center justify-center transition-opacity duration-300 rounded-2xl
                      ${
                        !isPlaying || showControls
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }
                      bg-transparent backdrop-blur-xs
                    `}
                  >
                    {!isPlaying ? (
                      // Show Play button when paused
                      <button
                        onClick={handlePlayPause}
                        className="p-5 bg-[#111c33]/80 rounded-full text-white transform transition hover:scale-110 backdrop-blur-md"
                        aria-label="Play"
                      >
                        <Play className="w-12 h-12 fill-current" />
                      </button>
                    ) : (
                      // Show Pause and Seek controls on hover/tap
                      <div className="flex items-center gap-8 text-white">
                        <button
                          onClick={() => handleSeek(-5)}
                          className="p-3 bg-[#111c33]/80 rounded-full transform transition hover:scale-110 backdrop-blur-md"
                          aria-label="Rewind 5 seconds"
                        >
                          <Rewind className="w-8 h-8" />
                        </button>
                        <button
                          onClick={handlePlayPause}
                          className="p-5 bg-[#111c33]/80 rounded-full transform transition hover:scale-110 backdrop-blur-md"
                          aria-label="Pause"
                        >
                          <Pause className="w-10 h-10" />
                        </button>
                        <button
                          onClick={() => handleSeek(5)}
                          className="p-3 bg-[#111c33]/80 rounded-full transform transition hover:scale-110 backdrop-blur-md"
                          aria-label="Fast-forward 5 seconds"
                        >
                          <FastForward className="w-8 h-8" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Title with enhanced styling */}
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#111C33] to-[#003366] bg-clip-text text-transparent mb-2 leading-tight">
                  {selectedArticle.title ??
                    selectedArticle.name ??
                    "Untitled"}
                </p>
              </div>

              {/* Audio player */}
              <div className="">
                <audio
                  ref={audioRef}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => {
                    setIsPlaying(false);
                    setShowControls(false);
                  }}
                  key={selectedArticle.audio ?? selectedArticle.file}
                  controls
                  className="w-full rounded-lg shadow-md"
                  style={{
                    filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))",
                  }}
                  src={`${backendUrl}/audio/27/${selectedLang}/${
                    selectedArticle.audio ??
                    selectedArticle.audioFile ??
                    selectedArticle.file ??
                    ""
                  }`}
                >
                  Your browser does not support the audio element.
                </audio>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <svg
                  className="w-10 h-10 text-[#111C33]/50"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M18 3a1 1 0 00-1.196-.98L12 3v13.5a2.5 2.5 0 11-1-2V5.75l5.804-1.742A1 1 0 0018 5v-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#111C33]/70 mb-2">
                Ready to Listen
              </h3>
              <p className="text-[#111C33]/50 font-medium">
                Select an article from the list to start your audio journey
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}