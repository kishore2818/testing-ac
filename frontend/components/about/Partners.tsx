'use client'

import { motion } from 'framer-motion'
import SectionLabel from '../shared/SectionLabel'

const partners = [
  { name: 'Vestian Global', role: 'Architects & Consultant' },
  { name: 'CRN Architects', role: 'Architects' },
  { name: 'Aditi MEP Consultants', role: 'MEP Cost Consultant' },
  { name: 'Turner & Townsend', role: 'Project Management' },
  { name: 'In Construct', role: 'Project Management' },
  { name: 'Aeon Consultant', role: 'MEP Design Consultant' },
  { name: 'Maple Engg-Design', role: 'MEP Design Consultant' }
]

export default function Partners() {
  return (
    <section className="py-12 md:py-24 bg-white">
      <div className="site-container">
        
        <div className="text-left md:text-center flex flex-col items-start md:items-center mb-8 md:mb-16">
          <SectionLabel text="Our Network" color="accent" />
          <h2 className="font-cormorant md:font-bebas text-4xl md:text-5xl text-[var(--accent)] mt-2 md:mt-4 uppercase">Strategic <span className="text-[var(--primary)]">Collaborations</span></h2>
          <p className="font-inter text-[var(--gray)] max-w-2xl mt-4">We partner with the best to deliver the best – with partners who strengthen our promise of quality and trust.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {partners.map((p, i) => (
            <motion.div 
              key={p.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -5, borderColor: 'var(--primary)' }}
              className="p-5 md:p-8 border border-[var(--border)] rounded-[1.25rem] md:rounded-sm group transition-all"
            >
              <div className="font-bebas text-2xl mb-1 text-[var(--accent)] group-hover:text-[var(--primary)] transition-colors">{p.name}</div>
              <div className="font-rajdhani text-xs uppercase tracking-[0.2em] font-bold text-[var(--gray-light)]">{p.role}</div>
            </motion.div>
          ))}
          
          <div className="p-8 bg-[var(--gray-bg)] border border-dashed border-[var(--border)] rounded-sm flex items-center justify-center text-center">
            <span className="font-rajdhani text-xs uppercase tracking-widest font-bold text-[var(--gray-light)]">And 20+ other MEP specialists</span>
          </div>
        </div>

      </div>
    </section>
  )
}
