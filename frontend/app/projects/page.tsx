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
              
              <div className="flex flex-wrap justify-start md:justify-center gap-2 p-1.5 bg-[var(--gray-bg)] rounded-full border border-[var(--border)]">
                {filters.map(f => {
                  const isActive = filter === f
                  const count = f === 'All' ? projects.length : projects.filter(p => p.status === f).length
                  return (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`relative font-poppins md:font-rajdhani uppercase tracking-[0.16em] md:tracking-widest font-semibold md:font-bold px-4 md:px-6 py-2 text-[11px] md:text-xs rounded-full transition-colors flex items-center gap-2 ${
                        isActive ? 'text-white' : 'text-[var(--gray)] hover:text-[var(--black)]'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeFilterPill"
                          className="absolute inset-0 bg-[var(--accent)] rounded-full z-0"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{f}</span>
                      <span className={`relative z-10 text-[9px] px-1.5 py-0.2 rounded-full font-inter ${
                        isActive ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
                      }`}>
                        {count}
                      </span>
                    </button>
                  )
                })}
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
