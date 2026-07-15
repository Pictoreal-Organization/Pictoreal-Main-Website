// "use client";
// import React, { useState, useEffect, useCallback } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
// import ArrowBtn from "./arrowbtn";

// const EventsCarousel = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);
//   const [isTransitioning, setIsTransitioning] = useState(false);

//   const events = [
//     { id: 1, name: "Magazine Release Event", image: "/home_page/Prahar.jpg" },
//     { id: 2, name: "Manthan", image: "/home_page/Manthan.jpg" },
//     { id: 3, name: "Parichay", image: "/home_page/Parichay1.jpg" },
//     { id: 4, name: "Blood Donation Drive", image: "/home_page/BDD.jpg" },
//     { id: 5, name: "PICTOFEST", image: "/home_page/Pictofest.jpg" },
//     { id: 6, name: "BE Photoshoot", image: "/home_page/BE_Shoot.jpg" },
//     { id: 7, name: "Interviews", image: "/home_page/Interview.jpg" },
//     { id: 8, name: "Career Guidance", image: "/home_page/Career_guidance.jpg" },
//     { id: 9, name: "Old Age Home Visit", image: "/home_page/Old_Age_Home_Visit.jpg" },
//     { id: 10, name: "Picto Plants", image: "/home_page/Pictoplants.jpg" },
//     { id: 11, name: "Orphanage Visit", image: "/home_page/Orphange_Visit.jpg" },
//     { id: 12, name: "Cleanliness Drive", image: "/home_page/Cleanliness.jpg" },
//     { id: 13, name: "Amche Bappa", image: "/home_page/amche_bappa.jpg" },
//   ];
  
//   const generateEventId = (name) => {
//     return name.toLowerCase().replace(/\s+/g, "-");
//   };

//   const getPrevIndex = useCallback(() => (currentIndex - 1 + events.length) % events.length, [currentIndex, events.length]);
//   const getNextIndex = useCallback(() => (currentIndex + 1) % events.length, [currentIndex, events.length]);

//   const changeSlide = useCallback((direction) => {
//     setIsTransitioning(true);
//     setTimeout(() => {
//       if (direction === "prev") {
//         setCurrentIndex(getPrevIndex());
//       } else {
//         setCurrentIndex(getNextIndex());
//       }
//       setTimeout(() => setIsTransitioning(false), 50);
//     }, 300);
//   }, [getPrevIndex, getNextIndex]);


//   useEffect(() => {
//     if (!isAutoPlaying) return;
//     const interval = setInterval(() => {
//       changeSlide("next");
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [isAutoPlaying, changeSlide]);

//   const handlePrevClick = () => {
//     setIsAutoPlaying(false);
//     changeSlide("prev");
//   };

//   const handleNextClick = () => {
//     setIsAutoPlaying(false);
//     changeSlide("next");
//   };

//   return (
//     <section id="events-carousel" className="w-full bg-[#0A1631] py-12 flex flex-col items-center" aria-labelledby="events-heading">
//       <div className="text-center mb-8">
//         <p id="events-heading" className="text-3xl font-heading md:text-5xl font-bold text-white mb-3">
//           Our Events
//         </p>
//         <p className="text-base font-body md:text-xl text-gray-300 italic">
//           "Catch a glimpse of the events hosted by Pictoreal"
//         </p>
//       </div>

//       <div
//         className="relative w-full max-w-6xl flex items-center justify-center px-4"
//         onMouseEnter={() => setIsAutoPlaying(false)}
//         onMouseLeave={() => setIsAutoPlaying(true)}
//       >
//         <button onClick={handlePrevClick} className="hidden md:block absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-sm shadow-lg hover:scale-110" aria-label="Previous slide">
//           <ChevronLeft size={24} />
//         </button>

//         <button onClick={handleNextClick} className="hidden md:block absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-sm shadow-lg hover:scale-110" aria-label="Next slide">
//           <ChevronRight size={24} />
//         </button>

