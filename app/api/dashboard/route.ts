import { handleApiError } from '@/lib/errors/error-handler'
import { apiSuccess } from '@/lib/http/api-response'
import { getDashboard } from '@/modules/dashboard/dashboard.service'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const data = await getDashboard()
    return apiSuccess(data)
  } catch (error) {
    return handleApiError(error)
  }
}
