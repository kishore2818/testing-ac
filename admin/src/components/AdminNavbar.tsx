'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Briefcase, MessageSquare, ExternalLink, Plus, LogOut, Settings, KeyRound, ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { logoutAdmin } from '@/lib/api'
import ChangePasswordModal from './ChangePasswordModal'

const navLinks = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Projects', href: '/projects', icon: Briefcase },
  { label: 'Reviews', href: '/reviews', icon: MessageSquare },
]

export default function AdminNavbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [changePasswordOpen, setChangePasswordOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setSettingsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleLogout() {
    setSettingsOpen(false)
    logoutAdmin()
    router.replace('/login')
  }

  function handleChangePassword() {
    setSettingsOpen(false)
    setChangePasswordOpen(true)
  }

  return (
    <>
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
              href="https://www.adlercontracts.in/"
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

            <div className="w-[1px] h-6 bg-[var(--border)] mx-2" />

            {/* Settings dropdown */}
            <div className="relative" ref={dropdownRef}>
              <motion.button
                id="admin-settings-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSettingsOpen(!settingsOpen)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-full font-poppins text-[13px] font-semibold tracking-wide transition-all ${
                  settingsOpen
                    ? 'bg-[var(--primary-soft)] text-[var(--primary)]'
                    : 'text-[var(--black-soft)] hover:bg-[var(--gray-bg)] hover:text-[var(--primary)]'
                }`}
              >
                <Settings size={16} className={`transition-transform duration-300 ${settingsOpen ? 'rotate-90' : ''}`} />
                <ChevronDown size={12} className={`transition-transform duration-200 ${settingsOpen ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {settingsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl shadow-black/10 border border-[var(--border)] overflow-hidden z-[1100]"
                  >
                    {/* Header */}
                    <div className="px-4 py-3 bg-[var(--gray-bg)] border-b border-[var(--border)]">
                      <p className="text-[9px] font-bold tracking-[0.2em] text-[var(--gray)] uppercase font-rajdhani">
                        Admin Settings
                      </p>
                    </div>

                    {/* Change Password */}
                    <button
                      id="settings-change-password"
                      onClick={handleChangePassword}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[var(--primary-soft)] group transition-all"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[var(--primary-soft)] group-hover:bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] transition-colors">
                        <KeyRound size={14} />
                      </div>
                      <div>
                        <p className="text-[12px] font-semibold text-[var(--black)] font-poppins">Change Password</p>
                        <p className="text-[10px] text-[var(--gray)] font-montserrat">Update login credentials</p>
                      </div>
                    </button>

                    <div className="h-[1px] bg-[var(--border)] mx-4" />

                    {/* Logout */}
                    <button
                      id="settings-logout"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-red-50 group transition-all"
                    >
                      <div className="w-7 h-7 rounded-lg bg-red-50 group-hover:bg-red-100 flex items-center justify-center text-red-500 transition-colors">
                        <LogOut size={14} />
                      </div>
                      <div>
                        <p className="text-[12px] font-semibold text-red-600 font-poppins">Logout</p>
                        <p className="text-[10px] text-[var(--gray)] font-montserrat">End this session</p>
                      </div>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Mobile: show settings + logout only */}
          <div className="flex md:hidden items-center gap-2 ml-auto">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setSettingsOpen(!settingsOpen)}
                className="p-2 rounded-full hover:bg-[var(--gray-bg)] text-[var(--black-soft)] transition-all"
              >
                <Settings size={20} />
              </button>
              <AnimatePresence>
                {settingsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-[var(--border)] overflow-hidden z-[1100]"
                  >
                    <button onClick={handleChangePassword} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[var(--primary-soft)]">
                      <KeyRound size={14} className="text-[var(--primary)]" />
                      <span className="text-[12px] font-semibold text-[var(--black)] font-poppins">Change Password</span>
                    </button>
                    <div className="h-[1px] bg-[var(--border)] mx-4" />
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50">
                      <LogOut size={14} className="text-red-500" />
                      <span className="text-[12px] font-semibold text-red-600 font-poppins">Logout</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={changePasswordOpen}
        onClose={() => setChangePasswordOpen(false)}
      />
    </>
  )
}
