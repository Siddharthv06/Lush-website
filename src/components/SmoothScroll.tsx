'use client';

import React, { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 1. Enforce manual scroll restoration so browsers do not remember scroll position on refresh
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      // Reset scroll position to top (home page) immediately
      window.scrollTo(0, 0);

      // Clear any anchor hash if present so browser doesn't jump down to #about, #products, etc.
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }

    // Initialize Lenis for world-class luxury momentum scrolling
    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easeOut
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      infinite: false,
    });

    // Make lenis globally accessible if needed
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    // Immediately enforce top position in Lenis as well
    lenis.scrollTo(0, { immediate: true });

    // Fallback timers to overcome any browser post-layout scroll restoration
    const timer1 = setTimeout(() => {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });
    }, 20);

    const timer2 = setTimeout(() => {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });
    }, 100);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Reset scroll position to top on beforeunload as well
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Smooth anchor navigation (#about, #products, #contact, etc.)
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;
      
      const href = target.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const element = document.querySelector(href);
        if (element) {
          e.preventDefault();
          lenis.scrollTo(element as HTMLElement, {
            offset: -72,
            duration: 1.3,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);

  return <>{children}</>;
}
