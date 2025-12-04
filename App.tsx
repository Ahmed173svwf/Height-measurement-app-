import React, { useState, useEffect } from 'react';
import { Person, UnitSystem, AiInsight, LanguageCode } from './types';
import { Visualizer } from './components/Visualizer';
import { Controls } from './components/Controls';
import { generateHeightComparisonFact } from './services/geminiService';
import { X, ArrowRight } from 'lucide-react';
import { translations } from './translations';

const App: React.FC = () => {
  const [people, setPeople] = useState<[Person, Person]>([
    {
      id: 'p1',
      name: 'Person A',
      heightCm: 175,
      color: '#3b82f6',
    },
    {
      id: 'p2',
      name: 'Person B',
      heightCm: 162,
      color: '#ec4899',
    }
  ]);

  const [unitSystem, setUnitSystem] = useState<UnitSystem>(UnitSystem.METRIC);
  const [insight, setInsight] = useState<AiInsight | null>(null);
  const [language, setLanguage] = useState<LanguageCode>('en');

  const t = translations[language];

  // Apply direction to the root element for correct layout mirroring
  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = language;
  }, [language, t.dir]);

  const handleSetPerson = (index: 0 | 1, data: Partial<Person>) => {
    setPeople(prev => {
      const newPeople = [...prev] as [Person, Person];
      newPeople[index] = { ...newPeople[index], ...data };
      return newPeople;
    });
  };

  const handleGenerateFact = async () => {
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
  };

  const diffCm = Math.abs(people[0].heightCm - people[1].heightCm);

  return (
    // Use dvh (dynamic viewport height) for mobile browsers to handle address bars correctly
    <div className="h-[100dvh] w-full flex flex-col md:flex-row bg-slate-50 relative overflow-hidden">
      
      {/* Mobile Stats Pill (Top Center) */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none md:hidden rtl:left-auto rtl:right-1/2 rtl:translate-x-1/2">
         <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-slate-200 pointer-events-auto flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">{t.diffShort}</span>
            <span className="text-base font-bold text-slate-800">{Math.round(diffCm)} {t.unitCm}</span>
         </div>
      </div>

      {/* Main Visualizer Area */}
      <div className="flex-1 relative h-full order-1 md:order-1 flex flex-col">
         <Visualizer personA={people[0]} personB={people[1]} />
         
         {/* Desktop Stats Overlay */}
         <div className="hidden md:block absolute top-8 start-8 bg-white/80 backdrop-blur shadow-xl p-5 rounded-2xl border border-white/50 max-w-xs animate-fadeIn">
            <h1 className="text-lg font-bold text-slate-800 mb-1">{t.title}</h1>
            <p className="text-slate-500 text-xs mb-4">{t.subtitle}</p>
            
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg gap-4">
                <span className="text-xs text-slate-500 font-bold uppercase">{t.difference}</span>
                <span className="text-xl font-bold text-slate-900">{Math.round(diffCm)} {t.unitCm}</span>
            </div>
         </div>

         {/* AI Insight Overlay */}
         {insight && !insight.loading && (
             <div className="absolute bottom-24 inset-x-4 md:bottom-8 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:rtl:translate-x-1/2 md:rtl:right-1/2 md:max-w-md z-30 animate-slideUp">
                 <div className="bg-slate-900/95 backdrop-blur-xl text-white p-5 rounded-2xl shadow-2xl relative border border-slate-700">
                     <button 
                        onClick={() => setInsight(null)}
                        className="absolute top-3 right-3 rtl:right-auto rtl:left-3 text-slate-400 hover:text-white transition-colors"
                     >
                        <X size={18} />
                     </button>
                     <div className="flex gap-4">
                        <div className="bg-indigo-500/20 p-2.5 rounded-xl h-fit text-indigo-300 shrink-0">
                            <ArrowRight size={20} className="rtl:rotate-180"/>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-2">{t.aiAnalysis}</h4>
                            <p className="text-sm text-slate-200 leading-relaxed font-medium">"{insight.text}"</p>
                        </div>
                     </div>
                 </div>
             </div>
         )}
      </div>

      {/* Controls Container */}
      <div className="order-2 md:order-2 z-20 flex flex-col justify-end pointer-events-none w-full md:w-auto md:h-full">
        <div className="pointer-events-auto w-full md:w-auto md:h-full flex flex-col justify-end md:justify-center">
            <Controls 
                people={people} 
                setPerson={handleSetPerson} 
                unitSystem={unitSystem}
                setUnitSystem={setUnitSystem}
                onGenerateFact={handleGenerateFact}
                isAiLoading={insight?.loading || false}
                language={language}
                setLanguage={setLanguage}
            />
        </div>
      </div>
    </div>
  );
};

export default App;