
import React from 'react';
import { GitHubStats } from '../types';

interface ActivityManifestProps {
  stats: GitHubStats;
}

const ActivityManifest: React.FC<ActivityManifestProps> = ({ stats }) => {
  return (
    <div className="w-full max-w-5xl border-t border-[#30363d] pt-24 mt-16 animate-in fade-in duration-1000">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
        <div>
          <h3 className="text-4xl font-display font-black text-white mb-3 tracking-tighter uppercase">Activity Manifest</h3>
          <p className="text-lg text-[#8b949e] font-light max-w-xl">Deep telemetry logs from your 2025 development lifecycle.</p>
        </div>
        <div className="px-6 py-3 bg-[#161b22]/90 border border-[#30363d] rounded-full flex items-center gap-5">
           <div className="w-3 h-3 rounded-full bg-[#39d353] animate-pulse shadow-[0_0_15px_rgba(57,211,83,0.4)]"></div>
           <span className="text-[11px] font-mono text-[#8b949e] uppercase tracking-[0.4em] font-black">SYSLOG_ACTIVE</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
        {/* Tech Stack */}
        <div className="space-y-8">
          <h4 className="text-[12px] font-mono text-[#8b949e] uppercase tracking-[0.5em] font-bold border-l-2 border-[#39d353] pl-4">Tech Landscape</h4>
          <div className="space-y-4">
            {stats.topLanguages.slice(0, 4).map((lang, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-[#161b22]/30 border border-[#30363d] flex justify-between items-center group hover:bg-[#161b22] transition-all shadow-lg">
                <span className="text-lg text-white font-black group-hover:text-[#39d353]">{lang.name}</span>
                <span className="text-[11px] font-mono text-[#8b949e] bg-[#0d1117] px-3 py-1.5 rounded-full border border-white/5">{lang.count} Repos</span>
              </div>
            ))}
          </div>
        </div>

        {/* Patterns */}
        <div className="space-y-8">
          <h4 className="text-[12px] font-mono text-[#8b949e] uppercase tracking-[0.5em] font-bold border-l-2 border-[#58a6ff] pl-4">Pattern Metadata</h4>
          <div className="p-8 rounded-[2.5rem] bg-[#161b22]/30 border border-[#30363d] space-y-8 shadow-2xl backdrop-blur-sm">
             <div className="flex justify-between items-center border-b border-[#30363d]/50 pb-6">
               <span className="text-sm text-[#8b949e] font-light">Archetype ID</span>
               <span className="text-base text-white font-mono font-black capitalize tracking-tight text-right pl-4">{stats.activityPattern}</span>
             </div>
             <div className="flex justify-between items-center border-b border-[#30363d]/50 pb-6">
               <span className="text-sm text-[#8b949e] font-light">Peak Cycle</span>
               <span className="text-base text-white font-mono font-black uppercase tracking-tighter">{stats.mostActiveMonth}</span>
             </div>
             <div className="flex justify-between items-center">
               <span className="text-sm text-[#8b949e] font-light">Continuity</span>
               <span className="text-base text-[#39d353] font-mono font-black tracking-widest">{stats.streak} DAYS</span>
             </div>
          </div>
        </div>

        {/* Impact */}
        <div className="space-y-8">
          <h4 className="text-[12px] font-mono text-[#8b949e] uppercase tracking-[0.5em] font-bold border-l-2 border-[#ff7b72] pl-4">Impact Metrics</h4>
          <div className="grid grid-cols-2 gap-5">
            {[
              { label: 'Commits', val: stats.totalCommits },
              { label: 'Repos', val: stats.reposContributed },
              { label: 'Active', val: stats.activeDays },
              { label: 'Streak', val: stats.streak }
            ].map((m, i) => (
              <div key={i} className="p-8 rounded-[2rem] bg-[#161b22]/30 border border-[#30363d] text-center hover:border-white/20 transition-all shadow-xl group">
                <span className="block text-4xl font-display font-black text-white mb-3 group-hover:scale-110 transition-transform">{m.val}</span>
                <span className="text-[10px] text-[#484f58] uppercase font-mono tracking-widest font-black">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Repo Traces */}
      <div className="space-y-10 mb-32">
        <h4 className="text-[12px] font-mono text-[#8b949e] uppercase tracking-[0.5em] font-bold border-l-2 border-white pl-4">Repository Artifact Traces</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stats.recentRepos.slice(0, 4).map((repo, i) => (
            <a 
              key={i} 
              href={repo.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex flex-col p-10 rounded-[2.5rem] bg-[#161b22]/20 border border-[#30363d]/50 hover:bg-[#161b22]/60 hover:border-[#39d353]/50 transition-all shadow-2xl"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="text-2xl text-white font-black group-hover:text-[#39d353] transition-colors tracking-tighter">{repo.name}</span>
                <div className="flex items-center gap-2 text-[#d29922] bg-white/5 px-4 py-1.5 rounded-full">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"></path></svg>
                  <span className="text-xs font-mono font-black">{repo.stars}</span>
                </div>
              </div>
              <p className="text-base text-[#8b949e] font-light mb-8 line-clamp-2 leading-relaxed italic">
                {repo.description}
              </p>
              <div className="mt-auto flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-white/20"></span>
                <span className="text-[12px] font-mono text-[#c9d1d9] uppercase tracking-[0.2em] font-black">{repo.language}</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="text-center opacity-30 pb-32">
         <p className="text-[12px] font-mono uppercase tracking-[1.5em] font-black">*** END_OF_SYSTEM_TRACE_2025 ***</p>
      </div>
    </div>
  );
};

export default ActivityManifest;
