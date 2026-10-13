import React from 'react';
import { ArrowRight, Check, Tag, Sparkles } from 'lucide-react';
import { IMAGES } from '../assets/images';

export interface ServiceItem {
  id: number;
  name: string;
  category: string;
  description: string;
  price: string;
  availability: string;
  deliverables?: string[];
  badge?: string;
  image?: string;
}

interface ServicesProps {
  services: ServiceItem[];
  onSelectService: (serviceName: string) => void;
  onClaimStarterPackage: () => void;
}

export const Services: React.FC<ServicesProps> = ({
  services,
  onSelectService,
  onClaimStarterPackage,
}) => {
  const getServiceImage = (id: number) => {
    switch (id) {
      case 1:
        return IMAGES.webDesignVisual;
      case 2:
        return IMAGES.brandSystemVisual;
      case 3:
        return IMAGES.campaignSocialVisual;
      case 4:
      default:
        return IMAGES.heroWorkspace;
    }
  };

  return (
    <section id="services" className="py-24 border-t border-sky-400/20 bg-gradient-to-b from-[#06184a] via-[#092265] to-[#051540] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-3 max-w-3xl pb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-300 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DIGITAL SERVICES</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white font-display">
            SERVICES
          </h2>
          <p className="text-base sm:text-lg text-sky-100/90 leading-relaxed">
            All core DIGIFY digital offerings displayed together. Built to give emerging and growing businesses a professional, credible digital presence.
          </p>
        </div>

        {/* All Services Displayed Simultaneously in a Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const isStarter = service.name.includes('Starter Package');
            const serviceImg = getServiceImage(service.id);

            return (
              <div
                key={service.id}
                className={`group rounded-3xl bg-white text-slate-900 border transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-2xl ${
                  isStarter
                    ? 'border-indigo-400 ring-4 ring-cyan-400/40 relative'
                    : 'border-slate-200 hover:border-blue-400'
                }`}
              >
                {/* Visual Header */}
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                  <img
                    src={serviceImg}
                    alt={service.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex items-center">
                    <span className="text-xs font-mono uppercase tracking-wider text-white bg-blue-600/90 px-3 py-1 rounded-full backdrop-blur-md font-bold shadow-sm">
                      0{index + 1} · {service.category}
                    </span>
                  </div>

                  {isStarter && (
                    <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-black shadow-lg">
                      <Tag className="w-3.5 h-3.5 text-cyan-300" />
                      <span>FEATURED OFFER · 20% OFF</span>
                    </div>
                  )}
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
                      {service.name}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      {service.description}
                    </p>
                  </div>

                  {/* Key Deliverables / Inclusions */}
                  {service.deliverables && (
                    <div className="space-y-2.5 pt-2">
                      <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                        KEY OFFERINGS & INCLUSIONS
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
                        {service.deliverables.map((item) => (
                          <div key={item} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                            <Check className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 stroke-[2.5]" />
                            <span className="truncate">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Price & CTA Action Bar */}
                  <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="text-[11px] font-mono text-slate-400 uppercase font-bold">
                        PRICING TIER
                      </div>
                      <div className="text-lg font-black text-slate-900 font-display">
                        {service.price}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      {isStarter ? (
                        <button
                          onClick={onClaimStarterPackage}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-xs hover:opacity-90 transition-opacity shadow-lg shadow-blue-600/30 cursor-pointer"
                        >
                          <span>Claim 20% Offer</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => onSelectService(service.name)}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors shadow-md cursor-pointer"
                        >
                          <span>Inquire Now</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
