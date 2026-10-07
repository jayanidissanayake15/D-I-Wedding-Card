import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MonogramSeal from './MonogramSeal';

export default function MainInvitation({ config }) {
  const [guestName, setGuestName] = useState('Family & Friends');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get('to');
    if (to) {
      setGuestName(to);
    }
  }, []);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative flex flex-col md:flex-row items-center md:items-stretch overflow-hidden px-4 md:px-0"
    >
      {/* Mobile-only Monogram & Heading (Hidden on Desktop) */}
      <div className="md:hidden flex flex-col items-center w-full pb-8 z-10 relative mt-8">
        <MonogramSeal variant="ivory" className="mb-6" />
        <div className="font-serif italic text-chocolate/80 text-sm tracking-widest uppercase mb-6 text-center px-4">
          Together with their families
        </div>
        
        <div className="flex flex-col items-center text-center space-y-2">
          <h1 className="font-calligraphy text-5xl text-chocolate leading-none">
            {config.names.bride}
          </h1>
          <span className="font-calligraphy text-2xl text-antique-gold">&</span>
          <h1 className="font-calligraphy text-5xl text-chocolate leading-none">
            {config.names.groom}
          </h1>
        </div>
      </div>

      {/* Couple Illustration Section (Left on Desktop, Middle on Mobile) */}
      <div className="relative w-full md:w-[45%] flex items-center justify-center p-0 md:p-8 min-h-[350px] md:min-h-[600px] md:border-r border-antique-gold/20">
        {/* Subtle Poruwa Background */}
        <div 
          className="absolute inset-0 bg-contain bg-center bg-no-repeat opacity-15"
          style={{ backgroundImage: `url(${config.artwork.poruwa})` }}
        ></div>
        
        {/* Couple Illustration */}
        <img 
          src={config.artwork.couple} 
          alt="Kandyan Wedding Couple" 
          className="relative z-10 object-contain w-full h-full max-h-[450px] md:max-h-[650px] drop-shadow-md mix-blend-multiply"
        />
      </div>

      {/* Text Section (Right on Desktop, Bottom on Mobile) */}
      <div className="w-full md:w-[55%] flex flex-col items-center justify-center p-4 md:p-12 text-center relative z-10">
        
        {/* Desktop-only Monogram & Names */}
        <div className="hidden md:flex flex-col items-center w-full mb-12">
          <MonogramSeal variant="ivory" className="mb-8" />
          
          <div className="font-serif italic text-chocolate/80 text-sm tracking-widest uppercase mb-8">
            Together with their families
          </div>

          <div className="flex flex-col items-center space-y-4">
            <h1 className="font-calligraphy text-7xl text-chocolate leading-tight">
              {config.names.bride}
            </h1>
            <span className="font-serif text-[13px] text-chocolate/70 uppercase tracking-widest">
              Daughter of {config.parents.bride}
            </span>
            
            <span className="font-calligraphy text-4xl text-antique-gold my-2">&</span>
            
            <h1 className="font-calligraphy text-7xl text-chocolate leading-tight">
              {config.names.groom}
            </h1>
            <span className="font-serif text-[13px] text-chocolate/70 uppercase tracking-widest">
              Son of {config.parents.groom}
            </span>
          </div>
        </div>

        {/* Mobile Parents (Since names are at the top on mobile) */}
        <div className="md:hidden flex flex-col items-center space-y-6 mt-8 mb-8 text-chocolate/70 font-serif text-[13px] uppercase tracking-widest">
          <span>Daughter of {config.parents.bride}</span>
          <span>Son of {config.parents.groom}</span>
        </div>

        {/* Invitation Wording */}
        <div className="mt-4 md:mt-12 max-w-sm mx-auto text-chocolate font-serif leading-relaxed text-lg md:text-xl">
          <p className="italic text-antique-gold mb-6 text-xl">Dear {guestName},</p>
          Request the honour of your presence<br/>
          at the celebration of their wedding.
        </div>
      </div>
    </motion.section>
  );
}
