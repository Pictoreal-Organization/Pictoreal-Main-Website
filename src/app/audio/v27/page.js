"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const backendUrl = process.env.NEXT_PUBLIC_AUDIO_API_URL || "http://localhost:5000";

// A single column component for the scrolling background effect
const ImageColumn = ({ articles, duration = "40s" }) => (
  <div className="flex flex-col gap-4 animate-scroll" style={{ "--duration": duration }}>
    {[...articles, ...articles].map((article, index) => (
      <img
        key={`${article._id || article.id}-${index}`}
        src={`${backendUrl}/images/${article.image ?? article.cover ?? ""}`}
        alt={article.title ?? article.name ?? "Article"}
        className="w-full h-auto object-cover rounded-lg shadow-lg"
        onError={(e) => { e.target.style.display = 'none'; }} // Hide broken images
      />
    ))}
  </div>
);

export default function SelectLanguagePage() {
  const [articleImages, setArticleImages] = useState({ eng: [], hin: [], mar: [] });
  const languages = [
    { code: "eng", name: "English" },
    { code: "hin", name: "Hindi" },
    { code: "mar", name: "Marathi" },
  ];

  useEffect(() => {
    // Fetch a sample of images for each language to populate the background
    languages.forEach(lang => {
      fetch(`${backendUrl}/tracks/27/${lang.code}`)
        .then((res) => res.json())
        .then((data) => {
          const arr = Array.isArray(data) ? data : data?.tracks ?? [];
          setArticleImages(prev => ({ ...prev, [lang.code]: arr.slice(0, 10) })); // Get up to 10 images
        })
        .catch((err) => console.error(`Error fetching ${lang.code} articles:`, err));
    });
  }, []);

  return (
    <>
      {/* Custom CSS for the scrolling animation */}
      <style jsx global>{`
        @keyframes scroll {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-50%);
          }
        }
        .animate-scroll {
          animation: scroll var(--duration) linear infinite;
        }
      `}</style>

      <div className="min-h-screen bg-[#111C33] flex flex-col items-center justify-center p-4 overflow-hidden relative">
        {/* Background Scrolling Columns */}
        <div className="absolute inset-0 w-full h-full flex justify-center gap-4 opacity-20 [mask-image:radial-gradient(ellipse_at_center,rgba(0,0,0,0.8)_40%,transparent_100%)]">
          <div className="w-1/4 h-full">
            <ImageColumn articles={articleImages.eng} duration="45s" />
          </div>
          <div className="w-1/4 h-full">
            <ImageColumn articles={articleImages.hin} duration="60s" />
          </div>
          <div className="w-1/4 h-full">
            <ImageColumn articles={articleImages.mar} duration="50s" />
          </div>
           <div className="w-1/4 h-full hidden sm:block">
            <ImageColumn articles={articleImages.eng} duration="55s" />
          </div>
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-3 drop-shadow-lg">
            Audio Articles
          </h1>
          <p className="text-lg text-gray-300 mb-10">
            Please select a language to begin
          </p>

          <div className="flex flex-col sm:flex-row gap-5">
            {languages.map((lang) => (
              <Link
                key={lang.code}
                href={`/audio/v27/${lang.code}`}
                className="group"
              >
                <div
                  className="bg-white/10 backdrop-blur-md text-white border border-white/20 text-xl font-semibold w-60 rounded-xl shadow-lg p-5 text-center transition-all duration-300 ease-in-out hover:bg-white/20 hover:border-white/40 hover:scale-105"
                >
                  {lang.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
