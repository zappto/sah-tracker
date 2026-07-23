import { prisma } from '@/lib/db/prisma'
import { AppError } from '@/lib/errors/app-error'
import { signSession, setSessionCookie, clearSessionCookie, getSessionFromCookie, type ISessionPayload } from './session'

interface ILoginResult {
  id: string
  username: string
}

export async function login(username: string): Promise<ILoginResult> {
  const user = await prisma.user.findUnique({ where: { username } })
  if (!user) {
    throw AppError.unauthorized('Username tidak ditemukan')
  }

  const payload: ISessionPayload = { sub: user.id, username: user.username }
  const token = await signSession(payload)
  await setSessionCookie(token)

  return { id: user.id, username: user.username }
}

export async function logout(): Promise<void> {
  await clearSessionCookie()
}

export async function getSession(): Promise<ILoginResult | null> {
  const session = await getSessionFromCookie()
  if (!session) return null
  return { id: session.sub, username: session.username }
}
