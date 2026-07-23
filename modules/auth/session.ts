import { SignJWT, jwtVerify, type JWTPayload } from 'jose'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'st-session'
const SESSION_DURATION_DAYS = 30

function getSecret(): Uint8Array {
  const secret = process.env.SESSION_SECRET ?? 'dev-secret-min-32-characters-long!!'
  return new TextEncoder().encode(secret)
}

export interface ISessionPayload extends JWTPayload {
  sub: string
  username: string
}

export async function signSession(payload: ISessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_DAYS}d`)
    .sign(getSecret())
}

export async function verifySession(token: string): Promise<ISessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret())
    return payload as ISessionPayload
  } catch {
    return null
  }
}

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_DURATION_DAYS * 24 * 60 * 60,
  })
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

export async function getSessionFromCookie(): Promise<ISessionPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return null
  return verifySession(token)
}
