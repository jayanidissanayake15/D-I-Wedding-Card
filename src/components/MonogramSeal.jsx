import React from 'react';
import { weddingConfig } from '../weddingConfig';

export default function MonogramSeal({ variant = 'ivory', className = '' }) {
  const isGold = variant === 'gold';
  
  return (
    <div 
      className={`flex items-center justify-center shrink-0 rounded-full border-2 shadow-sm ${
        isGold 
          ? 'bg-[#C5A15B] border-[#996D2D] shadow-[inset_0_0_10px_rgba(67,45,35,0.4),0_4px_6px_-1px_rgba(0,0,0,0.1)]' 
          : 'bg-[#FAF7F2] border-[#B58B4B]'
      } ${className}`}
      style={{
        width: 'clamp(76px, 15vw, 88px)',
        height: 'clamp(76px, 15vw, 88px)'
      }}
    >
      {isGold && (
        <div className="w-full h-full rounded-full border border-champagne-gold/60 absolute pointer-events-none m-1"></div>
      )}
      <span 
        className="text-[#432D23] flex items-center justify-center w-full px-2"
        style={{ 
          fontFamily: '"Cormorant Garamond", serif', 
          fontWeight: 500,
          whiteSpace: 'nowrap',
          lineHeight: 1,
          margin: 0,
          letterSpacing: 'normal',
          fontSize: 'clamp(22px, 5vw, 26px)'
        }}
      >
        {weddingConfig.names.monogram || 'D & I'}
      </span>
    </div>
  );
}
