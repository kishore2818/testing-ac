'use client'

import { motion } from 'framer-motion'
import { Rocket, PenTool, Settings, CheckCircle } from 'lucide-react'

const steps = [
  {
    title: 'Design & Planning',
    desc: 'Meticulous engineering designs and planning for optimum performance.',
    icon: PenTool
  },
  {
    title: 'Installation',
    desc: 'Robust and safe installation by highly skilled and safety-trained professionals.',
    icon: Settings
  },
  {
    title: 'Testing',
    desc: 'Rigorous third-party quality checks and simulation testing.',
    icon: CheckCircle
  },
  {
    title: 'Commissioning',
    desc: 'Final handover with comprehensive documentation and joint measurements.',
    icon: Rocket
  }
]

export default function EngineeringCore() {
  return (
    <section className="py-12 md:py-24 bg-[var(--black)] text-white">
      <div className="site-container">
        <div className="text-left md:text-center mb-8 md:mb-16">
          <h2 className="font-cormorant md:font-bebas text-4xl md:text-5xl mb-3 md:mb-4">Our Engineering <span className="text-[var(--primary)]">Methodology</span></h2>
          <p className="font-inter text-gray-400 max-w-2xl mx-auto">From blueprint to breadboard, our systematic approach ensures every project is delivered with speed and quality.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative p-5 md:p-8 border border-white/10 bg-white/5 rounded-[1.25rem] md:rounded-sm overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 font-bebas text-6xl text-white/5 group-hover:text-[var(--primary)]/10 transition-colors uppercase">
                0{i + 1}
              </div>
              <div className="text-[var(--primary)] mb-6">
                <step.icon size={40} strokeWidth={1.5} />
              </div>
              <h3 className="font-cormorant md:font-bebas text-2xl mb-2 md:mb-3 tracking-wide">{step.title}</h3>
              <p className="font-inter text-sm text-gray-400 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
