// "use client";

// import { useEffect, useState } from "react";

// export default function CountdownOverlay() {
//   const launchDate = new Date("2025-09-20T23:06:30").getTime();
//   const getTimeLeft = () => launchDate - Date.now();

//   const [timeLeft, setTimeLeft] = useState(getTimeLeft());
//   const [showOverlay, setShowOverlay] = useState(getTimeLeft() > 0);
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const [showWordmark, setShowWordmark] = useState(false);
//   const [showNavbarLogo, setShowNavbarLogo] = useState(false);

//   useEffect(() => {
//     if (!showOverlay) return;

//     const timer = setInterval(() => {
//       const diff = getTimeLeft();
//       if (diff <= 0) {
//         setIsTransitioning(true);
//         setTimeout(() => setShowWordmark(true), 2000);
//         setTimeout(() => {
//           setShowOverlay(false);
//           clearInterval(timer);
//         }, 3000);
//       } else {
//         setTimeLeft(diff);
//       }
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [showOverlay]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setShowNavbarLogo((prev) => !prev);
//     }, 10000);
//     return () => clearInterval(interval);
//   }, []);

//   // Prevent body scroll when overlay is showing
//   useEffect(() => {
//     if (showOverlay) {
//       // Store original body style
//       const originalStyle = window.getComputedStyle(document.body);
//       const originalOverflow = originalStyle.overflow;
//       const originalPosition = originalStyle.position;
      
//       // Prevent scroll
//       document.body.style.overflow = 'hidden';
//       document.body.style.position = 'fixed';
//       document.body.style.width = '100%';
//       document.body.style.height = '100%';
//       document.body.style.top = '0';
//       document.body.style.left = '0';
      
//       return () => {
//         // Restore original styles
//         document.body.style.overflow = originalOverflow;
//         document.body.style.position = originalPosition;
//         document.body.style.width = '';
//         document.body.style.height = '';
//         document.body.style.top = '';
//         document.body.style.left = '';
//       };
//     }
//   }, [showOverlay]);

//   if (!showOverlay) return null;

//   const hours = Math.floor(timeLeft / (1000 * 60 * 60));
//   const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
//   const seconds = Math.floor((timeLeft / 1000) % 60);

//   const TimeUnit = ({ value, label }) => (
//     <div className={`flex flex-col items-center mx-2 md:mx-6 transform transition-all duration-[1500ms] ease-out ${
//       isTransitioning ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
//     }`}>
//       <div className="relative w-20 h-24 md:w-28 md:h-32 flex items-center justify-center bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-[#407499]/20 overflow-hidden group hover:shadow-2xl hover:shadow-[#407499]/20 transition-all duration-300">
//         <div className="absolute inset-0 bg-gradient-to-br from-[#DDF1FF]/30 to-[#407499]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#407499] via-[#001730] to-[#407499]"></div>
//         <span className="text-4xl md:text-6xl font-heading font-bold relative z-10 text-[#001730] drop-shadow-sm">
//           {String(value).padStart(2, '0')}
//         </span>
//         <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#407499]/40 to-transparent"></div>
//       </div>
//       <span className="text-sm md:text-base uppercase tracking-wider mt-3 font-body font-semibold text-[#001730]/80">
//         {label}
//       </span>
//     </div>
//   );

//   return (
//     <div className="fixed inset-0 flex flex-col justify-center items-center z-[9999] p-4 overflow-hidden bg-gradient-to-br from-[#DDF1FF] via-white to-[#DDF1FF]" 
//          style={{ 
//            minHeight: '100vh',
//            minHeight: '100dvh', // Dynamic viewport height for better mobile support
//            width: '100vw',
//            width: '100dvw'      // Dynamic viewport width
//          }}>

//       {/* Subtle floating elements */}
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
//         <div className="absolute top-1/6 left-1/4 w-12 h-12 border-2 border-[#407499]/30 rotate-45 animate-spin" style={{animationDuration: '20s'}}></div>
//         <div className="absolute top-2/3 right-1/5 w-8 h-8 rounded-full animate-bounce" style={{backgroundColor: '#407499', opacity: '0.2', animationDelay: '1s', animationDuration: '4s'}}></div>
//         <div className="absolute top-1/3 right-1/3 w-6 h-6 border-2 border-[#001730]/20 rounded-full animate-pulse" style={{animationDelay: '2s', animationDuration: '3s'}}></div>
//       </div>

//       {/* Main container */}
//       <div className="relative z-10 flex flex-col items-center justify-center max-w-4xl w-full min-h-screen -mt-8 md:mt-32">

