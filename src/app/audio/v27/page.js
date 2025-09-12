// File: app/audio/v27/page.js
import Link from "next/link";
import React from "react";

export default function SelectLanguagePage() {
  const languages = [
    { code: "eng", name: "English" },
    { code: "hin", name: "Hindi" },
    { code: "mar", name: "Marathi" },
  ];

  return (
    <div className="min-h-screen bg-[#DDF1Ff] flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#003366] mb-2 drop-shadow-lg">
          Audio Articles 🎵
        </h1>
        <p className="text-lg text-gray-600 mb-8">Please select a language</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-5">
        {languages.map((lang) => (
          <Link
            key={lang.code}
            href={`/audio/v27/${lang.code}`}
            className="group"
          >
            <div
              className="bg-white text-[#003366] text-xl font-semibold w-60 rounded-xl shadow-lg p-6 text-center transition-all duration-300 ease-in-out
                         hover:bg-[#003366] hover:text-white hover:scale-105"
            >
              {lang.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}