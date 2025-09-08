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

export default function AudioPage() {
  const languages = ["eng", "hin", "mar"];
  const [step, setStep] = useState(0);
  const [selectedLang, setSelectedLang] = useState("");
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    if (!selectedLang) return;
    let mounted = true;
    fetch(`http://localhost:5000/tracks/27/${selectedLang}`)
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;
        const arr = Array.isArray(data) ? data : data?.tracks ?? [];
        setArticles(arr);
        setSelectedArticle(null);
        setStep(1);
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

  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const getArticleBorder = (article) => {
    const isSelected =
      selectedArticle &&
      (selectedArticle.id === article.id ||
        selectedArticle._id === article._id);
    return isSelected
      ? "border-2 border-blue-700"
      : "border border-transparent hover:border-blue-400";
  };

  if (step === 0) {
    return (
      <div className="h-screen bg-blue-100 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-4">🎵 Audio Articles</h1>
        <div className="flex gap-4">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLang(lang)}
              className="px-5 py-2 rounded-xl shadow-md bg-blue-800 text-white text-lg font-semibold"
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="h-screen bg-blue-100 flex flex-col py-4">
        <h1 className="text-3xl font-bold mb-4 text-center">Choose An Article</h1>
        <div className="flex w-full h-[70vh] px-4">
          {/* Left list */}
          <div className="w-2/5 h-full overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            {articles.length === 0 ? (
              <p className="text-center text-gray-600 mt-6">No articles yet.</p>
            ) : (
              articles.map((article, idx) => {
                const idKey = article.id ?? article._id ?? idx;
                return (
                  <div
                    key={idKey}
                    onClick={() => { setSelectedArticle(article); setStep(2); }}
                    className={`flex items-center bg-white shadow-md rounded-lg p-3 cursor-pointer transition ${getArticleBorder(article)}`}
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
          {/* Right panel */}
          <div className="w-3/5 h-full flex flex-col items-center justify-center">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-[320px] flex flex-col items-center">
              <p className="text-gray-600 text-center mb-4">
                Select an article from the left list to begin listening.
              </p>
              <button
                className="mt-8 px-4 py-2 text-sm bg-blue-800 text-white rounded-xl"
                onClick={() => setStep(0)}
              >
                Change Language
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-blue-100 flex flex-col py-4">
      <div className="flex w-full h-[70vh] px-4">
        {/* LEFT: Article list */}
        <div className="w-full md:w-1/3 h-full overflow-y-auto pr-2 space-y-3 custom-scrollbar">
          {articles.length === 0 ? (
            <p className="text-center text-gray-600 mt-6">No articles yet.</p>
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
                  className={`flex items-center bg-white rounded-lg p-3 cursor-pointer transition 
                    ${isSelected
                      // ? "border-2 border-blue-500 bg-blue-50 shadow-md"
                      // : "border border-gray-300 hover:border-blue-300"
                    }`}
                >
                  <img
                    src={`http://localhost:5000/images/${article.image ?? article.cover ?? ""}`}
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
        <div className="w-full md:w-2/3 h-full flex items-stretch">
  <div className="bg-white shadow-xl rounded-2xl p-6 w-full flex flex-col">
    {selectedArticle ? (
      <>
        {/* Image */}
        <div className="flex justify-center items-center mb-4 flex-shrink-0">
          <img
            src={`http://localhost:5000/images/${selectedArticle.image ?? selectedArticle.cover ?? ""}`}
            alt={selectedArticle.title ?? "Selected article"}
            className="max-w-full max-h-[60vh] object-contain rounded-md shadow-lg"
          />
        </div>

        {/* Title */}
        <h className="text-lg font-semibold text-center mb-4">
          {selectedArticle.title ?? selectedArticle.name ?? "Untitled"}
        </h>

        {/* Audio player */}
        <div className="mt-auto w-full">
          <audio
            controls
            className="w-full"
            src={`http://localhost:5000/audio/27/${selectedLang}/${selectedArticle.audio ?? selectedArticle.audioFile ?? selectedArticle.file ?? ""}`}
          >
            Your browser does not support the audio element.
          </audio>
        </div>

        {/* Change Language Button */}
        <div className="mt-4 flex justify-center">
          <button
            className="px-4 py-2 text-sm bg-blue-800 text-white rounded-xl"
            onClick={() => setStep(0)}
          >
            Change Language
          </button>
        </div>
      </>
    ) : (
      <p className="text-gray-600 text-center mt-auto mb-auto">
        Select an article to listen.
      </p>
    )}
  </div>
</div>

        


      </div>
    </div>
  );
}
