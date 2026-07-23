import { NextRequest } from 'next/server'
import { handleApiError } from '@/lib/errors/error-handler'
import { apiSuccess } from '@/lib/http/api-response'
import { getById } from '@/modules/transaction/transaction.service'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const tx = await getById(id)
    return apiSuccess(tx)
  } catch (error) {
    return handleApiError(error)
  }
}
