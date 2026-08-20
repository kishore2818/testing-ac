'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import SectionLabel from '../shared/SectionLabel'
import ScrollReveal, { fadeLeft, fadeRight } from '../shared/ScrollReveal'
import Link from 'next/link'

export default function AboutSnapshot() {
  return (
    <section className="bg-white pt-12 pb-4 md:py-16 overflow-hidden">
      <div className="site-container">
        
        {/* Centered Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="text-center flex flex-col items-start md:items-center mb-8 sm:mb-12"
        >
          <SectionLabel text="Who We Are" color="accent" centered={true} />
          <h2 className="font-cormorant md:font-bebas text-[clamp(2.2rem,8vw,3.75rem)] leading-[1.1] md:leading-[1.15] text-[var(--accent)] mt-4 md:mt-6">
            Engineering excellence in <span className="text-[var(--primary)] block md:inline-block mt-3 md:mt-0 md:ml-2 px-3 md:px-4 py-1 border-2 border-[var(--primary)] bg-[var(--primary-soft)] rounded-lg shadow-sm">power distribution</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-[1100px] mx-auto">
          
          {/* Left Column (Text) */}
          <ScrollReveal animation={fadeLeft} className="flex flex-col items-start lg:items-start text-left mb-10 lg:mb-0 lg:ml-auto lg:pr-4 order-2 lg:order-1">
            <motion.p 
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-inter text-[var(--black-soft)] font-medium text-base md:text-lg mb-6 md:mb-8 leading-relaxed max-w-2xl border-l-4 border-[var(--primary)] pl-4 md:pl-6 py-3 bg-[var(--primary-soft)] rounded-r-2xl md:rounded-r-lg shadow-sm"
            >
              Adler Contracts is a Class I Electrical contractor with deep expertise in turnkey End to End Electrical solutions. Our reputation is built on meticulous planning, robust project management, and a relentless focus on quality and safety.
            </motion.p>

            <div className="space-y-4 md:space-y-6 mb-8 md:mb-10 w-full max-w-xl">
              {[
                { i: '01', title: 'Meticulous Planning', desc: 'Detailed execution strategies for precision delivery.' },
                { i: '02', title: 'Quality & Safety First', desc: 'Uncompromising standards in every structure we deliver.' },
                { i: '03', title: 'Transparent Partnerships', desc: 'Built on trust, speed, and optimum cost management.' },
              ].map((feat, idx) => (
                <div key={idx} className="flex items-start gap-4 rounded-2xl border border-[var(--border)] bg-[var(--gray-bg)] px-4 py-4 sm:bg-transparent sm:border-0 sm:px-0 sm:py-0">
                  <div className="font-bebas text-2xl text-[var(--primary)] border-b-2 border-primary-200 h-8">{feat.i}</div>
                  <div>
                    <h4 className="font-poppins md:font-rajdhani font-semibold md:font-bold text-lg md:text-xl uppercase mb-1">{feat.title}</h4>
                    <p className="font-inter text-sm text-[var(--gray)]">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/about">
              <motion.button 
                whileHover={{ backgroundColor: 'var(--primary)', color: 'white' }}
                className="border-2 border-[var(--primary)] text-[var(--primary)] font-poppins md:font-rajdhani uppercase tracking-[0.18em] font-semibold md:font-bold px-6 md:px-8 py-3 rounded-2xl md:rounded-sm transition-colors w-full sm:w-auto"
              >
                Read More About Us
              </motion.button>
            </Link>
          </ScrollReveal>

          {/* Right Column (Images) */}
          <ScrollReveal animation={fadeRight} delay={0.2} className="relative w-full order-1 lg:order-2">
            {/* Background decorative stripe */}
            <div 
              className="absolute -top-8 -right-4 w-3/4 h-[115%] bg-[var(--gray-bg)] z-0 hidden md:block"
              style={{ clipPath: 'polygon(20% 0, 100% 0, 80% 100%, 0 100%)' }}
            />
            
            <div className="relative z-10 w-full max-w-sm lg:w-[80%] mx-auto lg:mr-auto lg:ml-8 aspect-[4/5] group">
              
              {/* Inner container to clip the image scaling without clipping the badges */}
              <div className="absolute inset-0 bg-[var(--black)] p-3 shadow-2xl rounded-sm overflow-hidden border border-gray-100">
                {/* Corner brackets */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[var(--primary)] z-20 m-4 pointer-events-none" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[var(--primary)] z-20 m-4 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[var(--primary)] z-20 m-4 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[var(--primary)] z-20 m-4 pointer-events-none" />

                <img 
                  src="/images/hero/workers/worker-5.png" 
                  alt="Adler Contracts Engineering Team" 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
                />
              </div>
              


              {/* Floating Badge 2 */}
              <motion.div 
                animate={{ y: [0, 10, 0] }} 
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 sm:-bottom-8 right-3 sm:-right-8 bg-[var(--primary)] text-white p-4 sm:p-6 shadow-2xl rounded-2xl md:rounded-sm z-30 flex flex-col items-center sm:items-start"
              >
                <div className="font-bebas text-4xl sm:text-5xl mb-1 flex items-baseline">10<span className="text-xl sm:text-2xl ml-1">+</span></div>
                <div className="font-rajdhani tracking-widest text-center sm:text-left uppercase text-[10px] sm:text-xs font-bold w-full sm:w-24">Years of Excellence</div>
              </motion.div>

            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  )
}
