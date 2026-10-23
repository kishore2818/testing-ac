'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Shield, Layers, Award, TrendingUp } from 'lucide-react'
import SectionLabel from '../shared/SectionLabel'
import ScrollReveal, { staggerContainer, fadeUp } from '../shared/ScrollReveal'

const differentiators = [
  { 
    num: '01',
    icon: Shield, 
    title: 'Licensed up to 33 kV', 
    pipeline: 'Class I Licence 1CL202315BGM · Grade I Supervisor',
    desc: 'Class I contractor licence for electrical works up to and including 33 kV, overseen by a continuous Grade I licensed supervisor.' 
  },
  { 
    num: '02',
    icon: Layers, 
    title: 'End-to-End Scope', 
    pipeline: 'Substations • HT/LT Panels • Cabling • Lighting',
    desc: 'HT/LT works, DP structures, substations, panels, cabling and plant lighting, all executed under a single turnkey contract.' 
  },
  { 
    num: '03',
    icon: Award, 
    title: 'CEIG Approvals Secured', 
    pipeline: 'Electrical Inspectorate · Statutory Energisation',
    desc: 'Proven track record with the Electrical Inspectorate, securing approvals for high-voltage aerospace installations in Bengaluru.' 
  },
  { 
    num: '04',
    icon: TrendingUp, 
    title: 'Proven at Scale', 
    pipeline: '14 Projects · ₹10.7 Cr+ Value · 27 MVA+ Capacity',
    desc: '14 projects delivered and ongoing since 2024, totalling ₹10.7 Cr+ in project value and 27 MVA+ capacity across Karnataka and Tamil Nadu.' 
  },
]

export default function WhyUs() {
  return (
    <section className="bg-[var(--gray-bg)] py-12 lg:py-24 border-b border-[var(--border)]">
      <div className="site-container">
        
        {/* Section Header */}
        <div className="text-left md:text-center flex flex-col items-start md:items-center mb-8 md:mb-14">
          <SectionLabel text="Core Differentiators" color="accent" />
          <h2 className="font-inter font-semibold text-[26px] sm:text-[34px] lg:text-[40px] leading-tight text-[var(--black)] mt-2">
            What Sets <span className="text-[var(--primary)]">Adler Apart</span>
          </h2>
          <p className="font-inter text-[var(--gray)] text-sm md:text-base mt-3 max-w-2xl leading-relaxed">
            Statutory Class I licensing, verifiable 33 kV capability, CEIG track record, and multi-crore infrastructure execution at scale.
          </p>
        </div>

        {/* 4 Differentiator Cards */}
        <ScrollReveal animation={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {differentiators.map((r) => (
            <motion.div
              key={r.num}
              variants={fadeUp}
              whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.06)' }}
              className="bg-white p-4 sm:p-5 md:p-6 rounded-2xl shadow-sm border border-[var(--border)] transition-all hover:border-[var(--primary)] flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--primary-soft)] flex items-center justify-center text-[var(--primary)] border border-[var(--primary)]/20">
                  <r.icon className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <span className="font-inter font-bold text-[10px] sm:text-xs text-[var(--primary-dark)] bg-[var(--primary-soft)] px-2.5 py-1 rounded-md">
                  {r.num}
                </span>
              </div>

              <h3 className="font-inter text-base sm:text-lg font-bold text-[var(--black)] mb-2 leading-snug">
                {r.title}
              </h3>

              <div className="font-inter text-[10px] sm:text-[11px] font-semibold text-[var(--primary-dark)] bg-[var(--gray-bg)] p-2 rounded-lg mb-3 border border-[var(--border)]">
                {r.pipeline}
              </div>

              <p className="font-inter text-xs sm:text-sm text-[var(--gray)] leading-relaxed mt-auto">
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
