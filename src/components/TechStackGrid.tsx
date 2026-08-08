import React, { useState, useEffect, useRef } from 'react';
import { siteConfig } from '../config/site';
import TechStackIcon from './TechStackIcon';

export default function TechStackGrid() {
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);
  const [isTouch, setIsTouch] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect touch capability and motion preference
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    // Close tooltip on tap outside
    const handleOutsideClick = (e: MouseEvent) => {
      if (gridRef.current && !gridRef.current.contains(e.target as Node)) {
        setActiveTooltip(null);
      }
    };
    document.addEventListener('click', handleOutsideClick);

    // ─── GSAP animation runs HERE (post-hydration) ───────────────────────────
    // The Astro <script> in TechStack.astro runs before this React island mounts,
    // so .tech-card elements don't exist yet. By running GSAP inside useEffect we
    // guarantee cards are in the DOM before we try to animate them.
    const initAnimations = async () => {
      if (prefersReducedMotion) return;
      
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      const VanillaTilt = (await import('vanilla-tilt')).default;

      gsap.registerPlugin(ScrollTrigger);

      const cards = document.querySelectorAll('.tech-card');

      // VanillaTilt 3D hover effect
      if (cards.length > 0) {
        VanillaTilt.init(Array.from(cards) as HTMLElement[], {
          max: 12,
          speed: 1000,
          glare: true,
          'max-glare': 0.15,
          perspective: 1000,
          scale: 1.02,
        });
      }

      // Staggered entrance — runs once when section scrolls into view
      gsap.fromTo('.tech-card', 
        {
          opacity: 0,
          y: 40,
          scale: 0.95,
        },
        {
          scrollTrigger: {
            trigger: '#tech-stack',
            start: 'top 80%',
            once: true,
          },
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.06,
          duration: 1.2,
          ease: 'power3.out',
          clearProps: 'all',
          onComplete: () => {
            document.querySelectorAll('.tech-card').forEach((el) => {
              (el as HTMLElement).style.opacity = '1';
              (el as HTMLElement).style.transform = 'none';
            });
          },
        }
      );

      // Safety fallback: ensure cards end fully visible even if ScrollTrigger misfires
      setTimeout(() => {
        document.querySelectorAll('.tech-card').forEach((el) => {
          const htmlEl = el as HTMLElement;
          if (htmlEl.style.opacity === '0' || window.getComputedStyle(htmlEl).opacity === '0') {
            gsap.set(htmlEl, { clearProps: "all" });
            htmlEl.style.opacity = '1';
            htmlEl.style.transform = 'none';
          }
        });
      }, 2500);
    };

    initAnimations();

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [prefersReducedMotion]);

  const handleCardClick = (e: React.MouseEvent, index: number) => {
    if (isTouch) {
      e.stopPropagation();
      setActiveTooltip(activeTooltip === index ? null : index);
    }
  };

  const handleCardKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveTooltip(activeTooltip === index ? null : index);
    }
  };

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 px-4 md:px-0 max-w-[1000px] mx-auto mt-12"
    >
      {siteConfig.techStack.map((tech, index) => {
        const isOpened = activeTooltip === index;
        return (
          <div
            key={tech.name}
            className="tech-card relative group flex flex-col items-center justify-center p-8 rounded-2xl glass-card border border-white/5 bg-white/5 backdrop-blur-md cursor-pointer hover:border-pink-500/30 transition-all duration-500 ease-out select-none"
            role="button"
            tabIndex={0}
            aria-expanded={isOpened}
            aria-label={`${tech.name} — click for skills`}
            data-tilt
            onClick={(e) => handleCardClick(e, index)}
            onKeyDown={(e) => handleCardKeyDown(e, index)}
            onMouseEnter={() => !isTouch && setActiveTooltip(index)}
            onMouseLeave={() => !isTouch && setActiveTooltip(null)}
          >
            {/* Ambient neon backdrop glow on hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/0 via-pink-500/0 to-orange-500/0 group-hover:from-purple-500/5 group-hover:via-pink-500/5 group-hover:to-orange-500/5 transition-all duration-500 ease-out pointer-events-none"></div>

            {/* The Logo */}
            <div className="w-14 h-14 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors duration-500 ease-out transform group-hover:scale-110 duration-300">
              <TechStackIcon iconName={tech.icon} className="w-12 h-12" />
            </div>

            {/* The Name */}
            <span className="mt-4 font-display font-extrabold text-gray-300 group-hover:text-white transition-colors duration-500 ease-out text-sm tracking-wide">
              {tech.name}
            </span>

            {/* Premium Floating Tooltip */}
            <div
              className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-72 p-5 rounded-xl border border-white/10 bg-[#121214]/95 backdrop-blur-xl shadow-2xl transition-all duration-300 ease-out z-50 origin-bottom select-none
                ${isOpened
                  ? 'opacity-100 scale-100 translate-y-0 visible'
                  : 'opacity-0 scale-95 translate-y-2 invisible group-hover:md:opacity-100 group-hover:md:scale-100 group-hover:md:translate-y-0 group-hover:md:visible'
                }
              `}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Tooltip Header */}
              <div className="text-white font-display font-extrabold text-base mb-3 border-b border-white/10 pb-2 flex items-center justify-between">
                <span>{tech.name}</span>
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#9d2ba8] to-[#e53e9a] animate-pulse"></span>
              </div>

              {/* Tooltip Bullet Points */}
              <ul className="space-y-2 text-left pl-0 m-0 list-none">
                {tech.skills.map((skill, idx) => (
                  <li key={idx} className="text-gray-400 text-xs font-sans leading-relaxed flex items-start gap-2">
                    <span className="text-pink-500 text-sm leading-none mt-0.5 select-none">•</span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>

              {/* Tooltip Arrow */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-[8px] border-transparent border-t-[#121214]/95 filter drop-shadow(0 4px 6px rgba(0,0,0,0.5))"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
