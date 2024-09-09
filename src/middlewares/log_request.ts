import * as grpc from '@grpc/grpc-js'
import { logger } from 'src/helpers/logger'
import { Middleware } from './base'

export const logRequestMiddleware = <TRequest = any, TResponse = any>(): Middleware<TRequest, TResponse> => {
  return (
    call: grpc.ServerUnaryCall<TRequest, TResponse>,
    _: grpc.sendUnaryData<TResponse>,
    next: (error?: grpc.ServiceError) => void
  ): void => {
    logger.info(`Incoming request - Method: ${call.getPath()}`)

    next()
  }
}
