import React from 'react';
import { motion } from 'framer-motion';
import MonogramSeal from './MonogramSeal';

export default function Finishing({ config }) {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5 }}
      className="flex flex-col items-center text-center space-y-8 pb-16 px-6 max-w-2xl mx-auto"
    >
      <img 
        src={config.artwork.couple} 
        alt="Kandyan Couple" 
        className="w-32 h-32 object-cover object-top rounded-full border border-antique-gold/30 p-1 bg-white mix-blend-multiply opacity-90 shadow-sm"
      />

      <div className="font-serif italic text-2xl md:text-3xl text-chocolate max-w-md mx-auto leading-relaxed mt-4">
        Your gracious presence<br/>is kindly requested.
      </div>
      
      <div className="flex flex-col items-center space-y-4 pt-4">
        <h2 className="font-calligraphy text-4xl md:text-5xl text-chocolate">
          {config.names.bride} <span className="text-2xl text-antique-gold font-serif mx-2">&</span> {config.names.groom}
        </h2>
        <MonogramSeal variant="ivory" className="mt-6" />
      </div>
    </motion.section>
  );
}
