import { NextResponse } from 'next/server'
import { AppError, ErrorCodes } from './app-error'

export function handleApiError(error: unknown): NextResponse {
  if (error instanceof AppError) {
    return NextResponse.json(
      { error: { code: error.code, message: error.message } },
      { status: error.status },
    )
  }

  console.error('[api-error]', error)
  return NextResponse.json(
    { error: { code: ErrorCodes.INTERNAL_ERROR, message: 'Terjadi kesalahan internal' } },
    { status: 500 },
  )
}
