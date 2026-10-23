'use client'

import { motion } from 'framer-motion'

const highlights = [
  'Class I Electrical Contractor',
  '14 Projects since 2024',
  '₹10.7 Cr+ Project Value',
  '27 MVA+ Capacity Installed',
  'Licensed up to 33 kV',
  'CEIG Approvals Secured',
  'Turnkey HT/LT Works',
  'Grade I Supervisor Continuous Oversight',
  'Aerospace & EV Sector Specialist',
  'Belagavi & Bengaluru Operations'
]

const services = [
  'Turnkey HT/LT Projects',
  '33 kV Substations & HT Yards',
  'Transformer Supply & Erection',
  'PCC, MCC & ACB Panels',
  'Cable Trays & Heavy Armored Cabling',
  'Pre-Commissioning & Hi-Pot Testing',
  'Electrical Inspectorate Approvals',
  'Industrial Plant Electrification'
]

export default function Ticker() {
  return (
    <div className="bg-[var(--black-soft)] border-y border-[var(--primary)]/20 py-3.5 overflow-hidden relative">
      
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--black-soft)] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--black-soft)] to-transparent z-10 pointer-events-none" />

      {/* Row 1: Highlights (Left) */}
      <motion.div
        animate={{ x: [0, -1920] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        whileHover={{ animationPlayState: 'paused' }}
        className="flex whitespace-nowrap mb-2.5"
      >
        {[...highlights, ...highlights].map((item, i) => (
          <div key={`h-${i}`} className="flex items-center">
            <span className="font-inter text-white/90 uppercase tracking-[0.14em] font-semibold text-xs md:text-sm mx-6">
              {item}
            </span>
            <span className="text-[var(--primary)] text-[11px]">✦</span>
          </div>
        ))}
      </motion.div>

      {/* Row 2: Services (Right) */}
      <motion.div
        initial={{ x: -1920 }}
        animate={{ x: 0 }}
        transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
        whileHover={{ animationPlayState: 'paused' }}
        className="flex whitespace-nowrap"
      >
        {[...services, ...services].map((item, i) => (
          <div key={`s-${i}`} className="flex items-center">
            <span className="font-inter text-[var(--gray-light)] uppercase tracking-[0.12em] font-medium text-xs md:text-xs mx-6">
              {item}
            </span>
            <span className="text-[var(--primary)] text-[10px]">■</span>
          </div>
        ))}
      </motion.div>

    </div>
  )
}
