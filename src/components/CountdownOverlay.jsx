// "use client";

// import { useEffect, useState } from "react";

// export default function CountdownOverlay() {
//   const launchDate = new Date("2025-09-19T22:41:00").getTime();
//   const getTimeLeft = () => launchDate - Date.now();

//   const [timeLeft, setTimeLeft] = useState(getTimeLeft());
//   const [showOverlay, setShowOverlay] = useState(getTimeLeft() > 0);
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const [showWordmark, setShowWordmark] = useState(false);

//   useEffect(() => {
//     if (!showOverlay) return;

//     const timer = setInterval(() => {
//       const diff = getTimeLeft();
//       if (diff <= 0) {
//         setIsTransitioning(true);
//         // Sequence: Logo fades and scales -> Wordmark appears -> Exit
//         setTimeout(() => setShowWordmark(true), 800);
//         setTimeout(() => {
//           setShowOverlay(false);
//           clearInterval(timer);
//         }, 2500);
//       } else {
//         setTimeLeft(diff);
//       }
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [showOverlay]);

//   if (!showOverlay) return null;

//   const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
//   const seconds = Math.floor((timeLeft / 1000) % 60);

//   // Helper component for each time unit
//   const TimeUnit = ({ value, label }) => (
//     <div className={`flex flex-col items-center mx-3 md:mx-6 transform transition-all duration-700 ease-out ${
//       isTransitioning ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
//     }`}>
//       <div className="relative w-20 h-24 md:w-28 md:h-32 flex items-center justify-center bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-[#407499]/20 overflow-hidden group hover:shadow-2xl hover:shadow-[#407499]/20 transition-all duration-300">
//         {/* Subtle gradient overlay */}
//         <div className="absolute inset-0 bg-gradient-to-br from-[#DDF1FF]/30 to-[#407499]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
//         {/* Top accent line */}
//         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#407499] via-[#001730] to-[#407499]"></div>
        
//         <span className="text-4xl md:text-6xl font-heading font-bold relative z-10 text-[#001730] drop-shadow-sm">
//           {String(value).padStart(2, '0')}
//         </span>
        
//         {/* Bottom accent */}
//         <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#407499]/40 to-transparent"></div>
//       </div>
      
//       <span className="text-sm md:text-base uppercase tracking-wider mt-3 font-body font-semibold text-[#001730]/80">
//         {label}
//       </span>
//     </div>
//   );

//   return (
//     <div className="fixed inset-0 flex flex-col justify-center items-center z-[9999] p-4 overflow-hidden bg-gradient-to-br from-[#DDF1FF] via-white to-[#DDF1FF]">
      
