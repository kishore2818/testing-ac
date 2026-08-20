'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Briefcase, MessageSquare, ExternalLink, Plus, LogOut, Settings } from 'lucide-react'

const navLinks = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Projects', href: '/projects', icon: Briefcase },
  { label: 'Reviews', href: '/reviews', icon: MessageSquare },
]

export default function AdminNavbar() {
  const pathname = usePathname()
  const router = useRouter()



  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-[1000] h-16 bg-white border-b border-[var(--border)]"
    >
      <div className="site-container h-full flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0 group z-50">
          <Image
            src="/logo.png"
            alt="Adler Contracts"
            width={144}
            height={36}
            priority
            className="h-8 md:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 ml-auto">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            const Icon = link.icon
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-poppins text-[13px] font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'bg-[var(--primary-soft)] text-[var(--primary)]'
                    : 'text-[var(--black-soft)] hover:bg-[var(--gray-bg)] hover:text-[var(--primary)]'
                }`}
              >
                <Icon size={16} />
                {link.label}
              </Link>
            )
          })}
          
          <div className="w-[1px] h-6 bg-[var(--border)] mx-2" />
          
          <a
            href="https://ac-seven-indol.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full font-poppins text-[13px] font-semibold tracking-wide text-[var(--accent)] hover:bg-[var(--accent-soft)] transition-all mr-2"
          >
            <ExternalLink size={16} />
            View Site
          </a>

          <Link href="/projects?action=new">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[var(--primary)] text-white px-5 py-2 rounded-full font-poppins font-bold text-[12px] tracking-wider uppercase shadow-lg shadow-primary/20 hover:bg-[var(--primary-dark)] transition-all flex items-center gap-2"
            >
              <Plus size={16} />
              New Project
            </motion.button>
          </Link>


        </nav>

        {/* Mobile Nav toggle could be added here if needed, but for admin a simple bar is usually enough for now */}
      </div>
    </motion.header>
  )
}
