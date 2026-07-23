import { describe, it, expect } from 'vitest'

function formatRp(amount: number): string {
  return `Rp ${amount.toLocaleString('id-ID')}`
}

describe('formatRp', () => {
  it('formats positive number', () => {
    expect(formatRp(50000)).toBe('Rp 50.000')
  })

  it('formats zero', () => {
    expect(formatRp(0)).toBe('Rp 0')
  })

  it('formats large number', () => {
    expect(formatRp(1_000_000)).toBe('Rp 1.000.000')
  })
})
