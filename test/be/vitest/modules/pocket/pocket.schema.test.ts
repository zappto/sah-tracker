import { describe, it, expect } from 'vitest'
import { createPocketSchema, updatePocketSchema } from '@/modules/pocket/pocket.schema'

describe('createPocketSchema', () => {
  it('accepts valid input', () => {
    const result = createPocketSchema.safeParse({ name: 'Makan', total: 1000000, spent: 200000, icon: 'Utensils' })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toEqual({ name: 'Makan', total: 1000000, spent: 200000, icon: 'Utensils' })
    }
  })

  it('applies default values', () => {
    const result = createPocketSchema.safeParse({ name: 'Makan' })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.total).toBe(0)
      expect(result.data.spent).toBe(0)
      expect(result.data.icon).toBe('Wallet')
    }
  })

  it('rejects empty name', () => {
    const result = createPocketSchema.safeParse({ name: '' })
    expect(result.success).toBe(false)
  })

  it('rejects missing name', () => {
    const result = createPocketSchema.safeParse({})
    expect(result.success).toBe(false)
  })

  it('rejects negative total', () => {
    const result = createPocketSchema.safeParse({ name: 'Makan', total: -1 })
    expect(result.success).toBe(false)
  })

  it('rejects negative spent', () => {
    const result = createPocketSchema.safeParse({ name: 'Makan', spent: -100 })
    expect(result.success).toBe(false)
  })

  it('accepts zero values', () => {
    const result = createPocketSchema.safeParse({ name: 'Makan', total: 0, spent: 0 })
    expect(result.success).toBe(true)
  })
})

describe('updatePocketSchema', () => {
  it('accepts partial update', () => {
    const result = updatePocketSchema.safeParse({ total: 2000000 })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.total).toBe(2000000)
    }
  })

  it('accepts empty object', () => {
    const result = updatePocketSchema.safeParse({})
    expect(result.success).toBe(true)
  })

  it('rejects empty name when provided', () => {
    const result = updatePocketSchema.safeParse({ name: '' })
    expect(result.success).toBe(false)
  })
})
