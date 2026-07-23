import { describe, expect, test } from '@jest/globals'
import request from 'supertest'

const BASE = 'http://localhost:3000'

async function login() {
  const res = await request(BASE)
    .post('/api/auth/login')
    .send({ username: 'fajar' })
  return res.headers['set-cookie']
}

describe('Members API', () => {
  test('GET /api/members returns array', async () => {
    const res = await request(BASE).get('/api/members')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body.data)).toBe(true)
  })

  test('POST /api/members creates member', async () => {
    const cookies = await login()
    const name = `Test-${Date.now()}`

    const res = await request(BASE)
      .post('/api/members')
      .set('Cookie', cookies)
      .send({ name, setor: 100000, sisa: 50000 })
    expect(res.status).toBe(201)
    expect(res.body.data.name).toBe(name)
    expect(res.body.data.setor).toBeDefined()
  })

  test('POST /api/members rejects duplicate name', async () => {
    const cookies = await login()
    const name = `Dup-${Date.now()}`

    await request(BASE)
      .post('/api/members')
      .set('Cookie', cookies)
      .send({ name, setor: 10000 })

    const res = await request(BASE)
      .post('/api/members')
      .set('Cookie', cookies)
      .send({ name, setor: 20000 })
    expect(res.status).toBe(409)
  })

  test('POST /api/members with empty name returns 400', async () => {
    const cookies = await login()
    const res = await request(BASE)
      .post('/api/members')
      .set('Cookie', cookies)
      .send({ name: '' })
    expect(res.status).toBe(400)
  })

  test('PATCH /api/members/:id updates member', async () => {
    const cookies = await login()
    const name = `Update-${Date.now()}`

    const createRes = await request(BASE)
      .post('/api/members')
      .set('Cookie', cookies)
      .send({ name, setor: 50000 })

    const id = createRes.body.data.id
    const updateRes = await request(BASE)
      .patch(`/api/members/${id}`)
      .set('Cookie', cookies)
      .send({ setor: 75000 })
    expect(updateRes.status).toBe(200)
    expect(Number(updateRes.body.data.setor)).toBe(75000)
  })

  test('DELETE /api/members/:id deletes member', async () => {
    const cookies = await login()
    const name = `Delete-${Date.now()}`

    const createRes = await request(BASE)
      .post('/api/members')
      .set('Cookie', cookies)
      .send({ name, setor: 10000 })

    const id = createRes.body.data.id
    const delRes = await request(BASE)
      .delete(`/api/members/${id}`)
      .set('Cookie', cookies)
    expect(delRes.status).toBe(200)

    const getRes = await request(BASE).get(`/api/members/${id}`)
    expect(getRes.status).toBe(404)
  })

  test('GET /api/members/:id returns 404 for missing', async () => {
    const res = await request(BASE).get('/api/members/nonexistent-id')
    expect(res.status).toBe(404)
  })
})
