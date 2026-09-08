'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface LanguageOption {
  code: string;
  name: string;
  localName: string;
  flag: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', localName: 'English', flag: '🇬🇧' },
  { code: 'sw', name: 'Swahili', localName: 'Kiswahili', flag: '🇹🇿' },
  { code: 'hi', name: 'Hindi', localName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'vi', name: 'Vietnamese', localName: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'ar', name: 'Arabic', localName: 'العربية', flag: '🇦🇪' },
  { code: 'fr', name: 'French', localName: 'Français', flag: '🇫🇷' },
  { code: 'zh-CN', name: 'Chinese', localName: '中文 (简体)', flag: '🇨🇳' },
  { code: 'es', name: 'Spanish', localName: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'German', localName: 'Deutsch', flag: '🇩🇪' },
];

interface LanguageSelectorProps {
  isHomePage?: boolean;
  isScrolled?: boolean;
  isMobile?: boolean;
}

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

export default function LanguageSelector({
  isHomePage = true,
  isScrolled = false,
  isMobile = false,
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Initialize Google Translate Element once
  useEffect(() => {
    // Read existing translation cookie if any
    const getSavedLang = () => {
      const match = document.cookie.match(/googtrans=\/en\/([a-zA-Z\-]+)/);
      if (match && match[1]) {
        return match[1];
      }
      return 'en';
    };

    setCurrentLang(getSavedLang());

    // Register callback for Google Translate script
    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,sw,hi,vi,ar,fr,zh-CN,es,de',
            autoDisplay: false,
          },
          'google_translate_element'
        );
      }
    };

    // Inject Google Translate script if not present
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.type = 'text/javascript';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }

    // Close on outside click
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = (langCode: string) => {
    setCurrentLang(langCode);
    setIsOpen(false);

    const hostname = window.location.hostname;

    if (langCode === 'en') {
      // Clear cookie to return to original English
      document.cookie = 'googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
      document.cookie = `googtrans=; path=/; domain=${hostname}; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
      document.cookie = `googtrans=; path=/; domain=.${hostname}; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    } else {
      // Set google translation cookie: /<source>/<target>
      document.cookie = `googtrans=/en/${langCode}; path=/;`;
      document.cookie = `googtrans=/en/${langCode}; path=/; domain=${hostname};`;
      document.cookie = `googtrans=/en/${langCode}; path=/; domain=.${hostname};`;
    }

    // Trigger google translate select if element is loaded
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change', { bubbles: true }));
    } else {
      // Fallback reload so Google Translate boots with cookie
      window.location.reload();
    }
  };

  const activeLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  // If inside mobile drawer
  if (isMobile) {
    return (
      <div className="w-full pt-1">
        <div className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          <span className="flex items-center space-x-1.5">
            <Globe className="w-3.5 h-3.5 text-brand-gold" />
            <span>Select Language</span>
          </span>
          <span className="text-[10px] text-brand-gold/80 font-mono">Google Translate</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-white/[0.04] border border-white/10 rounded-xl">
          {LANGUAGES.map((lang) => {
            const isSelected = lang.code === currentLang;
            return (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                className={`flex items-center space-x-1.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-brand-gold text-brand-dark font-bold shadow-md scale-[1.02]'
                    : 'text-slate-200 hover:bg-white/10 hover:text-brand-gold'
                }`}
              >
                <span className="text-sm">{lang.flag}</span>
                <span className="truncate">{lang.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Desktop Button styling based on header theme
  const buttonBorderClass = !isHomePage || !isScrolled
    ? 'border-white/20 hover:border-brand-gold/60 bg-white/10 hover:bg-white/15 text-white'
    : 'border-slate-300 hover:border-brand-gold/60 bg-slate-100/90 hover:bg-slate-200/90 text-slate-800';

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      {/* Hidden container for Google Translate Engine */}
      <div id="google_translate_element" className="hidden" />

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center backdrop-blur-md transition-all duration-200 shadow-sm hover:scale-105 active:scale-95 group ${buttonBorderClass}`}
        aria-label="Select Language"
        aria-expanded={isOpen}
        title={`Language: ${activeLangObj.name}`}
      >
        <Globe className="w-4 h-4 text-brand-gold group-hover:rotate-12 transition-transform duration-300" />
        <span className="sr-only">Select Language</span>
      </button>

      {/* Glassmorphic Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900/95 border border-brand-gold/30 shadow-2xl backdrop-blur-xl p-1.5 z-50 overflow-hidden"
          >
            <div className="px-3 py-2 border-b border-white/10 flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                <Globe className="w-3 h-3 text-brand-gold" />
                <span>Languages</span>
              </span>
              <span className="text-[9px] font-mono text-brand-gold/70">Google Translate</span>
            </div>

            <div className="py-1 max-h-64 overflow-y-auto space-y-0.5" data-lenis-prevent>
              {LANGUAGES.map((lang) => {
                const isSelected = lang.code === currentLang;
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageSelect(lang.code)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors group ${
                      isSelected
                        ? 'bg-brand-gold/20 text-brand-gold font-bold'
                        : 'text-slate-200 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <span className="text-base leading-none">{lang.flag}</span>
                      <div className="text-left">
                        <div className="font-medium leading-snug">{lang.localName}</div>
                        <div className="text-[10px] text-slate-400 font-normal">
                          {lang.name}
                        </div>
                      </div>
                    </div>

                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
