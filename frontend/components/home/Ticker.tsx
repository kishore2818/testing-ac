'use client'

import { motion } from 'framer-motion'

const services = [
  'Electrical Panel Design', 'Panel Installation', 'Annual Maintenance Contract', 
  'Turnkey Projects', 'Electrical Consultancy', 'Emergency Services', 'Arc Flash Studies', 'Thermography'
]

const industries = [
  'Manufacturing', 'Residential', 'Commercial', 'Infrastructure', 
  'Data Centers', 'Hospitals', 'Quality Assured', 'Precision Engineered'
]

export default function Ticker() {
  return (
    <div className="bg-[var(--black-soft)] border-y border-[var(--primary)]/20 py-4 overflow-hidden relative">
      
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--black-soft)] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--black-soft)] to-transparent z-10" />

      {/* Row 1: Services (Left) */}
      <motion.div
        animate={{ x: [0, -1920] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        whileHover={{ animationPlayState: 'paused' }}
        className="flex whitespace-nowrap mb-4"
      >
        {[...services, ...services].map((item, i) => (
          <div key={`s-${i}`} className="flex items-center">
            <span className="font-rajdhani text-[var(--gray-light)] uppercase tracking-[0.1em] font-medium text-sm md:text-base mx-6">
              {item}
            </span>
            <span className="text-[var(--primary)] text-[10px]">✦</span>
          </div>
        ))}
      </motion.div>

      {/* Row 2: Industries (Right) */}
      <motion.div
        initial={{ x: -1920 }}
        animate={{ x: 0 }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        whileHover={{ animationPlayState: 'paused' }}
        className="flex whitespace-nowrap"
      >
        {[...industries, ...industries].map((item, i) => (
          <div key={`i-${i}`} className="flex items-center">
            <span className="font-rajdhani text-[var(--gray-light)] uppercase tracking-[0.1em] font-medium text-sm md:text-base mx-6">
              {item}
            </span>
            <span className="text-[var(--primary)] text-[10px]">✦</span>
          </div>
        ))}
      </motion.div>

    </div>
  )
}
