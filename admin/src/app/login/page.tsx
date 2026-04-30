'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ShieldCheck, Eye, EyeOff, Loader2, Lock, User } from 'lucide-react'

function LoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const nextPath = searchParams.get('next') || '/'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Invalid credentials')
        setLoading(false)
        return
      }

      router.push(nextPath)
      router.refresh()
    } catch {
      setError('Network error. Please try again.')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, var(--black) 1px, transparent 0)`,
        backgroundSize: '40px 40px',
      }} />

      {/* Decorative gradient blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--primary)] opacity-[0.04] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--accent)] opacity-[0.03] rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[440px]"
      >
        {/* Card */}
        <div className="bg-white rounded-3xl border border-[var(--border)] shadow-xl shadow-black/5 overflow-hidden">

          {/* Header with logo */}
          <div className="pt-10 pb-6 px-10 text-center border-b border-[var(--border)] bg-gradient-to-b from-white to-[#fcfcfc]">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="flex justify-center mb-6"
            >
              <Image
                src="/logo.png"
                alt="Adler Contracts"
                width={180}
                height={50}
                priority
                className="h-10 w-auto object-contain"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <ShieldCheck size={14} className="text-[var(--primary)]" />
                <span className="font-rajdhani text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--primary)]">
                  Secure Access
                </span>
              </div>
              <h1 className="font-bebas text-3xl text-[var(--black)] tracking-wider">
                ADMIN <span className="text-[var(--primary)]">PORTAL</span>
              </h1>
              <p className="font-montserrat text-[11px] text-[var(--gray)] mt-2 leading-relaxed">
                Enter your credentials to access the management dashboard
              </p>
            </motion.div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-10 space-y-6">
            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-600 text-xs font-semibold px-4 py-3 rounded-xl flex items-center gap-2"
              >
                <Lock size={14} />
                {error}
              </motion.div>
            )}

            {/* Identifier input */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[var(--gray)] px-1">
                Username or Email
              </label>
              <div className="relative group">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[var(--primary)] transition-colors" />
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="admin or admin@adlercontracts.com"
                  className="w-full bg-[#fafafa] border border-[var(--border)] rounded-xl pl-11 pr-4 py-3.5 text-sm font-montserrat focus:border-[var(--primary)] focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                />
              </div>
            </div>

            {/* Password input */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[var(--gray)] px-1">
                Password
              </label>
              <div className="relative group">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[var(--primary)] transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#fafafa] border border-[var(--border)] rounded-xl pl-11 pr-12 py-3.5 text-sm font-montserrat focus:border-[var(--primary)] focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[var(--primary)] transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full bg-[var(--black)] text-white py-4 rounded-xl font-poppins font-bold text-xs uppercase tracking-[0.2em] hover:bg-[var(--primary)] transition-all shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <ShieldCheck size={16} />
                  Sign In
                </>
              )}
            </motion.button>
          </form>
        </div>

        {/* Footer text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-6 font-montserrat text-[10px] text-[var(--gray)] tracking-wide"
        >
          © {new Date().getFullYear()} Adler Contracts · Authorized Personnel Only
        </motion.p>
      </motion.div>
    </main>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#fafafa]" />}>
      <LoginContent />
    </Suspense>
  )
}
