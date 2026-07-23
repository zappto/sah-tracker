interface IApiError {
  code: string
  message: string
}

interface IApiResponse<T> {
  data: T
  error?: never
}

interface IApiErrorResponse {
  data?: never
  error: IApiError
}

type TApiResult<T> = IApiResponse<T> | IApiErrorResponse

async function request<T>(
  method: string,
  path: string,
  body?: Record<string, unknown>,
): Promise<T> {
  const res = await fetch(`/api${path}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  })

  const json: TApiResult<T> = await res.json()

  if (!res.ok || json.error) {
    const err = json.error ?? { code: 'UNKNOWN', message: 'Terjadi kesalahan' }
    throw new Error(`${err.code}: ${err.message}`)
  }

  return json.data
}

export const api = {
  get<T>(path: string): Promise<T> {
    return request<T>('GET', path)
  },
  post<T>(path: string, body?: Record<string, unknown>): Promise<T> {
    return request<T>('POST', path, body)
  },
  patch<T>(path: string, body?: Record<string, unknown>): Promise<T> {
    return request<T>('PATCH', path, body)
  },
  del<T>(path: string): Promise<T> {
    return request<T>('DELETE', path)
  },
}
