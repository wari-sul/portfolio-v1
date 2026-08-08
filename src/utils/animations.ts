import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VanillaTilt from 'vanilla-tilt';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export interface TiltOptions {
  max?: number;
  speed?: number;
  maxGlare?: number;
  perspective?: number;
  scale?: number;
  gyroscope?: boolean;
}

/** Initialize VanillaTilt on every element matching the selector. No-op if none match. */
export function initTilt(selector: string, options: TiltOptions = {}) {
  const elements = document.querySelectorAll(selector);
  if (elements.length === 0) return;
  VanillaTilt.init(Array.from(elements) as HTMLElement[], {
    max: options.max ?? 10,
    speed: options.speed ?? 700,
    glare: true,
    'max-glare': options.maxGlare ?? 0.12,
    perspective: options.perspective ?? 1200,
    ...(options.scale !== undefined && { scale: options.scale }),
    ...(options.gyroscope !== undefined && { gyroscope: options.gyroscope }),
  });
}
