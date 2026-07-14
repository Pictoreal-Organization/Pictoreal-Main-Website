// "use client"
// import React, { useState } from 'react';
// import Image from "next/image";

// const TeamMember = ({ names, imageSrc, altText, hoverKey, height = 300 }) => {
//   const [hovered, setHovered] = useState(null);

//   return (
//     <div className="w-full md:w-full p-0 md:p-4" style={{ margin: '0' }}>
//       <div
//         className="member relative shadow-md shadow-black overflow-hidden rounded-md grid grid-cols-1"
//         onMouseEnter={() => setHovered(hoverKey)}
//         onMouseLeave={() => setHovered(null)}
//         style={{
//           border: '1px solid var(--firefly)',
//           transition: 'transform 0.5s ease',
//           transform: hovered === hoverKey ? 'scale(1.01)' : 'scale(1)',
//         }}
//       >
//         <div className="pic overflow-hidden w-full rounded-t-md" style={{ height: `${height}px` }}>
//           <Image
//             className="w-full h-full object-cover rounded-t-md"
//             src={imageSrc}
//             alt={altText}
//             loading="lazy"
//             width={500}  // Pick something reasonable
//             height={height}
//           />
//         </div>
//         <div
//           style={{ backgroundColor: "#0A192E", padding: '16px 0' }}
//           className="text-center rounded-b-md"
//         >
//           {names.map((name, index) => (
//             <h4
//               key={index}
//               className="text-submarine font-bold font-body text-white"
//               style={{ fontSize: '15px' }}
//             >
//               {name}
//             </h4>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeamMember;

"use client"
import React, { useState } from 'react';
import Image from "next/image";

const TeamMember = ({ names, imageSrc, altText, hoverKey, height = 300, responsiveMobile }) => {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="w-full md:w-full p-0 md:p-4">
      <div
        className="member relative shadow-md shadow-black overflow-hidden rounded-md"
        onMouseEnter={() => setHovered(hoverKey)}
        onMouseLeave={() => setHovered(null)}
        style={{
          border: '1px solid var(--firefly)',
          transition: 'transform 0.5s ease',
          transform: hovered === hoverKey ? 'scale(1.01)' : 'scale(1)',
        }}
      >
        {/* Image */}
        <div
          className="pic overflow-hidden w-full rounded-t-md"
          style={{
            height: responsiveMobile ? undefined : `${height}px`, // fixed height only if not responsive
            maxHeight: responsiveMobile ? '400px' : undefined,   // optional max for first 2 cards
          }}
        >
          <Image
            src={imageSrc}
            alt={altText}
            loading="lazy"
            className={responsiveMobile ? "w-full h-auto object-contain rounded-t-md" : "w-full h-full object-cover rounded-t-md"}
            width={500}
            height={height} // Next.js requires width+height, h-auto will scale automatically if responsiveMobile
          />
        </div>

        {/* Names */}
        <div
          className="text-center rounded-b-md py-4"
          style={{ backgroundColor: "#051C1C" }}
        >
          {names.map((name, index) => (
            <div
              key={index}
              className="text-submarine font-bold font-body text-white text-xl md:text-2xl"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default TeamMember;
