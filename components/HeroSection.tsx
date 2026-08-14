// components/HeroSection.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  badgeText?: string;
  title?: string;
  subtitle?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  images?: string[];
  intervalMs?: number;
}

const defaultImages = [
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1920&q=80',
];

export default function HeroSection({
  badgeText = 'Transforming Culture Through Truth',
  subtitle = 'Crafting 5-minute news insights and daily devotionals that equip believers to lead boldly, pursue justice, and drive progress in every sphere of society.',
  primaryCtaLabel = 'Explore Daily News',
  primaryCtaHref = '/daily-news',
  secondaryCtaLabel = 'About Our Mission',
  secondaryCtaHref = '/about',
  images = defaultImages,
  intervalMs = 5000,
}: HeroSectionProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [images, intervalMs]);

  return (
    <section className="w-full bg-section-background text-section-text border-b border-text/20 py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-8 font-body antialiased relative overflow-hidden min-h-[75vh] flex items-center">
      
      {/* 1. Background Image Crossfade Slider */}
      <div className="absolute inset-0 z-0">
        {images.map((imgUrl, index) => (
          <div
            key={imgUrl}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
            style={{
              backgroundImage: `url(${imgUrl})`,
              transitionProperty: 'opacity, transform',
              transitionDuration: '1000ms, 6000ms',
            }}
          />
        ))}

        {/* Dark Editorial Overlay Gradient for Contrast & Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-section-background via-section-background/90 to-section-background/60" />
      </div>

      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-button-hover z-20" />

      {/* 2. Main Content Container */}
      <div className="max-w-6xl mx-auto flex flex-col items-start justify-center relative z-10 w-full">
        
        {/* Category / Badge Line */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 backdrop-blur-sm mb-6 rounded-none">
          <Sparkles className="w-3.5 h-3.5 text-button-hover" />
          <span className="text-[10px] md:text-sm font-heading text-heading tracking-widest text-button-hover">
            {badgeText}
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-2xl md:text-5xl font-heading font-black tracking-tight text-white/70 leading-tight max-w-4xl mb-6 drop-shadow-sm">
          Faith-Driven Media <br />for Modern Culture Shapers
        </h1>

        {/* Subtitle Body Copy */}
        <p className="text-[10px] md:text-sm text-section-text/60 leading-relaxed max-w-2xl mb-8 font-body">
          {subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-8">
          <Link
            href={primaryCtaHref}
            className="inline-flex items-center justify-center gap-2 bg-button-hover hover:bg-white text-text font-heading text-[10px] md:text-sm tracking-widest px-8 py-3.5 transition-colors duration-200 rounded-none cursor-pointer"
          >
            {primaryCtaLabel} <ArrowRight className="w-4 h-4" />
          </Link>

          {secondaryCtaLabel && (
            <Link
              href={secondaryCtaHref}
              className="inline-flex items-center justify-center border border-white/30 hover:border-button-hover text-white hover:text-button-hover font-heading text-[10px] md:text-sm tracking-widest px-8 py-3.5 transition-colors duration-200 rounded-none bg-black/20 backdrop-blur-sm cursor-pointer"
            >
              {secondaryCtaLabel}
            </Link>
          )}
        </div>

        {/* Slide Indicators / Dots */}
        {images.length > 1 && (
          <div className="flex items-center gap-2 mt-4">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 transition-all duration-300 rounded-none cursor-pointer ${
                  idx === currentImageIndex
                    ? 'w-8 bg-button-hover'
                    : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}