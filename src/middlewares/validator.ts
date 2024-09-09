import * as grpc from '@grpc/grpc-js'
import { z, ZodError } from 'zod'
import { Middleware } from './base'

export const validateData = <TRequest, TResponse>(
  schema: z.ZodSchema<TRequest>
): Middleware<TRequest, TResponse> => {
  return (
    call: grpc.ServerUnaryCall<TRequest, TResponse>,
    callback: grpc.sendUnaryData<TResponse>,
    next: (error?: grpc.ServiceError) => void
  ): void => {
    try {
      schema.parse(call.request)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          message: `${issue.path.join('.')}: ${issue.message}`,
        }))

        const grpcError: grpc.ServiceError = {
          name: error.name,
          message: error.message,
          code: grpc.status.INVALID_ARGUMENT,
          details: JSON.stringify(errorMessages),
          metadata: new grpc.Metadata()
        }

        callback(grpcError, null)
      } else {
        const grpcError: grpc.ServiceError = {
          name: 'UnknownError',
          message: 'An unexpected error occurred',
          code: grpc.status.INTERNAL,
          details: 'An unexpected error occurred',
          metadata: new grpc.Metadata()
        }

        callback(grpcError, null)
      }
    }
  }
}