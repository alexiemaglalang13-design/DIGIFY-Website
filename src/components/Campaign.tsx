import React, { useState } from 'react';

import {
  Share2,
  Mail,
  Heart,
  MessageSquare,
  Bookmark,
  ArrowRight,
  Sparkles,
  Radio,
} from 'lucide-react';

interface CampaignProps {
  onClaimOffer: () => void;
  onLearnMore: () => void;
  onCopyNotice: (text: string) => void;
}

export const Campaign: React.FC<CampaignProps> = ({
  onClaimOffer,
  onLearnMore,
  onCopyNotice: _onCopyNotice,
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  return (
    <section
      id="campaign"
      className="py-24 border-t border-sky-400/20 bg-gradient-to-b from-[#04133b] via-[#06184a] to-[#041238] text-white relative scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ==============================================================
            SECTION HEADER
           ============================================================== */}

        <div className="space-y-3 max-w-3xl pb-12">

          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-300 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTEGRATED MARKETING</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white font-display">
            CAMPAIGN
          </h2>

          <p className="text-base sm:text-lg text-sky-100/90 leading-relaxed">
            A cohesive cross-channel promotional campaign for the DIGIFY
            Starter Package—combining high-engagement social media outreach
            with direct email marketing.
          </p>

        </div>

        <div className="space-y-20">

          {/* ==============================================================
              PART 1: SOCIAL MEDIA CAMPAIGN
             ============================================================== */}

          <div className="space-y-8">

            {/* Section Heading */}

            <div className="space-y-1 pb-4 border-b border-sky-400/20">

              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold">
                <Share2 className="w-3.5 h-3.5" />
                <span>SOCIAL MEDIA CAMPAIGN</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
                Featured Social Media Campaign
              </h3>

              <p className="text-xs sm:text-sm text-sky-100/80">
                A high-impact social feed asset created to generate awareness
                and communicate the 20% Starter Package discount.
              </p>

            </div>


            {/* Social Media Content */}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

              {/* ==========================================================
                  SOCIAL MEDIA POST
                 ========================================================== */}

              <div className="lg:col-span-7 rounded-3xl bg-white text-slate-900 border border-slate-200 shadow-2xl overflow-hidden mx-auto w-full max-w-xl lg:max-w-none">

                {/* Account Header */}

                <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-100">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-sm shadow-md">
                      D
                    </div>

                    <div>

                      <div className="flex items-center gap-1.5 font-bold text-sm text-slate-900">

                        <span>
                          DIGIFY Digital Services Business
                        </span>

                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />

                      </div>

                      <div className="text-[11px] font-mono text-slate-400">
                        @digify
                      </div>

                    </div>

                  </div>

                  <span className="text-xs font-mono uppercase font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                    SPONSORED
                  </span>

                </div>


                {/* ========================================================
                    NEW SOCIAL MEDIA IMAGE
                   ======================================================== */}

                <div className="relative w-full bg-slate-950 flex items-center justify-center overflow-hidden">

                  <img
                    src="/images/digify-social-campaign.png"
                    alt="DIGIFY Social Media Campaign - Small Business. A Bigger Tomorrow."
                    className="w-full h-auto block"
                    loading="eager"
                  />

                </div>


                {/* CTA Bar */}

                <div className="p-3.5 bg-blue-50 border-y border-blue-100 flex items-center justify-between">

                  <span className="text-xs font-bold text-blue-950">
                    Let's Get Your Business Online!
                  </span>

                  <button
                    onClick={onClaimOffer}
                    className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-sm cursor-pointer whitespace-nowrap"
                  >
                    CLAIM 20% OFF
                  </button>

                </div>


                {/* Engagement Actions */}

                <div className="p-4 sm:p-5 space-y-3">

                  <div className="flex items-center justify-between text-slate-700">

                    <div className="flex items-center gap-4">

                      {/* Like */}

                      <button
                        onClick={() => setIsLiked(!isLiked)}
                        className="flex items-center gap-1.5 hover:text-rose-600 transition-colors cursor-pointer"
                        aria-label="Like post"
                      >

                        <Heart
                          className={`w-5 h-5 ${
                            isLiked
                              ? 'fill-rose-500 text-rose-500'
                              : 'text-slate-600'
                          }`}
                        />

                        <span className="text-xs font-bold">
                          {isLiked ? 'Liked' : 'Like'}
                        </span>

                      </button>


                      {/* Comment */}

                      <div className="flex items-center gap-1.5 text-slate-500">

                        <MessageSquare className="w-5 h-5" />

                        <span className="text-xs font-medium">
                          Comment
                        </span>

                      </div>


                      {/* Share */}

                      <div className="flex items-center gap-1.5 text-slate-500">

                        <Share2 className="w-5 h-5" />

                        <span className="text-xs font-medium">
                          Share
                        </span>

                      </div>

                    </div>

                    <Bookmark className="w-5 h-5 text-slate-400" />

                  </div>


                  {/* Caption */}

                  <div className="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-100 leading-relaxed">

                    <p>

                      <strong className="text-slate-900 font-bold">
                        digify
                      </strong>{' '}

                      Your business deserves to be seen online. Build your
                      online presence with our Digital Starter Packages
                      designed for small businesses and aspiring entrepreneurs.
                      Get 20% OFF your Digital Starter Package for a limited
                      time!

                    </p>

                    <p className="font-mono text-blue-600 text-[11px] font-medium">

                      #DigitalServices #WebDesign #SmallBusinessGrowth
                      #BrandIdentity #DIGIFY

                    </p>

                  </div>

                </div>

              </div>


              {/* ==========================================================
                  MULTI-CHANNEL PROMOTION
                 ========================================================== */}

              <div className="lg:col-span-5 space-y-5">

                <div className="p-6 sm:p-7 rounded-3xl bg-blue-900/35 border border-sky-400/25 backdrop-blur-md space-y-4">

                  <div className="flex items-center gap-2 text-cyan-300 font-mono font-bold text-xs uppercase">

                    <Radio className="w-4 h-4 text-cyan-300 animate-pulse" />

                    <span>
                      MULTI-CHANNEL PROMOTION
                    </span>

                  </div>


                  <h4 className="text-xl font-black font-display text-white">
                    Unified Cross-Channel Distribution
                  </h4>


                  <p className="text-xs sm:text-sm text-sky-100/90 leading-relaxed font-normal">
                    This campaign is strategically deployed across Facebook
                    and Instagram through targeted feed posts, Stories, and
                    paid sponsored placements to reach small business owners
                    and aspiring entrepreneurs.
                  </p>


                  <div className="space-y-2.5 pt-2 border-t border-white/10 text-xs">

                    {/* Campaign Objective */}

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">

                      <span className="text-slate-400 font-mono uppercase text-[10px] block">
                        CAMPAIGN OBJECTIVE
                      </span>

                      <strong className="text-white text-xs block">
                        Special Promotion – 20% OFF Digital Starter Package
                      </strong>

                    </div>


                    {/* Target Audience */}

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">

                      <span className="text-slate-400 font-mono uppercase text-[10px] block">
                        TARGET AUDIENCE
                      </span>

                      <span className="text-slate-200 text-xs block">
                        Small business owners and aspiring entrepreneurs,
                        ages 18–45, in the Philippines
                      </span>

                    </div>


                    {/* Platforms */}

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">

                      <span className="text-slate-400 font-mono uppercase text-[10px] block">
                        PLATFORMS
                      </span>

                      <strong className="text-cyan-300 font-mono text-xs block">
                        Facebook and Instagram
                      </strong>

                    </div>


                    {/* Success Metric */}

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">

                      <span className="text-slate-400 font-mono uppercase text-[10px] block">
                        SUCCESS METRIC
                      </span>

                      <strong className="text-white font-mono text-xs block">
                        Conversion Rate (website clicks and conversions)
                      </strong>

                    </div>


                    {/* Primary CTA */}

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">

                      <span className="text-slate-400 font-mono uppercase text-[10px] block">
                        PRIMARY CTA
                      </span>

                      <strong className="text-white font-mono text-xs block">
                        "Let's Get Your Business Online!"
                      </strong>

                    </div>

                  </div>


                  {/* Claim Button */}

                  <div className="pt-2">

                    <button
                      onClick={onClaimOffer}
                      className="w-full py-3 px-5 rounded-xl bg-white text-blue-950 font-bold text-xs hover:bg-sky-50 transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                    >

                      <span>
                        Claim 20% Starter Package
                      </span>

                      <ArrowRight className="w-4 h-4" />

                    </button>

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* ==============================================================
              PART 2: EMAIL MARKETING CAMPAIGN
             ============================================================== */}

          <div className="space-y-8 pt-10 border-t border-sky-400/20">

            {/* Email Section Header */}
            <div className="pb-4 border-b border-sky-400/20">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold">
                  <Mail className="w-3.5 h-3.5" />
                  <span>EMAIL MARKETING CAMPAIGN</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
                  Direct Email Outreach Mockup
                </h3>

                <div className="pt-1">
                  <span className="text-xs font-mono uppercase text-sky-200/80 font-bold block">
                    Subject Line:
                  </span>
                  <p className="text-sm sm:text-base font-bold text-white tracking-wide">
                    You’re Losing Customers by Staying Offline!
                  </p>
                </div>
              </div>
            </div>


            {/* ==========================================================
                CLEAN EMAIL PREVIEW
               ========================================================== */}

            <div className="w-full flex justify-center px-2 sm:px-6">

              <div className="w-full max-w-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden">

                <img
                  src="/images/email-marketing-full.png"
                  alt="DIGIFY Email Marketing Campaign"
                  className="w-full h-auto block"
                  loading="eager"
                />

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};