'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import SectionLabel from '../shared/SectionLabel'
import Link from 'next/link'

const industrialFaqs = [
  { 
    q: "What industries do you specialize in?", 
    a: "We specialize in heavy industrial manufacturing, aerospace facilities, automotive & mobility assembly, food processing & cold storage, logistics warehousing, data centers, and major commercial infrastructure developments." 
  },
  { 
    q: "What voltage levels do you support?", 
    a: "We handle both High Voltage (HT) systems up to 33kV and Low Voltage (LT) power distribution networks, switchgears, sub-stations, transformers, and plant automation desks." 
  },
  { 
    q: "Do you handle complete turnkey electrical projects?", 
    a: "Yes. As a Class I Electrical Contractor, Adler delivers complete turnkey projects from initial site survey and engineering design to BOQ procurement, panel manufacturing, cabling, installation, testing, and commissioning." 
  },
  { 
    q: "Do you provide testing and commissioning?", 
    a: "Absoltely. We perform comprehensive factory acceptance testing (FAT), site acceptance testing (SAT), insulation hi-pot testing, relay calibration, earth resistance audits, and formal joint commissioning." 
  },
  { 
    q: "Do you provide AMC for industrial facilities?", 
    a: "Yes, we offer structured Annual Maintenance Contracts (AMC) including preventive maintenance schedules, infrared thermography, arc flash hazard audits, transformer oil testing, and rapid emergency response." 
  },
  { 
    q: "Can you work from BOQ/drawings provided by consultants?", 
    a: "Yes. Our engineering team routinely works with BOQ specifications and single line diagrams (SLD) issued by MEP consultants, offering value engineering and precise execution." 
  },
  { 
    q: "Do you provide emergency electrical support?", 
    a: "We offer dedicated emergency breakdown support for facility AMC clients to diagnose power faults, replace damaged switchgear components, and restore uptime swiftly." 
  },
  { 
    q: "What types of electrical panels do you design?", 
    a: "Adler designs and manufactures LT Distribution Panels, HT Panels up to 33kV, Motor Control Centers (MCC), Power Control Centers (PCC), APFC Panels, VCB Panels, and PLC automation desks." 
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
