import React from 'react';
import { Check, Sparkles } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-slate-900/95 border border-sky-400/50 text-white shadow-2xl text-xs backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-200">
      <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
        <Check className="w-3.5 h-3.5 stroke-[3]" />
      </div>
      <span className="font-bold text-white tracking-wide">{message}</span>
    </div>
  );
};
