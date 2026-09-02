'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Lock, Eye, EyeOff, CheckCircle2, AlertCircle, KeyRound } from 'lucide-react'
import { changePassword } from '@/lib/api'

interface ChangePasswordModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ChangePasswordModal({ isOpen, onClose }: ChangePasswordModalProps) {
  const [form, setForm] = useState({ current: '', newPass: '', confirm: '' })
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  function reset() {
    setForm({ current: '', newPass: '', confirm: '' })
    setError('')
    setSuccess(false)
    setLoading(false)
  }

  function handleClose() {
    reset()
    onClose()
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!form.current || !form.newPass || !form.confirm) {
      setError('All fields are required')
      return
    }
    if (form.newPass !== form.confirm) {
      setError('New passwords do not match')
      return
    }
    if (form.newPass.length < 6) {
      setError('New password must be at least 6 characters')
      return
    }
    if (form.current === form.newPass) {
      setError('New password must be different from current password')
      return
    }

    setLoading(true)
    try {
      await changePassword(form.current, form.newPass)
      setSuccess(true)
      setTimeout(() => {
        handleClose()
      }, 2000)
    } catch (err: any) {
      setError(err.message || 'Failed to change password')
    } finally {
      setLoading(false)
    }
  }

  function PasswordInput({
    id,
    label,
    value,
    show,
    onToggle,
    onChange,
    placeholder,
  }: {
    id: string
    label: string
    value: string
    show: boolean
    onToggle: () => void
    onChange: (v: string) => void
    placeholder?: string
  }) {
    return (
      <div>
        <label className="block text-[10px] font-bold tracking-[0.2em] text-[var(--black-muted)] uppercase font-rajdhani mb-2">
          {label}
        </label>
        <div className="relative">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--gray)]">
            <Lock size={15} />
          </div>
          <input
            id={id}
            type={show ? 'text' : 'password'}
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder || label}
            className="w-full border border-[var(--border)] rounded-xl pl-10 pr-11 py-3
              text-sm font-montserrat text-[var(--black)] placeholder-[var(--gray-light)]
              focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/15
              transition-all duration-200 bg-white"
          />
          <button
            type="button"
            onClick={onToggle}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--gray)] hover:text-[var(--black)] transition-colors"
          >
            {show ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
      </div>
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[2000] bg-black/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed inset-0 z-[2001] flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-3xl shadow-2xl shadow-black/15 border border-[var(--border)] w-full max-w-md overflow-hidden relative">

              {/* Header */}
              <div className="flex items-center justify-between px-7 pt-7 pb-5 border-b border-[var(--border)]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[var(--primary-soft)] rounded-xl flex items-center justify-center text-[var(--primary)]">
                    <KeyRound size={18} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bebas text-[var(--black)] tracking-wide">CHANGE PASSWORD</h2>
                    <p className="text-[10px] font-montserrat text-[var(--black-muted)]">Update your admin credentials</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full bg-[var(--gray-bg)] hover:bg-[var(--border)] flex items-center justify-center text-[var(--gray)] hover:text-[var(--black)] transition-all"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Body */}
              <div className="px-7 py-6">
                <AnimatePresence mode="wait">
                  {success ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center py-8 text-center"
                    >
                      <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle2 size={32} className="text-green-500" />
                      </div>
                      <h3 className="font-bebas text-xl text-[var(--black)] tracking-wide mb-1">PASSWORD UPDATED</h3>
                      <p className="text-xs font-montserrat text-[var(--black-muted)]">
                        Your password has been changed successfully.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      <PasswordInput
                        id="cp-current"
                        label="Current Password"
                        value={form.current}
                        show={showCurrent}
                        onToggle={() => setShowCurrent(!showCurrent)}
                        onChange={v => { setForm(f => ({ ...f, current: v })); setError('') }}
                        placeholder="Enter current password"
                      />
                      <PasswordInput
                        id="cp-new"
                        label="New Password"
                        value={form.newPass}
                        show={showNew}
                        onToggle={() => setShowNew(!showNew)}
                        onChange={v => { setForm(f => ({ ...f, newPass: v })); setError('') }}
                        placeholder="Min. 6 characters"
                      />
                      <PasswordInput
                        id="cp-confirm"
                        label="Confirm New Password"
                        value={form.confirm}
                        show={showConfirm}
                        onToggle={() => setShowConfirm(!showConfirm)}
                        onChange={v => { setForm(f => ({ ...f, confirm: v })); setError('') }}
                        placeholder="Re-enter new password"
                      />

                      {/* Error */}
                      <AnimatePresence>
                        {error && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3"
                          >
                            <AlertCircle size={14} className="text-red-500 shrink-0" />
                            <p className="text-xs text-red-600 font-montserrat">{error}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Strength hint */}
                      {form.newPass && (
                        <div className="flex gap-1">
                          {[...Array(4)].map((_, i) => (
                            <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                              form.newPass.length > i * 3
                                ? form.newPass.length < 6
                                  ? 'bg-red-400'
                                  : form.newPass.length < 10
                                    ? 'bg-yellow-400'
                                    : 'bg-[var(--primary)]'
                                : 'bg-[var(--border)]'
                            }`} />
                          ))}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-3 pt-2">
                        <button
                          type="button"
                          onClick={handleClose}
                          className="flex-1 py-3 rounded-xl border border-[var(--border)] text-[var(--black-soft)] font-poppins font-semibold text-[12px] tracking-wide hover:bg-[var(--gray-bg)] transition-all"
                        >
                          Cancel
                        </button>
                        <motion.button
                          id="cp-submit"
                          type="submit"
                          disabled={loading}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 py-3 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-poppins font-bold text-[12px] tracking-wider uppercase disabled:opacity-60 transition-all flex items-center justify-center gap-2"
                        >
                          {loading ? (
                            <motion.div
                              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                            />
                          ) : (
                            'Update Password'
                          )}
                        </motion.button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
