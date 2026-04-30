export const ADMIN_SESSION_COOKIE = 'adler_admin_session'
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 12

const DEFAULT_SESSION_SECRET = 'adler-contracts-admin-session-secret'

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || DEFAULT_SESSION_SECRET
}

async function signValue(value: string) {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(getSessionSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )

  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(value))
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

export async function createSessionToken(admin: { id: string; username: string; email: string }) {
  const payload = encodeURIComponent(
    JSON.stringify({
      id: admin.id,
      username: admin.username,
      email: admin.email.trim().toLowerCase(),
      exp: Date.now() + ADMIN_SESSION_MAX_AGE * 1000,
    })
  )

  const signature = await signValue(payload)
  return `${payload}.${signature}`
}

export async function verifySessionToken(token?: string) {
  if (!token) return false

  const [payload, signature] = token.split('.')
  if (!payload || !signature) return false

  const expectedSignature = await signValue(payload)
  if (signature !== expectedSignature) return false

  try {
    const parsed = JSON.parse(decodeURIComponent(payload)) as { exp?: number }
    return typeof parsed.exp === 'number' && parsed.exp > Date.now()
  } catch {
    return false
  }
}