//         {/* Logo Section with flip transition - Better centered */}
//         <div className="relative flex justify-center items-center" style={{ perspective: '1000px' }}>
//           {/* Front side - Main Logo */}
//           <div className={`transition-transform duration-[1500ms] ease-in-out transform-gpu ${
//             showNavbarLogo ? 'rotate-y-180' : 'rotate-y-0'
//           } ${isTransitioning ? "scale-110 opacity-100" : "scale-100 opacity-100"}`}
//           style={{
//             transformStyle: 'preserve-3d',
//             backfaceVisibility: 'hidden'
//           }}>
//             <div className="relative flex justify-center">
//               <img
//                 src="/V27_FINAL_LOGO.png"
//                 alt="Pictoreal Logo"
//                 className={`drop-shadow-2xl object-contain transition-all duration-[2000ms] ease-out ${
//                   isTransitioning ? 'w-40 h-40 md:w-56 md:h-56' : 'w-32 h-32 md:w-48 md:h-48'
//                 }`}
//               />
//               <div className={`absolute inset-0 bg-gradient-to-br from-[#407499]/10 to-[#001730]/10 rounded-full blur-3xl -z-10 transition-all duration-[2000ms] ${
//                 isTransitioning ? 'animate-pulse scale-125' : 'animate-pulse scale-100'
//               }`}></div>
//             </div>
//           </div>
          
//           {/* Back side - Navbar Logo */}
//           <div className={`absolute inset-0 flex justify-center items-center transition-transform duration-[1500ms] ease-in-out transform-gpu ${
//             showNavbarLogo ? 'rotate-y-0' : 'rotate-y-180'
//           } ${isTransitioning ? "scale-110 opacity-100" : "scale-100 opacity-100"}`}
//           style={{
//             transformStyle: 'preserve-3d',
//             backfaceVisibility: 'hidden',
//             transform: showNavbarLogo ? 'rotateY(0deg)' : 'rotateY(180deg)'
//           }}>
//             <div className="flex flex-col items-center">
//               <img
//                 src="/navbar_logo.png"
//                 alt="Navbar Logo"
//                 className={`object-contain mb-2 transition-all duration-[2000ms] ease-out ${
//                   isTransitioning ? 'h-20 md:h-28' : 'h-16 md:h-24'
//                 }`}
//               />
//               <p className="text-sm md:text-lg font-body text-[#001730]/80 text-center whitespace-nowrap">
//                 Where thoughts, colours, and words prevail!
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* WORDMARK */}
//         <div className={`mb-8 md:mb-12 mt-20 md:mt-8 flex flex-col items-center transition-all duration-[2000ms] ease-out ${
//           showWordmark ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
//         }`}>
//           {/* <p className="text-sm md:text-xl font-body font-medium text-[#001730]/80 text-center">
//             Where thoughts, colours, and words prevail!
//           </p> */}
//         </div>

//         {/* Countdown timer - Moved up slightly */}
//         <div className={`flex justify-center items-center mb-4 md:mb-8 transition-all duration-[1500ms] ease-out ${
//           isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
//         }`}>
//           {hours > 0 && <TimeUnit value={hours} label="Hours" />}
//           {minutes > 0 && <TimeUnit value={minutes} label="Minutes" />}
//           <TimeUnit value={seconds} label="Seconds" />
//         </div>

//         {/* Launch message */}
//         {!isTransitioning && (
//           <div className="text-center opacity-80">
//             <p className="text-[#001730]/60 font-body text-xs md:text-base">
//               Get ready for an amazing experience
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Transition effect on exit */}
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

