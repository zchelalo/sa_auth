import * as grpc from '@grpc/grpc-js'
import { AuthServiceService } from 'src/proto/auth'
import { authService } from './modules/auth/infrastructure/grpc'

const server = new grpc.Server()

server.addService(AuthServiceService, authService)

export { server }