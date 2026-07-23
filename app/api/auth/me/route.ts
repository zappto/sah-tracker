import { getSession } from '@/modules/auth/auth.service'
import { handleApiError } from '@/lib/errors/error-handler'
import { AppError } from '@/lib/errors/app-error'
import { apiSuccess } from '@/lib/http/api-response'

export async function GET() {
  try {
    const session = await getSession()
    if (!session) {
      throw AppError.unauthorized('Belum login')
    }
    return apiSuccess(session)
  } catch (error) {
    return handleApiError(error)
  }
}
