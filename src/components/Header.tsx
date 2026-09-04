'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Menu, X, ArrowRight, Phone } from 'lucide-react';
import { ENTERPRISE_INFO } from '@/data/products';
import NavFlyingShip from './NavFlyingShip';

export default function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Navbar UI appears only when the ship takes us to the main website (scrollY: 1150px -> 1500px)
  const navUIOpacity = useTransform(scrollY, [1150, 1500], [0, 1]);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 40);
  });

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About Us', href: '#about' },
    { name: 'Core Products', href: '#products' },
    { name: 'Why Partner With Us', href: '#usps' },
    { name: 'Trade Network', href: '#network' },
    { name: 'Contact Us', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Background Frosted Glass Bar (Only fades in when approaching main website) */}
      <motion.div
        style={{ opacity: navUIOpacity }}
        className={`absolute inset-0 transition-colors duration-300 pointer-events-none ${isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
          : 'bg-slate-950/60 backdrop-blur-md border-b border-white/10 py-4'
          }`}
      />

      {/* Main Navbar Bar */}
      <nav className="relative transition-all duration-300 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Company Name */}
          <div className="flex items-center space-x-2.5">
            {/* The Flying Vessel Dock (Always mounted, manages its own opacity & motion) */}
            <div className="pointer-events-auto">
              <NavFlyingShip />
            </div>

            <motion.a
              href="#hero"
              style={{ opacity: navUIOpacity }}
              className="flex flex-col group focus:outline-none pointer-events-auto select-none"
            >
              <span
                className={`font-bold text-base sm:text-lg leading-tight tracking-tight transition-colors ${isScrolled ? 'text-brand-dark' : 'text-white'
                  }`}
              >
                LUSH TRADE CORP
              </span>
              <span className="text-[9.5px] tracking-widest text-brand-gold uppercase font-semibold">
                Tanzania Limited
              </span>
            </motion.a>
          </div>

          {/* Desktop Navigation Links */}
          <motion.div
            style={{ opacity: navUIOpacity }}
            className="hidden lg:flex items-center space-x-8 pointer-events-auto"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-brand-gold ${isScrolled ? 'text-slate-700' : 'text-slate-100'
                  }`}
              >
                {link.name}
              </a>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            style={{ opacity: navUIOpacity }}
            className="hidden sm:flex items-center space-x-4 pointer-events-auto"
          >
            <a
              href="#contact"
              className="relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-brand-dark transition-all duration-200 bg-gradient-to-r from-brand-gold to-brand-goldLight rounded-lg shadow-md hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Partner With Us</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <motion.div
            style={{ opacity: navUIOpacity }}
            className="lg:hidden flex items-center pointer-events-auto"
          >
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg ${isScrolled ? 'text-slate-800' : 'text-white'
                } hover:bg-white/10`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </motion.div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-brand-dark/95 border-b border-brand-emerald/40 px-4 pt-4 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-slate-200 font-medium px-3 py-2 rounded-md hover:bg-brand-emerald/40 hover:text-brand-gold transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2 border-t border-slate-700/50 flex flex-col space-y-2">
                <a
                  href={`tel:${ENTERPRISE_INFO.phone.replace(/\s+/g, '')}`}
                  className="text-xs text-slate-300 flex items-center space-x-2 px-3 py-1"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-gold" />
                  <span>{ENTERPRISE_INFO.phone}</span>
                </a>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center w-full py-2.5 text-sm font-semibold text-brand-dark bg-gradient-to-r from-brand-gold to-brand-goldLight rounded-lg shadow"
                >
                  <span>Partner With Us</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
