'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import SectionLabel from '../shared/SectionLabel'
import Link from 'next/link'

const industrialFaqs = [
  { 
    q: "What industries do you work in?", 
    a: "Aerospace, EV and mobility, industrial and SEZ manufacturing, and institutional projects such as schools and hostels. Recent clients include Thyssenkrupp Aerospace, Aequs, SFS Group and Sterling Tech Mobility." 
  },
  { 
    q: "What voltage levels do you support?", 
    a: "Our Class I licence covers electrical works up to and including 33 kV. That covers both HT works (HT yards, substations, transformers) and LT distribution." 
  },
  { 
    q: "Do you handle complete turnkey projects?", 
    a: "Yes. We take a project from design and planning through supply, installation, testing and commissioning, and we secure the CEIG approval needed to energise the installation." 
  },
  { 
    q: "Do you provide testing and commissioning?", 
    a: "Yes. Every installation is tested and checked before handover, and the test records are included in the project documentation." 
  },
  { 
    q: "Can you get CEIG / Electrical Inspectorate approval?", 
    a: "Yes. We have secured approvals for high-profile projects such as Thyssenkrupp Aerospace and Inovit Aerospace in Bengaluru." 
  },
  { 
    q: "Can you work from BOQs and drawings provided by consultants?", 
    a: "Yes. Most of our projects are executed for main contractors and consultants against their BOQs and drawings. We provide joint measurement records for billing." 
  },
  { 
    q: "Where do you work?", 
    a: "We are headquartered in Belagavi and work across Karnataka (Belagavi, Hubballi, Bengaluru) and Tamil Nadu (Oragadam)." 
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="bg-white border border-[var(--border)] rounded-2xl md:rounded-3xl p-5 sm:p-8 md:p-10 shadow-sm h-full flex flex-col justify-between">
      <div>
        <div className="text-left mb-6 sm:mb-8">
          <SectionLabel text="Technical FAQs" color="accent" />
          <h2 className="font-inter font-semibold text-[22px] sm:text-[30px] lg:text-[34px] leading-tight text-[var(--black)] mt-2">
            Frequently Asked <span className="text-[var(--primary)]">Questions</span>
          </h2>
          <p className="font-inter text-[var(--gray)] max-w-xl mt-2 text-xs sm:text-sm leading-relaxed">
            Essential information for project engineers, procurement leaders, and plant managers.
          </p>
        </div>

        <div className="space-y-3">
          {industrialFaqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div 
                key={i} 
                className={`bg-white border rounded-xl overflow-hidden shadow-sm transition-all ${
                  isOpen ? 'border-[var(--primary)] shadow-md' : 'border-[var(--border)] hover:border-[var(--primary)]/50'
                }`}
              >
                <button 
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full px-5 md:px-6 py-4 flex justify-between items-center text-left gap-4"
                >
                  <span className={`font-inter text-sm md:text-base font-bold transition-colors ${
                    isOpen ? 'text-[var(--primary-dark)]' : 'text-[var(--black)]'
                  }`}>
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-[var(--primary)] shrink-0"
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 md:px-6 pb-5 pt-1 font-inter text-xs md:text-sm text-[var(--black-soft)] leading-relaxed border-t border-[var(--border)] bg-[var(--primary-soft)]/40">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        <div className="mt-8 text-center">
          <Link href="/contact">
            <motion.button
              whileHover={{ y: -2 }}
              className="w-full sm:w-auto px-6 py-3 bg-[var(--primary)] text-white font-inter font-bold text-xs sm:text-sm rounded-lg shadow-sm hover:bg-[var(--primary-dark)] transition-all"
            >
              Have Specific Requirements? Contact Us →
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  )
}
