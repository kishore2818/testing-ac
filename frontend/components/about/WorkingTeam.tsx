'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ShieldCheck, Zap, Clock, Sparkles, Award } from 'lucide-react'
import SectionLabel from '../shared/SectionLabel'

const differentiators = [
  {
    icon: Zap,
    title: 'Turnkey Electrical Solutions',
    desc: 'Proven expertise in end-to-end industrial electrical engineering, power distribution, panels, and HT/LT infrastructure.'
  },
  {
    icon: ShieldCheck,
    title: 'Deep-Rooted Safety Culture',
    desc: 'Zero-compromise EOHS standards, Safe Work Method Statements (SWMS), and certified PPE protocols on every site.'
  },
  {
    icon: Award,
    title: 'Transparent Operations & Trust',
    desc: 'Clear technical documentation, honest project milestones, and ethical engineering partnerships.'
  },
  {
    icon: Clock,
    title: 'Disciplined Timely Delivery',
    desc: 'Rigorous schedule tracking, resource optimization, and committed handovers within budget.'
  },
  {
    icon: Sparkles,
    title: 'Innovative Engineering',
    desc: 'Modern energy-efficient layouts, smart panel distribution, and precision industrial commissioning.'
  }
]

export default function WorkingTeam() {
  return (
    <section className="py-12 md:py-24 bg-white border-b border-[var(--border)] overflow-hidden">
      <div className="site-container">
        
        {/* Section Header */}
        <div className="flex flex-col items-start md:items-center text-left md:text-center mb-8 md:mb-16">
          <SectionLabel text="The People Behind Our Quality" color="accent" />
          <h2 className="font-inter font-semibold text-[26px] sm:text-[34px] lg:text-[40px] leading-tight text-[var(--black)] mt-2">
            Our Core Differentiators & <span className="text-[var(--primary)]">Engineering Team</span>
          </h2>
          <p className="font-inter text-[var(--gray)] text-sm md:text-base mt-3 max-w-2xl leading-relaxed">
            What sets Adler apart is our dedicated engineering workforce, proven technical leadership, and relentless commitment to safety and quality on every site.
          </p>
        </div>

        {/* Top Feature: Working Team Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden border border-[var(--border)] shadow-xl mb-10 md:mb-16 bg-[var(--black)]"
        >
          <div className="relative h-56 sm:h-80 md:h-[400px] w-full">
            <Image 
              src="/images/team/working-team-banner.png" 
              alt="Adler Contracts Working Engineering Team" 
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 text-white flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="max-w-xl">
                <span className="inline-block px-3 py-1 rounded-full bg-[var(--primary)] text-white font-inter text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2">
                  Class I Certified Team
                </span>
                <h3 className="font-inter font-bold text-lg sm:text-2xl md:text-3xl text-white">
                  Field Engineers & Master Electricians
                </h3>
                <p className="font-inter text-xs sm:text-sm text-white/80 mt-1">
                  Experienced technical crew executing complex industrial and commercial power infrastructure.
                </p>
              </div>

              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--primary)] animate-pulse" />
                <span className="font-inter text-xs sm:text-sm font-semibold text-white">100% On-Site Safety Compliance</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Differentiators Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {differentiators.map((diff, idx) => (
            <motion.div
              key={diff.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ y: -4, borderColor: 'var(--primary)' }}
              className="bg-[var(--gray-bg)] p-5 md:p-6 rounded-xl border border-[var(--border)] flex flex-col h-full shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-[var(--primary-soft)] text-[var(--primary)] flex items-center justify-center mb-4 border border-[var(--primary)]/20">
                <diff.icon className="w-5 h-5" />
              </div>
              <h4 className="font-inter font-bold text-base md:text-lg text-[var(--black)] mb-2">
                {diff.title}
              </h4>
              <p className="font-inter text-xs md:text-sm text-[var(--gray)] leading-relaxed mt-auto">
                {diff.desc}
              </p>
            </motion.div>
          ))}

          {/* Differentiator Highlight Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-[var(--accent)] to-[#0c1f38] text-white p-5 md:p-6 rounded-xl flex flex-col justify-between h-full shadow-md"
          >
            <div>
              <span className="font-inter text-[10px] font-bold uppercase tracking-widest text-[var(--primary)]">
                Our Guarantee
              </span>
              <h4 className="font-inter font-bold text-lg md:text-xl mt-1 text-white">
                Zero-Defect Handover
              </h4>
              <p className="font-inter text-xs text-white/80 mt-2 leading-relaxed">
                Every installation undergoes multi-stage Megger testing, load balancing, and third-party verification before handover.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-[var(--primary)]">
              <span>Class I License Verified</span>
              <span>✦</span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
