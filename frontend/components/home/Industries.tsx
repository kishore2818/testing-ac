'use client'

import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'
import SectionLabel from '../shared/SectionLabel'
import ScrollReveal, { staggerContainer, fadeUp } from '../shared/ScrollReveal'
import Link from 'next/link'

const industries = [
  { image: '/images/industries/aerospace.png', name: 'Aerospace', desc: 'Precision electrical infrastructure for aerospace manufacturing and assembly.' },
  { image: '/images/industries/manufacturing.png', name: 'Industrial Manufacturing', desc: 'End-to-end solutions for large-scale production and processing facilities.' },
  { image: '/images/industries/food-beverage.png', name: 'Food & Beverage', desc: 'Specialized cold storage and food processing electrical systems.' },
  { image: '/images/industries/construction.png', name: 'Real Estate & Construction', desc: 'Residential townships, luxury villas, and commercial complexes.' },
  { image: '/images/industries/institutional.png', name: 'Institutional', desc: 'Schools, colleges, and campus infrastructure electrification.' },
  { image: '/images/industries/hospitality.png', name: 'Hospitality', desc: 'Resorts, hotels, and premium hospitality electrical solutions.' },
]

export default function Industries() {
  return (
    <section className="bg-[var(--gray-bg)] py-14 md:py-32 border-y border-[var(--border)]">
      <div className="site-container">

        <div className="text-left md:text-center flex flex-col items-start md:items-center mb-8 md:mb-16">
          <SectionLabel text="Industries We Serve" color="accent" />
          <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-3 md:gap-4">
            <Zap className="w-8 h-8 md:w-10 md:h-10 text-[var(--primary)] animate-pulse mb-1 md:mb-0" />
            <h2 className="font-cormorant md:font-bebas text-4xl md:text-6xl uppercase text-[var(--accent)] tracking-wider">
              Powering <span className="text-[var(--primary)] text-shadow-glow">Every Sector</span>
            </h2>
          </div>
        </div>

        <ScrollReveal animation={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {industries.map((ind, idx) => (
            <motion.div
              key={ind.name}
              variants={fadeUp}
              whileHover={{ y: -10, scale: 1.02, borderColor: 'var(--primary)' }}
              className={`group relative bg-white border border-[var(--border)] overflow-hidden rounded-[1.25rem] md:rounded-sm transition-all duration-300 min-h-[300px] md:min-h-[340px] flex-col justify-end shadow-sm hover:shadow-xl ${idx >= 2 ? 'hidden md:flex' : 'flex'}`}
            >
              {/* Background Image with slight darkening for contrast at the top */}
              <div 
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-700 ease-in-out transform group-hover:scale-105"
                style={{ backgroundImage: `url(${ind.image})` }}
              />
              
              {/* Solid White to Transparent Gradient Overlay */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-white via-white/95 to-black/30 group-hover:to-black/10 transition-colors duration-500" />

              <div className="relative z-20 p-6 md:p-8 mt-auto">
                <h3 className="font-poppins md:font-rajdhani text-xl md:text-2xl font-semibold md:font-bold uppercase tracking-[0.08em] md:tracking-wider mb-2 text-[var(--accent)] group-hover:text-[var(--primary)] transition-colors duration-300">
                  {ind.name}
                </h3>
                <p className="font-inter text-sm text-[var(--gray)] group-hover:text-[var(--black)] transition-colors duration-300">
                  {ind.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </ScrollReveal>

        <div className="mt-8 md:mt-12 text-left md:text-center block md:hidden">
          <Link href="/services">
            <motion.button
              whileHover={{ y: -2 }}
              className="w-full sm:w-auto px-8 md:px-10 py-4 bg-[var(--primary)] text-white font-poppins font-semibold tracking-[0.18em] uppercase rounded-full shadow-xl hover:shadow-2xl transition-all text-xs"
            >
              Explore More Sectors →
            </motion.button>
          </Link>
        </div>

      </div>
    </section>
  )
}
