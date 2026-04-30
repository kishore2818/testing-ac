'use client'

import React from 'react'

export default function PageHero({ 
  title, 
  subtitle, 
  image = "/images/hero/panel-2.jpg" 
}: { 
  title: string; 
  subtitle?: string; 
  image?: string; 
}) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border)] pt-24 pb-10 md:pt-[140px] md:pb-[80px]">
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* Dark translucent overlay instead of solid white */}
        <div className="absolute inset-0 bg-black/70 md:bg-black/60" />
        {/* Radial tint to preserve the brand glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--primary-glow)_0%,transparent_70%)] opacity-50" />
      </div>

      <div className="site-container relative z-10 text-left md:text-center">
        <div className="max-w-3xl">
          <h1 className="font-cormorant md:font-bebas text-[clamp(2.4rem,10vw,4.5rem)] text-white tracking-[0.02em] md:tracking-[0.04em] leading-[0.95] mb-3 md:mb-4">
            {title} <span className="text-[var(--primary)]">.</span>
          </h1>
          {subtitle && (
            <p className="font-inter text-white/85 max-w-2xl md:mx-auto text-sm md:text-lg leading-relaxed font-medium">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
