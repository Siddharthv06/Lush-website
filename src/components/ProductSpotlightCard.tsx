"use client";

/**
 * @description Product Spotlight Card with aurora ambient glow, magnetic 3D tilt, shimmer sweep, and focus-dim sibling effects.
 * Inspired by KokonutUI Spotlight & tailored for Lush Trade Corp Products.
 */

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Product } from "@/data/products";
import { 
  ArrowRight, 
  MapPin, 
  Leaf, 
  Trees, 
  Globe2, 
  Sparkles, 
  Award, 
  Coffee, 
  Droplets,
  LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Constants ──────────────────────────────────────────────────────────────────

const TILT_MAX = 8;
const TILT_SPRING = { stiffness: 280, damping: 26 } as const;
const GLOW_SPRING = { stiffness: 180, damping: 22 } as const;

// ─── Thematic Palette per Product / Category ───────────────────────────────────

interface ProductTheme {
  color: string;
  icon: LucideIcon;
  badgeBg: string;
}

const THEME_MAP: Record<string, ProductTheme> = {
  rcn: {
    color: "#E8BF4C", // Lush Gold
    icon: Sparkles,
    badgeBg: "rgba(232, 191, 76, 0.15)",
  },
  "cashew-kernels": {
    color: "#F59E0B", // Cashew Amber
    icon: Award,
    badgeBg: "rgba(245, 158, 11, 0.15)",
  },
  pulses: {
    color: "#10B981", // Emerald Ag
    icon: Leaf,
    badgeBg: "rgba(16, 185, 129, 0.15)",
  },
  coffee: {
    color: "#D97706", // Roasted Coffee Bronze
    icon: Coffee,
    badgeBg: "rgba(217, 119, 6, 0.15)",
  },
  timber: {
    color: "#F97316", // Rich Teak Orange
    icon: Trees,
    badgeBg: "rgba(249, 115, 22, 0.15)",
  },
};

function getProductTheme(product: Product): ProductTheme {
  if (THEME_MAP[product.id]) {
    return THEME_MAP[product.id];
  }

  // Category fallback
  switch (product.category) {
    case "Timber":
      return { color: "#F97316", icon: Trees, badgeBg: "rgba(249, 115, 22, 0.15)" };
    case "Agro-Commodities":
    default:
      return { color: "#C59B27", icon: Leaf, badgeBg: "rgba(197, 155, 39, 0.15)" };
  }
}

// ─── Component Props ────────────────────────────────────────────────────────────

export interface ProductSpotlightCardProps {
  product: Product;
  dimmed: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onSelect: (product: Product) => void;
  className?: string;
}

export default function ProductSpotlightCard({
  product,
  dimmed,
  onHoverStart,
  onHoverEnd,
  onSelect,
  className,
}: ProductSpotlightCardProps) {
  const theme = getProductTheme(product);
  const CategoryIcon = theme.icon;
  const cardRef = useRef<HTMLDivElement>(null);

  // Normalized cursor coordinates (-0.5 to 0.5 relative to card center)
  const normX = useMotionValue(0.5);
  const normY = useMotionValue(0.5);

  const rawRotateX = useTransform(normY, [0, 1], [TILT_MAX, -TILT_MAX]);
  const rawRotateY = useTransform(normX, [0, 1], [-TILT_MAX, TILT_MAX]);

  const rotateX = useSpring(rawRotateX, TILT_SPRING);
  const rotateY = useSpring(rawRotateY, TILT_SPRING);
  const glowOpacity = useSpring(0, GLOW_SPRING);
  const rectRef = useRef<DOMRect | null>(null);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
    glowOpacity.set(1);
    onHoverStart();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = rectRef.current;
    if (!rect) return;
    normX.set((e.clientX - rect.left) / rect.width);
    normY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    normX.set(0.5);
    normY.set(0.5);
    glowOpacity.set(0);
    rectRef.current = null;
    onHoverEnd();
  };

  return (
    <motion.div
      ref={cardRef}
      animate={{
        scale: dimmed ? 0.96 : 1,
        opacity: dimmed ? 0.45 : 1,
      }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 950,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={() => onSelect(product)}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border text-left cursor-pointer",
        // Base dark enterprise styling with glass
        "bg-brand-dark/90 border-brand-emerald/30 shadow-xl",
        "transition-[border-color,box-shadow] duration-300",
        "hover:border-brand-gold/60 hover:shadow-card-hover",
        "h-full",
        className
      )}
    >
      {/* ─── Aurora Ambient Layers ─── */}
      {/* 1. Static accent tint (always visible) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl z-0"
        style={{
          background: `radial-gradient(ellipse at 25% 20%, ${theme.color}15, transparent 68%)`,
        }}
      />

      {/* 2. Dynamic Spring Glow (lights up on hover) */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl z-0"
        style={{
          opacity: glowOpacity,
          background: `radial-gradient(ellipse at 35% 25%, ${theme.color}35, transparent 65%)`,
        }}
      />

      {/* 3. Shimmer Sweep highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-[55%] -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[280%] z-20"
      />

      {/* ─── Card Visual Media ─── */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-800 rounded-t-2xl shrink-0 z-10">
        <Image
          src={product.image}
          alt={`Tanzania ${product.name} Exporter`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        
        {/* Soft bottom image gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
          {/* Category Pill with Icon */}
          <span
            className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-bold backdrop-blur-md border shadow-sm"
            style={{
              backgroundColor: "rgba(12, 53, 36, 0.85)",
              color: theme.color,
              borderColor: `${theme.color}40`,
            }}
          >
            <CategoryIcon className="w-3.5 h-3.5" style={{ color: theme.color }} />
            <span>{product.category}</span>
          </span>

          {/* MOQ / Season Tag if present */}
          {(product.moq || product.season) && (
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-black/60 backdrop-blur-md text-slate-300 border border-white/10 shadow-sm">
              {product.moq ? `MOQ: ${product.moq}` : product.season}
            </span>
          )}
        </div>
      </div>

      {/* ─── Card Body Content ─── */}
      <div className="relative z-10 p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Title with subtle color shift on hover */}
          <h3 
            className="text-lg font-bold text-white tracking-tight transition-colors duration-200 group-hover:text-brand-gold"
          >
            {product.name}
          </h3>

          {/* Tagline */}
          <p 
            className="text-xs font-semibold mt-1 tracking-wide"
            style={{ color: theme.color }}
          >
            {product.tagline}
          </p>

          {/* Short description */}
          <p className="text-slate-300 text-xs mt-2.5 line-clamp-2 leading-relaxed">
            {product.shortDesc}
          </p>
        </div>

        {/* Technical Highlight Badges */}
        <div className="space-y-2 pt-2 border-t border-white/10">
          {product.specs.slice(0, 2).map((spec, i) => (
            <div key={i} className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-medium">{spec.label}:</span>
              <span className="text-white font-bold bg-white/5 px-2 py-0.5 rounded border border-white/10">
                {spec.value}
              </span>
            </div>
          ))}
        </div>

        {/* Origins Tag if available */}
        {product.origins && product.origins.length > 0 && (
          <div className="flex items-center space-x-1.5 text-[11px] text-slate-400 pt-0.5">
            <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: theme.color }} />
            <span className="truncate">Origins: {product.origins.join(", ")}</span>
          </div>
        )}

        {/* Card Action Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
            className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-xl text-xs font-bold text-white transition-all duration-200 border group/btn shadow-sm"
            style={{
              backgroundColor: "rgba(12, 53, 36, 0.9)",
              borderColor: `${theme.color}40`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#13543A";
              e.currentTarget.style.borderColor = theme.color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(12, 53, 36, 0.9)";
              e.currentTarget.style.borderColor = `${theme.color}40`;
            }}
          >
            <span>View Specifications & Grades</span>
            <ArrowRight 
              className="w-3.5 h-3.5 ml-2 transition-transform duration-200 group-hover/btn:translate-x-1" 
              style={{ color: theme.color }} 
            />
          </button>
        </div>
      </div>

      {/* ─── Accent Bottom Line (expands on card hover) ─── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[2.5px] w-0 rounded-full transition-all duration-500 group-hover:w-full z-20 pointer-events-none"
        style={{
          background: `linear-gradient(to right, ${theme.color}, transparent)`,
        }}
      />
    </motion.div>
  );
}
