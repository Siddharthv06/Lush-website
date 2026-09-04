'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Ship, Anchor, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { TiltCard } from '@/components/motion/tilt-card';
import KineticCenterBuild from '@/components/smoothui/components/kinetic-center-build';
import WaveDivider from './WaveDivider';

export default function GlobalReach() {
  const tradeRoutes = [
    {
      region: 'Africa Sourcing Hubs',
      hubs: 'Mtwara & Dar es Salaam Ports (Tanzania)',
      focus: 'Primary RCN, Pulses, Coffee & Certified Timber Sourcing',
      icon: Anchor,
    },
    {
      region: 'Asia & Middle East',
      hubs: 'India, Vietnam, China, UAE (Dubai)',
      focus: 'Raw Cashew Nut, Cashew Kernels & Agro-Commodities Export',
      icon: Ship,
    },
    {
      region: 'European Markets',
      hubs: 'Netherlands, Germany, United Kingdom, Italy',
      focus: 'Specialty Coffee, Cashew Kernels & Certified Teak Timber Exports',
      icon: Globe,
    },
  ];

  return (
    <section id="network" className="py-20 bg-brand-dark text-white relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C59B27_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-emerald/40 border border-brand-gold/40">
            <Globe className="w-3.5 h-3.5 text-brand-gold" />
            <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">
              International Trade Footprint
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex justify-center">
            <KineticCenterBuild phrases={["Connecting East Africa to Asia, Europe & Beyond"]} />
          </h2>

          <p className="text-slate-300 text-base">
            Strategic sea routes originating from Mtwara Port and Dar es Salaam Port ensure fast vessel turnaround times and low transit risk.
          </p>

          <div className="w-20 h-1 bg-gradient-to-r from-brand-gold to-brand-emerald mx-auto rounded-full" />
        </div>

        {/* Trade Corridors Cards with 3D Tilt */}
        <div className="grid lg:grid-cols-3 gap-8">
          {tradeRoutes.map((route, idx) => {
            const Icon = route.icon;
            return (
              <motion.div
                key={route.region}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
              >
                <TiltCard
                  max={6}
                  glare={true}
                  className="bg-gradient-to-b from-brand-forest/60 to-brand-dark rounded-2xl p-8 border border-brand-emerald/50 hover:border-brand-gold/60 shadow-xl h-full flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-gold/20 border border-brand-gold/40 flex items-center justify-center text-brand-gold">
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="text-xl font-bold text-white">{route.region}</h3>

                    <div className="space-y-2">
                      <div className="text-xs text-brand-gold font-semibold uppercase tracking-wider">Major Trade Hubs</div>
                      <p className="text-sm font-medium text-slate-200">{route.hubs}</p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-white/10">
                      <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Commodity Focus</div>
                      <p className="text-xs text-slate-300 leading-relaxed">{route.focus}</p>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-brand-gold font-bold">
                    <span>Verified Corridor</span>
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        {/* Global Logistics Summary Bar with TiltCard */}
        <div className="mt-12">
          <TiltCard max={8} glare={true} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Mtwara Port Proximity Advantage</h4>
                  <p className="text-xs text-slate-300">Located directly within Tanzania&apos;s cashew nut production heartland.</p>
                </div>
              </div>

              <a
                href="#contact"
                className="inline-flex items-center px-5 py-2.5 rounded-xl bg-brand-forest hover:bg-brand-emerald text-xs font-bold text-brand-gold border border-brand-gold/40 transition-colors shrink-0"
              >
                <span>Inquire About Shipping Schedules</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </TiltCard>
        </div>

      </div>

      {/* Organic Wave Curve Transitioning into BlogSection */}
      <WaveDivider color="#ffffff" position="bottom" />
    </section>
  );
}
