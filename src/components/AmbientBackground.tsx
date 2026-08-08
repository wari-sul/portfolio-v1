import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const [paused, setPaused] = useState(false);

  // Pause the WebGL render loop when the tab is hidden or user prefers reduced motion
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
      setPaused(true);
      return;
    }
    
    const handleVisibility = () => {
      setPaused(document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Generate beautiful random points in a sphere/box
  const sphere = useMemo(() => {
    const count = 1000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 10 + Math.random() * 25; // sphere shell thickness

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  // Update particles frame-by-frame
  useFrame((state) => {
    if (paused) return;
    if (ref.current) {
      // Gentle rotation over time
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.01;

      // Mouse interactive drift
      const targetX = state.pointer.x * 2;
      const targetY = state.pointer.y * 2;
      ref.current.position.x += (targetX - ref.current.position.x) * 0.03;
      ref.current.position.y += (targetY - ref.current.position.y) * 0.03;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#c92085"
          size={0.06}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.7}
        />
      </Points>
    </group>
  );
}

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-50 w-full h-full pointer-events-none bg-[#0a0a0c]">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <ParticleField />
      </Canvas>
      {/* Dark overlay for beautiful contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-[#0a0a0c] opacity-80 pointer-events-none"></div>
    </div>
  );
}
