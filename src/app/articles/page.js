"use client";
import React, { useEffect, useState } from "react";
export default function AudioPage() {
  const languages = ["eng", "hin", "mar"];
  const [selectedLang, setSelectedLang] = useState("eng");
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetch(`http://localhost:5000/tracks/27/${selectedLang}`)
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;
        // backend might return array or object; try to handle both
        const arr = Array.isArray(data) ? data : data?.tracks ?? [];
        setArticles(arr);
        setSelectedArticle(arr.length > 0 ? arr[0] : null);
      })
      .catch((err) => {
        console.error("Error fetching articles:", err);
        setArticles([]);
        setSelectedArticle(null);
      });
    return () => {
      mounted = false;
    };
  }, [selectedLang]);

  return (
    // CHANGE 1: Use h-screen instead of min-h-screen to match the viewport exactly!
    <div className="h-screen bg-blue-100 p-8 flex flex-col">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-4">
        🎵 Audio Articles
      </h1>
      {/* Language buttons */}
      <div className="flex justify-center gap-4 mb-6">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => setSelectedLang(lang)}
            className={`px-5 py-2 rounded-xl shadow-md transition ${selectedLang === lang
                ? "bg-blue-800 text-white"
                : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
      {/* CHANGE 2: Add h-0 min-h-0 so flex children fill vertical space with no overflow */}
      <div className="flex-1 flex gap-6 h-0 min-h-0">
        {/* LEFT: articles list (scrolls full height) */}
        <div className="w-full md:w-1/3 h-full overflow-y-auto pr-2 space-y-3 custom-scrollbar">
          {articles.length === 0 ? (
            <p className="text-center text-gray-600 mt-6">No articles yet.</p>
          ) : (
            articles.map((article, idx) => {
              const idKey = article.id ?? article._id ?? idx;
              return (
                <div
                  key={idKey}
                  onClick={() => setSelectedArticle(article)}
                  className={`flex items-center bg-white shadow-md rounded-lg p-3 cursor-pointer transition ${selectedArticle?.id === article.id ||
                      selectedArticle?._id === article._id
                      ? "ring-2 ring-blue-400"
                      : "hover:bg-gray-50"
                    }`}
                >
                  <img
                    src={`http://localhost:5000/images/${article.image ?? article.cover ?? ""}`}
                    alt={article.title ?? article.name ?? "Article"}
                    className="w-14 h-14 object-cover rounded-md mr-3 flex-shrink-0"
                  />
                  <div className="text-sm font-medium line-clamp-2">
                    {article.title ?? article.name ?? "Untitled"}
                  </div>
                </div>
              );
            })
          )}
        </div>
        {/* RIGHT: selected article (flex column, stable height) */}
        <div className="w-full md:w-2/3 h-full flex items-stretch">
          <div className="bg-white shadow-xl rounded-2xl p-6 w-full flex flex-col">
            {selectedArticle ? (
              <>
                {/* Image area */}
                <div className="flex justify-center items-center mb-4 flex-shrink-0">
                  <img
                    src={`http://localhost:5000/images/${selectedArticle.image ?? selectedArticle.cover ?? ""}`}
                    alt={selectedArticle.title ?? "Selected article"}
                    className="max-w-full max-h-[60vh] object-contain rounded-md shadow-lg"
                  />
                </div>
                {/* Title */}
                <h2 className="text-lg font-semibold text-center mb-4">
                  {selectedArticle.title ?? selectedArticle.name ?? "Untitled"}
                </h2>
                {/* Audio player */}
                <div className="mt-auto">
                  <audio
                    controls
                    className="w-full"
                    src={`http://localhost:5000/audio/27/${selectedLang}/${selectedArticle.audio ?? selectedArticle.audioFile ?? selectedArticle.file ?? ""}`}
                  >
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </>
            ) : (
              <p className="text-gray-600">Select an article to listen.</p>
            )}
          </div>
        </div>
      </div>
      {/* If you have a footer, consider removing or adjusting it if it causes extra height */}
    </div>
  );
}