//       {/* Subtle floating elements matching your design */}
//       <div className="absolute inset-0 opacity-30 pointer-events-none">
//         {[...Array(20)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute rounded-full animate-pulse"
//             style={{
//               width: `${3 + Math.random() * 6}px`,
//               height: `${3 + Math.random() * 6}px`,
//               backgroundColor: Math.random() > 0.5 ? '#407499' : '#001730',
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 4}s`,
//               animationDuration: `${3 + Math.random() * 3}s`,
//               opacity: 0.4 + Math.random() * 0.3
//             }}
//           />
//         ))}
        
//         {/* Geometric shapes similar to your AboutUs component */}
//         <div className="absolute top-1/6 left-1/4 w-12 h-12 border-2 border-[#407499]/30 rotate-45 animate-spin" style={{animationDuration: '20s'}}></div>
//         <div className="absolute top-2/3 right-1/5 w-8 h-8 rounded-full animate-bounce" style={{backgroundColor: '#407499', opacity: '0.2', animationDelay: '1s', animationDuration: '4s'}}></div>
//         <div className="absolute top-1/3 right-1/3 w-6 h-6 border-2 border-[#001730]/20 rounded-full animate-pulse" style={{animationDelay: '2s', animationDuration: '3s'}}></div>
//       </div>

//       {/* Main content container */}
//       <div className="relative z-10 flex flex-col items-center max-w-4xl w-full">
       
//         {/* LOGO with elegant transition */}
//         <div className={`transform transition-all duration-1000 ease-out translate-y-30 md:translate-y-10 ${
//           isTransitioning ? "scale-150 opacity-0" : "scale-100 opacity-100"
//         }`}>
//           <div className="relative">
//             <img
//               src="/V27_FINAL_LOGO.png"
//               alt="Pictoreal Logo"
//               className="w-40 h-40 md:w-56 md:h-56 drop-shadow-2xl object-contain"
//             />
//             {/* Subtle glow effect */}
//             <div className="absolute inset-0 bg-gradient-to-br from-[#407499]/10 to-[#001730]/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
//           </div>
//         </div>


//         {/* WORDMARK with elegant appearance */}
//         <div className={`mb-12 flex flex-col items-center transition-all duration-1000 ease-out ${
//           showWordmark ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
//         }`}>
//           <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 text-[#001730] text-center leading-tight">
//             More than a Magazine,
//             <br />
//             <span className="bg-gradient-to-r from-[#407499] to-[#001730] bg-clip-text text-transparent">
//               It's Pictoreal
//             </span>
//           </h1>
//           <p className="text-lg md:text-xl font-body font-medium text-[#001730]/80 text-center">
//             Where thoughts, colours, and words prevail!
//           </p>
//         </div>

//         {/* Countdown timer */}
//         <div className={`flex justify-center items-center transition-all duration-700 ease-out ${
//           isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
//         }`}>
//           {minutes > 0 && <TimeUnit value={minutes} label="Minutes" />}
//           <TimeUnit value={seconds} label="Seconds" />
//         </div>

//         {/* Progress bar matching your design style */}
//         <div className={`mt-12 w-full max-w-lg transition-all duration-700 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
//           <div className="h-3 bg-white/80 backdrop-blur rounded-full overflow-hidden shadow-inner border border-[#407499]/20">
//             <div
//               className="h-full rounded-full transition-all duration-1000 ease-out shadow-sm"
//               style={{
//                 width: `${Math.max(10, 100 - ((timeLeft / (1000 * 60 * 60 * 24 * 30)) * 100))}%`,
//                 background: `linear-gradient(90deg, #407499 0%, #001730 100%)`
//               }}
//             >
//               <div className="h-full bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
//             </div>
//           </div>
          
//           <div className="flex justify-between items-center mt-3 text-sm font-body">
//             <span className="text-[#001730]/70">Almost there...</span>
//             <div className="flex items-center gap-2">
//               <span className="text-[#001730]/70">🚀</span>
//               <span className="text-[#407499] font-semibold">Ready to Launch</span>
//             </div>
//           </div>
//         </div>

//         {/* Launch message */}
//         {!isTransitioning && (
//           <div className="mt-8 text-center opacity-80">
//             <p className="text-[#001730]/60 font-body text-sm md:text-base">
//               Get ready for an amazing experience
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Elegant transition effect */}
//       {isTransitioning && (
//         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//           <div className="w-8 h-8 rounded-full animate-ping" style={{backgroundColor: '#407499', opacity: 0.6}}></div>
//           <div className="absolute w-24 h-24 border-2 rounded-full animate-ping" style={{borderColor: '#407499', opacity: 0.4, animationDelay: '0.3s', animationDuration: '2s'}}></div>
//           <div className="absolute w-48 h-48 border border-[#001730] rounded-full animate-ping" style={{opacity: 0.3, animationDelay: '0.6s', animationDuration: '2.5s'}}></div>
//         </div>
//       )}
//     </div>
//   );
// }








"use client";

import { useEffect, useState } from "react";

