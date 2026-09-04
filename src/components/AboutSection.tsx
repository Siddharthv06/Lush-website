'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';
import { ENTERPRISE_INFO } from '@/data/products';
import KineticCenterBuild from '@/components/smoothui/components/kinetic-center-build';
import WaveDivider from './WaveDivider';

export default function AboutSection() {
  const regions = ENTERPRISE_INFO.partnerships;

  return (
    <section id="about" className="py-28 bg-[#FAF9F6] text-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Tag & Animated Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-forest/5 border border-brand-forest/15">
            <Building2 className="w-3.5 h-3.5 text-brand-emerald" />
            <span className="text-xs font-semibold text-brand-forest tracking-widest uppercase">
              About Our Enterprise
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-dark tracking-tight flex justify-center">
            <KineticCenterBuild phrases={["Lush Trade Corp Tanzania Limited"]} />
          </h2>

          <p className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed max-w-2xl mx-auto">
            A premier sourcing, processing, and export enterprise connecting Tanzania’s rich agricultural output to international processors, commodity houses, and industrial buyers worldwide.
          </p>

          <div className="w-16 h-0.5 bg-gradient-to-r from-brand-gold via-brand-emerald to-transparent mx-auto rounded-full mt-2" />
        </div>

        {/* Executive Overview: 2-Column Editorial Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-20 border-b border-slate-200/80"
        >
          {/* Left Lead Thesis */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-brand-emerald uppercase tracking-widest block">
              Core Identity & Roots
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-brand-dark leading-snug tracking-tight">
              Bridging farm-gate origins in southern Tanzania with processing capitals across the globe.
            </h3>
            <p className="text-slate-600 text-base leading-relaxed">
              Headquartered strategically in Mtwara with a corporate trading office in Dar es Salaam, Lush Trade Corp operates at the exact origin of East Africa’s highest-grade agricultural commodities. We work directly at the aggregation roots, ensuring complete provenance, transparent price discovery, and continuous supply stability.
            </p>
          </div>

          {/* Right Narrative Detail */}
          <div className="lg:col-span-6 space-y-6 text-slate-600 text-base leading-relaxed">
            <span className="text-xs font-bold text-brand-emerald uppercase tracking-widest block">
              Sourcing & Compliance
            </span>
            <p>
              Through deep partnerships anchored across <strong className="text-slate-900 font-semibold">{regions.join(', ')}</strong>, our field procurement teams supervise product quality right from the post-harvest stage. Every lot is graded, moisture-analyzed, and packed in export-certified packaging prior to dispatch.
            </p>
            <p>
              By leveraging primary maritime exits at Mtwara Port and Dar es Salaam Port, we offer buyers in India, Vietnam, the Middle East, and Europe direct shipment routes, reduced turnaround intervals, and full phytosanitary clearance compliance.
            </p>
          </div>
        </motion.div>

        {/* Corporate Pillars: 3-Column Minimalist Text Grid */}
        <div className="py-20 border-b border-slate-200/80">
          <div className="grid md:grid-cols-3 gap-10 lg:gap-12">
            
            {/* 01: Vision */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-3 pt-6 border-t-2 border-brand-emerald/40"
            >
              <div className="text-xs font-mono font-bold text-brand-emerald tracking-wider uppercase">
                01 • Vision
              </div>
              <h4 className="text-lg font-bold text-brand-dark tracking-tight">
                Global Trade Authority
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                To become Africa’s most trusted sourcing and export partner for agro and natural commodities, setting the standard for dependability and consistent grade execution.
              </p>
            </motion.div>

            {/* 02: Mission */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-3 pt-6 border-t-2 border-brand-gold"
            >
              <div className="text-xs font-mono font-bold text-brand-gold tracking-wider uppercase">
                02 • Mission
              </div>
              <h4 className="text-lg font-bold text-brand-dark tracking-tight">
                Value for Producers & Buyers
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                To connect Africa’s agricultural strength to the world through integrity, innovation, and mutually impactful partnerships that elevate producers and safeguard buyers.
              </p>
            </motion.div>

            {/* 03: Trade Principles */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-3 pt-6 border-t-2 border-brand-forest/60"
            >
              <div className="text-xs font-mono font-bold text-brand-forest tracking-wider uppercase">
                03 • Commitment
              </div>
              <h4 className="text-lg font-bold text-brand-dark tracking-tight">
                Integrity & Traceability
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Transparent contracts, lot-level traceability, certified laboratory reports, and seamless containerized shipping logistics with zero regulatory bottlenecks.
              </p>
            </motion.div>

          </div>
        </div>

        {/* Minimalist Key Operational Facts Bar */}
        <div className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-brand-dark tracking-tight">
              Mtwara & Dar
            </div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
              Dual Commercial Hubs
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-bold text-brand-dark tracking-tight">
              6 Key Regions
            </div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
              Direct Origin Belts
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-bold text-brand-dark tracking-tight">
              50–55+ LBS
            </div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
              Certified RCN Outturn
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-bold text-brand-dark tracking-tight">
              Global Ports
            </div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
              Asia • Europe • Middle East
            </div>
          </div>
        </div>

      </div>

      {/* Organic Wave Curve Transitioning into ProductsGrid */}
      <WaveDivider color="#0f172a" position="bottom" flip />
    </section>
  );
}
