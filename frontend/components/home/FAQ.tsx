'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import SectionLabel from '../shared/SectionLabel'
import Link from 'next/link'

const faqs = [
  { q: "What types of electrical panels do you design?", a: "We design and manufacture LT Distribution Panels, HT Panels up to 33kV, Motor Control Centers (MCC), Power Control Centers (PCC), APFC, VCB Panels, and custom PLC automation desks." },
  { q: "How do you ensure panel quality?", a: "All our panels are designed and tested according to rigorous industrial standards. We operate under strict quality guidelines to ensure every unit is built for reliability, safety, and long-term performance." },
  { q: "Do you offer Annual Maintenance Contracts (AMCs)?", a: "Absolutely. We provide comprehensive preventive and corrective AMCs, which include thermographic scanning, arc flash studies, and 24/7 emergency dispatch." },
  { q: "Which industries do you primarily serve?", a: "We serve heavy manufacturing, pharmaceuticals, commercial real estate, data centers, hospitals, and critical infrastructure projects (like metros and airports)." },
  { q: "How quickly can you deliver a custom panel?", a: "Depending on scale and complexity, standard distribution boards take 2-4 weeks, while complex MCC/PCC or VCB panels take 6-10 weeks from drawing approval to dispatch." },
  { q: "What brands of components do you use?", a: "We strictly use premium components from trusted global brands like Siemens, Schneider Electric, ABB, L&T, and C&S Electric based on client specifications." }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const displayedFaqs = faqs.slice(0, 4)

  return (
    <motion.section 
      initial={{ x: -150, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ 
        boxShadow: "inset 0 0 40px rgba(124, 179, 66, 0.08)",
        backgroundColor: "#fcfdfe" 
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-[var(--gray-bg)] py-12 lg:py-24 h-full flex flex-col justify-center relative overflow-hidden group transition-colors"
    >
      <div className="site-container max-w-2xl relative z-10 transition-transform duration-500 group-hover:scale-[1.01]">
        
        <div className="text-left md:text-center flex flex-col items-start md:items-center mb-8 md:mb-16">
          <SectionLabel text="Got Questions?" color="accent" />
          <h2 className="font-cormorant md:font-bebas text-4xl md:text-6xl text-[var(--accent)] tracking-wider">
            FREQUENTLY ASKED <span className="text-[var(--primary)]">QUESTIONS</span>
          </h2>
        </div>

        <div className="space-y-3 md:space-y-4">
          {displayedFaqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div key={i} className={`bg-white border border-[var(--border)] rounded-[1.25rem] md:rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow ${i >= 2 ? 'hidden md:block' : 'block'}`}>
                <button 
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full px-4 md:px-6 py-4 md:py-5 flex justify-between items-center text-left hover:bg-gray-50 transition-colors gap-3"
                >
                  <span className={`font-poppins md:font-rajdhani text-sm md:text-xl font-semibold md:font-bold tracking-[0.08em] md:tracking-widest uppercase transition-colors ${isOpen ? 'text-[var(--primary)]' : 'text-[var(--black)]'}`}>
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="text-[var(--primary)]"
                  >
                    <ChevronDown size={24} />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-4 md:px-6 pb-5 md:pb-6 pt-1 md:pt-2 font-inter text-sm md:text-base text-[var(--gray)] leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        <div className="mt-8 md:mt-12 text-left md:text-center block md:hidden">
          <Link href="/contact">
            <motion.button
              whileHover={{ y: -2 }}
              className="w-full sm:w-auto px-8 md:px-10 py-4 bg-[var(--primary)] text-white font-poppins font-semibold tracking-[0.18em] uppercase rounded-full shadow-xl hover:shadow-2xl transition-all text-xs"
            >
              Have More Questions? →
            </motion.button>
          </Link>
        </div>

      </div>
    </motion.section>
  )
}
