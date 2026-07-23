export async function login(username: string): Promise<{ id: string; username: string }> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username }),
  })

  const json = await res.json()
  if (!res.ok) {
    throw new Error(json.error?.message ?? 'Gagal login')
  }
  return json.data
}

export async function isLoggedIn(): Promise<boolean> {
  try {
    const res = await fetch('/api/auth/me')
    return res.ok
  } catch {
    return false
  }
}

export async function getUsername(): Promise<string | null> {
  try {
    const res = await fetch('/api/auth/me')
    if (!res.ok) return null
    const json = await res.json()
    return json.data?.username ?? null
  } catch {
    return null
  }
}
