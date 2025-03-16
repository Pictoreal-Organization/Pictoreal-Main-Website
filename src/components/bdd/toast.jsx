"use client";
import { useEffect, useState } from "react";

export default function BloodDonationToast({ donor, onClose, autoCloseTime = 5000 }) {
  const [isVisible, setIsVisible] = useState(true);
  const [exitAnimation, setExitAnimation] = useState(false);

  // Get appropriate color for blood group badge
  const getBloodGroupColor = (group) => {
    const colors = {
      'A+': 'bg-red-600 text-white',
      'A-': 'bg-red-700 text-white',
      'B+': 'bg-red-600 text-white',
      'B-': 'bg-red-700 text-white',
      'AB+': 'bg-red-600 text-white',
      'AB-': 'bg-red-700 text-white',
      'O+': 'bg-red-600 text-white',
      'O-': 'bg-red-700 text-white',
    };
    return colors[group] || 'bg-gray-600 text-white';
  };

  // Handle auto-close and animations
  useEffect(() => {
    if (!donor) return;
    
    // Auto-close after specified time
    const timeout = setTimeout(() => {
      setExitAnimation(true);
      
      // Allow exit animation to complete before removing
      setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, 500);
    }, autoCloseTime);

    return () => clearTimeout(timeout);
  }, [donor, onClose, autoCloseTime]);

  if (!donor || !isVisible) return null;

  return (
    <div 
      className={`fixed top-8 right-8 z-50 flex items-center max-w-sm w-full transform transition-all duration-500 ease-in-out ${
        exitAnimation 
          ? 'translate-x-full opacity-0' 
          : 'translate-x-0 opacity-100'
      }`}
    >
      <div className="w-full bg-white rounded-lg shadow-xl overflow-hidden border-l-4 border-red-600">
        <div className="relative px-4 py-5">
          {/* Close button */}
          <button 
            onClick={() => {
              setExitAnimation(true);
              setTimeout(() => {
                setIsVisible(false);
                if (onClose) onClose();
              }, 500);
            }}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Content */}
          <div className="flex items-center">
            {/* Animated heart icon */}
            <div className="flex-shrink-0 mr-4">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <div className="absolute inset-0 bg-red-100 rounded-full animate-pulse"></div>
                <svg className="w-8 h-8 text-red-600 relative z-10" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-lg font-medium text-gray-900">Thank you for donating!</h3>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getBloodGroupColor(donor.bloodGroup)}`}>
                  {donor.bloodGroup}
                </span>
              </div>
              
              <p className="text-gray-700">
                <span className="font-semibold">{donor.name}</span> just donated blood
              </p>
              
              <div className="flex items-center mt-1">
                <svg className="w-4 h-4 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="text-xs text-gray-500">Just now</span>
              </div>
            </div>
          </div>
          
          {/* Progress bar for auto-close timer */}
          <div className="h-1 w-full bg-gray-200 absolute bottom-0 left-0">
            <div 
              className="h-full bg-gradient-to-r from-red-400 to-red-600 transition-all ease-linear" 
              style={{ 
                width: '100%',
                animation: `shrink ${autoCloseTime}ms linear forwards`
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Add global style for progress bar animation */}
      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}