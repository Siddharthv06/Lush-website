'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Anchor, Navigation, PackageCheck } from 'lucide-react';
import { HERO_CONFIG } from './HeroSection';

export default function NavFlyingShip() {
  const dockRef = useRef<HTMLDivElement>(null);
  const [offsets, setOffsets] = useState({
    heroX: 720,
    heroY: 280,
    dockScale: 0.12,
    ready: false,
  });
  const [isHovered, setIsHovered] = useState(false);
  const [hornBlasts, setHornBlasts] = useState<number[]>([]);

  // Track window scroll (Lenis smoothly drives scrollY with luxury momentum)
  const { scrollY } = useScroll();

  /**
   * =========================================================================
   * 🌊 CINEMATIC SCROLL STORYTELLING
   * Phase 0 (0 -> 60px): Pure ocean waves only. Nothing else visible.
   * Phase 1 (60 -> 500px): Ship sails slowly across ocean from LEFT to RIGHT into center.
   * Phase 2 (500 -> 1050px): Ship rests in center, main headline & subheading appear.
   * Phase 3 (1050 -> 1550px): Ship sets sail & takes user to the main website navbar dock.
   * =========================================================================
   */
  const rawEmerge = useTransform(scrollY, [60, 500], [0, 1]);
  const smoothEmerge = useSpring(rawEmerge, {
    stiffness: 60,
    damping: 24,
    mass: 0.7,
  });

  const rawVoyage = useTransform(scrollY, [1050, 1550], [0, 1]);
  const smoothVoyage = useSpring(rawVoyage, {
    stiffness: 75,
    damping: 26,
    mass: 0.5,
  });

  // Measure dynamic hero coordinates on mount & resize
  useEffect(() => {
    const measure = () => {
      const heroAnchor = document.getElementById('hero-ship-anchor');
      const dock = dockRef.current;
      if (!heroAnchor || !dock) return;

      const heroRect = heroAnchor.getBoundingClientRect();
      const dockRect = dock.getBoundingClientRect();
      const currentScroll = window.scrollY;

      const isMobile = window.innerWidth < 640;
      const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
      const shipWidth = isMobile
        ? HERO_CONFIG.ship.mobileWidth
        : isTablet
          ? HERO_CONFIG.ship.tabletWidth
          : HERO_CONFIG.ship.desktopWidth;
      const shipHeight = isMobile
        ? HERO_CONFIG.ship.mobileHeight
        : isTablet
          ? HERO_CONFIG.ship.tabletHeight
          : HERO_CONFIG.ship.desktopHeight;

      // Direct X and Y position offsets from HERO_CONFIG (works with either property name)
      const shipXOffset =
        HERO_CONFIG.ship.xPosition !== undefined && HERO_CONFIG.ship.xPosition !== 0
          ? HERO_CONFIG.ship.xPosition
          : (HERO_CONFIG.ship.horizontalOffset ?? 0);
      const shipYOffset =
        HERO_CONFIG.ship.yPosition !== undefined && HERO_CONFIG.ship.yPosition !== 0
          ? HERO_CONFIG.ship.yPosition
          : (HERO_CONFIG.ship.verticalOffset ?? 0);

      // Exact center-to-center delta between Hero Anchor and Navbar Dock
      const heroCenterX = heroRect.left + heroRect.width / 2;
      const heroCenterY = heroRect.top + heroRect.height / 2;
      const dockCenterX = dockRect.left + dockRect.width / 2;
      const dockCenterY = dockRect.top + dockRect.height / 2;

      const targetHeroX = heroCenterX - dockCenterX + shipXOffset;
      const targetHeroY = heroCenterY - dockCenterY + shipYOffset;
      const targetDockScale = Math.max(0.12, (dockRect.width * 0.95) / shipWidth);

      setOffsets({
        heroX: targetHeroX,
        heroY: targetHeroY,
        dockScale: targetDockScale,
        ready: true,
      });
    };

    measure();
    const t1 = setTimeout(measure, 120);
    const t2 = setTimeout(measure, 500);

    window.addEventListener('resize', measure);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', measure);
    };
  }, [
    HERO_CONFIG.ship.xPosition,
    HERO_CONFIG.ship.yPosition,
    HERO_CONFIG.ship.horizontalOffset,
    HERO_CONFIG.ship.verticalOffset,
    HERO_CONFIG.ship.desktopWidth,
    HERO_CONFIG.ship.desktopHeight,
    HERO_CONFIG.ship.tabletWidth,
    HERO_CONFIG.ship.tabletHeight,
    HERO_CONFIG.ship.mobileWidth,
    HERO_CONFIG.ship.mobileHeight,
  ]);

  // Opacity: 0 on initial page load (only waves background visible!)
  // Emerges smoothly on initial scroll (60px -> 220px)
  const shipOpacity = useTransform(scrollY, [60, 220], [0, 1]);

  // X Coordinate:
  // 1st scroll: Comes sailing in from the LEFT (offsets.heroX - 850) to the RIGHT into center (offsets.heroX)
  // 2nd scroll: Sails from center (offsets.heroX) into the main website navbar dock (0)
  const shipX = useTransform([smoothEmerge, smoothVoyage], ([em, voy]) => {
    const e = em as number;
    const v = voy as number;
    if (v <= 0.001) {
      return offsets.heroX - (1 - e) * 850;
    }
    return (1 - v) * offsets.heroX;
  });

  // Y Coordinate:
  // 1st scroll: Cruising smoothly at sea level (offsets.heroY)
  // 2nd scroll: Glides up from hero center (offsets.heroY) into navbar dock (0)
  const shipY = useTransform([smoothEmerge, smoothVoyage], ([em, voy]) => {
    const e = em as number;
    const v = voy as number;
    if (v <= 0.001) {
      return offsets.heroY + (1 - e) * 12;
    }
    return (1 - v) * offsets.heroY;
  });

  // Scale: Expands from 0.85 -> 1.0 as it sails in, then scales down to navbar dock scale
  const shipScale = useTransform([smoothEmerge, smoothVoyage], ([em, voy]) => {
    const e = em as number;
    const v = voy as number;
    if (v <= 0.001) {
      return 0.85 + e * 0.15;
    }
    return 1.0 - v * (1.0 - offsets.dockScale);
  });

  // Pitch dynamic (subtle forward tilt riding the waves left-to-right)
  const shipRotate = useTransform([smoothEmerge, smoothVoyage], ([em, voy]) => {
    const e = em as number;
    const v = voy as number;
    if (v <= 0.001) {
      return (1 - e) * -1.5;
    }
    return (1 - v) * 1.0;
  });

  // Water Wake: Sparks up as ship surfaces, then fades out as it takes flight into navbar dock
  const wakeOpacity = useTransform([smoothEmerge, smoothVoyage], ([em, voy]) => {
    const e = em as number;
    const v = voy as number;
    if (v <= 0.001) {
      return e * 0.9;
    }
    return Math.max(0, (1 - v * 2) * 0.9);
  });

  // Horn puff on click
  const triggerHorn = (e: React.MouseEvent) => {
    e.stopPropagation();
    const id = Date.now();
    setHornBlasts((prev) => [...prev.slice(-1), id]);
    setTimeout(() => {
      setHornBlasts((prev) => prev.filter((item) => item !== id));
    }, 1800);
  };

  return (
    <div
      ref={dockRef}
      id="navbar-ship-dock"
      className="relative w-20 sm:w-24 md:w-28 h-7 sm:h-8 flex items-center justify-center shrink-0 select-none pointer-events-auto"
      title="MV LUSH ENTERPRISE (Click for horn)"
    >
      {/* Flying Vessel Canvas Layer */}
      <motion.div
        style={{
          x: shipX,
          y: shipY,
          scale: shipScale,
          rotate: shipRotate,
          width: `${HERO_CONFIG.ship.desktopWidth}px`,
          height: `${HERO_CONFIG.ship.desktopHeight}px`,
          opacity: shipOpacity,
          transformOrigin: 'center center',
          willChange: 'transform',
        }}
        className="absolute flex items-center justify-center cursor-pointer pointer-events-auto"
        onClick={triggerHorn}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* TELEMETRY HUD TOOLTIP ON HOVER (Shown at hero level) */}
        <AnimatePresence>
          {isHovered && typeof window !== 'undefined' && window.scrollY > 80 && window.scrollY < 420 && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.94 }}
              animate={{ opacity: 1, y: -20, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.94 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="absolute -top-12 left-1/2 -translate-x-1/2 z-40 pointer-events-none hidden sm:block select-none"
            >
              <div className="bg-slate-950/90 backdrop-blur-md border border-white/20 text-white rounded-xl px-4 py-2 shadow-2xl flex items-center space-x-3 whitespace-nowrap text-xs">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <div className="flex items-center space-x-1.5 font-bold text-amber-300">
                  <Anchor className="w-3.5 h-3.5" />
                  <span>MV LUSH ENTERPRISE</span>
                </div>
                <span className="text-white/40">•</span>
                <div className="flex items-center space-x-1 text-white/90">
                  <Navigation className="w-3 h-3 text-sky-400" />
                  <span>Mtwara ➔ Global Ports</span>
                </div>
                <span className="text-white/40">•</span>
                <div className="flex items-center space-x-1 text-emerald-300 font-medium">
                  <PackageCheck className="w-3.5 h-3.5" />
                  <span>Raw Cashews & Pulses</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ocean Wave Buoyancy Floating Layer */}
        <motion.div
          animate={{
            y: [-3.5, 4.5, -3.5],
            rotate: [-0.85, 0.95, -0.85],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* Steam Horn Puff Animation */}
          {hornBlasts.map((id) => (
            <motion.div
              key={id}
              className="absolute -top-6 left-[18%] pointer-events-none z-30 flex flex-col items-center"
              initial={{ opacity: 1, y: 0, scale: 0.6 }}
              animate={{ opacity: 0, y: -35, scale: 1.8 }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-full px-2 py-0.5 text-slate-900 font-black text-[10px] shadow-md">
                TOOT!
              </div>
            </motion.div>
          ))}

          {/* Detailed Cargo Vessel SVG (GPU accelerated, zero heavy filters) */}
          <svg
            viewBox="0 0 680 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto overflow-visible pointer-events-none drop-shadow-[0_12px_24px_rgba(0,0,0,0.4)]"
          >
            <defs>
              <linearGradient id="vesselHullDarkGrad" x1="0" y1="120" x2="600" y2="160" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0B131E" />
                <stop offset="35%" stopColor="#132337" />
                <stop offset="70%" stopColor="#182E47" />
                <stop offset="100%" stopColor="#0C1624" />
              </linearGradient>

              <linearGradient id="vesselHullWaterlineGrad" x1="0" y1="156" x2="0" y2="185" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#8A1C14" />
                <stop offset="40%" stopColor="#A8281E" />
                <stop offset="100%" stopColor="#5B100B" />
              </linearGradient>

              <linearGradient id="vesselWaterSubmergeMask" x1="0" y1="140" x2="0" y2="195" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="65%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="90%" stopColor="#ffffff" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>

              <mask id="vesselHullBlendMask">
                <rect x="0" y="0" width="680" height="240" fill="url(#vesselWaterSubmergeMask)" />
              </mask>

              <linearGradient id="vesselSuperstructureGrad" x1="120" y1="35" x2="200" y2="135" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#E2E8F0" />
                <stop offset="100%" stopColor="#CBD5E1" />
              </linearGradient>

              <linearGradient id="vesselFunnelGrad" x1="105" y1="35" x2="135" y2="85" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0F172A" />
                <stop offset="50%" stopColor="#1E293B" />
                <stop offset="100%" stopColor="#090D16" />
              </linearGradient>

              <linearGradient id="vesselWakeGrad" x1="60" y1="168" x2="660" y2="168" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="15%" stopColor="#E0F2FE" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#BAE6FD" stopOpacity="0.6" />
                <stop offset="85%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#E0F2FE" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="vesselBowSprayGrad" x1="560" y1="150" x2="650" y2="185" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="60%" stopColor="#7DD3FC" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Hull & Superstructure Group */}
            <g mask="url(#vesselHullBlendMask)">
              {/* Funnel & Animated Smoke */}
              <motion.circle
                cx="120"
                cy="25"
                r="4"
                fill="#ffffff"
                opacity="0.25"
                animate={{
                  cy: [25, 4],
                  cx: [120, 95],
                  r: [4, 15],
                  opacity: [0.35, 0],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
              <polygon points="112,38 128,38 132,82 110,82" fill="url(#vesselFunnelGrad)" />
              <polygon points="113,50 129,50 130,58 112,58" fill="#13543A" />
              <polygon points="112,58 130,58 131,64 111,64" fill="#C59B27" />
              <ellipse cx="120" cy="38" rx="8" ry="2.5" fill="#020617" />

              {/* Radar Mast */}
              <line x1="162" y1="18" x2="162" y2="70" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="152" y1="36" x2="172" y2="36" stroke="#475569" strokeWidth="1.8" />
              <line x1="156" y1="48" x2="168" y2="48" stroke="#475569" strokeWidth="1.8" />
              <circle cx="162" cy="16" r="2.5" fill="#EF4444" />

              {/* Bridge Superstructure */}
              <polygon points="95,152 95,95 188,95 188,152" fill="url(#vesselSuperstructureGrad)" stroke="#94A3B8" strokeWidth="0.5" />
              <polygon points="132,95 132,68 186,68 186,95" fill="url(#vesselSuperstructureGrad)" stroke="#94A3B8" strokeWidth="0.5" />
              <polygon points="130,68 126,52 192,52 188,68" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="0.8" />
              <rect x="136" y="56" width="48" height="7" rx="1.5" fill="#FEF08A" opacity="0.95" />
              <line x1="144" y1="56" x2="144" y2="63" stroke="#0F172A" strokeWidth="1" />
              <line x1="152" y1="56" x2="152" y2="63" stroke="#0F172A" strokeWidth="1" />
              <line x1="160" y1="56" x2="160" y2="63" stroke="#0F172A" strokeWidth="1" />
              <line x1="168" y1="56" x2="168" y2="63" stroke="#0F172A" strokeWidth="1" />

              {/* Cargo Containers Stacks */}
              <g id="vesselCargo">
                {/* Tier 1 (Bottom) */}
                <rect x="200" y="126" width="58" height="26" rx="1.5" fill="#13543A" stroke="#0C3524" strokeWidth="0.8" />
                <rect x="262" y="126" width="60" height="26" rx="1.5" fill="#C59B27" stroke="#927014" strokeWidth="0.8" />
                <rect x="326" y="126" width="62" height="26" rx="1.5" fill="#1E3A8A" stroke="#172554" strokeWidth="0.8" />
                <rect x="392" y="126" width="60" height="26" rx="1.5" fill="#B91C1C" stroke="#7F1D1D" strokeWidth="0.8" />
                <rect x="456" y="126" width="60" height="26" rx="1.5" fill="#0F766E" stroke="#134E4A" strokeWidth="0.8" />
                <rect x="520" y="126" width="46" height="26" rx="1.5" fill="#334155" stroke="#1E293B" strokeWidth="0.8" />

                {/* Tier 2 (Middle) */}
                <rect x="204" y="98" width="54" height="26" rx="1.5" fill="#D97706" stroke="#92400E" strokeWidth="0.8" />
                <rect x="262" y="98" width="60" height="26" rx="1.5" fill="#15803D" stroke="#14532D" strokeWidth="0.8" />
                <rect x="326" y="98" width="62" height="26" rx="1.5" fill="#0284C7" stroke="#0369A1" strokeWidth="0.8" />
                <rect x="392" y="98" width="60" height="26" rx="1.5" fill="#E11D48" stroke="#9F1239" strokeWidth="0.8" />
                <rect x="456" y="98" width="58" height="26" rx="1.5" fill="#C59B27" stroke="#927014" strokeWidth="0.8" />

                {/* Tier 3 (Top) */}
                <rect x="266" y="70" width="56" height="26" rx="1.5" fill="#047857" stroke="#064E3B" strokeWidth="0.8" />
                <rect x="326" y="70" width="62" height="26" rx="1.5" fill="#CA8A04" stroke="#854D0E" strokeWidth="0.8" />
                <rect x="392" y="70" width="58" height="26" rx="1.5" fill="#0284C7" stroke="#0369A1" strokeWidth="0.8" />

                {/* Cranes */}
                <line x1="324" y1="62" x2="324" y2="152" stroke="#64748B" strokeWidth="2.5" />
                <line x1="310" y1="62" x2="338" y2="62" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
                <line x1="454" y1="62" x2="454" y2="152" stroke="#64748B" strokeWidth="2.5" />
                <line x1="440" y1="62" x2="468" y2="62" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
              </g>

              {/* Main Hull */}
              <path d="M62 148 L584 148 Q612 150 634 154 L612 168 L572 168 L76 168 Q66 160 62 148 Z" fill="url(#vesselHullDarkGrad)" />
              <path d="M76 166 L572 166 L612 166 Q626 174 594 186 L530 188 L108 188 Q84 182 76 166 Z" fill="url(#vesselHullWaterlineGrad)" />
              <line x1="68" y1="166" x2="612" y2="166" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.9" />

              {/* Vessel Name Stamp */}
              <text x="500" y="160" fill="#FDE047" fontSize="8" fontFamily="monospace" fontWeight="bold" letterSpacing="1.5" opacity="0.95">
                LUSH ENTERPRISE
              </text>

              {/* Tanzanian Stern Flag */}
              <g transform="translate(64, 134)">
                <line x1="0" y1="0" x2="0" y2="18" stroke="#94A3B8" strokeWidth="1.2" />
                <path d="M0 0 Q6 2 12 0 Q18 -2 24 1 L24 9 Q18 7 12 9 Q6 11 0 9 Z" fill="#13543A" />
                <line x1="0" y1="9" x2="24" y2="1" stroke="#C59B27" strokeWidth="1.5" />
              </g>
            </g>

            {/* Ocean Waterline Wake & Foam (Fades out when airborne/docked) */}
            <motion.g style={{ opacity: wakeOpacity }}>
              <path d="M10 178 Q45 174 95 176 Q150 177 220 175" stroke="url(#vesselWakeGrad)" strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M80 172 Q180 174 320 171 Q440 173 560 170 Q595 168 624 172" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />
              <path d="M578 174 Q612 168 642 162 Q628 174 610 178 Q648 182 662 176" stroke="url(#vesselBowSprayGrad)" strokeWidth="4" strokeLinecap="round" fill="none" />
            </motion.g>
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
