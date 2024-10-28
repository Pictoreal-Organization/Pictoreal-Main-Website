"use client"

import React, { useState } from 'react';

const TeamMember = ({ names, imageSrc, altText, hoverKey }) => {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="w-full md:w-5/6 p-0 md:p-4 "style={{ margin: '0' }}>
      <div
        className="member relative shadow-md overflow-hidden rounded-md grid grid-cols-1"
        onMouseEnter={() => setHovered(hoverKey)}
        onMouseLeave={() => setHovered(null)}
        style={{
          border: '1px solid #3A0622',
          transition: 'transform 0.5s ease',
          transform: hovered === hoverKey ? 'scale(1.01)' : 'scale(1)',
        }}
      >
        <div className="pic overflow-hidden w-full rounded-t-md">
          <img
            className="w-full h-auto object-cover rounded-t-md"
            src={imageSrc}
            alt={altText}
          />
        </div>
        <div
          style={{ backgroundColor: '#3A0622', padding: '16px 0' }}
          className="text-center rounded-b-md"
        >
          {/* Display names. If there's one name, it'll be centered, else list */}
          {names.map((name, index) => (
            <h4
              key={index}
              className="text-[#CAA656] font-bold"
              style={{ fontFamily: 'Raleway, sans-serif', fontSize: '20px' }}
            >
              {name}
            </h4>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamMember;