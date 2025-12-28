
import React, { useEffect, useState } from 'react';
import { AIInsights } from '../types';

interface ArchetypeRevealProps {
  insights: AIInsights;
  onNext: () => void;
  onBack: () => void;
}

const ArchetypeReveal: React.FC<ArchetypeRevealProps> = ({ insights, onNext, onBack }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="text-center relative flex flex-col items-center justify-center min-h-[60vh] w-full py-12">
      {/* Spotlight Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className={`transition-all duration-1000 transform ${show ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        <div className="mb-6 text-[#8b949e] font-mono text-[11px] tracking-[0.5em] uppercase">
          Final Identity Revealed
        </div>
        
        <div className="relative mb-10 group px-4">
          <h2 className="text-6xl md:text-[7rem] font-display font-black tracking-tighter text-[#f0f6fc] leading-[0.85] filter drop-shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-1000">
            {insights.archetype.toUpperCase()}
          </h2>
          {/* Subtle underline scanline animation */}
          <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent mt-8 opacity-50"></div>
        </div>

        <p className="text-lg md:text-xl text-[#8b949e] max-w-lg mx-auto leading-relaxed mb-16 italic font-light px-8">
          "{insights.archetypeDescription}"
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <button 
            onClick={onBack}
            className="bg-transparent border border-[#30363d] text-[#8b949e] font-bold px-12 py-5 rounded-full hover:bg-[#161b22] hover:text-white transition-all active:scale-[0.98] text-lg flex items-center gap-3"
          >
            <svg className="w-5 h-5 rotate-180" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5Z"></path>
            </svg>
            Back
          </button>
          <button 
            onClick={onNext}
            className="bg-[#f0f6fc] text-[#0d1117] font-bold px-12 py-6 rounded-full hover:scale-105 active:scale-[0.98] transition-all shadow-2xl text-xl flex items-center gap-4 group"
          >
            Claim My Wrapped Card
            <svg className="w-6 h-6 transition-transform group-hover:translate-x-1" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5Z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArchetypeReveal;
