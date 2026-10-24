'use client'

import AdminNavbar from '@/components/AdminNavbar'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit2, Trash2, X, Upload, Loader2, MapPin, User, Tag, Search, SlidersHorizontal, Clock, MessageSquare, Briefcase, Zap, IndianRupee, Wrench, Images } from 'lucide-react'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { fetchProjects, createProject, updateProject, deleteProject } from '@/lib/api'

function ProjectsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [projects, setProjects] = useState<any[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [galleryFiles, setGalleryFiles] = useState<File[]>([])
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([])
  const [existingGallery, setExistingGallery] = useState<string[]>([])
  
  const [formData, setFormData] = useState({
    name: '',
    client: '',
    location: '',
    type: '',
    status: 'In Progress',
    description: '',
    progress: 0,
    image: '',
    value: '',
    capacity: '',
    powerCapacity: '',
    workAwarded: '',
    duration: '',
    scopeText: '',
  })

  const [filter, setFilter] = useState('All')
  const filters = ['All', 'In Progress', 'Completed']

  useEffect(() => {
    loadProjects()
  }, [])

  useEffect(() => {
    if (searchParams.get('action') === 'new' && !loading) {
      handleOpenModal()
    }
  }, [searchParams, loading])

  async function loadProjects() {
    try {
      const data = await fetchProjects()
      setProjects(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenModal = (project: any = null) => {
    setImageFile(null)
    setGalleryFiles([])
    setGalleryPreviews([])
    if (project) {
      setEditingId(project._id)
      setFormData({
        name: project.name || '',
        client: project.client || '',
        location: project.location || '',
        type: project.type || '',
        status: project.status || 'In Progress',
        description: project.description || '',
        progress: project.progress || 0,
        image: project.image || '',
        value: project.value || '',
        capacity: project.capacity || '',
        powerCapacity: project.powerCapacity || '',
        workAwarded: project.workAwarded || '',
        duration: project.duration || '',
        scopeText: (project.scope || []).join('\n'),
      })
      setImagePreview(project.image || null)
      setExistingGallery(project.gallery || [])
    } else {
      setEditingId(null)
      setFormData({
        name: '',
        client: '',
        location: '',
        type: '',
        status: filter === 'All' ? 'In Progress' : filter,
        progress: filter === 'Completed' ? 100 : 0,
        description: '',
        image: '',
        value: '',
        capacity: '',
        powerCapacity: '',
        workAwarded: '',
        duration: '',
        scopeText: '',
      })
      setImagePreview(null)
      setExistingGallery([])
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    if (searchParams.get('action') === 'new') {
      router.replace('/projects', { scroll: false })
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      setGalleryFiles(prev => [...prev, ...files])
      files.forEach(file => {
        const reader = new FileReader()
        reader.onloadend = () => {
          setGalleryPreviews(prev => [...prev, reader.result as string])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeGalleryPreview = (index: number) => {
    setGalleryFiles(prev => prev.filter((_, i) => i !== index))
    setGalleryPreviews(prev => prev.filter((_, i) => i !== index))
  }

  const removeExistingGallery = (index: number) => {
    setExistingGallery(prev => prev.filter((_, i) => i !== index))
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      try {
        await deleteProject(id)
        setProjects(projects.filter(p => p._id !== id))
      } catch (err) {
        console.error(err)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    
    const data = new FormData()
    data.append('name', formData.name)
    data.append('client', formData.client)
    data.append('location', formData.location)
    data.append('type', formData.type)
    data.append('status', formData.status)
    data.append('description', formData.description)
    data.append('progress', formData.progress.toString())
    data.append('value', formData.value)
    data.append('capacity', formData.capacity)
    data.append('powerCapacity', formData.powerCapacity)
    data.append('workAwarded', formData.workAwarded)
    data.append('duration', formData.duration)
    
    // Parse scope from newline-separated text
    const scopeArr = formData.scopeText.split('\n').map(s => s.trim()).filter(Boolean)
    data.append('scope', JSON.stringify(scopeArr))

    // Send existing gallery URLs
    data.append('existingGallery', JSON.stringify(existingGallery))
    
    if (imageFile) {
      data.append('imageFile', imageFile)
    } else {
      data.append('image', formData.image)
    }

    // Append new gallery files
    galleryFiles.forEach(file => {
      data.append('galleryFiles', file)
    })

    try {
      if (editingId) {
        const updated = await updateProject(editingId, data)
        setProjects(projects.map(p => p._id === editingId ? updated : p))
      } else {
        const created = await createProject(data)
        setProjects([created, ...projects])
      }
      handleCloseModal()
    } catch (err) {
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  const filteredProjects = projects
    .filter(p => filter === 'All' ? true : p.status === filter)
    .filter(p => 
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client?.toLowerCase().includes(searchQuery.toLowerCase())
    )

  return (
    <main className="min-h-screen bg-[#fafafa]">
      <AdminNavbar />
      
      <div className="pt-20 pb-20 site-container">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-[2px] bg-[var(--primary)]" />
              <span className="font-rajdhani text-[12px] font-bold uppercase tracking-[0.3em] text-[var(--primary)]">Management Center</span>
            </div>
            <h1 className="font-bebas text-4xl md:text-5xl text-[var(--black)] tracking-tight">
              PROJECT <span className="text-[var(--primary)]">PORTFOLIO</span>
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            {/* Search Bar */}
            <div className="relative group flex-1 min-w-[200px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--gray)] group-focus-within:text-[var(--primary)] transition-colors" size={14} />
              <input 
                type="text"
                placeholder="Search projects or clients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[var(--border)] rounded-full py-2.5 pl-10 pr-4 text-xs focus:border-[var(--primary)] focus:ring-4 focus:ring-primary/5 transition-all outline-none font-montserrat shadow-sm"
              />
            </div>
            
            <button 
              onClick={() => handleOpenModal()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[var(--black)] text-white px-5 py-2.5 rounded-full font-poppins font-bold text-xs uppercase tracking-widest hover:bg-[var(--primary)] transition-all shadow-md hover:shadow-primary/20 active:scale-95 group"
            >
              <Plus size={15} className="group-hover:rotate-90 transition-transform" />
              <span>Add Project</span>
            </button>
          </div>
        </motion.div>

        {/* Filters & Tabs */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 bg-white p-1.5 sm:p-2 rounded-2xl border border-gray-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] w-full"
        >
          <div className="bg-[#f3f4f6] p-1 sm:p-1.5 rounded-xl grid grid-cols-3 gap-1 w-full sm:w-auto">
            {filters.map(f => {
              const count = f === 'All' ? projects.length : projects.filter(p => p.status === f).length
              const isActive = filter === f
              const label = f === 'In Progress' ? 'ONGOING' : f.toUpperCase()
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`relative w-full px-1 sm:px-6 py-1.5 sm:py-2.5 rounded-lg font-poppins text-[10px] sm:text-xs font-bold tracking-wider sm:tracking-widest transition-all flex items-center justify-center gap-1 sm:gap-2 text-center ${
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
                      layoutId="activeTabDotAdmin"
                      className="absolute -bottom-1 sm:-bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--primary)]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 text-[11px] font-semibold text-[var(--black-muted)] font-poppins shrink-0">
            <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
            <span>Showing {filteredProjects.length} {filter === 'All' ? 'Total' : filter === 'In Progress' ? 'Ongoing' : 'Completed'} Projects</span>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <Loader2 className="animate-spin text-[var(--primary)]" size={32} />
            <p className="font-rajdhani text-[11px] font-bold text-[var(--gray)] uppercase tracking-widest">Loading Repository...</p>
          </div>
        ) : (
          <motion.div 
            layout 
            className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white border border-[var(--border)] rounded-xl overflow-hidden hover:shadow-lg hover:shadow-black/5 transition-all duration-300 group flex flex-col h-full"
                >
                  {/* Image Container */}
                  <div className="relative h-28 sm:h-48 overflow-hidden bg-gray-100">
                    <img 
                      src={project.image} 
                      alt={project.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    
                    {/* Floating Controls */}
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex flex-col gap-1 sm:gap-1.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 z-10">
                      <button 
                        onClick={() => handleOpenModal(project)}
                        className="p-1.5 sm:p-2 bg-white text-[var(--black)] rounded-lg shadow-md hover:bg-[var(--primary)] hover:text-white transition-colors"
                      >
                        <Edit2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(project._id)}
                        className="p-1.5 sm:p-2 bg-white text-red-500 rounded-lg shadow-md hover:bg-red-500 hover:text-white transition-colors"
                      >
                        <Trash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </button>
                    </div>

                    <div className="absolute bottom-3 left-3">
                      <span className={`text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest shadow-md ${
                        project.status === 'Completed' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
                      }`}>
                        {project.status === 'In Progress' ? 'In Progress' : 'Completed'}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-2.5 sm:p-4 flex flex-col flex-grow">
                    <div className="flex items-center gap-1 sm:gap-1.5 mb-1 sm:mb-2">
                      <Tag size={10} className="text-[var(--primary)]" />
                      <span className="font-rajdhani text-[9px] sm:text-[10px] font-bold text-[var(--gray)] uppercase tracking-widest truncate">{project.type}</span>
                    </div>

                    <h4 className="font-bebas text-sm sm:text-xl mb-1 sm:mb-2 text-[var(--black)] leading-tight group-hover:text-[var(--primary)] transition-colors truncate">
                      {project.name}
                    </h4>
                    
                    <p className="font-montserrat text-[10px] sm:text-xs text-[var(--black-muted)] mb-2 sm:mb-4 flex-grow leading-tight sm:leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    {/* Extra Info */}
                    {(project.value || project.powerCapacity) && (
                      <div className="flex items-center gap-2 mb-2 text-[9px] sm:text-[10px]">
                        {project.value && (
                          <span className="flex items-center gap-0.5 text-[var(--primary-dark)] font-bold">
                            <IndianRupee size={9} /> {project.value}
                          </span>
                        )}
                        {project.powerCapacity && (
                          <span className="flex items-center gap-0.5 text-amber-600 font-bold">
                            <Zap size={9} /> {project.powerCapacity}
                          </span>
                        )}
                      </div>
                    )}
                    
                    {project.status !== 'Completed' && (
                      <div className="mb-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <div className="flex justify-between items-center text-[9px] font-bold mb-1.5 uppercase tracking-widest font-rajdhani">
                          <span className="text-[var(--gray)]">Progress</span>
                          <span className="text-[var(--primary)]">{project.progress}%</span>
                        </div>
                        <div className="bg-gray-200 h-1 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${project.progress}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="bg-[var(--primary)] h-full"
                          />
                        </div>
                      </div>
                    )}

                    <div className="pt-2.5 sm:pt-3 border-t border-[var(--border)] mt-auto grid grid-cols-2 gap-2 min-w-0 overflow-hidden">
                      <div className="flex flex-col min-w-0 overflow-hidden">
                        <span className="text-[8px] font-bold text-[var(--gray)] uppercase tracking-widest mb-0.5 truncate block">Client</span>
                        <div className="flex items-center gap-1 min-w-0 overflow-hidden">
                          <User size={10} className="text-[var(--primary)] shrink-0" />
                          <span className="font-rajdhani text-[10px] font-bold text-[var(--black)] uppercase tracking-wide truncate block" title={project.client}>
                            {project.client}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end min-w-0 overflow-hidden text-right">
                        <span className="text-[8px] font-bold text-[var(--gray)] uppercase tracking-widest mb-0.5 truncate block">Site</span>
                        <div className="flex items-center gap-1 min-w-0 overflow-hidden justify-end w-full">
                          <MapPin size={10} className="text-[var(--gray)] shrink-0" />
                          <span className="font-rajdhani text-[10px] font-bold text-[var(--gray)] uppercase tracking-wide truncate block text-right" title={project.location}>
                            {project.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Empty State */}
            {!loading && filteredProjects.length === 0 && (
              <div className="col-span-full py-16 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
                  <Briefcase size={32} />
                </div>
                <h3 className="text-lg font-poppins font-bold text-gray-400">No projects found in this category</h3>
                <p className="text-xs text-gray-400 mt-1">Try adjusting your search or add a new entry.</p>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-white/20"
            >
              <div className="p-8 border-b border-[var(--border)] flex items-center justify-between bg-[#fcfcfc]">
                <div>
                  <h2 className="text-3xl font-bebas tracking-wider text-[var(--black)]">
                    {editingId ? 'Modify Project' : 'Initiate New Project'}
                  </h2>
                  <p className="text-[10px] font-bold text-[var(--gray)] uppercase tracking-[0.2em] mt-1">
                    System Entry ID: {editingId || 'New Record'}
                  </p>
                </div>
                <button 
                  onClick={handleCloseModal}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-10">
                    <section>
                      <h3 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[var(--black)] mb-6">
                        <SlidersHorizontal size={14} className="text-[var(--primary)]" />
                        Core Specifications
                      </h3>
                      
                      <div className="space-y-6">
                        <div className="group">
                          <label className="block text-[10px] font-bold uppercase tracking-widest text-[var(--gray)] mb-2 px-1">Project Name</label>
                          <input 
                            required
                            type="text"
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-white border border-[var(--border)] rounded-xl px-5 py-4 text-sm focus:border-[var(--primary)] focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                            placeholder="e.g. Industrial Automation Hub"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-[var(--gray)] mb-2 px-1">Client</label>
                            <input 
                              required
                              type="text"
                              value={formData.client}
                              onChange={e => setFormData({...formData, client: e.target.value})}
                              className="w-full bg-white border border-[var(--border)] rounded-xl px-5 py-4 text-sm focus:border-[var(--primary)] transition-all outline-none"
                              placeholder="Entity Name"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-[var(--gray)] mb-2 px-1">Site Location</label>
                            <input 
                              required
                              type="text"
                              value={formData.location}
                              onChange={e => setFormData({...formData, location: e.target.value})}
                              className="w-full bg-white border border-[var(--border)] rounded-xl px-5 py-4 text-sm focus:border-[var(--primary)] transition-all outline-none"
                              placeholder="City / Region"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-widest text-[var(--gray)] mb-2 px-1">Industry Sector</label>
                          <input 
                            required
                            type="text"
                            value={formData.type}
                            onChange={e => setFormData({...formData, type: e.target.value})}
                            className="w-full bg-white border border-[var(--border)] rounded-xl px-5 py-4 text-sm focus:border-[var(--primary)] transition-all outline-none"
                            placeholder="e.g. Electrical Engineering"
                          />
                        </div>
                      </div>
                    </section>

                    <section>
                      <h3 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[var(--black)] mb-6">
                        <IndianRupee size={14} className="text-[var(--primary)]" />
                        Project Specifications
                      </h3>
                      
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-[var(--gray)] mb-2 px-1">Project Value</label>
                            <input 
                              type="text"
                              value={formData.value}
                              onChange={e => setFormData({...formData, value: e.target.value})}
                              className="w-full bg-white border border-[var(--border)] rounded-xl px-5 py-4 text-sm focus:border-[var(--primary)] transition-all outline-none"
                              placeholder="e.g. 2.2 Cr"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-[var(--gray)] mb-2 px-1">Capacity</label>
                            <input 
                              type="text"
                              value={formData.capacity}
                              onChange={e => setFormData({...formData, capacity: e.target.value})}
                              className="w-full bg-white border border-[var(--border)] rounded-xl px-5 py-4 text-sm focus:border-[var(--primary)] transition-all outline-none"
                              placeholder="e.g. ₹2.20 Crore"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-[var(--gray)] mb-2 px-1">Power Capacity</label>
                            <input 
                              type="text"
                              value={formData.powerCapacity}
                              onChange={e => setFormData({...formData, powerCapacity: e.target.value})}
                              className="w-full bg-white border border-[var(--border)] rounded-xl px-5 py-4 text-sm focus:border-[var(--primary)] transition-all outline-none"
                              placeholder="e.g. 10 MVA"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-[var(--gray)] mb-2 px-1">Duration</label>
                            <input 
                              type="text"
                              value={formData.duration}
                              onChange={e => setFormData({...formData, duration: e.target.value})}
                              className="w-full bg-white border border-[var(--border)] rounded-xl px-5 py-4 text-sm focus:border-[var(--primary)] transition-all outline-none"
                              placeholder="e.g. 6 months"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-widest text-[var(--gray)] mb-2 px-1">Work Awarded</label>
                          <input 
                            type="text"
                            value={formData.workAwarded}
                            onChange={e => setFormData({...formData, workAwarded: e.target.value})}
                            className="w-full bg-white border border-[var(--border)] rounded-xl px-5 py-4 text-sm focus:border-[var(--primary)] transition-all outline-none"
                            placeholder="e.g. HT/LT Supply & Installation"
                          />
                        </div>
                      </div>
                    </section>

                    <section>
                      <h3 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[var(--black)] mb-6">
                        <Clock size={14} className="text-[var(--primary)]" />
                        Status & Milestones
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-widest text-[var(--gray)] mb-2 px-1">Phase Status</label>
                          <select 
                            value={formData.status}
                            onChange={e => setFormData({...formData, status: e.target.value, progress: e.target.value === 'Completed' ? 100 : formData.progress})}
                            className="w-full bg-white border border-[var(--border)] rounded-xl px-5 py-4 text-sm focus:border-[var(--primary)] outline-none appearance-none"
                          >
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-widest text-[var(--gray)] mb-2 px-1">Progress Metric ({formData.progress}%)</label>
                          <div className="pt-4">
                            <input 
                              type="range"
                              min="0"
                              max="100"
                              value={formData.progress}
                              disabled={formData.status === 'Completed'}
                              onChange={e => setFormData({...formData, progress: parseInt(e.target.value)})}
                              className="w-full h-2 bg-gray-100 rounded-full appearance-none cursor-pointer accent-[var(--primary)] disabled:opacity-50"
                            />
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>

                  <div className="space-y-10">
                    <section>
                      <h3 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[var(--black)] mb-6">
                        <Upload size={14} className="text-[var(--primary)]" />
                        Main Project Image
                      </h3>
                      
                      <div className="relative group aspect-video bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl overflow-hidden hover:border-[var(--primary)] transition-colors">
                        {imagePreview ? (
                          <div className="absolute inset-0">
                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <button 
                                type="button"
                                onClick={() => { setImagePreview(null); setImageFile(null); }}
                                className="p-4 bg-white text-red-500 rounded-full shadow-2xl hover:scale-110 transition-transform"
                              >
                                <Trash2 size={20} />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-4 text-gray-300 group-hover:text-[var(--primary)] transition-colors">
                              <Plus size={32} />
                            </div>
                            <p className="text-[10px] font-bold text-[var(--gray)] uppercase tracking-widest">
                              Upload high-resolution photography<br/>
                              <span className="text-[var(--primary)] underline mt-2 block cursor-pointer">Click to browse file system</span>
                            </p>
                          </div>
                        )}
                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={handleImageChange} />
                      </div>
                    </section>

                    {/* Gallery Upload Section */}
                    <section>
                      <h3 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[var(--black)] mb-6">
                        <Images size={14} className="text-[var(--primary)]" />
                        Gallery Images
                      </h3>
                      
                      <div className="space-y-4">
                        {/* Existing Gallery */}
                        {existingGallery.length > 0 && (
                          <div className="grid grid-cols-3 gap-2">
                            {existingGallery.map((url, i) => (
                              <div key={`existing-${i}`} className="relative group/gal aspect-video rounded-lg overflow-hidden border border-gray-200">
                                <img src={url} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
                                <button
                                  type="button"
                                  onClick={() => removeExistingGallery(i)}
                                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover/gal:opacity-100 transition-opacity"
                                >
                                  <X size={12} />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* New Gallery Previews */}
                        {galleryPreviews.length > 0 && (
                          <div className="grid grid-cols-3 gap-2">
                            {galleryPreviews.map((preview, i) => (
                              <div key={`new-${i}`} className="relative group/gal aspect-video rounded-lg overflow-hidden border-2 border-[var(--primary)] border-dashed">
                                <img src={preview} alt={`New ${i + 1}`} className="w-full h-full object-cover" />
                                <span className="absolute top-1 left-1 text-[8px] bg-[var(--primary)] text-white px-1.5 py-0.5 rounded-full font-bold">NEW</span>
                                <button
                                  type="button"
                                  onClick={() => removeGalleryPreview(i)}
                                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover/gal:opacity-100 transition-opacity"
                                >
                                  <X size={12} />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Add More Gallery */}
                        <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-[var(--primary)] transition-colors cursor-pointer">
                          <p className="text-[10px] font-bold text-[var(--gray)] uppercase tracking-widest">
                            + Add gallery images
                          </p>
                          <input type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={handleGalleryChange} />
                        </div>
                      </div>
                    </section>

                    <section>
                      <h3 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[var(--black)] mb-6">
                        <MessageSquare size={14} className="text-[var(--primary)]" />
                        Detailed Description
                      </h3>
                      <textarea 
                        required
                        rows={4}
                        value={formData.description}
                        onChange={e => setFormData({...formData, description: e.target.value})}
                        className="w-full bg-white border border-[var(--border)] rounded-2xl px-5 py-4 text-sm focus:border-[var(--primary)] transition-all outline-none resize-none font-montserrat leading-relaxed"
                        placeholder="Comprehensive project scope and key highlights..."
                      />
                    </section>

                    <section>
                      <h3 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[var(--black)] mb-6">
                        <Wrench size={14} className="text-[var(--primary)]" />
                        Scope of Work (one item per line)
                      </h3>
                      <textarea 
                        rows={5}
                        value={formData.scopeText}
                        onChange={e => setFormData({...formData, scopeText: e.target.value})}
                        className="w-full bg-white border border-[var(--border)] rounded-2xl px-5 py-4 text-sm focus:border-[var(--primary)] transition-all outline-none resize-none font-montserrat leading-relaxed"
                        placeholder={"Heavy Industrial HT/LT Power Distribution\nOverhead Crane Power Rails & Busbar System\nFactory Bay High-Lumen LED System"}
                      />
                    </section>
                  </div>
                </div>

                <div className="mt-12 flex gap-4 pt-8 border-t border-[var(--border)]">
                  <button 
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 px-8 py-4 rounded-xl font-poppins font-bold text-xs uppercase tracking-widest bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    disabled={submitting}
                    type="submit"
                    className="flex-[2] flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-poppins font-bold text-xs uppercase tracking-widest bg-[var(--black)] text-white hover:bg-[var(--primary)] transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? <Loader2 className="animate-spin" size={18} /> : (editingId ? 'Update Record' : 'Publish to Site')}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  )
}

export default function ProjectsManagement() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectsContent />
    </Suspense>
  )
}
