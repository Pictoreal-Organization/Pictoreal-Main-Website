// "use client";
// import React, { useEffect, useState } from "react";

// export default function AudioPage() {
//   const languages = ["eng", "hin", "mar"];
//   const [selectedLang, setSelectedLang] = useState("eng");
//   const [articles, setArticles] = useState([]);
//   const [selectedArticle, setSelectedArticle] = useState(null);

//   useEffect(() => {
//     let mounted = true;
//     fetch(`http://localhost:5000/tracks/27/${selectedLang}`)
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
//       });
//     return () => {
//       mounted = false;
//     };
//   }, [selectedLang]);

//   return (
//     <div className="h-screen bg-blue-100 p-8 flex flex-col">
//       {/* Title */}
//       <h1 className="text-3xl font-bold text-center mb-4">
//         🎵 Audio Articles
//       </h1>

//       {/* Language buttons */}
//       <div className="flex justify-center gap-4 mb-6">
//         {languages.map((lang) => (
//           <button
//             key={lang}
//             onClick={() => setSelectedLang(lang)}
//             className={`px-5 py-2 rounded-xl shadow-md transition ${
//               selectedLang === lang
//                 ? "bg-blue-800 text-white"
//                 : "bg-white text-gray-700 hover:bg-gray-200"
//             }`}
//           >
//             {lang.toUpperCase()}
//           </button>
//         ))}
//       </div>

//       {/* Main layout */}
//       <div className="flex-1 flex gap-6 h-0 min-h-0">
//         {/* LEFT: Article list */}
//         <div className="w-full md:w-1/3 h-full overflow-y-auto pr-2 space-y-3 custom-scrollbar">
//           {articles.length === 0 ? (
//             <p className="text-center text-gray-600 mt-6">No articles yet.</p>
//           ) : (
//             articles.map((article, idx) => {
//               const idKey = article.id ?? article._id ?? idx;
//               const isSelected =
//                 selectedArticle?.id === article.id ||
//                 selectedArticle?._id === article._id;

//               return (
//                 <div
//                   key={idKey}
//                   onClick={() => setSelectedArticle(article)}
//                   className={`flex items-center bg-white rounded-lg p-3 cursor-pointer transition 
//                     ${
//                       isSelected
//                         ? "border-2 border-blue-500 bg-blue-50 shadow-md"
//                         : "border border-gray-300 hover:border-blue-300"
//                     }`}
//                 >
//                   <img
//                     src={`http://localhost:5000/images/${
//                       article.image ?? article.cover ?? ""
//                     }`}
//                     alt={article.title ?? article.name ?? "Article"}
//                     className="w-14 h-14 object-cover rounded-md mr-3 flex-shrink-0 border border-gray-300"
//                   />
//                   <div className="text-sm font-medium line-clamp-2">
//                     {article.title ?? article.name ?? "Untitled"}
//                   </div>
//                 </div>
//               );
//             })
//           )}
//         </div>

//         {/* RIGHT: Selected article */}
//         <div className="w-full md:w-2/3 h-full flex items-stretch">
//           <div className="bg-white shadow-xl rounded-2xl p-6 w-full flex flex-col">
//             {selectedArticle ? (
//               <>
//                 {/* Image */}
//                 <div className="flex justify-center items-center mb-4 flex-shrink-0">
//                   <img
//                     src={`http://localhost:5000/images/${
//                       selectedArticle.image ??
//                       selectedArticle.cover ??
//                       ""
//                     }`}
//                     alt={selectedArticle.title ?? "Selected article"}
//                     className="max-w-full max-h-[60vh] object-contain rounded-md shadow-lg"
//                   />
//                 </div>

//                 {/* Title */}
//                 <h2 className="text-lg font-semibold text-center mb-4">
//                   {selectedArticle.title ??
//                     selectedArticle.name ??
//                     "Untitled"}
//                 </h2>

//                 {/* Audio player */}
//                 <div className="mt-auto">
//                   <audio
//                     controls
//                     className="w-full"
//                     src={`http://localhost:5000/audio/27/${selectedLang}/${
//                       selectedArticle.audio ??
//                       selectedArticle.audioFile ??
//                       selectedArticle.file ??
//                       ""
//                     }`}
//                   >
//                     Your browser does not support the audio element.
//                   </audio>
//                 </div>
//               </>
//             ) : (
//               <p className="text-gray-600">Select an article to listen.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





