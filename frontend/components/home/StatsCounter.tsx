'use client'

import { useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import ScrollReveal from '../shared/ScrollReveal'

function Counter({ end, prefix = '', suffix = '' }: { end: number, prefix?: string, suffix?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp: number | null = null;
    const duration = 2000;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const val = ease * end;
      setCount(end % 1 !== 0 ? parseFloat(val.toFixed(1)) : Math.floor(val));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, isInView]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>
}

export default function StatsCounter() {
  const stats = [
    { label: 'Projects since 2024', value: 14, prefix: '', suffix: '' },
    { label: 'Project value delivered', value: 10.7, prefix: '₹', suffix: ' Cr+' },
    { label: 'Capacity installed', value: 27, prefix: '', suffix: ' MVA+' },
    { label: 'Class I licence scope', value: 33, prefix: '', suffix: ' kV' },
  ]

  return (
    <section className="bg-[var(--gray-bg)] py-10 md:py-20 relative z-10 md:-mt-8">
      <div className="site-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {stats.map((s, i) => (
            <ScrollReveal key={i} delay={i * 0.1} className="h-full">
              <motion.div
                whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(124,179,66,0.1)' }}
                className="bg-white p-5 md:p-8 rounded-[1.25rem] md:rounded-sm shadow-sm border-t-4 border-[var(--primary)] h-full flex flex-col justify-center text-center"
              >
                <div className="font-cormorant md:font-bebas text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl text-[var(--primary)] mb-1 md:mb-2 whitespace-nowrap">
                  <Counter end={s.value} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <div className="font-poppins md:font-rajdhani text-[11px] md:text-sm uppercase tracking-[0.14em] md:tracking-widest text-[var(--gray)] font-semibold md:font-bold">
                  {s.label}
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
