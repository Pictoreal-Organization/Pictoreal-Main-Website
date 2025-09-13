// // File: app/audio/v27/[lang]/page.js
// "use client";
// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { useParams } from "next/navigation";

// const backendUrl = "https://pictoreal-main-website-backend.onrender.com";

// export default function AudioArticlePage() {
//   const params = useParams();
//   const selectedLang = params.lang;

//   const languages = ["eng", "hin", "mar"];
//   const [articles, setArticles] = useState([]);
//   const [selectedArticle, setSelectedArticle] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (!selectedLang) return;

//     let mounted = true;
//     setIsLoading(true);

//     fetch(`${backendUrl}/tracks/27/${selectedLang}`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (!mounted) return;
//         const arr = Array.isArray(data) ? data : data?.tracks ?? [];
//         setArticles(arr);
//         setSelectedArticle(arr.length > 0 ? arr[0] : null);
//       })
//       .catch((err) => {
//         console.error("Error fetching articles:", err);
//         setArticles([]);
//         setSelectedArticle(null);
//       })
//       .finally(() => {
//         if (mounted) setIsLoading(false);
//       });

//     return () => {
//       mounted = false;
//     };
//   }, [selectedLang]);

//   return (
//     <div className="min-h-screen bg-[#DDF1Ff] p-4 flex flex-col">
//       {/* Title */}
//       <h1 className="text-3xl font-heading font-bold text-center mb-4 text-[#111C33] drop-shadow-lg">
//         AUDIO ARTICLES
//       </h1>

//       {/* Language switcher */}
//       <div className="flex gap-3 flex-wrap justify-center mb-6">
//         {languages.map((lang) => (
//           <Link
//             key={lang}
//             href={`/audio/v27/${lang}`}
//             className={`px-4 py-2 rounded-lg shadow text-sm transition-all duration-300 border ${
//               selectedLang === lang
//                 ? "bg-[#003366] text-white border-[#003366]"
//                 : "bg-white text-gray-700 border-transparent hover:border-[#003366] hover:text-black"
//             }`}
//           >
//             {lang.toUpperCase()}
//           </Link>
//         ))}
//       </div>

//       {/* Main layout */}
//       <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0">
//         {/* LEFT: Article list */}
//         <div className="w-full md:w-1/3 max-h-[75vh] overflow-y-auto pr-2 space-y-3 custom-scrollbar order-2 md:order-1">
//           {isLoading ? (
//             <p className="text-center text-gray-600 mt-6">Loading articles...</p>
//           ) : articles.length === 0 ? (
//             <p className="text-center text-gray-600 mt-6">
//               No articles found for this language.
//             </p>
//           ) : (
//             // articles.map((article, index) => {
//             //   // Using index as a fallback key if IDs are missing
//             //   const idKey = article.id ?? article._id ?? index;
              
//             //   // --- THIS IS THE CORRECTED LINE ---
//             //   // It now compares the object reference, which is reliable.
//             //   const isSelected = selectedArticle === article;

//             //   return (
//             //     <div
//             //       key={idKey}
//             //       onClick={() => setSelectedArticle(article)}
//             //       className={`flex items-center  rounded-lg p-3 cursor-pointer transition ${
//             //         isSelected
//             //           ? "border-2 border-[#003366] bg-[#B3DFFF] bg-opacity-10 shadow-md"
//             //           : "border hover:border-[#003366] hover:transform hover:scale-[1.01]"
//             //       }`}
//             //     >
//             //       <img
//             //         src={`${backendUrl}/images/${
//             //           article.image ?? article.cover ?? ""
//             //         }`}
//             //         alt={article.title ?? article.name ?? "Article"}
//             //         className="w-14 h-14 object-cover rounded-md mr-3 flex-shrink-0 border border-gray-300"
//             //       />
//             //       <div className={`text-sm font-medium line-clamp-2 ${
//             //         isSelected ? "text-paleskyblue" : ""
//             //         }`}
//             //       >
//             //         {article.title ?? article.name ?? "Untitled"}
//             //       </div>
//             //     </div>
//             //   );
//             // })
//             // Replace your article mapping section with this:
//             articles.map((article, index) => {
//               const idKey = article.id ?? article._id ?? index;
//               const isSelected = selectedArticle === article;

//               const activeClass = "bg-[#003366] text-white shadow-lg shadow-[#407499]/30";

