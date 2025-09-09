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
  Lightbulb,
  CheckCircle,
  CheckCircle2,
  Award,
  Compass,
  Activity,
  Layers
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
        <ActiveIcon className="w-32 h-32 text-[#111C33] transform -rotate-12" />
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 bg-[#003366] rounded-xl shadow-lg shadow-[#003366]/20">
            <ActiveIcon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-3xl font-body font-bold text-[#111C33]">
              {teamName} Team
            </h3>
          </div>
        </div>
        <p className="text-[#111C33]/80 font-body leading-relaxed mb-8 text-base">
          {teamData.description}
        </p>
        <div className="mb-6">
          <h4 className="text-lg font-body text-[#111C33] mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#111C33]" />
            Specializations
          </h4>
          <div className="flex flex-col gap-3">
            {teamData.stats.map((stat) => (
              <div
                key={stat}
                className="flex items-center gap-3 p-3 bg-black/5 rounded-lg"
              >
                <div className="w-2 h-2 bg-[#003366] rounded-full"></div>
                <span className="text-[#111C33] font-body font-bold text-sm">
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
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-[#0A192E] mb-2">
          Our Teams
        </h1>
        <div className="flex justify-center items-center gap-2 text-[#76879E]">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-body">
            Meet the talented people behind our success
          </span>
          <Sparkles className="w-4 h-4" />
        </div>
      </div>

      {/* 4. The main layout now handles both mobile and desktop structures */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center w-11/12 max-w-7xl">
        {/* Left column / Accordion container */}
        <div className="flex flex-col gap-3 md:w-1/4">
          {Object.entries(teams).map(([teamName, teamData], index) => {
            const TeamIcon = teamData.icon;
            const isActive = activeTeam === teamName;

            const activeClass = "bg-[#003366] text-white shadow-lg shadow-[#407499]/30"

            return (
              // Use React Fragment to group button and its mobile content
              <React.Fragment key={teamName}>
                <button
                  onClick={() => handleTeamClick(teamName)}
                  className={`group font-body w-full relative overflow-hidden rounded-xl px-4 py-2 md:px-3 md:py-2 text-sm md:text-base font-semibold flex items-center transition-all duration-300 transform md:hover:scale-105 ${
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
                    <span>{teamName}</span>
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
            <div className="h-80 flex items-center justify-center bg-white/70 backdrop-blur-sm border border-black/5 rounded-2xl shadow-xl">
              <div className="text-[#111C33]/60 font-body">
                Select a team to see the details
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OurTeams;
