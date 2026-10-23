'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Eye, MapPin, Building2, Layers, IndianRupee, Zap } from 'lucide-react'
import { ProjectItem } from '@/data/projects'

interface Props {
  project: ProjectItem & { _id?: string }
  onOpenModal: (project: ProjectItem) => void
  priority?: boolean
}

export default function ProjectCard({ project, onOpenModal, priority = false }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0)

  // Determine photo list: use gallery if available, otherwise single image
  const photos = project.gallery && project.gallery.length > 0 
    ? project.gallery 
    : [project.image || '/images/hero/hero-real-1.jpg']

  const hasMultiplePhotos = photos.length > 1

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIdx((prev) => (prev + 1) % photos.length)
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIdx((prev) => (prev - 1 + photos.length) % photos.length)
  }

  const displayValue = project.value 
    ? (project.value.startsWith('₹') ? project.value : `₹${project.value}`) 
    : (project.capacity || 'Class I Verified')

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
      transition={{ duration: 0.3 }}
      onClick={() => onOpenModal(project)}
      className="bg-white border border-[var(--border)] rounded-2xl overflow-hidden hover:border-[var(--primary)] transition-all duration-300 group flex flex-col h-full cursor-pointer shadow-sm relative"
    >
      {/* Card Image Area with Arrows & Indicators */}
      <div className="relative h-32 sm:h-52 md:h-56 bg-[var(--black)] overflow-hidden">
        
        {/* Animated Photo Transition */}
        <AnimatePresence mode="wait">
          <motion.img
            key={photos[currentIdx]}
            src={photos[currentIdx]}
            alt={`${project.name} - Photo ${currentIdx + 1}`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            loading={priority ? 'eager' : 'lazy'}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-1.5 left-1.5 right-1.5 sm:top-2.5 sm:left-2.5 sm:right-2.5 flex items-center justify-between z-10 pointer-events-none gap-1">
          {/* Status Badge */}
          <span className={`inline-flex items-center gap-1 px-1.5 sm:px-2.5 py-0.5 rounded-full text-[8px] sm:text-[10px] font-bold text-white shadow-md shrink-0 ${
            project.status === 'Completed' ? 'bg-[var(--primary-dark)]' : 'bg-amber-600'
          }`}>
            <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-white animate-pulse" />
            <span className="truncate">{project.status === 'Completed' ? 'Completed' : 'Ongoing'}</span>
          </span>

          {/* Project Value / Capacity Badge */}
          {displayValue && (
            <span className="px-1.5 sm:px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white font-inter text-[8px] sm:text-[10px] font-bold border border-white/20 truncate">
              {displayValue}
            </span>
          )}
        </div>

        {/* Two Arrow Icons for Swapping (if multiple photos exist) */}
        {hasMultiplePhotos && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-1.5 sm:left-2 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-black/55 hover:bg-[var(--primary)] text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all opacity-80 sm:opacity-0 group-hover:opacity-100 z-20 shadow-md hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-black/55 hover:bg-[var(--primary)] text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all opacity-80 sm:opacity-0 group-hover:opacity-100 z-20 shadow-md hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="Next photo"
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </>
        )}

        {/* Photo Counter & Dot Indicators at Bottom of Image */}
        <div className="absolute bottom-1.5 sm:bottom-2.5 left-2 sm:left-3 right-2 sm:right-3 flex items-center justify-between z-10 pointer-events-none">
          {hasMultiplePhotos && (
            <div className="hidden sm:flex items-center gap-1">
              {photos.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentIdx === i ? 'w-4 bg-[var(--primary)]' : 'w-1.5 bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}

          {hasMultiplePhotos && (
            <span className="text-[8px] sm:text-[10px] font-semibold text-white/90 bg-black/50 backdrop-blur-sm px-1.5 sm:px-2 py-0.5 rounded-md border border-white/10 ml-auto">
              {currentIdx + 1}/{photos.length} Photos
            </span>
          )}
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-2.5 sm:p-5 flex flex-col flex-grow bg-white">
        
        {/* Industry Type Tag */}
        <div className="flex items-center justify-between gap-1 mb-1 sm:mb-1.5">
          <span className="font-inter text-[9px] sm:text-[11px] font-bold text-[var(--primary-dark)] uppercase tracking-wider truncate">
            {project.type}
          </span>
        </div>

        {/* Project Name */}
        <h3 className="font-inter font-bold text-xs sm:text-base text-[var(--black)] leading-snug group-hover:text-[var(--primary)] transition-colors mb-1 sm:mb-2 line-clamp-1">
          {project.name}
        </h3>

        {/* Description - Compact on mobile, 2 lines on larger */}
        <p className="font-inter text-[10px] sm:text-xs text-[var(--gray)] leading-tight sm:leading-relaxed mb-2 sm:mb-4 line-clamp-1 sm:line-clamp-2">
          {project.description}
        </p>

        {/* Metadata Specs */}
        <div className="mt-auto pt-2 sm:pt-3 border-t border-[var(--border)] space-y-1 sm:space-y-2 text-[10px] sm:text-xs font-inter">
          <div className="flex items-center justify-between gap-1 text-[9px] sm:text-[11px]">
            <span className="text-[var(--gray)] flex items-center gap-1 truncate">
              <Building2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[var(--primary)] shrink-0" />
              <span className="truncate">{project.client}</span>
            </span>
            <span className="text-[var(--black)] font-medium flex items-center gap-0.5 shrink-0">
              <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[var(--primary)] shrink-0" />
              <span>{project.location?.split(',')[0]}</span>
            </span>
          </div>

          <div className="flex items-center justify-between text-[9px] sm:text-[11px] pt-1 sm:pt-1.5 border-t border-dashed border-gray-100">
            <span className="text-[var(--primary-dark)] font-bold flex items-center gap-0.5">
              <IndianRupee className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[var(--primary)]" />
              {displayValue}
            </span>
            {project.powerCapacity && (
              <span className="text-[var(--gray)] font-medium flex items-center gap-0.5">
                <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-500" />
                {project.powerCapacity}
              </span>
            )}
          </div>

          <div className="pt-1.5 sm:pt-2 flex items-center justify-between text-[9px] sm:text-[11px] font-semibold border-t border-[var(--border)]">
            <span className="text-[var(--primary-dark)] inline-flex items-center gap-1 group-hover:underline">
              <Eye className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
              View Details
            </span>
            <span className="text-[var(--gray)] group-hover:text-[var(--primary)] transition-colors">
              →
            </span>
          </div>
        </div>

      </div>
    </motion.div>
  )
}
