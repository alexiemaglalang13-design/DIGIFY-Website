import React from 'react';

interface DigifyLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const DigifyLogo: React.FC<DigifyLogoProps> = ({
  size = 'md',
  showSubtitle = true,
}) => {
  const iconSizes = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-18 h-18',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  const subSizes = {
    sm: 'text-[8px] tracking-wider',
    md: 'text-[10px] tracking-wider',
    lg: 'text-xs tracking-[0.18em]',
  };

  return (
    <div className="flex items-center gap-0 select-none">

      {/* DIGIFY LOGO */}
      <div
        className={`
          relative
          ${iconSizes[size]}
          flex-shrink-0
          overflow-hidden
        `}
      >
        <img
          src="/images/digify-logo.png"
          alt="DIGIFY Logo"
          className="
            absolute
            w-[210%]
            h-[210%]
            max-w-none
            object-contain
            left-[54%]
            top-[56%]
            -translate-x-1/2
            -translate-y-1/2
            drop-shadow-[0_0_8px_rgba(37,99,235,0.8)]
          "
        />
      </div>

      {/* BRAND NAME + TAGLINE */}
      <div className="flex flex-col justify-center">

        {/* DIGIFY */}
        <span
          className={`
            font-black
            font-display
            text-white
            tracking-wide
            leading-none
            ${textSizes[size]}
          `}
        >
          DIGIFY
        </span>

        {/* TAGLINE */}
        {showSubtitle && (
          <span
            className={`
              font-semibold
              uppercase
              text-sky-300
              font-display
              mt-1
              leading-none
              ${subSizes[size]}
            `}
          >
            DIGITAL SERVICES BUSINESS
          </span>
        )}

      </div>

    </div>
  );
};