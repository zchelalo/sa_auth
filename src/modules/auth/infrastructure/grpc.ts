import * as grpc from '@grpc/grpc-js'

import { AuthServiceServer } from 'src/proto/auth/service'

import { AuthUseCase } from 'src/modules/auth/application/use_cases/auth'
import { PostgresRepository as AuthPostgresRepository } from 'src/modules/auth/infrastructure/repositories/postgres'
import { GrpcRepository as UserPostgresRepository } from 'src/modules/user/infrastructure/repositories/grpc'
import { AuthController } from './controller'
import { logRequestMiddleware } from 'src/middlewares/log_request'
import { applyMiddleware } from 'src/middlewares/base'
import { UserServiceClient } from 'src/proto/user/service'

const client = new UserServiceClient(
  process.env.USER_MS_URL, // Dirección del servidor gRPC
  grpc.credentials.createInsecure() // Configuración de credenciales
)

const authRepository = new AuthPostgresRepository()
const userRepository = new UserPostgresRepository(client)
const useCase = new AuthUseCase(authRepository, userRepository)
const authController = new AuthController(useCase)

export const authService: AuthServiceServer = {
  signIn: applyMiddleware(authController.signIn, logRequestMiddleware()),
  signUp: applyMiddleware(authController.signUp, logRequestMiddleware()),
  signOut: applyMiddleware(authController.signOut, logRequestMiddleware())
}