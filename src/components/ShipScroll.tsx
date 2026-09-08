'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { useScroll, useMotionValueEvent, MotionValue } from 'framer-motion';

interface ShipScrollProps {
  /** Optional scroll progress MotionValue from parent container */
  scrollProgress?: MotionValue<number>;
  /** Reference to the tall scroll container to track progress against */
  containerRef?: React.RefObject<HTMLElement | null>;
  className?: string;
  /** Whether to show the voyage progress indicator */
  showProgress?: boolean;
}

const TOTAL_FRAMES = 144;
const FRAME_ASPECT_RATIO = 3840 / 2160; // 16:9 native 4K frame resolution

/**
 * Returns the public URL for a given 0-indexed frame.
 * Frames are named ezgif-frame-001.jpg through ezgif-frame-144.jpg in /ship/ezgif-3897134f3d30b25b-jpg/
 */
function getFrameUrl(index: number): string {
  const frameNumber = String(index + 1).padStart(3, '0');
  return `/ship/ezgif-3897134f3d30b25b-jpg/ezgif-frame-${frameNumber}.jpg`;
}

export default function ShipScroll({
  scrollProgress,
  containerRef,
  className = '',
  showProgress = false,
}: ShipScrollProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));

  // Scroll tracking (Framer Motion)
  const internalScroll = useScroll(
    containerRef
      ? { target: containerRef, offset: ['start start', 'end end'] }
      : undefined
  );
  const activeScrollProgress = scrollProgress || internalScroll.scrollYProgress;

  // Frame index & render state (pure refs, 0 React re-renders)
  const currentFrameRef = useRef<number>(0);
  const renderedFrameRef = useRef<number>(-1);
  const rafIdRef = useRef<number | null>(null);

  // Direct DOM references for HUD progress indicator (0 React re-renders)
  const progressTextRef = useRef<HTMLSpanElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  /**
   * Find the closest already-loaded image if the target frame isn't ready yet.
   */
  const getNearestLoadedImage = useCallback((targetIndex: number): HTMLImageElement | null => {
    const target = Math.max(0, Math.min(TOTAL_FRAMES - 1, targetIndex));
    const directMatch = imagesRef.current[target];
    if (directMatch && directMatch.complete && directMatch.naturalWidth > 0) {
      return directMatch;
    }

    // Bidirectional fallback search
    for (let delta = 1; delta < TOTAL_FRAMES; delta++) {
      const prev = target - delta;
      if (prev >= 0) {
        const prevImg = imagesRef.current[prev];
        if (prevImg && prevImg.complete && prevImg.naturalWidth > 0) {
          return prevImg;
        }
      }
      const next = target + delta;
      if (next < TOTAL_FRAMES) {
        const nextImg = imagesRef.current[next];
        if (nextImg && nextImg.complete && nextImg.naturalWidth > 0) {
          return nextImg;
        }
      }
    }

    return null;
  }, []);

  /**
   * Draws a given frame onto the canvas using "cover" aspect ratio fitting
   * so the video fits full screen edge-to-edge without letterboxing.
   */
  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return;

      const img = getNearestLoadedImage(frameIndex);
      if (!img) return;

      const cw = canvas.width;
      const ch = canvas.height;
      if (cw === 0 || ch === 0) return;

      const canvasRatio = cw / ch;

      let drawWidth: number;
      let drawHeight: number;
      let drawX: number;
      let drawY: number;

      // Dynamic proportional aspect ratio: uses each image's natural dimensions so every frame is 100% proportional with zero distortion
      const imageRatio = (img.naturalWidth && img.naturalHeight)
        ? (img.naturalWidth / img.naturalHeight)
        : FRAME_ASPECT_RATIO;

      // "cover" strategy: fill entire screen edge-to-edge proportionally without stretching
      if (canvasRatio > imageRatio) {
        drawWidth = cw;
        drawHeight = cw / imageRatio;
        drawX = 0;
        drawY = (ch - drawHeight) / 2;
      } else {
        drawHeight = ch;
        drawWidth = ch * imageRatio;
        drawX = (cw - drawWidth) / 2;
        drawY = 0;
      }

      // Background fill before drawing
      ctx.fillStyle = '#060B12';
      ctx.fillRect(0, 0, cw, ch);

      // Optimized smooth image rendering (fast medium downsampling for 4K frames)
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'medium';
      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);

      renderedFrameRef.current = frameIndex;
    },
    [getNearestLoadedImage]
  );

  // LERP interpolation refs for buttery-smooth 60fps frame scrubbing (scroll-world technique)
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const isAnimatingRef = useRef<boolean>(false);

  /**
   * Continuous smooth animation loop using linear interpolation (LERP).
   * Coalesces seeks and smoothly interpolates between frames for a seamless cinematic flight.
   */
  const startAnimationLoop = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const tick = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;

      if (Math.abs(diff) > 0.0003) {
        // Responsive momentum damping (0.22 = responsive, smooth, zero lag)
        currentProgressRef.current += diff * 0.22;
        const target = Math.max(
          0,
          Math.min(TOTAL_FRAMES - 1, Math.round(currentProgressRef.current * (TOTAL_FRAMES - 1)))
        );

        if (target !== renderedFrameRef.current) {
          drawFrame(target);
        }

        // Direct DOM update for voyage HUD
        if (progressTextRef.current) {
          const frameFormatted = String(target + 1).padStart(3, '0');
          if (target >= TOTAL_FRAMES - 1) {
            progressTextRef.current.textContent = `ARRIVED • FRAME ${frameFormatted}/${TOTAL_FRAMES}`;
          } else {
            progressTextRef.current.textContent = `FRAME ${frameFormatted}/${TOTAL_FRAMES}`;
          }
        }
        if (progressBarRef.current) {
          const percent = ((target / (TOTAL_FRAMES - 1)) * 100).toFixed(1);
          progressBarRef.current.style.width = `${percent}%`;
        }

        rafIdRef.current = requestAnimationFrame(tick);
      } else {
        currentProgressRef.current = targetProgressRef.current;
        const target = Math.max(
          0,
          Math.min(TOTAL_FRAMES - 1, Math.round(currentProgressRef.current * (TOTAL_FRAMES - 1)))
        );
        if (target !== renderedFrameRef.current) {
          drawFrame(target);
        }
        isAnimatingRef.current = false;
        rafIdRef.current = null;
      }
    };

    rafIdRef.current = requestAnimationFrame(tick);
  }, [drawFrame]);

  /**
   * Update target scroll progress and trigger coalesced animation tick.
   */
  const updateProgress = useCallback(
    (progress: number) => {
      targetProgressRef.current = progress;
      startAnimationLoop();
    },
    [startAnimationLoop]
  );

  /**
   * Handle responsive canvas resizing with optimized Retina / HiDPI scale (1.5x cap for 4K efficiency).
   */
  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const rect = parent.getBoundingClientRect();
    const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 1.5);

    const targetWidth = Math.floor(rect.width * dpr);
    const targetHeight = Math.floor(rect.height * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      // Redraw current frame at new size
      drawFrame(currentFrameRef.current);
    }
  }, [drawFrame]);

  // 1. Initial Frame 1 load (No Autoplay: displays first frame on load) & Smooth Progressive Preload
  useEffect(() => {
    let isCancelled = false;

    // Load Frame 1 immediately and draw it
    const firstImg = new Image();
    firstImg.src = getFrameUrl(0);
    firstImg.onload = () => {
      if (isCancelled) return;
      imagesRef.current[0] = firstImg;
      updateCanvasSize();
      drawFrame(0);

      // Preload the final arrival frame immediately so the destination is ready
      const lastImg = new Image();
      lastImg.src = getFrameUrl(TOTAL_FRAMES - 1);
      lastImg.onload = () => {
        if (!isCancelled) {
          imagesRef.current[TOTAL_FRAMES - 1] = lastImg;
        }
      };

      // Progressive preloading of remaining frames in light batches to prevent network/main-thread choking
      let currentIndex = 1;
      const preloadBatch = () => {
        if (isCancelled || currentIndex >= TOTAL_FRAMES - 1) return;

        const batchEnd = Math.min(currentIndex + 8, TOTAL_FRAMES - 1);
        for (let i = currentIndex; i < batchEnd; i++) {
          const img = new Image();
          img.src = getFrameUrl(i);
          img.onload = () => {
            if (!isCancelled) {
              imagesRef.current[i] = img;
            }
          };
          if ('decode' in img && typeof img.decode === 'function') {
            img.decode().catch(() => {});
          }
        }

        currentIndex = batchEnd;
        if (currentIndex < TOTAL_FRAMES - 1) {
          setTimeout(preloadBatch, 35);
        }
      };

      preloadBatch();
    };

    return () => {
      isCancelled = true;
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [drawFrame, updateCanvasSize]);

  // 2. Resize listener
  useEffect(() => {
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize, { passive: true });
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [updateCanvasSize]);

  // 3. Lenis Smooth Motion Scroll Integration
  // Uses Lenis momentum scroll events to smoothly advance video frames with sub-frame interpolation
  useEffect(() => {
    const updateFrameFromScroll = (scrollPos: number) => {
      const heroEl = document.getElementById('hero');
      if (!heroEl) return;
      const maxScroll = heroEl.offsetHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const progress = Math.max(0, Math.min(1, scrollPos / maxScroll));
      // Reaching the final frame by 88% scroll and holding it for the remaining 12%
      const PLAYBACK_END = 0.88;
      const playProgress = Math.min(1, progress / PLAYBACK_END);
      updateProgress(playProgress);
    };

    // Check if Lenis is globally available
    const lenisInstance = (window as unknown as { lenis?: { on: (event: string, cb: (e: { scroll: number }) => void) => void; off: (event: string, cb: (e: { scroll: number }) => void) => void } }).lenis;

    const handleLenisScroll = (e: { scroll: number }) => {
      updateFrameFromScroll(e.scroll);
    };

    if (lenisInstance && typeof lenisInstance.on === 'function') {
      lenisInstance.on('scroll', handleLenisScroll);
    }

    // Native scroll listener as fallback & initial sync
    const handleNativeScroll = () => {
      updateFrameFromScroll(window.scrollY);
    };
    window.addEventListener('scroll', handleNativeScroll, { passive: true });

    // Initial position check
    updateFrameFromScroll(window.scrollY);

    return () => {
      if (lenisInstance && typeof lenisInstance.off === 'function') {
        lenisInstance.off('scroll', handleLenisScroll);
      }
      window.removeEventListener('scroll', handleNativeScroll);
    };
  }, [updateProgress]);

  // 4. Framer Motion Scroll Progress sync (dual driver for precision)
  useMotionValueEvent(activeScrollProgress, 'change', (progress) => {
    const clampedProgress = Math.max(0, Math.min(1, progress));
    const PLAYBACK_END = 0.88;
    const playProgress = Math.min(1, clampedProgress / PLAYBACK_END);
    updateProgress(playProgress);
  });

  return (
    <div className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-[#060B12] ${className}`}>
      {/* HTML5 Canvas - Full Screen Cover */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block select-none pointer-events-none"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* Subtle top shadow only to preserve navbar legibility without dimming the video */}
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none bg-gradient-to-b from-black/70 via-black/20 to-transparent z-10" />

      {/* Voyage Scrollytelling HUD */}
      {showProgress && (
        <div className="absolute bottom-6 right-6 z-30 flex items-center gap-3 bg-black/60 backdrop-blur-md border border-white/15 rounded-full px-4 py-2 shadow-xl select-none pointer-events-none">
          <div className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
          <span
            ref={progressTextRef}
            className="text-[11px] font-mono tracking-widest text-white/90 uppercase font-semibold min-w-[125px]"
          >
            FRAME 001/{TOTAL_FRAMES}
          </span>
          <div className="w-20 h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full bg-brand-gold transition-all duration-75"
              style={{ width: '0%' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
