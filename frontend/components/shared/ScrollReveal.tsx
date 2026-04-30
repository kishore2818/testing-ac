'use client'

import { motion, type Variants } from 'framer-motion'

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

export default function ScrollReveal({
  children,
  animation = fadeUp,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  animation?: Variants
  className?: string
  delay?: number
}) {
  const variantWithDelay: Variants = {
    ...animation,
    visible: {
      ...(animation.visible as any),
      transition: { ...(animation.visible as any)?.transition, delay },
    },
  }

  return (
    <motion.div
      variants={variantWithDelay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
