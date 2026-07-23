import { logout } from '@/modules/auth/auth.service'
import { handleApiError } from '@/lib/errors/error-handler'
import { apiSuccess } from '@/lib/http/api-response'

export async function POST() {
  try {
    await logout()
    return apiSuccess({ message: 'Logged out' })
  } catch (error) {
    return handleApiError(error)
  }
}
