'use client';

import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  ArrowUp,
  Globe,
  Linkedin,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Ship,
  Anchor,
  Award,
  Clock,
  CheckCircle2,
  MessageCircle,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { ENTERPRISE_INFO } from '@/data/products';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 4000);
  };

  const commodities = [
    { name: 'RAW CASHEW NUTS (RCN)', spec: 'Outturn 50–55 LBS+', href: '#products' },
    { name: 'CASHEW NUT KERNELS', spec: 'W180, W240, W320, SW', href: '#products' },
    { name: 'EXPORT PULSES & GRAINS', spec: 'Chickpeas, Pigeon Peas, Mung', href: '#products' },
    { name: 'KILIMANJARO COFFEE', spec: 'Arabica AAA & Robusta FAQ', href: '#products' },
    { name: 'SUSTAINABLE TIMBER', spec: 'Teak Wood & African Pine', href: '#products' },
    { name: 'INDUSTRIAL IMPORTS', spec: 'Ethanol & Agro Machinery', href: '#products' },
  ];

  const tradePorts = [
    { title: 'Port of Mtwara', desc: 'Deepwater Cashew Export Terminal' },
    { title: 'Port of Dar es Salaam', desc: 'Commercial Gateway to Global Corridors' },
    { title: 'Aggregation Hubs', desc: 'Masasi, Newala, Tandahimba, Dodoma' },
    { title: 'Key Export Destinations', desc: 'India, Vietnam, UAE, EU & Americas' },
    { title: 'Trade Incoterms 2020', desc: 'FOB, CIF, CFR • 20ft & 40ft HC FCL' },
  ];

  const certifications = [
    { label: 'Cashew Board of Tanzania', sub: 'CBT Registered Exporter' },
    { label: 'TCCIA Verified', sub: 'Tanzania Chamber of Commerce' },
    { label: 'TRA Registered Taxpayer', sub: 'TIN & VAT Fully Compliant' },
    { label: 'SGS & Phytosanitary', sub: 'Pre-Shipment Quality Certified' },
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com', desc: 'Corporate Updates' },
    { name: 'WhatsApp', icon: MessageCircle, href: 'https://wa.me/255639354286', desc: 'Instant Trade Desk' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com', desc: 'Field & Port Footage' },
    { name: 'X (Twitter)', icon: Twitter, href: 'https://twitter.com', desc: 'Market Trends' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com', desc: 'Harvest Stories' },
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com', desc: 'Community Network' },
  ];

  const hashtags = [
    '#LushTradeCorp',
    '#TanzaniaExports',
    '#CashewExports',
    '#AfricanTrade',
    '#AgroExports',
    '#SourcingFromAfrica',
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#051811] via-[#072218] to-[#03110b] text-slate-300 overflow-hidden select-none">
      {/* Ambient background glow elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-emerald/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative top accent line with golden shimmer */}
      <div className="relative w-full h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">

        {/* 1. Pre-Footer Enterprise Trade Banner */}
        <div className="mb-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-white/[0.05] via-white/[0.02] to-white/[0.04] border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          {/* Subtle gold corner ribbon / accent */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-gold/15 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-gold text-[11px] font-bold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                <span>Direct Sourcing From East Africa</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                Ready to Contract Premium Tanzanian Commodities?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Direct farm-gate aggregation from Mtwara, Masasi, and Dar es Salaam with guaranteed outturn (50–55 LBS+), SGS pre-shipment inspections, and flexible Incoterms.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-bold text-sm text-brand-dark bg-gradient-to-r from-brand-gold via-yellow-400 to-brand-goldLight shadow-glow hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Request Quotation (RFQ)</span>
              </a>

              <a
                href="https://wa.me/255639354286"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 px-5 py-3.5 rounded-xl font-semibold text-sm text-white bg-white/10 hover:bg-white/15 border border-white/20 hover:border-brand-gold/50 transition-all group"
              >
                <MessageCircle className="w-4 h-4 text-brand-gold group-hover:scale-110 transition-transform" />
                <span>WhatsApp Trade Desk</span>
              </a>
            </div>
          </div>

          {/* Real-time trade desk availability bar */}
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex items-center space-x-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-emerald-400 font-medium">Trade Desk Active</span>
              <span className="text-slate-500">•</span>
              <span>Accepting Spot Orders & Forward Season Contracts</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-brand-gold" />
              <span>Mtwara & Dar es Salaam Hubs (UTC+3 / EAT)</span>
            </div>
          </div>
        </div>

        {/* 2. Main Footer 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-white/10">

          {/* Col 1: Corporate Identity & Accreditation Badges (Span 4) */}
          <div className="lg:col-span-4 space-y-6">
            <a href="#hero" className="flex items-center space-x-3.5 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-gold via-amber-300 to-brand-emerald p-0.5 shadow-glow group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-[#07251a] rounded-[14px] flex items-center justify-center font-extrabold text-brand-gold text-xl tracking-wider">
                  LT
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl leading-tight tracking-tight text-white group-hover:text-brand-gold transition-colors">
                  LUSH TRADE CORP
                </span>
                <span className="text-[10.5px] tracking-[0.2em] text-brand-gold uppercase font-bold">
                  Tanzania Limited
                </span>
              </div>
            </a>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Africa&apos;s most trusted sourcing and export partner. Headquartered in Mtwara and Dar es Salaam, we bridge local agricultural strength with global processors across Asia, Europe, and the Middle East through uncompromising quality and integrity.
            </p>

            {/* Enterprise Accreditation Badges */}
            <div className="space-y-2.5 pt-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Trade Accreditations & Compliance
              </span>
              <div className="grid grid-cols-2 gap-2">
                {certifications.map((c, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-brand-gold/40 hover:bg-white/[0.06] transition-all"
                  >
                    <div className="flex items-start space-x-2">
                      <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[11px] font-bold text-white leading-tight">
                          {c.label}
                        </div>
                        <div className="text-[9.5px] text-slate-400 leading-tight mt-0.5">
                          {c.sub}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Col 2: Export Commodities with Grade Specs (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-brand-gold" />
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Export Commodities
              </h4>
            </div>

            <ul className="space-y-2.5">
              {commodities.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href}
                    className="group block p-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-transparent hover:border-brand-gold/30 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-200 group-hover:text-brand-gold transition-colors">
                        {item.name}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 group-hover:text-slate-300 font-mono mt-0.5">
                      {item.spec}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Maritime Corridors & Shipping Hubs (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <Ship className="w-4 h-4 text-brand-gold" />
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Trade Logistics
              </h4>
            </div>

            <ul className="space-y-3 text-xs">
              {tradePorts.map((port, idx) => (
                <li key={idx} className="border-b border-white/5 pb-2.5 last:border-0 last:pb-0">
                  <div className="font-semibold text-white flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                    <span>{port.title}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 leading-snug pl-3">
                    {port.desc}
                  </div>
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <div className="p-3 rounded-xl bg-brand-emerald/20 border border-brand-emerald/40 text-[11px] text-slate-300">
                <span className="font-bold text-brand-gold block mb-1">Incoterms Standard:</span>
                FOB Port of Mtwara & Dar es Salaam. CIF/CFR worldwide delivery on inquiry.
              </div>
            </div>
          </div>

          {/* Col 4: Head Office & Direct Trade Desk (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center space-x-2">
              <Anchor className="w-4 h-4 text-brand-gold" />
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Head Office & Inquiries
              </h4>
            </div>

            <div className="space-y-3 text-xs">
              {/* Address card */}
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1.5">
                <div className="flex items-start space-x-2.5">
                  <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                  <div className="text-slate-300 leading-relaxed text-xs">
                    <span className="font-bold text-white block">Corporate Head Office</span>
                    {ENTERPRISE_INFO.headOffice.address}, {ENTERPRISE_INFO.headOffice.poBox}, {ENTERPRISE_INFO.headOffice.city}, {ENTERPRISE_INFO.headOffice.country}
                  </div>
                </div>
                <div className="text-[11px] text-brand-gold/90 pl-6.5 font-medium">
                  Presence: Mtwara & Dar es Salaam, Tanzania
                </div>
              </div>

              {/* Email */}
              <a
                href={`mailto:${ENTERPRISE_INFO.email}`}
                className="flex items-center space-x-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-brand-gold/40 hover:bg-white/[0.06] transition-all text-slate-200 hover:text-brand-gold group"
              >
                <Mail className="w-4 h-4 text-brand-gold shrink-0 group-hover:scale-110 transition-transform" />
                <div className="truncate">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Export Desk Email</span>
                  <span className="font-semibold text-xs">{ENTERPRISE_INFO.email}</span>
                </div>
              </a>

              {/* Phone */}
              <a
                href={`tel:${ENTERPRISE_INFO.phone.replace(/\s+/g, '')}`}
                className="flex items-center space-x-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-brand-gold/40 hover:bg-white/[0.06] transition-all text-slate-200 hover:text-brand-gold group"
              >
                <Phone className="w-4 h-4 text-brand-gold shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Trade Hotline</span>
                  <span className="font-semibold text-xs">{ENTERPRISE_INFO.phone}</span>
                </div>
              </a>

              {/* Official Web */}
              <div className="flex items-center space-x-2.5 px-3 py-2 text-slate-400 text-xs">
                <Globe className="w-4 h-4 text-brand-gold shrink-0" />
                <span>{ENTERPRISE_INFO.website}</span>
              </div>
            </div>
          </div>

        </div>

        {/* 3. Newsletter & Social Network Strip */}
        <div className="py-8 border-b border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8">

          {/* Monthly Commodity Bulletin Subscribe */}
          <div className="w-full lg:max-w-md space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-white uppercase tracking-wider">
              <Mail className="w-3.5 h-3.5 text-brand-gold" />
              <span>East Africa Commodity Intelligence</span>
            </div>
            <p className="text-xs text-slate-400">
              Subscribe to receive verified outturn reports, seasonal crop forecasts, and port transit bulletins.
            </p>

            <form onSubmit={handleSubscribe} className="relative flex items-center mt-2">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter corporate email..."
                className="w-full pl-3.5 pr-28 py-2.5 rounded-xl bg-white/[0.06] border border-white/15 focus:border-brand-gold text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-gold transition-all"
              />
              <button
                type="submit"
                className="absolute right-1 px-4 py-1.5 rounded-lg bg-gradient-to-r from-brand-gold to-yellow-500 hover:from-yellow-400 hover:to-brand-gold text-brand-dark font-bold text-xs transition-all shadow-sm"
              >
                {isSubscribed ? (
                  <span className="flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-dark" />
                    <span>Joined</span>
                  </span>
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>
            {isSubscribed && (
              <p className="text-[11px] text-emerald-400 font-medium pt-1">
                ✓ Thank you. You are subscribed to Lush Trade Corp market bulletins.
              </p>
            )}
          </div>

          {/* Social Platforms Row */}
          <div className="w-full lg:w-auto flex flex-col items-start lg:items-end space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Connect Across Global Platforms
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {socialLinks.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <a
                    key={idx}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-brand-gold hover:text-brand-dark border border-white/[0.08] hover:border-brand-gold transition-all text-slate-300 text-xs group"
                    title={`${s.name} • ${s.desc}`}
                  >
                    <Icon className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold text-[11px]">{s.name}</span>
                  </a>
                );
              })}
            </div>
          </div>

        </div>

        {/* 4. Hashtags cloud */}
        <div className="py-4 border-b border-white/5 flex flex-wrap items-center justify-center gap-2 text-[11px]">
          {hashtags.map((h, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-md bg-white/[0.02] text-slate-400 hover:text-brand-gold hover:bg-white/[0.05] transition-colors cursor-default"
            >
              {h}
            </span>
          ))}
        </div>

        {/* 5. Bottom Copyright & Integrity Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-1 sm:space-y-0 text-center sm:text-left">
            <p>© {new Date().getFullYear()} {ENTERPRISE_INFO.name}. All rights reserved.</p>
            <span className="hidden sm:inline text-slate-600">|</span>
            <p className="text-slate-400 italic">
              &quot;Connecting Africa&apos;s Agricultural Strength to the World.&quot;
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <a href="#hero" className="hover:text-brand-gold transition-colors">
              Terms of Trade
            </a>
            <span className="text-slate-600">•</span>
            <a href="#hero" className="hover:text-brand-gold transition-colors">
              Phytosanitary Standards
            </a>
            <span className="text-slate-600">•</span>
            <a href="#hero" className="hover:text-brand-gold transition-colors">
              Privacy Policy
            </a>

            {/* Scroll back to top button */}
            <button
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="ml-2 p-2.5 rounded-xl bg-white/10 hover:bg-brand-gold hover:text-brand-dark text-white border border-white/15 hover:border-brand-gold transition-all shadow-md group"
              title="Return to top"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
