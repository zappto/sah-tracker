import { describe, it, expect } from 'vitest'
import { AppError, ErrorCodes } from '@/lib/errors/app-error'

describe('AppError', () => {
  it('creates error with correct code and status', () => {
    const err = new AppError({ code: ErrorCodes.VALIDATION_ERROR, message: 'test', status: 400 })
    expect(err).toBeInstanceOf(AppError)
    expect(err).toBeInstanceOf(Error)
    expect(err.code).toBe('VALIDATION_ERROR')
    expect(err.message).toBe('test')
    expect(err.status).toBe(400)
    expect(err.name).toBe('AppError')
  })

  it('validation() returns 400', () => {
    const err = AppError.validation('Input tidak valid')
    expect(err.code).toBe('VALIDATION_ERROR')
    expect(err.status).toBe(400)
    expect(err.message).toBe('Input tidak valid')
  })

  it('notFound() returns 404', () => {
    const err = AppError.notFound('Data tidak ditemukan')
    expect(err.code).toBe('NOT_FOUND')
    expect(err.status).toBe(404)
    expect(err.message).toBe('Data tidak ditemukan')
  })

  it('unauthorized() returns 401', () => {
    const err = AppError.unauthorized('Akses ditolak')
    expect(err.code).toBe('UNAUTHORIZED')
    expect(err.status).toBe(401)
    expect(err.message).toBe('Akses ditolak')
  })

  it('forbidden() returns 403', () => {
    const err = AppError.forbidden('Tidak memiliki akses')
    expect(err.code).toBe('FORBIDDEN')
    expect(err.status).toBe(403)
    expect(err.message).toBe('Tidak memiliki akses')
  })

  it('conflict() returns 409', () => {
    const err = AppError.conflict('Data sudah ada')
    expect(err.code).toBe('CONFLICT')
    expect(err.status).toBe(409)
    expect(err.message).toBe('Data sudah ada')
  })

  it('internal() returns 500 with default message', () => {
    const err = AppError.internal()
    expect(err.code).toBe('INTERNAL_ERROR')
    expect(err.status).toBe(500)
    expect(err.message).toBe('Terjadi kesalahan internal')
  })

  it('internal() returns 500 with custom message', () => {
    const err = AppError.internal('Koneksi database gagal')
    expect(err.message).toBe('Koneksi database gagal')
  })

  it('preserves stack trace', () => {
    const err = AppError.validation('test')
    expect(err.stack).toBeDefined()
  })
})

describe('ErrorCodes', () => {
  it('contains all error codes', () => {
    expect(ErrorCodes.VALIDATION_ERROR).toBe('VALIDATION_ERROR')
    expect(ErrorCodes.NOT_FOUND).toBe('NOT_FOUND')
    expect(ErrorCodes.UNAUTHORIZED).toBe('UNAUTHORIZED')
    expect(ErrorCodes.FORBIDDEN).toBe('FORBIDDEN')
    expect(ErrorCodes.CONFLICT).toBe('CONFLICT')
    expect(ErrorCodes.INTERNAL_ERROR).toBe('INTERNAL_ERROR')
  })
})
