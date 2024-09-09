import { Error as ProtoError } from 'src/proto/auth/service'
import { CustomError } from './custom_error'
import { ZodError } from 'zod'
import { mapStatusCodeToGrpcStatus } from './status_code_to_grpc_status'

export const handlerErrors = (error: Error): ProtoError => {
  if (error instanceof CustomError) {
    return {
      code: mapStatusCodeToGrpcStatus(error.statusCode),
      message: error.message
    }
  }

  if (error instanceof ZodError) {
    return {
      code: mapStatusCodeToGrpcStatus(400),
      message: 'Invalid request'
    }
  }

  return {
    code: mapStatusCodeToGrpcStatus(500),
    message: error.message
  }
}