import { AuthServiceServer } from 'src/proto/auth/service'

import { AuthUseCase } from 'src/modules/auth/application/use_cases/auth'
import { PostgresRepository as AuthPostgresRepository } from 'src/modules/auth/infrastructure/repositories/postgres'
import { PostgresRepository as UserPostgresRepository } from 'src/modules/user/infrastructure/repositories/postgres'
import { AuthController } from './controller'
import { logRequestMiddleware } from 'src/middlewares/log_request'
import { applyMiddleware } from 'src/middlewares/base'
import { validateData } from 'src/middlewares/validator'
import { refreshTokenSchema, signInSchema, signUpSchema } from '../application/schemas/auth'

const authRepository = new AuthPostgresRepository()
const userRepository = new UserPostgresRepository()
const useCase = new AuthUseCase(authRepository, userRepository)
const authController = new AuthController(useCase)

export const authService: AuthServiceServer = {
  signIn: applyMiddleware(authController.signIn, logRequestMiddleware(), validateData(signInSchema)),
  signUp: applyMiddleware(authController.signUp, logRequestMiddleware(), validateData(signUpSchema)),
  signOut: applyMiddleware(authController.signOut, logRequestMiddleware(), validateData(refreshTokenSchema))
}