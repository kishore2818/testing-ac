'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Loader2, LockKeyhole, Mail, Save, Settings, UserRound } from 'lucide-react'
import AdminNavbar from '@/components/AdminNavbar'
import { fetchAdminProfile, updateAdminProfile } from '@/lib/api'

type AdminProfile = {
  username: string
  email: string
  updatedAt?: string
}

export default function SettingsPage() {
  const [profile, setProfile] = useState<AdminProfile | null>(null)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await fetchAdminProfile()
        setProfile(data)
        setFormData((current) => ({
          ...current,
          username: data.username || '',
          email: data.email || '',
        }))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load admin settings')
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [])

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const updated = await updateAdminProfile({
        username: formData.username,
        email: formData.email,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword || undefined,
      })

      setProfile(updated)
      setFormData((current) => ({
        ...current,
        currentPassword: '',
        newPassword: '',
      }))
      setSuccess('Admin credentials updated successfully.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update admin settings')
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#fafafa]">
      <AdminNavbar />

      <div className="site-container pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 flex flex-col gap-3"
        >
          <div className="flex items-center gap-2">
            <span className="w-6 h-[2px] bg-[var(--primary)]" />
            <span className="font-rajdhani text-[12px] font-bold uppercase tracking-[0.3em] text-[var(--primary)]">
              Admin Configuration
            </span>
          </div>
          <h1 className="font-bebas text-4xl md:text-5xl text-[var(--black)] tracking-tight">
            ACCOUNT <span className="text-[var(--primary)]">SETTINGS</span>
          </h1>
          <p className="max-w-2xl font-montserrat text-xs leading-relaxed text-[var(--black-muted)]">
            Update the login username, email, and password stored in MongoDB for the admin module.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-[2rem] border border-[var(--border)] bg-white shadow-sm"
        >
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="border-b border-[var(--border)] bg-[linear-gradient(160deg,rgba(34,34,34,0.98),rgba(85,139,47,0.92))] p-8 text-white lg:border-b-0 lg:border-r">
              <div className="flex h-full flex-col justify-between gap-8">
                <div>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.24em] text-white/80">
                    <Settings size={14} />
                    Credential Record
                  </div>
                  <h2 className="font-bebas text-4xl tracking-[0.06em]">MongoDB Admin Collection</h2>
                  <p className="mt-4 max-w-md font-inter text-sm leading-7 text-white/76">
                    This panel manages the single admin credential document stored in the `admin_credentials` collection.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  <div className="rounded-2xl border border-white/12 bg-white/8 p-4">
                    <p className="font-rajdhani text-[11px] font-bold uppercase tracking-[0.22em] text-white/55">Current Username</p>
                    <p className="mt-2 font-poppins text-sm font-semibold text-white">{profile?.username || 'Loading...'}</p>
                  </div>
                  <div className="rounded-2xl border border-white/12 bg-white/8 p-4">
                    <p className="font-rajdhani text-[11px] font-bold uppercase tracking-[0.22em] text-white/55">Current Email</p>
                    <p className="mt-2 break-all font-poppins text-sm font-semibold text-white">{profile?.email || 'Loading...'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 lg:p-10">
              {loading ? (
                <div className="flex min-h-[360px] items-center justify-center gap-3 text-[var(--gray)]">
                  <Loader2 size={20} className="animate-spin text-[var(--primary)]" />
                  <span className="font-rajdhani text-[11px] font-bold uppercase tracking-[0.24em]">
                    Loading settings
                  </span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error ? (
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                      {error}
                    </div>
                  ) : null}

                  {success ? (
                    <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                      {success}
                    </div>
                  ) : null}

                  <label className="block">
                    <span className="mb-2 block font-rajdhani text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--gray-dark)]">
                      Username
                    </span>
                    <div className="relative">
                      <UserRound size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--gray)]" />
                      <input
                        type="text"
                        value={formData.username}
                        onChange={(event) => setFormData({ ...formData, username: event.target.value })}
                        required
                        className="h-14 w-full rounded-2xl border border-[var(--border)] bg-white pl-12 pr-4 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-primary/5"
                      />
                    </div>
                  </label>

                  <label className="block">
                    <span className="mb-2 block font-rajdhani text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--gray-dark)]">
                      Email
                    </span>
                    <div className="relative">
                      <Mail size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--gray)]" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                        required
                        className="h-14 w-full rounded-2xl border border-[var(--border)] bg-white pl-12 pr-4 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-primary/5"
                      />
                    </div>
                  </label>

                  <label className="block">
                    <span className="mb-2 block font-rajdhani text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--gray-dark)]">
                      Current Password
                    </span>
                    <div className="relative">
                      <LockKeyhole size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--gray)]" />
                      <input
                        type="password"
                        value={formData.currentPassword}
                        onChange={(event) => setFormData({ ...formData, currentPassword: event.target.value })}
                        required
                        className="h-14 w-full rounded-2xl border border-[var(--border)] bg-white pl-12 pr-4 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-primary/5"
                      />
                    </div>
                  </label>

                  <label className="block">
                    <span className="mb-2 block font-rajdhani text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--gray-dark)]">
                      New Password
                    </span>
                    <div className="relative">
                      <LockKeyhole size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--gray)]" />
                      <input
                        type="password"
                        value={formData.newPassword}
                        onChange={(event) => setFormData({ ...formData, newPassword: event.target.value })}
                        placeholder="Leave empty to keep the current password"
                        className="h-14 w-full rounded-2xl border border-[var(--border)] bg-white pl-12 pr-4 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-primary/5"
                      />
                    </div>
                  </label>

                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-[var(--black)] px-6 font-poppins text-[11px] font-bold uppercase tracking-[0.24em] text-white transition hover:bg-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    {saving ? 'Saving...' : 'Update Credentials'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
