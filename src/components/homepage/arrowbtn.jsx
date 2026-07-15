"use client";
import React from "react";
import { useRouter } from "next/navigation";

const ArrowBtn = ({
  text,
  path,
  textColor = "#D8ECEC",
  bgColor = "#0A2B2B",
  hoverColor = "#145353",
  borderColor = null,   
  circleBg = "#D8ECEC",  
  arrowColor = "#0A2B2B"
}) => {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        if (path.startsWith("http://") || path.startsWith("https://")) {
          window.open(path, "_blank");
        } else {
          router.push(path);
        }
      }}
      className={`flex items-center text-white pl-6 pr-2 py-1.5 rounded-full 
        transform transition duration-500 ease-in-out hover:scale-110 font-body cursor-pointer`}
      style={{
        backgroundColor: bgColor,
        border: borderColor ? `1px solid ${borderColor}` : "none",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = hoverColor;
        if (borderColor) e.currentTarget.style.borderColor = borderColor;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = bgColor;
        if (borderColor) e.currentTarget.style.borderColor = borderColor;
      }}
    >
      <span style={{ color: textColor }}>{text}</span>
      <span
        className="ml-3 w-8 h-8 flex items-center justify-center rounded-full"
        style={{
          backgroundColor: circleBg,
          border: borderColor ? `1px solid ${borderColor}` : "none",
        }}
      >
        <svg
          className="w-4.5 h-4.5 text-[#00224A]"
          fill="none"
          stroke={arrowColor}
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 7L7 17M17 7h-6m6 0v6"
          />
        </svg>
      </span>
    </button>
  );
};

export default ArrowBtn;
