import { NextRequest, NextResponse } from 'next/server'
import { handleApiError } from '@/lib/errors/error-handler'
import { apiSuccess } from '@/lib/http/api-response'
import { getAll, create } from '@/modules/transaction/transaction.service'
import { createTransactionSchema } from '@/modules/transaction/transaction.schema'

export async function GET() {
  try {
    const transactions = await getAll()
    return apiSuccess(transactions)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = createTransactionSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: parsed.error.issues[0].message } },
        { status: 400 },
      )
    }
    const tx = await create(parsed.data)
    return apiSuccess(tx, 201)
  } catch (error) {
    return handleApiError(error)
  }
}
