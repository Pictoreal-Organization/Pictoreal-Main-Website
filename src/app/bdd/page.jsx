"use client";

import Image from "next/image";
import ArrowBtn from "../../components/homepage/arrowbtn.jsx"; // adjust path if needed

export default function BDDComingSoon() {
  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#DDF1FF] flex items-center justify-center px-6">
      <div className="max-w-2xl text-center">

        {/* Optional Illustration */}
        <div className="flex justify-center mb-6">
          <Image
            src="/bdd/bdd_vector.png"   // optional image
            alt="Blood Donation Drive"
            width={300}
            height={300}
          />
        </div>

        <h1 className="text-[2.8rem] md:text-[3.5rem] font-heading font-bold text-[#001730]">
          Blood Donation Drive
        </h1>

        <p className="mt-4 text-[18px] md:text-[20px] text-[#001730] font-heading">
          Registrations are opening soon
        </p>

        <div className="mt-6 inline-block px-6 py-3 rounded-full bg-red-500 text-white font-bold text-lg shadow-lg">
          🩸 Starting 1st February
        </div>

        <p className="mt-8 text-gray-600 text-base">
          Scan this QR and check back soon.  
          Your one step can save a life ❤️
        </p>

        {/* Optional button (can be disabled later) */}
        <div className="mt-10 flex justify-center">
          <ArrowBtn text="Back to Home" path="/" />
        </div>

      </div>
    </div>
  );
}
