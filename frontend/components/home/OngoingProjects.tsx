'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import SectionLabel from '../shared/SectionLabel'
import { projects as staticProjects } from '@/data/projects'

export default function OngoingProjects() {
  const [featuredProjects, setFeaturedProjects] = useState<any[]>(() => {
    // Default fallback to static dataset so customers NEVER see a loading indicator
    return staticProjects.slice(0, 6).map(p => ({
      client: p.client || 'Industrial Client',
      location: p.location || 'India',
      industry: p.type || 'Industrial Manufacturing',
      scopeOfWork: p.description || 'Turnkey Electrical Infrastructure & Power Distribution',
      status: p.status || 'Completed',
      name: p.name,
      image: p.image || '/images/hero/panel-1.jpg'
    }))
  })

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (!process.env.NEXT_PUBLIC_API_URL) return;
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`)
        if (!res.ok) return;
        const data = await res.json()
        if (Array.isArray(data) && data.length > 0) {
          setFeaturedProjects(data.slice(0, 6).map((p: any) => ({
            client: p.client || p.name,
            location: p.location || 'Karnataka, India',
            industry: p.type || 'Industrial Infrastructure',
            scopeOfWork: p.description || 'Electrical Infrastructure & Distribution',
            status: p.status || 'Completed',
            name: p.name,
            image: p.image || '/images/hero/panel-1.jpg'
          })))
        }
      } catch (error) {
        console.error('Error fetching projects:', error)
      }
    }
    fetchProjects()
  }, [])

  return (
    <section className="bg-white py-12 md:py-24 border-b border-[var(--border)]">
      <div className="site-container">
        
        {/* Section Header */}
        <div className="mb-8 md:mb-14 flex flex-col items-start text-left">
          <SectionLabel text="Track Record of Excellence" color="accent" />
          <h2 className="font-inter font-semibold text-[26px] sm:text-[34px] lg:text-[40px] leading-tight text-[var(--black)] mt-2">
            Featured <span className="text-[var(--primary)]">Industrial Projects</span>
          </h2>
          <p className="mt-3 max-w-2xl font-inter text-sm md:text-base text-[var(--gray)] leading-relaxed">
            High-reliability power distribution and turnkey electrical engineering across aerospace, automotive, manufacturing, and commercial infrastructure.
          </p>
        </div>

        {/* 6 Featured Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-5 md:gap-6">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={`${project.name}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
              className="bg-white rounded-xl border border-[var(--border)] overflow-hidden flex flex-col h-full shadow-sm hover:border-[var(--primary)] transition-all duration-300"
            >
              <div className="relative h-28 sm:h-48 overflow-hidden bg-[var(--black)]">
                <img 
                  src={project.image} 
                  alt={project.client} 
                  loading="lazy"
                  fetchPriority="low"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                {/* Status Badge */}
                <div className={`absolute left-2 top-2 sm:left-3.5 sm:top-3.5 inline-flex items-center gap-1 sm:gap-1.5 rounded-full px-2 py-0.5 sm:px-3 sm:py-1 font-inter text-[9px] sm:text-[11px] font-bold text-white shadow-md ${
                  project.status === 'In Progress' ? 'bg-[var(--primary)]' : 'bg-[var(--primary-dark)]'
                }`}>
                  <span className="h-1 sm:h-1.5 w-1 sm:w-1.5 rounded-full bg-white animate-pulse" />
                  {project.status}
                </div>

                <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3.5 sm:right-3.5 text-white">
                  <span className="font-inter text-[9px] sm:text-xs font-bold text-[var(--primary-light)] uppercase tracking-wider block truncate">
                    {project.industry}
                  </span>
                  <h3 className="font-inter text-xs sm:text-lg font-bold leading-tight mt-0.5 text-white truncate">
                    {project.client}
                  </h3>
                </div>
              </div>

              <div className="p-2.5 sm:p-5 flex flex-col flex-grow bg-white">
                <div className="space-y-1 sm:space-y-2 mb-2 sm:mb-4 font-inter text-[10px] sm:text-xs text-[var(--black-soft)]">
                  <div className="flex justify-between border-b border-[var(--border)] pb-1 sm:pb-2">
                    <span className="text-[var(--gray)] font-medium">Location:</span>
                    <span className="font-semibold text-[var(--black)] truncate max-w-[55%]">{project.location}</span>
                  </div>
                  <div className="hidden sm:flex justify-between border-b border-[var(--border)] pb-2">
                    <span className="text-[var(--gray)] font-medium">Industry:</span>
                    <span className="font-semibold text-[var(--black)] truncate max-w-[55%]">{project.industry}</span>
                  </div>
                  <div className="pt-0.5 sm:pt-1">
                    <span className="text-[var(--gray)] font-medium block mb-0.5 sm:mb-1 text-[9px] sm:text-xs">Scope:</span>
                    <p className="font-medium text-[var(--black)] leading-snug sm:leading-relaxed line-clamp-2 text-[10px] sm:text-xs">
                      {project.scopeOfWork}
                    </p>
                  </div>
                </div>

                <div className="mt-auto pt-2 sm:pt-3 border-t border-[var(--border)] flex justify-between items-center">
                  <span className="font-inter text-[9px] sm:text-[11px] font-semibold text-[var(--primary-dark)] uppercase truncate max-w-[50%]">
                    Class I
                  </span>
                  <Link 
                    href="/projects" 
                    className="inline-flex items-center gap-0.5 font-inter text-[10px] sm:text-xs font-bold text-[var(--primary)] hover:text-[var(--primary-dark)] transition-colors shrink-0"
                  >
                    Details →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 md:mt-14 text-center">
          <Link href="/projects">
            <motion.button
              whileHover={{ y: -2 }}
              className="px-8 py-3.5 bg-[var(--primary)] text-white font-inter font-bold text-sm rounded-lg shadow-md hover:bg-[var(--primary-dark)] transition-all"
            >
              Explore All Projects →
            </motion.button>
          </Link>
        </div>

      </div>
    </section>
  )
}
