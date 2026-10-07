import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { AnimatedLamps } from './TraditionalDecorations';

// Lotus Divider SVG
const LotusDivider = () => (
  <svg width="200" height="40" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto text-antique-gold opacity-80 my-8">
    <path d="M50 20 L90 20 M110 20 L150 20" stroke="currentColor" strokeWidth="1" />
    <path d="M100 25 C95 25, 90 20, 100 15 C110 20, 105 25, 100 25 Z" fill="currentColor" />
    <path d="M100 25 C90 25, 85 15, 100 5 C115 15, 110 25, 100 25 Z" stroke="currentColor" strokeWidth="1" />
    <circle cx="50" cy="20" r="2" fill="currentColor" />
    <circle cx="150" cy="20" r="2" fill="currentColor" />
  </svg>
);

const Calendar = () => {
  const daysInMonth = 31;
  const startDay = 2; // Dec 1, 2026 is Tuesday (0=Sun, 1=Mon, 2=Tue)
  const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  // Generate grid
  const grid = [];
  for (let i = 0; i < startDay; i++) {
    grid.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    grid.push(i);
  }

  return (
    <div className="flex flex-col items-center mt-12 mb-8 relative border border-antique-gold/30 rounded-sm p-6 md:p-8 bg-ivory shadow-sm w-full max-w-sm mx-auto overflow-hidden">
      {/* Subtle Kandyan Ornaments */}
      <svg className="absolute top-0 left-0 w-16 h-16 opacity-20 text-antique-gold" viewBox="0 0 100 100" fill="currentColor">
        <path d="M0 0 C50 0, 100 50, 100 100 L0 100 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
        <circle cx="20" cy="80" r="5" />
      </svg>
      <svg className="absolute bottom-0 right-0 w-16 h-16 opacity-20 text-antique-gold rotate-180" viewBox="0 0 100 100" fill="currentColor">
        <path d="M0 0 C50 0, 100 50, 100 100 L0 100 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
        <circle cx="20" cy="80" r="5" />
      </svg>

      <h4 className="font-serif text-xl md:text-2xl text-chocolate uppercase tracking-widest mb-6">December 2026</h4>
      
      <div className="grid grid-cols-7 gap-2 w-full text-center font-serif text-chocolate/80 text-sm mb-2 uppercase">
        {weekdays.map((day, i) => <div key={i}>{day}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-y-3 gap-x-2 w-full text-center font-serif text-chocolate">
        {grid.map((date, i) => (
          <div key={i} className="flex items-center justify-center h-8 md:h-10 relative">
            {date === 3 ? (
              <div 
                className="absolute inset-0 flex items-center justify-center z-10"
                aria-label="Wedding day, 3 December 2026"
                role="text"
              >
                <svg className="w-8 h-8 md:w-10 md:h-10 text-antique-gold drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <span className="absolute text-ivory text-sm md:text-base font-semibold -mt-[2px]">{date}</span>
              </div>
            ) : (
              <span className="text-sm md:text-base opacity-80" aria-hidden={date === null}>{date}</span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 text-center border-t border-antique-gold/20 pt-6 w-full">
        <p className="font-serif italic text-antique-gold text-lg mb-1">Our special day</p>
        <p className="font-serif text-chocolate uppercase tracking-widest text-sm">03 December 2026</p>
      </div>
    </div>
  );
};

export default function Details({ config }) {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center text-center px-6 max-w-2xl mx-auto"
    >
      {/* Date & Time */}
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center space-x-4 text-chocolate font-serif text-2xl md:text-3xl tracking-widest">
          <span>{config.date.month}</span>
          <span className="text-antique-gold/50 text-3xl">|</span>
          <span className="text-4xl">{config.date.day}</span>
          <span className="text-antique-gold/50 text-3xl">|</span>
          <span>{config.date.year}</span>
        </div>
        <div className="text-lg md:text-xl font-serif text-chocolate/90 tracking-wide mt-2">
          {config.time.event}
        </div>
      </div>

      <LotusDivider />

      {/* Poruwa Feature */}
      <div className="flex flex-col items-center space-y-6 w-full py-4">
        <img 
          src={config.artwork.poruwa} 
          alt="Poruwa Ceremony" 
          className="w-48 md:w-64 opacity-90 mix-blend-multiply drop-shadow-sm"
        />
        <div className="flex flex-col items-center">
          <h3 className="font-serif text-2xl md:text-3xl text-chocolate tracking-wide mb-2">Poruwa Ceremony</h3>
          <p className="font-serif text-xl text-antique-gold font-medium">{config.time.poruwa}</p>
        </div>
      </div>
      
      <AnimatedLamps />

      <LotusDivider />

      {/* Venue */}
      <div className="relative flex flex-col items-center space-y-4 pt-12 pb-16 w-full border border-champagne-gold/30 bg-white/30 rounded-sm">
        {/* Subtle Botanical Frame */}
        <div className="absolute top-2 left-2 w-12 h-12 border-t border-l border-antique-gold/40"></div>
        <div className="absolute top-2 right-2 w-12 h-12 border-t border-r border-antique-gold/40"></div>
        <div className="absolute bottom-2 left-2 w-12 h-12 border-b border-l border-antique-gold/40"></div>
        <div className="absolute bottom-2 right-2 w-12 h-12 border-b border-r border-antique-gold/40"></div>

        <h3 className="font-serif text-2xl md:text-3xl uppercase tracking-widest text-chocolate">{config.venue.name}</h3>
        <p className="text-chocolate/80 text-lg font-serif tracking-wider">{config.venue.location}</p>
        
        <div className="mt-6 z-10 w-full px-4">
          {config.venue.mapUrl && (
            <a 
              href={config.venue.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 px-8 py-3 border border-chocolate bg-chocolate text-ivory text-sm uppercase tracking-widest hover:bg-antique-gold hover:border-antique-gold transition-colors rounded-sm max-w-[240px] mx-auto"
            >
              <MapPin className="w-4 h-4" />
              <span>View Location</span>
            </a>
          )}
        </div>
      </div>

      <Calendar />
      
    </motion.section>
  );
}
