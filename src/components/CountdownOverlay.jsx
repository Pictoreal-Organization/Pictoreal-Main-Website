"use client";

import { useEffect, useState } from "react";

export default function CountdownOverlay() {
  const launchDate = new Date("2025-09-17T21:08:00").getTime();
  const getTimeLeft = () => launchDate - Date.now();

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [showOverlay, setShowOverlay] = useState(getTimeLeft() > 0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showWordmark, setShowWordmark] = useState(false);

  useEffect(() => {
    if (!showOverlay) return;

    const timer = setInterval(() => {
      const diff = getTimeLeft();
      if (diff <= 0) {
        setIsTransitioning(true);
        // Sequence: Logo flips and grows -> Wordmark appears -> Exit
        setTimeout(() => setShowWordmark(true), 1200);
        setTimeout(() => {
          setShowOverlay(false);
          clearInterval(timer);
        }, 3500);
      } else {
        setTimeLeft(diff);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [showOverlay]);

  if (!showOverlay) return null;

  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  // Helper component for each time unit
  const TimeUnit = ({ value, label }) => (
    <div className={`flex flex-col items-center mx-2 md:mx-4 transform transition-all duration-1000 ${isTransitioning ? 'scale-0 opacity-0' : ''}`} 
         style={{
           transformStyle: 'preserve-3d',
           transform: isTransitioning ? 'rotateY(180deg)' : 'rotateY(0deg)'
         }}>
      <div className="relative w-16 h-20 md:w-24 md:h-28 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl border-2 border-white/60 overflow-hidden group hover:shadow-3xl hover:scale-105 transition-all duration-300">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/15 to-cyan-300/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        {/* Top accent line */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse"></div>
        <span className="text-3xl md:text-5xl font-mono font-black relative z-10 bg-gradient-to-b from-slate-700 to-slate-900 bg-clip-text text-transparent drop-shadow-sm">
          {String(value).padStart(2, '0')}
        </span>
        {/* Subtle glitch lines */}
        <div className="absolute inset-0 opacity-25">
          <div className="absolute top-1/3 left-0 right-0 h-px bg-blue-400 animate-ping"></div>
          <div className="absolute bottom-1/3 left-0 right-0 h-px bg-cyan-400 animate-ping" style={{animationDelay: '0.7s'}}></div>
        </div>
      </div>
      <span className="text-xs md:text-sm uppercase tracking-widest mt-2 font-bold drop-shadow-sm" style={{color: '#001730'}}>
        {label}
      </span>
    </div>
  );

  return (
    <div
      className="fixed inset-0 flex flex-col justify-center items-center z-[9999] p-4 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, #ddf1ff 0%, #b3dfff 30%, #001730 100%)`
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-40">
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              backgroundColor: Math.random() > 0.5 ? '#b3dfff' : '#ffffff',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 4}s`
            }}
          />
        ))}
       
        {/* Floating geometric shapes */}
        <div className="absolute top-1/4 left-1/5 w-8 h-8 border-2 border-blue-300/40 rotate-45 animate-spin" style={{animationDuration: '12s'}}></div>
        <div className="absolute top-3/4 right-1/4 w-6 h-6 rounded-full animate-bounce" style={{backgroundColor: '#b3dfff', opacity: '0.3', animationDelay: '1s', animationDuration: '3s'}}></div>
        <div className="absolute top-1/2 left-1/6 w-4 h-4 border animate-pulse" style={{borderColor: '#b3dfff', opacity: '0.5', animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 left-3/4 w-10 h-10 border-2 rounded-full animate-ping" style={{borderColor: '#ffffff', opacity: '0.3', animationDelay: '0.5s', animationDuration: '4s'}}></div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center">
       
        {/* LOGO with flip transition */}
        <div className={`mb-8 transform transition-all duration-1000 ease-out ${
          isTransitioning 
            ? 'scale-[10] opacity-0'
            : 'scale-100'
        }`} style={{
          transformStyle: 'preserve-3d',
          transform: isTransitioning ? 'rotateY(180deg) scale(10)' : 'rotateY(0deg)'
        }}>
          <img
            src="/V27_FINAL_LOGO.png"
            alt="Pictoreal Logo"
            className="w-32 h-32 md:w-48 md:h-48 drop-shadow-2xl object-contain"
          />
        </div>

        {/* WORDMARK with flip transition */}
        <div className={`mb-8 flex flex-col items-center transition-all duration-1000 ${
          showWordmark ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`} style={{
          transformStyle: 'preserve-3d',
          transform: showWordmark ? 'rotateY(0deg)' : 'rotateY(180deg)'
        }}>
          <h1 className="text-3xl md:text-5xl font-bold mb-2 drop-shadow-lg" style={{color: '#001730'}}>
            Pictoreal Welcomes You
          </h1>
          <p className="text-lg md:text-xl font-medium drop-shadow-sm" style={{color: '#b3dfff'}}>
            Where thoughts, colours, and words prevail!
          </p>
        </div>

        {/* Countdown timer */}
        <div className={`flex justify-center transition-all duration-1000 ${isTransitioning ? 'opacity-0 scale-0' : ''}`} style={{
          transformStyle: 'preserve-3d',
          transform: isTransitioning ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}>
          {minutes > 0 && <TimeUnit value={minutes} label="Minutes" />}
          <TimeUnit value={seconds} label="Seconds" />
        </div>

        {/* Progress indicator */}
        <div className={`mt-8 w-full max-w-md transition-all duration-1000 ${isTransitioning ? 'opacity-0' : ''}`}>
          <div className="h-2 bg-white/50 backdrop-blur rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full rounded-full transition-all duration-1000 shadow-lg"
              style={{
                width: `${Math.max(5, 100 - ((timeLeft / (1000 * 60 * 60 * 24 * 30)) * 100))}%`,
                background: `linear-gradient(90deg, #001730 0%, #b3dfff 100%)`
              }}
            >
              <div className="h-full bg-gradient-to-r from-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>
          <div className="flex justify-between mt-2 text-xs" style={{color: '#001730'}}>
            <span>Ready to launch</span>
            <span>🚀</span>
          </div>
        </div>
      </div>

      {/* Epic explosion rings during transition */}
      {isTransitioning && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-4 h-4 rounded-full animate-ping" style={{backgroundColor: '#b3dfff'}}></div>
          <div className="absolute w-16 h-16 border-4 rounded-full animate-ping" style={{borderColor: '#b3dfff', animationDelay: '0.3s', animationDuration: '2s'}}></div>
          <div className="absolute w-32 h-32 border-2 rounded-full animate-ping" style={{borderColor: '#ffffff', animationDelay: '0.6s', animationDuration: '2.5s'}}></div>
          <div className="absolute w-64 h-64 border rounded-full animate-ping" style={{borderColor: '#b3dfff', animationDelay: '1s', animationDuration: '3s'}}></div>
          <div className="absolute w-screen h-screen border rounded-full animate-ping" style={{borderColor: '#ffffff', opacity: '0.3', animationDelay: '1.5s', animationDuration: '4s'}}></div>
        </div>
      )}

      {/* Subtle scan lines for tech effect */}
      <div className={`absolute inset-0 pointer-events-none ${isTransitioning ? 'opacity-0' : 'opacity-40'}`}>
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent to-transparent animate-pulse" style={{top: '25%', background: `linear-gradient(90deg, transparent, #b3dfff, transparent)`}}></div>
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent to-transparent animate-pulse" style={{top: '75%', background: `linear-gradient(90deg, transparent, #ffffff, transparent)`, animationDelay: '1.5s'}}></div>
      </div>
    </div>
  );
}