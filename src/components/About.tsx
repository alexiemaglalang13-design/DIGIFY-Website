import React from 'react';
import { Target, CheckCircle2, Sparkles } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 border-t border-sky-400/20 bg-gradient-to-b from-[#0a2777] to-[#06184a] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-300 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>01 / ABOUT DIGIFY</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white font-display">
            ABOUT DIGIFY
          </h2>
          <p className="text-base sm:text-xl text-sky-100 font-normal leading-relaxed pt-1">
            DIGIFY is a digital services business helping small and growing businesses establish a stronger online presence through practical, modern, and accessible digital solutions.
          </p>
        </div>

        {/* Mission Statement Box in Royal Gradient */}
        <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-600/30 via-indigo-600/30 to-purple-600/20 border border-sky-400/30 backdrop-blur-md shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-3 max-w-4xl relative z-10">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold">
              <Target className="w-4 h-4" />
              <span>OUR CORE MISSION</span>
            </div>
            <blockquote className="text-2xl sm:text-3xl font-black text-white font-display leading-snug">
              “To help businesses build a credible, consistent, and effective digital presence without unnecessary complexity.”
            </blockquote>
          </div>
        </div>

        {/* 4 Pillars Grid (Who, What, Who We Serve, Why We Exist) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Who DIGIFY Is */}
          <div className="p-6 rounded-2xl bg-white/95 text-slate-900 border border-slate-100 shadow-xl flex flex-col justify-between group hover:-translate-y-1 transition-transform">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-blue-600 tracking-wider">
                01. WHO WE ARE
              </span>
              <h3 className="text-xl font-black text-slate-900 font-display">
                Digital Services Business
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                DIGIFY is an agile digital partner dedicated to helping small businesses look credible, communicate clearly, and scale effectively.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-blue-700 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>Direct, accessible guidance</span>
            </div>
          </div>

          {/* Card 2: What DIGIFY Provides */}
          <div className="p-6 rounded-2xl bg-white/95 text-slate-900 border border-slate-100 shadow-xl flex flex-col justify-between group hover:-translate-y-1 transition-transform">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-indigo-600 tracking-wider">
                02. WHAT WE PROVIDE
              </span>
              <h3 className="text-xl font-black text-slate-900 font-display">
                Practical Solutions
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Modern responsive websites, cohesive branding assets, focused social media direction, and comprehensive starter packages.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-indigo-700 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              <span>Complete digital deliverables</span>
            </div>
          </div>

          {/* Card 3: Who DIGIFY Serves */}
          <div className="p-6 rounded-2xl bg-white/95 text-slate-900 border border-slate-100 shadow-xl flex flex-col justify-between group hover:-translate-y-1 transition-transform">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-purple-600 tracking-wider">
                03. WHO WE SERVE
              </span>
              <h3 className="text-xl font-black text-slate-900 font-display">
                Small & Growing Firms
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Entrepreneurs, local retailers, independent studios, and expanding ventures wanting a confident, professional market presence.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-purple-700 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-600" />
              <span>Designed for small business</span>
            </div>
          </div>

          {/* Card 4: Why DIGIFY Exists */}
          <div className="p-6 rounded-2xl bg-white/95 text-slate-900 border border-slate-100 shadow-xl flex flex-col justify-between group hover:-translate-y-1 transition-transform">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-sky-600 tracking-wider">
                04. WHY WE EXIST
              </span>
              <h3 className="text-xl font-black text-slate-900 font-display">
                Zero Complexity
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We remove confusing technical jargon and bloated retainers, giving businesses exactly what they need to get seen online.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-sky-700 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-600" />
              <span>Transparent & affordable</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
