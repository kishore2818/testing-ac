'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionLabel from '../shared/SectionLabel'

const RECIPIENT_EMAIL = 'Priya@adlercontracts.com'

export default function Enquiry() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('idle')

    try {
      const form = e.currentTarget
      const data = new FormData(form)

      const name     = (data.get('from_name') as string) || ''
      const company  = (data.get('company')   as string) || ''
      const email    = (data.get('email')     as string) || ''
      const phone    = (data.get('phone')     as string) || ''
      const service  = (data.get('service')   as string) || ''
      const location = (data.get('location')  as string) || ''
      const message  = (data.get('message')   as string) || ''

      const subject = `Enquiry from ${name}${company ? ` — ${company}` : ''}`
      const body = [
        `Name: ${name}`,
        `Company: ${company || 'N/A'}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Service Required: ${service}`,
        `Project Location: ${location || 'N/A'}`,
        '',
        'Project Details:',
        message,
      ].join('\n')

      const mailtoUrl = `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      window.open(mailtoUrl, '_blank')

      setStatus('success')
      form.reset()
    } catch (error) {
      console.error(error)
      setStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.section 
      initial={{ x: 150, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ 
        boxShadow: "inset 0 0 40px rgba(124, 179, 66, 0.08)"
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-white py-12 md:py-24 relative overflow-hidden h-full flex flex-col justify-center border-t lg:border-l lg:border-t-0 lg:border-[var(--border)] group"
    >
      
      {/* Background Radial Light Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,var(--primary-soft)_0%,transparent_65%)] pointer-events-none group-hover:scale-110 transition-transform duration-700" />

      <div className="site-container max-w-2xl relative z-10 transition-transform duration-500 group-hover:scale-[1.01]">
        
        <div className="text-left md:text-center mb-8 md:mb-12">
          <SectionLabel text="Request a Quote" color="accent" />
          <h2 className="font-cormorant md:font-bebas text-4xl md:text-6xl text-[var(--accent)] tracking-wider">
            READY TO POWER UP YOUR <span className="text-[var(--primary)]">PROJECT?</span>
          </h2>
          <p className="font-inter text-[var(--gray)] mt-4 max-w-xl mx-auto text-sm md:text-base">
             Tell us about your requirements. Our engineering team will review the details and get back to you within 24 hours.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
            className="bg-white border border-[var(--border)] border-t-[4px] border-t-[var(--primary)] rounded-[1.5rem] md:rounded-sm p-5 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative"
          >
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            <div className="space-y-2">
              <label className="font-rajdhani uppercase tracking-widest text-xs font-bold text-[var(--primary)]">Full Name</label>
              <input required name="from_name" type="text" className="w-full bg-[var(--gray-bg)] border border-[var(--border)] rounded-sm px-4 py-3 text-[var(--black)] font-inter text-sm input-glow transition-all" placeholder="John Doe" />
            </div>

            <div className="space-y-2">
              <label className="font-rajdhani uppercase tracking-widest text-xs font-bold text-[var(--primary)]">Company Name</label>
              <input name="company" type="text" className="w-full bg-[var(--gray-bg)] border border-[var(--border)] rounded-sm px-4 py-3 text-[var(--black)] font-inter text-sm input-glow transition-all" placeholder="Acme Industries" />
            </div>

            <div className="space-y-2">
              <label className="font-rajdhani uppercase tracking-widest text-xs font-bold text-[var(--primary)]">Email Address</label>
              <input required name="email" type="email" className="w-full bg-[var(--gray-bg)] border border-[var(--border)] rounded-sm px-4 py-3 text-[var(--black)] font-inter text-sm input-glow transition-all" placeholder="john@example.com" />
            </div>

            <div className="space-y-2">
              <label className="font-rajdhani uppercase tracking-widest text-xs font-bold text-[var(--primary)]">Phone Number</label>
              <input required name="phone" type="tel" className="w-full bg-[var(--gray-bg)] border border-[var(--border)] rounded-sm px-4 py-3 text-[var(--black)] font-inter text-sm input-glow transition-all" placeholder="+91 90350 27395" />
            </div>

            <div className="space-y-2">
              <label className="font-rajdhani uppercase tracking-widest text-xs font-bold text-[var(--primary)]">Service Required</label>
              <select name="service" className="w-full bg-[var(--gray-bg)] border border-[var(--border)] rounded-sm px-4 py-3 text-[var(--black)] font-inter text-sm input-glow transition-all appearance-none cursor-pointer">
                <option value="Panel Design & Mfg">Electrical Panel Design & Mfg</option>
                <option value="Turnkey Projects">Turnkey Projects</option>
                <option value="AMC">Annual Maintenance (AMC)</option>
                <option value="Consultancy">Consultancy & Audits</option>
                <option value="Other">Other / General Enquiry</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="font-rajdhani uppercase tracking-widest text-xs font-bold text-[var(--primary)]">Project Location</label>
              <input name="location" type="text" className="w-full bg-[var(--gray-bg)] border border-[var(--border)] rounded-sm px-4 py-3 text-[var(--black)] font-inter text-sm input-glow transition-all" placeholder="City, State" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="font-rajdhani uppercase tracking-widest text-xs font-bold text-[var(--primary)]">Project Details</label>
              <textarea required name="message" rows={4} className="w-full bg-[var(--gray-bg)] border border-[var(--border)] rounded-sm px-4 py-3 text-[var(--black)] font-inter text-sm input-glow transition-all resize-none" placeholder="Provide brief requirements, specifications, or challenges..." />
            </div>

            <div className="md:col-span-2 mt-4">
              <motion.button 
                disabled={isSubmitting}
                whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(124,179,66,0.25)' }}
                whileTap={{ scale: 0.98 }}
                className="w-full shimmer-btn bg-[var(--primary)] text-white font-poppins md:font-rajdhani font-semibold md:font-bold text-base md:text-lg tracking-[0.18em] uppercase py-4 rounded-2xl md:rounded-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Sending Request...
                  </span>
                ) : (
                  'Submit Enquiry'
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
                className="absolute top-4 right-4 bg-green-500 text-white font-inter text-sm font-medium px-4 py-2 rounded shadow-lg flex items-center gap-2"
              >
                <span>✓</span> We&apos;ll contact you within 24 hours!
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute top-4 right-4 bg-[var(--primary)] text-white font-inter text-sm font-medium px-4 py-2 rounded shadow-lg flex items-center gap-2"
              >
                <span>✕</span> Failed to send. Please try again.
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
    </motion.section>
  )
}
