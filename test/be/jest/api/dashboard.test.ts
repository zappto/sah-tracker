import { describe, expect, test } from '@jest/globals'
import request from 'supertest'

const BASE = 'http://localhost:3000'

describe('Dashboard API', () => {
  test('GET /api/dashboard returns 200', async () => {
    const res = await request(BASE).get('/api/dashboard')
    expect(res.status).toBe(200)
  })

  test('GET /api/dashboard has summary', async () => {
    const res = await request(BASE).get('/api/dashboard')
    expect(res.body.data.summary).toBeDefined()
    expect(typeof res.body.data.summary.total).toBe('number')
    expect(typeof res.body.data.summary.income).toBe('number')
    expect(typeof res.body.data.summary.expense).toBe('number')
  })

  test('GET /api/dashboard has members array', async () => {
    const res = await request(BASE).get('/api/dashboard')
    expect(Array.isArray(res.body.data.members)).toBe(true)
    if (res.body.data.members.length > 0) {
      const member = res.body.data.members[0]
      expect(member.name).toBeDefined()
      expect(typeof member.setor).toBe('number')
      expect(typeof member.sisa).toBe('number')
    }
  })

  test('GET /api/dashboard has pockets array', async () => {
    const res = await request(BASE).get('/api/dashboard')
    expect(Array.isArray(res.body.data.pockets)).toBe(true)
    if (res.body.data.pockets.length > 0) {
      const pocket = res.body.data.pockets[0]
      expect(pocket.name).toBeDefined()
      expect(typeof pocket.total).toBe('number')
      expect(typeof pocket.spent).toBe('number')
      expect(pocket.icon).toBeDefined()
    }
  })

  test('GET /api/dashboard has transactions array', async () => {
    const res = await request(BASE).get('/api/dashboard')
    expect(Array.isArray(res.body.data.transactions)).toBe(true)
    if (res.body.data.transactions.length > 0) {
      const tx = res.body.data.transactions[0]
      expect(tx.type).toMatch(/^(income|expense)$/)
      expect(tx.desc).toBeDefined()
      expect(typeof tx.amount).toBe('number')
      expect(tx.pocket).toBeDefined()
      expect(tx.dicatat).toBeDefined()
    }
  })

  test('summary.total equals income minus expense', async () => {
    const res = await request(BASE).get('/api/dashboard')
    const { total, income, expense } = res.body.data.summary
    expect(total).toBe(income - expense)
  })
})
