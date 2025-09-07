"use client";

import { useState } from "react";

const OurTeams = () => {
  const teams = {
    "| Design":
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tristique mi at sem pulvinar, at vehicula lorem fermentum. Aenean eget lectus risus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tristique mi at sem pulvinar, at vehicula lorem fermentum. Aenean eget lectus risus.",
    "| Editorial":
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin euismod lacus sed arcu volutpat, nec malesuada sapien facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Curabitur sed ligula ac magna volutpat accumsan.",
    "| Pictosocial":
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Curabitur sed ligula ac magna volutpat accumsan. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Curabitur sed ligula ac magna volutpat accumsan.",
    "| Social Media":
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat volutpat. Duis porta urna vel ligula aliquet blandit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Curabitur sed ligula ac magna volutpat accumsan.",
    "| PictoTech":
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Curabitur sed ligula ac magna volutpat accumsan.",
    "| Photography":
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt, nisl eu facilisis sodales, urna est suscipit lacus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Curabitur sed ligula ac magna volutpat accumsan.",
    "| Marketing":
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi viverra lorem at sapien ultrices, sed fermentum nisl pretium. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Curabitur sed ligula ac magna volutpat accumsan.",
    "| Production":
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac felis ac metus ullamcorper fermentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Curabitur sed ligula ac magna volutpat accumsan.",
  };

  const [activeTeam, setActiveTeam] = useState("| Design");

  return (
    <div className=" min-h-screen flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-8 text-center">
        Our Teams
      </h2>

      {/* Responsive layout container */}
      <div className="w-full h-full max-w-6xl flex flex-col md:grid md:grid-cols-[300px_1fr] gap-20 md:gap-10">
        {/* Left Menu - Buttons layout changes based on screen size */}
        <div className="w-full grid grid-cols-2 gap-6 md:grid-cols-1">
          {Object.keys(teams).map((team) => {
            const isActive = activeTeam === team;
            return (
              <button
                key={team}
                onClick={() => setActiveTeam(team)}
                className={[
                  "w-full rounded-full px-4 py-2 text-sm text-left font-semibold shadow transition-all duration-300 ease-in-out",
                  isActive
                    ? "bg-white text-black transform scale-x-110 origin-left transition-all duration-300"
                    : "bg-white text-gray-800 hover:bg-blue-200",
                ].join(" ")}
              >
                {team}
              </button>
            );
          })}
        </div>

        {/* Right Content */}
        <div className="w-full h-auto bg-white border border-blue-200 rounded-3xl shadow-sm p-8 transition-all duration-300 ease-in-out">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            {activeTeam} Team
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {teams[activeTeam]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurTeams;
