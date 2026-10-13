import React from 'react';
import { ArrowRight, Globe, BarChart3, Palette, Settings, Check, Sparkles, Tag, ShieldCheck } from 'lucide-react';
import { IMAGES } from '../assets/images';

interface HeroProps {
  onExploreServices: () => void;
  onClaimOffer: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreServices, onClaimOffer }) => {
  return (
    <section id="hero" className="relative pt-28 pb-14 md:pt-36 md:pb-16 overflow-hidden bg-gradient-to-b from-[#041238] via-[#0a2e8c] to-[#155dfc] text-white">
      {/* Background Starburst / Glowing Atmospheric Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Luminous cyan / royal blue radial glow */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-sky-400/20 rounded-full blur-[140px] -z-10 animate-pulse-glow" />
        <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-[160px] -z-10" />

        {/* Ambient star points */}
        <div className="absolute top-32 left-[18%] w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_#fff] opacity-80" />
        <div className="absolute top-48 left-[45%] w-2 h-2 bg-cyan-200 rounded-full shadow-[0_0_12px_#38bdf8] opacity-90 animate-ping" style={{ animationDuration: '3s' }} />
        <div className="absolute top-80 right-[25%] w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_#fff] opacity-70" />
        <div className="absolute bottom-40 left-[10%] w-2 h-2 bg-sky-300 rounded-full shadow-[0_0_10px_#7dd3fc] opacity-80" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Headlines, Promo Pill, Description, Checkmarks */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Kicker from reference image */}
            <div className="space-y-1">
              <div className="inline-block">
                <span className="text-xs sm:text-sm font-black tracking-widest text-sky-200 uppercase font-display">
                  <span className="border-b-2 border-sky-400 pb-0.5">SMALL BUSINESS</span>. A BIGGER TOMORROW.
                </span>
              </div>
            </div>

            {/* Main Headline with lens sparkles and gradient 'Seen' */}
            <div className="relative">
              {/* Star sparkle on Deserves */}
              <div className="absolute -top-3 left-[150px] sm:left-[190px] text-cyan-200 pointer-events-none select-none animate-pulse">
                <Sparkles className="w-5 h-5 drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] fill-white" />
              </div>

              {/* Star sparkle on Seen */}
              <div className="absolute top-[88px] sm:top-[104px] left-[175px] sm:left-[215px] text-cyan-100 pointer-events-none select-none animate-pulse">
                <Sparkles className="w-5 h-5 drop-shadow-[0_0_10px_rgba(56,189,248,1)] fill-cyan-200" />
              </div>

              <h1 className="text-5xl sm:text-6xl xl:text-7xl font-black font-display tracking-tight text-white leading-[1.08] text-balance drop-shadow-md">
                Your Business <br />
                Deserves to Be <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-cyan-200 to-indigo-200 drop-shadow-[0_4px_24px_rgba(56,189,248,0.5)]">
                  Seen
                </span>{' '}
                Online.
              </h1>
            </div>

            {/* Supporting description from reference image */}
            <p className="text-base sm:text-lg text-sky-100/90 max-w-lg font-normal leading-relaxed pt-1">
              Affordable and easy-to-use digital solutions to help you promote your brand, reach more customers, and grow your business.
            </p>

            {/* LIMITED-TIME OFFER 20% OFF BADGE (from reference image) */}
            <div className="pt-2">
              <div className="relative inline-block group">
                {/* Playful white energy spark marks around badge */}
                <span className="absolute -top-3 -right-3 text-white text-lg font-black select-none pointer-events-none">
                  //
                </span>
                <span className="absolute -bottom-3 -left-3 text-white text-lg font-black select-none pointer-events-none">
                  //
                </span>

                <button
                  onClick={onClaimOffer}
                  className="relative text-left p-4 sm:p-5 pr-8 rounded-3xl bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white shadow-2xl shadow-indigo-900/60 border border-white/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer block"
                >
                  {/* Top White Pill */}
                  <div className="inline-block px-3 py-1 rounded-full bg-white text-indigo-700 text-[11px] font-black uppercase tracking-wider shadow-sm mb-1.5">
                    LIMITED-TIME OFFER
                  </div>

                  {/* Big 20% OFF text */}
                  <div className="text-3xl sm:text-4xl font-black font-display tracking-tight leading-none text-white drop-shadow">
                    20% OFF
                  </div>

                  {/* Subtext */}
                  <div className="text-xs sm:text-sm font-semibold text-sky-100 mt-1 flex items-center gap-1.5">
                    <span>Your First Digital Starter Package.</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </div>
            </div>

            {/* 3 Circular Checkmarks from reference image */}
            <div className="pt-4 space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border-2 border-white/80 bg-blue-700/40 backdrop-blur-sm flex items-center justify-center text-white shadow-md">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <span className="text-base sm:text-lg font-bold text-white tracking-wide">
                  Affordable Packages
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border-2 border-white/80 bg-blue-700/40 backdrop-blur-sm flex items-center justify-center text-white shadow-md">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <span className="text-base sm:text-lg font-bold text-white tracking-wide">
                  Easy-to-Use Solutions
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border-2 border-white/80 bg-blue-700/40 backdrop-blur-sm flex items-center justify-center text-white shadow-md">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <span className="text-base sm:text-lg font-bold text-white tracking-wide">
                  Support You Can Trust
                </span>
              </div>
            </div>

            {/* Secondary Action Link */}
            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={onExploreServices}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white text-xs font-bold tracking-wider uppercase transition-colors"
              >
                Explore All Services
              </button>
              <a
                href="#about"
                className="text-xs text-sky-200 hover:text-white underline underline-offset-4"
              >
                Learn About DIGIFY
              </a>
            </div>

          </div>

          {/* Right Column: 3D Laptop with Swirling Rings, 4 Floating Service Cards & Handwritten Signature */}
          <div className="lg:col-span-6 relative flex flex-col items-center">
            
            {/* Luminous Glowing Light Rings around Laptop */}
            <div className="relative w-full max-w-lg mx-auto py-10">
              
              {/* Swirling energy ellipse behind laptop */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[260px] rounded-full border-2 border-cyan-300/40 -rotate-12 blur-[1px] pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[300px] rounded-full border border-sky-400/25 rotate-6 blur-[2px] pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[180px] bg-cyan-400/20 rounded-full blur-[60px] pointer-events-none" />

              {/* 3D Perspective Laptop Canvas */}
              <div className="relative z-10 mx-auto w-[90%] sm:w-[92%] transition-transform hover:scale-[1.01] duration-500">
                {/* Laptop Display Shell */}
                <div className="rounded-t-2xl p-2.5 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 shadow-2xl border-t border-x border-white/60">
                  <div className="rounded-t-xl overflow-hidden bg-white text-slate-900 aspect-[16/10] relative flex flex-col border border-slate-300 shadow-inner">
                    
                    {/* Top Website Header inside laptop */}
                    <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between bg-slate-50/90 text-[10px]">
                      <span className="font-bold text-slate-700 tracking-wider font-mono">
                        DIGITAL SERVICES BUSINESS
                      </span>
                      <div className="flex items-center gap-3 text-slate-500 font-medium">
                        <span className="hover:text-blue-600">VIEW ONLINE</span>
                        <span className="hover:text-blue-600">CONNECT ONLINE</span>
                      </div>
                    </div>

                    {/* Inside Page Content */}
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-gradient-to-b from-white to-slate-50">
                      <div className="grid grid-cols-12 gap-3 items-center">
                        <div className="col-span-7 space-y-1.5">
                          <h3 className="text-base sm:text-lg font-black text-slate-900 font-display leading-tight">
                            Your Brand <br />
                            <span className="text-blue-600">Stronger Online</span>
                          </h3>
                          <p className="text-[10px] text-slate-500 font-mono">
                            SMALL BUSINESS. A BIGGER TOMORROW.
                          </p>
                          <div className="pt-1">
                            <button
                              onClick={onClaimOffer}
                              className="px-3 py-1 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-bold shadow-md hover:opacity-90"
                            >
                              Get Started
                            </button>
                          </div>
                        </div>

                        {/* Visual in screen */}
                        <div className="col-span-5 rounded-lg overflow-hidden border border-slate-200 shadow-sm aspect-square bg-slate-100">
                          <img
                            src={IMAGES.heroWorkspace}
                            alt="Brand Stronger Online Preview"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-400 font-mono">
                        <span>DIGIFY PRODUCTION DEMO</span>
                        <span>100% RESPONSIVE</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Laptop Base / Keyboard deck */}
                <div className="h-4 bg-gradient-to-b from-slate-400 via-slate-300 to-slate-500 rounded-b-xl shadow-2xl relative border-b-2 border-slate-600">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-slate-500/80 rounded-b-md" />
                </div>
              </div>

              {/* FLOATING CARD 1 (Top-Left): Website */}
              <div className="absolute -top-4 -left-2 sm:-left-6 z-20 p-3 sm:p-3.5 rounded-2xl bg-white text-slate-900 shadow-xl shadow-blue-950/30 border border-slate-100 flex items-center gap-3 animate-bounce" style={{ animationDuration: '6s' }}>
                <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-black font-display text-slate-900 leading-tight">
                    Website
                  </div>
                  <div className="text-[10px] text-slate-500 leading-tight">
                    Modern. Responsive.<br />Made for you.
                  </div>
                </div>
              </div>

              {/* FLOATING CARD 2 (Top-Right): Social Media */}
              <div className="absolute -top-4 -right-2 sm:-right-6 z-20 p-3 sm:p-3.5 rounded-2xl bg-white text-slate-900 shadow-xl shadow-blue-950/30 border border-slate-100 flex items-center gap-3 animate-bounce" style={{ animationDuration: '7s' }}>
                <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-black font-display text-slate-900 leading-tight">
                    Social Media
                  </div>
                  <div className="text-[10px] text-slate-500 leading-tight">
                    Engage. Grow.<br />Reach more.
                  </div>
                </div>
              </div>

              {/* FLOATING CARD 3 (Bottom-Left): Branding */}
              <div className="absolute bottom-6 -left-3 sm:-left-8 z-20 p-3 sm:p-3.5 rounded-2xl bg-white text-slate-900 shadow-xl shadow-blue-950/30 border border-slate-100 flex items-center gap-3 animate-bounce" style={{ animationDuration: '8s' }}>
                <div className="w-10 h-10 rounded-full bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Palette className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-black font-display text-slate-900 leading-tight">
                    Branding
                  </div>
                  <div className="text-[10px] text-slate-500 leading-tight">
                    Stand out with a<br />unique identity.
                  </div>
                </div>
              </div>

              {/* FLOATING CARD 4 (Bottom-Right): Support */}
              <div className="absolute -bottom-2 -right-3 sm:-right-6 z-20 p-3 sm:p-3.5 rounded-2xl bg-white text-slate-900 shadow-xl shadow-blue-950/30 border border-slate-100 flex items-center gap-3 animate-bounce" style={{ animationDuration: '6.5s' }}>
                <div className="w-10 h-10 rounded-full bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-black font-display text-slate-900 leading-tight">
                    Support
                  </div>
                  <div className="text-[10px] text-slate-500 leading-tight">
                    Guidance along<br />the way.
                  </div>
                </div>
              </div>

            </div>

            {/* HANDWRITTEN SCRIPT SIGNATURE (from bottom right of reference image) */}
            <div className="w-full text-right pr-4 sm:pr-8 mt-6 select-none">
              <div className="inline-block transform -rotate-2">
                <span className="font-script text-3xl sm:text-4xl lg:text-5xl font-bold text-sky-200 tracking-wide drop-shadow-[0_2px_12px_rgba(255,255,255,0.4)] block">
                  Let's Build
                </span>
                <span className="font-script text-3xl sm:text-4xl lg:text-5xl font-bold text-sky-100 tracking-wide drop-shadow-[0_2px_12px_rgba(255,255,255,0.4)] block -mt-1">
                  Your Online Success.
                </span>
                {/* Dynamic curved brush underline sweep */}
                <svg className="w-full h-4 mt-1 text-cyan-300 drop-shadow" viewBox="0 0 200 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 11 C 60 2, 140 3, 198 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
