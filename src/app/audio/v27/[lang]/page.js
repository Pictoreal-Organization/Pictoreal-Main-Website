// File: app/audio/v27/[lang]/page.js
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
// 1. Import the useParams hook
import { useParams } from "next/navigation";

const backendUrl = process.env.NEXT_PUBLIC_AUDIO_API_URL || "https://pictoreal-main-website-backend.onrender.com";

// 2. Remove `params` from the component's props
export default function AudioArticlePage() {
  // 3. Call the hook to get the params object
  const params = useParams();
  const selectedLang = params.lang; // Get the language from the hook's return value

  const languages = ["eng", "hin", "mar"];
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
  }, [selectedLang]); // This dependency now correctly refers to the lang from the hook

  // ... the rest of your component's JSX remains exactly the same
  return (
    <div className="min-h-screen bg-[#DDF1Ff] p-4 flex flex-col">
      {/* Title */}
      <h1 className="text-3xl font-heading font-bold text-center mb-4 text-[#111C33] drop-shadow-lg">
        AUDIO ARTICLES
      </h1>

      {/* Language switcher */}
      <div className="flex gap-3 flex-wrap justify-center mb-6">
        {languages.map((lang) => (
          <Link
            key={lang}
            href={`/audio/v27/${lang}`}
            className={`px-4 py-2 rounded-lg shadow text-sm transition-all duration-300 border ${
              selectedLang === lang
                ? "bg-[#003366] text-white border-[#003366]"
                : "bg-white text-gray-700 border-transparent hover:border-[#003366] hover:text-black"
            }`}
          >
            {lang.toUpperCase()}
          </Link>
        ))}
      </div>

      {/* Main layout ... (rest of the code is unchanged) */}
       <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0">
        {/* LEFT: Article list */}
        <div className="w-full md:w-1/3 max-h-[75vh] overflow-y-auto pr-2 space-y-3 custom-scrollbar order-2 md:order-1">
          {isLoading ? (
            <p className="text-center text-gray-600 mt-6">Loading articles...</p>
          ) : articles.length === 0 ? (
            <p className="text-center text-gray-600 mt-6">No articles found for this language.</p>
          ) : (
            articles.map((article) => {
              const idKey = article.id ?? article._id;
              const isSelected = selectedArticle?._id === article._id || selectedArticle?.id === article.id;
              return (
                <div
                  key={idKey}
                  onClick={() => setSelectedArticle(article)}
                  className={`flex items-center bg-white rounded-lg p-3 cursor-pointer transition ${
                    isSelected
                      ? "border-2 border-[#003366] bg-[#003366] bg-opacity-10 shadow-md"
                      : "border border-gray-200 hover:border-[#003366]"
                  }`}
                >
                  <img
                    src={`${backendUrl}/images/${article.image ?? article.cover ?? ""}`}
                    alt={article.title ?? article.name ?? "Article"}
                    className="w-14 h-14 object-cover rounded-md mr-3 flex-shrink-0 border border-gray-300"
                  />
                  <div className="text-sm font-medium line-clamp-2">
                    {article.title ?? article.name ?? "Untitled"}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* RIGHT: Selected article player */}
        <div className="w-full md:w-2/3 flex flex-col items-center justify-center bg-white shadow-xl rounded-2xl p-6 order-1 md:order-2">
          {selectedArticle ? (
            <>
              <div className="flex justify-center items-center mb-4 flex-shrink-0">
                <img
                  src={`${backendUrl}/images/${selectedArticle.image ?? selectedArticle.cover ?? ""}`}
                  alt={selectedArticle.title ?? "Selected article"}
                  className="max-w-full max-h-[50vh] object-contain rounded-md shadow-lg"
                />
              </div>
              <h3 className="text-xl font-semibold text-center mb-6 text-[#111C33]">
                {selectedArticle.title ?? selectedArticle.name ?? "Untitled"}
              </h3>
              <div className="w-full mt-auto flex justify-center">
                 <audio
                    key={selectedArticle.audio ?? selectedArticle.file} 
                    controls
                    autoPlay
                    className="w-full sm:w-3/4 md:w-2/3"
                    src={`${backendUrl}/audio/27/${selectedLang}/${
                      selectedArticle.audio ?? selectedArticle.audioFile ?? selectedArticle.file ?? ""
                    }`}
                  >
                    Your browser does not support the audio element.
                  </audio>
              </div>
            </>
          ) : (
            <p className="text-gray-600 text-center">Select an article to listen.</p>
          )}
        </div>
      </div>
    </div>
  );
}