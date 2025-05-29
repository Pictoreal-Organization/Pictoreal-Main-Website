"use client";
import Image from "next/image";

const LogoLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-mist-texture">
      <div className="relative">
        <Image
          src="/V27_FINAL_LOGO.png"
          alt="Logo"
          width={100}
          height={100}
          className="z-10"
        />
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-24 h-24 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default LogoLoader;
