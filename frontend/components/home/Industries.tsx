'use client'

import { motion } from 'framer-motion'
import SectionLabel from '../shared/SectionLabel'
import ScrollReveal, { staggerContainer, fadeUp } from '../shared/ScrollReveal'

const verifiedIndustries = [
  {
    num: '01',
    name: 'Aerospace',
    desc: 'HT/LT power distribution and CEIG-approved electrical installations for aerospace manufacturing facilities.',
    proof: 'Thyssenkrupp Aerospace · Inovit Aerospace · Aequs HDC',
    image: '/images/industries/aerospace.png'
  },
  {
    num: '02',
    name: 'EV & Mobility',
    desc: 'LT distribution, dedicated clean power, UPS systems and DG backup for EV component manufacturing plants.',
    proof: 'Sterling Tech Mobility Ltd',
    image: '/images/hero/panel-1.jpg'
  },
  {
    num: '03',
    name: 'Industrial & SEZ',
    desc: '5–10 MVA HT/LT infrastructure, transformer setups and busbar trunking for manufacturing plants and SEZ units.',
    proof: 'SFS Group India · Axana Estate (A03, B05)',
    image: '/images/industries/manufacturing.png'
  },
  {
    num: '04',
    name: 'Institutional & Residential',
    desc: 'Complete LT electrification, distribution boards, campus and architectural lighting for schools, hostels and large private residences.',
    proof: 'Indus Altum International School · Farmhouse Project',
    image: '/images/industries/construction.png'
  },
  {
    num: '05',
    name: 'Food Tech & Cold Chain',
    desc: 'Temperature-controlled cold room power distribution, clean-power electrical panels and emergency DG backup systems.',
    proof: 'SATS Food Solutions India Pvt Ltd',
    image: '/images/industries/food-beverage.png'
  }
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
            Turnkey electrical contracting tailored to high-reliability sectors with proven, referenceable installations.
          </p>
        </div>

        {/* 5 Verified Industry Cards - Pyramid Layout (3-2 Desktop, 2-2-1 Mobile) */}
        <ScrollReveal animation={staggerContainer} className="flex flex-wrap justify-center gap-2.5 sm:gap-5 md:gap-6 max-w-6xl mx-auto">
          {verifiedIndustries.map((ind) => (
            <motion.div
              key={ind.num}
              variants={fadeUp}
              whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.14)' }}
              className="group relative bg-[var(--black)] border border-[var(--border)] overflow-hidden rounded-xl sm:rounded-2xl h-44 sm:h-64 lg:h-80 flex flex-col justify-end shadow-md transition-all duration-300 w-[calc(50%-0.35rem)] sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1.25rem)] max-w-full"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-700 ease-in-out group-hover:scale-105"
                style={{ backgroundImage: `url(${ind.image})` }}
              />
              
              {/* Dark Overlay Gradient */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/95 via-black/60 to-black/20 group-hover:from-black/90 transition-colors duration-500" />

              {/* Number Tag */}
              <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-20 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/20 font-inter text-[9px] sm:text-xs font-bold text-[var(--primary)]">
                {ind.num}
              </div>

              {/* Card Content */}
              <div className="relative z-20 p-2.5 sm:p-5 md:p-6 mt-auto">
                <h3 className="font-inter text-xs sm:text-lg md:text-xl font-bold text-white group-hover:text-[var(--primary)] transition-colors duration-300 leading-tight mb-1 sm:mb-1.5">
                  {ind.name}
                </h3>
                <p className="font-inter text-[10px] sm:text-xs text-white/85 leading-tight sm:leading-relaxed mb-1.5 sm:mb-3 line-clamp-2">
                  {ind.desc}
                </p>
                <div className="pt-1.5 sm:pt-2 border-t border-white/15 flex items-center gap-1 sm:gap-1.5">
                  <span className="text-[8px] sm:text-[10px] uppercase font-bold text-[var(--primary)] tracking-wider shrink-0">Proof:</span>
                  <span className="text-[9px] sm:text-[11px] font-medium text-white/90 truncate">{ind.proof}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </ScrollReveal>

      </div>
    </section>
  )
}
