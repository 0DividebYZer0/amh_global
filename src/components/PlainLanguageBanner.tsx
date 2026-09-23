import React from 'react';
import { Sparkles, HelpCircle, Check, BookOpen, ArrowRight, X } from 'lucide-react';
import { usePlainLanguage } from '../context/PlainLanguageContext';

interface PlainLanguageBannerProps {
  onDismiss?: () => void;
}

export const PlainLanguageBanner: React.FC<PlainLanguageBannerProps> = ({ onDismiss }) => {
  const { isPlainLanguage, togglePlainLanguage } = usePlainLanguage();

  if (!isPlainLanguage) return null;

  return (
    <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-b border-emerald-200/80 px-4 py-2 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-emerald-950 font-medium text-center sm:text-left">
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-600 text-white shrink-0 shadow-xs">
            <Sparkles className="w-3 h-3" />
          </span>
          <span>
            <strong className="font-bold text-emerald-900">Plain Language Mode Active:</strong> Technical agricultural words (like <em>off-take</em>, <em>flocculation</em>, <em>COA</em>, and <em>de-winged</em>) are simplified into everyday terms to support all farmers and community members.
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={togglePlainLanguage}
            className="px-2.5 py-1 rounded-lg bg-white border border-emerald-300 text-emerald-900 hover:bg-emerald-100 font-semibold transition-colors flex items-center gap-1 shadow-2xs"
            title="Switch back to industrial & botanical technical terminology"
          >
            <span>Switch to Technical Jargon</span>
          </button>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="p-1 text-emerald-800 hover:text-emerald-950 rounded-md hover:bg-emerald-100"
              title="Close notice"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
