'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, Phone, BookOpen } from 'lucide-react';
import { ENTERPRISE_INFO } from '@/data/products';
import LanguageSelector from './LanguageSelector';

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isPastHero, setIsPastHero] = useState(false);

  // Track active section and whether user has scrolled past the hero section
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'products', 'usps', 'blog', 'contact'];

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Dynamic Island: activates after scrolling past the hero home screen
      const hero = document.getElementById('hero');
      if (hero) {
        const heroBottom = hero.offsetTop + hero.offsetHeight - 250;
        setIsPastHero(window.scrollY >= heroBottom);
      } else {
        setIsPastHero(window.scrollY > 500);
      }

      const scrollPosition = window.scrollY + 200;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'About Us', href: isHomePage ? '#about' : '/#about', id: 'about' },
    { name: 'Core Products', href: isHomePage ? '#products' : '/#products', id: 'products' },
    { name: 'Why Us', href: isHomePage ? '#usps' : '/#usps', id: 'usps' },
    { name: 'Blog', href: isHomePage ? '#blog' : '/#blog', id: 'blog' },
    { name: 'Contact', href: isHomePage ? '#contact' : '/#contact', id: 'contact' },
  ];

  return (
    <>
      <header
        id="main-navbar"
        className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 lg:px-8 pt-2.5 sm:pt-3 pointer-events-none transition-all duration-300"
      >
        <div
          className={`pointer-events-auto mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-2 sm:py-2.5 flex items-center justify-between relative rounded-full transition-all duration-500 ${
            isPastHero
              ? 'bg-black/40 backdrop-blur-md border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.25)]'
              : 'bg-transparent border border-transparent shadow-none'
          }`}
        >
          {/* Left: Authentic Corporate Logo Typography */}
          <Link href="/" className="flex flex-col select-none z-10 group focus:outline-none">
            <span className="font-logo font-bold text-[15px] sm:text-[17px] tracking-[0.22em] text-white group-hover:text-amber-100 transition-colors uppercase leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              LUSH TRADE
            </span>
            <div className="flex items-center space-x-1.5 mt-1">
              <span className="text-[7px] sm:text-[8px] font-sans font-extrabold tracking-[0.36em] text-brand-gold uppercase leading-none drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                TANZANIA LIMITED
              </span>
            </div>
          </Link>

          {/* Center: Perfectly Centered Navigation Links (Borderless & Minimalist) */}
          <nav className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2 gap-5 xl:gap-7 text-[12.5px] font-medium tracking-wide">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setActiveSection(link.id)}
                  className={`relative py-1 transition-colors duration-200 flex items-center gap-1.5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-white/75 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shadow-[0_0_8px_#C59B27]" />
                  )}
                  <span>{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Right: Sleek Luxury Pill "Get Started" Button + Language Selector */}
          <div className="hidden lg:flex items-center space-x-3 z-10">
            <a
              href="#contact"
              onClick={() => setActiveSection('contact')}
              className="relative inline-flex items-center justify-center gap-1.5 px-4 py-1.5 text-[11.5px] font-extrabold uppercase tracking-wider text-brand-dark bg-gradient-to-r from-brand-gold via-brand-goldLight to-brand-gold rounded-full shadow-[0_0_16px_rgba(197,155,39,0.3)] hover:shadow-[0_0_24px_rgba(197,155,39,0.55)] hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3 h-3" />
            </a>

            {/* Compact Language Selector icon */}
            <LanguageSelector isHomePage={isHomePage} isScrolled={isScrolled} />
          </div>

          {/* Mobile Right Bar: Language Icon + Hamburger */}
          <div className="flex lg:hidden items-center space-x-2.5 z-10">
            <LanguageSelector isHomePage={isHomePage} isScrolled={isScrolled} />

            <button
              type="button"
              aria-label="Toggle navigation menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-white/90 hover:text-white focus:outline-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#090A0C]/98 backdrop-blur-2xl flex flex-col justify-between p-8 pt-28 lg:hidden animate-in fade-in duration-200">
          <div className="flex flex-col space-y-5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    setActiveSection(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between text-xl font-medium tracking-wide py-2.5 border-b border-white/10 transition-colors ${
                    isActive ? 'text-brand-gold' : 'text-slate-200 hover:text-brand-gold'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {link.name === 'Blog' && <BookOpen className="w-4 h-4 text-brand-gold" />}
                    <span>{link.name}</span>
                  </span>
                </a>
              );
            })}
          </div>

          <div className="space-y-4 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-white/50 font-mono">
                Direct Line
              </span>
              <a
                href={`tel:${ENTERPRISE_INFO.phone.replace(/\s+/g, '')}`}
                className="text-xs text-brand-gold flex items-center space-x-1.5 font-mono"
              >
                <Phone className="w-3 h-3" />
                <span>{ENTERPRISE_INFO.phone}</span>
              </a>
            </div>

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-brand-gold text-brand-dark text-sm font-semibold tracking-wide shadow-lg active:scale-95 transition-transform"
            >
              <span>Partner Us</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
