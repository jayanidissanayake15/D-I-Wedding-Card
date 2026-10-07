import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Countdown({ config }) {
  const calculateTimeLeft = () => {
    if (!config.date.timestamp) return null;
    
    const difference = +new Date(config.date.timestamp) - +new Date();
    
    if (difference <= 0) {
      return null;
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [config.date.timestamp]);

  if (!timeLeft) {
    return (
      <div className="text-center font-serif text-2xl text-antique-gold italic py-8 max-w-xl mx-auto tracking-widest px-4">
        The Celebration Has Begun
      </div>
    );
  }

  const TimeBlock = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <span className="font-serif text-3xl sm:text-5xl md:text-6xl text-chocolate font-light">{value.toString().padStart(2, '0')}</span>
      <span className="text-[10px] sm:text-xs uppercase tracking-widest sm:tracking-[0.2em] text-antique-gold font-semibold mt-3 sm:mt-4">{label}</span>
    </div>
  );

  const Divider = () => (
    <div className="h-10 sm:h-16 w-px bg-champagne-gold/50 mx-1 sm:mx-4 md:mx-6 self-start mt-2"></div>
  );

  return (
    <motion.section 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="flex justify-center w-full max-w-2xl mx-auto py-8 sm:py-12 px-2 sm:px-4 overflow-hidden"
    >
      <div className="flex justify-between items-center w-full max-w-md mx-auto">
        <TimeBlock value={timeLeft.days} label="Days" />
        <Divider />
        <TimeBlock value={timeLeft.hours} label="Hours" />
        <Divider />
        <TimeBlock value={timeLeft.minutes} label="Mins" />
        <Divider />
        <TimeBlock value={timeLeft.seconds} label="Secs" />
      </div>
    </motion.section>
  );
}