//               return (
//                 <div
//                   key={idKey}
//                   onClick={() => setSelectedArticle(article)}
//                   className={`group w-full relative overflow-hidden rounded-xl px-4 py-3 cursor-pointer flex items-center transition-all duration-300 transform hover:scale-105 ${
//                     isSelected
//                       ? activeClass
//                       : "bg-transparent text-[#111C33]/70 hover:bg-black/5 hover:text-[#111C33]"
//                   }`}
//                 >
//                   <img
//                     src={`${backendUrl}/images/${
//                       article.image ?? article.cover ?? ""
//                     }`}
//                     alt={article.title ?? article.name ?? "Article"}
//                     className={`w-12 h-12 object-cover rounded-md mr-4 flex-shrink-0 border transition-transform duration-300 ${
//                       isSelected
//                         ? "rotate-12 scale-110 border-white/30"
//                         : "group-hover:rotate-6 border-gray-300"
//                     }`}
//                   />
//                   <div className={`text-sm font-medium line-clamp-2 transition-all duration-300 ${
//                     isSelected ? "text-white" : "text-[#111C33]/70 group-hover:text-[#111C33]"
//                   }`}>
//                     {article.title ?? article.name ?? "Untitled"}
//                   </div>
//                 </div>
//               );
//             })
//           )}
//         </div>

//         {/* RIGHT: Selected article player */}
//         <div className="w-full md:w-2/3 flex flex-col items-center justify-center bg-white shadow-xl rounded-2xl p-6 order-1 md:order-2">
//           {selectedArticle ? (
//             <>
//               <div className="flex justify-center items-center mb-4 flex-shrink-0">
//                 <img
//                   src={`${backendUrl}/images/${
//                     selectedArticle.image ?? selectedArticle.cover ?? ""
//                   }`}
//                   alt={selectedArticle.title ?? "Selected article"}
//                   className="max-w-full max-h-[50vh] object-contain rounded-md shadow-lg"
//                 />
//               </div>
//               <h3 className="text-xl font-semibold text-center mb-6 text-[#111C33]">
//                 {selectedArticle.title ?? selectedArticle.name ?? "Untitled"}
//               </h3>
//               <div className="w-full mt-auto flex justify-center">
//                 <audio
//                   key={selectedArticle.audio ?? selectedArticle.file}
//                   controls
//                   autoPlay
//                   className="w-full sm:w-3/4 md:w-2/3"
//                   src={`${backendUrl}/audio/27/${selectedLang}/${
//                     selectedArticle.audio ??
//                     selectedArticle.audioFile ??
//                     selectedArticle.file ??
//                     ""
//                   }`}
//                 >
//                   Your browser does not support the audio element.
//                 </audio>
//               </div>
//             </>
//           ) : (
//             <p className="text-gray-600 text-center">
//               Select an article to listen.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }






// File: app/audio/v27/[lang]/page.js
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

const backendUrl = "https://pictoreal-main-website-backend.onrender.com";

export default function AudioArticlePage() {
  const params = useParams();
  const selectedLang = params.lang;

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
  }, [selectedLang]);

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
            articles.map((article, index) => {
              const idKey = article.id ?? article._id ?? index;
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
                  <img
                    src={`${backendUrl}/images/${
                      article.image ?? article.cover ?? ""
                    }`}
                    alt={article.title ?? article.name ?? "Article"}
                    className={`w-12 h-12 object-cover rounded-md mr-3 flex-shrink-0 border transition-all duration-300 ${
                      isSelected
                        ? "border-white/30 shadow-md"
                        : "border-gray-300 group-hover:shadow-sm"
                    }`}
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
              {/* Image container with enhanced styling */}
              <div className="flex justify-center items-center mb-6 relative">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#407499] to-[#0A192E] rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                  <img
                    src={`${backendUrl}/images/${
                      selectedArticle.image ?? selectedArticle.cover ?? ""
                    }`}
                    alt={selectedArticle.title ?? "Selected article"}
                    className="relative max-w-full max-h-[45vh] object-contain rounded-2xl shadow-2xl border-2 border-white/50"
                  />
                </div>
              </div>

              {/* Title with enhanced styling */}
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#111C33] to-[#003366] bg-clip-text text-transparent mb-2 leading-tight">
                  {selectedArticle.title ?? selectedArticle.name ?? "Untitled"}
                </h3>
              </div>

              {/* Audio player (no extra rectangle) */}
              <div className="">
                <audio
                  key={selectedArticle.audio ?? selectedArticle.file}
                  controls
                  autoPlay
                  className="w-full rounded-lg shadow-md"
                  style={{
                    filter:
                      "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))",
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
