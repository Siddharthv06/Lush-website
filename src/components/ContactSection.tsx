'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, Building, Clock, ShieldCheck, Globe } from 'lucide-react';
import { ENTERPRISE_INFO } from '@/data/products';
import { TiltCard } from '@/components/motion/tilt-card';
import KineticCenterBuild from '@/components/smoothui/components/kinetic-center-build';
import WaveDivider from './WaveDivider';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    product: 'RAW CASHEW NUTS (RCN)',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        product: 'RAW CASHEW NUTS (RCN)',
        message: '',
      });
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 bg-brand-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-mint border border-brand-leaf/30">
            <Mail className="w-3.5 h-3.5 text-brand-leaf" />
            <span className="text-xs font-bold text-brand-forest uppercase tracking-wider">
              4. Contact Us
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight flex justify-center">
            <KineticCenterBuild phrases={["Head Office & Trade Desk"]} />
          </h2>

          <p className="text-slate-600 text-base font-semibold text-brand-forest">
            &quot;Let&apos;s collaborate to build a long-term trade partnership.&quot;
          </p>

          <div className="w-20 h-1 bg-gradient-to-r from-brand-gold to-brand-emerald mx-auto rounded-full" />
        </div>

        {/* 2-Column Layout: Head Office Card + Contact Form */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">

          {/* Head Office Information Column with 3D Tilt Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <TiltCard max={5} glare={true} className="bg-brand-forest text-white rounded-2xl p-8 shadow-xl border border-brand-gold/30">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-gold px-3 py-1 bg-white/10 rounded-full inline-block mb-4">
                Head Office
              </span>

              <h3 className="text-2xl font-extrabold text-white mb-2">
                {ENTERPRISE_INFO.name}
              </h3>

              <p className="text-slate-300 text-xs mb-8">
                Official Registered Export-Import Headquarters in Southern Tanzania.
              </p>

              {/* Verified Contact Items */}
              <div className="space-y-6">

                {/* Physical Address */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/20 border border-brand-gold/40 flex items-center justify-center text-brand-gold shrink-0 mt-1">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-gold uppercase tracking-wider">Address</h4>
                    <p className="text-sm font-semibold text-white mt-1">
                      {ENTERPRISE_INFO.headOffice.address}
                    </p>
                    <p className="text-xs text-slate-300">
                      {ENTERPRISE_INFO.headOffice.poBox}, {ENTERPRISE_INFO.headOffice.city}, {ENTERPRISE_INFO.headOffice.country}
                    </p>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/20 border border-brand-gold/40 flex items-center justify-center text-brand-gold shrink-0 mt-1">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-gold uppercase tracking-wider">Email</h4>
                    <a
                      href={`mailto:${ENTERPRISE_INFO.email}`}
                      className="text-sm font-bold text-white hover:text-brand-gold transition-colors block mt-1"
                    >
                      {ENTERPRISE_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Phone Contact */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/20 border border-brand-gold/40 flex items-center justify-center text-brand-gold shrink-0 mt-1">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-gold uppercase tracking-wider">Phone</h4>
                    <a
                      href={`tel:${ENTERPRISE_INFO.phone.replace(/\s+/g, '')}`}
                      className="text-sm font-bold text-white hover:text-brand-gold transition-colors block mt-1"
                    >
                      {ENTERPRISE_INFO.phone}
                    </a>
                  </div>
                </div>

                {/* Website */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/20 border border-brand-gold/40 flex items-center justify-center text-brand-gold shrink-0 mt-1">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-gold uppercase tracking-wider">Website</h4>
                    <span className="text-sm font-bold text-white block mt-1">
                      {ENTERPRISE_INFO.website}
                    </span>
                  </div>
                </div>

                {/* Dual Presence Note */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center space-x-2">
                    <Building className="w-4 h-4 text-brand-gold" />
                    <span>Presence: Dar es Salaam & Mtwara, Tanzania</span>
                  </div>
                  <ShieldCheck className="w-4 h-4 text-brand-gold" />
                </div>

              </div>
            </TiltCard>
          </motion.div>

          {/* Contact Inquiry Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <TiltCard max={6} glare={false} className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xl">

              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-dark">Thank You for Your Message</h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto">
                    &quot;Let&apos;s collaborate to build a long-term trade partnership.&quot; Our team will respond to your inquiry promptly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center px-6 py-2.5 rounded-xl bg-brand-forest text-white text-xs font-bold hover:bg-brand-emerald transition-colors mt-4"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">

                  <div className="border-b border-slate-100 pb-4 mb-2">
                    <h3 className="text-xl font-bold text-brand-dark">Send a Sourcing or Export Inquiry</h3>
                    <p className="text-xs text-slate-500 mt-1">Fields: Name, Email, Phone, Product Selection, Message.</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-emerald focus:bg-white transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        placeholder="yourname@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-emerald focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        placeholder="+255..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-emerald focus:bg-white transition-all"
                      />
                    </div>

                    {/* Product of Interest */}
                    <div>
                      <label htmlFor="product" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Product
                      </label>
                      <select
                        id="product"
                        value={formData.product}
                        onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-emerald focus:bg-white transition-all"
                      >
                        <option value="RAW CASHEW NUTS (RCN)">RAW CASHEW NUTS (RCN)</option>
                        <option value="CASHEW NUT KERNELS">CASHEW NUT KERNELS</option>
                        <option value="PULSES">PULSES (Chickpeas, Pigeon Peas, Kidney Beans, Green Mung Beans)</option>
                        <option value="COFFEE">COFFEE (Arabica & Robusta)</option>
                        <option value="TIMBER">TIMBER (Teak Wood & Pine Wood)</option>
                        <option value="LIQUOR & ETHANOL IMPORTS">LIQUOR & ETHANOL IMPORTS</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      placeholder="Specify your trade inquiry, metric tons required, or contract specifications..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-emerald focus:bg-white transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center py-4 px-6 rounded-xl font-bold text-brand-dark bg-gradient-to-r from-brand-gold via-yellow-400 to-brand-goldLight shadow-glow hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center">
                        <Clock className="w-5 h-5 animate-spin mr-2" /> Submitting...
                      </span>
                    ) : (
                      <span className="inline-flex items-center">
                        <span>Partner With Us</span>
                        <Send className="w-4 h-4 ml-2" />
                      </span>
                    )}
                  </button>

                </form>
              )}

            </TiltCard>
          </motion.div>

        </div>

      </div>

      {/* Organic Wave Curve Transitioning into Footer */}
      <WaveDivider color="#051811" position="bottom" />
    </section>
  );
}
