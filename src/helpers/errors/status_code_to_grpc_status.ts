import * as grpc from '@grpc/grpc-js'

export const mapStatusCodeToGrpcStatus = (statusCode: number): grpc.status => {
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