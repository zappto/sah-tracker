import { describe, expect, test } from '@jest/globals'
import request from 'supertest'

const BASE = 'http://localhost:3000'

async function login() {
  const res = await request(BASE)
    .post('/api/auth/login')
    .send({ username: 'fajar' })
  return res.headers['set-cookie']
}

describe('Pockets API', () => {
  test('GET /api/pockets returns array', async () => {
    const res = await request(BASE).get('/api/pockets')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body.data)).toBe(true)
  })

  test('POST /api/pockets creates pocket', async () => {
    const cookies = await login()
    const name = `Pocket-${Date.now()}`

    const res = await request(BASE)
      .post('/api/pockets')
      .set('Cookie', cookies)
      .send({ name, total: 500000, icon: 'Wallet' })
    expect(res.status).toBe(201)
    expect(res.body.data.name).toBe(name)
    expect(res.body.data.icon).toBe('Wallet')
  })

  test('POST /api/pockets rejects duplicate name', async () => {
    const cookies = await login()
    const name = `PocketDup-${Date.now()}`

    await request(BASE)
      .post('/api/pockets')
      .set('Cookie', cookies)
      .send({ name })

    const res = await request(BASE)
      .post('/api/pockets')
      .set('Cookie', cookies)
      .send({ name })
    expect(res.status).toBe(409)
  })

  test('POST /api/pockets with empty name returns 400', async () => {
    const cookies = await login()
    const res = await request(BASE)
      .post('/api/pockets')
      .set('Cookie', cookies)
      .send({ name: '' })
    expect(res.status).toBe(400)
  })

  test('PATCH /api/pockets/:id updates pocket', async () => {
    const cookies = await login()
    const name = `PocketUpdate-${Date.now()}`

    const createRes = await request(BASE)
      .post('/api/pockets')
      .set('Cookie', cookies)
      .send({ name, total: 300000 })

    const id = createRes.body.data.id
    const updateRes = await request(BASE)
      .patch(`/api/pockets/${id}`)
      .set('Cookie', cookies)
      .send({ total: 500000 })
    expect(updateRes.status).toBe(200)
    expect(Number(updateRes.body.data.total)).toBe(500000)
  })

  test('DELETE /api/pockets/:id deletes pocket without transactions', async () => {
    const cookies = await login()
    const name = `PocketDelete-${Date.now()}`

    const createRes = await request(BASE)
      .post('/api/pockets')
      .set('Cookie', cookies)
      .send({ name, total: 10000 })

    const id = createRes.body.data.id
    const delRes = await request(BASE)
      .delete(`/api/pockets/${id}`)
      .set('Cookie', cookies)
    expect(delRes.status).toBe(200)
  })

  test('GET /api/pockets/:id returns 404 for missing', async () => {
    const res = await request(BASE).get('/api/pockets/nonexistent-id')
    expect(res.status).toBe(404)
  })
})
