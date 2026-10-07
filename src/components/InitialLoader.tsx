import React, { useState, useEffect } from 'react';
import { Terminal, Sparkles } from 'lucide-react';

export const InitialLoader: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      const removeTimer = setTimeout(() => {
        setLoading(false);
      }, 400);
      return () => clearTimeout(removeTimer);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white transition-opacity duration-400 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Spinner Ring */}
        <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-slate-800" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 animate-spin" />
          <Terminal className="w-6 h-6 text-cyan-400" />
        </div>

        {/* Title */}
        <div className="font-mono text-xs tracking-widest text-slate-400 flex items-center gap-1.5 uppercase">
          <span>E-PORTFOLIO 2026</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        </div>

        <div className="font-sans text-sm font-bold text-white mt-1">
          NGUYỄN ĐỖ MINH ANH
        </div>
      </div>
    </div>
  );
};
