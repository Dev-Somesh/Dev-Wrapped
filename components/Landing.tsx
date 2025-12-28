
import React, { useState } from 'react';

interface LandingProps {
  onConnect: (username: string, token?: string) => void;
  error: string | null;
}

const Landing: React.FC<LandingProps> = ({ onConnect, error }) => {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [showTokenInfo, setShowTokenInfo] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onConnect(username.trim(), token.trim() || undefined);
    }
  };

  return (
    <div className="text-center animate-in fade-in slide-in-from-bottom-8 duration-1000 py-12 w-full max-w-2xl mx-auto px-4">
      <div className="mb-8 flex justify-center">
        <div className="p-4 bg-white/5 rounded-3xl border border-white/10 shadow-2xl">
          <svg height="48" viewBox="0 0 16 16" width="48" fill="white">
            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
          </svg>
        </div>
      </div>
      
      <div className="mb-6 inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-[#30363d] bg-[#161b22] text-[#8b949e] text-[10px] font-bold tracking-[0.3em] uppercase">
        DEVWRAPPED 2025
      </div>
      
      <h1 className="text-5xl md:text-7xl font-display font-black tracking-tight mb-6 text-[#f0f6fc] leading-tight">
        Your Year In<br /><span className="text-[#39d353]">Code.</span>
      </h1>
      
      <p className="text-[#8b949e] text-lg md:text-xl max-w-lg mx-auto mb-10 leading-relaxed font-light italic">
        "Relive the milestones, the streaks, and the logic that defined your journey."
      </p>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <div className="space-y-3">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="GitHub Username"
            required
            className="w-full bg-[#0d1117] border border-[#30363d] rounded-2xl px-6 py-5 text-[#f0f6fc] placeholder:text-[#484f58] focus:outline-none focus:ring-2 focus:ring-[#39d353]/30 focus:border-[#39d353] transition-all text-lg font-medium"
          />
          
          <div className="relative group">
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Personal Access Token (PAT)"
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-2xl px-6 py-5 text-[#f0f6fc] placeholder:text-[#484f58] focus:outline-none focus:ring-2 focus:ring-[#58a6ff]/30 focus:border-[#58a6ff] transition-all text-base"
            />
            <button 
              type="button"
              onClick={() => setShowTokenInfo(!showTokenInfo)}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-[#484f58] hover:text-[#58a6ff] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>

          {/* Persistent Security Message */}
          <div className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-white/5 border border-white/10 select-none">
            <svg className="w-4 h-4 text-[#39d353]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-[11px] font-medium text-[#8b949e]">
              PATs are <span className="text-white font-bold">never stored</span>. Processing is strictly local.
            </span>
          </div>
          
          {showTokenInfo && (
            <div className="text-left bg-[#161b22] border border-[#30363d] p-6 rounded-3xl text-xs text-[#8b949e] animate-in fade-in slide-in-from-top-4 duration-500 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <svg width="40" height="40" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-4 h-4 text-[#39d353]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
                <p className="font-black text-[#58a6ff] uppercase tracking-widest text-[10px]">Zero Persistence Architecture</p>
              </div>
              <p className="mb-4 leading-relaxed text-[#c9d1d9]">
                Your security is paramount. This token is <span className="text-[#39d353] font-bold">never stored</span> and never leaves your local machine except to communicate directly with GitHub's API.
              </p>
              <p className="mb-2 font-bold text-white">Recommended Scopes:</p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-[#39d353]">✔</span>
                  <span><code className="bg-white/5 px-1.5 py-0.5 rounded text-[#58a6ff]">repo</code> (Access private contribution data)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#39d353]">✔</span>
                  <span><code className="bg-white/5 px-1.5 py-0.5 rounded text-[#58a6ff]">read:user</code> (Fetch private account metrics)</span>
                </li>
              </ul>
              <p className="text-[10px] italic border-t border-white/5 pt-3">
                Revoke or manage at <a href="https://github.com/settings/tokens" target="_blank" className="text-[#58a6ff] hover:underline font-bold">Settings &gt; Developer settings</a>.
              </p>
            </div>
          )}
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-red-900/10 border border-red-500/30 text-red-400 text-sm animate-pulse flex items-center gap-3">
             <span className="text-xl">⚠</span>
             <span className="text-left font-medium">{error}</span>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-[#238636] hover:bg-[#2ea043] text-white font-black py-6 rounded-full transition-all flex items-center justify-center gap-4 shadow-xl shadow-[#238636]/20 active:scale-[0.98] group text-xl"
        >
          Initialize Wrapped
          <svg className="w-6 h-6 transition-transform group-hover:translate-x-1" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5Z"></path>
          </svg>
        </button>
      </form>

      <div className="mt-16 opacity-30 flex flex-col items-center gap-2">
        <p className="text-[10px] font-mono uppercase tracking-[0.5em]">Direct-to-Client Processing</p>
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-white to-transparent"></div>
      </div>
    </div>
  );
};

export default Landing;
