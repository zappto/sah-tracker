import { describe, it, expect } from 'vitest'
import { handleApiError } from '@/lib/errors/error-handler'
import { AppError } from '@/lib/errors/app-error'

describe('handleApiError', () => {
  it('returns AppError response with correct status', async () => {
    const error = AppError.notFound('Data tidak ditemukan')
    const res = handleApiError(error)

    expect(res.status).toBe(404)
    const body = await res.json()
    expect(body).toEqual({ error: { code: 'NOT_FOUND', message: 'Data tidak ditemukan' } })
  })

  it('returns validation error with 400', async () => {
    const error = AppError.validation('Input tidak valid')
    const res = handleApiError(error)

    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body).toEqual({ error: { code: 'VALIDATION_ERROR', message: 'Input tidak valid' } })
  })

  it('returns generic 500 for unknown error', async () => {
    const res = handleApiError(new Error('something broke'))

    expect(res.status).toBe(500)
    const body = await res.json()
    expect(body).toEqual({
      error: { code: 'INTERNAL_ERROR', message: 'Terjadi kesalahan internal' },
    })
  })

  it('returns generic 500 for string error', async () => {
    const res = handleApiError('raw string error')

    expect(res.status).toBe(500)
    const body = await res.json()
    expect(body).toEqual({
      error: { code: 'INTERNAL_ERROR', message: 'Terjadi kesalahan internal' },
    })
  })

  it('returns generic 500 for null', async () => {
    const res = handleApiError(null)

    expect(res.status).toBe(500)
  })
})
