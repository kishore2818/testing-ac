'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import SectionLabel from '../shared/SectionLabel'
import ProjectCard from '../projects/ProjectCard'
import ProjectGalleryModal, { ProjectModalData } from '../projects/ProjectGalleryModal'
import { projects as staticProjects, ProjectItem } from '@/data/projects'

export default function OngoingProjects() {
  const [projectsList, setProjectsList] = useState<ProjectItem[]>(staticProjects.slice(0, 6))
  const [selectedProject, setSelectedProject] = useState<ProjectModalData | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (!process.env.NEXT_PUBLIC_API_URL) return
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`)
        if (!res.ok) return
        const apiData = await res.json()
        if (Array.isArray(apiData) && apiData.length > 0) {
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
          setProjectsList(merged.slice(0, 6))
        }
      } catch (error) {
        console.error('Error fetching projects for homepage:', error)
      }
    }
    fetchProjects()
  }, [])

  return (
    <section className="bg-white py-12 md:py-24 border-b border-[var(--border)]">
      <div className="site-container">
        
        {/* Section Header */}
        <div className="mb-8 md:mb-14 flex flex-col items-start text-left">
          <SectionLabel text="Active Infrastructure Sites" color="accent" />
          <h2 className="font-inter font-semibold text-[26px] sm:text-[34px] lg:text-[40px] leading-tight text-[var(--black)] mt-2">
            Ongoing <span className="text-[var(--primary)]">Projects</span>
          </h2>
          <p className="mt-3 max-w-2xl font-inter text-sm md:text-base text-[var(--gray)] leading-relaxed">
            Major turnkey industrial electrical execution, HT/LT substation installations, and high-capacity power distribution currently under progress across India.
          </p>
        </div>

        {/* 6 Featured Cards Grid with Interactive Swap Arrows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projectsList.map((project, index) => (
            <ProjectCard
              key={(project.id || project.name) + index}
              project={project}
              onOpenModal={(p) => setSelectedProject(p)}
              priority={index < 3}
            />
          ))}
        </div>

        <div className="mt-10 md:mt-14 text-center">
          <Link href="/projects">
            <motion.button
              whileHover={{ y: -2 }}
              className="px-8 py-3.5 bg-[var(--primary)] text-white font-inter font-bold text-sm rounded-lg shadow-md hover:bg-[var(--primary-dark)] transition-all"
            >
              Explore Complete Portfolio ({staticProjects.length}+ Projects) →
            </motion.button>
          </Link>
        </div>

      </div>

      {/* Interactive Lightbox / Modal */}
      <ProjectGalleryModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  )
}
