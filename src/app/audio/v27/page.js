'use client';
import React, { useState, useEffect } from 'react';

function AudioIndex() {
  const [mounted, setMounted] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLanguageSelect = (language) => {
    const languageUrls = {
      english: '/audio/v27/eng',
      hindi: '/audio/v27/hin',
      marathi: '/audio/v27/mar'
    };
    
    window.location.href = languageUrls[language];
  };

  const languages = [
    {
      id: 'english',
      name: 'English',
      flag: '🇺🇸',
      accent: 'from-blue-400 to-cyan-300',
      glow: 'shadow-blue-500/50'
    },
    {
      id: 'hindi',
      name: 'हिंदी',
      flag: '🇮🇳',
      accent: 'from-orange-400 to-amber-300',
      glow: 'shadow-orange-500/50'
    },
    {
      id: 'marathi',
      name: 'मराठी',
      flag: '🏛️',
      accent: 'from-green-400 to-emerald-300',
      glow: 'shadow-green-500/50'
    }
  ];

  if (!mounted) {
    return <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-800 to-orange-500" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-800 to-orange-500 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-40 w-80 h-80 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto p-6">
        {/* Header with Advanced Animation */}
        <div className="text-center mb-16 pt-12">
          <div className="animate-fadeInUp">
            <h1 className="text-6xl font-bold text-white mb-6 bg-gradient-to-r from-white via-blue-100 to-orange-100 bg-clip-text text-transparent">
              🎵 Audio Gallery
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-orange-400 mx-auto rounded-full mb-6 animate-expandWidth"></div>
            <p className="text-xl text-blue-100 opacity-90 animate-fadeInUp animation-delay-500">
              Choose your language to begin the journey
            </p>
          </div>
        </div>

        {/* Language Cards with Advanced Effects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {languages.map((lang, index) => (
            <div
              key={lang.id}
              onClick={() => handleLanguageSelect(lang.id)}
              onMouseEnter={() => setHoveredCard(lang.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`group relative cursor-pointer animate-fadeInUp`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Card Background with Glassmorphism */}
              <div className={`
                relative bg-white bg-opacity-5 backdrop-blur-xl border border-white border-opacity-10
                rounded-2xl p-8 transform transition-all duration-500 ease-out
                hover:scale-105 hover:bg-opacity-15 hover:border-opacity-30
                shadow-xl hover:shadow-2xl ${lang.glow}
                ${hoveredCard === lang.id ? 'animate-pulse-glow' : ''}
              `}>
                {/* Gradient Overlay */}
                <div className={`
                  absolute inset-0 bg-gradient-to-br ${lang.accent} opacity-0 
                  group-hover:opacity-20 rounded-2xl transition-opacity duration-500
                `} />

                {/* Shimmer Effect */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className={`
                    absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent 
                    opacity-0 group-hover:opacity-20 transform -skew-x-12 
                    transition-all duration-700 ${hoveredCard === lang.id ? 'animate-shimmer-sweep' : ''}
                  `} />
                </div>

                {/* Content */}
                <div className="relative z-10 text-center text-white">
                  <div className={`
                    text-6xl mb-6 transform transition-all duration-500 
                    group-hover:scale-110
                    ${hoveredCard === lang.id ? 'animate-bounce-gentle' : ''}
                  `}>
                    {lang.flag}
                  </div>
                  <h2 className="text-2xl font-bold mb-2 transform transition-all duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-200 group-hover:bg-clip-text">
                    {lang.name}
                  </h2>
                  
                  {/* Animated Underline */}
                  <div className="w-0 h-0.5 bg-gradient-to-r from-blue-400 to-orange-400 mx-auto transition-all duration-500 group-hover:w-full" />
                  
                  {/* Click Indicator */}
                  <div className={`
                    mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 
                    transform translate-y-2 group-hover:translate-y-0
                  `}>
                    <span className="text-sm text-blue-200">Click to explore →</span>
                  </div>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-2 right-2 w-3 h-3 bg-white opacity-20 rounded-full animate-ping" />
                <div className="absolute bottom-2 left-2 w-2 h-2 bg-blue-300 opacity-30 rounded-full animate-ping animation-delay-1000" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Decoration */}
        <div className="text-center animate-fadeInUp animation-delay-1000">
          <div className="inline-flex items-center space-x-4 text-white opacity-60">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full animate-pulse" />
              <span className="text-sm font-medium">Premium Quality</span>
            </div>
            <div className="w-px h-4 bg-white opacity-30"></div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-amber-300 rounded-full animate-pulse animation-delay-500" />
              <span className="text-sm font-medium">Immersive Experience</span>
            </div>
            <div className="w-px h-4 bg-white opacity-30"></div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-300 rounded-full animate-pulse animation-delay-1000" />
              <span className="text-sm font-medium">Multi-Language</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes expandWidth {
          from { width: 0; }
          to { width: 6rem; }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        @keyframes shimmer-sweep {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { transform: scale(1.1) translateY(0); }
          50% { transform: scale(1.15) translateY(-5px); }
        }
        
        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-expandWidth {
          animation: expandWidth 1s ease-out 0.5s forwards;
          width: 0;
        }
        
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s ease-in-out infinite;
        }
        
        .animate-shimmer-sweep {
          animation: shimmer-sweep 0.7s ease-out;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 1s ease-in-out infinite;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

export default AudioIndex;