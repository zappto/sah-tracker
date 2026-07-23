import { describe, it, expect } from 'vitest'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().min(1, 'Email harus diisi').email('Email tidak valid'),
  password: z.string().min(1, 'Password harus diisi'),
})

describe('loginSchema', () => {
  it('accepts valid data', () => {
    const result = loginSchema.safeParse({ email: 'admin@example.com', password: 'secret' })
    expect(result.success).toBe(true)
  })

  it('rejects empty email', () => {
    const result = loginSchema.safeParse({ email: '', password: 'secret' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('email')
    }
  })

  it('rejects invalid email format', () => {
    const result = loginSchema.safeParse({ email: 'not-an-email', password: 'secret' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Email tidak valid')
    }
  })

  it('rejects empty password', () => {
    const result = loginSchema.safeParse({ email: 'admin@example.com', password: '' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('password')
    }
  })
})
