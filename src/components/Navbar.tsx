import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Sparkles, Tag, Lock } from 'lucide-react';
import { DigifyLogo } from './DigifyLogo';

interface NavbarProps {
  onClaimOffer: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onClaimOffer, onOpenAdmin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Features', href: '#features' },
    { label: 'Services', href: '#services' },
    { label: 'Offer', href: '#offer' },
    { label: 'Campaign', href: '#campaign' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#05133d]/95 backdrop-blur-md border-b border-sky-400/20 shadow-xl shadow-blue-950/50'
            : 'bg-transparent border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Left: Brand Monogram & Lockup */}
          <a href="#hero" className="flex items-center gap-3">
            <DigifyLogo size="md" showSubtitle={true} />
          </a>

          {/* Center: Clean Nav Links (Desktop) */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-200">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-cyan-300 transition-colors py-1 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: Slogan & Primary CTA & Admin Access */}
          <div className="flex items-center gap-3">
            {/* "BUILD CONNECT GROW" Brand Tagline */}
            <div className="hidden 2xl:flex items-center gap-3 text-xs tracking-widest text-slate-200 font-bold uppercase select-none mr-2">
              <span className="w-8 h-0.5 bg-gradient-to-r from-transparent to-sky-400/80 inline-block" />
              <span className="text-white hover:text-cyan-300 transition-colors">BUILD</span>
              <span className="text-slate-400">·</span>
              <span className="text-white hover:text-cyan-300 transition-colors">CONNECT</span>
              <span className="text-slate-400">·</span>
              <span className="text-white hover:text-cyan-300 transition-colors">GROW</span>
            </div>

            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-sky-200 hover:text-white bg-white/10 hover:bg-white/20 rounded-xl border border-white/15 transition-all cursor-pointer shadow-xs"
              title="Open Digify Administrator Portal"
            >
              <Lock className="w-3.5 h-3.5 text-cyan-300" />
              <span>Admin</span>
            </button>

            <button
              onClick={onClaimOffer}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-full shadow-lg shadow-blue-600/30 transition-all active:scale-[0.98] border border-white/20 whitespace-nowrap cursor-pointer"
            >
              <Tag className="w-3.5 h-3.5 text-cyan-300" />
              <span>Claim 20% Off</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#04133b]/98 backdrop-blur-2xl xl:hidden flex flex-col pt-24 px-6 pb-8"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between pb-5 border-b border-sky-500/20">
            <span className="text-xs uppercase tracking-wider text-sky-300 font-mono">DIGIFY DIRECTORY</span>
            <span className="text-xs text-slate-300 font-semibold">BUILD · CONNECT · GROW</span>
          </div>

          <div className="flex-1 overflow-y-auto py-5 space-y-2">
            {navLinks.map((link, idx) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.href)}
                className="w-full flex items-center justify-between text-left py-3 text-base font-semibold text-slate-200 hover:text-cyan-300 border-b border-white/5 transition-colors"
              >
                <span>{link.label}</span>
                <span className="text-xs font-mono text-sky-400">0{idx + 1}</span>
              </button>
            ))}
          </div>

          <div className="pt-5 border-t border-sky-500/20 space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-colors"
            >
              <Lock className="w-4 h-4 text-cyan-300" />
              <span>Administrator Portal Login</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onClaimOffer();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-sm shadow-xl shadow-blue-600/40"
            >
              <span>Claim 20% Off Starter Package</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-center text-xs text-sky-200/70">
              Inquiries: <span className="text-white font-mono">digify@gmail.com</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};
