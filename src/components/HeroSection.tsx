'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield } from 'lucide-react';
import { ENTERPRISE_INFO } from '@/data/products';
import KineticCenterBuild from '@/components/smoothui/components/kinetic-center-build';
import ShipScroll from './ShipScroll';

/**
 * =========================================================================
 * ⚙️ HERO SECTION CONFIGURATION (All values in PX for instant editing)
 * Edit any number below and press Save (Ctrl+S) — changes apply instantly!
 * =========================================================================
 */
export const HERO_CONFIG = {
  // 1. Heading Typography
  heading: {
    desktopFontSize: 56,    // Desktop headline font size in px (e.g. 52 - 68)
    tabletFontSize: 42,     // Tablet headline font size in px
    mobileFontSize: 28,     // Mobile headline font size in px
    maxWidth: 960,          // Maximum width of headline text block in px
    marginBottom: 14,       // Space below heading (above ship) in px
  },

  // 2. Top Enterprise Eyebrow Badge
  badge: {
    fontSize: 11,           // Badge font size in px
    paddingX: 14,           // Horizontal padding in px
    paddingY: 5,            // Vertical padding in px
    marginBottom: 14,       // Space below badge (above heading) in px
  },

  // 3. Ocean Ship Dimensions & Positions (All in PX)
  ship: {
    xPosition: 0,           // Ship X offset in px (0 = perfectly centered, + shifts right, - shifts left)
    yPosition: 0,           // Ship Y offset in px (0 = centered between text & buttons, + shifts down, - shifts up)
    desktopWidth: 700,      // Ship width on desktop in px (e.g. 580 - 760)
    desktopHeight: 226,     // Ship height on desktop in px (width / 2.83)
    tabletWidth: 480,       // Ship width on tablets in px
    tabletHeight: 170,      // Ship height on tablets in px
    mobileWidth: 340,       // Ship width on mobile in px
    mobileHeight: 120,      // Ship height on mobile in px
    horizontalOffset: 0,    // (Alias for xPosition)
    verticalOffset: 0,      // (Alias for yPosition)
    marginBottom: 8,        // Space below ship (above subheading) in px
  },

  // 4. Subheading (Replaces buttons below the ship)
  subheading: {
    text: "Connecting Africa's farm-gate agricultural strength to the world — Exporting Grade-A Raw Cashews, Pulses, Arabica Coffee & Hardwood Timber across global maritime trade routes.",
    desktopFontSize: 17,    // Subheading font size on desktop in px
    tabletFontSize: 15,     // Subheading font size on tablet in px
    mobileFontSize: 13,     // Subheading font size on mobile in px
    maxWidth: 780,          // Maximum width of subheading text block in px
    marginTop: 6,           // Space above subheading (below ship) in px
    lineHeight: 1.6,        // Line height multiplier
  },

  // 5. Section Layout Spacing
  layout: {
    paddingTop: 80,         // Space from top navbar in px
    paddingBottom: 80,      // Space above bottom wave curve in px
    maxWidth: 1240,         // Maximum container width in px
  },
};

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'],
  });

  // Scrollytelling Tour progression:
  // 0% -> 4%: First frame shows clean with no text obstruction; user sees the initial vessel on the horizon
  // 4% -> 18%: As user scrolls, frames move and the home text slowly appears like an interactive tour
  // 18% -> 100%: Home text remains fully visible all the way while scrolling down to the About section
  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.04, 0.18, 1], [0, 0, 1, 1]);
  const heroContentY = useTransform(scrollYProgress, [0, 0.04, 0.18, 1], [35, 35, 0, 0]);
  const heroContentScale = useTransform(scrollYProgress, [0, 0.04, 0.18, 1], [0.96, 0.96, 1, 1]);



  // Bottom wave divider smoothly emerges at the very end to transition into About section
  const waveOpacity = useTransform(scrollYProgress, [0.94, 0.99], [0, 1]);
  const waveY = useTransform(scrollYProgress, [0.94, 0.99], [28, 0]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full min-h-[500vh] bg-[#060B12]"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Direct CSS injection so modifying HERO_CONFIG values instantly changes font size and ship size */}
        <style>{`
          #hero h1.hero-title {
            font-size: ${HERO_CONFIG.heading.desktopFontSize}px;
            max-width: ${HERO_CONFIG.heading.maxWidth}px;
            margin-bottom: ${HERO_CONFIG.heading.marginBottom}px;
          }
          @media (max-width: 1024px) {
            #hero h1.hero-title {
              font-size: ${HERO_CONFIG.heading.tabletFontSize}px;
            }
          }
          @media (max-width: 640px) {
            #hero h1.hero-title {
              font-size: ${HERO_CONFIG.heading.mobileFontSize}px;
            }
          }
          #hero p.hero-subheading {
            font-size: ${HERO_CONFIG.subheading.desktopFontSize}px;
            max-width: ${HERO_CONFIG.subheading.maxWidth}px;
            margin-top: ${HERO_CONFIG.subheading.marginTop}px;
            line-height: ${HERO_CONFIG.subheading.lineHeight};
          }
          @media (max-width: 1024px) {
            #hero p.hero-subheading {
              font-size: ${HERO_CONFIG.subheading.tabletFontSize}px;
            }
          }
          @media (max-width: 640px) {
            #hero p.hero-subheading {
              font-size: ${HERO_CONFIG.subheading.mobileFontSize}px;
            }
          }
        `}</style>

        {/* Cinematic Frame-by-Frame Ship Voyage Canvas Layer */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <ShipScroll scrollProgress={scrollYProgress} />
        </div>

        {/* Hero Content: Pure waves on load, emerges on scroll, fades as ship sails to main website */}
        <motion.div
          style={{
            maxWidth: `${HERO_CONFIG.layout.maxWidth}px`,
            opacity: heroContentOpacity,
            y: heroContentY,
            scale: heroContentScale,
          }}
          className="relative z-20 mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center select-none pointer-events-none"
        >
          {/* Top Enterprise Badge */}
          <div
            style={{
              fontSize: `${HERO_CONFIG.badge.fontSize}px`,
              paddingLeft: `${HERO_CONFIG.badge.paddingX}px`,
              paddingRight: `${HERO_CONFIG.badge.paddingX}px`,
              paddingTop: `${HERO_CONFIG.badge.paddingY}px`,
              paddingBottom: `${HERO_CONFIG.badge.paddingY}px`,
              marginBottom: `${HERO_CONFIG.badge.marginBottom}px`,
            }}
            className="inline-flex items-center space-x-2 rounded-full bg-black/40 backdrop-blur-md border border-white/25 text-white shadow-md select-none"
          >
            <Shield className="w-4 h-4 text-brand-gold" />
            <span className="font-bold text-white tracking-wide uppercase">
              Mtwara & Dar es Salaam • Enterprise Agro Exporter
            </span>
          </div>

          {/* Main H1 Title - Centered */}
          <h1 className="hero-title font-extrabold text-white tracking-tight leading-[1.12] drop-shadow-lg text-center mx-auto">
            <KineticCenterBuild
              align="center"
              phrases={["Connecting Africa's Agricultural Strength to the World"]}
              highlightWords={["Agricultural", "Strength"]}
              highlightClassName="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-200 to-white"
            />
          </h1>

          {/* Subheading */}
          <p className="hero-subheading font-normal text-slate-200/90 text-center mx-auto drop-shadow-md z-30 px-4">
            {HERO_CONFIG.subheading.text}
          </p>
        </motion.div>

        {/* Organic Ocean Wave Curve Divider (Seamless boundary into About section) */}
        <motion.div
          style={{ opacity: waveOpacity, y: waveY }}
          className="absolute -bottom-[2px] left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none transition-opacity duration-200 text-[#FAF9F6]"
        >
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative block w-full h-14 sm:h-18 md:h-24 lg:h-28"
            preserveAspectRatio="none"
          >
            {/* Foam crest line with subtle gold sheen */}
            <path
              d="M0,78 C240,120 500,40 760,84 C1020,128 1240,54 1440,88"
              stroke="rgba(197, 155, 39, 0.45)"
              strokeWidth="1.5"
              fill="none"
            />
            {/* Solid foreground wave connecting directly into About section background */}
            <path
              d="M0,80 C240,122 500,42 760,86 C1020,130 1240,56 1440,90 L1440,125 L0,125 Z"
              fill="currentColor"
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
