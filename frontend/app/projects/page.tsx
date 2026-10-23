'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/shared/PageHero'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import ProjectCard from '@/components/projects/ProjectCard'
import ProjectGalleryModal, { ProjectModalData } from '@/components/projects/ProjectGalleryModal'
import { projects as staticProjects, ProjectItem } from '@/data/projects'

export default function ProjectsPage() {
  const [filter, setFilter] = useState('All')
  const [projectsList, setProjectsList] = useState<ProjectItem[]>([])
  const [selectedProject, setSelectedProject] = useState<ProjectModalData | null>(null)
  const [loading, setLoading] = useState(true)
  
  const filters = ['All', 'Completed', 'In Progress']

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL
        if (!apiUrl) {
          // No API URL configured — use static data
          setProjectsList(staticProjects)
          setLoading(false)
          return
        }

        const res = await fetch(`${apiUrl}/api/projects`, { cache: 'no-store' })
        if (!res.ok) throw new Error('Failed to fetch from API')
        const apiData = await res.json()
        
        if (Array.isArray(apiData) && apiData.length > 0) {
          // API returned data — use it directly (DB is the source of truth)
          const mapped: ProjectItem[] = apiData.map((p: any) => ({
            id: p._id,
            name: p.name,
            client: p.client,
            location: p.location,
            type: p.type || 'Electrical Project',
            status: p.status || 'Completed',
            progress: p.progress ?? 100,
            value: p.value || '',
            capacity: p.capacity || '',
            powerCapacity: p.powerCapacity || '',
            workAwarded: p.workAwarded || '',
            duration: p.duration || '',
            description: p.description || '',
            scope: p.scope || [],
            image: p.image || '/images/hero/hero-real-1.jpg',
            gallery: p.gallery && p.gallery.length > 0 ? p.gallery : [p.image || '/images/hero/hero-real-1.jpg'],
          }))

          // Sort completed first
          mapped.sort((a, b) => (a.status === 'Completed' ? -1 : 1))

          setProjectsList(mapped)
        } else {
          // API returned empty — fall back to static data
          setProjectsList(staticProjects)
        }
      } catch (error) {
        console.error('Error fetching projects, falling back to static data:', error)
        setProjectsList(staticProjects)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])
  
  const filteredProjects = filter === 'All' 
    ? projectsList 
    : projectsList.filter(p => p.status === filter)

  return (
    <>
      <Navbar />
      <main>
        <PageHero 
          image="/images/page-headers/projects.png" 
          title="OUR PROJECT PORTFOLIO" 
          subtitle="A comprehensive track record of turnkey electrical engineering across Industrial, Commercial, Aerospace and Institutional sectors." 
        />
        
        <section className="py-12 md:py-24 bg-white min-h-[800px]">
          <div className="site-container">
            
            {/* Filterable Project History */}
            <div className="flex flex-col items-start md:items-center justify-center mb-8 md:mb-14 flex-wrap gap-4 md:gap-6 text-left md:text-center">
              <div className="flex flex-col items-start md:items-center justify-center gap-2 md:gap-3">
                <span className="font-inter text-xs font-bold uppercase tracking-widest text-[var(--primary-dark)]">
                  Turnkey Execution Portfolio
                </span>
                <h2 className="font-inter font-bold text-3xl sm:text-4xl text-[var(--black)]">
                  Project <span className="text-[var(--primary)]">Showcase & History</span>
                </h2>
                <p className="font-inter text-xs sm:text-sm text-[var(--gray)] max-w-xl">
                  Click any project to view technical specifications, capacity metrics, and animatic photo galleries. Use card arrows to cycle through on-site photos.
                </p>
              </div>
              
              <div className="w-full max-w-lg mx-auto px-2 py-1">
                <div className="bg-white p-1 sm:p-1.5 rounded-2xl border border-gray-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] w-full">
                  <div className="bg-[#f3f4f6] p-1 sm:p-1.5 rounded-xl grid grid-cols-3 gap-1 w-full">
                    {filters.map(f => {
                      const isActive = filter === f
                      const label = f === 'In Progress' ? 'ONGOING' : f.toUpperCase()
                      const count = f === 'All' ? projectsList.length : projectsList.filter(p => p.status === f).length

                      return (
                        <button
                          key={f}
                          onClick={() => setFilter(f)}
                          className={`relative w-full px-1 sm:px-4 py-2 sm:py-2.5 rounded-lg font-inter text-[11px] sm:text-xs font-bold tracking-wider transition-all flex items-center justify-center gap-1.5 sm:gap-2 text-center ${
                            isActive
                              ? 'bg-white text-[var(--primary)] shadow-[0_2px_10px_rgba(0,0,0,0.06)] border border-gray-200/60'
                              : 'text-gray-500 hover:text-gray-800'
                          }`}
                        >
                          <span className="truncate">{label}</span>
                          <span className={`text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full font-inter font-bold shrink-0 ${
                            isActive ? 'bg-[var(--primary-soft)] text-[var(--primary-dark)]' : 'bg-gray-200/80 text-gray-600'
                          }`}>
                            {count}
                          </span>

                          {/* Green bottom dot indicator */}
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
              <motion.div layout className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project, i) => (
                    <ProjectCard
                      key={(project.id || project.name) + i}
                      project={project}
                      onOpenModal={(p) => setSelectedProject(p)}
                      priority={i < 4}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

          </div>
        </section>

        {/* Interactive Animatic Lightbox / Details Modal */}
        <ProjectGalleryModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
