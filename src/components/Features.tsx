import React, { useState } from 'react';
import { Globe, Palette, TrendingUp, Check, ArrowRight, Sparkles } from 'lucide-react';
import { IMAGES } from '../assets/images';

interface FeaturesProps {
  onSelectFeatureAction: (featureName: string) => void;
}

export const Features: React.FC<FeaturesProps> = ({ onSelectFeatureAction }) => {
  const [activeFeature, setActiveFeature] = useState<number>(0);

  const features = [
    {
      id: 0,
      number: 'FEATURE 01',
      title: 'WEB PRESENCE',
      tagline: 'Discovery · Understanding · Trust',
      description:
        'A professional online presence designed to make your business easier to discover, understand, and trust.',
      icon: Globe,
      image: IMAGES.webDesignVisual,
      accentColor: 'text-blue-500',
      badgeColor: 'bg-blue-600',
      keyPoints: [
        'Responsive layout across desktops, tablets, and mobile smartphones',
        'Clean typography and WCAG AA contrast for effortless legibility',
        'Structured lead inquiry paths to capture potential customer intent',
        'Zero clutter or superfluous scripts for rapid page loads',
      ],
      deliverable: 'Custom Web Experience',
    },
    {
      id: 1,
      number: 'FEATURE 02',
      title: 'BRAND SYSTEM',
      tagline: 'Recognition · Consistency · Identity',
      description:
        'A consistent visual identity that helps customers recognize your business across digital touchpoints.',
      icon: Palette,
      image: IMAGES.brandSystemVisual,
      accentColor: 'text-purple-500',
      badgeColor: 'bg-purple-600',
      keyPoints: [
        'Curated color system with primary, structural, and accent allocations',
        'Distinctive display typography paired with readable body styles',
        'SVG vector wordmarks and favicon assets ready for production',
        'Usage rules for web, social headers, invoices, and presentation decks',
      ],
      deliverable: 'Complete Brand Manual',
    },
    {
      id: 2,
      number: 'FEATURE 03',
      title: 'DIGITAL GROWTH',
      tagline: 'Visibility · Engagement · Inquiries',
      description:
        'Strategic digital activities designed to improve visibility, engagement, and customer communication.',
      icon: TrendingUp,
      image: IMAGES.campaignSocialVisual,
      accentColor: 'text-sky-500',
      badgeColor: 'bg-sky-600',
      keyPoints: [
        'Focused social media templates aligned with brand guidelines',
        'Direct email marketing copy and promotional layout mockups',
        'Clear customer conversion pathways from discovery to consultation',
        'Sustainable posting cadences without marketing fatigue',
      ],
      deliverable: 'Marketing Campaign Blueprint',
    },
  ];

  const current = features[activeFeature];
  const IconComponent = current.icon;

  return (
    <section id="features" className="py-24 border-t border-sky-400/20 bg-[#05133d] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-300 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>02 / FEATURES</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white font-display">
            WHAT DIGIFY CAN DO FOR YOUR BUSINESS
          </h2>
          <p className="text-base sm:text-lg text-sky-100/90 leading-relaxed pt-1">
            Explore our core solutions designed to establish, elevate, and expand your business online.
          </p>
        </div>

        {/* Feature Interactive Grid & Visual Preview Canvas */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Feature Selector (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {features.map((feat) => {
              const FeatIcon = feat.icon;
              const isActive = activeFeature === feat.id;

              return (
                <button
                  key={feat.number}
                  onClick={() => setActiveFeature(feat.id)}
                  className={`w-full text-left p-6 rounded-2xl transition-all duration-300 border cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                    isActive
                      ? 'bg-white text-slate-900 border-white shadow-2xl scale-[1.02] ring-2 ring-cyan-400/40'
                      : 'bg-blue-950/40 text-white border-white/10 hover:border-sky-400/40 hover:bg-blue-900/40'
                  }`}
                  aria-pressed={isActive}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2.5 rounded-xl border transition-colors ${
                        isActive
                          ? 'bg-blue-600 text-white border-blue-500'
                          : 'bg-white/10 text-cyan-300 border-white/15'
                      }`}
                    >
                      <FeatIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <span
                        className={`text-xs font-mono font-bold uppercase tracking-wider block ${
                          isActive ? 'text-blue-600' : 'text-cyan-300'
                        }`}
                      >
                        {feat.number}
                      </span>
                      <h3
                        className={`text-xl font-black font-display ${
                          isActive ? 'text-slate-900' : 'text-white'
                        }`}
                      >
                        {feat.title}
                      </h3>
                    </div>
                  </div>

                  <p
                    className={`mt-3 text-sm leading-relaxed ${
                      isActive ? 'text-slate-600' : 'text-sky-100/80'
                    }`}
                  >
                    {feat.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100/20 text-xs">
                    <span className={isActive ? 'text-slate-500 font-semibold' : 'text-sky-300/80'}>
                      {feat.tagline}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Visual Preview Canvas (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white text-slate-900 border border-slate-200 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              
              {/* Preview Header */}
              <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase text-blue-600 font-bold tracking-wider">
                    {current.number}
                  </span>
                  <h4 className="text-2xl font-black text-slate-900 font-display">
                    {current.title}
                  </h4>
                </div>
              </div>

              {/* Dynamic Image Canvas */}
              <div className="mt-6 relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900 border border-slate-200 shadow-md group">
                <img
                  src={current.image}
                  alt={`${current.title} visual preview for DIGIFY`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Key Deliverables Checklist */}
              <div className="mt-6 space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
                  WHAT IS INCLUDED
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {current.keyPoints.map((point) => (
                    <div
                      key={point}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 font-medium"
                    >
                      <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5 stroke-[2.5]" />
                      <span className="leading-snug">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Trigger */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500">
                  Deliverable: <span className="text-slate-900 font-bold">{current.deliverable}</span>
                </div>
                <button
                  onClick={() => onSelectFeatureAction(current.title)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-xs hover:opacity-95 transition-opacity shadow-lg shadow-blue-600/30 cursor-pointer"
                >
                  <span>Inquire About {current.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
