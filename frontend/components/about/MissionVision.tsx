'use client'

import { motion } from 'framer-motion'
import { Target, Eye } from 'lucide-react'

export default function MissionVision() {
  return (
    <section className="py-12 md:py-24 bg-[var(--gray-bg)]">
      <div className="site-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-6 md:p-12 rounded-[1.5rem] md:rounded-sm shadow-sm border-l-4 border-[var(--primary)]"
          >
            <div className="w-16 h-16 bg-[var(--primary-soft)] rounded-full flex items-center justify-center mb-6 text-[var(--primary)]">
              <Target size={32} />
            </div>
            <h3 className="font-cormorant md:font-bebas text-3xl md:text-4xl text-[var(--accent)] mb-3 md:mb-4">Our Mission</h3>
            <p className="font-inter text-base md:text-lg text-[var(--gray)] leading-relaxed">
              To deliver exceptional value to our clients and stakeholders by building world-class infrastructure rooted in reliability, executed with safety, and delivered with excellence.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-6 md:p-12 rounded-[1.5rem] md:rounded-sm shadow-sm border-l-4 border-[var(--accent)]"
          >
            <div className="w-16 h-16 bg-[var(--accent-soft)] rounded-full flex items-center justify-center mb-6 text-[var(--accent)]">
              <Eye size={32} />
            </div>
            <h3 className="font-cormorant md:font-bebas text-3xl md:text-4xl text-[var(--accent)] mb-3 md:mb-4">Our Vision</h3>
            <p className="font-inter text-base md:text-lg text-[var(--gray)] leading-relaxed">
              To be the most trusted Electrical Solution provider known for uncompromising Quality and Safety and speed at optimum cost.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
