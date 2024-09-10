import * as grpc from '@grpc/grpc-js'
import { Error as ProtoError } from 'src/proto/auth/service'
import { BadRequestError, ConflictError, CustomError, ForbiddenError, InternalServerError, NotFoundError, UnauthorizedError } from './custom_error'
import { ZodError } from 'zod'

export const handlerErrors = (error: Error): ProtoError => {
  if (error instanceof CustomError) {
    return {
      code: error.grpcCode,
      message: error.message
    }
  }

  if (error instanceof ZodError) {
    return {
      code: grpc.status.INVALID_ARGUMENT,
      message: error.message
    }
  }

  return {
    code: grpc.status.INTERNAL,
    message: error.message
  }
}

export const grpcCodeToError = (grpcCode: grpc.status, message?: string): CustomError => {
  switch (grpcCode) {
    case grpc.status.INVALID_ARGUMENT:
      return new BadRequestError(message || 'Invalid request')
    case grpc.status.UNAUTHENTICATED:
      return new UnauthorizedError()
    case grpc.status.PERMISSION_DENIED:
      return new ForbiddenError()
    case grpc.status.NOT_FOUND:
      return new NotFoundError(message || 'resource')
    case grpc.status.ALREADY_EXISTS:
      return new ConflictError(message || 'Resource already exists')
    case grpc.status.INTERNAL:
      return new InternalServerError(message || 'something went wrong')
    default:
      return new CustomError(grpc.status.UNKNOWN, message || 'Unknown error')
  }
}