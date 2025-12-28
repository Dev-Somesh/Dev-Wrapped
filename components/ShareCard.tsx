
import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { GitHubStats, AIInsights } from '../types';

type AspectRatio = '1:1' | '4:5' | '9:16';

interface ShareCardProps {
  stats: GitHubStats;
  insights: AIInsights;
  onReset: () => void;
}

interface SelectedStat {
  label: string;
  value: string | number;
  score: number;
  id: string;
}

const ShareCard: React.FC<ShareCardProps> = ({ stats, insights, onReset }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('4:5');

  const downloadImage = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const dataUrl = await toPng(cardRef.current, { 
        cacheBust: true,
        pixelRatio: 4, // Ultra high resolution for print/professional screens
        backgroundColor: '#0d1117',
        quality: 1,
      });
      const link = document.createElement('a');
      link.download = `devwrapped-2025-${stats.username}-${aspectRatio.replace(':','x')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export failed:', err);
      alert('High-res export failed. Using standard capture instead.');
      window.print();
    } finally {
      setIsExporting(false);
    }
  };

  const getActiveDaysScore = (days: number) => {
    if (days >= 180) return 3;
    if (days >= 90) return 2;
    return 1;
  };

  const candidateStats: SelectedStat[] = [
    { id: 'activeDays', label: 'Active Days', value: stats.activeDays, score: getActiveDaysScore(stats.activeDays) },
    { id: 'streak', label: 'Max Streak', value: `${stats.streak}d`, score: stats.streak > 10 ? 3 : 2 },
    { id: 'focus', label: 'Top Tool', value: stats.topLanguages[0]?.name || 'Code', score: 3 },
    { id: 'commits', label: 'Contributions', value: stats.totalCommits, score: 2 },
  ];

  const gridCells = Array.from({ length: 24 }).map(() => {
    const val = Math.random();
    if (val > 0.8) return '#39d353';
    if (val > 0.5) return '#26a641';
    return '#161b22';
  });

  const ratioClasses = {
    '1:1': 'aspect-square max-w-[400px]',
    '4:5': 'aspect-[4/5] max-w-[380px]',
    '9:16': 'aspect-[9/16] max-w-[320px]',
  };

  return (
    <div className="w-full flex flex-col items-center animate-in fade-in duration-1000 pb-24 px-4 overflow-y-auto scroll-thin">
      <div className="text-center mb-10">
        <h2 className="text-xl font-display font-bold text-white tracking-widest uppercase">The 2025 Legacy</h2>
      </div>
      
      <div className="flex flex-col xl:flex-row gap-12 items-start justify-center w-full max-w-6xl mb-24">
        {/* EXPORTABLE CARD COMPONENT */}
        <div className="flex flex-col items-center gap-8 w-full">
          {/* Ratio Selector Controls */}
          <div className="flex bg-[#161b22] p-1.5 rounded-full border border-[#30363d] shadow-lg">
            {(['1:1', '4:5', '9:16'] as AspectRatio[]).map((r) => (
              <button
                key={r}
                onClick={() => setAspectRatio(r)}
                className={`px-5 py-2 rounded-full text-[10px] font-mono uppercase tracking-widest transition-all ${aspectRatio === r ? 'bg-white text-black font-bold' : 'text-[#8b949e] hover:text-white'}`}
              >
                {r}
              </button>
            ))}
          </div>

          <div 
            ref={cardRef}
            className={`relative w-full ${ratioClasses[aspectRatio]} bg-[#0d1117] rounded-[2.5rem] p-8 md:p-10 overflow-hidden border border-[#30363d] shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] flex flex-col transition-all duration-500`}
          >
            {/* Branding Watermark */}
            <div className="absolute top-0 right-0 p-8 opacity-10 font-mono text-[8px] tracking-[0.5em] uppercase rotate-90 origin-top-right whitespace-nowrap select-none">
              SOURCE_TRACE_2025
            </div>

            {/* Identity Bar */}
            <div className="flex justify-between items-center mb-8 relative z-10">
              <div className="flex flex-col">
                <span className="text-[9px] font-mono text-[#8b949e] tracking-[0.3em] uppercase mb-0.5">DEV_WRAPPED</span>
                <span className="text-xl font-display font-bold text-white tracking-tight">2025</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
                <img src={stats.avatarUrl} alt={stats.username} className="w-6 h-6 rounded-full grayscale border border-white/20" />
                <span className="text-[11px] font-bold text-white/90">@{stats.username}</span>
              </div>
            </div>

            {/* Archetype Hero Area - Responsive Typography */}
            <div className="flex flex-col mb-6 relative z-10 flex-shrink-0">
               <div className="w-10 h-[3px] bg-[#39d353] mb-6 rounded-full"></div>
               <h3 className="text-3xl md:text-4xl font-display font-black text-white leading-[1.1] tracking-tighter mb-5 uppercase break-words">
                 {insights.archetype}
               </h3>
               <p className="text-[13px] md:text-[14px] text-[#8b949e] font-light leading-relaxed tracking-wide opacity-90">
                 {insights.archetypeDescription}
               </p>
            </div>

            {/* Stats Grid - Weighted visual scanability */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-8 mb-10 relative z-10 mt-auto">
              {candidateStats.map((stat) => (
                <div key={stat.id} className="border-t border-white/10 pt-4 group">
                  <p className="text-[9px] text-[#484f58] font-mono uppercase tracking-[0.2em] mb-2 group-hover:text-[#8b949e] transition-colors">{stat.label}</p>
                  <p className="text-2xl md:text-3xl text-white font-bold tracking-tight truncate">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* One-Line Insight - Increased Weight */}
            <div className="mb-6 relative z-10 mt-auto">
              <p className="text-[14px] md:text-[15px] text-white/90 italic font-light leading-relaxed border-l-3 border-[#39d353] pl-5 py-1">
                "{insights.cardInsight}"
              </p>
            </div>

            {/* Footer Manifest */}
            <div className="mt-auto relative z-10 pt-6 border-t border-[#30363d]/40 flex items-center justify-between">
              <div className="flex items-center gap-2 opacity-30">
                <svg height="14" viewBox="0 0 16 16" width="14" fill="white"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path></svg>
                <span className="text-[10px] font-mono tracking-widest uppercase">WRAPPED.DEV</span>
              </div>
              <div className="flex gap-1.5">
                {gridCells.map((color, i) => (
                  <div key={i} className="w-2.5 h-2.5 rounded-[2px]" style={{ backgroundColor: color }}></div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-[10px] text-[#484f58] uppercase font-mono tracking-widest">Optimized for Platform Delivery</p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col gap-6 w-full max-w-sm sticky top-12">
           <div className="p-8 rounded-[2.5rem] bg-[#161b22]/40 border border-[#30363d] backdrop-blur-2xl">
             <h4 className="text-[11px] font-mono text-[#8b949e] uppercase tracking-[0.4em] mb-6 border-b border-[#30363d] pb-4 font-bold">Strategy</h4>
             <ul className="text-sm text-[#c9d1d9] space-y-6 font-light leading-relaxed">
               <li className="flex gap-4">
                 <span className="text-[#39d353] font-mono font-black">01</span>
                 <span>Export your artifact in 4K resolution.</span>
               </li>
               <li className="flex gap-4">
                 <span className="text-[#39d353] font-mono font-black">02</span>
                 <span>Define your 2025 engineering identity.</span>
               </li>
             </ul>
           </div>
           
           <div className="flex flex-col gap-4">
             <button 
               onClick={downloadImage}
               disabled={isExporting}
               className={`w-full bg-[#f0f6fc] text-[#0d1117] font-black py-6 rounded-full flex items-center justify-center gap-4 hover:bg-white transition-all shadow-2xl active:scale-[0.98] text-lg ${isExporting ? 'opacity-50 cursor-wait' : ''}`}
             >
               {isExporting ? (
                 <div className="w-6 h-6 border-3 border-[#0d1117] border-t-transparent rounded-full animate-spin"></div>
               ) : (
                 <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
                   <path d="M4.5 14h7a.5.5 0 0 0 .5-.5V11h1v2.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 13.5V11h1v2.5a.5.5 0 0 0 .5.5Zm0-12h7a.5.5 0 0 1 .5.5V5h1V2.5A1.5 1.5 0 0 0 11.5 1h-7A1.5 1.5 0 0 0 3 2.5V5h1V2.5a.5.5 0 0 1 .5-.5ZM5 7h6a1 1 0 0 1 1 1v3H4V8a1 1 0 0 1 1-1Zm0 1v2h6V8H5Z"></path>
                 </svg>
               )}
               {isExporting ? 'Generating 4K Artifact...' : 'Export High-Res Card'}
             </button>
             
             <button 
               onClick={onReset}
               className="w-full bg-transparent border border-[#30363d] text-[#8b949e] font-bold py-6 rounded-full hover:bg-[#161b22] hover:text-[#f0f6fc] transition-all active:scale-[0.98] text-base"
             >
               Start New Analysis
             </button>
           </div>
        </div>
      </div>

      {/* FULL MANIFEST LOG */}
      <div className="w-full max-w-5xl border-t border-[#30363d] pt-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          <div>
            <h3 className="text-3xl font-display font-black text-white mb-3 tracking-tight uppercase">System Manifest</h3>
            <p className="text-base text-[#8b949e] font-light max-w-lg">Complete forensic analysis of all retrieved GitHub data points from your 2025 development cycle.</p>
          </div>
          <div className="px-5 py-2.5 bg-[#161b22] border border-[#30363d] rounded-full flex items-center gap-4">
             <div className="w-2.5 h-2.5 rounded-full bg-[#39d353] animate-pulse shadow-[0_0_10px_rgba(57,211,83,0.5)]"></div>
             <span className="text-[11px] font-mono text-[#8b949e] uppercase tracking-[0.3em] font-bold">LOG_FEED_ACTIVE</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
          {/* Column 1: Tech Stack */}
          <div className="space-y-8">
            <h4 className="text-[11px] font-mono text-[#8b949e] uppercase tracking-[0.4em] font-bold">Technology Fluency</h4>
            <div className="space-y-4">
              {stats.topLanguages.map((lang, idx) => (
                <div key={idx} className="p-5 rounded-3xl bg-[#161b22]/30 border border-[#30363d]/50 flex justify-between items-center group hover:bg-[#161b22] hover:border-[#39d353]/30 transition-all">
                  <span className="text-base text-white font-bold group-hover:text-[#39d353]">{lang.name}</span>
                  <span className="text-[11px] font-mono text-[#8b949e] bg-[#0d1117] px-3 py-1 rounded-full">{lang.count} Repos</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Behavior Stats */}
          <div className="space-y-8">
            <h4 className="text-[11px] font-mono text-[#8b949e] uppercase tracking-[0.4em] font-bold">Activity Patterns</h4>
            <div className="p-8 rounded-[2rem] bg-[#161b22]/30 border border-[#30363d]/50 space-y-6">
               <div className="flex justify-between items-center border-b border-[#30363d]/50 pb-4">
                 <span className="text-sm text-[#8b949e] font-light">Pattern Archetype</span>
                 <span className="text-sm text-white font-mono font-bold capitalize">{stats.activityPattern}</span>
               </div>
               <div className="flex justify-between items-center border-b border-[#30363d]/50 pb-4">
                 <span className="text-sm text-[#8b949e] font-light">Productivity Peak</span>
                 <span className="text-sm text-white font-mono font-bold">{stats.mostActiveMonth}</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-sm text-[#8b949e] font-light">Unbroken Chain</span>
                 <span className="text-sm text-[#39d353] font-mono font-bold">{stats.streak} Days</span>
               </div>
            </div>
          </div>

          {/* Column 3: Volume Logs */}
          <div className="space-y-8">
            <h4 className="text-[11px] font-mono text-[#8b949e] uppercase tracking-[0.4em] font-bold">Impact Metrics</h4>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Commits', val: stats.totalCommits },
                { label: 'Repos', val: stats.reposContributed },
                { label: 'Active', val: stats.activeDays },
                { label: 'Streak', val: stats.streak }
              ].map((m, i) => (
                <div key={i} className="p-6 rounded-[1.5rem] bg-[#161b22]/30 border border-[#30363d]/50 text-center hover:bg-[#161b22] transition-colors">
                  <span className="block text-3xl font-display font-black text-white mb-2">{m.val}</span>
                  <span className="text-[9px] text-[#484f58] uppercase font-mono tracking-widest">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Project Historical Log */}
        <div className="space-y-10 mb-32">
          <h4 className="text-[11px] font-mono text-[#8b949e] uppercase tracking-[0.4em] font-bold">Primary Repository Traces</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.recentRepos.map((repo, i) => (
              <a 
                key={i} 
                href={repo.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex flex-col p-8 rounded-[2rem] bg-[#161b22]/20 border border-[#30363d]/40 hover:bg-[#161b22]/50 hover:border-[#39d353]/40 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xl text-white font-black group-hover:text-[#39d353] transition-colors tracking-tight">{repo.name}</span>
                  <div className="flex items-center gap-1.5 text-[#d29922]">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"></path></svg>
                    <span className="text-xs font-mono font-bold">{repo.stars}</span>
                  </div>
                </div>
                <p className="text-sm text-[#8b949e] font-light mb-6 line-clamp-2 leading-relaxed italic">
                  {repo.description}
                </p>
                <div className="mt-auto flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20"></span>
                  <span className="text-[10px] font-mono text-[#8b949e] uppercase tracking-widest">{repo.language}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="text-center opacity-30 pb-20">
           <p className="text-[10px] font-mono uppercase tracking-[1em]">*** END_OF_SYSTEM_MANIFEST_2025 ***</p>
        </div>
      </div>
    </div>
  );
};

export default ShareCard;
