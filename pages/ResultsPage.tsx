import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Person, AiInsight, LanguageCode } from '../types';
import { Visualizer } from '../components/Visualizer';
import { AIFactOverlay } from '../components/AIFactOverlay';
import { generateHeightComparisonFact } from '../services/geminiService';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { translations } from '../translations';

interface ResultsPageProps {
  people: [Person, Person];
  language: LanguageCode;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ people, language }) => {
  const navigate = useNavigate();
  const [insight, setInsight] = useState<AiInsight | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const t = translations[language];

  // Apply direction to the root element for correct layout mirroring
  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = language;
  }, [language, t.dir]);

  const handleGenerateFact = async () => {
    setIsGenerating(true);
    setInsight({ text: '', loading: true });
    
    const p1 = people[0];
    const p2 = people[1];
    const diff = p1.heightCm - p2.heightCm;

    const fact = await generateHeightComparisonFact(
      diff,
      p1.name,
      p1.heightCm,
      p2.name,
      p2.heightCm,
      language
    );

    setInsight({ text: fact, loading: false });
    setIsGenerating(false);
  };

  const handleBackToSetup = () => {
    navigate('/');
  };

  const diffCm = Math.abs(people[0].heightCm - people[1].heightCm);

  return (
    <div className="h-[100dvh] w-full flex flex-col bg-slate-50 relative overflow-hidden">
      {/* Back Button */}
      <button
        onClick={handleBackToSetup}
        className="absolute top-4 left-4 md:top-8 md:left-8 z-30 p-2 md:p-3 bg-white/80 backdrop-blur-md rounded-xl shadow-md hover:bg-white transition-colors flex items-center gap-2 text-slate-700 hover:text-slate-900 rtl:left-auto rtl:right-4 md:rtl:right-8"
      >
        <ArrowLeft size={20} className="rtl:rotate-180" />
        <span className="hidden md:inline text-sm font-medium">{t.title}</span>
      </button>

      {/* Mobile Stats Pill (Top Center) */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 pointer-events-none md:hidden rtl:left-auto rtl:right-1/2 rtl:translate-x-1/2">
        <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-slate-200 pointer-events-auto flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">{t.diffShort}</span>
          <span className="text-base font-bold text-slate-800">{Math.round(diffCm)} {t.unitCm}</span>
        </div>
      </div>

      {/* Main Visualizer Area */}
      <div className="flex-1 relative h-full flex flex-col">
        <Visualizer personA={people[0]} personB={people[1]} />
        
        {/* Desktop Stats Overlay */}
        <div className="hidden md:block absolute top-20 start-8 bg-white/80 backdrop-blur shadow-xl p-5 rounded-2xl border border-white/50 max-w-xs animate-fadeIn">
          <h1 className="text-lg font-bold text-slate-800 mb-1">{t.title}</h1>
          <p className="text-slate-500 text-xs mb-4">{t.subtitle}</p>
          
          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg gap-4">
            <span className="text-xs text-slate-500 font-bold uppercase">{t.difference}</span>
            <span className="text-xl font-bold text-slate-900">{Math.round(diffCm)} {t.unitCm}</span>
          </div>
        </div>

        {/* AI Insight Overlay */}
        <AIFactOverlay insight={insight} onClose={() => setInsight(null)} t={t} />

        {/* AI Generation Button */}
        <button
          onClick={handleGenerateFact}
          disabled={isGenerating}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 md:bottom-8 bg-slate-900 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-slate-900/20 hover:shadow-xl hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 rtl:flex-row-reverse z-30"
        >
          {isGenerating ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Sparkles size={18} className="text-yellow-400" />
          )}
          {isGenerating ? t.analyzing : t.compare}
        </button>
      </div>
    </div>
  );
};

export default ResultsPage;
