'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  MapPin, 
  Building2, 
  Layers, 
  IndianRupee, 
  ShieldCheck, 
  Zap, 
  Clock, 
  Wrench, 
  Camera, 
  FileText 
} from 'lucide-react'

export interface ProjectModalData {
  name: string
  client: string
  location: string
  type: string
  status: string
  progress: number
  capacity?: string
  value?: string
  powerCapacity?: string
  workAwarded?: string
  duration?: string
  description: string
  scope?: string[]
  image: string
  gallery?: string[]
}

interface Props {
  project: ProjectModalData | null
  onClose: () => void
}

export default function ProjectGalleryModal({ project, onClose }: Props) {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0)

  // Reset active photo on project change
  useEffect(() => {
    setActivePhotoIdx(0)
  }, [project])

  // Keyboard navigation
  useEffect(() => {
    if (!project) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') nextPhoto()
      if (e.key === 'ArrowLeft') prevPhoto()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [project, activePhotoIdx])

  if (!project) return null

  // Ensure gallery has at least the main image
  const photoList = project.gallery && project.gallery.length > 0 
    ? project.gallery 
    : [project.image || '/images/hero/hero-real-1.jpg']

  const nextPhoto = () => {
    setActivePhotoIdx((prev) => (prev + 1) % photoList.length)
  }

  const prevPhoto = () => {
    setActivePhotoIdx((prev) => (prev - 1 + photoList.length) % photoList.length)
  }

  const displayValue = project.value 
    ? (project.value.startsWith('₹') ? project.value : `₹${project.value}`) 
    : (project.capacity || 'Class I Verified')

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden z-10 border border-white/20 flex flex-col max-h-[92vh]"
        >
          
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[var(--border)] bg-[var(--gray-bg)] shrink-0">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                project.status === 'Completed' ? 'bg-[var(--primary)]' : 'bg-amber-500 animate-pulse'
              }`} />
              <div className="truncate">
                <div className="flex items-center gap-2">
                  <h3 className="font-inter font-bold text-base sm:text-xl text-[var(--black)] truncate">
                    {project.name}
                  </h3>
                  <span className={`text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full shrink-0 ${
                    project.status === 'Completed' 
                      ? 'bg-[var(--primary-soft)] text-[var(--primary-dark)]' 
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {project.status === 'Completed' ? 'Completed' : 'Ongoing / In Progress'}
                  </span>
                </div>
                <span className="font-inter text-xs text-[var(--gray)] truncate block">
                  {project.client} • {project.location}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-[var(--border)] flex items-center justify-center text-[var(--gray-dark)] hover:text-[var(--black)] hover:bg-[var(--primary-soft)] transition-colors shrink-0 ml-2"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Modal Body: Scrollable - DETAILS FIRST, PHOTOS AFTER */}
          <div className="overflow-y-auto flex-grow p-4 sm:p-6 md:p-8 space-y-8">
            
            {/* ── STEP 1: PROJECT INFORMATION (PRESENT FIRST) ────────────── */}
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[var(--primary-soft)] text-[var(--primary-dark)] flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--primary-dark)] block">
                      Company Profile Specification
                    </span>
                    <h4 className="font-inter font-bold text-base sm:text-lg text-[var(--black)]">
                      Project Information
                    </h4>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-[var(--gray)] block uppercase">Project Value</span>
                  <span className="font-inter font-extrabold text-base sm:text-xl text-[var(--primary-dark)]">
                    {displayValue}
                  </span>
                </div>
              </div>

              {/* 8-Tile Structured Specifications Grid (Exact fields from PDF) */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                
                {/* Client Name */}
                <div className="bg-[var(--gray-bg)] p-3 sm:p-3.5 rounded-xl border border-[var(--border)] space-y-1">
                  <span className="text-[10px] text-[var(--gray)] flex items-center gap-1 font-medium">
                    <Building2 className="w-3.5 h-3.5 text-[var(--primary)]" />
                    Client Name
                  </span>
                  <p className="font-inter font-bold text-xs sm:text-sm text-[var(--black)] leading-snug">
                    {project.client}
                  </p>
                </div>

                {/* Project Name */}
                <div className="bg-[var(--gray-bg)] p-3 sm:p-3.5 rounded-xl border border-[var(--border)] space-y-1">
                  <span className="text-[10px] text-[var(--gray)] flex items-center gap-1 font-medium">
                    <FileText className="w-3.5 h-3.5 text-[var(--primary)]" />
                    Project Name
                  </span>
                  <p className="font-inter font-bold text-xs sm:text-sm text-[var(--black)] leading-snug truncate" title={project.name}>
                    {project.name}
                  </p>
                </div>

                {/* Location */}
                <div className="bg-[var(--gray-bg)] p-3 sm:p-3.5 rounded-xl border border-[var(--border)] space-y-1">
                  <span className="text-[10px] text-[var(--gray)] flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[var(--primary)]" />
                    Location
                  </span>
                  <p className="font-inter font-semibold text-xs text-[var(--black)] leading-snug">
                    {project.location}
                  </p>
                </div>

                {/* Project Type */}
                <div className="bg-[var(--gray-bg)] p-3 sm:p-3.5 rounded-xl border border-[var(--border)] space-y-1">
                  <span className="text-[10px] text-[var(--gray)] flex items-center gap-1 font-medium">
                    <Layers className="w-3.5 h-3.5 text-[var(--primary)]" />
                    Project Type
                  </span>
                  <p className="font-inter font-semibold text-xs text-[var(--black)] leading-snug">
                    {project.type}
                  </p>
                </div>

                {/* Capacity of Power */}
                <div className="bg-[var(--gray-bg)] p-3 sm:p-3.5 rounded-xl border border-[var(--border)] space-y-1">
                  <span className="text-[10px] text-[var(--gray)] flex items-center gap-1 font-medium">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    Capacity of Power
                  </span>
                  <p className="font-inter font-bold text-xs sm:text-sm text-[var(--black)] leading-snug">
                    {project.powerCapacity || 'Class I Verified'}
                  </p>
                </div>

                {/* Work Awarded */}
                <div className="bg-[var(--gray-bg)] p-3 sm:p-3.5 rounded-xl border border-[var(--border)] space-y-1">
                  <span className="text-[10px] text-[var(--gray)] flex items-center gap-1 font-medium">
                    <Wrench className="w-3.5 h-3.5 text-[var(--primary)]" />
                    Work Awarded
                  </span>
                  <p className="font-inter font-semibold text-xs text-[var(--black)] leading-snug">
                    {project.workAwarded || 'HT/LT Supply & Installation'}
                  </p>
                </div>

                {/* Project Value */}
                <div className="bg-[var(--gray-bg)] p-3 sm:p-3.5 rounded-xl border border-[var(--border)] space-y-1">
                  <span className="text-[10px] text-[var(--gray)] flex items-center gap-1 font-medium">
                    <IndianRupee className="w-3.5 h-3.5 text-[var(--primary-dark)]" />
                    Project Value
                  </span>
                  <p className="font-inter font-bold text-xs sm:text-sm text-[var(--primary-dark)] leading-snug">
                    {displayValue}
                  </p>
                </div>

                {/* Project Duration & Status */}
                <div className="bg-[var(--gray-bg)] p-3 sm:p-3.5 rounded-xl border border-[var(--border)] space-y-1">
                  <span className="text-[10px] text-[var(--gray)] flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[var(--primary)]" />
                    Duration & Status
                  </span>
                  <p className="font-inter font-bold text-xs sm:text-sm text-[var(--black)] leading-snug">
                    {project.duration || '6-8 months'} • <span className="text-[var(--primary)]">{project.status === 'Completed' ? 'Completed' : 'Ongoing'}</span>
                  </p>
                </div>

              </div>

              {/* Scope & Description Box */}
              <div className="bg-white p-4 sm:p-5 rounded-xl border border-[var(--border)] space-y-4 shadow-sm">
                <div>
                  <span className="font-inter text-[10px] font-bold text-[var(--primary-dark)] uppercase tracking-wider block mb-1.5">
                    Overview & Engineering Scope
                  </span>
                  <p className="font-inter text-xs sm:text-sm text-[var(--black-soft)] leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {project.scope && project.scope.length > 0 && (
                  <div className="pt-3 border-t border-[var(--border)]">
                    <h5 className="font-inter font-bold text-xs text-[var(--black)] mb-2.5 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[var(--primary)]" />
                      Key Technical Deliverables:
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {project.scope.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 font-inter text-xs text-[var(--gray-dark)]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[var(--primary)] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ── STEP 2: PROJECT IMAGES & GALLERY (AFTER DETAILS) ──────── */}
            <div className="space-y-4 pt-4 border-t border-[var(--border)]">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[var(--primary-soft)] text-[var(--primary-dark)] flex items-center justify-center">
                    <Camera className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--primary-dark)] block">
                      Visual Documentation
                    </span>
                    <h4 className="font-inter font-bold text-base sm:text-lg text-[var(--black)]">
                      Project Images ({photoList.length} Photos)
                    </h4>
                  </div>
                </div>

                <span className="font-inter text-xs text-[var(--gray)] font-semibold">
                  Photo {activePhotoIdx + 1} of {photoList.length}
                </span>
              </div>

              {/* Main Photo Showcase */}
              <div className="relative rounded-xl md:rounded-2xl overflow-hidden bg-black/95 aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center group shadow-md border border-[var(--border)]">
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={photoList[activePhotoIdx]}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="relative w-full h-full"
                  >
                    <img
                      src={photoList[activePhotoIdx]}
                      alt={`${project.name} - Photo ${activePhotoIdx + 1}`}
                      className="w-full h-full object-contain sm:object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  </motion.div>
                </AnimatePresence>

                {/* Photo Counter Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-inter text-[11px] font-semibold border border-white/20">
                  Photo {activePhotoIdx + 1} of {photoList.length}
                </div>

                {/* Status Badge */}
                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full font-inter text-[11px] font-bold text-white shadow-md ${
                  project.status === 'Completed' ? 'bg-[var(--primary-dark)]' : 'bg-amber-600'
                }`}>
                  {project.status === 'Completed' ? 'Completed' : 'Ongoing'} ({project.progress}%)
                </div>

                {/* Navigation Arrows (if multiple photos) */}
                {photoList.length > 1 && (
                  <>
                    <button
                      onClick={prevPhoto}
                      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-[var(--primary)] text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all opacity-85 sm:opacity-0 group-hover:opacity-100 shadow-lg cursor-pointer"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>

                    <button
                      onClick={nextPhoto}
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-[var(--primary)] text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all opacity-85 sm:opacity-0 group-hover:opacity-100 shadow-lg cursor-pointer"
                      aria-label="Next photo"
                    >
                      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Filmstrip */}
              {photoList.length > 1 && (
                <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 pt-1 scrollbar-thin">
                  {photoList.map((photo, i) => (
                    <button
                      key={i}
                      onClick={() => setActivePhotoIdx(i)}
                      className={`relative w-20 h-14 sm:w-28 sm:h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                        activePhotoIdx === i 
                          ? 'border-[var(--primary)] shadow-md scale-105 ring-2 ring-[var(--primary)]/30' 
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={photo}
                        alt={`Thumbnail ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

            </div>

          </div>

          {/* Footer Close Action */}
          <div className="px-4 sm:px-6 py-3.5 border-t border-[var(--border)] bg-[var(--gray-bg)] flex items-center justify-between shrink-0">
            <span className="text-[11px] font-medium text-[var(--gray)]">
              Adler Contracts • Class I Electrical Contractor
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-[var(--black)] text-white hover:bg-[var(--primary)] font-inter font-bold text-xs rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              Close Gallery
            </button>
          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  )
}
