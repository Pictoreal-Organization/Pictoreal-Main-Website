"use client";

import { useState } from "react";

const OurTeams = () => {
  const teams = {
    "| Design":
      " hello world Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tristique mi at sem pulvinar, at vehicula lorem fermentum. Aenean eget lectus risus.",
    "| Editorial":
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin euismod lacus sed arcu volutpat, nec malesuada sapien facilisis.",
    "| Pictosocial":
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Curabitur sed ligula ac magna volutpat accumsan.",
    "| Social Media":
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat volutpat. Duis porta urna vel ligula aliquet blandit.",
    "| PictoTech":
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus.",
    "| Photography":
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt, nisl eu facilisis sodales, urna est suscipit lacus.",
    "| Marketing":
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi viverra lorem at sapien ultrices, sed fermentum nisl pretium.",
    "| Production":
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac felis ac metus ullamcorper fermentum.",
  };

  const [activeTeam, setActiveTeam] = useState("Design");

  return (
    <div className="bg-blue-100 min-h-screen flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-8 text-center">
        Our Teams
      </h2>

      {/* Layout: stack on mobile, side-by-side from md */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 md:gap-10">
        {/* Left Menu */}
        <div className="flex flex-col gap-3">
          {Object.keys(teams).map((team) => {
            const isActive = activeTeam === team;
            return (
              <button
                key={team}
                onClick={() => setActiveTeam(team)}
                className={[
                  "w-full rounded-full px-6 py-3 text-left font-semibold shadow transition-all duration-300 ease-in-out",
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
        <div className=" m-7 w-[636px] h-[470px] bg-white rounded-2xl shadow p-8 transition-all duration-300 ease-in-out">
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
