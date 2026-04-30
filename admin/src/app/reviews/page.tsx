'use client'

import AdminNavbar from '@/components/AdminNavbar'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit2, Trash2, X, Upload, Check, Loader2, Quote, Star, User, Briefcase, MessageSquare, SlidersHorizontal } from 'lucide-react'
import { useState, useEffect } from 'react'
import { fetchReviews, createReview, updateReview, deleteReview } from '@/lib/api'

export default function ReviewsManagement() {
  const [reviews, setReviews] = useState<any[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    quote: '',
    rating: 5,
    image: ''
  })

  useEffect(() => {
    loadReviews()
  }, [])

  async function loadReviews() {
    try {
      const data = await fetchReviews()
      setReviews(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenModal = (review: any = null) => {
    setImageFile(null)
    if (review) {
      setEditingId(review._id)
      setFormData({
        name: review.name,
        role: review.role,
        company: review.company,
        quote: review.quote,
        rating: review.rating || 5,
        image: review.image
      })
      setImagePreview(review.image)
    } else {
      setEditingId(null)
      setFormData({
        name: '',
        role: '',
        company: '',
        quote: '',
        rating: 5,
        image: ''
      })
      setImagePreview(null)
    }
    setIsModalOpen(true)
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

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this review? This record will be permanently removed.')) {
      try {
        await deleteReview(id)
        setReviews(reviews.filter(r => r._id !== id))
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
    data.append('role', formData.role)
    data.append('company', formData.company)
    data.append('quote', formData.quote)
    data.append('rating', formData.rating.toString())
    
    if (imageFile) {
      data.append('imageFile', imageFile)
    } else {
      data.append('image', formData.image)
    }

    try {
      if (editingId) {
        const updated = await updateReview(editingId, data)
        setReviews(reviews.map(r => r._id === editingId ? updated : r))
      } else {
        const created = await createReview(data)
        setReviews([created, ...reviews])
      }
      setIsModalOpen(false)
    } catch (err) {
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#fafafa]">
      <AdminNavbar />
      
      <div className="pt-20 pb-20 site-container">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-[2px] bg-[var(--primary)]" />
              <span className="font-rajdhani text-[12px] font-bold uppercase tracking-[0.3em] text-[var(--primary)]">Testimonials Hub</span>
            </div>
            <h1 className="font-bebas text-4xl md:text-5xl text-[var(--black)] tracking-tight">
              CLIENT <span className="text-[var(--primary)]">FEEDBACK</span>
            </h1>
          </div>
          
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-[var(--black)] text-white px-6 py-2.5 rounded-full font-poppins font-bold text-[10px] uppercase tracking-widest hover:bg-[var(--primary)] transition-all shadow-md hover:shadow-primary/20 active:scale-95 group"
          >
            <Plus size={14} className="group-hover:rotate-90 transition-transform" />
            Add New Review
          </button>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <Loader2 className="animate-spin text-[var(--primary)]" size={32} />
            <p className="font-rajdhani text-[11px] font-bold text-[var(--gray)] uppercase tracking-widest">Retrieving Feedback...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {reviews.map((review, idx) => (
                <motion.div
                  key={review._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white border border-[var(--border)] rounded-xl p-6 hover:shadow-md hover:shadow-black/5 transition-all duration-300 group relative flex flex-col sm:flex-row gap-6 overflow-hidden"
                >
                  {/* Quote mark background */}
                  <div className="absolute -top-2 -left-2 font-bebas text-[80px] text-gray-50 leading-none pointer-events-none select-none group-hover:text-primary/5 transition-colors duration-300">
                    &ldquo;
                  </div>

                  {/* Admin Controls */}
                  <div className="absolute top-4 right-4 flex gap-1 z-20 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                    <button 
                      onClick={() => handleOpenModal(review)}
                      className="p-2 bg-white shadow-sm border border-gray-100 rounded-lg text-[var(--black)] hover:bg-[var(--primary)] hover:text-white transition-colors"
                    >
                      <Edit2 size={12} />
                    </button>
                    <button 
                      onClick={() => handleDelete(review._id)}
                      className="p-2 bg-white shadow-sm border border-gray-100 rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>

                  {/* Image Panel */}
                  <div className="relative w-16 h-16 sm:w-24 sm:h-24 shrink-0 overflow-hidden rounded-full sm:rounded-xl shadow-sm border border-gray-100">
                    <img
                      src={review.image}
                      alt={review.company}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Content Panel */}
                  <div className="flex-1 flex flex-col relative z-10">
                    <div className="flex gap-1 mb-3">
                      {[1,2,3,4,5].map(s => (
                        <Star
                          key={s}
                          size={10}
                          fill={s <= (review.rating || 5) ? 'var(--primary)' : 'none'}
                          stroke={s <= (review.rating || 5) ? 'var(--primary)' : '#d1d5db'}
                          className=""
                        />
                      ))}
                    </div>
                    
                    <p className="font-montserrat text-xs text-[var(--black-muted)] leading-relaxed mb-4 font-medium italic relative">
                      {review.quote}
                    </p>
                    
                    <div className="mt-auto pt-3 border-t border-gray-50">
                      <h4 className="font-bebas text-lg text-[var(--black)] tracking-wide mb-0.5">
                        {review.name}
                      </h4>
                      <p className="font-rajdhani text-[10px] font-bold text-[var(--primary)] uppercase tracking-wider flex items-center gap-1.5">
                        <Briefcase size={8} />
                        {review.role} <span className="text-gray-300">•</span> {review.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Empty State */}
            {!loading && reviews.length === 0 && (
              <div className="col-span-full py-16 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
                  <MessageSquare size={32} />
                </div>
                <h3 className="text-lg font-poppins font-bold text-gray-400">No client feedback registered yet</h3>
                <p className="text-xs text-gray-400 mt-1">Start showcasing your success stories.</p>
              </div>
            )}
          </div>
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
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-white/20"
            >
              <div className="p-8 border-b border-[var(--border)] flex items-center justify-between bg-[#fcfcfc]">
                <div>
                  <h2 className="text-3xl font-bebas tracking-wider text-[var(--black)]">
                    {editingId ? 'Modify Testimony' : 'New Feedback Record'}
                  </h2>
                  <p className="text-[10px] font-bold text-[var(--gray)] uppercase tracking-[0.2em] mt-1">
                    System Entry ID: {editingId || 'New Record'}
                  </p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
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
                        <User size={14} className="text-[var(--primary)]" />
                        Identity Details
                      </h3>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-widest text-[var(--gray)] mb-2 px-1">Client Name</label>
                          <input 
                            required
                            type="text"
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-white border border-[var(--border)] rounded-xl px-5 py-4 text-sm focus:border-[var(--primary)] focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                            placeholder="e.g. Johnathan Smith"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-widest text-[var(--gray)] mb-2 px-1">Designation / Professional Role</label>
                          <input 
                            required
                            type="text"
                            value={formData.role}
                            onChange={e => setFormData({...formData, role: e.target.value})}
                            className="w-full bg-white border border-[var(--border)] rounded-xl px-5 py-4 text-sm focus:border-[var(--primary)] transition-all outline-none"
                            placeholder="e.g. Operations Head"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-widest text-[var(--gray)] mb-2 px-1">Organization / Company</label>
                          <input 
                            required
                            type="text"
                            value={formData.company}
                            onChange={e => setFormData({...formData, company: e.target.value})}
                            className="w-full bg-white border border-[var(--border)] rounded-xl px-5 py-4 text-sm focus:border-[var(--primary)] transition-all outline-none"
                            placeholder="e.g. Thyssenkrupp Aerospace"
                          />
                        </div>
                      </div>
                    </section>
                  </div>

                  <div className="space-y-10">
                    <section>
                      <h3 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[var(--black)] mb-6">
                        <Upload size={14} className="text-[var(--primary)]" />
                        Visual Representative
                      </h3>
                      
                      <div className="relative group aspect-square max-w-[240px] mx-auto bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl overflow-hidden hover:border-[var(--primary)] transition-colors">
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
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg mb-4 text-gray-300 group-hover:text-[var(--primary)] transition-colors">
                              <Plus size={24} />
                            </div>
                            <p className="text-[10px] font-bold text-[var(--gray)] uppercase tracking-widest leading-relaxed">
                              Upload headshot<br/>or corporate logo
                            </p>
                          </div>
                        )}
                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={handleImageChange} />
                      </div>
                    </section>

                    <section>
                      <h3 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[var(--black)] mb-6">
                        <MessageSquare size={14} className="text-[var(--primary)]" />
                        Testimonial Narrative
                      </h3>
                      <textarea 
                        required
                        rows={5}
                        value={formData.quote}
                        onChange={e => setFormData({...formData, quote: e.target.value})}
                        className="w-full bg-white border border-[var(--border)] rounded-2xl px-5 py-4 text-sm focus:border-[var(--primary)] transition-all outline-none resize-none font-montserrat leading-relaxed italic"
                        placeholder="Share the client's perspective on the project execution..."
                      />
                    </section>
                  </div>
                </div>

                <div className="mt-12 flex gap-4 pt-8 border-t border-[var(--border)]">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-8 py-4 rounded-xl font-poppins font-bold text-xs uppercase tracking-widest bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    disabled={submitting}
                    type="submit"
                    className="flex-[2] flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-poppins font-bold text-xs uppercase tracking-widest bg-[var(--black)] text-white hover:bg-[var(--primary)] transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? <Loader2 className="animate-spin" size={18} /> : (editingId ? 'Update Testimony' : 'Publish Feedback')}
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
