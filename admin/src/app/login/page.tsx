'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Eye, EyeOff, Lock, AlertCircle, Zap } from 'lucide-react'
import { loginAdmin } from '@/lib/api'
import Image from 'next/image'

export default function LoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [shake, setShake] = useState(false)

  // If already authenticated redirect to dashboard
  useEffect(() => {
    const token = document.cookie.split(';').find(c => c.trim().startsWith('adminToken='))
    if (token) router.replace('/')
  }, [router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!password) return
    setLoading(true)
    setError('')
    try {
      const { token } = await loginAdmin(password)
      // Store in localStorage
      localStorage.setItem('adminToken', token)
      // Also set as a cookie so Next.js middleware can read it (7 days)
      document.cookie = `adminToken=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`
      router.replace('/')
    } catch (err: any) {
      setError(err.message || 'Invalid password')
      setShake(true)
      setTimeout(() => setShake(false), 600)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center relative overflow-hidden">

      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial green glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(141,196,62,0.08) 0%, transparent 70%)' }} />
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[var(--primary)]"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            opacity: 0.3,
          }}
          animate={{ y: [-10, 10, -10], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`relative z-10 w-full max-w-md mx-4 ${shake ? 'animate-shake' : ''}`}
      >
        {/* Glass card */}
        <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/50">

          {/* Top accent line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent rounded-full" />

          {/* Logo + Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 mb-4 relative"
            >
              <Shield size={28} className="text-[var(--primary)]" />
              <motion.div
                className="absolute inset-0 rounded-2xl border border-[var(--primary)]/30"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            <div className="flex items-center justify-center mb-3">
              <Image src="/logo.png" alt="Adler Contracts" width={140} height={36}
                className="h-8 w-auto object-contain brightness-0 invert opacity-90" />
            </div>

            <p className="text-[10px] font-bold tracking-[0.3em] text-[var(--primary)] uppercase font-rajdhani">
              Admin Control Center
            </p>
            <h1 className="text-3xl font-bebas text-white tracking-wide mt-1">
              SECURE <span className="text-[var(--primary)]">ACCESS</span>
            </h1>
            <p className="text-xs text-white/40 font-montserrat mt-1">
              Enter your password to access the dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Password field */}
            <div>
              <label className="block text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase font-rajdhani mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                  <Lock size={16} />
                </div>
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError('') }}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-12 py-3.5
                    text-white placeholder-white/20 text-sm font-montserrat
                    focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20
                    transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3"
                >
                  <AlertCircle size={14} className="text-red-400 shrink-0" />
                  <p className="text-xs text-red-400 font-montserrat">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit button */}
            <motion.button
              id="login-submit"
              type="submit"
              disabled={loading || !password}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full bg-[var(--primary)] hover:bg-[var(--primary-dark)] disabled:opacity-50
                disabled:cursor-not-allowed text-white font-bold text-[12px] tracking-[0.2em] uppercase
                font-poppins py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2
                shadow-lg shadow-[var(--primary)]/25 relative overflow-hidden shimmer-btn"
            >
              {loading ? (
                <>
                  <motion.div
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                  />
                  Authenticating...
                </>
              ) : (
                <>
                  <Zap size={14} />
                  Access Dashboard
                </>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <p className="text-center text-[10px] text-white/20 font-montserrat mt-6">
            Adler Contracts · Admin Portal · Authorized Access Only
          </p>
        </div>
      </motion.div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          15% { transform: translateX(-8px); }
          30% { transform: translateX(8px); }
          45% { transform: translateX(-6px); }
          60% { transform: translateX(6px); }
          75% { transform: translateX(-4px); }
          90% { transform: translateX(4px); }
        }
        .animate-shake { animation: shake 0.6s ease-in-out; }
      `}</style>
    </div>
  )
}