export default function CountdownOverlay() {
  const launchDate = new Date("2025-09-19T23:59:00").getTime();
  const getTimeLeft = () => launchDate - Date.now();

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [showOverlay, setShowOverlay] = useState(getTimeLeft() > 0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showWordmark, setShowWordmark] = useState(false);

  // ✅ New state to toggle between main logo and navbar-logo
  const [showNavbarLogo, setShowNavbarLogo] = useState(false);

  useEffect(() => {
    if (!showOverlay) return;

    const timer = setInterval(() => {
      const diff = getTimeLeft();
      if (diff <= 0) {
        setIsTransitioning(true);
        setTimeout(() => setShowWordmark(true), 800);
        setTimeout(() => {
          setShowOverlay(false);
          clearInterval(timer);
        }, 2500);
      } else {
        setTimeLeft(diff);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [showOverlay]);

  // ✅ Every 10 seconds, toggle between main logo and navbar-logo
  useEffect(() => {
    const interval = setInterval(() => {
      setShowNavbarLogo((prev) => !prev);
    }, 10000); // 10 seconds
    return () => clearInterval(interval);
  }, []);

  if (!showOverlay) return null;

  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  const TimeUnit = ({ value, label }) => (
    <div className={`flex flex-col items-center mx-3 md:mx-6 transform transition-all duration-700 ease-out ${
      isTransitioning ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
    }`}>
      <div className="relative w-20 h-24 md:w-28 md:h-32 flex items-center justify-center bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-[#407499]/20 overflow-hidden group hover:shadow-2xl hover:shadow-[#407499]/20 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-[#DDF1FF]/30 to-[#407499]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#407499] via-[#001730] to-[#407499]"></div>
        <span className="text-4xl md:text-6xl font-heading font-bold relative z-10 text-[#001730] drop-shadow-sm">
          {String(value).padStart(2, '0')}
        </span>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#407499]/40 to-transparent"></div>
      </div>
      <span className="text-sm md:text-base uppercase tracking-wider mt-3 font-body font-semibold text-[#001730]/80">
        {label}
      </span>
    </div>
  );

  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center z-[9999] p-4 overflow-hidden bg-gradient-to-br from-[#DDF1FF] via-white to-[#DDF1FF]">

      {/* Subtle floating elements */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              width: `${3 + Math.random() * 6}px`,
              height: `${3 + Math.random() * 6}px`,
              backgroundColor: Math.random() > 0.5 ? '#407499' : '#001730',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
              opacity: 0.4 + Math.random() * 0.3
            }}
          />
        ))}
        <div className="absolute top-1/6 left-1/4 w-12 h-12 border-2 border-[#407499]/30 rotate-45 animate-spin" style={{animationDuration: '20s'}}></div>
        <div className="absolute top-2/3 right-1/5 w-8 h-8 rounded-full animate-bounce" style={{backgroundColor: '#407499', opacity: '0.2', animationDelay: '1s', animationDuration: '4s'}}></div>
        <div className="absolute top-1/3 right-1/3 w-6 h-6 border-2 border-[#001730]/20 rounded-full animate-pulse" style={{animationDelay: '2s', animationDuration: '3s'}}></div>
      </div>

      {/* Main container */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl w-full">

        {/* Logo Section */}
        <div className="transition-all duration-1000 ease-out">
          {showNavbarLogo ? (
            <div className="flex flex-col items-center">
              <img
                src="/navbar_logo.png"
                alt="Navbar Logo"
                className="h-16 md:h-24 mb-4 transition-transform duration-1000 ease-out"
              />
              <p className="text-lg md:text-xl font-body text-[#001730]/80 text-center transition-opacity duration-1000 ease-out">
                Where thoughts, colours, and words prevail!
              </p>
            </div>
          ) : (
            <div className={`transform transition-all duration-1000 ease-out translate-y-30 md:translate-y-10 ${
              isTransitioning ? "scale-150 opacity-0" : "scale-100 opacity-100"
            }`}>
              <div className="relative">
                <img
                  src="/V27_FINAL_LOGO.png"
                  alt="Pictoreal Logo"
                  className="w-40 h-40 md:w-56 md:h-56 drop-shadow-2xl object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#407499]/10 to-[#001730]/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
              </div>
            </div>
          )}
        </div>

        {/* WORDMARK */}
        <div className={`mb-12 flex flex-col items-center transition-all duration-1000 ease-out ${
          showWordmark ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 text-[#001730] text-center leading-tight">
            More than a Magazine,
            <br />
            <span className="bg-gradient-to-r from-[#407499] to-[#001730] bg-clip-text text-transparent">
              It's Pictoreal
            </span>
          </h1>
          <p className="text-lg md:text-xl font-body font-medium text-[#001730]/80 text-center">
            Where thoughts, colours, and words prevail!
          </p>
        </div>

        {/* Countdown timer */}
        <div className={`flex justify-center items-center transition-all duration-700 ease-out ${
          isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}>
          {minutes > 0 && <TimeUnit value={minutes} label="Minutes" />}
          <TimeUnit value={seconds} label="Seconds" />
        </div>

        {/* Progress bar */}
        <div className={`mt-12 w-full max-w-lg transition-all duration-700 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          <div className="h-3 bg-white/80 backdrop-blur rounded-full overflow-hidden shadow-inner border border-[#407499]/20">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out shadow-sm"
              style={{
                width: `${Math.max(10, 100 - ((timeLeft / (1000 * 60 * 60 * 24 * 30)) * 100))}%`,
                background: `linear-gradient(90deg, #407499 0%, #001730 100%)`
              }}
            >
              <div className="h-full bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-3 text-sm font-body">
            <span className="text-[#001730]/70">Almost there...</span>
            <div className="flex items-center gap-2">
              <span className="text-[#001730]/70">🚀</span>
              <span className="text-[#407499] font-semibold">Ready to Launch</span>
            </div>
          </div>
        </div>

        {/* Launch message */}
        {!isTransitioning && (
          <div className="mt-8 text-center opacity-80">
            <p className="text-[#001730]/60 font-body text-sm md:text-base">
              Get ready for an amazing experience
            </p>
          </div>
        )}
      </div>

      {/* Transition effect on exit */}
      {isTransitioning && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-8 h-8 rounded-full animate-ping" style={{backgroundColor: '#407499', opacity: 0.6}}></div>
          <div className="absolute w-24 h-24 border-2 rounded-full animate-ping" style={{borderColor: '#407499', opacity: 0.4, animationDelay: '0.3s', animationDuration: '2s'}}></div>
          <div className="absolute w-48 h-48 border border-[#001730] rounded-full animate-ping" style={{opacity: 0.3, animationDelay: '0.6s', animationDuration: '2.5s'}}></div>
        </div>
      )}
    </div>
  );
}






