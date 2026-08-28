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
  { end: 17, label: "Projects Delivered", suffix: "+" },
  { end: 10, label: "Years Team Experience", suffix: "+" },
  { end: 5, label: "Clients Served", suffix: "+" },
  { end: 1, label: "Class I Contractor", suffix: "" }
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
          backgroundColor: isActive ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.88)',
          borderColor: isActive ? 'var(--primary)' : 'rgba(255, 255, 255, 0.2)',
          boxShadow: isActive ? '0 10px 30px rgba(141,196,62,0.35)' : '0 4px 6px rgba(0,0,0,0.05)',
          x: !isMobile && isActive ? -10 : 0,
          y: isMobile && isActive ? -5 : 0
        }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl backdrop-blur-xl border-l-[4px] sm:border-l-[6px] overflow-hidden"
        style={{ 
          borderLeftColor: isActive ? 'var(--primary)' : 'transparent',
        }}
      >
        <div className="flex flex-col relative z-10 w-full">
          <div className="font-inter font-bold text-2xl sm:text-3xl leading-none text-[var(--primary)]">
            {stat.end}<span className="text-lg ml-0.5">{stat.suffix}</span>
          </div>
          <div className={`font-inter text-[11px] sm:text-[12px] font-semibold mt-1 ${isActive ? 'text-[var(--black)]' : 'text-[var(--gray)]'}`}>
            {stat.label}
          </div>
        </div>
        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex justify-center items-center bg-[var(--primary-soft)] text-[var(--primary)] border border-[var(--primary)]/20 transition-opacity ${isActive ? 'opacity-100' : 'opacity-40'}`}>
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
      <div className="grid grid-cols-2 gap-2 lg:hidden">
        {statsData.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 + i * 0.08 }}
            className="rounded-[1rem] border border-white/15 bg-white/10 p-3 backdrop-blur-xl"
          >
            <div className="font-inter font-bold text-2xl sm:text-3xl text-white leading-none">{stat.end}{stat.suffix}</div>
            <div className="mt-1 font-inter text-[10px] sm:text-[11px] font-medium text-white/85">{stat.label}</div>
          </motion.div>
        ))}
      </div>
      <div className="hidden lg:flex w-[280px] xl:w-[300px] flex-col gap-3 xl:gap-3.5 relative z-30">
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

  return (
    <section className="relative min-h-[100dvh] md:min-h-[640px] lg:h-screen w-full overflow-hidden bg-[var(--black)] flex items-center">

      {/* Slideshow Background */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentSlide}
            src={IMAGES[currentSlide]}
            alt="Adler Contracts Project Background"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/40" />
      </div>

      <Particles />

      {/* Since 2024 Context / Class I Contractor Ribbon */}
      <div className="absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 sm:gap-4 z-40">
        <div className="w-px h-14 sm:h-20 bg-gradient-to-b from-transparent via-[var(--primary)] to-transparent opacity-100" />
        <span className="font-inter font-semibold text-[var(--primary)] tracking-[3px] text-[10px] sm:text-xs opacity-100 vertical-text py-2 sm:py-4">CLASS I CONTRACTOR</span>
        <div className="w-px h-14 sm:h-20 bg-gradient-to-b from-transparent via-[var(--primary)] to-transparent opacity-100" />
      </div>

      <div className="site-container relative z-20 pt-20 pb-4 md:pt-20 md:pb-0">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10 xl:gap-16 w-full">

          {/* Main Content */}
          <div className="flex-1 min-w-0 flex flex-col items-start text-left pl-8 lg:pl-0">
            
            {/* Tagline Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 mb-4 sm:mb-6 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
              <span className="font-inter text-white text-[11px] sm:text-[13px] font-semibold tracking-wide">
                10+ Years Team Experience | 17+ Projects | Class I Contractor
              </span>
            </motion.div>

            {/* H1 Heading: Inter 600, 40px, 48px, -0.02em */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="font-inter font-semibold text-[28px] sm:text-[34px] lg:text-[40px] leading-[36px] sm:leading-[42px] lg:leading-[48px] tracking-[-0.02em] text-white mb-4 sm:mb-6 drop-shadow-2xl max-w-3xl"
            >
              Industrial Electrical Infrastructure. <span className="text-[var(--primary)]">Engineered. Installed. Commissioned.</span>
            </motion.h1>

            {/* Subheading: Inter 400, 18px, 28px, 0 */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="font-inter font-normal text-[14px] sm:text-[16px] lg:text-[18px] leading-[22px] sm:leading-[25px] lg:leading-[28px] tracking-normal text-white/90 max-w-2xl mb-6 sm:mb-8"
            >
              End-to-end electrical solutions for manufacturing, aerospace, automotive, food processing and commercial infrastructure — from engineering and panel manufacturing to installation, testing and commissioning.
            </motion.p>

            {/* Buttons: Inter 700, 14px, 20px, 0 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto"
            >
              <Link href="/services" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ y: -2, boxShadow: '0 10px 25px rgba(141,196,62,0.4)' }}
                  className="shimmer-btn bg-[var(--primary)] text-white font-inter font-bold text-[14px] leading-[20px] tracking-normal px-6 sm:px-7 py-3 rounded-lg shadow-xl w-full text-center transition-transform"
                >
                  Our Industrial Solutions
                </motion.button>
              </Link>

              <Link href="/projects" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ y: -2, backgroundColor: 'rgba(255,255,255,0.15)' }}
                  className="border border-white/40 text-white bg-black/30 backdrop-blur-md font-inter font-bold text-[14px] leading-[20px] tracking-normal px-6 sm:px-7 py-3 rounded-lg hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors w-full text-center"
                >
                  View Projects
                </motion.button>
              </Link>

              <Link href="/contact" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ y: -2, backgroundColor: 'rgba(141,196,62,0.2)' }}
                  className="border border-[var(--primary)]/60 text-[var(--primary)] bg-black/40 backdrop-blur-md font-inter font-bold text-[14px] leading-[20px] tracking-normal px-5 sm:px-6 py-3 rounded-lg hover:bg-[var(--primary)] hover:text-white transition-all w-full text-center"
                >
                  Request a Technical Proposal
                </motion.button>
              </Link>
            </motion.div>
          </div>

          <div className="w-full lg:w-[280px] xl:w-[300px] shrink-0 mt-4 lg:mt-0">
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
