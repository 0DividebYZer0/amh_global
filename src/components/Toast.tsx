import React from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-emerald-950 text-white border border-emerald-700/50 rounded-2xl p-4 shadow-2xl flex items-center gap-3 max-w-sm">
        <div className="w-8 h-8 rounded-xl bg-emerald-800 flex items-center justify-center text-emerald-300 shrink-0">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div className="text-xs font-semibold leading-snug flex-1">
          {message}
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-emerald-400 hover:text-white hover:bg-emerald-900 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
