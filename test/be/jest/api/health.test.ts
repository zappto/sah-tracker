import { describe, expect, test } from '@jest/globals'
import request from 'supertest'

const BASE = 'http://localhost:3000'

describe('Page Rendering', () => {
  test('GET / returns 200', async () => {
    const res = await request(BASE).get('/')
    expect(res.status).toBe(200)
  })

  test('GET /transactions returns 200', async () => {
    const res = await request(BASE).get('/transactions')
    expect(res.status).toBe(200)
  })

  test('GET /_not-found returns 404', async () => {
    const res = await request(BASE).get('/api/health')
    expect(res.status).toBe(404)
  })
})
