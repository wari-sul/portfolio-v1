import React, { useState, useEffect } from 'react';
import { IoIosArrowUp } from 'react-icons/io';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Scroll to top smoothly
  const easeInOutQuad = (t) => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  };

  const scrollToTop = () => {
    const duration = 1000;
    const start = window.pageYOffset;
    const startTime = performance.now();

    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      window.scrollTo(0, start * (1 - easeInOutQuad(progress)));
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };
  // Updated useEffect with proper cleanup
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {isVisible && (
        <div
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 z-50 cursor-pointer bg-primary-color hover:bg-slate-700 
                     text-white p-3 rounded-full shadow-lg transition-all duration-300 
                     hover:scale-110"
        >
          <IoIosArrowUp size={24} />
        </div>
      )}
    </>
  );
};

export default BackToTop;