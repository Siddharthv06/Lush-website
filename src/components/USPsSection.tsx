'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Truck, ShieldCheck, UserCheck, FileCheck, Scale, Award, ArrowUpRight, Compass } from 'lucide-react';
import { TiltCard } from '@/components/motion/tilt-card';
import KineticCenterBuild from '@/components/smoothui/components/kinetic-center-build';
import WaveDivider from './WaveDivider';

export default function USPsSection() {
  const usps = [
    {
      icon: Truck,
      title: '360° Sourcing & Logistics',
      description: '360° sourcing & logistics from Tanzania to Asia, Europe & Middle East, ensuring zero supply chain bottlenecks.',
      badge: 'Global Supply',
    },
    {
      icon: ShieldCheck,
      title: 'On-Ground Quality Control & Inspection',
      description: 'Dedicated quality inspectors conduct bag-by-bag moisture testing, outturn analysis (50–55 LBS+ RCN), and purity checks prior to packing.',
      badge: 'Strict Audits',
    },
    {
      icon: UserCheck,
      title: 'Verified Supplier Base',
      description: 'Verified supplier base with long-term farming contracts across Masasi, Mtwara, Newala, Dodoma, Iringa, and Arusha.',
      badge: 'Direct Farmers',
    },
    {
      icon: FileCheck,
      title: 'Dedicated Export Documentation & Logistics',
      description: 'Dedicated export documentation and logistics team handling Phytosanitary Certificates, TRA clearance, and Certificates of Origin.',
      badge: '100% Compliant',
    },
    {
      icon: Scale,
      title: 'Ethical & Transparent Trade Policies',
      description: 'Ethical & transparent trade policies fostering fair compensation for smallholder farmers and contract compliance.',
      badge: 'Fair Trade',
    },
    {
      icon: Compass,
      title: 'Bushesh-to-Port Operations Team',
      description: 'Dedicated and highly experienced on-ground team managing logistics seamlessly from bushes to port operations in Mtwara and Dar es Salaam.',
      badge: 'Bushes to Port',
    },
  ];

  return (
    <section id="usps" className="py-24 bg-brand-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-mint border border-brand-leaf/30">
            <Award className="w-3.5 h-3.5 text-brand-leaf" />
            <span className="text-xs font-bold text-brand-forest uppercase tracking-wider">
              3. Partner With Us
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight flex justify-center">
            <KineticCenterBuild phrases={["Why Choose Lush Trade Corp Tanzania Limited"]} />
          </h2>

          <p className="text-slate-600 text-base">
            Lush Trade Corp Tanzania Limited provides a seamless trade bridge between Africa&apos;s producers and global buyers through our strong sourcing and export network.
          </p>

          <div className="w-20 h-1 bg-gradient-to-r from-brand-gold to-brand-emerald mx-auto rounded-full" />
        </div>

        {/* Feature Cards Grid with 3D Tilt */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {usps.map((usp, idx) => {
            const Icon = usp.icon;
            return (
              <motion.div
                key={usp.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <TiltCard
                  max={6}
                  glare={true}
                  className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg hover:shadow-card-hover h-full flex flex-col justify-between group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-mint rounded-bl-full transition-transform group-hover:scale-110 -z-0 opacity-40" />

                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-14 h-14 rounded-2xl bg-brand-forest text-brand-gold flex items-center justify-center shadow-md group-hover:bg-brand-gold group-hover:text-brand-dark transition-colors duration-300">
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-brand-mint text-brand-forest border border-brand-leaf/20">
                        {usp.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-brand-dark group-hover:text-brand-forest transition-colors">
                      {usp.title}
                    </h3>

                    <p className="text-slate-600 text-sm leading-relaxed">
                      {usp.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center text-xs font-bold text-brand-forest group-hover:text-brand-gold transition-colors">
                    <span>Guaranteed Execution</span>
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        {/* Special Trade Bridge Banner with TiltCard */}
        <div className="mt-12">
          <TiltCard max={8} glare={true} className="rounded-2xl bg-gradient-to-br from-brand-forest via-brand-emerald to-brand-dark text-white p-8 shadow-xl border border-brand-gold/40">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">Global Trade Partnership</span>
                <h3 className="text-2xl font-bold">Let&apos;s collaborate to build a long-term trade partnership.</h3>
                <p className="text-slate-300 text-sm">Direct procurement desk operating from bushes to port loading in Mtwara and Dar es Salaam.</p>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-bold text-brand-dark bg-gradient-to-r from-brand-gold to-brand-goldLight shadow-glow hover:scale-105 transition-transform shrink-0"
              >
                <span>Partner With Us</span>
                <ArrowUpRight className="w-5 h-5 ml-2" />
              </a>
            </div>
          </TiltCard>
        </div>

      </div>

      {/* Organic Wave Curve Transitioning into GlobalReach */}
      <WaveDivider color="#0B131E" position="bottom" flip />
    </section>
  );
}
