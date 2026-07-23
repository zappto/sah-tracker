import { describe, it, expect } from 'vitest'
import { apiSuccess, apiError, apiPaginated } from '@/lib/http/api-response'

describe('apiSuccess', () => {
  it('returns 200 with data', async () => {
    const res = apiSuccess({ id: 1, name: 'test' })
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body).toEqual({ data: { id: 1, name: 'test' } })
  })

  it('returns custom status', async () => {
    const res = apiSuccess(null, 201)
    expect(res.status).toBe(201)
    const body = await res.json()
    expect(body).toEqual({ data: null })
  })

  it('returns array data', async () => {
    const res = apiSuccess([1, 2, 3])
    const body = await res.json()
    expect(body).toEqual({ data: [1, 2, 3] })
  })
})

describe('apiError', () => {
  it('returns error response', async () => {
    const res = apiError('NOT_FOUND', 'Data tidak ditemukan', 404)
    expect(res.status).toBe(404)
    const body = await res.json()
    expect(body).toEqual({ error: { code: 'NOT_FOUND', message: 'Data tidak ditemukan' } })
  })

  it('returns 400 for validation errors', async () => {
    const res = apiError('VALIDATION_ERROR', 'Input tidak valid', 400)
    const body = await res.json()
    expect(body).toEqual({ error: { code: 'VALIDATION_ERROR', message: 'Input tidak valid' } })
  })
})

describe('apiPaginated', () => {
  it('returns paginated response', async () => {
    const items = [{ id: 1 }, { id: 2 }]
    const res = apiPaginated(items, 10, 1, 10)
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body).toEqual({
      data: [{ id: 1 }, { id: 2 }],
      meta: { total: 10, page: 1, limit: 10 },
    })
  })

  it('returns empty items', async () => {
    const res = apiPaginated([], 0, 1, 20)
    const body = await res.json()
    expect(body).toEqual({
      data: [],
      meta: { total: 0, page: 1, limit: 20 },
    })
  })
})
