'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Clients', href: '/clients' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  const { scrollY } = useScroll()
  const shadow = useTransform(scrollY, [0, 80], ['0 0px 0px rgba(0,0,0,0)', '0 4px 20px rgba(0,0,0,0.06)'])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 220, damping: 30 }}
      style={{ boxShadow: shadow }}
      className="fixed top-0 left-0 right-0 z-[1000] h-16 md:h-[72px] bg-white/90 backdrop-blur-md border-b border-[var(--border)] transition-all duration-300"
    >
      <div className="site-container h-full flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0 group z-50">
          <Image
            src="/logo.png"
            alt="Adler Contracts"
            width={180}
            height={52}
            priority
            className="h-9 md:h-11 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Nav — Right-aligned text links */}
        <nav className="hidden lg:flex items-center gap-6 ml-auto mr-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.label}
                href={link.href}
                className="relative group flex flex-col items-center gap-0.5"
              >
                <span
                  className={`font-poppins text-[13px] tracking-[0.15em] uppercase transition-colors duration-200 ${
                    isActive
                      ? 'text-[var(--black)] font-extrabold'
                      : 'text-[var(--black-soft)] group-hover:text-[var(--primary)] font-bold'
                  }`}
                >
                  {link.label}
                </span>
                {/* Hover underline */}
                <span
                  className={`h-[2px] w-full rounded-full bg-[var(--primary)] transition-transform duration-300 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            )
          })}
        </nav>

        {/* Right: CTA + Mobile toggle */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          {/* CTA */}
          <Link href="/contact">
            <motion.button
              whileHover={{ y: -1, boxShadow: '0 6px 24px rgba(124,179,66,0.3)' }}
              whileTap={{ scale: 0.97 }}
              className="bg-[var(--primary)] text-white font-poppins font-semibold text-[10px] md:text-[11px] tracking-[0.16em] uppercase px-4 md:px-6 py-2 md:py-2.5 rounded-full shadow-sm hover:bg-[var(--primary-dark)] transition-colors"
            >
              Find Us
            </motion.button>
          </Link>

          {/* Mobile hamburger */}
          <button
            aria-label="Toggle Menu"
            className="lg:hidden p-2 z-50 rounded-full border border-[var(--border)] bg-white/90 shadow-sm"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className={`w-5 h-0.5 mb-1 transition-all bg-[var(--black)] ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <div className={`w-5 h-0.5 mb-1 transition-all bg-[var(--black)] ${menuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-5 h-0.5 transition-all bg-[var(--black)] ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown — unchanged */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-0 right-0 bg-white/97 backdrop-blur-xl shadow-xl lg:hidden border-t border-[var(--border)] z-[999]"
          >
            <div className="site-container py-5 flex flex-col gap-5">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--gray-bg)] px-4 py-3">
                <p className="font-poppins text-[11px] uppercase tracking-[0.28em] text-[var(--gray)]">Adler Contracts</p>
                <p className="mt-2 font-inter text-sm text-[var(--black-soft)]">Turnkey electrical solutions, panel systems, and industrial project execution.</p>
              </div>
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block rounded-2xl px-4 py-3 font-poppins text-[15px] font-semibold transition-colors ${
                      pathname === link.href
                        ? 'bg-[var(--primary-soft)] text-[var(--primary)]'
                        : 'text-[var(--black)] hover:bg-[var(--gray-bg)] hover:text-[var(--primary)]'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
