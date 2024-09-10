import { UserServiceClient } from 'src/proto/user/service'
import {
  GetUsersRequest,
  GetUsersResponse,
  GetUserRequest,
  GetUserResponse,
  GetUserToAuthRequest,
  GetUserToAuthResponse,

  CreateUserRequest,
  CreateUserResponse,

  UpdateUserRequest,
  UpdateUserResponse
} from 'src/proto/user/service'
import { UserRepository } from '../../domain/repository'
import { UserEntity } from '../../domain/entity'
import { logger } from 'src/helpers/logger'
import { DTOUserResponse } from '../../application/dtos/user_response'
import { grpcCodeToError } from 'src/helpers/errors/handler'
import { InternalServerError } from 'src/helpers/errors/custom_error'

export class GrpcRepository implements UserRepository {
  readonly client: UserServiceClient

  constructor(client: UserServiceClient) {
    this.client = client
  }

  public async getUsers(page: number, limit: number): Promise<UserEntity[]> {
    const request: GetUsersRequest = {
      page,
      limit
    }

    const response = await new Promise<GetUsersResponse>((resolve, reject) => {
      this.client.getUsers(request, (error, response: GetUsersResponse) => {
        if (error) {
          logger.error(error.message)
          const errorToThrow = grpcCodeToError(error.code, error.message)
          reject(errorToThrow)
          return
        }

        if (response.error) {
          const errorToThrow = grpcCodeToError(response.error.code, response.error.message)
          logger.error(errorToThrow.message)
          reject(errorToThrow)
          return
        }

        resolve(response)
      })
    })

    if (!response.data) {
      const errorToThrow = new InternalServerError('users not found')
      logger.error(errorToThrow.message)
      throw errorToThrow
    }

    const usersObtained = response.data.users.map(user => new DTOUserResponse(user))
    return usersObtained
  }

  public async getUserById(uuid: string): Promise<UserEntity> {
    const request: GetUserRequest = {
      id: uuid
    }

    const response = await new Promise<GetUserResponse>((resolve, reject) => {
      this.client.getUser(request, (error, response: GetUserResponse) => {
        if (error) {
          logger.error(error.message)
          const errorToThrow = grpcCodeToError(error.code, error.message)
          reject(errorToThrow)
          return
        }

        if (response.error) {
          const errorToThrow = grpcCodeToError(response.error.code, response.error.message)
          logger.error(errorToThrow.message)
          reject(errorToThrow)
          return
        }

        resolve(response)
      })
    })

    if (!response.user) {
      const errorToThrow = new InternalServerError('user not found')
      logger.error(errorToThrow.message)
      throw errorToThrow
    }

    return new DTOUserResponse(response.user)
  }

  public async getUserToAuth(email: string): Promise<UserEntity> {
    const request: GetUserToAuthRequest = {
      email
    }

    const response = await new Promise<GetUserToAuthResponse>((resolve, reject) => {
      this.client.getUserToAuth(request, (error, response: GetUserToAuthResponse) => {
        if (error) {
          logger.error(error.message)
          const errorToThrow = grpcCodeToError(error.code, error.message)
          reject(errorToThrow)
          return
        }

        if (response.error) {
          const errorToThrow = grpcCodeToError(response.error.code, response.error.message)
          logger.error(errorToThrow.message)
          reject(errorToThrow)
          return
        }

        resolve(response)
      })
    })

    if (!response.user) {
      const errorToThrow = new InternalServerError('user not found')
      logger.error(errorToThrow.message)
      throw errorToThrow
    }

    return response.user
  }

  public async createUser(user: UserEntity): Promise<UserEntity> {
    if (!user.password) {
      throw new Error('La contraseña es requerida')
    }

    const request: CreateUserRequest = {
      name: user.name,
      email: user.email,
      password: user.password
    }

    const response = await new Promise<CreateUserResponse>((resolve, reject) => {
      this.client.createUser(request, (error, response: CreateUserResponse) => {
        if (error) {
          logger.error(error.message)
          const errorToThrow = grpcCodeToError(error.code, error.message)
          reject(errorToThrow)
          return
        }

        if (response.error) {
          const errorToThrow = grpcCodeToError(response.error.code, response.error.message)
          logger.error(errorToThrow.message)
          reject(errorToThrow)
          return
        }

        resolve(response)
      })
    })

    if (!response.user) {
      const errorToThrow = new InternalServerError('user not found')
      logger.error(errorToThrow.message)
      throw errorToThrow
    }

    return response.user
  }

  public async updateUser(user: Partial<UserEntity>): Promise<UserEntity> {
    if (!user.id) {
      throw new Error('El ID del usuario es requerido')
    }

    const request: UpdateUserRequest = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      verified: user.verified
    }

    const response = await new Promise<UpdateUserResponse>((resolve, reject) => {
      this.client.updateUser(request, (error, response: UpdateUserResponse) => {
        if (error) {
          logger.error(error.message)
          const errorToThrow = grpcCodeToError(error.code, error.message)
          reject(errorToThrow)
          return
        }

        if (response.error) {
          const errorToThrow = grpcCodeToError(response.error.code, response.error.message)
          logger.error(errorToThrow.message)
          reject(errorToThrow)
          return
        }

        resolve(response)
      })
    })

    if (!response.user) {
      const errorToThrow = new InternalServerError('user not found')
      logger.error(errorToThrow.message)
      throw errorToThrow
    }

    return response.user
  }
}