import * as grpc from '@grpc/grpc-js'
import { CustomError } from './custom_error'

/**
 * Converts a CustomError to a gRPC ServiceError.
 * 
 * @param {CustomError} error - The custom error to convert.
 * @returns {grpc.ServiceError} The converted gRPC service error.
 */
export const convertCustomErrorToGrpcError = (error: CustomError): grpc.ServiceError => {
  // Create a new instance of Metadata
  const metadata = new grpc.Metadata()

  const grpcError: grpc.ServiceError = {
    name: error.name,
    message: error.message,
    code: mapStatusCodeToGrpcStatus(error.statusCode),
    details: error.message,
    metadata
  }

  return grpcError
}

const mapStatusCodeToGrpcStatus = (statusCode: number): grpc.status => {
  switch (statusCode) {
    case 400: return grpc.status.INVALID_ARGUMENT
    case 401: return grpc.status.UNAUTHENTICATED
    case 403: return grpc.status.PERMISSION_DENIED
    case 404: return grpc.status.NOT_FOUND
    case 409: return grpc.status.ALREADY_EXISTS
    case 500: return grpc.status.INTERNAL
    default: return grpc.status.UNKNOWN
  }
}