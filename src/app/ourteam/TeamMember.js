"use client"
import React, { useState } from 'react';
import Image from "next/image";

const TeamMember = ({ names, imageSrc, altText, hoverKey, height = 300 }) => {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="w-full md:w-full p-0 md:p-4" style={{ margin: '0' }}>
      <div
        className="member relative shadow-md shadow-black overflow-hidden rounded-md grid grid-cols-1"
        onMouseEnter={() => setHovered(hoverKey)}
        onMouseLeave={() => setHovered(null)}
        style={{
          border: '1px solid var(--firefly)',
          transition: 'transform 0.5s ease',
          transform: hovered === hoverKey ? 'scale(1.01)' : 'scale(1)',
        }}
      >
        <div className="pic overflow-hidden w-full rounded-t-md" style={{ height: `${height}px` }}>
          <Image
            className="w-full h-full object-cover rounded-t-md"
            src={imageSrc}
            alt={altText}
            loading="lazy"
            width={500}  // Pick something reasonable
            height={height}
          />
        </div>
        <div
          style={{ backgroundColor: "#0A192E", padding: '16px 0' }}
          className="text-center rounded-b-md"
        >
          {names.map((name, index) => (
            <h4
              key={index}
              className="text-submarine font-bold font-body text-white"
              style={{ fontSize: '15px' }}
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
