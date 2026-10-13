import React from 'react';
import { ArrowUp, Mail, Tag, ShieldCheck, Heart, MapPin, Phone, Clock, Lock } from 'lucide-react';
import { DigifyLogo } from './DigifyLogo';

interface FooterProps {
  onClaimOffer: () => void;
  onExploreServices: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onClaimOffer, onExploreServices, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Features', href: '#features' },
    { label: 'Services', href: '#services' },
    { label: 'Offer', href: '#offer' },
    { label: 'Campaign', href: '#campaign' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="border-t border-sky-400/20 bg-[#030d28] text-slate-400 relative">
      
      {/* Pre-Footer Final Conversion Banner */}
      <div className="border-b border-sky-400/20 py-20 bg-gradient-to-b from-[#041238] via-[#08236d] to-[#030d28] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-300 font-bold">
            <span>BUILD · CONNECT · GROW</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display max-w-4xl mx-auto leading-tight text-balance">
            Your Business Deserves to Be Seen Online.
          </h2>

          <p className="text-base sm:text-lg text-sky-100/90 max-w-xl mx-auto font-normal">
            Take advantage of the DIGIFY Starter Package and claim 20% off your initial digital project.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
            <button
              onClick={onClaimOffer}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 text-white font-black text-sm shadow-xl shadow-blue-600/30 cursor-pointer"
            >
              Claim 20% Offer Now
            </button>
            <button
              onClick={onExploreServices}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/25 transition-colors cursor-pointer"
            >
              Review All Services
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand & Purpose (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <a href="#hero" className="inline-block">
              <DigifyLogo size="lg" showSubtitle={true} />
            </a>
            <p className="text-sm text-sky-100/80 max-w-sm leading-relaxed pt-1">
              Helping small and growing businesses establish a stronger online presence through practical, modern, and accessible digital solutions.
            </p>
            
            <div className="pt-2 space-y-2 text-xs text-sky-200/90">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-300" />
                <span>Email: <span className="text-white font-mono font-bold">digify@gmail.com</span></span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-cyan-300" />
                <span>Desk: <span className="text-white font-mono font-bold">+63 296-587-0175</span></span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-cyan-300" />
                <span>Hours: <span className="text-white font-medium">Mon – Fri: 9:00 AM – 6:00 PM EST</span></span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-300" />
                <span>Studio: <span className="text-white font-medium">123 ATA St., Angeles City, Pampanga</span></span>
              </div>
            </div>
          </div>

          {/* Quick Nav Links (7 cols) */}
          <div className="md:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono uppercase tracking-wider text-white font-bold">
                NAVIGATION DIRECTORY
              </div>
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-colors cursor-pointer"
                aria-label="Back to top"
              >
                <span>Back to top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:text-cyan-300 transition-colors py-1 text-slate-300 font-medium"
                >
                  {link.label}
                </a>
              ))}
            </div>
            
            <div className="pt-4 border-t border-sky-400/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="text-xs text-slate-300">
                <span className="text-[11px] font-mono text-cyan-300 uppercase font-bold block mb-1">
                  Social Channels
                </span>
                <div className="flex gap-3">
                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cyan-300 transition-colors"
                  >
                    Facebook
                  </a>
                  <span>·</span>
                  <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cyan-300 transition-colors"
                  >
                    Instagram
                  </a>
                </div>
              </div>

              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-cyan-300 hover:text-white transition-colors cursor-pointer border border-white/10"
              >
                <Lock className="w-3 h-3" />
                <span>Admin Login</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Hairline & Legal Bar */}
        <div className="mt-12 pt-8 border-t border-sky-400/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2026 DIGIFY. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-sky-200">
            <span>Affordable Packages</span>
            <span>·</span>
            <span>Easy-to-Use Solutions</span>
            <span>·</span>
            <span>Support You Can Trust</span>
            <span>·</span>
            <button
              onClick={onOpenAdmin}
              className="text-cyan-300 hover:underline cursor-pointer"
            >
              Admin Portal
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