//         <div className={`flex items-center justify-center h-auto md:h-[420px] gap-4 md:gap-8 transition-opacity duration-300 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          
//           {/* Left Image Link - UPDATED */}
//           <Link 
//             href={`/events?eventId=${generateEventId(events[getPrevIndex()].name)}`} 
//             className="hidden md:block z-10" 
//             aria-label={`View event for ${events[getPrevIndex()].name}`}
//           >
//             <div className="relative group cursor-pointer">
//               <Image src={events[getPrevIndex()].image} alt={events[getPrevIndex()].name} width={224} height={288} loading="lazy" className="w-40 h-56 lg:w-56 lg:h-72 object-cover rounded-xl shadow-[0_0_15px_3px_rgba(190,227,248,0.3)] hover:shadow-[0_0_20px_4px_rgba(190,227,248,0.4)] transition-all duration-300"/>
//               <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 rounded-xl">
//                 <p className="text-white font-heading text-lg font-semibold text-center px-2">{events[getPrevIndex()].name}</p>
//               </div>
//             </div>
//           </Link>

//           <div className="flex flex-col items-center">
//             {/* Center Image Link - UPDATED */}
//             <Link 
//               href={`/events?eventId=${generateEventId(events[currentIndex].name)}`} 
//               className="block z-20" 
//               aria-label={`View event for ${events[currentIndex].name}`}
//             >
//               <div className="relative group cursor-pointer">
//                 <Image src={events[currentIndex].image} alt={events[currentIndex].name} width={512} height={416} loading="lazy" className="w-[80vw] h-auto max-h-[60vh] md:w-[28rem] md:h-[22rem] lg:w-[32rem] lg:h-[26rem] object-cover rounded-2xl shadow-[0_0_20px_5px_rgba(190,227,248,0.4)] hover:shadow-[0_0_25px_6px_rgba(190,227,248,0.5)] transition-all duration-300"/>
//                 <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center transition-opacity duration-300 rounded-2xl">
//                   <p className="text-white font-heading text-xl md:text-3xl font-bold text-center px-4">{events[currentIndex].name}</p>
//                 </div>
//               </div>
//             </Link>
//             <div className="block md:hidden text-center mt-4">
//               <p className="text-white font-heading text-base font-bold px-4">
//                 {events[currentIndex].name}
//               </p>
//             </div>
//           </div>

//           {/* Right Image Link - UPDATED */}
//           <Link 
//             href={`/events?eventId=${generateEventId(events[getNextIndex()].name)}`}
//             className="hidden md:block z-10" 
//             aria-label={`View event for ${events[getNextIndex()].name}`}
//           >
//             <div className="relative group cursor-pointer">
//               <Image src={events[getNextIndex()].image} alt={events[getNextIndex()].name} width={224} height={288} loading="lazy" className="w-40 h-56 lg:w-56 lg:h-72 object-cover rounded-xl shadow-[0_0_15px_3px_rgba(190,227,248,0.3)] hover:shadow-[0_0_20px_4px_rgba(190,227,248,0.4)] transition-all duration-300"/>
//               <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 rounded-xl">
//                 <p className="text-white font-heading text-lg font-semibold text-center px-2">{events[getNextIndex()].name}</p>
//               </div>
//             </div>
//           </Link>
//         </div>
//       </div>

//       <div className="text-center mt-8">
//         <ArrowBtn
//           text="Explore Events"
//           path="/events"
//           bgColor="#DDF1FF"
//           textColor="#111C33"
//           circleBg="#111C33"
//           hoverColor="#EAF7FF"
//           arrowColor="#DDF1FF"
//         />
//       </div>
//     </section>
//   );
// };

// export default EventsCarousel;



"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import ArrowBtn from "./arrowbtn";

const EventsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const containerRef = useRef(null);

  const events = [
    { id: 1, name: "Pictofest", image: "/home_page/Pictofest2.JPG" },
    { id: 2, name: "Manthan", image: "/home_page/Manthan.JPG" },
    { id: 3, name: "Parichay", image: "/home_page/Parichay1.jpg" },
    { id: 4, name: "Blood Donation Drive", image: "/home_page/BDD.JPG" },
    { id: 5, name: "Pictofest", image: "/home_page/Pictofest.JPG" },
    { id: 6, name: "BE Photoshoot", image: "/home_page/BE_Shoot.JPG" },
    //{ id: 7, name: "Interviews", image: "/home_page/Interview.jpg" },
    //{ id: 8, name: "Career Guidance", image: "/home_page/Career_guidance.jpg" },
    //{ id: 9, name: "Old Age Home Visit", image: "/home_page/Old_Age_Home_Visit.jpg" },
    { id: 10, name: "Picto Plants", image: "/home_page/Pictoplants.jpg" },
    { id: 11, name: "Orphanage Visit", image: "/home_page/Orphange_Visit.jpg" },
    //{ id: 12, name: "Cleanliness Drive", image: "/home_page/Cleanliness.jpg" },
    { id: 13, name: "Amche Bappa", image: "/home_page/amche_bappa.jpg" },
  ];
  
  const generateEventId = (name) => {
    return name.toLowerCase().replace(/\s+/g, "-");
  };

  const getPrevIndex = useCallback(() => (currentIndex - 1 + events.length) % events.length, [currentIndex, events.length]);
  const getNextIndex = useCallback(() => (currentIndex + 1) % events.length, [currentIndex, events.length]);

  const changeSlide = useCallback((direction) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    if (direction === "prev") {
      setCurrentIndex(getPrevIndex());
    } else {
      setCurrentIndex(getNextIndex());
    }
    
    setTimeout(() => setIsTransitioning(false), 600);
  }, [getPrevIndex, getNextIndex, isTransitioning]);

  // Touch event handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleSwipeInteraction("next");
    }
    if (isRightSwipe) {
      handleSwipeInteraction("prev");
    }
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      changeSlide("next");
    }, 2500); // Auto-transition every 2.5 seconds
    return () => clearInterval(interval);
  }, [isAutoPlaying, changeSlide]);

  // Resume auto-play after manual interaction
  useEffect(() => {
    if (!isAutoPlaying) {
      const resumeTimer = setTimeout(() => {
        setIsAutoPlaying(true);
      }, 8000); // Resume after 8 seconds of inactivity
      return () => clearTimeout(resumeTimer);
    }
  }, [isAutoPlaying]);

  const handlePrevClick = () => {
    setIsAutoPlaying(false);
    changeSlide("prev");
  };

  const handleNextClick = () => {
    setIsAutoPlaying(false);
    changeSlide("next");
  };

  const handleSwipeInteraction = (direction) => {
    setIsAutoPlaying(false);
    changeSlide(direction);
  };

  return (
    <section id="events-carousel" className="w-full bg-[#0A2B2B] py-12 flex flex-col items-center" aria-labelledby="events-heading">
      <div className="text-center mb-8">
        <p id="events-heading" className="text-3xl font-heading md:text-5xl font-bold text-white mb-3">
          Our Events
        </p>
        <p className="text-base font-body md:text-xl text-gray-300 italic">
          "Catch a glimpse of the events hosted by Pictoreal"
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative w-full max-w-6xl flex items-center justify-center px-4"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button onClick={handlePrevClick} className="hidden md:block absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-sm shadow-lg hover:scale-110" aria-label="Previous slide">
          <ChevronLeft size={24} />
        </button>

        <button onClick={handleNextClick} className="hidden md:block absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-sm shadow-lg hover:scale-110" aria-label="Next slide">
          <ChevronRight size={24} />
        </button>

        {/* Desktop View - Three images */}
        <div className="hidden md:flex items-center justify-center h-[420px] gap-8 relative overflow-hidden">
          {/* Left Image */}
          <div className={`transform transition-all duration-600 ease-in-out ${isTransitioning ? 'translate-x-8 opacity-60 scale-95' : 'translate-x-0 opacity-100 scale-100'}`}>
            <Link 
              href={`/events?eventId=${generateEventId(events[getPrevIndex()].name)}`} 
              className="block z-10" 
              aria-label={`View event for ${events[getPrevIndex()].name}`}
            >
              <div className="relative group cursor-pointer overflow-hidden rounded-xl">
                <div className="w-56 h-72 bg-gray-800 rounded-xl overflow-hidden">
                  <Image 
                    src={events[getPrevIndex()].image} 
                    alt={events[getPrevIndex()].name} 
                    width={224} 
                    height={288} 
                    loading="lazy" 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 flex items-end justify-center transition-all duration-300 rounded-xl p-4">
                  <p className="text-white font-heading text-lg font-semibold text-center">{events[getPrevIndex()].name}</p>
                </div>
                <div className="absolute inset-0 shadow-[0_0_15px_3px_rgba(134,197,197,0.3)] group-hover:shadow-[0_0_20px_4px_rgba(134,197,197,0.4)] transition-all duration-300 rounded-xl pointer-events-none"></div>
              </div>
            </Link>
          </div>

          {/* Center Image */}
          <div className={`transform transition-all duration-600 ease-in-out ${isTransitioning ? 'scale-95 opacity-80' : 'scale-100 opacity-100'}`}>
            <Link 
              href={`/events?eventId=${generateEventId(events[currentIndex].name)}`} 
              className="block z-20" 
              aria-label={`View event for ${events[currentIndex].name}`}
            >

              <div className="relative group cursor-pointer overflow-hidden rounded-2xl">
                <div className="w-[32rem] h-[26rem] bg-gray-800 rounded-2xl overflow-hidden">
                  <Image 
                    src={events[currentIndex].image} 
                    alt={events[currentIndex].name} 
                    width={512} 
                    height={416} 
                    loading="lazy" 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 flex items-end justify-center transition-all duration-300 rounded-2xl p-6">
                  <p className="text-white font-heading text-3xl font-bold text-center">{events[currentIndex].name}</p>
                </div>
                <div className="absolute inset-0 shadow-[0_0_20px_5px_rgba(134,197,197,0.4)] group-hover:shadow-[0_0_25px_6px_rgba(134,197,197,0.5)] transition-all duration-300 rounded-2xl pointer-events-none"></div>
              </div>
            </Link>
          </div>

          {/* Right Image */}
          <div className={`transform transition-all duration-600 ease-in-out ${isTransitioning ? '-translate-x-8 opacity-60 scale-95' : 'translate-x-0 opacity-100 scale-100'}`}>
            <Link 
              href={`/events?eventId=${generateEventId(events[getNextIndex()].name)}`}
              className="block z-10" 
              aria-label={`View event for ${events[getNextIndex()].name}`}
            >
              <div className="relative group cursor-pointer overflow-hidden rounded-xl">
                <div className="w-56 h-72 bg-gray-800 rounded-xl overflow-hidden">
                  <Image 
                    src={events[getNextIndex()].image} 
                    alt={events[getNextIndex()].name} 
                    width={224} 
                    height={288} 
                    loading="lazy" 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 flex items-end justify-center transition-all duration-300 rounded-xl p-4">
                  <p className="text-white font-heading text-lg font-semibold text-center">{events[getNextIndex()].name}</p>
                </div>
                <div className="absolute inset-0 shadow-[0_0_15px_3px_rgba(134,197,197,0.3)] group-hover:shadow-[0_0_20px_4px_rgba(134,197,197,0.4)] transition-all duration-300 rounded-xl pointer-events-none"></div>
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile View - Single image with swipe support */}
        <div className="md:hidden flex flex-col items-center justify-center relative">
          <div className={`transform transition-all duration-600 ease-in-out ${isTransitioning ? 'scale-95 opacity-80' : 'scale-100 opacity-100'}`}>
            <Link 
              href={`/events?eventId=${generateEventId(events[currentIndex].name)}`} 
              className="block z-20" 
              aria-label={`View event for ${events[currentIndex].name}`}
            >
              <div className="relative group cursor-pointer overflow-hidden rounded-2xl">
                <div className="w-[85vw] h-[60vw] max-w-[400px] max-h-[300px] bg-gray-800 rounded-2xl overflow-hidden">
                  <Image 
                    src={events[currentIndex].image} 
                    alt={events[currentIndex].name} 
                    width={400} 
                    height={300} 
                    loading="lazy" 
                    className="w-full h-full object-cover"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="absolute inset-0 shadow-[0_0_20px_5px_rgba(134,197,197,0.4)] transition-all duration-300 rounded-2xl pointer-events-none"></div>
              </div>
            </Link>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-white font-heading text-base font-bold px-4">
              {events[currentIndex].name}
            </p>
          </div>

          {/* Mobile swipe indicator with auto-play status */}
          <div className="flex justify-center mt-4 space-x-2">
            {events.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-[#D8ECEC] w-6' 
                    : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <ArrowBtn
          text="Explore Events"
          path="/events"
          bgColor="#D8ECEC"
          textColor="#0A2B2B"
          circleBg="#0A2B2B"
          hoverColor="#F0F7F7"
          arrowColor="#D8ECEC"
        />
      </div>
    </section>
  );
};

export default EventsCarousel;