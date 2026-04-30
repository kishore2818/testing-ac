'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { DraftingCompass, ShieldCheck, Zap, Diamond } from 'lucide-react'
import SectionLabel from '../shared/SectionLabel'
import ScrollReveal, { staggerContainer, fadeUp } from '../shared/ScrollReveal'

const reasons = [
  { icon: DraftingCompass, title: 'Meticulous Planning', desc: 'Every project begins with detailed design and execution strategies for precision delivery.' },
  { icon: ShieldCheck, title: 'Quality & Safety', desc: 'Uncompromising standards at every stage — from material selection to final commissioning.' },
  { icon: Zap, title: 'Speed of Delivery', desc: 'Streamlined project management ensures we meet the tightest deadlines without compromise.' },
  { icon: Diamond, title: 'Optimum Cost', desc: 'Transparent partnerships built on trust, delivering maximum value at competitive pricing.' },
]

export default function WhyUs() {
  return (
    <motion.section 
      initial={{ x: -150, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-[var(--gray-bg)] py-12 lg:py-24 h-full flex flex-col justify-center"
    >
      <div className="site-container max-w-2xl">
        {/* Centered Section Header */}
        <div className="text-left md:text-center flex flex-col items-start md:items-center mb-8 md:mb-16">
          <SectionLabel text="The Adler Advantage" color="accent" />
          <h2 className="font-cormorant md:font-bebas text-4xl md:text-6xl mb-3 md:mb-4 text-[var(--accent)] tracking-wider">
            WHY CHOOSE <span className="text-[var(--primary)]">US</span>?
          </h2>
          <p className="font-inter text-[var(--gray)] text-sm md:text-lg mb-6 md:mb-8 leading-relaxed max-w-2xl">
            Our reputation is built on meticulous planning, robust project management, and a relentless focus on quality, safety, and speed. We deliver turnkey electrical solutions from design to commissioning — on time and within budget.
          </p>
          <Link href="/about">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="w-full sm:w-auto bg-[var(--primary)] text-white font-poppins md:font-rajdhani uppercase tracking-[0.18em] font-semibold md:font-bold px-6 md:px-8 py-3 rounded-2xl md:rounded-sm shadow-lg shadow-[var(--primary-glow)]"
            >
              Learn More
            </motion.button>
          </Link>
        </div>

        {/* 2x2 Feature Grid */}
        <ScrollReveal animation={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto">
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.03, borderColor: 'var(--primary)' }}
              className="bg-white p-5 md:p-8 rounded-[1.25rem] md:rounded-sm shadow-sm border border-[var(--border)] transition-colors hover:bg-[var(--primary-soft)] cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-full bg-[var(--primary-glow)] flex items-center justify-center mb-6 border border-[var(--primary)]/20 group-hover:bg-[var(--primary)] group-hover:text-white transition-all text-[var(--primary)]">
                <r.icon size={24} strokeWidth={1.5} />
              </div>
              <h3 className="font-poppins md:font-rajdhani text-lg md:text-xl font-semibold md:font-bold uppercase mb-2 md:mb-3 text-[var(--accent)]">{r.title}</h3>
              <p className="font-inter text-sm text-[var(--gray)] line-clamp-3">
                {r.desc}
              </p>
            </motion.div>
          ))}
        </ScrollReveal>

      </div>
    </motion.section>
  )
}
