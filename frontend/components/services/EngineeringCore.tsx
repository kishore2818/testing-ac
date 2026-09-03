'use client'

import { motion } from 'framer-motion'
import { Search, Compass, ShoppingCart, Cpu, Wrench, ShieldAlert, CheckCircle2, ShieldCheck } from 'lucide-react'

const steps = [
  {
    num: '01',
    title: 'Site Survey & Requirement Study',
    desc: 'On-site load analysis, single line diagram verification, and technical requirement gathering.',
    icon: Search
  },
  {
    num: '02',
    title: 'Engineering & Design',
    desc: 'Precision CAD drafting, busbar sizing, fault current calculations, and panel layout design.',
    icon: Compass
  },
  {
    num: '03',
    title: 'BOQ & Procurement',
    desc: 'Detailed Bill of Quantities finalization and sourcing of tier-1 electrical switchgears.',
    icon: ShoppingCart
  },
  {
    num: '04',
    title: 'Panel Manufacturing',
    desc: 'In-house assembly, busbar fabrication, wiring, and factory acceptance testing (FAT).',
    icon: Cpu
  },
  {
    num: '05',
    title: 'Installation',
    desc: 'Site equipment positioning, HT/LT cable laying, tray routing, and grounding setup.',
    icon: Wrench
  },
  {
    num: '06',
    title: 'Testing',
    desc: 'Insulation testing, hi-pot testing, protective relay calibration, and earth grid resistance audits.',
    icon: ShieldAlert
  },
  {
    num: '07',
    title: 'Commissioning',
    desc: 'Phased energization, load trial runs, system balancing, and final safety clearance.',
    icon: CheckCircle2
  },
  {
    num: '08',
    title: 'Handover & AMC',
    desc: 'As-built documentation, operator training, warranty handover, and ongoing AMC support.',
    icon: ShieldCheck
  }
]

export default function EngineeringCore() {
  return (
    <section className="py-12 md:py-24 bg-[var(--black)] text-white">
      <div className="site-container">
        
        <div className="text-left md:text-center mb-10 md:mb-16">
          <span className="font-inter text-xs font-bold text-[var(--primary)] uppercase tracking-wider block mb-1">Methodology</span>
          <h2 className="font-inter font-semibold text-3xl md:text-5xl text-white mb-3 md:mb-4">
            Our 8-Step Engineering <span className="text-[var(--primary)]">Execution Process</span>
          </h2>
          <p className="font-inter text-gray-300 max-w-2xl mx-auto text-xs md:text-sm leading-relaxed">
            From initial site survey to final handover and AMC, our structured 8-step methodology ensures zero-downtime execution.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
          {steps.map((step, i) => (
            <motion.div 
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="relative p-3.5 sm:p-6 border border-white/15 bg-white/5 rounded-xl overflow-hidden group flex flex-col h-full hover:border-[var(--primary)] transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <div className="p-2 sm:p-2.5 bg-[var(--primary)]/20 border border-[var(--primary)]/30 rounded-lg text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
                  <step.icon className="w-4 h-4 sm:w-6 sm:h-6" strokeWidth={1.75} />
                </div>
                <span className="font-inter font-bold text-[10px] sm:text-xs text-[var(--primary)] bg-white/10 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md">
                  {step.num}
                </span>
              </div>

              <h3 className="font-inter font-bold text-xs sm:text-base md:text-lg mb-1 sm:mb-2 text-white group-hover:text-[var(--primary)] transition-colors leading-snug">
                {step.title}
              </h3>

              <p className="font-inter text-[10px] sm:text-xs text-gray-300 leading-tight sm:leading-relaxed flex-grow line-clamp-3 sm:line-clamp-none">
                {step.desc}
              </p>

              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute bottom-2 right-3 text-white/20 font-mono text-xs">
                  ↓ step {i + 2}
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
