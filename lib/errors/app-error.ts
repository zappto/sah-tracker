export const ErrorCodes = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  CONFLICT: 'CONFLICT',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const satisfies Record<string, string>

export type TErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes]

interface IAppErrorParams {
  code: TErrorCode
  message: string
  status: number
}

export class AppError extends Error {
  public readonly code: TErrorCode
  public readonly status: number

  constructor(params: IAppErrorParams) {
    super(params.message)
    this.name = 'AppError'
    this.code = params.code
    this.status = params.status
  }

  static validation(message: string): AppError {
    return new AppError({ code: ErrorCodes.VALIDATION_ERROR, message, status: 400 })
  }

  static notFound(message: string): AppError {
    return new AppError({ code: ErrorCodes.NOT_FOUND, message, status: 404 })
  }

  static unauthorized(message: string): AppError {
    return new AppError({ code: ErrorCodes.UNAUTHORIZED, message, status: 401 })
  }

  static forbidden(message: string): AppError {
    return new AppError({ code: ErrorCodes.FORBIDDEN, message, status: 403 })
  }

  static conflict(message: string): AppError {
    return new AppError({ code: ErrorCodes.CONFLICT, message, status: 409 })
  }

  static internal(message?: string): AppError {
    return new AppError({ code: ErrorCodes.INTERNAL_ERROR, message: message ?? 'Terjadi kesalahan internal', status: 500 })
  }
}
