import { describe, it, expect } from 'vitest'
import { createTransactionSchema } from '@/modules/transaction/transaction.schema'

describe('createTransactionSchema', () => {
  it('accepts valid income', () => {
    const result = createTransactionSchema.safeParse({
      type: 'income',
      desc: 'Setoran',
      amount: 50000,
      pocket: 'Tabungan Utama',
      dicatat: 'Budi',
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.type).toBe('income')
      expect(result.data.desc).toBe('Setoran')
      expect(result.data.amount).toBe(50000)
      expect(result.data.dicatat).toBe('Budi')
    }
  })

  it('accepts valid expense', () => {
    const result = createTransactionSchema.safeParse({
      type: 'expense',
      desc: 'Makan Siang',
      amount: 25000,
      pocket: 'Makan',
      dicatat: 'Budi',
    })
    expect(result.success).toBe(true)
  })

  it('applies default dicatat', () => {
    const result = createTransactionSchema.safeParse({
      type: 'expense',
      desc: 'Makan Siang',
      amount: 25000,
      pocket: 'Makan',
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.dicatat).toBe('')
    }
  })

  it('rejects invalid type', () => {
    const result = createTransactionSchema.safeParse({
      type: 'transfer',
      desc: 'Test',
      amount: 1000,
      pocket: 'Tabungan Utama',
    })
    expect(result.success).toBe(false)
  })

  it('rejects empty desc', () => {
    const result = createTransactionSchema.safeParse({
      type: 'expense',
      desc: '',
      amount: 1000,
      pocket: 'Tabungan Utama',
    })
    expect(result.success).toBe(false)
  })

  it('rejects amount less than 1', () => {
    const result = createTransactionSchema.safeParse({
      type: 'expense',
      desc: 'Test',
      amount: 0,
      pocket: 'Tabungan Utama',
    })
    expect(result.success).toBe(false)
  })

  it('rejects negative amount', () => {
    const result = createTransactionSchema.safeParse({
      type: 'expense',
      desc: 'Test',
      amount: -100,
      pocket: 'Tabungan Utama',
    })
    expect(result.success).toBe(false)
  })

  it('rejects empty pocket', () => {
    const result = createTransactionSchema.safeParse({
      type: 'expense',
      desc: 'Test',
      amount: 1000,
      pocket: '',
    })
    expect(result.success).toBe(false)
  })

  it('accepts image URL', () => {
    const result = createTransactionSchema.safeParse({
      type: 'expense',
      desc: 'Test',
      amount: 1000,
      pocket: 'Tabungan Utama',
      image: 'https://example.com/img.jpg',
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.image).toBe('https://example.com/img.jpg')
    }
  })
})
