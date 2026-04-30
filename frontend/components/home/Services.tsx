'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import * as LucideIcons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import SectionLabel from '../shared/SectionLabel'
import ScrollReveal, { staggerContainer, fadeUp } from '../shared/ScrollReveal'
import { services } from '@/data/services'

export default function Services({ showAll = false }: { showAll?: boolean }) {
  const displayedServices = showAll ? services : services.slice(0, 3)

  return (
    <section className={`py-14 md:py-32 ${showAll ? 'bg-[var(--gray-bg)] border-b border-[var(--border)]' : 'bg-white'}`}>
      <div className="site-container">
        
        <div className="text-left md:text-center flex flex-col items-start md:items-center mb-8 md:mb-16">
          <SectionLabel text="Our Expertise" color="accent" />
          <h2 className="font-cormorant md:font-bebas text-4xl md:text-6xl uppercase text-[var(--accent)]">
            {showAll ? 'Engineering' : 'Core'} <span className="text-[var(--primary)]">Services</span>
          </h2>
          <p className="font-inter text-[var(--gray)] max-w-2xl mt-3 md:mt-4 text-sm md:text-base">We deliver comprehensive electrical solutions tailored to industrial, commercial, and infrastructure applications.</p>
        </div>

        <ScrollReveal animation={staggerContainer}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {displayedServices.map((service, idx) => {
              const IconComponent = (LucideIcons[service.icon as keyof typeof LucideIcons] as LucideIcon) || LucideIcons.HelpCircle

              return (
                <motion.div 
                  key={service.slug}
                  variants={fadeUp}
                  whileHover={{ y: -8, boxShadow: '0 24px 48px rgba(0,0,0,0.08)' }}
                  className={`group bg-white p-5 md:p-8 relative rounded-[1.25rem] md:rounded-sm shadow-sm border border-[var(--border)] overflow-hidden flex-col h-full ${idx >= 2 ? 'hidden md:flex' : 'flex'}`}
                >
                  {/* Red top border that grows on hover */}
                  <div className="absolute top-0 left-0 h-1 bg-[var(--primary)] w-0 group-hover:w-full transition-all duration-500" />
                  
                  <motion.div 
                    whileHover={{ rotate: [0, -15, 15, -15, 0] }}
                    transition={{ duration: 0.6 }}
                    className="mb-5 md:mb-8 p-4 bg-[var(--primary-soft)] w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-2xl md:rounded-sm text-[var(--primary)] origin-center"
                  >
                    <IconComponent size={32} strokeWidth={1.5} />
                  </motion.div>
                  
                  <h3 className="font-poppins md:font-rajdhani text-xl md:text-2xl font-semibold md:font-bold uppercase tracking-[0.08em] md:tracking-wider mb-2 md:mb-3 text-[var(--accent)]">
                    {service.title}
                  </h3>
                  
                  <p className="font-inter text-[var(--gray)] text-sm mb-5 md:mb-6 leading-relaxed line-clamp-3 md:line-clamp-4 flex-grow">
                    {service.description}
                  </p>
                  
                  <Link 
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 font-poppins md:font-rajdhani text-xs md:text-sm font-semibold md:font-bold uppercase tracking-[0.16em] md:tracking-widest text-[var(--black)] group-hover:text-[var(--primary)] transition-colors"
                  >
                    Learn More 
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                  
                </motion.div>
              )
            })}
          </div>
        </ScrollReveal>

        {!showAll && (
          <div className="text-left md:text-center mt-10 md:mt-20">
            <Link href="/services">
              <motion.button 
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 md:px-12 py-4 bg-[var(--primary)] text-white font-poppins md:font-rajdhani font-semibold md:font-bold tracking-[0.18em] md:tracking-[0.2em] uppercase rounded-2xl md:rounded-sm shadow-xl hover:shadow-2xl transition-all"
              >
                View All Services
              </motion.button>
            </Link>
          </div>
        )}

      </div>
    </section>
  )
}
