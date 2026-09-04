'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BLOG_POSTS } from '@/data/products';
import { BookOpen, Calendar, Clock, ArrowRight, X } from 'lucide-react';
import { TiltCard } from '@/components/motion/tilt-card';
import KineticCenterBuild from '@/components/smoothui/components/kinetic-center-build';
import WaveDivider from './WaveDivider';

export default function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<typeof BLOG_POSTS[0] | null>(null);

  return (
    <section id="insights" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-mint border border-brand-leaf/30">
            <BookOpen className="w-3.5 h-3.5 text-brand-leaf" />
            <span className="text-xs font-bold text-brand-forest uppercase tracking-wider">
              Market Strategy & Insights
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight flex justify-center">
            <KineticCenterBuild phrases={["Industry Intelligence & Commodity Blogs"]} />
          </h2>

          <p className="text-slate-600 text-base">
            Stay informed with expert trade reports, harvesting season updates, and market intelligence from East Africa.
          </p>

          <div className="w-20 h-1 bg-gradient-to-r from-brand-gold to-brand-emerald mx-auto rounded-full" />
        </div>

        {/* Blog Cards Grid with 3D Tilt Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <TiltCard
                max={5}
                glare={true}
                className="bg-brand-cream rounded-2xl p-8 border border-slate-200 shadow-md hover:shadow-xl h-full flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="px-3 py-1 bg-brand-forest text-brand-gold font-bold rounded-full">
                      {post.category}
                    </span>
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1 text-brand-gold" />{post.date}</span>
                      <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1 text-brand-gold" />{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-brand-dark group-hover:text-brand-forest transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed">
                    {post.summary}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {post.hashtags.map((tag) => (
                      <span key={tag} className="text-xs font-semibold text-brand-leaf bg-brand-mint px-2.5 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/80">
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="inline-flex items-center text-xs font-bold text-brand-forest hover:text-brand-gold transition-colors"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </button>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Article Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/80 backdrop-blur-md">
          <div className="bg-white max-w-2xl w-full rounded-2xl p-8 border border-slate-200 shadow-2xl relative space-y-6">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="px-3 py-1 bg-brand-mint text-brand-forest font-bold text-xs rounded-full">
                {selectedPost.category}
              </span>
              <h3 className="text-2xl font-extrabold text-brand-dark">{selectedPost.title}</h3>
              <p className="text-xs text-slate-400">{selectedPost.date} • {selectedPost.readTime}</p>
            </div>

            <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-line border-t border-b border-slate-100 py-4">
              {selectedPost.content}
            </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                {selectedPost.hashtags.map(tag => (
                  <span key={tag} className="text-xs text-brand-leaf font-semibold">{tag}</span>
                ))}
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="px-5 py-2 rounded-xl bg-brand-forest text-white text-xs font-bold"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Organic Wave Curve Transitioning into ContactSection */}
      <WaveDivider color="#FAF9F6" position="bottom" flip />
    </section>
  );
}
