'use client'

import { motion } from 'framer-motion'
import SectionLabel from '../shared/SectionLabel'
import ScrollReveal, { fadeLeft, fadeRight } from '../shared/ScrollReveal'
import Link from 'next/link'
import Image from 'next/image'

export default function AboutSnapshot() {
  const cards = [
    {
      num: '01',
      title: 'Engineering Excellence',
      desc: 'Precision design, load calculations, and meticulous engineering planning for zero-defect execution.'
    },
    {
      num: '02',
      title: 'Safety & Quality',
      desc: 'Structured quality procedures, stringent safety protocols, and certified testing standards.'
    },
    {
      num: '03',
      title: 'On-Time Execution',
      desc: 'Disciplined project management focused on meeting strict timelines without cost overruns.'
    }
  ]

  return (
    <section className="bg-white py-12 md:py-24 overflow-hidden">
      <div className="site-container">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center flex flex-col items-center mb-8 sm:mb-14"
        >
          <SectionLabel text="Who We Are" color="accent" centered={true} />
          <h2 className="font-inter font-semibold text-[26px] sm:text-[34px] lg:text-[40px] leading-tight text-[var(--black)] mt-3">
            Engineering Electrical Infrastructure <span className="text-[var(--primary)]">That Performs</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-[1150px] mx-auto">
          
          {/* Left Column (Text & 3 Cards) */}
          <ScrollReveal animation={fadeLeft} className="flex flex-col items-start text-left order-2 lg:order-1">
            <motion.p 
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-inter text-[var(--black-soft)] font-normal text-sm sm:text-base leading-relaxed mb-6 md:mb-8 border-l-4 border-[var(--primary)] pl-4 md:pl-5 py-3 bg-[var(--primary-soft)] rounded-r-xl shadow-sm"
            >
              Adler Contracts is a Class I Electrical Contractor delivering end-to-end electrical infrastructure for industrial and commercial projects. From engineering and panel manufacturing to installation, testing and commissioning, we combine technical expertise, disciplined execution and safety-focused project management.
            </motion.p>

            <div className="space-y-4 mb-8 w-full">
              {cards.map((feat) => (
                <div key={feat.num} className="flex items-start gap-4 rounded-xl border border-[var(--border)] bg-[var(--gray-bg)] p-4 shadow-sm hover:border-[var(--primary)] transition-colors">
                  <div className="font-inter font-bold text-lg text-[var(--primary)] shrink-0 pt-0.5">
                    {feat.num}
                  </div>
                  <div>
                    <h4 className="font-inter font-bold text-base text-[var(--black)] mb-1">
                      {feat.title}
                    </h4>
                    <p className="font-inter text-xs sm:text-sm text-[var(--gray)] leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/about">
              <motion.button 
                whileHover={{ y: -2 }}
                className="bg-[var(--primary)] text-white font-inter font-bold text-sm px-7 py-3.5 rounded-lg shadow-md hover:bg-[var(--primary-dark)] transition-colors w-full sm:w-auto text-center"
              >
                Read More About Us →
              </motion.button>
            </Link>
          </ScrollReveal>

          {/* Right Column (Image Showcase) */}
          <ScrollReveal animation={fadeRight} delay={0.2} className="relative w-full order-1 lg:order-2">
            <div className="relative z-10 w-full max-w-md lg:w-[90%] mx-auto aspect-[4/5] group">
              
              <div className="absolute inset-0 bg-[var(--black)] p-3 shadow-2xl rounded-2xl overflow-hidden border border-[var(--border)]">
                <Image 
                  src="/images/hero/workers/worker-5.png" 
                  alt="Adler Contracts Engineering Team" 
                  fill
                  sizes="(max-width: 768px) 90vw, 450px"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="font-inter text-xs font-bold text-[var(--primary)] uppercase tracking-wider">Class I Electrical Contractor</p>
                  <p className="font-inter text-lg font-semibold mt-1">Disciplined Execution & Safety First</p>
                </div>
              </div>

              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, 8, 0] }} 
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 right-2 sm:-right-4 bg-[var(--primary)] text-white p-4 shadow-2xl rounded-xl z-30 flex flex-col items-center sm:items-start"
              >
                <div className="font-inter font-bold text-3xl flex items-baseline">10<span className="text-xl ml-0.5">+</span></div>
                <div className="font-inter font-medium text-[11px] text-white/90">Years Team Experience</div>
              </motion.div>

            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  )
}
