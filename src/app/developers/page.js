"use client";  
import React, { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdError } from "react-icons/md";

const TeamPage = () => {
  const [linkErrors, setLinkErrors] = useState({});

  const teamMembers = [
    {
      id: 1,
      name: "Tushar Talekar",
      image:"/developers/tushartalekar.jpg",
      github:"https://github.com/tushartalekar",
      linkedin: "https://www.linkedin.com/in/tushar-talekar-a749b4289/"
    },

    {
      id: 2,
      name: "Hemangi Patil",
      image: "/developers/Hemangi_Patil.jpg",
      github: "https://GitHub.com/hemangi1324",
      linkedin: "https://www.linkedin.com/in/hemangi-patil-85854132b/",
    },
    {
      id: 3,
      name: "Sharvari Ballal",
      image: "/developers/sharvariballal.jpg",
      github: "https://github.com/sharvariballal",
      linkedin: "https://www.linkedin.com/in/sharvari-ballal-639260342/",
    },
    {
      id: 4,
      name: "Gargee Parishwad",
      image: "/developers/Gargee_Parishwad.jpg",
      github: "https://github.com/Gargee-Parishwad",
      linkedin: "https://www.linkedin.com/in/gargee-parishwad-b92629377/",
    },
    {
      id: 5,
      name: "Salina Tamboli",
      image: "/developers/Salina_Tamboli.jpg",
      github: "https://github.com/Salina00",
      linkedin: "https://www.linkedin.com/in/salina-tamboli-a30b59328/",
    },
    
    {
      id: 6,
      name: "Jay Kotwal",
      image: "/developers/Jay_kotwal.jpg",
      github: "htthttps://github.com/Jkotwal01",
      linkedin: "https://www.linkedin.com/in/jay-kotwal/",
    },
    {
      id: 7,
      name: "Hrishikesh Mirashe",
      image: "/developers/Hrishikesh_Mirashe.jpg",
      github: "https://github.com/rushikeshMirashe",
      linkedin: "http://www.linkedin.com/in/hrishikesh-mirashe-1683242aa/",
    },
    {
      id: 8,
      name: "Poonam Pawar",
      image: "/developers/Poonam_Pawar.jpg",
      github: "https://github.com/poonam-1209-spec",
      linkedin: "https://www.linkedin.com/in/poonam-pawar-1384562a7/",
    },
    
    {
      id: 9,
      name: "Mahi Goel",
      image: "/developers/Mahi_Goel.jpg",
      github: "https://github.com/mahigoel0110",
      linkedin: "https://www.linkedin.com/in/mahi-goel-2ab563331/",
    },
    {
      id: 10,
      name: "Manas Yeola",
      image: "/developers/Manas_Yeola.jpg",
      github: "https://github.com/ManasYeola",
      linkedin: "https://www.linkedin.com/in/manas-yeola/",
    },
    {
      id: 11,
      name: "Aditya Tidake",
      image: "/developers/Aditya_Tidake.jpeg",
      github: "https://github.com/AdityaTidake",
      linkedin: "https://www.linkedin.com/in/aditya-tidake-977504292/",
    },
    {
      id: 12,
      name: "Vedika Bopche",
      image: "/developers/Vedika_Bopche.jpg",
      github: "https://github.com/vedikabops",
      linkedin: "https://www.linkedin.com/in/vedika-bopche-588538376/",
    },
    {
      id: 13,
      name: "Payal Talreja",
      image: "/developers/Payal_Talreja.jpg",
      github: "https://github.com/payaltalreja08",
      linkedin: "https://www.linkedin.com/in/payal-talreja-94b52828a/",
    },
    {
      id: 14,
      name: "Madhura Deshmukh",
      image: "/developers/Madhura_Deshmukh.jpg",
      github: "https://github.com/madhura0805",
      linkedin: "https://www.linkedin.com/in/madhura-deshmukh-0692a5277",
    },
    {
      id: 15,
      name: "Riddhi Lahare",
      image: "/developers/Riddhi_Lahare.jpg",
      github: "https://github.com/riddhilahare14",
      linkedin: "https://www.linkedin.com/in/riddhi-lahare?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app ",
    },
    {
      id: 16,
      name: "Manas Gawali",
      image: "/developers/Manas_Gawali.jpg",
      github: "https://github.com/ManasGawali",
      linkedin: "https://www.linkedin.com/in/manas-gawali-ab000128b/",
    }    
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
        <h1 className="text-4xl font-bold text-firefly mb-4">Development Team</h1>
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