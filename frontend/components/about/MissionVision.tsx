'use client'

import { motion } from 'framer-motion'
import { Target, Eye } from 'lucide-react'

export default function MissionVision() {
  return (
    <section className="py-12 md:py-24 bg-[var(--gray-bg)]">
      <div className="site-container">
        <div className="grid grid-cols-2 gap-3 md:gap-12">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-4 md:p-12 rounded-[1rem] md:rounded-sm shadow-sm border-l-4 border-[var(--primary)] flex flex-col h-full"
          >
            <div className="w-10 h-10 md:w-16 md:h-16 bg-[var(--primary-soft)] rounded-full flex items-center justify-center mb-3 md:mb-6 text-[var(--primary)] shrink-0">
              <Target className="w-5 h-5 md:w-8 md:h-8" />
            </div>
            <h3 className="font-cormorant md:font-bebas text-[18px] md:text-4xl text-[var(--accent)] mb-2 md:mb-4 leading-tight">Our Mission</h3>
            <p className="font-inter text-[10px] md:text-lg text-[var(--gray)] leading-relaxed flex-grow">
              To deliver exceptional value to our clients and stakeholders by building world-class infrastructure rooted in reliability, executed with safety, and delivered with excellence.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-4 md:p-12 rounded-[1rem] md:rounded-sm shadow-sm border-l-4 border-[var(--accent)] flex flex-col h-full"
          >
            <div className="w-10 h-10 md:w-16 md:h-16 bg-[var(--accent-soft)] rounded-full flex items-center justify-center mb-3 md:mb-6 text-[var(--accent)] shrink-0">
              <Eye className="w-5 h-5 md:w-8 md:h-8" />
            </div>
            <h3 className="font-cormorant md:font-bebas text-[18px] md:text-4xl text-[var(--accent)] mb-2 md:mb-4 leading-tight">Our Vision</h3>
            <p className="font-inter text-[10px] md:text-lg text-[var(--gray)] leading-relaxed flex-grow">
              To be the most trusted Electrical Solution provider known for uncompromising Quality and Safety and speed at optimum cost.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
