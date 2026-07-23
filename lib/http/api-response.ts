import { NextResponse } from 'next/server'

interface IPaginatedMeta {
  total: number
  page: number
  limit: number
}

export function apiSuccess<T>(data: T, status: number = 200): NextResponse {
  return NextResponse.json({ data }, { status })
}

export function apiPaginated<T>(
  items: T[],
  total: number,
  page: number,
  limit: number,
): NextResponse {
  return NextResponse.json({
    data: items,
    meta: { total, page, limit } satisfies IPaginatedMeta,
  })
}

export function apiError(
  code: string,
  message: string,
  status: number,
): NextResponse {
  return NextResponse.json({ error: { code, message } }, { status })
}
