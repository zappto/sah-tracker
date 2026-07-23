const AUTH_KEY = 'st-auth'

export const login = (username: string): void => {
  localStorage.setItem(AUTH_KEY, username)
}

export const isLoggedIn = (): boolean => {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(AUTH_KEY) !== null
}

export const getUsername = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(AUTH_KEY)
}
