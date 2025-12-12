import React, { useState } from 'react';
import { Person, UnitSystem, LanguageCode } from '../types';
import { Ruler, Sparkles, Globe } from 'lucide-react';
import { translations, Translation } from '../translations';

interface ControlsProps {
  people: [Person, Person];
  setPerson: (index: 0 | 1, data: Partial<Person>) => void;
  unitSystem: UnitSystem;
  setUnitSystem: (u: UnitSystem) => void;
  onGenerateFact: () => void;
  isAiLoading: boolean;
  language: LanguageCode;
  setLanguage: (l: LanguageCode) => void;
  isSetupMode?: boolean;
}

const COLORS = [
  '#3b82f6', // blue
  '#ef4444', // red
  '#10b981', // green
  '#f59e0b', // amber
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#6366f1', // indigo
  '#14b8a6', // teal
];

export const Controls: React.FC<ControlsProps> = ({
  people,
  setPerson,
  unitSystem,
  setUnitSystem,
  onGenerateFact,
  isAiLoading,
  language,
  setLanguage,
  isSetupMode = false
}) => {
  const [activeTab, setActiveTab] = useState<0 | 1>(0);
  const t: Translation = translations[language];

  const cmToFeetInches = (cm: number) => {
    const realFeet = (cm * 0.393700787) / 12;
    const feet = Math.floor(realFeet);
    const inches = Math.round((realFeet - feet) * 12);
    return { feet, inches };
  };

  const updateHeightFromImperial = (index: 0 | 1, feet: number, inches: number) => {
    const totalInches = (feet * 12) + inches;
    const cm = totalInches * 2.54;
    setPerson(index, { heightCm: cm });
  };

  const PersonInput = ({ index }: { index: 0 | 1 }) => {
    const p = people[index];
    const { feet, inches } = cmToFeetInches(p.heightCm);

    return (
      <div className="space-y-4 animate-fadeIn">
        {/* Name Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">{t.name}</label>
          <input
            type="text"
            value={p.name}
            onChange={(e) => setPerson(index, { name: e.target.value })}
            className="w-full bg-slate-100 border-none rounded-lg px-4 py-3 text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
            placeholder={t.placeholder}
          />
        </div>

        {/* Height Input */}
        <div>
           <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">{t.height}</label>
           
           {unitSystem === UnitSystem.METRIC ? (
             <div className="flex items-center space-x-2 rtl:space-x-reverse">
               <input
                 type="number"
                 value={Math.round(p.heightCm)}
                 onChange={(e) => setPerson(index, { heightCm: Number(e.target.value) })}
                 className="flex-1 bg-slate-100 border-none rounded-lg px-4 py-3 text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
               />
               <span className="text-slate-500 font-medium">{t.unitCm}</span>
             </div>
           ) : (
             <div className="flex space-x-2 rtl:space-x-reverse">
               <div className="flex-1 flex items-center bg-slate-100 rounded-lg px-3 transition-shadow focus-within:ring-2 focus-within:ring-blue-500">
                 <input
                   type="number"
                   value={feet}
                   onChange={(e) => updateHeightFromImperial(index, Number(e.target.value), inches)}
                   className="w-full bg-transparent border-none py-3 text-slate-900 font-medium focus:ring-0 outline-none"
                 />
                 <span className="text-slate-400 text-sm">{t.unitFt}</span>
               </div>
               <div className="flex-1 flex items-center bg-slate-100 rounded-lg px-3 transition-shadow focus-within:ring-2 focus-within:ring-blue-500">
                 <input
                   type="number"
                   value={inches}
                   onChange={(e) => updateHeightFromImperial(index, feet, Number(e.target.value))}
                   className="w-full bg-transparent border-none py-3 text-slate-900 font-medium focus:ring-0 outline-none"
                 />
                 <span className="text-slate-400 text-sm">{t.unitIn}</span>
               </div>
             </div>
           )}

           <input
             type="range"
             min="50"
             max="250"
             value={p.heightCm}
             onChange={(e) => setPerson(index, { heightCm: Number(e.target.value) })}
             className="w-full mt-4 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 touch-pan-x"
             style={{ direction: 'ltr' }} // Slider always LTR for consistent low-to-high
           />
        </div>

        {/* Color Selection */}
        <div>
            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">{t.color}</label>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {COLORS.map(c => (
                    <button 
                        key={c}
                        onClick={() => setPerson(index, { color: c })}
                        className={`w-10 h-10 rounded-full border-2 transition-transform active:scale-95 flex-shrink-0 ${p.color === c ? 'border-slate-800 scale-110 shadow-sm' : 'border-transparent'}`}
                        style={{ backgroundColor: c }}
                        aria-label={`Select color ${c}`}
                    />
                ))}
            </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-t-3xl shadow-[0_-5px_40px_-5px_rgba(0,0,0,0.15)] p-6 md:w-96 md:rounded-3xl md:m-6 md:h-fit md:shadow-xl border border-slate-100 z-10 flex flex-col max-h-[85vh] md:max-h-none overflow-hidden">
      
      {/* Header / Tabs */}
      <div className="flex items-center justify-between mb-6 flex-shrink-0">
        <div className="flex space-x-1 rtl:space-x-reverse bg-slate-100 p-1.5 rounded-xl">
            <button 
                onClick={() => setActiveTab(0)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 0 ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
                {people[0].name.split(' ')[0] || 'A'}
            </button>
            <button 
                onClick={() => setActiveTab(1)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 1 ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
                {people[1].name.split(' ')[0] || 'B'}
            </button>
        </div>

        <div className="flex space-x-2 rtl:space-x-reverse">
             {/* Language Toggle */}
            <div className="relative group">
                <button 
                    className="p-3 text-slate-400 hover:text-blue-600 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
                    title="Change Language"
                >
                    <Globe size={20} />
                </button>
                <div className="absolute right-0 rtl:left-0 rtl:right-auto top-full mt-2 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden w-32 hidden group-hover:block z-50">
                    {Object.entries(translations).map(([code, config]) => (
                        <button
                            key={code}
                            onClick={() => setLanguage(code as LanguageCode)}
                            className={`w-full text-left rtl:text-right px-4 py-2 text-sm hover:bg-slate-50 ${language === code ? 'text-blue-600 font-bold' : 'text-slate-600'}`}
                        >
                            {config.langName}
                        </button>
                    ))}
                </div>
            </div>

            {/* Units Toggle */}
            <button 
                onClick={() => setUnitSystem(unitSystem === UnitSystem.METRIC ? UnitSystem.IMPERIAL : UnitSystem.METRIC)}
                className="p-3 text-slate-400 hover:text-blue-600 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
                title="Toggle Units"
            >
                <Ruler size={20} />
            </button>
        </div>
      </div>

      {/* Input Content - Scrollable on small screens */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden pr-1 -mr-1 rtl:pl-1 rtl:pr-0 rtl:-ml-1 rtl:-mr-0">
        <PersonInput index={activeTab} />
      </div>

      <div className="border-t border-slate-100 my-4 md:my-6 flex-shrink-0"></div>

      {/* AI Action or Submit Button */}
      <button
        onClick={onGenerateFact}
        disabled={isAiLoading}
        className="w-full bg-slate-900 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-slate-900/20 hover:shadow-xl hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group flex-shrink-0 rtl:flex-row-reverse"
      >
        {isAiLoading ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
            <Sparkles size={18} className={isSetupMode ? "text-blue-400 group-hover:rotate-12 transition-transform" : "text-yellow-400 group-hover:rotate-12 transition-transform"} />
        )}
        {isAiLoading ? t.analyzing : (isSetupMode ? 'View Results' : t.compare)}
      </button>

    </div>
  );
};