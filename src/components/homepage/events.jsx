"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Events = () => {
  const router = useRouter();

  const events = [
    {
      title: "Magazine Release",
      image: "/events/e16.png",
      id: "magazine-release",
    },
    {
      title: "CAREER GUIDANCE",
      image: "/events/e1.png",
      id: "career-guidance",
    },
    { title: "MANTHAN", image: "/events/e2.png", id: "manthan" },
    { title: "PICTOFEST", image: "/events/e3.png", id: "pictfest" },
    { title: "Blood Donation", image: "/events/e4.png", id: "blood-donation" },
    { title: "BE Photoshoot", image: "/events/e6.png", id: "be-photoshoot" },
    { title: "Parichay", image: "/events/e10.png", id: "parichay" },
    {
      title: "Pictosocial Visit",
      image: "/events/e14.png",
      id: "pictosocial-visit",
    },
    { title: "Interviews", image: "/events/e9.png", id: "interviews" },
    { title: "amche bappa", image: "/events/e11.png", id: "amche-bappa" },
    { title: "NGO visit", image: "/events/e15.png", id: "ngo-visit" },
    {
      title: "Cleanliness drive",
      image: "/events/e13.png",
      id: "cleanliness-drive",
    },
    { title: "Donation Drive", image: "/events/e5.png", id: "donation-drive" },
  ];

  const handleEventClick = (eventId) => {
    // Navigate to the Gallery page with the event ID as a query parameter
    router.push(`/gallery?eventId=${eventId}`);
  };

  return (
    <div className="min-h-screen bg-mist-texture mb-10">
      <section id="events" className="w-full">
        <h2 className="text-[40px] font-[700] text-center mb-[30px] p-[10px] text-firefly font-family-['Raleway', sans-serif]">
          OUR EVENTS
        </h2>
        <div className="container w-10/12 px-3 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 justify-items-center">
            {events.map((event, index) => (
              <FlipCard
                key={index}
                event={event}
                onEventClick={() => handleEventClick(event.id)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const FlipCard = ({ event, onEventClick }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => setFlipped(!flipped);

  return (
    <div
      className={`rounded-md shadow-lg overflow-hidden w-full ${
        flipped ? "flipped" : ""
      }`}
      style={{
        height: "0",
        paddingBottom: "100%",
        position: "relative",
      }}
      onClick={onEventClick} // Trigger event navigation on click
    >
      <div className="absolute inset-0 flex h-full">
        <div className="w-1/2 bg-firefly p-6 flex items-center justify-center relative"></div>
        <div className="w-1/2 bg-twilight p-6 flex flex-col items-center justify-center relative"></div>
        <div
          className={`absolute flex items-center justify-center h-full w-full ${
            flipped ? "backside" : "frontside"
          }`}
        >
          {flipped ? (
            <div className="flex items-center justify-center h-full w-full">
              <div className="text-center text-white p-4">
                <a
                  href={`/gallery?eventId=${event.id}`}
                  className="text-[#f1d32b] underline mt-4 block"
                >
                  View Photos
                </a>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full w-full">
              <div className="flex flex-col items-center">
                <Image
                  src={event.image}
                  alt={event.title}
                  width={100}
                  height={100}
                  className="rounded-sm filter invert mb-[12px] sm:w-24 sm:h-24"
                />
                <h3 className="text-xl sm:text-3xl tracking-widest font-bold text-mist text-center font-family-['Raleway', sans-serif] mb-[2px]">
                  {event.title.toUpperCase()}
                </h3>
                <a
                  href={`/gallery?eventId=${event.id}`}
                  className="bg-[#f1d32b] hover:opacity-70 text-black opacity-80 text-sm font-normal py-[2px] px-[4px] 
                  rounded-sm transition duration-300 ease-in-out hover:scale-110 cursor-pointer sm:py-[4px] sm:px-[8px] mt-2"
                >
                  View Photos
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
