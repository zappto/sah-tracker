import { describe, expect, test } from '@jest/globals'
import request from 'supertest'

const BASE = 'http://localhost:3000'

describe('Auth API', () => {
  test('POST /api/auth/login with valid username returns 200', async () => {
    const res = await request(BASE)
      .post('/api/auth/login')
      .send({ username: 'fajar' })
    expect(res.status).toBe(200)
    expect(res.body.data).toBeDefined()
    expect(res.body.data.username).toBe('fajar')
  })

  test('POST /api/auth/login sets session cookie', async () => {
    const res = await request(BASE)
      .post('/api/auth/login')
      .send({ username: 'fajar' })
    const cookies = res.headers['set-cookie']
    expect(cookies).toBeDefined()
    const joined = Array.isArray(cookies) ? cookies.join('; ') : cookies
    expect(joined).toContain('st-session')
  })

  test('POST /api/auth/login with invalid username returns 401', async () => {
    const res = await request(BASE)
      .post('/api/auth/login')
      .send({ username: 'nonexistent' })
    expect(res.status).toBe(401)
    expect(res.body.error).toBeDefined()
    expect(res.body.error.code).toBe('UNAUTHORIZED')
  })

  test('POST /api/auth/login with empty username returns 400', async () => {
    const res = await request(BASE)
      .post('/api/auth/login')
      .send({ username: '' })
    expect(res.status).toBe(400)
    expect(res.body.error).toBeDefined()
  })

  test('POST /api/auth/login with missing body returns 400', async () => {
    const res = await request(BASE)
      .post('/api/auth/login')
      .send({})
    expect(res.status).toBe(400)
  })

  test('GET /api/auth/me returns user when authenticated', async () => {
    const loginRes = await request(BASE)
      .post('/api/auth/login')
      .send({ username: 'fajar' })
    const cookies = loginRes.headers['set-cookie']

    const meRes = await request(BASE)
      .get('/api/auth/me')
      .set('Cookie', cookies)
    expect(meRes.status).toBe(200)
    expect(meRes.body.data.username).toBe('fajar')
  })

  test('GET /api/auth/me returns null when not authenticated', async () => {
    const res = await request(BASE).get('/api/auth/me')
    expect(res.status).toBe(200)
    expect(res.body.data).toBeNull()
  })

  test('POST /api/auth/logout clears session', async () => {
    const loginRes = await request(BASE)
      .post('/api/auth/login')
      .send({ username: 'fajar' })
    const cookies = loginRes.headers['set-cookie']

    const logoutRes = await request(BASE)
      .post('/api/auth/logout')
      .set('Cookie', cookies)
    expect(logoutRes.status).toBe(200)

    const meRes = await request(BASE)
      .get('/api/auth/me')
      .set('Cookie', cookies)
    expect(meRes.body.data).toBeNull()
  })
})
