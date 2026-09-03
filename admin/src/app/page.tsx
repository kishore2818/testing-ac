'use client'

import AdminNavbar from '@/components/AdminNavbar'
import { motion } from 'framer-motion'
import { Briefcase, MessageSquare, CheckCircle2, Clock, ArrowUpRight, LayoutGrid, Users, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { fetchProjects, fetchReviews } from '@/lib/api'

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    completedProjects: 0,
    inProgressProjects: 0,
    totalReviews: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      try {
        const [projects, reviews] = await Promise.all([fetchProjects(), fetchReviews()])
        setStats({
          totalProjects: projects.length,
          completedProjects: projects.filter((p: any) => p.status === 'Completed').length,
          inProgressProjects: projects.filter((p: any) => p.status === 'In Progress').length,
          totalReviews: reviews.length
        })
      } catch (error) {
        console.error('Error loading stats:', error)
      } finally {
        setLoading(false)
      }
    }
    loadStats()
  }, [])

  const statCards = [
    { label: 'Total Portfolio', value: stats.totalProjects, icon: Briefcase, color: 'var(--accent)', trend: '+12%' },
    { label: 'Active Pipeline', value: stats.inProgressProjects, icon: Clock, color: 'var(--primary)', trend: 'Ongoing' },
    { label: 'Deliveries', value: stats.completedProjects, icon: CheckCircle2, color: '#10b981', trend: 'Completed' },
  ]

  return (
    <main className="min-h-screen bg-[#fafafa]">
      <AdminNavbar />
      
      <div className="pt-20 pb-20 site-container">
        {/* Header Section */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="text-[var(--primary)]" size={16} />
              <span className="font-rajdhani text-[12px] font-bold uppercase tracking-[0.3em] text-[var(--primary)]">Authorized Access</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bebas text-[var(--black)] tracking-tight">
              CONTROL <span className="text-[var(--primary)]">CENTER</span>
            </h1>
            <p className="font-montserrat text-xs text-[var(--black-muted)] mt-2 max-w-xl leading-relaxed">
              Welcome to the Adler Contracts Management Suite. Monitor project progress, curate client feedback, and manage your professional portfolio in real-time.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hidden lg:block p-1 bg-white border border-[var(--border)] rounded-xl shadow-lg"
          >
            <div className="bg-gray-50 px-4 py-3 rounded-lg flex items-center gap-6">
              <div className="text-center">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">System Status</p>
                <div className="flex items-center gap-1.5 justify-center">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black text-[var(--black)] uppercase tracking-wide">Operational</span>
                </div>
              </div>
              <div className="w-[1px] h-6 bg-gray-200" />
              <div className="text-center">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Database</p>
                <span className="text-[10px] font-black text-[var(--black)] uppercase tracking-wide">Synchronized</span>
              </div>
            </div>
          </motion.div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mb-8 sm:mb-12">
          {statCards.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-3 sm:p-5 rounded-2xl border border-[var(--border)] shadow-sm hover:shadow-lg hover:shadow-black/5 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2 sm:mb-4">
                  <div 
                    className="p-1.5 sm:p-2.5 rounded-xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-sm"
                    style={{ backgroundColor: `${stat.color}08`, border: `1px solid ${stat.color}20` }}
                  >
                    <stat.icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: stat.color }} />
                  </div>
                  <span className="text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-gray-50 text-gray-400 uppercase tracking-widest border border-gray-100">
                    {stat.trend}
                  </span>
                </div>
                <p className="text-[9px] sm:text-[10px] font-bold text-[var(--gray)] tracking-[0.15em] uppercase font-rajdhani mb-0.5 sm:mb-1 truncate">
                  {stat.label}
                </p>
                <h3 className="text-2xl sm:text-3xl font-bebas text-[var(--black)] group-hover:text-[var(--primary)] transition-colors">
                  {loading ? '...' : stat.value}
                </h3>
              </div>
              
              {/* Background Accent */}
              <div 
                className="absolute -right-2 -bottom-2 w-16 h-16 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500"
                style={{ color: stat.color }}
              >
                <stat.icon size={64} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Primary Management Hub */}
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="group relative bg-white p-4 sm:p-8 rounded-[1.25rem] sm:rounded-[2rem] border border-[var(--border)] shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col justify-between"
          >
            <div className="relative z-10">
              <div className="w-12 h-12 bg-[var(--primary-soft)] rounded-xl flex items-center justify-center mb-6 text-[var(--primary)] group-hover:rotate-12 transition-transform duration-500">
                <LayoutGrid size={24} />
              </div>
              <h2 className="text-2xl font-bebas text-[var(--black)] mb-3 tracking-wide uppercase">Portfolio Repository</h2>
              <p className="font-montserrat text-xs text-[var(--black-muted)] mb-8 leading-relaxed max-w-md">
                Centralized project management. Update progress metrics, upload new visual assets, and manage the technical details of your entire construction history.
              </p>
              <Link href="/projects" className="inline-flex items-center gap-2 bg-[var(--black)] text-white px-6 py-3 rounded-full font-poppins font-bold text-[10px] uppercase tracking-widest hover:bg-[var(--primary)] transition-all shadow-md active:scale-95">
                Manage Repository
                <ArrowUpRight size={14} />
              </Link>
            </div>
            {/* Visual Decor */}
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-[0.07] transition-opacity">
              <Briefcase size={120} />
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="group relative bg-white p-8 rounded-[2rem] border border-[var(--border)] shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
          >
            <div className="relative z-10">
              <div className="w-12 h-12 bg-[var(--accent-soft)] rounded-xl flex items-center justify-center mb-6 text-[var(--accent)] group-hover:-rotate-12 transition-transform duration-500">
                <Users size={24} />
              </div>
              <h2 className="text-2xl font-bebas text-[var(--black)] mb-3 tracking-wide uppercase">Testimonial Ledger</h2>
              <p className="font-montserrat text-xs text-[var(--black-muted)] mb-8 leading-relaxed max-w-md">
                Maintain client relationships by curating high-impact feedback. Showcase your professional reputation through verified testimonials and corporate feedback.
              </p>
              <Link href="/reviews" className="inline-flex items-center gap-2 bg-[var(--black)] text-white px-6 py-3 rounded-full font-poppins font-bold text-[10px] uppercase tracking-widest hover:bg-[var(--accent)] transition-all shadow-md active:scale-95">
                Curate Feedback
                <ArrowUpRight size={14} />
              </Link>
            </div>
            {/* Visual Decor */}
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-[0.07] transition-opacity">
              <MessageSquare size={120} />
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
