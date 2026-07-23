import { NextRequest, NextResponse } from 'next/server'
import { handleApiError } from '@/lib/errors/error-handler'
import { apiSuccess } from '@/lib/http/api-response'
import { getById, update, remove } from '@/modules/pocket/pocket.service'
import { updatePocketSchema } from '@/modules/pocket/pocket.schema'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const pocket = await getById(id)
    return apiSuccess(pocket)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const body = await request.json()
    const parsed = updatePocketSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: parsed.error.issues[0].message } },
        { status: 400 },
      )
    }
    const pocket = await update(id, parsed.data)
    return apiSuccess(pocket)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    await remove(id)
    return apiSuccess({ message: 'Pocket deleted' })
  } catch (error) {
    return handleApiError(error)
  }
}
