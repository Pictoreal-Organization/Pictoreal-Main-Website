"use client";

import { useState } from "react";

const OurTeams = () => {
  const teams = {
    Design:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tristique mi at sem pulvinar, at vehicula lorem fermentum. Aenean eget lectus risus.",
    Editorial:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin euismod lacus sed arcu volutpat, nec malesuada sapien facilisis.",
    Pictosocial:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Curabitur sed ligula ac magna volutpat accumsan.",
    "Social Media":
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat volutpat. Duis porta urna vel ligula aliquet blandit.",
    PictoTech:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus.",
    Photography:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt, nisl eu facilisis sodales, urna est suscipit lacus.",
    Marketing:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi viverra lorem at sapien ultrices, sed fermentum nisl pretium.",
    Production:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac felis ac metus ullamcorper fermentum.",
  };

  const [activeTeam, setActiveTeam] = useState("Design");

  return (
    <div className="bg-blue-100 min-h-screen flex flex-col items-center py-10">
      {/* Title */}
      <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">
        Our Teams
      </h2>

      <div className="flex w-10/12 max-w-6xl gap-10">
        {/* Left Menu */}
        <div className="flex flex-col gap-4 w-1/3">
          {Object.keys(teams).map((team) => (
            <button
              key={team}
              onClick={() => setActiveTeam(team)}
              className={`rounded-full shadow px-6 py-3 text-left font-semibold flex items-center ${
                activeTeam === team
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="mr-3">|</span> {team}
            </button>
          ))}
        </div>

        {/* Right Content */}
        <div className="bg-white rounded-2xl shadow p-6 w-2/3">
          <h3 className="text-xl font-bold text-gray-800 mb-3">
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
