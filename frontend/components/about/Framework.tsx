'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, ShieldAlert, Award, BookOpen } from 'lucide-react'

const frameworks = [
  {
    title: 'Quality Framework',
    icon: Award,
    items: [
      'Project-Specific Quality Plans',
      'Detailed Execution Methodologies',
      'Third-Party Quality Checks',
      'Continuous Site Supervision'
    ]
  },
  {
    title: 'Safety Framework',
    icon: ShieldAlert,
    items: [
      'Comprehensive Safety Plans',
      'Safe Work Method Statements',
      'Logistics & EOHS Planning',
      'Safety Training & Protocols'
    ]
  }
]

const trainingItems = [
  'Electrical Safety Training',
  'PPE for Construction',
  'Harnessing for Work at Height',
  'First Aid & CPR Training',
  'Heavy Equipment Operation',
  'Aerial Lifts Operation'
]

export default function Framework() {
  return (
    <section className="py-12 md:py-24 bg-[var(--gray-bg)]">
      <div className="site-container">
        
        <div className="text-left md:text-center mb-8 md:mb-16">
          <h2 className="font-cormorant md:font-bebas text-4xl md:text-5xl text-[var(--accent)] mb-3 md:mb-4 uppercase">Quality & Safety <span className="text-[var(--primary)]">First</span></h2>
          <p className="font-inter text-[var(--gray)] max-w-2xl mx-auto text-sm md:text-base">
            We lead with Quality and build with Safety. Investing in our people ensures long-term reliability.
          </p>
        </div>

        {/* Quality & Safety Framework Cards with Real Page 7 Images */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-10 md:mb-16">
          {frameworks.map((f, idx) => {
            const isQuality = idx === 0
            const imageSrc = isQuality ? '/images/working/site-quality-1.jpg' : '/images/working/site-quality-2.png'
            
            return (
              <div 
                key={f.title} 
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[var(--border)] hover:border-[var(--primary)] transition-all flex flex-col"
              >
                {/* Photo Banner from Page 7 */}
                <div className="relative h-56 sm:h-64 w-full bg-[var(--black)] overflow-hidden group">
                  <img 
                    src={imageSrc} 
                    alt={`${f.title} Site Execution`}
                    className={`w-full h-full object-cover ${isQuality ? 'object-center' : 'object-top sm:object-[center_12%]'} transition-transform duration-700 group-hover:scale-105 opacity-95`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none" />
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-[var(--primary)] text-white text-[10px] font-bold px-3 py-1 shadow-md z-10">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    {isQuality ? 'ISO/Quality Compliant' : 'Zero-Accident Protocol'}
                  </div>
                  <div className="absolute bottom-3 left-4 right-4 text-white z-10">
                    <h3 className="font-inter font-bold text-lg sm:text-xl text-white">{f.title}</h3>
                  </div>
                </div>

                <div className="p-5 sm:p-6 md:p-8 flex-grow flex flex-col justify-between">
                  <ul className="space-y-3.5 mb-4">
                    {f.items.map((item, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3 font-inter text-xs sm:text-sm text-[var(--black-soft)] font-medium"
                      >
                        <CheckCircle2 size={18} className="text-[var(--primary)] shrink-0" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-[11px] font-semibold text-[var(--gray)]">
                    <span>Verified On Every Project</span>
                    <span className="text-[var(--primary-dark)]">Class I Standard</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Skill and Safety Training Showcase with Page 8 Photos */}
        <div className="bg-gradient-to-br from-[#0c1f38] to-[#071322] text-white p-5 sm:p-8 md:p-12 rounded-2xl overflow-hidden relative shadow-xl">
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--primary)]/10 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-[var(--primary)] shrink-0 border border-white/10">
                  <BookOpen className="w-6 h-6 md:w-8 md:h-8" strokeWidth={1.5} />
                </div>
                <div>
                  <span className="font-inter text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[var(--primary)]">
                    Certified Competency
                  </span>
                  <h3 className="font-inter font-bold text-xl sm:text-2xl md:text-3xl text-white">
                    Skill & Safety Training Framework
                  </h3>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-white/90">
                <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
                Regular Periodic Drills
              </span>
            </div>

            {/* Training Images Gallery from Page 8 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-8">
              <div className="relative h-36 sm:h-44 rounded-xl overflow-hidden border border-white/15 group">
                <img 
                  src="/images/training/safety-training-1.jpg" 
                  alt="Harnessing and Work at Height Training" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-3 right-3 font-inter text-[11px] font-bold text-white truncate">
                  Height Safety & Harnessing
                </span>
              </div>

              <div className="relative h-36 sm:h-44 rounded-xl overflow-hidden border border-white/15 group">
                <img 
                  src="/images/training/safety-training-2.jpg" 
                  alt="Aerial Lifts & Heavy Equipment Operations" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-3 right-3 font-inter text-[11px] font-bold text-white truncate">
                  Aerial Lifts & Heavy Equipment
                </span>
              </div>

              <div className="relative h-36 sm:h-44 rounded-xl overflow-hidden border border-white/15 group">
                <img 
                  src="/images/training/ppe-training.png" 
                  alt="PPE & Electrical Safety Certification" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-3 right-3 font-inter text-[11px] font-bold text-white truncate">
                  PPE & Electrical Isolation Protocols
                </span>
              </div>
            </div>
            
            {/* Training Items List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-2.5 gap-x-8 pt-4 border-t border-white/10">
              {trainingItems.map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-1.5">
                  <div className="w-2 h-2 bg-[var(--primary)] rounded-full shrink-0" />
                  <span className="font-inter text-xs sm:text-sm font-semibold text-white/90">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
