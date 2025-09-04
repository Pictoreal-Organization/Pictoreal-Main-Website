"use client";

import React from "react";

export default function AudioPage() {
  // fak data
  const languages =  ["English", "Hindi", "Marathi"];
  const [selectedLang, setSelectedLang] = React.useState("English");

  const articles = [
    {
      id: 1,
      title: "The Silent Crisis-CLimate Change",
      image: "/articles/climate.jpg",
      audioUrl: "/audio/climate.mp3",
      language: "English",
    },
    {
      id: 2,
      title: "A True Man",
      image: "/articles/true-man.jpg",
      audioUrl: "/audio/true-man.mp3",
      language: "English",
    },
    {
      id: 3,
      title: "From Broken Helmets to Billion Dollar Deals- The Untild Cricket Saga",
      image: "/articles/cricket.jpg",
      audioUrl: "/audio/cricket.mp3",
      language: "English",
    },
    {
      id: 4,
      title: "Letter to Krishna",
      image: "/articles/krishna.jpg",
      audioUrl: "/audio/krishna.mp3",
      language: "English",
    },
    {
      id: 5,
      title: "Textile: India's Treasured Possession",
      image: "/articles/textiles.jpg",
      audioUrl: "/audio/textiles.mp3",
      language: "English",
    },
    {
      id: 6,
      title: "The Future of Passwords",
      image: "/articles/passwords.jpg",
      audioUrl: "/audio/passwords.mp3",
      language: "English",
    },
    {
      id: 7,
      title: "The Science Behind Mindfullness",
      image: "/articles/krishna.jpg",
      audioUrl: "/audio/krishna.mp3",
      language: "English",
    },
    {
      id: 8,
      title: "Timeless Wisdom: Decoding the Concept of Prahar",
      image: "/articles/krishna.jpg",
      audioUrl: "/audio/krishna.mp3",
      language: "English",
    },
    {
      id: 9,
      title: "Trump, Tariffs and Trade War",
      image: "/articles/krishna.jpg",
      audioUrl: "/audio/krishna.mp3",
      language: "English",
    },
    {
      id: 10,
      title: "What Is Even Ordinary?",
      image: "/articles/krishna.jpg",
      audioUrl: "/audio/krishna.mp3",
      language: "English",
    },
    {
      id: 11,
      title: "आनंदवन",
      image: "/articles/krishna.jpg",
      audioUrl: "/audio/krishna.mp3",
      language: "Hindi",
    },
    {
      id: 12,
      title: "आप, हम और दो कप चाय",
      image: "/articles/krishna.jpg",
      audioUrl: "/audio/krishna.mp3",
      language: "Hindi",
    },
    {
      id: 13,
      title: "घड़ी से पहले की घड़ियाँ",
      image: "/articles/krishna.jpg",
      audioUrl: "/audio/krishna.mp3",
      language: "Hindi",
    },
    {
      id: 14,
      title: "डॉ. एस. जयशंकर",
      image: "/articles/krishna.jpg",
      audioUrl: "/audio/krishna.mp3",
      language: "Hindi",
    },
    {
      id: 15,
      title: "नक्षत्र - तारों से तक़दीर तक",
      image: "/articles/krishna.jpg",
      audioUrl: "/audio/krishna.mp3",
      language: "Hindi",
    },
    {
      id: 16,
      title: "मक़ामात-ए-ह़ुज़्न",
      image: "/articles/krishna.jpg",
      audioUrl: "/audio/krishna.mp3",
      language: "Hindi",
    },
    {
      id: 17,
      title: "महाकुंभ २०२५ - मेरा आत्मिक अनुभव",
      image: "/articles/krishna.jpg",
      audioUrl: "/audio/krishna.mp3",
      language: "Hindi",
    },
    {
      id: 18,
      title: "वनतारा - वन्यजीव संरक्षण की क्रांति",
      image: "/articles/krishna.jpg",
      audioUrl: "/audio/krishna.mp3",
      language: "Hindi",
    },
    {
      id: 19,
      title: "अभिजात मराठी",
      image: "/articles/krishna.jpg",
      audioUrl: "/audio/krishna.mp3",
      language: "Marathi",
    },
    {
      id: 20,
      title: "आजीचा हरवलेला बटवा",
      image: "/articles/krishna.jpg",
      audioUrl: "/audio/krishna.mp3",
      language: "Marathi",
    },
    {
      id: 21,
      title: "डिझाईन म्हणजे केवळ शोभा नव्हे",
      image: "/articles/krishna.jpg",
      audioUrl: "/audio/krishna.mp3",
      language: "Marathi",
    },
    {
      id: 22,
      title: "तिकीट आणि प्रवास",
      image: "/articles/krishna.jpg",
      audioUrl: "/audio/krishna.mp3",
      language: "Marathi",
    },
    {
      id: 23,
      title: "प्रहर आणि सुरांचा संगम",
      image: "/articles/krishna.jpg",
      audioUrl: "/audio/krishna.mp3",
      language: "Marathi",
    },
    {
      id: 24,
      title: "प्रहारांची नाट्यमय छटा - वेळेचे चित्रपटभाषांतर",
      image: "/articles/krishna.jpg",
      audioUrl: "/audio/krishna.mp3",
      language: "Marathi",
    },
    {
      id: 25,
      title: "शाश्वतानां श्लोकानां अद्यतनं प्रतिबिंबम्",
      image: "/articles/krishna.jpg",
      audioUrl: "/audio/krishna.mp3",
      language: "Marathi",
    },
    {
      id: 26,
      title: "स्वस्थस्य स्वास्थ्य रक्षणम्",
      image: "/articles/krishna.jpg",
      audioUrl: "/audio/krishna.mp3",
      language: "Marathi",
    },
  ];

  // filter articles by language
  const filteredArticles = articles.filter(
    (article) => article.language === selectedLang
  );

  // ensure selecter article is always from filtered list
  const [selectedArticle, setSelectedArticle] = React.useState(filteredArticles[0]);

  React.useEffect(() => {
    //reset to first article when language changes
    if(filteredArticles.length > 0){
      setSelectedArticle(filteredArticles[0]);
    } else {
      setSelectedArticle(null);
    }
  }, [selectedLang])

  return (
    <div className="min-h-screen bg-blue-100 p-8">
      {/*title*/}
      <h1 className="text-3xl font-bold text-center mb-8">🎵Audio Articles</h1>

      {/*Language buttons*/}
      <div className="flex gap-4 mb-8">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => setSelectedLang(lang)}
            className={`px-6 py-2 rounded-xl shadow-md transition ${
              selectedLang === lang
              ? "bg-blue-800 text-white"
              : "bg-white text-gray-700 hover:bg-gray-200"              
            }`}
          >
            {lang}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left side: list of articles */}
        <div className="col-span-1 max-h-[500px] overflow-y-auto space-y-4 pr-2">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
            <div
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            className={`flex items-center bg-white shadow-md rounded-lg p-4 cursor-pointer transition ${
              selectedArticle.id === article.id
              ? "ring-2 ring-blue-400"
              : "hover:bg-gray-50"
          }`}
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-16 h-16 object-cover rounded-md mr-4"
            />
            <p className="font-medium">{article.title}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No articles available in this language.</p>
        )}
        </div>

        {/* right side: selected article*/}
        <div className="col-span-2 bg-white shadow-xl rounded-2xl p-6 flex flex-col items-center h-[500px]">
          {
            selectedArticle ? (
              <>
                <img 
                  src={selectedArticle}
                  alt={selectedArticle.title}
                  className="w-full h-64 object-cover rounded-lg shadow-lg mb-4"
                />
                <h2 className="text-lg font-semibold text-center mb-4">
                  {selectedArticle.title}
                </h2>
                <audio controls className="w-full">
                  <source src="/audio/cricket.mp3" type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </>
            ) : (
              <p className="text-gray-600">Select an article to read.</p>
            )}
          </div>
      </div>
    </div>
  );
}