import { NextRequest, NextResponse } from 'next/server'
import { handleApiError } from '@/lib/errors/error-handler'
import { apiSuccess } from '@/lib/http/api-response'
import { getAll, create } from '@/modules/member/member.service'
import { createMemberSchema } from '@/modules/member/member.schema'

export async function GET() {
  try {
    const members = await getAll()
    return apiSuccess(members)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = createMemberSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: parsed.error.issues[0].message } },
        { status: 400 },
      )
    }
    const member = await create(parsed.data)
    return apiSuccess(member, 201)
  } catch (error) {
    return handleApiError(error)
  }
}
