import React from 'react';
import { X, ArrowRight } from 'lucide-react';
import { AiInsight } from '../types';
import { Translation } from '../translations';

interface AIFactOverlayProps {
  insight: AiInsight | null;
  onClose: () => void;
  t: Translation;
}

export const AIFactOverlay: React.FC<AIFactOverlayProps> = ({ insight, onClose, t }) => {
  if (!insight || insight.loading) {
    return null;
  }

  return (
    <div className="absolute bottom-24 inset-x-4 md:bottom-8 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:rtl:translate-x-1/2 md:rtl:right-1/2 md:max-w-md z-30 animate-slideUp">
      <div className="bg-slate-900/95 backdrop-blur-xl text-white p-5 rounded-2xl shadow-2xl relative border border-slate-700">
        <button 
          onClick={onClose}
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
  );
};
