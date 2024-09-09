import { AuthUseCase } from 'src/modules/auth/application/use_cases/auth'

import * as grpc from '@grpc/grpc-js'
import { Auth, SignInRequest, SignInResponse, SignOutRequest, SignOutResponse, SignUpRequest, SignUpResponse } from 'src/proto/auth/service'
import { handlerErrors } from 'src/helpers/errors/handler'
import { signInSchema, signUpSchema, tokenSchema } from '../application/schemas/auth'

export class AuthController {
  private readonly useCase: AuthUseCase

  constructor(useCase: AuthUseCase) {
    this.useCase = useCase
  }

  public signIn = async (call: grpc.ServerUnaryCall<SignInRequest, any>, callback: grpc.sendUnaryData<SignInResponse>): Promise<void> => {
    try {
      const { email, password } = call.request
      signInSchema.parse({ email, password })

      const result = await this.useCase.signIn(email, password)
  
      const auth: Auth = {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        user: {
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
          verified: result.user.verified
        }
      }
  
      const signInResponse: SignInResponse = {
        auth: auth
      }
  
      callback(null, signInResponse)
    } catch (error) {
      let errorResponse
      if (error instanceof Error) {
        errorResponse = handlerErrors(error)
      } else {
        errorResponse = {
          code: grpc.status.UNKNOWN,
          message: 'Unknown error'
        }
      }

      const response: SignInResponse = {
        error: errorResponse
      }
      callback(null, response)
    }
  }

  public signUp = async (call: grpc.ServerUnaryCall<SignUpRequest, any>, callback: grpc.sendUnaryData<SignUpResponse>): Promise<void> => {
    try {
      const { name, email, password } = call.request
      signUpSchema.parse({ name, email, password })

      const result = await this.useCase.signUp({
        name,
        email,
        password
      })

      const auth: Auth = {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        user: {
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
          verified: result.user.verified
        }
      }
  
      const signUpResponse: SignUpResponse = {
        auth: auth
      }

      callback(null, signUpResponse)
    } catch (error) {
      let errorResponse
      if (error instanceof Error) {
        errorResponse = handlerErrors(error)
      } else {
        errorResponse = {
          code: grpc.status.UNKNOWN,
          message: 'Unknown error'
        }
      }

      const response: SignUpResponse = {
        error: errorResponse
      }
      callback(null, response)
    }
  }

  public signOut = async (call: grpc.ServerUnaryCall<SignOutRequest, any>, callback: grpc.sendUnaryData<SignOutResponse>): Promise<void> => {
    try {
      const { refreshToken } = call.request
      tokenSchema.parse({ token: refreshToken })

      await this.useCase.signOut(refreshToken)

      const signOutResponse: SignOutResponse = {
        success: true
      }

      callback(null, signOutResponse)
    } catch (error) {
      let errorResponse
      if (error instanceof Error) {
        errorResponse = handlerErrors(error)
      } else {
        errorResponse = {
          code: grpc.status.UNKNOWN,
          message: 'Unknown error'
        }
      }

      const response: SignOutResponse = {
        error: errorResponse
      }
      callback(null, response)
    }
  }
}