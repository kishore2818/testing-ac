'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, ShieldAlert, Award, BookOpen } from 'lucide-react'

const frameworks = [
  {
    title: 'Quality Framework',
    icon: Award,
    items: [
      'Project-Specific Quality Plans',
      'Detailed Execution Methodologies',
      'Third-Party Quality Checks',
      'Continuous Site Supervision'
    ]
  },
  {
    title: 'Safety Framework',
    icon: ShieldAlert,
    items: [
      'Comprehensive Safety Plans',
      'Safe Work Method Statements',
      'Logistics & EOHS Planning',
      'Safety Training & Protocols'
    ]
  }
]

const trainingItems = [
  'Electrical Safety Training',
  'PPE for Construction',
  'Harnessing for Work at Height',
  'First Aid & CPR Training',
  'Heavy Equipment Operation',
  'Aerial Lifts Operation'
]

export default function Framework() {
  return (
    <section className="py-12 md:py-24 bg-[var(--gray-bg)]">
      <div className="site-container">
        
        <div className="text-left md:text-center mb-8 md:mb-16">
          <h2 className="font-cormorant md:font-bebas text-4xl md:text-5xl text-[var(--accent)] mb-3 md:mb-4 uppercase">Quality & Safety <span className="text-[var(--primary)]">First</span></h2>
          <p className="font-inter text-[var(--gray)] max-w-2xl mx-auto text-sm md:text-base">
            We lead with Quality and build with Safety. Investing in our people ensures long-term reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-16">
          {frameworks.map((f) => (
            <div key={f.title} className="bg-white p-5 md:p-10 rounded-[1.5rem] md:rounded-sm shadow-sm border-t-2 border-[var(--primary)]">
              <div className="flex items-center gap-4 mb-5 md:mb-8">
                <div className="text-[var(--primary)]">
                  <f.icon size={40} strokeWidth={1.5} />
                </div>
                <h3 className="font-cormorant md:font-bebas text-3xl uppercase tracking-wide">{f.title}</h3>
              </div>
              <ul className="space-y-4">
                {f.items.map((item, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-3 font-inter text-sm text-[var(--gray-dark)]"
                  >
                    <CheckCircle2 size={18} className="text-[var(--primary)]" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-[var(--accent)] text-white p-4 md:p-12 rounded-[1rem] md:rounded-sm overflow-hidden relative">
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 blur-[100px] -mb-48 -mr-48 rounded-full" />
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 mb-6 md:mb-12">
              <div className="w-10 h-10 md:w-20 md:h-20 bg-white/10 rounded-md md:rounded-sm flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5 md:w-10 md:h-10" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-cormorant md:font-bebas text-[20px] md:text-4xl mb-1 md:mb-2">Skill and Safety Training</h3>
                <p className="font-inter text-[10px] md:text-base text-blue-100 max-w-xl">Investing in our people ensures long-term reliability. We conduct regular training sessions for various critical procedures.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-2 md:gap-y-4 gap-x-12">
              {trainingItems.map((item, i) => (
                <div key={i} className="flex items-center gap-2 md:gap-3 border-b border-white/10 py-2 md:py-3">
                  <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-[var(--primary)] rounded-full shrink-0" />
                  <span className="font-rajdhani text-[9px] md:text-sm font-bold uppercase tracking-widest leading-none">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
