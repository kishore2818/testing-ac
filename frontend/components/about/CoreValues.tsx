'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, Zap, HardHat, CheckCircle } from 'lucide-react'

const values = [
  {
    title: 'Quality',
    icon: Zap,
    description: 'Industry-leading quality practices, standardized testing, and zero-defect execution in every electrical panel and system we deliver.'
  },
  {
    title: 'Safety',
    icon: HardHat,
    description: 'Deep-rooted commitment to safety for our engineering personnel, site workers, and your critical industrial assets.'
  },
  {
    title: 'Trust',
    icon: ShieldCheck,
    description: 'Transparent operations, clear communication, and trustworthy partnerships built over more than a decade of contracting.'
  },
  {
    title: 'Execution',
    icon: CheckCircle,
    description: 'Disciplined project management focused on strict adherence to technical specifications, scheduled milestones, and budget performance.'
  }
]

const differentiators = [
  'Proven expertise in end-to-end turnkey electrical solutions',
  'Deep-rooted commitment to safety and EOHS compliance',
  'Transparent operations and consultant BOQ alignment',
  'Industry-leading panel design and manufacturing standards',
  'Timely, disciplined, and reliable project delivery'
]

export default function CoreValues() {
  return (
    <section className="py-12 md:py-24 bg-white border-b border-[var(--border)]">
      <div className="site-container">
        
        <div className="text-left md:text-center mb-8 md:mb-16">
          <span className="font-inter text-xs font-bold text-[var(--primary)] uppercase tracking-wider block mb-1">Our Guiding Pillars</span>
          <h2 className="font-inter font-semibold text-3xl md:text-5xl text-[var(--black)] mb-3 md:mb-4">
            Quality | Safety | Trust | <span className="text-[var(--primary)]">Execution</span>
          </h2>
          <p className="font-inter text-[var(--black-muted)] max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            At Adler, these four core values guide every single engineering drawing, panel assembly, site installation, and commissioning milestone.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6 mb-12 md:mb-20">
          {values.map((v, i) => (
            <motion.div 
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col p-3.5 sm:p-6 bg-[var(--gray-bg)] border border-[var(--border)] rounded-xl hover:border-[var(--primary)] transition-all bg-white shadow-sm hover:shadow-xl relative overflow-hidden"
            >
              <div className="w-10 h-10 sm:w-14 sm:h-14 bg-[var(--primary-soft)] border border-[var(--primary)]/20 text-[var(--primary)] rounded-xl flex items-center justify-center mb-3 sm:mb-5 shrink-0 group-hover:scale-105 transition-transform duration-300">
                <v.icon className="w-5 h-5 sm:w-7 sm:h-7" strokeWidth={1.75} />
              </div>

              <div className="font-inter text-[var(--primary-dark)] font-bold uppercase text-[10px] sm:text-xs mb-0.5 sm:mb-1">
                0{i + 1}
              </div>

              <h4 className="font-inter font-bold text-sm sm:text-xl text-[var(--black)] mb-1 sm:mb-2">
                {v.title}
              </h4>

              <p className="font-inter text-[10px] sm:text-xs md:text-sm text-[var(--gray)] leading-tight sm:leading-relaxed flex-grow line-clamp-3 sm:line-clamp-none">
                {v.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="bg-[var(--black)] p-6 md:p-14 rounded-2xl text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)]/15 blur-[80px] -mr-32 -mt-32 pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="font-inter font-semibold text-2xl md:text-4xl mb-3 md:mb-4">
                What sets <span className="text-[var(--primary)]">Adler Contracts</span> apart?
              </h2>
              <p className="font-inter text-gray-300 max-w-lg text-xs md:text-sm leading-relaxed">
                Our core differentiators define our technical approach to electrical contracting and explain why industrial clients trust us with their critical power infrastructure.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {differentiators.map((diff, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3.5 bg-white/10 border border-white/15 p-3.5 rounded-xl"
                >
                  <div className="w-6 h-6 bg-[var(--primary)] rounded-md flex items-center justify-center text-white shrink-0">
                    <Zap size={14} />
                  </div>
                  <span className="font-inter font-semibold text-xs md:text-sm tracking-wide text-white">{diff}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
