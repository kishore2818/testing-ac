'use client'

import { motion } from 'framer-motion'
import SectionLabel from '../shared/SectionLabel'
import ScrollReveal, { staggerContainer, fadeUp } from '../shared/ScrollReveal'

const primaryIndustries = [
  {
    num: '01',
    name: 'Industrial Manufacturing',
    desc: 'Electrical infrastructure for production plants, assembly lines and heavy processing facilities.',
    image: '/images/industries/manufacturing.png'
  },
  {
    num: '02',
    name: 'Aerospace',
    desc: 'High-reliability electrical systems for aerospace manufacturing and aviation facilities.',
    image: '/images/industries/aerospace.png'
  },
  {
    num: '03',
    name: 'Automotive & Mobility',
    desc: 'Power distribution and electrical infrastructure for automotive and mobility manufacturing.',
    image: '/images/hero/panel-1.jpg'
  },
  {
    num: '04',
    name: 'Food Processing',
    desc: 'Reliable electrical systems for food processing, cold storage and production facilities.',
    image: '/images/industries/food-beverage.png'
  },
  {
    num: '05',
    name: 'Warehousing & Logistics',
    desc: 'Electrical infrastructure for warehouses, distribution centres and logistics facilities.',
    image: '/images/projects/comp-4.png'
  },
  {
    num: '06',
    name: 'Commercial Infrastructure',
    desc: 'Electrical systems for large commercial developments, malls and business facilities.',
    image: '/images/industries/construction.png'
  }
]

const secondaryIndustries = [
  'Healthcare',
  'Hospitality',
  'Institutional',
  'Data Centers',
  'Residential',
  'General Infrastructure'
]

export default function Industries() {
  return (
    <section className="bg-[var(--gray-bg)] py-12 md:py-24 border-y border-[var(--border)]">
      <div className="site-container">

        {/* Section Header */}
        <div className="text-left md:text-center flex flex-col items-start md:items-center mb-8 md:mb-14">
          <SectionLabel text="Industries We Serve" color="accent" />
          <h2 className="font-inter font-semibold text-[26px] sm:text-[32px] lg:text-[38px] leading-tight text-[var(--black)] mt-2">
            Built for <span className="text-[var(--primary)]">Demanding Industrial Environments</span>
          </h2>
          <p className="font-inter text-[var(--gray)] max-w-2xl mt-3 text-sm md:text-base leading-relaxed">
            Specialized electrical infrastructure for industries where reliability, safety and uptime matter.
          </p>
        </div>

        {/* 6 Primary Large Cards */}
        <ScrollReveal animation={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {primaryIndustries.map((ind) => (
            <motion.div
              key={ind.num}
              variants={fadeUp}
              whileHover={{ y: -8, boxShadow: '0 24px 48px rgba(0,0,0,0.12)' }}
              className="group relative bg-[var(--black)] border border-[var(--border)] overflow-hidden rounded-xl h-64 sm:h-72 lg:h-80 flex flex-col justify-end shadow-md transition-all duration-300"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-700 ease-in-out group-hover:scale-105"
                style={{ backgroundImage: `url(${ind.image})` }}
              />
              
              {/* Dark Overlay Gradient */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/95 via-black/55 to-black/20 group-hover:from-black/90 transition-colors duration-500" />

              {/* Number Tag */}
              <div className="absolute top-4 left-4 z-20 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/20 font-inter text-xs font-bold text-[var(--primary)]">
                {ind.num}
              </div>

              {/* Card Content */}
              <div className="relative z-20 p-5 md:p-6 mt-auto">
                <h3 className="font-inter text-lg md:text-xl font-bold text-white group-hover:text-[var(--primary)] transition-colors duration-300">
                  {ind.name}
                </h3>
                <p className="font-inter text-xs md:text-sm text-white/85 mt-2 leading-relaxed">
                  {ind.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </ScrollReveal>

        {/* Secondary Format: Also Serving */}
        <div className="mt-12 md:mt-16 pt-8 border-t border-[var(--border)] text-center">
          <h4 className="font-inter text-xs uppercase tracking-[0.2em] font-bold text-[var(--primary)] mb-4">
            Also Serving
          </h4>
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 max-w-4xl mx-auto">
            {secondaryIndustries.map((sec, idx) => (
              <span key={sec} className="inline-flex items-center font-inter text-sm font-semibold text-[var(--black-soft)] bg-white px-4 py-2 rounded-full border border-[var(--border)] shadow-sm">
                {sec}
                {idx < secondaryIndustries.length - 1 && <span className="ml-3 sm:ml-4 text-[var(--primary)] font-bold">|</span>}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
