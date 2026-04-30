'use client'

import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const IMAGES = [
  '/images/hero/panel-1.jpg',
  '/images/hero/workers/worker-1.png',
  '/images/hero/workers/worker-2.png',
  '/images/hero/workers/worker-3.png',
  '/images/hero/workers/worker-4.png',
  '/images/hero/workers/worker-5.png',
]

const statsData = [
  { end: 17, label: "Projects Completed", suffix: "" },
  { end: 10, label: "Years Experience", suffix: "+" },
  { end: 14, label: "Happy Clients", suffix: "" },
  { end: 2, label: "Regional Offices", suffix: "" }
];

const PARTICLES = [
  { id: 0, x: 12, y: 82, size: 3, delay: 0.4, duration: 7 },
  { id: 1, x: 28, y: 65, size: 4, delay: 1.2, duration: 9 },
  { id: 2, x: 45, y: 75, size: 2, delay: 2.3, duration: 8 },
  { id: 3, x: 62, y: 70, size: 3, delay: 3.1, duration: 10 },
  { id: 4, x: 78, y: 84, size: 4, delay: 0.8, duration: 7 },
  { id: 5, x: 88, y: 58, size: 2, delay: 1.8, duration: 8 },
  { id: 6, x: 18, y: 50, size: 3, delay: 2.7, duration: 9 },
  { id: 7, x: 35, y: 40, size: 2, delay: 4.1, duration: 8 },
  { id: 8, x: 52, y: 32, size: 4, delay: 1.1, duration: 9 },
  { id: 9, x: 68, y: 46, size: 3, delay: 2.5, duration: 10 },
  { id: 10, x: 84, y: 36, size: 2, delay: 3.6, duration: 7 },
  { id: 11, x: 8, y: 26, size: 3, delay: 0.9, duration: 9 },
]

