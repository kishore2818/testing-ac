'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, Zap, HardHat } from 'lucide-react'

const values = [
  {
    title: 'Quality',
    icon: Zap,
    description: 'Industry-leading quality practices embedded in every structure we deliver.'
  },
  {
    title: 'Safety',
    icon: HardHat,
    description: 'Deep-rooted commitment to safety for our people and your assets.'
  },
  {
    title: 'Trust',
    icon: ShieldCheck,
    description: 'Transparent operations and trustworthy partnerships built over a decade.'
  }
]

const differentiators = [
  'Proven expertise in end-to-end electrical solutions',
  'Deep-rooted commitment to safety',
  'Transparent operations built on trust',
  'Industry-leading quality practices',
  'Timely and reliable delivery'
]

export default function CoreValues() {
  return (
    <section className="py-12 md:py-24 bg-white">
      <div className="site-container">
        
        <div className="text-left md:text-center mb-8 md:mb-16">
          <h2 className="font-cormorant md:font-bebas text-4xl md:text-5xl text-[var(--accent)] mb-3 md:mb-4">Our Core Values</h2>
          <p className="font-inter text-[var(--black-muted)] max-w-2xl mx-auto text-sm md:text-base">
            At Adler, these values are not just guiding principles - they are embedded in every brick we lay and every structure we deliver.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-10 md:mb-24">
          {values.map((v, i) => (
            <motion.div 
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-5 md:p-8 border border-[var(--border)] rounded-[1.25rem] md:rounded-sm text-left md:text-center hover:shadow-lg transition-all"
            >
              <div className="inline-flex p-4 bg-[var(--primary-soft)] text-[var(--primary)] rounded-full mb-6 text-2xl">
                <v.icon size={32} />
              </div>
              <h4 className="font-poppins md:font-rajdhani text-xl md:text-2xl font-semibold md:font-bold uppercase mb-2 md:mb-3">{v.title}</h4>
              <p className="font-inter text-sm text-[var(--gray)]">{v.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-[var(--black)] p-6 md:p-16 rounded-[1.5rem] md:rounded-sm text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)]/10 blur-[80px] -mr-32 -mt-32" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="font-cormorant md:font-bebas text-3xl md:text-5xl mb-4 md:mb-6">What sets <span className="text-[var(--primary)]">Adler</span> apart?</h2>
              <p className="font-inter text-gray-400 mb-8 max-w-lg text-sm md:text-base">
                Our core differentiators define our approach to electrical contracting and are the reason our clients trust us with their most critical infrastructure.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {differentiators.map((diff, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl md:rounded-sm"
                >
                  <div className="w-6 h-6 bg-[var(--primary)] rounded-sm flex items-center justify-center text-white shrink-0">
                    <Zap size={14} />
                  </div>
                  <span className="font-rajdhani font-bold text-sm tracking-wide uppercase">{diff}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
