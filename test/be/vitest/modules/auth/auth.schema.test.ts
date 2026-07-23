import { describe, it, expect } from 'vitest'
import { loginSchema } from '@/modules/auth/auth.schema'

describe('loginSchema', () => {
  it('accepts valid username', () => {
    const result = loginSchema.safeParse({ username: 'admin' })
    expect(result.success).toBe(true)
  })

  it('accepts non-empty strings', () => {
    const result = loginSchema.safeParse({ username: 'fajar' })
    expect(result.success).toBe(true)
  })

  it('rejects empty username', () => {
    const result = loginSchema.safeParse({ username: '' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('username')
    }
  })

  it('rejects missing username', () => {
    const result = loginSchema.safeParse({})
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('username')
    }
  })

  it('rejects null username', () => {
    const result = loginSchema.safeParse({ username: null })
    expect(result.success).toBe(false)
  })

  it('rejects numeric username', () => {
    const result = loginSchema.safeParse({ username: 123 })
    expect(result.success).toBe(false)
  })

  it('strips unknown fields', () => {
    const result = loginSchema.safeParse({ username: 'admin', extra: true })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toEqual({ username: 'admin' })
    }
  })
})
