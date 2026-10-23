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
  const [totalCount, setTotalCount] = useState(staticProjects.length)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL
        if (!apiUrl) return

        const res = await fetch(`${apiUrl}/api/projects`, { cache: 'no-store' })
        if (!res.ok) return
        const apiData = await res.json()

        if (Array.isArray(apiData) && apiData.length > 0) {
          // Map API projects
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

          // Sort completed first per revision guide
          mapped.sort((a, b) => (a.status === 'Completed' ? -1 : 1))

          setTotalCount(mapped.length)
          setProjectsList(mapped.slice(0, 6))
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
          <SectionLabel text="Project Portfolio" color="accent" />
          <h2 className="font-inter font-semibold text-[26px] sm:text-[34px] lg:text-[40px] leading-tight text-[var(--black)] mt-2">
            Completed & Ongoing <span className="text-[var(--primary)]">Projects</span>
          </h2>
          <p className="mt-3 max-w-2xl font-inter text-sm md:text-base text-[var(--gray)] leading-relaxed">
            14 projects since 2024 across Karnataka and Tamil Nadu, worth ₹10.7 Cr+ and totalling 27 MVA+ of capacity. Finished work shown first.
          </p>
        </div>

        {/* 6 Featured Cards Grid with Interactive Swap Arrows */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
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
              Explore Complete Portfolio ({totalCount} Projects) →
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
