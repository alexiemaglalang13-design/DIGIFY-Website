import React from 'react';
import { Tag, ArrowRight, Check, Sparkles, Globe, Palette, Share2, Mail } from 'lucide-react';

interface OfferProps {
  onClaimOffer: () => void;
}

export const Offer: React.FC<OfferProps> = ({ onClaimOffer }) => {
  const essentials = [
    {
      icon: <Globe className="w-5 h-5 text-cyan-300" />,
      title: 'Modern Responsive Website',
      description: 'Up to 3 conversion-focused pages built with mobile-first standards and clean code.',
    },
    {
      icon: <Palette className="w-5 h-5 text-cyan-300" />,
      title: 'Cohesive Brand System',
      description: 'Production vector logo kit, harmonic color palette, and typography hierarchy.',
    },
    {
      icon: <Share2 className="w-5 h-5 text-cyan-300" />,
      title: 'Social Media Launch Kit',
      description: 'Branded announcement graphics and templates formatted for multi-platform publishing.',
    },
    {
      icon: <Mail className="w-5 h-5 text-cyan-300" />,
      title: 'Email Outreach Blueprint',
      description: 'Clean, responsive email newsletter and promotional template to engage customers.',
    },
  ];

  return (
    <section id="offer" className="py-24 border-t border-sky-400/20 relative overflow-hidden bg-gradient-to-b from-[#051540] via-[#092a82] to-[#04133b] text-white scroll-mt-20">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-cyan-400/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-3 max-w-3xl pb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-300 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PROMOTIONAL OFFER</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white font-display">
            OFFER
          </h2>
          <p className="text-base sm:text-lg text-sky-100/90 leading-relaxed">
            Our premier all-in-one package designed to help emerging businesses establish instant credibility and get seen online.
          </p>
        </div>

        {/* Streamlined High-Impact Card */}
        <div className="rounded-3xl border-2 border-white/20 bg-gradient-to-br from-blue-700/90 via-indigo-700/90 to-purple-900/90 p-8 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden backdrop-blur-md">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Offer Headline, Inclusions (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-indigo-900 text-xs font-black uppercase tracking-wider shadow-md">
                  <Tag className="w-3.5 h-3.5 text-indigo-700" />
                  <span>SPECIAL PROMOTION · 20% DISCOUNT</span>
                </div>

                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display leading-tight">
                  DIGIFY STARTER PACKAGE
                </h3>

                <p className="text-base sm:text-lg text-sky-100 leading-relaxed font-normal">
                  Everything your business needs to launch online. A practical combination of essential digital services at an exclusive promotional rate.
                </p>
              </div>

              {/* 4 Concise Inclusions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {essentials.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm space-y-1.5 hover:bg-white/15 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 text-sm font-bold text-white">
                      {item.icon}
                      <span>{item.title}</span>
                    </div>
                    <p className="text-xs text-sky-100/80 leading-relaxed pl-7">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Column: Pricing & Action Box (5 Cols) */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-white text-slate-900 p-8 space-y-6 shadow-2xl border border-slate-100 text-center">
                
                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                    PROMOTIONAL OFFER TIER
                  </span>
                  <div className="text-4xl sm:text-5xl font-black font-display text-blue-700">
                    20% OFF
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    Applied directly to your project proposal
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Package:</span>
                    <strong className="text-slate-900">Digify Starter Package</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Coupon Code:</span>
                    <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                      STARTER20
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Intake Status:</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Open for Bookings
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <button
                    onClick={onClaimOffer}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 text-white font-black text-sm transition-all shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                  >
                    <span>CLAIM OFFER — SAVE 20%</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[11px] text-slate-400 font-mono">
                    Code STARTER20 automatically applied on click
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
