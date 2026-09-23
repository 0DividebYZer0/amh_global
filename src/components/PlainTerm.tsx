import React, { useState } from 'react';
import { HelpCircle, Sparkles, Check } from 'lucide-react';
import { usePlainLanguage, JARGON_DICTIONARY } from '../context/PlainLanguageContext';

interface PlainTermProps {
  id: keyof typeof JARGON_DICTIONARY;
  className?: string;
  showBadge?: boolean;
}

export const PlainTerm: React.FC<PlainTermProps> = ({ id, className = '', showBadge = false }) => {
  const { isPlainLanguage, term, getExplanation } = usePlainLanguage();
  const [showTooltip, setShowTooltip] = useState(false);

  const item = JARGON_DICTIONARY[id];
  if (!item) return <span>{id}</span>;

  const currentText = term(id);
  const explanation = getExplanation(id);

  return (
    <span className="relative inline-block group">
      <span
        onClick={() => setShowTooltip(!showTooltip)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`cursor-help transition-colors underline decoration-dotted decoration-emerald-500/60 underline-offset-4 ${className}`}
      >
        {currentText}
        {showBadge && isPlainLanguage && (
          <span className="ml-1 inline-flex items-center text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-md">
            Plain
          </span>
        )}
      </span>

      {showTooltip && (
        <span className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-900 text-white text-xs rounded-xl shadow-xl pointer-events-none block animate-in fade-in zoom-in-95 duration-150 border border-slate-700">
          <span className="block font-bold text-emerald-400 text-[11px] mb-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            {isPlainLanguage ? 'Plain Language Meaning:' : 'Technical Definition:'}
          </span>
          <span className="block text-slate-200 text-xs leading-snug">
            {explanation}
          </span>
          <span className="block mt-2 pt-1.5 border-t border-slate-800 text-[10px] text-slate-400 font-mono">
            {isPlainLanguage ? `Technical term: ${item.technical}` : `Everyday meaning: ${item.plain}`}
          </span>
        </span>
      )}
    </span>
  );
};
