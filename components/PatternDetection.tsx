
import React from 'react';
import { AIInsights } from '../types';

interface PatternDetectionProps {
  insights: AIInsights;
  onNext: () => void;
  onBack: () => void;
}

const PatternDetection: React.FC<PatternDetectionProps> = ({ insights, onNext, onBack }) => {
  return (
    <div className="w-full text-center space-y-12 animate-in fade-in duration-1000 py-12">
      <div className="mb-2 inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-[#30363d] text-[#8b949e] text-[10px] font-medium tracking-[0.3em] uppercase">
        Silent Intelligence
      </div>
      
      <h2 className="text-4xl md:text-5xl font-display font-bold text-[#f0f6fc] mb-12">
        Patterns we noticed...
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
        {insights.patterns.map((pattern, idx) => (
          <div 
            key={idx} 
            className="p-8 rounded-[2rem] bg-[#161b22]/50 border border-[#30363d]/50 backdrop-blur-sm animate-in slide-in-from-bottom-6 duration-1000"
            style={{ animationDelay: `${idx * 400}ms` }}
          >
            <div className="w-10 h-10 rounded-full bg-[#30363d] flex items-center justify-center mb-6 text-[#8b949e]">
              {idx === 0 ? '○' : '□'}
            </div>
            <p className="text-xl text-[#c9d1d9] leading-relaxed font-light">
              {pattern}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col md:flex-row gap-4 justify-center items-center">
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
          Reveal Insights
          <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5Z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PatternDetection;
