'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UploadCloud, CheckCircle } from 'lucide-react'
import SectionLabel from '../shared/SectionLabel'

const RECIPIENT_EMAIL = 'Priya@adlercontracts.com'

export default function Enquiry() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [fileName, setFileName] = useState<string>('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('idle')

    try {
      const form = e.currentTarget
      const data = new FormData(form)

      const name         = (data.get('from_name')  as string) || ''
      const company      = (data.get('company')    as string) || ''
      const email        = (data.get('email')      as string) || ''
      const phone        = (data.get('phone')      as string) || ''
      const projectType  = (data.get('projectType') as string) || ''
      const reqType      = (data.get('elecReq')    as string) || ''
      const value        = (data.get('estValue')   as string) || ''
      const compDate     = (data.get('compDate')   as string) || ''
      const location     = (data.get('location')   as string) || ''
      const message      = (data.get('message')    as string) || ''

      const subject = `Engineering Project Enquiry from ${name}${company ? ` (${company})` : ''}`
      const body = [
        `Name: ${name}`,
        `Company: ${company || 'N/A'}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Project Type: ${projectType}`,
        `Electrical Requirement: ${reqType}`,
        `Estimated Project Value: ${value || 'N/A'}`,
        `Required Completion Date: ${compDate || 'N/A'}`,
        `Project Location: ${location || 'N/A'}`,
        `Uploaded File: ${fileName || 'None'}`,
        '',
        'Project Requirements & Scope:',
        message,
      ].join('\n')

      const mailtoUrl = `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      window.open(mailtoUrl, '_blank')

      setStatus('success')
      form.reset()
      setFileName('')
    } catch (error) {
      console.error(error)
      setStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white border border-[var(--border)] border-t-[4px] border-t-[var(--primary)] rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-md hover:shadow-lg transition-shadow h-full flex flex-col justify-between relative overflow-hidden">
      
      {/* Subtle Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(ellipse_at_center,var(--primary-soft)_0%,transparent_65%)] pointer-events-none" />

      <div className="relative z-10">
        
        {/* Section Header */}
        <div className="text-left mb-6 sm:mb-8">
          <SectionLabel text="B2B Technical Proposal Request" color="accent" />
          <h2 className="font-inter font-semibold text-[22px] sm:text-[30px] lg:text-[34px] leading-tight text-[var(--black)] mt-2">
            Have an Electrical Project <span className="text-[var(--primary)]">in the Pipeline?</span>
          </h2>
          <p className="font-inter text-[var(--gray)] mt-2 text-xs sm:text-sm leading-relaxed">
            Share your BOQ, drawings or project requirements. Our engineering team will review your requirements and get back to you within 24 hours.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 md:gap-y-5">
            
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="font-inter text-xs font-bold text-[var(--black-soft)] uppercase tracking-wider">Full Name *</label>
              <input required name="from_name" type="text" className="w-full bg-[var(--gray-bg)] border border-[var(--border)] rounded-lg px-3.5 py-2.5 text-[var(--black)] font-inter text-sm input-glow transition-all" placeholder="e.g. Anand Sharma" />
            </div>

            {/* Company Name */}
            <div className="space-y-1.5">
              <label className="font-inter text-xs font-bold text-[var(--black-soft)] uppercase tracking-wider">Company Name *</label>
              <input required name="company" type="text" className="w-full bg-[var(--gray-bg)] border border-[var(--border)] rounded-lg px-3.5 py-2.5 text-[var(--black)] font-inter text-sm input-glow transition-all" placeholder="e.g. SEZ Manufacturing Ltd" />
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="font-inter text-xs font-bold text-[var(--black-soft)] uppercase tracking-wider">Email Address *</label>
              <input required name="email" type="email" className="w-full bg-[var(--gray-bg)] border border-[var(--border)] rounded-lg px-3.5 py-2.5 text-[var(--black)] font-inter text-sm input-glow transition-all" placeholder="anand@company.com" />
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5">
              <label className="font-inter text-xs font-bold text-[var(--black-soft)] uppercase tracking-wider">Phone Number *</label>
              <input required name="phone" type="tel" className="w-full bg-[var(--gray-bg)] border border-[var(--border)] rounded-lg px-3.5 py-2.5 text-[var(--black)] font-inter text-sm input-glow transition-all" placeholder="+91 98765 43210" />
            </div>

            {/* Project Type */}
            <div className="space-y-1.5">
              <label className="font-inter text-xs font-bold text-[var(--black-soft)] uppercase tracking-wider">Project Type *</label>
              <select required name="projectType" className="w-full bg-[var(--gray-bg)] border border-[var(--border)] rounded-lg px-3.5 py-2.5 text-[var(--black)] font-inter text-sm input-glow transition-all appearance-none cursor-pointer">
                <option value="New installation">New Installation</option>
                <option value="Expansion">Expansion</option>
                <option value="Retrofit">Retrofit</option>
                <option value="AMC">AMC</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Consultancy">Consultancy</option>
              </select>
            </div>

            {/* Electrical Requirement */}
            <div className="space-y-1.5">
              <label className="font-inter text-xs font-bold text-[var(--black-soft)] uppercase tracking-wider">Electrical Requirement *</label>
              <select required name="elecReq" className="w-full bg-[var(--gray-bg)] border border-[var(--border)] rounded-lg px-3.5 py-2.5 text-[var(--black)] font-inter text-sm input-glow transition-all appearance-none cursor-pointer">
                <option value="HT">HT (High Tension)</option>
                <option value="LT">LT (Low Tension)</option>
                <option value="Panel">Panel Manufacturing</option>
                <option value="Transformer">Transformer Setup</option>
                <option value="Cable">Cabling & Busduct</option>
                <option value="Automation">PLC Automation</option>
                <option value="Testing">Testing & Diagnostics</option>
                <option value="Other">Other Requirement</option>
              </select>
            </div>

            {/* Estimated Project Value */}
            <div className="space-y-1.5">
              <label className="font-inter text-xs font-bold text-[var(--black-soft)] uppercase tracking-wider">Estimated Project Value</label>
              <input name="estValue" type="text" className="w-full bg-[var(--gray-bg)] border border-[var(--border)] rounded-lg px-3.5 py-2.5 text-[var(--black)] font-inter text-sm input-glow transition-all" placeholder="e.g. ₹50 Lakhs - ₹2 Cr" />
            </div>

            {/* Required Completion Date */}
            <div className="space-y-1.5">
              <label className="font-inter text-xs font-bold text-[var(--black-soft)] uppercase tracking-wider">Required Completion Date</label>
              <input name="compDate" type="date" className="w-full bg-[var(--gray-bg)] border border-[var(--border)] rounded-lg px-3.5 py-2.5 text-[var(--black)] font-inter text-sm input-glow transition-all" />
            </div>

            {/* Project Location */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="font-inter text-xs font-bold text-[var(--black-soft)] uppercase tracking-wider">Project Location *</label>
              <input required name="location" type="text" className="w-full bg-[var(--gray-bg)] border border-[var(--border)] rounded-lg px-3.5 py-2.5 text-[var(--black)] font-inter text-sm input-glow transition-all" placeholder="City, State (e.g. Belagavi, Karnataka)" />
            </div>

            {/* Upload BOQ / Drawing */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="font-inter text-xs font-bold text-[var(--black-soft)] uppercase tracking-wider block">
                Upload BOQ / Drawing (PDF, DWG, ZIP, DOCX)
              </label>
              <div className="relative border-2 border-dashed border-[var(--primary)]/40 hover:border-[var(--primary)] bg-[var(--primary-soft)]/50 rounded-xl p-4 text-center cursor-pointer transition-colors">
                <input 
                  type="file" 
                  name="boqFile" 
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                  accept=".pdf,.dwg,.zip,.rar,.doc,.docx,.xlsx"
                />
                <div className="flex flex-col items-center gap-1.5">
                  <UploadCloud className="w-6 h-6 text-[var(--primary)]" />
                  <span className="font-inter text-xs font-bold text-[var(--primary-dark)]">
                    {fileName ? `Selected: ${fileName}` : 'Upload BOQ / Drawing File'}
                  </span>
                  <span className="font-inter text-[11px] text-[var(--gray)]">
                    Drag & drop file or click to browse drawing/BOQ documents
                  </span>
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="font-inter text-xs font-bold text-[var(--black-soft)] uppercase tracking-wider">Project Details & Technical Scope *</label>
              <textarea required name="message" rows={4} className="w-full bg-[var(--gray-bg)] border border-[var(--border)] rounded-lg px-3.5 py-2.5 text-[var(--black)] font-inter text-sm input-glow transition-all resize-none" placeholder="Describe BOQ details, load specs, scope of work or technical specifications..." />
            </div>

            {/* Submit CTA */}
            <div className="md:col-span-2 mt-3">
              <motion.button 
                disabled={isSubmitting}
                whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(141,196,62,0.35)' }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[var(--primary)] text-white font-inter font-bold text-base py-3.5 rounded-lg shadow-md hover:bg-[var(--primary-dark)] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Submitting Technical Proposal Request...
                  </span>
                ) : (
                  'Submit Technical Proposal Request →'
                )}
              </motion.button>
            </div>

          </form>

          {/* Toast notifications */}
          <AnimatePresence>
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 bg-[var(--success)] text-white font-inter text-sm font-semibold p-3.5 rounded-lg shadow-lg flex items-center gap-2 justify-center"
              >
                <CheckCircle className="w-5 h-5" /> Our engineering team will review your BOQ/drawings and contact you within 24 hours!
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 bg-red-600 text-white font-inter text-sm font-semibold p-3.5 rounded-lg shadow-lg flex items-center gap-2 justify-center"
              >
                <span>✕</span> Submission error. Please contact us directly at Priya@adlercontracts.com.
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
    </div>
  )
}
