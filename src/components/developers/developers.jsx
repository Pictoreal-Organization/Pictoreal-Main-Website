"use client";  
import React, { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdError } from "react-icons/md";

const TeamPage = () => {
  const [linkErrors, setLinkErrors] = useState({});

  const teamMembers = [
    {
      id: 1,
      name: "Sanavi Kulkarni",
      image: "/developers/Sanavi_Kulkarni.jpg",
      github: "https://github.com/Sanavi05",
      linkedin: "https://www.linkedin.com/in/sanavikulkarni",
    },
    {
      id: 2,
      name: "Khanak Kumar",
      image: "/developers/Khanak_Kumar.jpg",
      github: "https://github.com/KhanakKumar",
      linkedin: "https://www.linkedin.com/in/khanak-kumar-133a1226b/?trk=opento_sprofile_topcard",
    },
    {
      id: 3,
      name: "Shruti Mone",
      image: "/developers/Shruti_Mone.jpg",
      github: "https://github.com/ShrutiMone",
      linkedin: "https://linkedin.com/in/shruti-mone-b37457251",
    },
    {
      id: 4,
      name: "Aditi Naik",
      image: "/developers/Aditi_Naik.jpg",
      github: "https://github.com/Aditinaik2004",
      linkedin: "https://www.linkedin.com/in/aditinaik2004/",
    },
    {
      id: 5,
      name: "Madhura Deshmukh",
      image: "/developers/Madhura_Deshmukh.jpg",
      github: "https://github.com/madhura0805",
      linkedin: "https://www.linkedin.com/in/madhura-deshmukh-0692a5277",
    },
    {
      id: 6,
      name: "Aarya Patel",
      image: "/developers/Aarya_Patel.jpg",
      github: "https://github.com/AARYA855",
      linkedin: "https://www.linkedin.com/in/aarya-patel-20627a321/",
    },
    {
      id: 7,
      name: "Sakshi Narkhede",
      image: "/developers/Sakshi_Narkhede.jpg",
      github: "https://github.com/sakshi-3105",
      linkedin: "https://www.linkedin.com/in/sakshi-narkhede-2618b5291/",
    },
    {
      id: 8,
      name: "Monika Kamble",
      image: "/developers/Monika_Kamble.jpg",
      github: "https://github.com/Monikakamble503",
      linkedin: "https://www.linkedin.com/in/monika100/",
    },
    {
      id: 9,
      name: "Manas Gawali",
      image: "/developers/Manas_Gawali.jpg",
      github: "https://github.com/ManasGawali",
      linkedin: "https://www.linkedin.com/in/manas-gawali-ab000128b/",
    },
    {
      id: 10,
      name: "Vihan Wani",
      image: "/developers/Vihan_Wani.jpg",
      github: "https://github.com/VIHAN-07",
      linkedin: "https://www.linkedin.com/in/vihan-wani-b8b334316",
    },
    {
      id: 11,
      name: "Saanvi Bhavsar",
      image: "/developers/Saanvi_Bhavsar.jpg",
      github: "https://github.com/Saanvi-B-star",
      linkedin: "https://www.linkedin.com/in/saanvi-bhavsar-b2a460299/",
    },
    {
      id: 12,
      name: "Ayan Pathan",
      image: "/developers/Ayan_Pathan.jpg",
      github: "https://github.com/ayan0211",
      linkedin: "https://www.linkedin.com/in/ayan-pathan-67705a285/",
    },
  ];

  const handleProfileClick = (url, memberId) => {
    try {
      window.open(url, "_blank");
    } catch (error) {
      setLinkErrors((prev) => ({
        ...prev,
        [memberId]: true,
      }));
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#3A0622] mb-4">Development Team</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-5">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 focus-within:ring-2 focus-within:ring-blue-500 min-h-[20rem] mb-10"
          >
            <div className="relative pb-80">
              <img
                src={member.image}
                alt={member.name}
                className="absolute h-full w-full object-cover"
              />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
              <div className="mt-4 flex items-center space-x-4">
                <button
                  onClick={() => handleProfileClick(member.github, member.id)}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  aria-label={`Visit ${member.name}'s GitHub profile`}
                >
                  {linkErrors[member.id] ? (
                    <MdError className="w-6 h-6 text-red-500" />
                  ) : (
                    <FaGithub className="w-6 h-6" />
                  )}
                </button>

                <button
                  onClick={() => handleProfileClick(member.linkedin, member.id)}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  aria-label={`Visit ${member.name}'s LinkedIn profile`}
                >
                  {linkErrors[member.id] ? (
                    <MdError className="w-6 h-6 text-red-500" />
                  ) : (
                    <FaLinkedin className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;