"use client";
import React, { useEffect, useState } from "react";
const backendUrl = process.env.NEXT_PUBLIC_AUDIO_API_URL || "http://localhost:5000";

export default function AudioPage() {
  const languages = ["eng", "hin", "mar"];
  const [selectedLang, setSelectedLang] = useState("eng");
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step === 1 && selectedLang) {
      let mounted = true;
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
        });
      return () => {
        mounted = false;
      };
    }
  }, [selectedLang, step]);

  return (
    <div className="h-full min-h-screen bg-[#DDF1Ff] p-4 flex flex-col">
      {step === 0 ? (
        // ---------- Language Selection Page ----------
        <div className="flex flex-col items-center justify-center flex-1">
          <h1 className="text-3xl font-bold text-center mb-4 text-[#003366] drop-shadow-lg">
            Audio Articles
          </h1>




          <div className="flex gap-4 flex-wrap justify-center">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setSelectedLang(lang);
                  setStep(1);
                }}
                className={`px-6 py-3 rounded-xl shadow-md text-lg transition-all duration-300 border ${selectedLang === lang
                    ? "bg-[#003366] text-white border-[#003366]" // Selected language styling
                    : "bg-white text-gray-700 border-transparent hover:border-[#003366] hover:text-black" // Unselected
                  }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      ) : (
        // ---------- Article Page ----------
        <>
          {/* Title */}
          <h1 className="text-3xl font-bold text-center mb-4 text-[#003366] drop-shadow-lg">
            Audio Articles
          </h1>


          {/* Back button */}
           {/* Back button */}
<div className="flex gap-3 flex-wrap justify-center">
  {languages.map((lang) => (
    <button
      key={lang}
      onClick={() => {
        setSelectedLang(lang);
        setStep(1);
      }}
      className={`px-4 py-2 mb-2 rounded-lg shadow text-sm transition-all duration-300 border ${
        selectedLang === lang
          ? "bg-[#003366] text-white border-[#003366]" // Selected
          : "bg-white text-gray-700 border-transparent hover:border-[#003366] hover:text-black" // Unselected
      }`}
    >
      {lang.toUpperCase()}
    </button>
  ))}
</div>






          {/* Main layout */}
          <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0">
            {/* LEFT: Article list */}
            <div className="w-full md:w-1/3 max-h-[75vh] overflow-y-auto pr-2 space-y-3 custom-scrollbar order-2 md:order-1">
              {articles.length === 0 ? (
                <p className="text-center text-gray-600 mt-6">
                  No articles yet.
                </p>
              ) : (
                articles.map((article, idx) => {
                  const idKey = article.id ?? article._id ?? idx;
                  const isSelected =
                    selectedArticle?.id === article.id ||
                    selectedArticle?._id === article._id;

                  return (
                    <div
                      key={idKey}
                      onClick={() => setSelectedArticle(article)}
                      className={`flex items-center bg-white rounded-lg p-3 cursor-pointer transition ${selectedArticle === article
                        ? "border-2 border-[#003366] bg-[#003366] bg-opacity-10 shadow-md"
                        : "border border-transparent hover:border-[#003366]"
                        }`}
                    >
                      <img
                        src={`${backendUrl}/images/${article.image ?? article.cover ?? ""
                          }`}
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

            {/* RIGHT: Selected article */}
            <div className="w-full md:w-2/3 flex flex-col bg-white shadow-xl rounded-2xl p-6 order-1 md:order-2">
              {selectedArticle ? (
                <>
                  {/* Image */}
                  <div className="flex justify-center items-center mb-4 flex-shrink-0">
                    <img
                      src={`${backendUrl}/images/${selectedArticle.image ?? selectedArticle.cover ?? ""
                        }`}
                      alt={selectedArticle.title ?? "Selected article"}
                      className="max-w-full max-h-[50vh] object-contain rounded-md shadow-lg"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-center mb-6 text-[#111C33]">
                    {selectedArticle.title ?? selectedArticle.name ?? "Untitled"}
                  </h3>

                  {/* Audio player */}
                  <div className="w-full flex justify-center">
                    <audio
                      controls
                      className="w-full sm:w-3/4 md:w-2/3"
                      src={`${backendUrl}/audio/27/${selectedLang}/${selectedArticle.audio ??
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
                <p className="text-gray-600 text-center">Select an article to listen.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
