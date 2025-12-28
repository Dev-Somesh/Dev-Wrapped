
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
    <div className="text-center animate-in fade-in slide-in-from-bottom-8 duration-1000 py-12">
      <div className="mb-8 flex justify-center">
        <svg height="48" viewBox="0 0 16 16" width="48" fill="white">
          <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
        </svg>
      </div>
      
      <div className="mb-6 inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-[#30363d] bg-[#161b22] text-[#8b949e] text-sm font-medium tracking-wide uppercase">
        DEVWRAPPED 2025
      </div>
      
      <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6 text-[#f0f6fc]">
        Your Coding Year,<br />Beautifully Wrapped
      </h1>
      
      <p className="text-[#8b949e] text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed font-light">
        Real stats. Real repos. Your unique story.
      </p>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <div className="space-y-3">
          <div className="relative">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter GitHub Username"
              required
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-2xl px-6 py-4 text-[#f0f6fc] placeholder:text-[#484f58] focus:outline-none focus:ring-1 focus:ring-[#39d353] focus:border-[#39d353] transition-all"
            />
          </div>
          
          <div className="relative">
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Personal Access Token (Optional)"
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-2xl px-6 py-4 text-[#f0f6fc] placeholder:text-[#484f58] focus:outline-none focus:ring-1 focus:ring-[#58a6ff] focus:border-[#58a6ff] transition-all text-sm"
            />
            <button 
              type="button"
              onClick={() => setShowTokenInfo(!showTokenInfo)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#484f58] hover:text-[#8b949e] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
          
          {showTokenInfo && (
            <div className="text-left bg-[#161b22] border border-[#30363d] p-5 rounded-2xl text-xs text-[#8b949e] animate-in fade-in slide-in-from-top-2">
              <p className="mb-2 font-semibold text-[#58a6ff]">Accurate 2025 Analysis</p>
              <ul className="list-disc list-inside space-y-1 font-light">
                <li>Includes <span className="text-[#f0f6fc]">private contributions</span></li>
                <li>Avoids standard GitHub rate limits</li>
                <li>Fetches full commit history for 2024-2025</li>
              </ul>
              <p className="mt-2">
                Generate at <a href="https://github.com/settings/tokens" target="_blank" className="text-[#58a6ff] hover:underline">Settings &gt; Developer settings</a>.
              </p>
            </div>
          )}
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-900/10 border border-red-900/50 text-red-400 text-sm animate-shake">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-[#238636] hover:bg-[#2ea043] text-white font-bold py-5 rounded-full transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#238636]/10 active:scale-[0.98] group"
        >
          Generate Wrapped
          <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5Z"></path>
          </svg>
        </button>
      </form>

      <p className="mt-12 text-[#484f58] text-[10px] uppercase tracking-[0.4em] font-mono">
        git log --oneline --graph --all
      </p>
    </div>
  );
};

export default Landing;
