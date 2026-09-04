'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield } from 'lucide-react';
import { ENTERPRISE_INFO } from '@/data/products';
import KineticCenterBuild from '@/components/smoothui/components/kinetic-center-build';
import GradientWaves from './GradientWaves';

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
  const { scrollY } = useScroll();

  // Scroll storytelling transitions:
  // scrollY = 0 -> 60px: ONLY waves background visible!
  // scrollY = 60px -> 500px: Ship takes more scroll & time sailing from LEFT to RIGHT into center!
  // scrollY = 500px -> 720px: Ship arrives in center, THEN after that the main component (headline & subheading) appears!
  // scrollY = 720px -> 1050px: Resting showcase with ship in center!
  // scrollY = 1050px -> 1450px: Main component fades away as ship embarks to the main website!
  const heroContentOpacity = useTransform(scrollY, [500, 720, 1050, 1450], [0, 1, 1, 0]);
  const heroContentY = useTransform(scrollY, [500, 720, 1050, 1450], [30, 0, 0, -30]);
  const heroContentScale = useTransform(scrollY, [500, 720, 1050, 1450], [0.96, 1, 1, 0.96]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full min-h-[260vh]"
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
          #hero-ship-anchor {
            width: ${HERO_CONFIG.ship.desktopWidth}px;
            height: ${HERO_CONFIG.ship.desktopHeight}px;
          }
          @media (max-width: 1024px) {
            #hero-ship-anchor {
              width: ${HERO_CONFIG.ship.tabletWidth}px;
              height: ${HERO_CONFIG.ship.tabletHeight}px;
            }
          }
          @media (max-width: 640px) {
            #hero-ship-anchor {
              width: ${HERO_CONFIG.ship.mobileWidth}px;
              height: ${HERO_CONFIG.ship.mobileHeight}px;
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

        {/* 3D Raymarched Ocean Waves Background - Visible on load and throughout sequence */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
          <GradientWaves
            horizonColor="#00a5ff"
            waveColor="#008eff"
            crestColor="#FFFFFF"
            speed={0.4}
            amplitude={3.25}
            waveScale={0.6}
            waveRatio={0.9}
            swell={35}
            turbulence={20}
            tilt={1.11}
            zoom={1}
            height={5.5}
            fogDepth={15}
            detail="medium"
            brightness={1}
            opacity={1}
            mouseInteraction
            parallaxStrength={0.5}
            grain
            grainIntensity={0.05}
          />
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

          {/* Center: Ocean Ship Position Anchor */}
          <div
            style={{ marginBottom: `${HERO_CONFIG.ship.marginBottom}px` }}
            className="relative w-full flex justify-center items-center overflow-visible my-2"
          >
            <div
              id="hero-ship-anchor"
              className="relative flex items-center justify-center pointer-events-none"
            />
          </div>

          {/* Subheading Below the Ship */}
          <p className="hero-subheading font-normal text-slate-200/90 text-center mx-auto drop-shadow-md z-30 px-4">
            {HERO_CONFIG.subheading.text}
          </p>
        </motion.div>

        {/* Organic Ocean Wave Curve Divider (Seamless boundary into About section) */}
        <div className="absolute -bottom-px left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative block w-full h-16 sm:h-20 md:h-28 lg:h-32 text-[#FAF9F6]"
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
            {/* Layer 3: White foam crest line */}
            <path
              d="M0,82 C240,124 500,44 760,88 C1020,132 1240,58 1440,92"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeOpacity="0.8"
              fill="none"
            />
            {/* Layer 4: Solid foreground wave connecting directly into About section background */}
            <path
              d="M0,84 C240,126 500,46 760,90 C1020,134 1240,60 1440,94 L1440,120 L0,120 Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
