'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import PageHero from '@/components/shared/PageHero'

export default function ProjectsPage() {
  const [filter, setFilter] = useState('In Progress')
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  
  const filters = ['In Progress', 'Completed']

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
  
  const filteredProjects = projects.filter(p => p.status === filter)

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
              
              <div className="flex flex-wrap justify-start md:justify-center gap-2">
                {filters.map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`font-poppins md:font-rajdhani uppercase tracking-[0.16em] md:tracking-widest font-semibold md:font-bold px-4 md:px-5 py-2 text-[11px] md:text-xs rounded-full md:rounded-sm border transition-all ${
                      filter === f 
                        ? 'bg-[var(--accent)] border-[var(--accent)] text-white' 
                        : 'bg-white border-[var(--border)] text-[var(--gray)] hover:border-[var(--accent)]'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="py-24 text-center font-inter text-[var(--gray)]">Loading projects...</div>
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
                      className="bg-white border border-[var(--border)] rounded-[1rem] md:rounded-sm p-3 md:p-5 hover:shadow-lg transition-shadow group flex flex-col h-full"
                    >
                      <div className="mb-3 md:mb-4 overflow-hidden h-24 md:h-40 bg-[var(--gray-bg)] rounded-sm">
                        <img src={project.image} alt={project.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex justify-between items-start mb-1 md:mb-2 flex-col md:flex-row gap-1">
                        <span className="font-rajdhani text-[8px] md:text-[10px] font-bold text-[var(--primary)] uppercase tracking-wider">{project.type}</span>
                        <span className={`text-[7px] md:text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase ${project.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                          {project.status}
                        </span>
                      </div>
                      <h4 className="font-cormorant md:font-bebas text-[16px] md:text-xl mb-1 text-[var(--black)] leading-tight">{project.name}</h4>
                      <p className="font-inter text-[9px] md:text-[11px] text-[var(--gray)] mb-3 md:mb-4 flex-grow line-clamp-3">{project.description}</p>
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
