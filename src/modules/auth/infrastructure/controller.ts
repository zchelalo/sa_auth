import { AuthUseCase } from 'src/modules/auth/application/use_cases/auth'

import * as grpc from '@grpc/grpc-js'
import { Auth, SignInRequest, SignInResponse, SignOutRequest, SignOutResponse, SignUpRequest, SignUpResponse } from 'src/proto/auth/service'
import { CustomError } from 'src/helpers/errors/custom_error'
import { convertCustomErrorToGrpcError } from 'src/helpers/errors/convert_error'

export class AuthController {
  private readonly useCase: AuthUseCase

  constructor(useCase: AuthUseCase) {
    this.useCase = useCase
  }

  public signIn = async (call: grpc.ServerUnaryCall<SignInRequest, any>, callback: grpc.sendUnaryData<SignInResponse>): Promise<void> => {
    try {
      const { email, password } = call.request
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
        response: {
          auth: auth,
          error: undefined
        }
      }
  
      callback(null, signInResponse)
    } catch (err) {
      if (err instanceof CustomError) {
        const grpcError = convertCustomErrorToGrpcError(err)
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

  public signUp = async (call: grpc.ServerUnaryCall<SignUpRequest, any>, callback: grpc.sendUnaryData<SignUpResponse>): Promise<void> => {
    try {
      const { name, email, password } = call.request
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
        response: {
          auth: auth,
          error: undefined
        }
      }

      callback(null, signUpResponse)
    } catch (err) {
      if (err instanceof CustomError) {
        const grpcError = convertCustomErrorToGrpcError(err)
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

  public signOut = async (call: grpc.ServerUnaryCall<SignOutRequest, any>, callback: grpc.sendUnaryData<SignOutResponse>): Promise<void> => {
    try {
      const { refreshToken } = call.request
      await this.useCase.signOut(refreshToken)

      const signOutResponse: SignOutResponse = {
        success: true
      }

      callback(null, signOutResponse)
    } catch (err) {
      if (err instanceof CustomError) {
        const grpcError = convertCustomErrorToGrpcError(err)
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