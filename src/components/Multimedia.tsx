import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Info, Youtube, Video, Play } from 'lucide-react';

export const Multimedia: React.FC = () => {
  const [embedError, setEmbedError] = useState<boolean>(false);

  const youtubeVideoId = 'QsY8fnvMn6c';
  const videoTitle = 'Digital Marketing Services - Promo Video';
  const originalCreator = 'Om Vats';
  const uploadDate = 'March 3, 2020';
  const youtubeSourceUrl = 'https://youtu.be/QsY8fnvMn6c';
  const thumbnailUrl = `https://img.youtube.com/vi/${youtubeVideoId}/hqdefault.jpg`;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${youtubeVideoId}?rel=0&modestbranding=1`;

  return (
    <section id="video" className="py-24 border-t border-sky-400/20 bg-gradient-to-b from-[#06184a] via-[#092265] to-[#041238] text-white relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-3 max-w-3xl pb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-300 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EMBEDDED VIDEO SHOWCASE</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white font-display">
            Digital Marketing in Focus.
          </h2>
          <p className="text-base sm:text-lg text-sky-100/90 leading-relaxed">
            Watch this featured promo video on digital marketing services, showing how businesses can promote themselves and reach more customers online.
          </p>
        </div>

        {/* 2-Column Showcase: YouTube Showcase (Left) | Copyright & Credits (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Main: Embedded YouTube Showcase (8 Cols) */}
          <div className="lg:col-span-8 rounded-3xl bg-slate-950 border-2 border-white/20 shadow-2xl overflow-hidden group">
            
            {/* Top Showcase Status Bar */}
            <div className="p-3.5 bg-slate-900/90 border-b border-white/10 flex items-center text-xs text-slate-300 font-mono">
              <div className="flex items-center gap-2">
                <Youtube className="w-4 h-4 text-red-500" />
                <span className="font-bold text-white">YOUTUBE SHOWCASE</span>
              </div>
            </div>

            {/* Responsive 16:9 Video Container */}
            <div className="relative aspect-video w-full bg-slate-950">
              {embedError ? (
                /* Graceful Fallback if embed fails */
                <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                  <img
                    src={thumbnailUrl}
                    alt={videoTitle}
                    className="absolute inset-0 w-full h-full object-cover filter brightness-[0.45]"
                  />
                  <div className="relative z-10 max-w-md space-y-3">
                    <div className="w-14 h-14 rounded-full bg-red-600/90 text-white flex items-center justify-center mx-auto shadow-xl">
                      <Play className="w-7 h-7 ml-1 fill-white" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold text-white">{videoTitle}</h4>
                      <p className="text-xs text-slate-300 font-mono">Direct YouTube playback fallback</p>
                    </div>
                  </div>
                </div>
              ) : (
                <iframe
                  className="w-full h-full border-0"
                  src={embedUrl}
                  title={videoTitle}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  onError={() => setEmbedError(true)}
                />
              )}
            </div>

            {/* Video Caption Bar */}
            <div className="p-4 bg-slate-900/80 border-t border-white/10 flex items-center text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Video className="w-4 h-4 text-cyan-300 flex-shrink-0" />
                <span className="font-semibold text-white truncate">{videoTitle}</span>
              </div>
            </div>

          </div>

          {/* Right: Copyright & Credits (4 Cols) */}
          <div className="lg:col-span-4 rounded-3xl bg-white text-slate-900 border border-slate-200 p-6 sm:p-7 shadow-2xl space-y-6">
            
            <div className="space-y-1 pb-4 border-b border-slate-100">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-blue-600 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>LEGAL ATTRIBUTION</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-display text-slate-900">
                Copyright & Credits
              </h3>
            </div>

            {/* Structured Credit Rows */}
            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <span className="font-mono text-slate-400 uppercase font-bold text-[10px] block">
                  VIDEO TITLE
                </span>
                <p className="font-bold text-slate-900 leading-snug">
                  {videoTitle}
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-slate-400 uppercase font-bold text-[10px] block">
                  ORIGINAL CREATOR / CHANNEL
                </span>
                <p className="font-semibold text-slate-800">
                  {originalCreator}
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-slate-400 uppercase font-bold text-[10px] block">
                  UPLOAD DATE
                </span>
                <p className="font-medium text-slate-700 font-mono">
                  {uploadDate}
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-slate-400 uppercase font-bold text-[10px] block">
                  SOURCE PLATFORM
                </span>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                    <Youtube className="w-3.5 h-3.5 text-red-600" />
                    <span>YouTube Hosted Media</span>
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-slate-400 uppercase font-bold text-[10px] block">
                  SOURCE URL
                </span>
                <p className="font-mono text-slate-700 truncate block text-[11px] bg-slate-50 p-2 rounded-lg border border-slate-100">
                  {youtubeSourceUrl}
                </p>
              </div>
            </div>

            {/* Attribution Notice */}
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-blue-900">
                <Info className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                <span>Attribution & Usage Notice</span>
              </div>
              <p className="leading-relaxed text-[11px] text-slate-600">
                All copyright, trademarks, and audiovisual ownership belong to the original creator, Om Vats, and respective rights holders. This video is embedded through YouTube's official player for informational and promotional demonstration purposes. DIGIFY does not claim ownership of this video content.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
