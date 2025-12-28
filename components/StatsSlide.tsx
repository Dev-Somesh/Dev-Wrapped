
import React, { useState, useEffect, useRef } from 'react';
import { GitHubStats } from '../types';

interface StatsSlideProps {
  stats: GitHubStats;
  onNext: () => void;
  onBack: () => void;
}

const StatsSlide: React.FC<StatsSlideProps> = ({ stats, onNext, onBack }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const progressIntervalRef = useRef<number | null>(null);

  const screens = [
    {
      label: "The Consistency",
      value: stats.activeDays,
      unit: "ACTIVE DAYS",
      sub: "You showed up when it mattered.",
      color: "text-[#39d353]",
      icon: "M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1zm6 0a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1zM7 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1z"
    },
    {
      label: "The Momentum",
      value: stats.totalCommits,
      unit: "CONTRIBUTIONS",
      sub: `Shipping across ${stats.reposContributed} repositories.`,
      color: "text-[#58a6ff]",
      icon: "M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7a.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"
    },
    {
      label: "The Fluency",
      value: stats.topLanguages[0]?.name || "Code",
      unit: "PRIMARY LANGUAGE",
      sub: "Your most natural tool this year.",
      color: "text-[#ff7b72]",
      icon: "M4.72 3.22a.75.75 0 0 1 1.06 1.06L2.06 8l3.72 3.72a.75.75 0 1 1-1.06 1.06L.47 8.53a.75.75 0 0 1 0-1.06l4.25-4.25Zm6.56 0a.75.75 0 1 0-1.06 1.06L13.94 8l-3.72 3.72a.75.75 0 1 0 1.06 1.06l4.25-4.25a.75.75 0 0 0 0-1.06l-4.25-4.25Z"
    },
    {
      label: "The Discipline",
      value: stats.streak,
      unit: "DAY STREAK",
      sub: "An unbroken chain of creation.",
      color: "text-[#d29922]",
      icon: "M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5Z"
    }
  ];

  const DURATION = 6000;
  const INTERVAL = 30;

  const handleNext = () => {
    if (currentIdx < screens.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      onNext();
    }
  };

  const handleBackNavigation = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
    } else {
      onBack();
    }
  };

  useEffect(() => {
    setVisible(false);
    setProgress(0);
    const showTimer = setTimeout(() => setVisible(true), 200);

    if (!isPaused) {
      progressIntervalRef.current = window.setInterval(() => {
        setProgress(prev => {
          const next = prev + (INTERVAL / DURATION) * 100;
          if (next >= 100) {
            handleNext();
            return 100;
          }
          return next;
        });
      }, INTERVAL);
    }

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      clearTimeout(showTimer);
    };
  }, [currentIdx, isPaused]);

  const screen = screens[currentIdx];

  return (
    <div 
      className="w-full flex flex-col items-center justify-center min-h-[85vh] relative px-4 select-none touch-none"
      onMouseDown={() => setIsPaused(true)}
      onMouseUp={() => setIsPaused(false)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Narrative Progress Header */}
      <div className="fixed top-12 left-0 right-0 px-6 flex justify-center z-50">
        <div className="flex gap-2 w-full max-w-md">
          {screens.map((_, i) => (
            <div key={i} className="flex-1 h-[3px] bg-white/10 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all ease-linear ${i === currentIdx ? 'bg-white' : i < currentIdx ? 'bg-white/50' : 'bg-transparent'}`}
                style={{ width: i === currentIdx ? `${progress}%` : i < currentIdx ? '100%' : '0%' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Manual Navigation Tap Areas */}
      <div className="absolute inset-0 flex z-30 pointer-events-none">
        <div 
          className="w-[30%] h-full cursor-pointer pointer-events-auto"
          onClick={handleBackNavigation}
        />
        <div 
          className="flex-1 h-full cursor-pointer pointer-events-auto"
          onClick={handleNext}
        />
      </div>

      {/* Main Narrative Display */}
      <div className={`transition-all duration-1000 transform ${visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-95'}`}>
        <div className="flex flex-col items-center text-center">
          <div className={`mb-16 opacity-30 ${screen.color}`}>
            <svg width="80" height="80" viewBox="0 0 16 16" fill="currentColor">
              <path d={screen.icon} />
            </svg>
          </div>
          
          <span className="text-[14px] font-mono tracking-[0.6em] text-[#8b949e] uppercase mb-10 font-bold">
            {screen.label}
          </span>

          <div className="relative mb-12">
            <h2 className={`text-7xl md:text-[11rem] font-display font-black tracking-tighter leading-none ${screen.color} transition-all duration-1000 select-none`}>
              {screen.value}
            </h2>
            <div className="absolute -bottom-8 right-0 left-0 text-[12px] font-mono text-[#484f58] tracking-[0.4em] uppercase font-bold">
              {screen.unit}
            </div>
          </div>

          <p className="text-xl md:text-3xl text-[#c9d1d9] font-light max-w-2xl mt-16 leading-relaxed italic opacity-80 px-8">
            "{screen.sub}"
          </p>
        </div>
      </div>

      {/* Persistent Back Label (Subtle) */}
      {currentIdx > 0 && (
        <button 
          onClick={handleBackNavigation}
          className="fixed left-6 top-1/2 -translate-y-1/2 rotate-270 text-[9px] font-mono text-white/20 uppercase tracking-[0.5em] hover:text-white/60 transition-colors z-40 hidden md:block"
          style={{ writingMode: 'vertical-rl' }}
        >
          Previous Step
        </button>
      )}

      {/* Paused State Indicator */}
      <div className={`fixed bottom-16 left-0 right-0 flex justify-center pointer-events-none z-40 transition-all duration-300 ${isPaused ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="bg-white/10 backdrop-blur-3xl px-6 py-3 rounded-full border border-white/20 flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="w-1.5 h-4 bg-white rounded-full animate-pulse"></div>
            <div className="w-1.5 h-4 bg-white rounded-full animate-pulse delay-150"></div>
          </div>
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-white font-black">Hold to Pause</span>
        </div>
      </div>
    </div>
  );
};

export default StatsSlide;
