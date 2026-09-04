'use client';

import React, { useState } from 'react';
import { PRODUCTS_DATA, Product } from '@/data/products';
import ProductModal from './ProductModal';
import ProductSpotlightCard from './ProductSpotlightCard';
import KineticCenterBuild from '@/components/smoothui/components/kinetic-center-build';
import { Layers } from 'lucide-react';
import WaveDivider from './WaveDivider';

export default function ProductsGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);

  const categories = ['All', 'Agro-Commodities', 'Timber'];

  const filteredProducts = selectedCategory === 'All'
    ? PRODUCTS_DATA
    : PRODUCTS_DATA.filter(p => p.category === selectedCategory);

  return (
    <section id="products" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-emerald/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle KokonutUI Ambient Dot Grid for depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-forest border border-brand-gold/30">
            <Layers className="w-3.5 h-3.5 text-brand-gold" />
            <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">
              2. Products Portfolio
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex justify-center">
            <KineticCenterBuild phrases={["Our Core Product Offerings"]} />
          </h2>

          <p className="text-slate-300 text-base">
            Detailed specifications, certified origins, and rigorous quality control parameters for international buyers.
          </p>

          <div className="w-20 h-1 bg-gradient-to-r from-brand-gold to-brand-emerald mx-auto rounded-full" />
        </div>

        {/* Category Tabs Filter */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 border ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-brand-gold to-brand-goldLight text-brand-dark border-brand-gold shadow-glow scale-105'
                  : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid with Magnetic 3D Tilt, Aurora Glow & Focus-Dim Siblings */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductSpotlightCard
              key={product.id}
              product={product}
              dimmed={hoveredProductId !== null && hoveredProductId !== product.id}
              onHoverStart={() => setHoveredProductId(product.id)}
              onHoverEnd={() => setHoveredProductId(null)}
              onSelect={(p) => setActiveModalProduct(p)}
            />
          ))}
        </div>

      </div>

      {/* Product Spec Modal */}
      <ProductModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
      />

      {/* Organic Wave Curve Transitioning into USPsSection */}
      <WaveDivider color="#FAF9F6" position="bottom" />
    </section>
  );
}
