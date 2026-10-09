'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import PageHero from '@/components/shared/PageHero'
import ProjectCard from '@/components/projects/ProjectCard'
import ProjectGalleryModal, { ProjectModalData } from '@/components/projects/ProjectGalleryModal'
import { projects as staticProjects, ProjectItem } from '@/data/projects'

export default function ProjectsPage() {
  const [filter, setFilter] = useState('All')
  const [projectsList, setProjectsList] = useState<ProjectItem[]>(staticProjects)
  const [selectedProject, setSelectedProject] = useState<ProjectModalData | null>(null)
  const [loading, setLoading] = useState(true)
  
  const filters = ['All', 'In Progress', 'Completed']

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (!process.env.NEXT_PUBLIC_API_URL) {
          setLoading(false)
          return
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`)
        if (!res.ok) throw new Error('Failed to fetch from API')
        const apiData = await res.json()
        
        if (Array.isArray(apiData) && apiData.length > 0) {
          // Merge API data with static gallery mappings preserving verified PDF details
          const merged: ProjectItem[] = staticProjects.map((s) => {
            const apiP = apiData.find((a: any) => {
              const aName = a.name?.toLowerCase() || ''
              const sName = s.name.toLowerCase()
              return aName === sName || 
                (sName.includes('foxconn') && aName.includes('foxconn')) ||
                (sName.includes('unit-4') && aName.includes('unit-4')) ||
                (sName.includes('sterling') && aName.includes('sterling')) ||
                (sName.includes('sfs') && aName.includes('sfs')) ||
                (sName.includes('thyssenkrupp') && aName.includes('thyssenkrupp'))
            })
            if (!apiP) return s
            const img = s.image || apiP.image || '/images/projects/ongoing-placeholder.jpg'
            return {
              ...s,
              id: apiP._id,
              name: s.name,
              client: s.client,
              location: s.location,
              type: s.type,
              status: s.status,
              progress: apiP.progress ?? s.progress,
              value: s.value || apiP.value,
              capacity: s.capacity || apiP.capacity,
              powerCapacity: s.powerCapacity || apiP.powerCapacity,
              workAwarded: s.workAwarded || apiP.workAwarded,
              duration: s.duration || apiP.duration,
              description: s.description,
              image: img,
              gallery: s.gallery && s.gallery.length > 0 ? s.gallery : [img]
            }
          })

          const extraApiProjects = apiData
            .filter((apiP: any) => !staticProjects.some((s) => {
              const aName = apiP.name?.toLowerCase() || ''
              const sName = s.name.toLowerCase()
              return aName === sName || 
                (sName.includes('foxconn') && aName.includes('foxconn')) ||
                (sName.includes('unit-4') && aName.includes('unit-4')) ||
                (sName.includes('sterling') && aName.includes('sterling')) ||
                (sName.includes('sfs') && aName.includes('sfs')) ||
                (sName.includes('thyssenkrupp') && aName.includes('thyssenkrupp'))
            }))
            .map((apiP: any) => ({
              id: apiP._id,
              name: apiP.name,
              client: apiP.client,
              location: apiP.location,
              type: apiP.type || 'Electrical Project',
              status: apiP.status || 'In Progress',
              progress: apiP.progress ?? 100,
              value: apiP.value || 'Class I Verified',
              capacity: apiP.capacity || 'Class I Verified',
              powerCapacity: apiP.powerCapacity || 'Class I',
              workAwarded: apiP.workAwarded || 'HT/LT Supply & Installation',
              duration: apiP.duration || '6 months',
              description: apiP.description || '',
              scope: apiP.scope || ['Turnkey Electrical Execution'],
              image: apiP.image || '/images/hero/hero-real-1.jpg',
              gallery: [apiP.image || '/images/hero/hero-real-1.jpg']
            }))

          setProjectsList([...merged, ...extraApiProjects])
        }
      } catch (error) {
        console.error('Error fetching projects from API, fallback to verified static data:', error)
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
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
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

