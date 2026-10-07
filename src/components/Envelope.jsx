import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingConfig } from '../weddingConfig';
import MonogramSeal from './MonogramSeal';

export default function Envelope({ onStart, onOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const [guestName, setGuestName] = useState('Family & Friends');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get('to');
    if (to) {
      setGuestName(to);
    }
  }, []);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    
    // Call onStart immediately (synchronously) inside the click handler to satisfy browser autoplay policies
    if (onStart) onStart();
    
    if (prefersReducedMotion) {
      onOpen();
    } else {
      setTimeout(() => {
        onOpen();
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-chocolate overflow-hidden min-h-[100svh]">
      
      {/* Background Layered Brown Tones & Inset Frame */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-gradient-to-br from-[#4a3227] via-chocolate to-[#34221a]">
        {/* Fine Inset Gold Frame */}
        <div className="absolute inset-4 md:inset-8 border border-antique-gold/40 rounded-sm"></div>
        <div className="absolute inset-[20px] md:inset-[36px] border border-champagne-gold/20 rounded-sm"></div>

        {/* Upper Left Kandyan Liyawela Ornament */}
        <svg className="absolute top-0 left-0 w-[60%] md:w-[35%] h-auto opacity-30 drop-shadow-md text-antique-gold" viewBox="0 0 500 500" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0 H500 C250 50, 100 200, 0 500 V0 Z" fill="url(#liyawela-pattern-brown)" />
        </svg>

        {/* Lower Right Kandyan Liyawela Ornament */}
        <svg className="absolute bottom-0 right-0 w-[60%] md:w-[35%] h-auto opacity-30 drop-shadow-md text-antique-gold" viewBox="0 0 500 500" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M500 500 H0 C250 450, 400 300, 500 0 V500 Z" fill="url(#liyawela-pattern-brown)" />
        </svg>

        <svg width="0" height="0">
          <defs>
            <pattern id="liyawela-pattern-brown" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M40 10 C55 10, 65 30, 80 30" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M0 30 C15 30, 25 10, 40 10" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <circle cx="40" cy="30" r="3" fill="currentColor" />
            </pattern>
          </defs>
        </svg>
      </div>

      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50, filter: 'blur(5px)' }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center justify-center w-full z-10 px-5"
          >
            {/* Header Text Above Envelope (Ivory) */}
            <div className="text-center mb-8 md:mb-10 w-full">
              <span className="block font-serif text-[10px] md:text-sm uppercase tracking-[0.3em] text-antique-gold mb-2">The Wedding Of</span>
              <h1 className="font-calligraphy text-5xl md:text-6xl text-ivory drop-shadow-md" style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)' }}>
                {weddingConfig.names.bride} <span className="text-antique-gold">&</span> {weddingConfig.names.groom}
              </h1>
            </div>

            {/* Complete Ivory Envelope Container */}
            <div 
              className="relative flex flex-col items-center mx-auto"
              style={{
                width: 'clamp(280px, calc(100vw - 40px), 600px)',
                aspectRatio: '1.5 / 1',
                maxWidth: '600px'
              }}
            >
              {/* Back paper body (inside) */}
              <div className="absolute inset-0 bg-[#E8E3D2] rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-antique-gold/40 flex flex-col items-center overflow-hidden">
                {/* Inside Greeting Content (only visible during open) */}
                <motion.div 
                   className="mt-6 flex flex-col items-center px-6 text-center z-10"
                   animate={isOpen ? { opacity: 1, y: -20 } : { opacity: 0, y: 0 }}
                >
                   <p className="font-serif italic text-chocolate text-xl">{guestName}</p>
                </motion.div>
              </div>

              {/* Side Flaps and Bottom Fold (Front of Envelope) */}
              <motion.div 
                className="absolute inset-0 pointer-events-none overflow-hidden rounded-sm"
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {/* Left Flap */}
                <div className="absolute top-0 left-0 bottom-0 w-[55%] bg-[#F2ECE0] shadow-[3px_0_15px_rgba(0,0,0,0.1)] border-r border-antique-gold/30"
                     style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}></div>
                {/* Right Flap */}
                <div className="absolute top-0 right-0 bottom-0 w-[55%] bg-[#F2ECE0] shadow-[-3px_0_15px_rgba(0,0,0,0.1)] border-l border-antique-gold/30"
                     style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }}></div>
                {/* Bottom Flap */}
                <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-[#FDFBF7] shadow-[0_-5px_15px_rgba(0,0,0,0.15)] border-t border-antique-gold/40"
                     style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }}>
                  
                  {/* Text on Bottom Flap */}
                  <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center px-4 text-center z-20">
                    <span className="text-antique-gold font-serif text-[10px] md:text-xs tracking-widest uppercase mb-1 drop-shadow-sm">A special invitation for</span>
                    <span className="text-[#432D23] font-serif italic text-base md:text-xl font-medium px-4 break-words w-full line-clamp-2">{guestName}</span>
                  </div>
                </div>
              </motion.div>

              {/* Envelope flap visual (top triangle) */}
              <motion.div 
                className="absolute top-0 left-0 right-0 h-[55%] border-b border-black/10 origin-top bg-[#FDFBF7] z-30 shadow-[0_5px_15px_rgba(0,0,0,0.15)] flex justify-center items-end pb-0"
                style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
                animate={isOpen ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 30 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              >
                {/* Fine gold edging on flap */}
                <div className="absolute inset-0 border-b-[3px] border-antique-gold/50 pointer-events-none" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}></div>
              </motion.div>

              {/* Seal */}
              <motion.div 
                className="absolute top-[50%] -mt-[44px] md:-mt-[44px] z-40 pointer-events-none"
                animate={isOpen ? { opacity: 0, scale: 0.5 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <MonogramSeal variant="gold" className="relative" />
              </motion.div>

            </div>

            {/* Prominent Open Invitation Button */}
            <motion.button
              onClick={handleOpen}
              className="mt-10 md:mt-12 bg-[#C5A15B] text-[#34221a] font-serif uppercase tracking-widest text-sm md:text-base font-bold w-full md:w-[220px] max-w-[300px] min-h-[52px] rounded-[10px] border border-[#D6BC86] shadow-lg hover:bg-[#D6BC86] hover:shadow-xl active:scale-95 transition-all outline-none focus:ring-2 focus:ring-ivory focus:ring-offset-2 focus:ring-offset-[#34221a] flex items-center justify-center relative z-20"
              whileHover={{ y: -2 }}
              whileTap={{ y: 2 }}
              disabled={isOpen}
              aria-label="Open Invitation"
            >
              Open Invitation
            </motion.button>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
