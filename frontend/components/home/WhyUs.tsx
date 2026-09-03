'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Layers, Factory, ShieldCheck, Clock } from 'lucide-react'
import SectionLabel from '../shared/SectionLabel'
import ScrollReveal, { staggerContainer, fadeUp } from '../shared/ScrollReveal'

const reasons = [
  { 
    num: '01',
    icon: Layers, 
    title: 'End-to-End Execution', 
    pipeline: 'Engineering → Procurement → Installation → Testing → Commissioning',
    desc: 'Single-source responsibility for complete electrical infrastructure projects.' 
  },
  { 
    num: '02',
    icon: Factory, 
    title: 'Industrial Expertise', 
    pipeline: 'Manufacturing • Aerospace • Mobility • Processing',
    desc: 'Deep domain experience in high-demand, mission-critical environments.' 
  },
  { 
    num: '03',
    icon: ShieldCheck, 
    title: 'Safety & Quality', 
    pipeline: 'Quality Checks • Safety Procedures • Trained Site Teams',
    desc: 'Strict adherence to ISO/IEEE standards and EOHS safety protocols.' 
  },
  { 
    num: '04',
    icon: Clock, 
    title: 'Reliable Delivery', 
    pipeline: 'Disciplined PM • Schedule Focus • Cost Control',
    desc: 'Predictable execution committed to performance, safety, and budget.' 
  },
]

export default function WhyUs() {
  return (
    <section className="bg-[var(--gray-bg)] py-12 lg:py-24 border-b border-[var(--border)]">
      <div className="site-container">
        
        {/* Section Header */}
        <div className="text-left md:text-center flex flex-col items-start md:items-center mb-8 md:mb-14">
          <SectionLabel text="The Adler Advantage" color="accent" />
          <h2 className="font-inter font-semibold text-[26px] sm:text-[34px] lg:text-[40px] leading-tight text-[var(--black)] mt-2">
            Why Industrial Clients <span className="text-[var(--primary)]">Choose Adler</span>
          </h2>
          <p className="font-inter text-[var(--gray)] text-sm md:text-base mt-3 max-w-2xl leading-relaxed">
            Class I electrical contracting built on engineering rigor, uncompromising safety, and disciplined site project management.
          </p>
        </div>

        {/* 4 Feature Grid */}
        <ScrollReveal animation={staggerContainer} className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
          {reasons.map((r) => (
            <motion.div
              key={r.num}
              variants={fadeUp}
              whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.06)' }}
              className="bg-white p-3 sm:p-5 md:p-6 rounded-xl shadow-sm border border-[var(--border)] transition-all hover:border-[var(--primary)] flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg bg-[var(--primary-soft)] flex items-center justify-center text-[var(--primary)] border border-[var(--primary)]/20">
                  <r.icon className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.75} />
                </div>
                <span className="font-inter font-bold text-[10px] sm:text-xs text-[var(--primary-dark)] bg-[var(--primary-soft)] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md">
                  {r.num}
                </span>
              </div>

              <h3 className="font-inter text-xs sm:text-base md:text-lg font-bold text-[var(--black)] mb-1 sm:mb-2 leading-tight">
                {r.title}
              </h3>

              <div className="font-inter text-[9px] sm:text-[11px] font-semibold text-[var(--primary-dark)] bg-[var(--gray-bg)] p-1.5 sm:p-2 rounded-md mb-2 sm:mb-3 border border-[var(--border)] line-clamp-2">
                {r.pipeline}
              </div>

              <p className="font-inter text-[10px] sm:text-xs md:text-sm text-[var(--gray)] leading-tight sm:leading-relaxed mt-auto line-clamp-3">
                {r.desc}
              </p>
            </motion.div>
          ))}
        </ScrollReveal>

        <div className="mt-10 md:mt-12 text-center">
          <Link href="/about">
            <motion.button 
              whileHover={{ y: -2 }}
              className="px-7 py-3 bg-[var(--primary)] text-white font-inter font-bold text-sm rounded-lg shadow-md hover:bg-[var(--primary-dark)] transition-all"
            >
              Learn More About Our Company →
            </motion.button>
          </Link>
        </div>

      </div>
    </section>
  )
}
