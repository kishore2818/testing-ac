'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import PageHero from '@/components/shared/PageHero'

export default function ProjectsPage() {
  const [filter, setFilter] = useState('All')
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  
  const filters = ['All', 'In Progress', 'Completed']

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`)
        const data = await res.json()
        setProjects(data)
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])
  
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.status === filter)

  return (
    <>
      <Navbar />
      <main>
        <PageHero image="/images/page-headers/projects.png" 
          title="OUR PROJECT PORTFOLIO" 
          subtitle="A demonstration of our capability across Industrial, Commercial, and Institutional sectors." 
        />
        
        <section className="py-12 md:py-24 bg-white min-h-[800px]">
          <div className="site-container">
            
            {/* Filterable Project History */}
            <div className="flex flex-col items-start md:items-center justify-center mb-8 md:mb-12 flex-wrap gap-4 md:gap-6 text-left md:text-center">
              <div className="flex flex-col items-start md:items-center justify-center gap-3 md:gap-4">
                <h2 className="font-cormorant md:font-bebas text-4xl text-[var(--black)] tracking-wider">Project <span className="text-[var(--accent)]">History</span></h2>
                <div className="h-[2px] w-24 bg-[var(--accent)]" />
              </div>
              
              <div className="w-full max-w-lg mx-auto px-2 py-1">
                <div className="bg-white p-1 sm:p-1.5 rounded-2xl border border-gray-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] w-full">
                  <div className="bg-[#f3f4f6] p-1 sm:p-1.5 rounded-xl grid grid-cols-3 gap-1 w-full">
                    {filters.map(f => {
                      const isActive = filter === f
                      const label = f === 'In Progress' ? 'ONGOING' : f.toUpperCase()
                      const count = f === 'All' ? projects.length : projects.filter(p => p.status === f).length

                      return (
                        <button
                          key={f}
                          onClick={() => setFilter(f)}
                          className={`relative w-full px-1 sm:px-4 py-1.5 sm:py-2.5 rounded-lg font-poppins text-[10px] sm:text-xs font-bold tracking-wider sm:tracking-widest transition-all flex items-center justify-center gap-1 sm:gap-2 text-center ${
                            isActive
                              ? 'bg-white text-[var(--primary)] shadow-[0_2px_10px_rgba(0,0,0,0.06)] border border-gray-200/60'
                              : 'text-gray-500 hover:text-gray-800'
                          }`}
                        >
                          <span className="truncate">{label}</span>
                          <span className={`text-[8px] sm:text-[10px] px-1 sm:px-1.5 py-0.2 sm:py-0.5 rounded-full font-inter font-bold shrink-0 ${
                            isActive ? 'bg-[var(--primary-soft)] text-[var(--primary-dark)]' : 'bg-gray-200/80 text-gray-600'
                          }`}>
                            {count}
                          </span>

                          {/* Green bottom dot indicator matching screenshot */}
                          {isActive && (
                            <motion.span
                              layoutId="activeTabDotFrontend"
                              className="absolute -bottom-1 sm:-bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--primary)]"
                              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                            />
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="py-24 text-center font-inter text-[var(--gray)] flex flex-col items-center justify-center gap-3">
                <div className="w-8 h-8 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
                <span>Loading project portfolio...</span>
              </div>
            ) : (
              <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project, i) => (
                    <motion.div
                      key={project.name + i}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white border border-[var(--border)] rounded-[1rem] md:rounded-sm p-3 md:p-5 hover:shadow-xl transition-all duration-300 group flex flex-col h-full hover:-translate-y-1"
                    >
                      <div className="relative mb-3 md:mb-4 overflow-hidden h-28 md:h-44 bg-[var(--gray-bg)] rounded-md">
                        <Image
                          src={project.image || '/images/projects/comp-1.png'}
                          alt={project.name}
                          fill
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex justify-between items-start mb-1 md:mb-2 flex-col md:flex-row gap-1">
                        <span className="font-rajdhani text-[8px] md:text-[10px] font-bold text-[var(--primary)] uppercase tracking-wider">{project.type}</span>
                        <span className={`text-[7px] md:text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${project.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                          {project.status}
                        </span>
                      </div>
                      <h4 className="font-cormorant md:font-bebas text-[16px] md:text-xl mb-1 text-[var(--black)] leading-tight group-hover:text-[var(--primary)] transition-colors">{project.name}</h4>
                      <p className="font-inter text-[9px] md:text-[11px] text-[var(--gray)] mb-3 md:mb-4 flex-grow line-clamp-3 leading-relaxed">{project.description}</p>
                      <div className="pt-2 md:pt-4 border-t border-[var(--border)] mt-auto flex flex-col md:flex-row md:justify-between items-start md:items-center gap-1">
                        <span className="font-rajdhani text-[8px] md:text-[9px] font-bold text-[var(--black)] uppercase tracking-widest">{project.client}</span>
                        <span className="font-rajdhani text-[7px] md:text-[9px] font-bold text-[var(--gray)] uppercase tracking-widest">{project.location}</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
