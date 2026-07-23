import { describe, expect, test } from '@jest/globals'
import request from 'supertest'

const BASE = 'http://localhost:3000'

async function login() {
  const res = await request(BASE)
    .post('/api/auth/login')
    .send({ username: 'fajar' })
  return res.headers['set-cookie']
}

describe('Transactions API', () => {
  test('GET /api/transactions returns array', async () => {
    const res = await request(BASE).get('/api/transactions')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body.data)).toBe(true)
  })

  test('POST /api/transactions creates income', async () => {
    const cookies = await login()

    const res = await request(BASE)
      .post('/api/transactions')
      .set('Cookie', cookies)
      .send({
        type: 'income',
        desc: 'Test Income',
        amount: 50000,
        pocket: 'Dana Utama',
        dicatat: 'fajar',
      })
    expect(res.status).toBe(201)
    expect(res.body.data.type).toBe('income')
    expect(res.body.data.desc).toBe('Test Income')
    expect(res.body.data.amount).toBeDefined()
  })

  test('POST /api/transactions creates expense', async () => {
    const cookies = await login()

    const res = await request(BASE)
      .post('/api/transactions')
      .set('Cookie', cookies)
      .send({
        type: 'expense',
        desc: 'Test Expense',
        amount: 25000,
        pocket: 'Dana Utama',
        dicatat: 'fajar',
      })
    expect(res.status).toBe(201)
    expect(res.body.data.type).toBe('expense')
  })

  test('POST /api/transactions with invalid type returns 400', async () => {
    const cookies = await login()

    const res = await request(BASE)
      .post('/api/transactions')
      .set('Cookie', cookies)
      .send({
        type: 'transfer',
        desc: 'Invalid',
        amount: 1000,
        pocket: 'Dana Utama',
      })
    expect(res.status).toBe(400)
  })

  test('POST /api/transactions with empty desc returns 400', async () => {
    const cookies = await login()

    const res = await request(BASE)
      .post('/api/transactions')
      .set('Cookie', cookies)
      .send({
        type: 'expense',
        desc: '',
        amount: 1000,
        pocket: 'Dana Utama',
      })
    expect(res.status).toBe(400)
  })

  test('POST /api/transactions with amount 0 returns 400', async () => {
    const cookies = await login()

    const res = await request(BASE)
      .post('/api/transactions')
      .set('Cookie', cookies)
      .send({
        type: 'expense',
        desc: 'Test',
        amount: 0,
        pocket: 'Dana Utama',
      })
    expect(res.status).toBe(400)
  })

  test('POST /api/transactions with missing body returns 400', async () => {
    const cookies = await login()

    const res = await request(BASE)
      .post('/api/transactions')
      .set('Cookie', cookies)
      .send({})
    expect(res.status).toBe(400)
  })

  test('GET /api/transactions/:id returns single transaction', async () => {
    const cookies = await login()

    const createRes = await request(BASE)
      .post('/api/transactions')
      .set('Cookie', cookies)
      .send({
        type: 'income',
        desc: 'Get By ID',
        amount: 10000,
        pocket: 'Dana Utama',
        dicatat: 'fajar',
      })

    const id = createRes.body.data.id
    const getRes = await request(BASE).get(`/api/transactions/${id}`)
    expect(getRes.status).toBe(200)
    expect(getRes.body.data.desc).toBe('Get By ID')
  })

  test('GET /api/transactions/:id returns 404 for missing', async () => {
    const res = await request(BASE).get('/api/transactions/nonexistent-id')
    expect(res.status).toBe(404)
  })
})
