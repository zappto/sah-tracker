import { NextRequest, NextResponse } from 'next/server'
import { loginSchema } from '@/modules/auth/auth.schema'
import { login } from '@/modules/auth/auth.service'
import { handleApiError } from '@/lib/errors/error-handler'
import { apiSuccess } from '@/lib/http/api-response'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = loginSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: parsed.error.issues[0].message } },
        { status: 400 },
      )
    }

    const user = await login(parsed.data.username)
    return apiSuccess(user)
  } catch (error) {
    return handleApiError(error)
  }
}
