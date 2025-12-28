
import React from 'react';
import { AIInsights } from '../types';

interface AIInsightsSlideProps {
  insights: AIInsights;
  onNext: () => void;
  onBack: () => void;
}

const AIInsightsSlide: React.FC<AIInsightsSlideProps> = ({ insights, onNext, onBack }) => {
  return (
    <div className="w-full max-w-2xl mx-auto animate-in fade-in duration-1000 py-12">
      <div className="text-center mb-12">
        <div className="mb-4 inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-[#30363d] text-[#8b949e] text-[10px] font-medium tracking-[0.3em] uppercase">
          Chapter III
        </div>
        <h2 className="text-4xl font-display font-bold text-[#f0f6fc] mb-4">Growth Layer</h2>
        <p className="text-[#8b949e] italic font-light">Interpreting your journey through AI.</p>
      </div>

      <div className="space-y-6">
        {insights.insights.map((insight, idx) => (
          <div 
            key={idx} 
            className="flex gap-6 items-start p-8 rounded-[1.5rem] bg-[#161b22]/40 border-l-4 border-purple-500 animate-in slide-in-from-right-8 duration-700"
            style={{ animationDelay: `${idx * 500}ms` }}
          >
            <span className="text-purple-500 font-mono text-xs pt-1 uppercase tracking-widest">Insight {idx + 1}</span>
            <p className="text-xl text-[#c9d1d9] leading-relaxed font-light">
              {insight}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 flex flex-col md:flex-row gap-4 justify-center items-center">
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
          View Your Story
          <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5Z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AIInsightsSlide;
