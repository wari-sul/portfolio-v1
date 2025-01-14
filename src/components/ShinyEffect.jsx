import React from 'react';

const ShinyEffect = ({ children, className = '' }) => {
  return (
    <div className={`relative overflow-hidden group ${className}`}>
      {children}
      <div 
        className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform 
                   -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                   opacity-20 group-hover:animate-[shine_1.5s_ease-in-out_infinite]"
      />
    </div>
  );
};

export default ShinyEffect;