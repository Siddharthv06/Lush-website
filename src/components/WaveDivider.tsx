'use client';

import React from 'react';

interface WaveDividerProps {
  /** Target section background color that the wave flows into (e.g. '#FAF9F6', '#0f172a', '#061D15') */
  color: string;
  /** Whether to place at the 'bottom' (default) or 'top' of the section */
  position?: 'bottom' | 'top';
  /** Flip horizontally to create organic visual variety across sections */
  flip?: boolean;
  /** Custom height class (default: 'h-10 sm:h-14 md:h-18 lg:h-20') */
  heightClass?: string;
  /** Optional extra className */
  className?: string;
}

export default function WaveDivider({
  color,
  position = 'bottom',
  flip = false,
  heightClass = 'h-10 sm:h-14 md:h-18 lg:h-20',
  className = '',
}: WaveDividerProps) {
  const isTop = position === 'top';

  return (
    <div
      aria-hidden="true"
      className={`absolute left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none select-none ${
        isTop ? '-top-px rotate-180' : '-bottom-px'
      } ${className}`}
    >
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ color }}
        className={`relative block w-full ${heightClass} ${flip ? 'scale-x-[-1]' : ''}`}
        preserveAspectRatio="none"
      >
        {/* Layer 1: Ambient soft background swell */}
        <path
          d="M0,32 C220,78 440,12 660,52 C880,92 1100,28 1320,68 Q1380,78 1440,72 L1440,120 L0,120 Z"
          fill="currentColor"
          fillOpacity="0.25"
        />
        {/* Layer 2: Mid-swell wave */}
        <path
          d="M0,56 C260,105 500,28 760,72 C1020,116 1220,38 1440,78 L1440,120 L0,120 Z"
          fill="currentColor"
          fillOpacity="0.55"
        />
        {/* Layer 3: Foam crest line */}
        <path
          d="M0,82 C240,124 500,44 760,88 C1020,132 1240,58 1440,92"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeOpacity="0.8"
          fill="none"
        />
        {/* Layer 4: Solid foreground wave connecting directly into adjacent section background */}
        <path
          d="M0,84 C240,126 500,46 760,90 C1020,134 1240,60 1440,94 L1440,120 L0,120 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
