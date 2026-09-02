'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    // If on /login page, allow immediately
    if (pathname === '/login') {
      setAuthorized(true)
      return
    }

    const token = localStorage.getItem('adminToken')
    const cookieToken = document.cookie.split(';').find(c => c.trim().startsWith('adminToken='))

    if (!token && !cookieToken) {
      setAuthorized(false)
      router.replace('/login')
    } else {
      setAuthorized(true)
    }
  }, [pathname, router])

  // Don't render protected dashboard content while verifying
  if (pathname !== '/login' && !authorized) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return <>{children}</>
}
