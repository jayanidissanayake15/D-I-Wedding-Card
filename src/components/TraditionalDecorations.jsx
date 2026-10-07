import React from 'react';
import { motion } from 'framer-motion';

const LotusPetal = ({ delay = 0, duration = 10, left = "10%" }) => (
  <motion.svg
    className="absolute top-0 text-antique-gold/20"
    style={{ left, width: '20px', height: '20px' }}
    viewBox="0 0 100 100"
    initial={{ y: -50, opacity: 0, rotate: 0 }}
    animate={{ 
      y: ['0vh', '100vh'], 
      opacity: [0, 0.8, 0.8, 0],
      rotate: [0, 180, 360],
      x: [0, 50, -50, 0]
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "linear"
    }}
  >
    <path fill="currentColor" d="M50 0 C70 40, 90 60, 50 100 C10 60, 30 40, 50 0 Z" />
  </motion.svg>
);

const LampFire = () => (
  <motion.svg
    className="absolute top-[-15px] left-1/2 -ml-[6px] w-3 h-5 text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]"
    viewBox="0 0 100 100"
    animate={{ 
      scale: [1, 1.1, 0.9, 1.05, 1],
      rotate: [-5, 5, -3, 3, -5],
      opacity: [0.8, 1, 0.9, 1, 0.8]
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <path fill="currentColor" d="M50 0 C80 50, 80 100, 50 100 C20 100, 20 50, 50 0 Z" />
  </motion.svg>
);

const TraditionalLamp = ({ className = "" }) => (
  <div className={`relative flex flex-col items-center ${className}`}>
    <LampFire />
    <svg className="w-12 h-20 text-antique-gold drop-shadow-md" viewBox="0 0 100 160" fill="currentColor">
      {/* Traditional Brass Lamp (Pahana) SVG */}
      <path d="M40 0 H60 V10 H40 Z" />
      <path d="M30 10 C30 10, 70 10, 70 10 C80 20, 80 30, 50 40 C20 30, 20 20, 30 10 Z" />
      <path d="M45 40 H55 V120 H45 Z" />
      <path d="M30 60 H70 V70 H30 Z" />
      <path d="M20 120 C20 120, 80 120, 80 120 C90 140, 90 150, 50 160 C10 150, 10 140, 20 120 Z" />
      <circle cx="50" cy="80" r="5" />
      <circle cx="50" cy="100" r="5" />
    </svg>
  </div>
);

export function FallingPetals() {
  const petals = Array.from({ length: 8 }).map((_, i) => ({
    left: `${Math.random() * 90 + 5}%`,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 7
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map((p, i) => (
        <LotusPetal key={i} left={p.left} delay={p.delay} duration={p.duration} />
      ))}
    </div>
  );
}

export function AnimatedLamps() {
  return (
    <div className="flex justify-center items-center space-x-12 mt-12 mb-8 relative z-10 w-full opacity-90">
      <TraditionalLamp className="scale-75 md:scale-100" />
      <div className="h-[2px] w-24 bg-antique-gold/30"></div>
      <TraditionalLamp className="scale-75 md:scale-100" />
    </div>
  );
}
