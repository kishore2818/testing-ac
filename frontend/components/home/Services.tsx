'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import * as LucideIcons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import SectionLabel from '../shared/SectionLabel'
import ScrollReveal, { staggerContainer, fadeUp } from '../shared/ScrollReveal'
import { services } from '@/data/services'

export default function Services({ showAll = false }: { showAll?: boolean }) {
  const displayedServices = showAll ? services : services

  return (
    <section className={`py-12 md:py-24 ${showAll ? 'bg-[var(--gray-bg)] border-b border-[var(--border)]' : 'bg-white'}`}>
      <div className="site-container">
        
        <div className="text-left md:text-center flex flex-col items-start md:items-center mb-8 md:mb-14">
          <SectionLabel text="Industrial Engineering Capabilities" color="accent" />
          <h2 className="font-inter font-semibold text-[26px] sm:text-[32px] lg:text-[38px] leading-tight text-[var(--black)] mt-2">
            End-to-End <span className="text-[var(--primary)]">Industrial Services</span>
          </h2>
          <p className="font-inter text-[var(--gray)] max-w-2xl mt-3 text-sm md:text-base leading-relaxed">
            Turnkey electrical contracting, HT/LT infrastructure, custom panel manufacturing, testing, and lifecycle AMC for demanding facilities.
          </p>
        </div>

        <ScrollReveal animation={staggerContainer}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {displayedServices.map((service, idx) => {
              const IconComponent = (LucideIcons[service.icon as keyof typeof LucideIcons] as LucideIcon) || LucideIcons.Zap

              return (
                <motion.div 
                  key={service.slug}
                  variants={fadeUp}
                  whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.06)' }}
                  className="group bg-white p-5 md:p-6 relative rounded-xl shadow-sm border border-[var(--border)] overflow-hidden flex flex-col h-full transition-all duration-300"
                >
                  {/* Primary green top border accent */}
                  <div className="absolute top-0 left-0 h-1 bg-[var(--primary)] w-0 group-hover:w-full transition-all duration-500" />
                  
                  <div className="mb-4 p-3 bg-[var(--primary-soft)] w-12 h-12 flex items-center justify-center rounded-lg text-[var(--primary)] border border-[var(--primary)]/20">
                    <IconComponent className="w-6 h-6" strokeWidth={1.75} />
                  </div>

                  <div className="font-inter text-[11px] font-bold uppercase tracking-wider text-[var(--primary)] mb-1">
                    0{idx + 1}
                  </div>
                  
                  <h3 className="font-inter text-lg font-semibold text-[var(--black)] leading-snug mb-2 group-hover:text-[var(--primary)] transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="font-inter text-[var(--gray)] text-xs md:text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                    {service.description}
                  </p>
                  
                  <Link 
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 font-inter text-xs font-bold text-[var(--black-soft)] group-hover:text-[var(--primary)] transition-colors mt-auto pt-2 border-t border-[var(--border)]"
                  >
                    Learn Details 
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                  
                </motion.div>
              )
            })}
          </div>
        </ScrollReveal>

        {!showAll && (
          <div className="text-center mt-10 md:mt-14">
            <Link href="/services">
              <motion.button 
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3.5 bg-[var(--primary)] text-white font-inter font-bold text-sm rounded-lg shadow-md hover:bg-[var(--primary-dark)] transition-all"
              >
                Explore Full Engineering Scope →
              </motion.button>
            </Link>
          </div>
        )}

      </div>
    </section>
  )
}
