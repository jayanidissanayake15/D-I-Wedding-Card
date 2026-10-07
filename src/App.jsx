import React, { useState, useEffect, useRef } from 'react';
import Envelope from './components/Envelope';
import MainInvitation from './components/MainInvitation';
import Details from './components/Details';
import Countdown from './components/Countdown';
import RSVP from './components/RSVP';
import Finishing from './components/Finishing';
import { weddingConfig } from './weddingConfig';
import { Volume2, VolumeX, Play } from 'lucide-react';
import { FallingPetals } from './components/TraditionalDecorations';

function App() {
  const [opened, setOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (weddingConfig.music?.src) {
      const audio = new Audio(weddingConfig.music.src);
      audio.loop = true;
      audio.volume = 0.25; // 25% volume
      audioRef.current = audio;
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const handleStartOpen = () => {
    if (audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        })
        .catch(e => {
          console.log("Audio play failed on open:", e);
          setIsPlaying(false);
        });
    }
  };

  const handleCompleteOpen = () => {
    setOpened(true);
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    
    if (!isPlaying) {
      // Browser blocked autoplay, so start it now manually
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
          audioRef.current.muted = false;
        })
        .catch(e => console.log("Audio play failed:", e));
    } else {
      // Track is playing, just toggle mute state
      const newMutedState = !isMuted;
      audioRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  return (
    <div className="min-h-screen bg-chocolate text-chocolate font-sans selection:bg-antique-gold/30 overflow-x-hidden relative">
      
      {/* 2nd Screen Background Shapes (Behind Content) */}
      {opened && (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-chocolate">
          {/* Sweeping Darker Brown Curves */}
          <svg className="absolute top-0 left-0 w-full h-[60vh] text-[#34221a] drop-shadow-lg opacity-80" preserveAspectRatio="none" viewBox="0 0 1440 600" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,0 L1440,0 L1440,200 C960,600 480,0 0,400 Z" />
            <path d="M0,0 L1440,0 L1440,200 C960,600 480,0 0,400" stroke="#B58B4B" strokeWidth="2" fill="none" />
          </svg>
          <svg className="absolute bottom-0 right-0 w-full h-[50vh] text-[#2c1d16] drop-shadow-lg opacity-80" preserveAspectRatio="none" viewBox="0 0 1440 500" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M1440,500 L0,500 L0,300 C480,-100 960,500 1440,100 Z" />
            <path d="M1440,500 L0,500 L0,300 C480,-100 960,500 1440,100" stroke="#B58B4B" strokeWidth="2" fill="none" />
          </svg>
          <FallingPetals />
        </div>
      )}

      {!opened && <Envelope onStart={handleStartOpen} onOpen={handleCompleteOpen} />}
      
      {opened && (
        <>
          <main className="relative z-10 w-full max-w-4xl mx-auto py-8 md:py-16 px-4 md:px-8 pb-32">
            <div className="bg-[#FAF7F2] rounded-sm shadow-2xl relative overflow-hidden">
              {/* Fine Inset Brown Frame for the entire paper panel */}
              <div className="absolute inset-2 md:inset-4 border border-chocolate/40 rounded-sm pointer-events-none z-0"></div>
              <div className="absolute inset-3 md:inset-5 border border-chocolate/20 rounded-sm pointer-events-none z-0"></div>
              
              <div className="relative z-10 space-y-16 md:space-y-24 py-16 md:py-24">
                <MainInvitation config={weddingConfig} />
                <Details config={weddingConfig} />
                {weddingConfig.date && <Countdown config={weddingConfig} />}
                <RSVP config={weddingConfig} />
                <Finishing config={weddingConfig} />
              </div>
            </div>
          </main>

          {/* Global Music Control */}
          {weddingConfig.music?.src && (
            <button 
              onClick={toggleMusic}
              className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-6 min-h-[44px] min-w-[44px] px-4 py-2 bg-[#C5A15B] rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.2)] border border-[#D6BC86] text-chocolate hover:bg-[#D6BC86] transition-colors z-50 group outline-none focus:ring-2 focus:ring-ivory focus:ring-offset-2 focus:ring-offset-chocolate flex items-center justify-center space-x-2"
              aria-label={!isPlaying ? "Play music" : isMuted ? "Unmute music" : "Mute music"}
            >
              {!isPlaying ? (
                <>
                  <Play className="w-5 h-5 fill-current" />
                  <span className="font-serif text-sm uppercase tracking-widest font-semibold pr-1">Play Music</span>
                </>
              ) : isMuted ? (
                <>
                  <VolumeX className="w-5 h-5" />
                  <span className="font-serif text-sm uppercase tracking-widest font-semibold pr-1">Unmute</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-5 h-5" />
                  <span className="font-serif text-sm uppercase tracking-widest font-semibold pr-1">Mute</span>
                </>
              )}
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default App;
