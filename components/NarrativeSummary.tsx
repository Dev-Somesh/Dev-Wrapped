
import React from 'react';
import { AIInsights } from '../types';

interface NarrativeSummaryProps {
  insights: AIInsights;
  onNext: () => void;
  onBack: () => void;
}

const NarrativeSummary: React.FC<NarrativeSummaryProps> = ({ insights, onNext, onBack }) => {
  return (
    <div className="text-center max-w-3xl mx-auto animate-in fade-in zoom-in-95 duration-2000 py-12">
      <div className="w-px h-24 bg-gradient-to-b from-transparent via-purple-500 to-transparent mx-auto mb-12"></div>
      
      <p className="text-2xl md:text-3xl lg:text-4xl font-display leading-[1.7] text-[#c9d1d9] font-light italic">
        {insights.narrative.split('.').map((sentence, i) => (
          sentence && (
            <span key={i} className="block mb-8 animate-in fade-in duration-1000" style={{ animationDelay: `${i * 1.5}s` }}>
              {sentence.trim()}.
            </span>
          )
        ))}
      </p>

      <div className="mt-20 flex flex-col md:flex-row gap-4 justify-center items-center animate-in fade-in duration-1000" style={{ animationDelay: '5s' }}>
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
          className="bg-[#f0f6fc] text-[#0d1117] font-bold px-12 py-5 rounded-full hover:scale-105 active:scale-[0.98] transition-all shadow-xl text-lg flex items-center gap-3 group"
        >
          Discover Your Archetype
          <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5Z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NarrativeSummary;
