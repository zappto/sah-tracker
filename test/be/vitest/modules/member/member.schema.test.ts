import { describe, it, expect } from 'vitest'
import { createMemberSchema, updateMemberSchema } from '@/modules/member/member.schema'

describe('createMemberSchema', () => {
  it('accepts valid input', () => {
    const result = createMemberSchema.safeParse({ name: 'Budi', setor: 50000, sisa: 30000 })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toEqual({ name: 'Budi', setor: 50000, sisa: 30000 })
    }
  })

  it('applies default values', () => {
    const result = createMemberSchema.safeParse({ name: 'Budi' })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.setor).toBe(0)
      expect(result.data.sisa).toBe(0)
    }
  })

  it('rejects empty name', () => {
    const result = createMemberSchema.safeParse({ name: '' })
    expect(result.success).toBe(false)
  })

  it('rejects missing name', () => {
    const result = createMemberSchema.safeParse({})
    expect(result.success).toBe(false)
  })

  it('rejects negative setor', () => {
    const result = createMemberSchema.safeParse({ name: 'Budi', setor: -100 })
    expect(result.success).toBe(false)
  })

  it('accepts optional avatar', () => {
    const result = createMemberSchema.safeParse({ name: 'Budi', avatar: 'https://example.com/avatar.jpg' })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.avatar).toBe('https://example.com/avatar.jpg')
    }
  })
})

describe('updateMemberSchema', () => {
  it('accepts partial update', () => {
    const result = updateMemberSchema.safeParse({ name: 'Budi' })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.name).toBe('Budi')
      expect(result.data.setor).toBeUndefined()
    }
  })

  it('accepts empty object', () => {
    const result = updateMemberSchema.safeParse({})
    expect(result.success).toBe(true)
  })

  it('accepts all fields', () => {
    const result = updateMemberSchema.safeParse({
      name: 'Budi',
      setor: 100000,
      sisa: 50000,
      avatar: 'https://example.com/avatar.jpg',
    })
    expect(result.success).toBe(true)
  })

  it('rejects empty name when provided', () => {
    const result = updateMemberSchema.safeParse({ name: '' })
    expect(result.success).toBe(false)
  })

  it('accepts null avatar to remove', () => {
    const result = updateMemberSchema.safeParse({ avatar: null })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.avatar).toBeNull()
    }
  })
})
