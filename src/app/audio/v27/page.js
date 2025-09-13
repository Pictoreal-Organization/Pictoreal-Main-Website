"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const backendUrl =  "https://pictoreal-main-website-backend.onrender.com";

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
      {/* Custom CSS for the vertical scrolling animation */}
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

      <div className="min-h-screen bg-[#DDF1FF] flex flex-col items-center justify-center p-4 -mt-20 overflow-hidden relative">
        {/* Background Scrolling Columns */}
        <div className="absolute inset-0 w-full h-full flex justify-center gap-4 opacity-25">
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

        {/* Fading overlay to create a vignette effect */}
        <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,_#DDF1FF_35%,transparent_70%)]"></div>

        {/* Foreground Content */}
        <div className="relative z-10 text-center w-full px-4">
          <h1 className="text-5xl text-[#001730] font-heading md:text-6xl font-bold mb-3 drop-shadow-lg">
            AUDIO ARTICLES
          </h1>
          <p className="text-lg font-body text-gray-600 mb-10">
            Please select a language to begin
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-5 w-full justify-center">
            {languages.map((lang) => (
              <Link
                key={lang.code}
                href={`/audio/v27/${lang.code}`}
                className="group w-full max-w-xs sm:w-auto"
              >
                <div
                  className="bg-[#111C33] text-[#DDF1FF] text-xl font-semibold w-full sm:w-60 rounded-full shadow-lg p-4 sm:p-5 text-center transition-all duration-500 ease-in-out hover:bg-[#003366] hover:scale-110"
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

