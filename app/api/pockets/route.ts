import { NextRequest, NextResponse } from 'next/server'
import { handleApiError } from '@/lib/errors/error-handler'
import { apiSuccess } from '@/lib/http/api-response'
import { getAll, create } from '@/modules/pocket/pocket.service'
import { createPocketSchema } from '@/modules/pocket/pocket.schema'

export async function GET() {
  try {
    const pockets = await getAll()
    return apiSuccess(pockets)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = createPocketSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: parsed.error.issues[0].message } },
        { status: 400 },
      )
    }
    const pocket = await create(parsed.data)
    return apiSuccess(pocket, 201)
  } catch (error) {
    return handleApiError(error)
  }
}
