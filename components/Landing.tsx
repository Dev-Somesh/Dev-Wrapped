import React, { useState, useEffect, useMemo } from 'react';
import { trackEvent } from '../services/mixpanelService';
import { calculateYearAvailability, getYearDisplayInfo } from '../utils/dateUtils';

interface LandingProps {
  onConnect: (username: string, selectedYear?: number) => void;
  error: string | null;
  onOpenCredits?: () => void;
}

const YearBanner: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Calculate days since January 1, 2026
  const startOf2026 = new Date('2026-01-01T00:00:00');
  const startOf2027 = new Date('2027-01-01T00:00:00');
  
  const daysSince2026Start = Math.floor((currentTime.getTime() - startOf2026.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  
  // Check if we're in 2026 or later
  const isIn2026 = currentTime < startOf2027;
  const currentYear = currentTime.getFullYear();
  const currentMonth = currentTime.getMonth() + 1; // 1-based month
  
  let displayText = '';
  
  if (isIn2026) {
    // Special New Year messaging for January
    if (currentMonth === 1) {
      if (daysSince2026Start === 1) {
        displayText = `🎉 Happy New Year! Day 1 of 2026 • Perfect time to review 2025!`;
      } else if (daysSince2026Start <= 7) {
        displayText = `🎊 New Year Week! Day ${daysSince2026Start} of 2026 • Reflect on your 2025 journey`;
      } else if (daysSince2026Start <= 31) {
        displayText = `✨ New Year Vibes! Day ${daysSince2026Start} of 2026 • Celebrate your 2025 achievements`;
      }
    } else {
      // Regular messaging for rest of the year
      displayText = `Day ${daysSince2026Start} of 2026 • Keep building your legacy`;
    }
  } else {
    // We're in 2027 or later
    const currentYearStart = new Date(`${currentYear}-01-01T00:00:00`);
    const daysSinceYearStart = Math.floor((currentTime.getTime() - currentYearStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    displayText = `Day ${daysSinceYearStart} of ${currentYear} • Your development journey evolves`;
  }

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 bg-gradient-to-r from-green-500/15 to-blue-500/15 border border-green-500/30 rounded-full backdrop-blur-sm max-w-[95vw] sm:max-w-md md:max-w-none">
      <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-green-400 rounded-full animate-pulse flex-shrink-0"></div>
      <span className="text-[9px] sm:text-[10px] md:text-sm font-mono text-green-200 uppercase tracking-wider font-black text-center leading-tight">
        {displayText}
      </span>
    </div>
  );
};

const UserCounter: React.FC = () => {
  const [userCount, setUserCount] = useState(0);
  
  useEffect(() => {
    // Generate a realistic random number between 18,000 and 25,000
    const baseCount = 19247; // Starting number
    const randomVariation = Math.floor(Math.random() * 4000); // Add 0-4000
    const initialCount = baseCount + randomVariation;
    
    // Animate the counter to initial value
    let current = 0;
    const increment = initialCount / 100;
    const initialTimer = setInterval(() => {
      current += increment;
      if (current >= initialCount) {
        setUserCount(initialCount);
        clearInterval(initialTimer);
        
        // Start auto-increment after initial animation
        const autoIncrement = setInterval(() => {
          setUserCount(prev => {
            // Randomly increment by 1-3 every 8-15 seconds
            const shouldIncrement = Math.random() < 0.7; // 70% chance
            if (shouldIncrement) {
              const incrementBy = Math.floor(Math.random() * 3) + 1; // 1-3
              return prev + incrementBy;
            }
            return prev;
          });
        }, Math.random() * 7000 + 8000); // 8-15 seconds
        
        return () => clearInterval(autoIncrement);
      } else {
        setUserCount(Math.floor(current));
      }
    }, 20);

    return () => clearInterval(initialTimer);
  }, []);

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-full backdrop-blur-sm">
      <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
      <span className="text-[9px] md:text-[10px] font-mono text-green-300 uppercase tracking-wider font-black">
        {userCount.toLocaleString()}+ Developers Wrapped
      </span>
    </div>
  );
};

const DeveloperCarousel: React.FC = () => {
  const githubUsers = [
    'torvalds', 'gaearon', 'sindresorhus', 'tj', 'addyosmani', 'paulirish', 
    'kentcdodds', 'wesbos', 'bradtraversy', 'getify', 'rwaldron', 'mrdoob',
    'yyx990803', 'evanyou', 'defunkt', 'mojombo', 'dhh', 'wycats',
    'fat', 'mbostock', 'substack', 'isaacs', 'mikeal', 'dominictarr',
    'maxogden', 'feross', 'juliangruber', 'rvagg', 'watson', 'octocat',
    'github', 'microsoft', 'google', 'facebook', 'netflix', 'airbnb'
  ];

  const duplicatedUsers = [...githubUsers, ...githubUsers];

  return (
    <div className="w-full overflow-hidden relative rounded-xl sm:rounded-2xl md:rounded-[2rem] mx-0 md:mx-6">
      <div className="relative z-20 pt-3 pb-2 sm:pt-4 sm:pb-3 md:pt-5 md:pb-4 text-center">
        <span className="text-[7px] sm:text-[8px] md:text-[9px] font-mono text-white/40 uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] font-black">
          Trusted by developers worldwide
        </span>
      </div>
      <div className="relative py-3 sm:py-4 md:py-6 bg-gradient-to-r from-[#0d1117] via-[#161b22] to-[#0d1117] rounded-b-xl sm:rounded-b-2xl md:rounded-b-[2rem]">
        <div className="absolute left-0 top-0 w-16 sm:w-24 md:w-40 h-full bg-gradient-to-r from-[#0d1117] via-[#0d1117]/95 to-transparent z-10 rounded-bl-xl md:rounded-bl-[2rem]"></div>
        <div className="absolute right-0 top-0 w-16 sm:w-24 md:w-40 h-full bg-gradient-to-l from-[#0d1117] via-[#0d1117]/95 to-transparent z-10 rounded-br-xl md:rounded-br-[2rem]"></div>
        <div className="flex animate-scroll-left">
          {duplicatedUsers.map((username, index) => (
            <div
              key={`${username}-${index}`}
              className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5 px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 mx-1.5 sm:mx-2 md:mx-2.5 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm whitespace-nowrap flex-shrink-0 hover:bg-white/10 transition-colors"
            >
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-white/70 flex-shrink-0" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
              </svg>
              <span className="text-[10px] sm:text-xs md:text-sm font-mono text-white/80 font-medium">@{username}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FeaturePreview: React.FC<{ 
  title: string; 
  label: string;
  content: React.ReactNode;
  className: string; 
  delay: string; 
  accentColor: string;
}> = ({ title, label, content, className, delay, accentColor }) => (
  <div 
    className={`fixed hidden xl:flex flex-col p-6 rounded-[2rem] bg-[#161b22]/40 backdrop-blur-xl border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] floating-icon pointer-events-none select-none z-0 ${className}`}
    style={{ animationDelay: delay, '--rotate': '0deg' } as React.CSSProperties}
  >
    <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
      <div className="flex items-center gap-2">
        <div className={`w-1.5 h-1.5 rounded-full ${accentColor} animate-pulse`}></div>
        <span className="text-[10px] font-mono text-[#8b949e] uppercase tracking-[0.2em] font-black">{title}</span>
      </div>
      <span className="text-[8px] font-mono text-[#484f58] uppercase tracking-widest">{label}</span>
    </div>
    <div className="text-[#c9d1d9]">
      {content}
    </div>
  </div>
);

const Landing: React.FC<LandingProps> = ({ onConnect, error, onOpenCredits }) => {
  const [username, setUsername] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  
  // Calculate year availability based on current date
  const yearAvailability = useMemo(() => calculateYearAvailability(), []);
  
  // Set default year selection
  useEffect(() => {
    if (selectedYear === null) {
      setSelectedYear(yearAvailability.currentYear);
    }
  }, [yearAvailability.currentYear, selectedYear]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && selectedYear) {
      // Track form submission
      trackEvent('Form Submitted', {
        form_type: 'github_username',
        username: username.trim(),
        selected_year: selectedYear,
        year_selection_available: yearAvailability.canShowYearSelection,
        page_url: window.location.href
      });
      
      onConnect(username.trim(), selectedYear);
    }
  };

  const features = [
    { title: 'Identity', icon: '◈' },
    { title: 'Narrative', icon: '◒' },
    { title: 'Telemetry', icon: '▣' }
  ];

  return (
    <div className="w-full min-h-screen flex flex-col items-center px-0 sm:px-2 py-8 sm:py-12 md:py-16 lg:py-20 md:justify-center animate-in fade-in duration-1000 relative overflow-x-hidden min-w-0">
      
      {/* 1. THE NARRATIVE (Top Left) */}
      <FeaturePreview 
        title="Cinematic_Story"
        label="Module_01"
        accentColor="bg-[#bc8cff]"
        className="left-12 top-24 w-72"
        delay="-1s"
        content={
          <div className="space-y-2">
            <p className="text-sm font-light italic leading-relaxed opacity-80">
              "This year was a masterclass in consistency. You didn't just push code; you built a practice..."
            </p>
            <div className="flex gap-1 pt-2">
              <div className="h-1 w-12 bg-[#bc8cff]/30 rounded-full"></div>
              <div className="h-1 w-4 bg-[#bc8cff]/30 rounded-full"></div>
            </div>
          </div>
        }
      />

      {/* 2. THE ARCHETYPE (Top Right) */}
      <FeaturePreview 
        title="Archetype_Reveal"
        label="Module_02"
        accentColor="bg-[#39d353]"
        className="right-12 top-32 w-64"
        delay="-2.5s"
        content={
          <div className="space-y-3">
            <h4 className="text-lg font-display font-black tracking-tighter text-[#39d353]">THE NIGHT OWL</h4>
            <p className="text-[11px] font-mono text-[#8b949e] leading-snug">
              64% of your milestones occurred between 22:00 and 04:00.
            </p>
          </div>
        }
      />

      {/* 3. SECURITY (Bottom Left) */}
      <FeaturePreview 
        title="Privacy_Vault"
        label="Secure_Auth"
        accentColor="bg-[#58a6ff]"
        className="left-16 bottom-24 w-60"
        delay="-4s"
        content={
          <div className="font-mono text-[10px] space-y-1 text-[#58a6ff]/80">
            <p>LOCK: AES-256-GCM</p>
            <p>TRACE: VOLATILE_MEMORY</p>
            <p>STORAGE: NULL_RETENTION</p>
          </div>
        }
      />

      {/* 4. SOCIAL ARTIFACT (Bottom Right) */}
      <FeaturePreview 
        title="Share_Artifact"
        label="Export_Ready"
        accentColor="bg-[#ff7b72]"
        className="right-16 bottom-32 w-72"
        delay="-5.5s"
        content={
          <div className="flex gap-4 items-center">
            <div className="w-16 h-20 bg-gradient-to-br from-[#161b22] to-[#0d1117] border border-white/10 rounded-lg shadow-inner flex flex-col p-2">
              <div className="w-full h-1 bg-white/10 rounded-full mb-1"></div>
              <div className="w-2/3 h-1 bg-white/10 rounded-full"></div>
            </div>
            <p className="text-[11px] font-light leading-relaxed text-[#8b949e]">
              Get custom 4K share cards for LinkedIn, X, and your GitHub README.
            </p>
          </div>
        }
      />

      {/* Top Branding - Compact logo + menu */}
      <nav className="fixed top-0 left-0 right-0 w-full min-w-0 pl-3 pr-3 py-2.5 sm:pl-4 sm:pr-4 sm:py-3 md:pl-6 md:pr-6 flex justify-between items-center pointer-events-none z-50 safe-x" style={{ paddingTop: 'max(0.5rem, env(safe-area-inset-top))', paddingLeft: 'max(0.75rem, env(safe-area-inset-left))', paddingRight: 'max(0.75rem, env(safe-area-inset-right))' }}>
        <a href="/" className="flex items-center gap-2 pointer-events-auto rounded-lg hover:bg-white/5 transition-colors p-1 pl-2 sm:pl-3" aria-label="DevWrapped home">
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-md flex items-center justify-center flex-shrink-0">
            <svg height="14" width="14" className="sm:w-4 sm:h-4" viewBox="0 0 16 16" fill="white">
              <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
            </svg>
          </div>
          <span className="text-white font-black text-xs sm:text-sm tracking-tight uppercase">DevWrapped</span>
          <span className="text-[#39d353] font-mono text-[9px] tracking-widest opacity-80 hidden sm:inline">ANNUAL</span>
        </a>
        
        <div className="hidden lg:flex gap-2 pointer-events-auto">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 rounded-full border border-white/5 text-[8px] font-mono text-[#8b949e] uppercase tracking-wider">
              <span className="text-[#39d353]">{f.icon}</span> {f.title}
            </div>
          ))}
        </div>

        <div className="lg:hidden flex items-center pointer-events-auto">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMobileNavOpen(true)}
            className="touch-target p-2.5 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile nav drawer - compact */}
      {mobileNavOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden" aria-hidden onClick={() => setMobileNavOpen(false)} />
          <div className="fixed top-0 right-0 h-full w-full max-w-[280px] bg-[#0d1117] border-l border-[#30363d] shadow-2xl z-[70] flex flex-col safe-y p-3 pt-[max(0.5rem,env(safe-area-inset-top))] animate-slide-in-right lg:hidden">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[#39d353] font-mono text-[10px] uppercase tracking-widest font-black">Menu</span>
              <button type="button" aria-label="Close menu" onClick={() => setMobileNavOpen(false)} className="touch-target p-2 rounded-lg text-[#8b949e] hover:text-white hover:bg-white/10">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col gap-1">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-xs font-mono text-[#8b949e]">
                  <span className="text-[#39d353]">{f.icon}</span> {f.title}
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-white/10 space-y-1">
              <a href="https://github.com/Dev-Somesh/Dev-Wrapped" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-xs font-mono text-[#c9d1d9] min-h-[44px]">
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"/></svg>
                Star on GitHub
              </a>
              <a href="https://github.com/sponsors/Dev-Somesh" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/20 text-xs font-mono text-pink-400 min-h-[44px]">
                Sponsor
              </a>
              <button
                type="button"
                onClick={() => { setMobileNavOpen(false); onOpenCredits?.(); }}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-[#8b949e] hover:text-[#bc8cff] text-left w-full min-h-[44px] text-xs font-mono"
              >
                Credits
              </button>
            </div>
          </div>
        </>
      )}

      {/* Year Banner: compact on mobile, comfortable on desktop */}
      <div className="w-full flex justify-center pt-10 sm:pt-14 md:pt-20 lg:pt-24 pb-2 sm:pb-4 md:pb-8 relative z-10">
        <YearBanner />
      </div>

      {/* Main Content Stack: compact on mobile, spacious on desktop */}
      <div className="max-w-5xl w-full min-w-0 flex flex-col items-center text-center relative z-10">
        
        <div className="mb-3 sm:mb-6 md:mb-10 lg:mb-16 space-y-1.5 sm:space-y-3 md:space-y-4 lg:space-y-6">
          <div className="inline-block px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 md:py-1.5 rounded-full bg-white/5 border border-white/10 mb-0 sm:mb-0.5 md:mb-2">
            <span className="text-[#8b949e] font-mono text-[8px] sm:text-[9px] md:text-[9px] uppercase tracking-[0.25em] sm:tracking-[0.4em] md:tracking-[0.5em] font-black">
              Engineering Year-in-Review
            </span>
          </div>
          <h1 className="text-[1.75rem] leading-[1.12] sm:text-3xl sm:leading-[1.08] md:text-4xl md:leading-[1.05] lg:text-5xl lg:leading-[0.95] xl:text-6xl xl:leading-[0.9] font-display font-black tracking-tighter text-[#f0f6fc] select-none break-words">
            CELEBRATE<br />YOUR 2025<br />
            <span className="animate-gradient text-transparent bg-clip-text bg-gradient-to-r from-[#39d353] via-[#58a6ff] to-[#bc8cff] drop-shadow-[0_0_40px_rgba(57,211,83,0.15)]">
              CODE JOURNEY.
            </span>
          </h1>
          <p className="text-[#8b949e] text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-light italic max-w-sm md:max-w-lg mx-auto leading-snug md:leading-relaxed opacity-70 px-0 sm:px-2">
            New Year, New Reflections. Celebrate your incredible 2025 coding achievements with a beautiful year-in-review.
          </p>
          
          <div className="mt-3 sm:mt-5 md:mt-10 lg:mt-12 max-w-2xl mx-auto">
            <p className="text-[9px] md:text-[10px] lg:text-xs font-mono text-[#39d353] uppercase tracking-wider font-black mb-1.5 sm:mb-2 md:mb-4 text-center">
              Perfect For
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 sm:gap-3 md:gap-4 lg:gap-5 w-full">
              {[
                { icon: "💼", text: "Job Applications" },
                { icon: "📁", text: "Portfolio Content" },
                { icon: "🚀", text: "Founder Stories" },
                { icon: "📈", text: "Hiring Signals" }
              ].map((useCase, i) => (
                <div key={i} className="flex flex-col items-center gap-0.5 sm:gap-1.5 md:gap-2 p-1.5 sm:p-3 md:p-4 lg:p-5 bg-white/5 rounded-lg sm:rounded-xl md:rounded-2xl border border-white/10 hover:border-[#39d353]/30 transition-all group min-h-0 min-w-0">
                  <span className="text-base sm:text-lg md:text-xl lg:text-2xl group-hover:scale-110 transition-transform">{useCase.icon}</span>
                  <span className="text-[9px] sm:text-[11px] md:text-xs font-mono text-[#c9d1d9] text-center font-medium leading-tight">
                    {useCase.text}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs font-mono text-[#8b949e] text-center mt-1.5 sm:mt-2 md:mt-4 italic">
              Use this artifact in portfolios, interviews, and founder stories.
            </p>
          </div>
        </div>

        {/* Entry form: compact on mobile, comfortable on desktop */}
        <div className="w-full max-w-[320px] sm:max-w-sm md:max-w-md relative group mt-0 min-w-0">
          <div className="absolute -inset-0.5 sm:-inset-1 md:-inset-1.5 bg-gradient-to-br from-[#39d353]/20 to-[#58a6ff]/20 rounded-xl md:rounded-[2rem] lg:rounded-[3rem] blur-xl md:blur-2xl opacity-40 group-hover:opacity-70 transition duration-1000"></div>
          
          <div className="relative bg-[#161b22]/80 backdrop-blur-3xl border border-[#30363d] p-3 sm:p-5 md:p-6 lg:p-8 xl:p-10 rounded-xl md:rounded-[2rem] lg:rounded-[3rem] shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-4 md:space-y-5 lg:space-y-6">
              <div className="space-y-2 md:space-y-3 text-left">
                <label className="text-[8px] md:text-[10px] lg:text-xs font-mono text-[#484f58] uppercase tracking-wider md:tracking-[0.2em] ml-2 md:ml-4 font-black">Initialization Profile</label>
                <div className="relative group/input">
                  <div className="absolute left-3 md:left-5 lg:left-6 top-1/2 -translate-y-1/2 text-[#484f58] group-focus-within/input:text-[#39d353] transition-colors">
                    <svg width="14" height="14" className="md:w-[18px] md:h-[18px] lg:w-5 lg:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onFocus={() => {
                      trackEvent('Form Field Focused', {
                        field_type: 'github_username',
                        page_url: window.location.href
                      });
                    }}
                    placeholder="GitHub Username"
                    required
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg md:rounded-xl lg:rounded-2xl pl-9 md:pl-14 lg:pl-16 pr-3 md:pr-5 py-3 md:py-4 lg:py-5 text-[#f0f6fc] placeholder:text-[#484f58] focus:outline-none focus:ring-2 md:focus:ring-4 focus:ring-[#39d353]/5 focus:border-[#39d353] transition-all text-sm md:text-base lg:text-lg font-medium"
                  />
                </div>
                <p className="mt-2 ml-2 md:ml-4 flex items-start gap-1.5 text-[8px] md:text-[9px] lg:text-[10px] font-mono leading-snug text-[#c9d1d9]">
                  <span className="mt-[1px] inline-flex h-2.5 w-2.5 md:h-3 md:w-3 items-center justify-center rounded-full bg-[#161b22] border border-[#238636] text-[7px] md:text-[8px] text-[#39d353] flex-shrink-0">✓</span>
                  <span className="rounded bg-[#161b22] border border-[#238636]/40 text-[#8b949e] px-1.5 py-0.5 md:px-2 md:py-1">Public data only. No auth required.</span>
                </p>
              </div>

              {yearAvailability.canShowYearSelection && (
                <div className="space-y-2 md:space-y-3 text-left">
                  <label className="text-[8px] md:text-[10px] lg:text-xs font-mono text-[#484f58] uppercase tracking-wider ml-2 md:ml-4 font-black">Analysis Year</label>
                  <div className="grid grid-cols-2 gap-1.5 md:gap-2">
                    {yearAvailability.availableYears.map((year) => {
                      const yearInfo = getYearDisplayInfo(year);
                      return (
                        <button
                          key={year}
                          type="button"
                          onClick={() => {
                            setSelectedYear(year);
                            trackEvent('Year Selected', {
                              selected_year: year,
                              is_current_year: yearInfo.isCurrentYear,
                              data_quality: yearInfo.dataQuality,
                              page_url: window.location.href
                            });
                          }}
                          className={`p-2.5 md:p-3 lg:p-4 rounded-lg md:rounded-xl border transition-all text-left ${
                            selectedYear === year
                              ? 'bg-[#39d353]/10 border-[#39d353] text-[#39d353]'
                              : 'bg-[#0d1117] border-[#30363d] text-[#8b949e] hover:border-[#39d353]/50'
                          }`}
                        >
                          <div className="font-bold text-xs md:text-sm">{year}</div>
                          <div className="text-[9px] md:text-[10px] opacity-70 mt-0.5 md:mt-1">
                            {yearInfo.dataQuality === 'partial' && '📊 Partial data'}
                            {yearInfo.dataQuality === 'mixed' && '🔀 Mixed data'}
                            {yearInfo.dataQuality === 'full' && '✅ Full data'}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-1 ml-2 md:ml-4 text-[7px] md:text-[8px] lg:text-[9px] font-mono text-[#6e7681] leading-snug">
                    ⚠️ {yearAvailability.dataLimitation}
                  </p>
                </div>
              )}

              {yearAvailability.canShowCurrentYearOnly && (
                <div className="space-y-1 md:space-y-2 text-left">
                  <div className="p-2.5 md:p-3 lg:p-4 rounded-lg md:rounded-xl bg-[#d29922]/10 border border-[#d29922]/20 text-[#d29922]">
                    <div className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs font-bold">
                      <span>⚠️</span>
                      <span>Data Limitation Notice</span>
                    </div>
                    <p className="text-[9px] md:text-[10px] mt-0.5 md:mt-1 opacity-80">{yearAvailability.dataLimitation}</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="p-3 md:p-4 rounded-lg md:rounded-xl bg-red-900/10 border border-red-500/20 text-red-400 text-[10px] md:text-xs animate-shake flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-black">!</span>
                    <p className="font-medium">{error}</p>
                  </div>
                  <p className="pt-1 border-t border-red-500/10 text-[9px] md:text-[10px] opacity-70">
                    Report to <a href="mailto:hello@someshbhardwaj.me" className="underline font-bold">hello@someshbhardwaj.me</a>
                  </p>
                </div>
              )}

              <button
                type="submit"
                className="group relative w-full bg-[#238636] hover:bg-[#2ea043] text-white font-black py-3 md:py-4 lg:py-5 xl:py-6 rounded-lg md:rounded-xl lg:rounded-2xl transition-all shadow-lg md:shadow-xl active:scale-[0.98] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative flex items-center justify-center gap-2 md:gap-3 text-sm md:text-base lg:text-lg xl:text-xl tracking-tighter">
                  <span className="hidden sm:inline">GENERATE WRAPPED</span>
                  <span className="sm:hidden">GENERATE</span>
                  <svg className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 transition-transform group-hover:translate-x-1" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5Z"></path>
                  </svg>
                </span>
              </button>
            </form>
            
            <div className="mt-3 md:mt-4 flex justify-center">
              <UserCounter />
            </div>
          </div>
        </div>

      </div>
      
      <div className="mt-4 sm:mt-8 md:mt-16 lg:mt-20 w-full">
        <DeveloperCarousel />
      </div>
    </div>
  );
};

export default Landing;