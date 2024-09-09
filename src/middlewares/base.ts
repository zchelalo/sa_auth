import * as grpc from '@grpc/grpc-js'

export type Middleware<TRequest, TResponse> = (
  call: grpc.ServerUnaryCall<TRequest, TResponse>,
  callback: grpc.sendUnaryData<TResponse>,
  next: (error?: grpc.ServiceError) => void
) => void

export const applyMiddleware = <TRequest, TResponse>(
  handler: (call: grpc.ServerUnaryCall<TRequest, TResponse>, callback: grpc.sendUnaryData<TResponse>) => void,
  ...middlewares: Middleware<TRequest, TResponse>[]
) => {
  return (
    call: grpc.ServerUnaryCall<TRequest, TResponse>,
    callback: grpc.sendUnaryData<TResponse>
  ) => {
    const stack = [...middlewares, handler]

    const executeMiddleware = (index: number, error?: grpc.ServiceError): void => {
      if (error || index >= stack.length) {
        callback(error ?? null, null)
        return
      }
      const middleware = stack[index]
      middleware(call, callback, (err) => executeMiddleware(index + 1, err))
    }

    executeMiddleware(0)
  }
}
