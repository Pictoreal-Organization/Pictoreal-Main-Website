"use client"

import { useEffect, useState } from 'react';




const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) { // Adjust this value based on when you want the button to appear
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <a
      onClick={scrollToTop}
      className={`fixed right-4 bottom-4 z-50 bg-[#3a0622] rounded transition-all duration-400 
      ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'} 
      hover:bg-[#7f1049] scale-100 hover:scale-110 cursor-pointer w-10 h-10 flex items-center justify-center`}
      style={{ transition: 'opacity 0.4s' }}
    >
      {/* <i className="bi bi-arrow-up-short text-white text-2xl"></i> */}
      ▲
    </a>
  );
};

export default BackToTopButton;
