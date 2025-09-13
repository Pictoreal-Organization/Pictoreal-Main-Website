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
  Layers,
} from "lucide-react";

// Data can be kept outside the component
const teams = {
  Design: {
    description:
      "The Design Team is where creativity meets impact. From festival posters and event branding to magazine design and campus décor, we bring ideas to life with color and craft. Through Photoshop and design SIGs, members gain hands-on skills that are applied in designing the entire college magazine. Along the way, these experiences open doors to freelancing in graphic and UI/UX design. At heart, we’re the team that makes Pictoreal look and feel unforgettable on paper, on screen, and across campus",
    icon: Palette,
    stats: [
      "Magazine Design and Layouts",
      "Creative Posters & Event Branding",
      "⁠Campus Decor",
    ],
  },
  Editorial: {
    description:
      "The Editorial Team creates and manages all content, from editing articles and blogs to drafting captions for festivals and important days. We also edit the entire college magazine, which includes articles, poems, and contributions from students across the campus.",
    icon: Edit3,
    stats: ["⁠ Magazine Editing", "Feature Articles & Blogs", "Draft Captions"],
  },
  Pictosocial: {
    description:
      "The Pictosocial Team is where compassion meets community. From planting trees and teaching in schools to cleanliness drives, donation camps, and social hackathons, we bring people together to create change that matters. Through every activity, members discover the joy of giving back, while growing friendships and values that last far beyond campus life.",
    icon: Users,
    stats: [
      "Environmental Care & Cleanliness",
      "Educational Outreach",
      "Health & Donation Campaigns",
    ],
  },
  "Social Media": {
    description:
      "The Social Media Team looks after content creation, which involves designing visuals; to create appealing posts, stories, reels, and infographics; digital branding, focusing on promoting the club and increasing online reach; and strategic planning, used for organizing content schedules and running social media campaigns and contests. The team also promotes PictoTalents - our platform to celebrate and appreciate the talent of PICT students. People having various talents like singing, dancing, painting, playing musical instruments, poetry writing, story telling etc. showcase their skills through this platform.",
    icon: MessageCircle,
    stats: [
      "Digital branding",
      "⁠⁠Content Creation & Design",
      "Creative Brainstorming and Engagement",
    ],
  },
  PictoTech: {
    description:
      "The Tech Team is where coding turns into real impact. We start with the basics: web development, app building, and backend systems - training members in tools and practices that matter in the industry. Inside the club, these skills come alive through projects like event websites, apps for tracking, and digital platforms that keep Pictoreal connected. Beyond the club, this experience becomes a launchpad: members step into freelancing, internships, hackathons, and career paths as confident developers and problem-solvers.",
    icon: Code2,
    stats: ["Web Development", "Mobile App Development", "Automation & Tools"],
  },
  Photography: {
    description:
      "The Photography Team is about more than just taking pictures , it’s about freezing moments, capturing memories, and bringing stories to life. Every photo tells a tale: the highlights of college events, the moments preserved for the annual magazine, the milestones of the graduating batch (BE photoshoots), or the narratives expressed through photo stories. Through our lens, we create images that don’t just illustrate, but connect, inspire, and stay with you.",
    icon: Camera,
    stats: [
      "Event Coverage",
      "Annual Magazine & BE Photoshoots",
      "Photo Stories, Contests & Workshops",
    ],
  },
  Marketing: {
    description:
      "The Marketing Team is where strategy meets opportunity. From securing monetary sponsorships to collaborating with brands for coupons, vouchers and support, we ensure every partnership adds value to our events. Our role goes beyond funding, we build strong connections that enhance the magazine’s reach and impact. At core, we’re the team that fuels Pictoreal by bringing sponsors, benefits and lasting collaborations.",
    icon: TrendingUp,
    stats: [
      "Sponsorship Acquisition",
      "Partnerships & Collaborations",
      "Brand engagement",
    ],
  },
  Production: {
    description:
      "The Production Team brings ideas to life through videos and sound.Whether it’s highlight videos, podcasts or animations, we create the multimedia pieces that make Pictoreal stand out. Members sharpen their skills in filming, editing and motion graphics through SIGs and practice. Our proud project Pictopods, is fully produced in-house, reflecting the team’s creativity and effort.At heart, we are the team that captures stories and transforms them into videos and podcasts that last forever.",
    icon: Play,
    stats: [
      "⁠Event Highlights & Recaps",
      "Podcast Editing",
      "⁠Motion Graphics & Animations",
    ],
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

            const activeClass =
              "bg-[#003366] text-white shadow-lg shadow-[#407499]/30";

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
