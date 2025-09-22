"use client";

import { useEffect, useState } from "react";

export default function CountdownOverlay({ onTransitionComplete }) {
  // Time is explicitly set to the IST timezone (+05:30)
  const launchDate = new Date("2025-09-22T14:50:00+05:30").getTime();
  const getTimeLeft = () => launchDate - Date.now();

  const [timeLeft, setTimeLeft] = useState(null);
  const [showOverlay, setShowOverlay] = useState(true);
  const [isClient, setIsClient] = useState(false);

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showWordmark, setShowWordmark] = useState(false);
  const [showNavbarLogo, setShowNavbarLogo] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const initialTimeLeft = getTimeLeft();

    if (initialTimeLeft > 0) {
      setTimeLeft(initialTimeLeft);
    } else {
      setShowOverlay(false);
      if (onTransitionComplete) onTransitionComplete();
    }
  }, [onTransitionComplete]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;

    const timer = setInterval(() => {
      const diff = getTimeLeft();
      if (diff <= 0) {
        setTimeLeft(0);
        setIsTransitioning(true);
        setTimeout(() => setShowWordmark(true), 2000);
        setTimeout(() => setFadeOut(true), 3000);
        setTimeout(() => {
          setShowOverlay(false);
          clearInterval(timer);
          if (onTransitionComplete) onTransitionComplete();
        }, 4000);
      } else {
        setTimeLeft(diff);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTransitionComplete]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowNavbarLogo((prev) => !prev);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showOverlay) {
      const originalStyle = window.getComputedStyle(document.body);
      const originalOverflow = originalStyle.overflow;
      const originalPosition = originalStyle.position;
      const originalTop = originalStyle.top;
      const originalLeft = originalStyle.left;
      const originalWidth = originalStyle.width;
      const originalHeight = originalStyle.height;

      // Get the current scroll position
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;

      // Apply styles to prevent scrolling
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100vw";
      document.body.style.height = "100vh";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = `-${scrollX}px`;
      document.body.style.margin = "0";
      document.body.style.padding = "0";

      // Also apply to html element for extra security
      const htmlElement = document.documentElement;
      const originalHtmlOverflow = htmlElement.style.overflow;
      const originalHtmlHeight = htmlElement.style.height;
      
      htmlElement.style.overflow = "hidden";
      htmlElement.style.height = "100vh";

      return () => {
        // Restore original styles
        document.body.style.overflow = originalOverflow;
        document.body.style.position = originalPosition;
        document.body.style.width = originalWidth;
        document.body.style.height = originalHeight;
        document.body.style.top = originalTop;
        document.body.style.left = originalLeft;
        document.body.style.margin = "";
        document.body.style.padding = "";

        // Restore html styles
        htmlElement.style.overflow = originalHtmlOverflow;
        htmlElement.style.height = originalHtmlHeight;

        // Restore scroll position
        window.scrollTo(scrollX, scrollY);
      };
    }
  }, [showOverlay]);

  if (!showOverlay) {
    return null;
  }

  const hours = Math.floor((timeLeft ?? 0) / (1000 * 60 * 60));
  const minutes = Math.floor(((timeLeft ?? 0) / (1000 * 60)) % 60);
  const seconds = Math.floor(((timeLeft ?? 0) / 1000) % 60);

  const TimeUnit = ({ value, label }) => (
    <div
      className={`flex flex-col items-center mx-2 md:mx-6 transform transition-all duration-[1500ms] ease-out ${
        isTransitioning ? "scale-95 opacity-0" : "scale-100 opacity-100"
      }`}
    >
      <div className="relative w-20 h-24 md:w-28 md:h-32 flex items-center justify-center bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-[#407499]/20 overflow-hidden group hover:shadow-2xl hover:shadow-[#407499]/20 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-[#DDF1FF]/30 to-[#407499]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#407499] via-[#001730] to-[#407499]"></div>
        <span className="text-4xl md:text-6xl font-heading font-bold relative z-10 text-[#001730] drop-shadow-sm">
          {isClient ? String(value).padStart(2, "0") : "00"}
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
      className="fixed inset-0 flex flex-col justify-center items-center z-[9999] p-4"
      style={{
        minHeight: "100vh",
        minHeight: "100dvh", 
        width: "100vw",
        width: "100dvw",
        background: "linear-gradient(to bottom right, #DDF1FF, white, #DDF1FF)",
        overflow: "hidden",
        touchAction: "none",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {/* Floating elements */}
      <div
        className={`absolute inset-0 opacity-30 pointer-events-none transition-all duration-1000 ${
          fadeOut ? "opacity-0 scale-150" : "opacity-30 scale-100"
        }`}
      >
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              width: `${3 + Math.random() * 6}px`,
              height: `${3 + Math.random() * 6}px`,
              backgroundColor: Math.random() > 0.5 ? "#407499" : "#001730",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
              opacity: 0.4 + Math.random() * 0.3,
            }}
          />
        ))}
        <div
          className="absolute top-1/6 left-1/4 w-12 h-12 border-2 border-[#407499]/30 rotate-45 animate-spin"
          style={{ animationDuration: "20s" }}
        ></div>
        <div
          className="absolute top-2/3 right-1/5 w-8 h-8 rounded-full animate-bounce"
          style={{
            backgroundColor: "#407499",
            opacity: "0.2",
            animationDelay: "1s",
            animationDuration: "4s",
          }}
        ></div>
        <div
          className="absolute top-1/3 right-1/3 w-6 h-6 border-2 border-[#001730]/20 rounded-full animate-pulse"
          style={{ animationDelay: "2s", animationDuration: "3s" }}
        ></div>
      </div>

      {/* Main container with flexible padding for mobile layout */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center max-w-4xl w-full px-4 py-16 transition-all duration-1000 ease-in-out ${
          fadeOut
            ? "opacity-0 transform translate-y-8 scale-95"
            : "opacity-100 transform translate-y-0 scale-100"
        }`}
      >
        {/* Logo flip with iOS-friendly approach */}
        <div className="relative flex justify-center items-center w-48 h-48 md:w-56 md:h-56">
          {/* Front Logo */}
          <div
            className={`absolute inset-0 flex justify-center items-center transition-all duration-[1500ms] ease-in-out ${
              isTransitioning ? "scale-110" : "scale-100"
            } ${
              showNavbarLogo ? "opacity-0 rotate-y-180" : "opacity-100 rotate-y-0"
            }`}
            style={{
              transform: showNavbarLogo 
                ? `rotateY(180deg) scale(${isTransitioning ? 1.1 : 1})` 
                : `rotateY(0deg) scale(${isTransitioning ? 1.1 : 1})`,
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="relative flex justify-center">
              <img
                src="/V27_FINAL_LOGO.png"
                alt="Pictoreal Logo"
                className="drop-shadow-2xl object-contain w-32 h-32 md:w-48 md:h-48"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-br from-[#407499]/10 to-[#001730]/10 rounded-full blur-3xl -z-10 transition-all duration-[2000ms] ${
                  isTransitioning ? "animate-pulse scale-125" : "animate-pulse scale-100"
                }`}
              ></div>
            </div>
          </div>

          {/* Back Logo */}
          <div
            className={`absolute inset-0 flex justify-center items-center transition-all duration-[1500ms] ease-in-out ${
              isTransitioning ? "scale-110" : "scale-100"
            } ${
              showNavbarLogo ? "opacity-100 rotate-y-0" : "opacity-0 rotate-y-180"
            }`}
            style={{
              transform: showNavbarLogo 
                ? `rotateY(0deg) scale(${isTransitioning ? 1.1 : 1})` 
                : `rotateY(-180deg) scale(${isTransitioning ? 1.1 : 1})`,
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="flex flex-col items-center">
              <img
                src="/navbar_logo.png"
                alt="Navbar Logo"
                className={`object-contain mb-2 transition-all duration-[2000ms] ease-out ${
                  isTransitioning ? "h-20 md:h-28" : "h-16 md:h-24"
                }`}
              />
              <p className="text-sm md:text-lg font-body text-[#001730]/80 text-center whitespace-nowrap">
                Where thoughts, colours, and words prevail!
              </p>
            </div>
          </div>
        </div>

        {/* Wordmark with balanced vertical margin */}
        <div
          className={`my-8 flex flex-col items-center transition-all duration-[2000ms] ease-out ${
            showWordmark ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        ></div>

        {/* Countdown - only renders numbers on the client to prevent flash */}
        {isClient && (
          <div
            className={`flex justify-center items-center mb-4 md:mb-8 transition-all duration-[1500ms] ease-out ${
              isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          >
            {hours > 0 && <TimeUnit value={hours} label="Hours" />}
            {minutes > 0 && <TimeUnit value={minutes} label="Minutes" />}
            <TimeUnit value={seconds} label="Seconds" />
          </div>
        )}

        {/* Launch message */}
        {!isTransitioning && (
          <div className="text-center opacity-80">
            <p className="text-[#001730]/60 font-body text-xs md:text-base">
              Get ready for an amazing experience
            </p>
          </div>
        )}
      </div>

      {/* Transition effects */}
      {isTransitioning && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-8 h-8 rounded-full animate-ping" style={{ backgroundColor: "#407499", opacity: 0.6 }}></div>
          <div
            className="absolute w-24 h-24 border-2 rounded-full animate-ping"
            style={{ borderColor: "#407499", opacity: 0.4, animationDelay: "0.3s", animationDuration: "2s" }}
          ></div>
          <div
            className="absolute w-48 h-48 border border-[#001730] rounded-full animate-ping"
            style={{ opacity: 0.3, animationDelay: "0.6s", animationDuration: "2.5s" }}
          ></div>

          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-[#407499] rounded-full animate-ping"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: "1.5s",
                  opacity: 0.7,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Final fade overlay */}
      {fadeOut && (
        <div
          className="absolute inset-0 bg-[#DDF1FF] animate-pulse"
          style={{
            animation: "fadeToHomepage 1s ease-in-out forwards",
          }}
        ></div>
      )}

      <style jsx>{`
        @keyframes fadeToHomepage {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            opacity: 1;
          }
        }
        .rotate-y-0 {
          transform: rotateY(0deg);
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}