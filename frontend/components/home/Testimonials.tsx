'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionLabel from '../shared/SectionLabel'

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews`)
        const data = await res.json()
        setTestimonials(data)
      } catch (error) {
        console.error('Error fetching reviews:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchReviews()
  }, [])

  const handleNext = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const handlePrev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  if (loading) {
    return <div className="py-24 text-center font-inter text-[var(--gray)]">Loading client feedback...</div>
  }

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="bg-[var(--gray-bg)] py-14 md:py-24 border-y border-[var(--border)]">
      <div className="site-container">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-left md:text-center flex flex-col items-start md:items-center mb-8 md:mb-16"
        >
          <SectionLabel text="Client Feedback" color="accent" />
          <h2 className="font-cormorant md:font-bebas text-4xl md:text-6xl text-[var(--accent)] tracking-wider">
            WHAT THEY <span className="text-[var(--primary)]">SAY</span>
          </h2>
          
          <div className="flex gap-3 md:gap-4 mt-5 md:mt-8">
            <button 
              onClick={handlePrev}
              aria-label="Previous Testimonial"
              className="w-10 h-10 md:w-12 md:h-12 border border-[var(--primary)] bg-white rounded-full flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all shadow-sm"
            >
              ←
            </button>
            <button 
              onClick={handleNext}
              aria-label="Next Testimonial"
              className="w-12 h-12 border border-[var(--primary)] bg-white rounded-full flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all shadow-sm"
            >
              →
            </button>
          </div>
        </motion.div>

        <div className="relative min-h-[320px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="bg-white border text-[var(--black)] border-[var(--border)] shadow-md rounded-[1.5rem] md:rounded-sm overflow-hidden flex flex-col md:flex-row"
            >
              {/* Image Panel */}
              <div className="relative md:w-72 h-32 md:h-auto shrink-0 overflow-hidden">
                <img
                  src={testimonials[current].image}
                  alt={testimonials[current].company}
                  className="w-full h-full object-cover brightness-100 contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex items-end p-6">
                  <div>
                    <p className="font-rajdhani text-white text-xs font-bold uppercase tracking-widest opacity-90">
                      {testimonials[current].company}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 md:p-14 relative flex-1">
                {/* Huge quote mark background */}
                <div className="absolute -top-2 left-4 md:left-10 font-bebas text-[110px] md:text-[180px] text-[var(--gray-bg)] leading-none pointer-events-none select-none">
                  &ldquo;
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4 md:mb-6 relative z-10">
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} width="18" height="18" viewBox="0 0 24 24" fill="var(--primary)" className="shrink-0">
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                    </svg>
                  ))}
                </div>
                
                <p className="font-inter text-[13px] md:text-2xl text-[var(--gray-dark)] leading-relaxed mb-4 md:mb-8 relative z-10 font-medium line-clamp-4 md:line-clamp-none">
                  {testimonials[current].quote}
                </p>
                
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-10 h-10 md:w-14 md:h-14 bg-[var(--primary-soft)] border border-[var(--primary)]/20 rounded-full flex justify-center items-center font-bebas text-lg md:text-2xl text-[var(--primary)] shrink-0">
                    {testimonials[current].name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-poppins md:font-rajdhani text-[14px] md:text-xl font-semibold md:font-bold text-[var(--black)] uppercase tracking-wider">
                      {testimonials[current].name}
                    </h4>
                    <p className="font-inter text-[10px] md:text-sm text-[var(--gray)]">
                      {testimonials[current].role} · {testimonials[current].company}
                    </p>
                  </div>
                </div>

                {/* Dot indicators */}
                <div className="flex gap-2 mt-4 md:mt-8">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`h-1.5 rounded-full transition-all ${i === current ? 'w-8 bg-[var(--primary)]' : 'w-3 bg-[var(--border)]'}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