export default function CountdownOverlay({ onTransitionComplete }) {
  const launchDate = new Date("2025-09-20T23:15:30").getTime();
  const getTimeLeft = () => launchDate - Date.now();

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [showOverlay, setShowOverlay] = useState(getTimeLeft() > 0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showWordmark, setShowWordmark] = useState(false);
  const [showNavbarLogo, setShowNavbarLogo] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (!showOverlay) return;

    const timer = setInterval(() => {
      const diff = getTimeLeft();
      if (diff <= 0) {
        setIsTransitioning(true);
        setTimeout(() => setShowWordmark(true), 2000);
        setTimeout(() => {
          // Start fade out transition
          setFadeOut(true);
        }, 3000);
        setTimeout(() => {
          setShowOverlay(false);
          clearInterval(timer);
          // Call callback to show homepage
          if (onTransitionComplete) onTransitionComplete();
        }, 4000); // Extended time for smooth fade
      } else {
        setTimeLeft(diff);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [showOverlay, onTransitionComplete]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowNavbarLogo((prev) => !prev);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Prevent body scroll when overlay is showing
  useEffect(() => {
    if (showOverlay) {
      const originalStyle = window.getComputedStyle(document.body);
      const originalOverflow = originalStyle.overflow;
      const originalPosition = originalStyle.position;
      
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
      document.body.style.top = '0';
      document.body.style.left = '0';
      
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.position = originalPosition;
        document.body.style.width = '';
        document.body.style.height = '';
        document.body.style.top = '';
        document.body.style.left = '';
      };
    }
  }, [showOverlay]);

  if (!showOverlay) return null;

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  const TimeUnit = ({ value, label }) => (
    <div className={`flex flex-col items-center mx-2 md:mx-6 transform transition-all duration-[1500ms] ease-out ${
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
    <div 
      className={`fixed inset-0 flex flex-col justify-center items-center z-[9999] p-4 overflow-hidden bg-gradient-to-br from-[#DDF1FF] via-white to-[#DDF1FF] transition-all duration-1000 ease-in-out ${
        fadeOut ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
      }`}
      style={{ 
        minHeight: '100vh',
        minHeight: '100dvh',
        width: '100vw',
        width: '100dvw'
      }}
    >

      {/* Subtle floating elements */}
      <div className={`absolute inset-0 opacity-30 pointer-events-none transition-all duration-1000 ${
        fadeOut ? 'opacity-0 scale-150' : 'opacity-30 scale-100'
      }`}>
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
      <div className={`relative z-10 flex flex-col items-center justify-center max-w-4xl w-full min-h-screen -mt-8 md:mt-32 transition-all duration-1000 ease-in-out ${
        fadeOut ? 'opacity-0 transform translate-y-8 scale-95' : 'opacity-100 transform translate-y-0 scale-100'
      }`}>

        {/* Logo Section with flip transition */}
        <div className="relative flex justify-center items-center" style={{ perspective: '1000px' }}>
          {/* Front side - Main Logo */}
          <div className={`transition-transform duration-[1500ms] ease-in-out transform-gpu ${
            showNavbarLogo ? 'rotate-y-180' : 'rotate-y-0'
          } ${isTransitioning ? "scale-110 opacity-100" : "scale-100 opacity-100"}`}
          style={{
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden'
          }}>
            <div className="relative flex justify-center">
              <img
                src="/V27_FINAL_LOGO.png"
                alt="Pictoreal Logo"
                className={`drop-shadow-2xl object-contain transition-all duration-[2000ms] ease-out ${
                  isTransitioning ? 'w-40 h-40 md:w-56 md:h-56' : 'w-32 h-32 md:w-48 md:h-48'
                }`}
              />
              <div className={`absolute inset-0 bg-gradient-to-br from-[#407499]/10 to-[#001730]/10 rounded-full blur-3xl -z-10 transition-all duration-[2000ms] ${
                isTransitioning ? 'animate-pulse scale-125' : 'animate-pulse scale-100'
              }`}></div>
            </div>
          </div>
          
          {/* Back side - Navbar Logo */}
          <div className={`absolute inset-0 flex justify-center items-center transition-transform duration-[1500ms] ease-in-out transform-gpu ${
            showNavbarLogo ? 'rotate-y-0' : 'rotate-y-180'
          } ${isTransitioning ? "scale-110 opacity-100" : "scale-100 opacity-100"}`}
          style={{
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            transform: showNavbarLogo ? 'rotateY(0deg)' : 'rotateY(180deg)'
          }}>
            <div className="flex flex-col items-center">
              <img
                src="/navbar_logo.png"
                alt="Navbar Logo"
                className={`object-contain mb-2 transition-all duration-[2000ms] ease-out ${
                  isTransitioning ? 'h-20 md:h-28' : 'h-16 md:h-24'
                }`}
              />
              <p className="text-sm md:text-lg font-body text-[#001730]/80 text-center whitespace-nowrap">
                Where thoughts, colours, and words prevail!
              </p>
            </div>
          </div>
        </div>

        {/* WORDMARK */}
        <div className={`mb-8 md:mb-12 mt-20 md:mt-8 flex flex-col items-center transition-all duration-[2000ms] ease-out ${
          showWordmark ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          {/* Wordmark content can go here if needed */}
        </div>

        {/* Countdown timer */}
        <div className={`flex justify-center items-center mb-4 md:mb-8 transition-all duration-[1500ms] ease-out ${
          isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}>
          {hours > 0 && <TimeUnit value={hours} label="Hours" />}
          {minutes > 0 && <TimeUnit value={minutes} label="Minutes" />}
          <TimeUnit value={seconds} label="Seconds" />
        </div>

        {/* Launch message */}
        {!isTransitioning && (
          <div className="text-center opacity-80">
            <p className="text-[#001730]/60 font-body text-xs md:text-base">
              Get ready for an amazing experience
            </p>
          </div>
        )}
      </div>

      {/* Transition effect on exit - Enhanced */}
      {isTransitioning && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-8 h-8 rounded-full animate-ping" style={{backgroundColor: '#407499', opacity: 0.6}}></div>
          <div className="absolute w-24 h-24 border-2 rounded-full animate-ping" style={{borderColor: '#407499', opacity: 0.4, animationDelay: '0.3s', animationDuration: '2s'}}></div>
          <div className="absolute w-48 h-48 border border-[#001730] rounded-full animate-ping" style={{opacity: 0.3, animationDelay: '0.6s', animationDuration: '2.5s'}}></div>
          
          {/* Additional sparkle effect for smoother transition */}
          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-[#407499] rounded-full animate-ping"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '1.5s',
                  opacity: 0.7
                }}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Final fade overlay for ultra-smooth transition */}
      {fadeOut && (
        <div className="absolute inset-0 bg-[#DDF1FF] animate-pulse" style={{
          animation: 'fadeToHomepage 1s ease-in-out forwards'
        }}></div>
      )}
      
      <style jsx>{`
        @keyframes fadeToHomepage {
          0% { opacity: 0; }
          50% { opacity: 0.3; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}