import { NextRequest, NextResponse } from 'next/server'
import { createSessionToken, ADMIN_SESSION_COOKIE, ADMIN_SESSION_MAX_AGE } from '@/lib/auth'
import { adminLogin } from '@/lib/api'

export async function POST(request: NextRequest) {
  try {
    const { identifier, password } = await request.json()
    const admin = await adminLogin(identifier, password)
    const token = await createSessionToken(admin)
    const response = NextResponse.json({ success: true })

    response.cookies.set(ADMIN_SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: ADMIN_SESSION_MAX_AGE,
      path: '/',
    })
    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Server error' },
      { status: 401 }
    )
  }
}