function StatsCard({ stat, isActive, isMobile, index }: { stat: typeof statsData[0], isActive: boolean, isMobile: boolean, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isMobile ? 50 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 + (index * 0.1), duration: 0.6 }}
      className={`relative ${isMobile ? 'min-w-[200px] mx-2' : 'w-full'}`}
    >
      <motion.div
        animate={{ 
          scale: isActive ? 1.05 : 1,
          backgroundColor: isActive ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.85)',
          borderColor: isActive ? 'var(--primary)' : 'rgba(255, 255, 255, 0.2)',
          boxShadow: isActive ? '0 10px 30px rgba(124,179,66,0.3)' : '0 4px 6px rgba(0,0,0,0.05)',
          x: !isMobile && isActive ? -10 : 0,
          y: isMobile && isActive ? -5 : 0
        }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between p-3 sm:p-4 rounded-lg backdrop-blur-xl border-l-[4px] sm:border-l-[6px] overflow-hidden"
        style={{ 
          borderLeftColor: isActive ? 'var(--primary)' : 'transparent',
        }}
      >
        <div className="flex flex-col relative z-10 w-full">
          <div className="font-bebas text-3xl sm:text-4xl leading-none text-[var(--primary)]">
            {stat.end}<span className="text-xl ml-1">{stat.suffix}</span>
          </div>
          <div className={`font-rajdhani text-[10px] sm:text-[11px] uppercase tracking-widest font-bold mt-1 ${isActive ? 'text-[var(--black)]' : 'text-[var(--gray)]'}`}>
            {stat.label}
          </div>
        </div>
        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex justify-center items-center bg-[var(--primary-soft)] text-[var(--primary)] border border-[var(--primary)]/20 transition-opacity ${isActive ? 'opacity-100' : 'opacity-30'}`}>
          <span className="text-base sm:text-xl">✦</span>
        </div>
      </motion.div>
    </motion.div>
  )
}

function AutoHighlightingStats() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % statsData.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 lg:hidden">
        {statsData.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 + i * 0.08 }}
            className="rounded-[1.25rem] border border-white/15 bg-white/10 p-4 backdrop-blur-xl"
          >
            <div className="font-cormorant text-3xl text-white leading-none">{stat.end}{stat.suffix}</div>
            <div className="mt-2 font-poppins text-[10px] uppercase tracking-[0.18em] text-white/75">{stat.label}</div>
          </motion.div>
        ))}
      </div>
      <div className="hidden lg:flex w-[300px] flex-col gap-4 relative z-30 ml-8">
        {statsData.map((stat, i) => (
          <StatsCard key={i} stat={stat} isActive={activeIndex === i} isMobile={false} index={i} />
        ))}
      </div>
    </>
  )
}

function Particles() {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden opacity-20 hidden md:block">
      {PARTICLES.map(p => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, x: `${p.x}vw`, y: `${p.y}vh` }}
          animate={{
            opacity: [0, 0.6, 0],
            y: [`${p.y}vh`, `${p.y - 15}vh`]
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bg-[var(--primary)] rounded-full"
          style={{ width: p.size, height: p.size }}
        />
      ))}
    </div>
  )
}

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % IMAGES.length)
    }, 5000)
    
    return () => {
      clearInterval(timer)
    }
  }, [])

  const { scrollY } = useScroll()
  const scaleX = useSpring(useTransform(scrollY, [0, 1000], [0, 1]), { stiffness: 100, damping: 30 })

  const words = "Powering possibilities with reliable electrical solutions.".split(" ")

  return (
    <section className="relative min-h-[560px] md:min-h-[600px] lg:h-screen w-full overflow-hidden bg-[var(--gray-bg)] flex items-center">

      {/* Slideshow Background */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentSlide}
            src={IMAGES[currentSlide]}
            alt="Adler Contracts Background"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <Particles />

      {/* Since 2014 Header - Enhanced visibility for all screens */}
      <div className="absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 sm:gap-4 z-40">
        <div className="w-px h-14 sm:h-20 bg-gradient-to-b from-transparent via-[var(--primary)] to-transparent opacity-100" />
        <span className="font-bebas text-[var(--primary)] tracking-[4px] sm:tracking-[6px] text-[11px] sm:text-xs opacity-100 vertical-text py-2 sm:py-4 font-bold">SINCE 2014</span>
        <div className="w-px h-14 sm:h-20 bg-gradient-to-b from-transparent via-[var(--primary)] to-transparent opacity-100" />
      </div>

      <div className="site-container relative z-20 pt-24 pb-8 md:pt-20 md:pb-0">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12 w-full">

          {/* Main Content */}
          <div className="flex-1 flex flex-col items-start text-left max-w-4xl pl-10 lg:pl-0">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/35 backdrop-blur-sm border border-white/20 mb-4 sm:mb-6 shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
              <span className="font-rajdhani text-white text-[9px] sm:text-[11px] uppercase tracking-[0.2em] font-bold">
                Precision Electrical Engineering Specialists
              </span>
            </motion.div>

            <h1 className="font-cormorant md:font-bebas text-[clamp(2.85rem,10vw,5.5rem)] text-white leading-[0.92] tracking-tight mb-4 sm:mb-6 drop-shadow-2xl max-w-3xl">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className={`${word.toLowerCase().includes('possibilities') || word.toLowerCase().includes('solutions.') ? 'text-[var(--primary)]' : ''} inline-block mr-2 sm:mr-4`}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="font-inter text-white/85 text-sm sm:text-lg md:text-xl max-w-2xl mb-6 sm:mb-8 leading-relaxed font-normal"
            >
              Adler Contracts delivers turnkey electrical systems for industrial, commercial, and institutional projects, from design and planning to installation and commissioning.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto"
            >
              <Link href="/services" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ y: -3, boxShadow: '0 10px 25px rgba(124,179,66,0.3)' }}
                  className="shimmer-btn bg-[var(--primary)] text-white font-poppins md:font-rajdhani uppercase tracking-[0.18em] font-semibold md:font-bold px-6 sm:px-8 py-3.5 rounded-2xl md:rounded-sm shadow-xl w-full text-sm sm:text-base"
                >
                  Explore Expertise
                </motion.button>
              </Link>
              <Link href="/projects" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ y: -3, backgroundColor: 'rgba(255,255,255,0.1)' }}
                  className="border border-white/35 text-white bg-black/20 backdrop-blur font-poppins md:font-rajdhani uppercase tracking-[0.18em] font-semibold md:font-bold px-6 sm:px-8 py-3.5 rounded-2xl md:rounded-sm hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors w-full text-sm sm:text-base"
                >
                  Our Projects
                </motion.button>
              </Link>
            </motion.div>
          </div>

          <div className="w-full lg:w-auto mt-4 lg:mt-0">
             <AutoHighlightingStats />
          </div>

        </div>
      </div>

      <motion.div
        style={{ scaleX, transformOrigin: "0%" }}
        className="absolute bottom-0 left-0 right-0 h-[4px] bg-[var(--primary)] z-30"
      />

      <style jsx>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
        }
      `}</style>
    </section>
  )
}
