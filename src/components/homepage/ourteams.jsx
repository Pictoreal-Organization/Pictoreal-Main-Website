"use client";

import React, { useState } from "react";
import {
  Palette,
  Edit3,
  MessageCircle,
  Code2,
  Camera,
  TrendingUp,
  Play,
  Users,
  Sparkles,
  Zap,
} from "lucide-react";

// Data can be kept outside the component
const teams = {
  Design: {
    description:
      "We are the architects of aesthetics, crafting intuitive and beautiful user experiences. Our design philosophy centers on user-centric solutions that are both functional and delightful.",
    icon: Palette,
    stats: ["UI/UX Design", "Brand Identity", "Product Design"],
  },
  Editorial: {
    description:
      "Crafting compelling narratives is our passion. We create and refine content that engages, informs, and resonates with audiences, ensuring every word serves a purpose.",
    icon: Edit3,
    stats: ["Content Strategy", "Copywriting", "SEO Optimization"],
  },
  Pictosocial: {
    description:
      "We build and nurture online communities. Our team develops strategies to connect with audiences across social platforms, fostering engagement and building lasting relationships.",
    icon: Users,
    stats: ["Social Strategy", "Community Management", "Influencer Relations"],
  },
  "Social Media": {
    description:
      "Our mission is to amplify brand voices in the digital world. We manage social channels, create impactful content, and analyze data to drive growth and engagement.",
    icon: MessageCircle,
    stats: ["Content Creation", "Platform Management", "Analytics & Reporting"],
  },
  PictoTech: {
    description:
      "We are the builders of the digital future. Our developers create robust, scalable, and cutting-edge web and mobile applications that solve real-world problems.",
    icon: Code2,
    stats: ["Web Development", "Mobile Apps", "Cloud Solutions"],
  },
  Photography: {
    description:
      "Through our lens, we capture moments that tell a story. We specialize in creating high-quality visual assets that elevate brands and capture imaginations.",
    icon: Camera,
    stats: ["Product Photography", "Event Coverage", "Creative Shoots"],
  },
  Marketing: {
    description:
      "We are the engine of growth. Our team devises and executes strategic marketing campaigns that build brand awareness, drive leads, and deliver measurable results.",
    icon: TrendingUp,
    stats: ["Campaign Strategy", "Brand Marketing", "Growth Hacking"],
  },
  Production: {
    description:
      "From concept to final cut, we bring ideas to life. Our production team creates high-quality video and audio content that captivates and inspires.",
    icon: Play,
    stats: ["Video Production", "Audio Engineering", "Post-Production"],
  },
};

// 1. Extracted the content panel into a reusable component
const TeamContent = ({ teamName, teamData }) => {
  const ActiveIcon = teamData.icon;
  return (
    <div className="bg-white/70 backdrop-blur-sm border border-black/5 rounded-2xl shadow-xl p-8 relative overflow-hidden mt-4 md:mt-0">
      <div className="absolute top-8 right-8 opacity-[0.03]">
        <ActiveIcon className="w-32 h-32 text-[#0A192E] transform -rotate-12" />
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 bg-[#407499] rounded-xl shadow-lg shadow-[#407499]/20">
            <ActiveIcon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-3xl font-serif font-bold text-[#0A192E]">
              {teamName} Team
            </h3>
          </div>
        </div>
        <p className="text-[#111C33]/80 leading-relaxed mb-8 text-base">
          {teamData.description}
        </p>
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-[#0A192E] mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#407499]" />
            Specializations
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {teamData.stats.map((stat) => (
              <div
                key={stat}
                className="flex items-center gap-3 p-3 bg-black/5 rounded-lg"
              >
                <div className="w-2 h-2 bg-[#407499] rounded-full"></div>
                <span className="text-[#111C33] font-medium text-sm">
                  {stat}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const OurTeams = () => {
  // 2. Updated state to allow for 'null' (nothing selected/collapsed)
  // We keep "Design" as default for a better desktop experience on first load.
  const [activeTeam, setActiveTeam] = useState("Design");

  // 3. New handler to toggle selection
  const handleTeamClick = (teamName) => {
    if (activeTeam === teamName) {
      setActiveTeam(null); // Collapse if the same team is clicked again
    } else {
      setActiveTeam(teamName); // Expand the new team
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-[#DCF1FF] min-h-screen flex flex-col items-center justify-center py-10 font-sans text-[#111C33]">
      <div className="relative mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0A192E] mb-2">
          Our Teams
        </h2>
        <div className="flex justify-center items-center gap-2 text-[#407499]">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">
            Meet the talented people behind our success
          </span>
          <Sparkles className="w-4 h-4" />
        </div>
      </div>

      {/* 4. The main layout now handles both mobile and desktop structures */}
      <div className="flex flex-col md:flex-row w-11/12 max-w-7xl gap-8">
        {/* Left column / Accordion container */}
        <div className="flex flex-col gap-3 md:w-1/3">
          {Object.entries(teams).map(([teamName, teamData], index) => {
            const TeamIcon = teamData.icon;
            const isActive = activeTeam === teamName;
            const isAlternate = index % 2 === 0;

            const activeClass = isAlternate
              ? "bg-[#407499] text-white shadow-lg shadow-[#407499]/30"
              : "bg-[#407499] text-[#DCF1FF] shadow-lg shadow-[#407499]/30";

            return (
              // Use React Fragment to group button and its mobile content
              <React.Fragment key={teamName}>
                <button
                  onClick={() => handleTeamClick(teamName)}
                  className={`group w-full relative overflow-hidden rounded-xl px-6 py-4 text-left font-semibold flex items-center transition-all duration-300 transform md:hover:scale-105 ${
                    isActive
                      ? activeClass
                      : "bg-transparent text-[#111C33]/70 hover:bg-black/5 hover:text-[#111C33]"
                  }`}
                >
                  <div className="flex items-center w-full">
                    <TeamIcon
                      className={`w-5 h-5 mr-4 transition-transform duration-300 ${
                        isActive
                          ? "rotate-12 scale-110"
                          : "group-hover:rotate-6"
                      }`}
                    />
                    <span className="flex-1">{teamName}</span>
                  </div>
                </button>

                {/* 5. Mobile-only accordion content, appears below the button */}
                {isActive && (
                  <div className="md:hidden">
                    <TeamContent teamName={teamName} teamData={teamData} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* 6. Desktop-only content panel, appears on the right */}
        <div className="hidden md:block md:w-2/3">
          {activeTeam ? (
            <TeamContent teamName={activeTeam} teamData={teams[activeTeam]} />
          ) : (
            <div className="h-full flex items-center justify-center bg-white/70 backdrop-blur-sm border border-black/5 rounded-2xl shadow-xl">
              <p className="text-[#111C33]/60">
                Select a team to see the details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OurTeams;
