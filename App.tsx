
import React, { useState } from 'react';
import { Step, GitHubStats, AIInsights } from './types';
import { fetchGitHubData } from './services/githubService';
import { generateAIWrapped } from './services/geminiService';
import Landing from './components/Landing';
import Loading from './components/Loading';
import StatsSlide from './components/StatsSlide';
import PatternDetection from './components/PatternDetection';
import AIInsightsSlide from './components/AIInsightsSlide';
import NarrativeSummary from './components/NarrativeSummary';
import ArchetypeReveal from './components/ArchetypeReveal';
import ShareCard from './components/ShareCard';
import ActivityManifest from './components/ActivityManifest';

const App: React.FC = () => {
  const [step, setStep] = useState<Step>(Step.Entry);
  const [username, setUsername] = useState('');
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [insights, setInsights] = useState<AIInsights | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startAnalysis = async (user: string, token?: string) => {
    setUsername(user);
    setStep(Step.Analysis);
    setError(null);
    
    try {
      const fetchedStats = await fetchGitHubData(user, token);
      setStats(fetchedStats);
      
      const fetchedInsights = await generateAIWrapped(fetchedStats);
      setInsights(fetchedInsights);
      
      // Delay for cinematic buildup
      setTimeout(() => setStep(Step.Stats), 3500);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to analyze GitHub profile.');
      setStep(Step.Entry);
    }
  };

  const nextStep = () => {
    if (step < Step.Share) {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (step > Step.Stats) {
      setStep(prev => prev - 1);
    } else if (step === Step.Stats) {
      setStep(Step.Entry);
    }
  };

  const renderStep = () => {
    switch (step) {
      case Step.Entry:
        return <Landing onConnect={startAnalysis} error={error} />;
      case Step.Analysis:
        return <Loading />;
      case Step.Stats:
        return stats && <StatsSlide stats={stats} onNext={nextStep} onBack={prevStep} />;
      case Step.Patterns:
        return insights && <PatternDetection insights={insights} onNext={nextStep} onBack={prevStep} />;
      case Step.AIInsights:
        return insights && <AIInsightsSlide insights={insights} onNext={nextStep} onBack={prevStep} />;
      case Step.Narrative:
        return insights && <NarrativeSummary insights={insights} onNext={nextStep} onBack={prevStep} />;
      case Step.Archetype:
        return insights && <ArchetypeReveal insights={insights} onNext={nextStep} onBack={prevStep} />;
      case Step.Share:
        return stats && insights && (
          <div className="w-full flex flex-col items-center pt-12 pb-24 no-scrollbar">
            <ShareCard stats={stats} insights={insights} onReset={() => setStep(Step.Entry)} />
            <ActivityManifest stats={stats} />
          </div>
        );
      default:
        return <Landing onConnect={startAnalysis} error={error} />;
    }
  };

  return (
    <div className={`min-h-screen bg-[#0d1117] text-[#c9d1d9] flex flex-col items-center justify-center relative transition-colors duration-1000 ${step === Step.Share ? 'overflow-y-auto' : 'overflow-hidden'}`}>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none opacity-20 transition-all duration-[3000ms] z-0">
        <div className={`absolute -top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full blur-[160px] transition-colors duration-[2000ms] ${step >= Step.Stats ? 'bg-purple-900/30' : 'bg-blue-900/20'}`}></div>
        <div className={`absolute -bottom-1/4 -right-1/4 w-[800px] h-[800px] rounded-full blur-[160px] transition-colors duration-[2000ms] ${step >= Step.Narrative ? 'bg-blue-900/30' : 'bg-purple-900/20'}`}></div>
      </div>
      
      <main className="w-full max-w-5xl px-6 z-10 flex flex-col items-center justify-center min-h-screen relative">
        {renderStep()}
      </main>

      {/* Progress Narrative - Subtle */}
      {step >= Step.Stats && step < Step.Share && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 z-50">
           <span className="text-[10px] font-mono tracking-[0.3em] text-[#484f58] uppercase">
             Phase 0{(step - Step.Stats) + 1}
           </span>
           <div className="w-24 h-[1px] bg-[#30363d] relative">
              <div 
                className="absolute top-0 left-0 h-full bg-white transition-all duration-700"
                style={{ width: `${((step - Step.Stats) / (Step.Share - Step.Stats - 1)) * 100}%` }}
              ></div>
           </div>
        </div>
      )}
    </div>
  );
};

export default App;
