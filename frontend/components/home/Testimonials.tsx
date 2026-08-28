'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionLabel from '../shared/SectionLabel'

const staticTestimonials = [
  {
    quote: "Adler delivered the electrical infrastructure within the required project schedule and maintained excellent coordination throughout execution.",
    name: "Rajesh Kulkarni",
    role: "Vice President — Infrastructure",
    company: "Aequs SEZ / Aerospace Division",
    image: "/images/hero/panel-1.jpg"
  },
  {
    quote: "Their technical design and panel manufacturing precision ensured smooth commissioning for our high-capacity processing facility with zero downtime.",
    name: "Vikram Sharma",
    role: "Chief General Manager",
    company: "SATS Food Solutions",
    image: "/images/projects/comp-1.png"
  },
  {
    quote: "Adler's engineering team handled our HT/LT power distribution with outstanding safety adherence, structured quality checks, and disciplined project management.",
    name: "Ananth Ramaswamy",
    role: "Head of Electrical Projects",
    company: "SFS Industrial Manufacturing",
    image: "/images/projects/comp-5.png"
  }
]

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<any[]>(staticTestimonials)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (!process.env.NEXT_PUBLIC_API_URL) return;
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews`)
        if (!res.ok) return;
        const data = await res.json()
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data.map((r: any) => ({
            quote: r.quote || r.comment,
            name: r.name,
            role: r.role || r.designation || 'Project Director',
            company: r.company,
            image: r.image || '/images/hero/panel-1.jpg'
          })))
        }
      } catch (error) {
        console.error('Error fetching reviews:', error)
      }
    }
    fetchReviews()
  }, [])

  const handleNext = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const handlePrev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  return (
    <section className="bg-[var(--gray-bg)] py-12 md:py-24 border-y border-[var(--border)]">
      <div className="site-container">
        
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 md:mb-12 gap-4">
          <div>
            <SectionLabel text="Client Feedback" color="accent" />
            <h2 className="font-inter font-semibold text-[26px] sm:text-[34px] lg:text-[38px] leading-tight text-[var(--black)] mt-2">
              What Industrial Clients <span className="text-[var(--primary)]">Say</span>
            </h2>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={handlePrev}
              aria-label="Previous Testimonial"
              className="w-10 h-10 border border-[var(--border)] bg-white rounded-lg flex items-center justify-center text-[var(--black)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all shadow-sm font-bold"
            >
              ←
            </button>
            <button 
              onClick={handleNext}
              aria-label="Next Testimonial"
              className="w-10 h-10 border border-[var(--border)] bg-white rounded-lg flex items-center justify-center text-[var(--black)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all shadow-sm font-bold"
            >
              →
            </button>
          </div>
        </div>

        <div className="relative min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="bg-white border border-[var(--border)] shadow-md rounded-2xl overflow-hidden flex flex-col lg:flex-row"
            >
              {/* Image Panel */}
              <div className="relative lg:w-80 h-40 lg:h-auto shrink-0 overflow-hidden bg-[var(--black)]">
                <img
                  src={testimonials[current].image}
                  alt={testimonials[current].company}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-end p-5">
                  <div>
                    <span className="font-inter text-xs font-bold text-[var(--primary)] uppercase tracking-wider block">
                      Verified Client
                    </span>
                    <p className="font-inter text-sm font-semibold text-white mt-0.5">
                      {testimonials[current].company}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content Panel */}
              <div className="p-6 md:p-10 relative flex-1 flex flex-col justify-between">
                
                {/* 5 Stars */}
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill="#8DC43E" className="shrink-0">
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                    </svg>
                  ))}
                </div>
                
                {/* Quote */}
                <p className="font-inter text-base sm:text-lg lg:text-xl text-[var(--black)] leading-relaxed font-normal mb-6 italic">
                  &ldquo;{testimonials[current].quote}&rdquo;
                </p>
                
                {/* Name & Role */}
                <div className="flex items-center gap-3.5 pt-4 border-t border-[var(--border)]">
                  <div className="w-11 h-11 bg-[var(--primary-soft)] border border-[var(--primary)]/30 rounded-full flex justify-center items-center font-inter font-bold text-base text-[var(--primary-dark)] shrink-0">
                    {testimonials[current].name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-inter text-sm md:text-base font-bold text-[var(--black)]">
                      {testimonials[current].name}
                    </h4>
                    <p className="font-inter text-xs text-[var(--gray)]">
                      {testimonials[current].role} · <span className="font-semibold text-[var(--black-soft)]">{testimonials[current].company}</span>
                    </p>
                  </div>
                </div>

                {/* Dots indicator */}
                <div className="flex gap-1.5 mt-6">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`h-1.5 rounded-full transition-all ${i === current ? 'w-6 bg-[var(--primary)]' : 'w-2 bg-[var(--border)]'}`}
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
