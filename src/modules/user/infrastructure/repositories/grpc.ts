import * as grpc from '@grpc/grpc-js'
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
          reject(new Error(error.message))
          return
        }

        if (response.error) {
          logger.error(response.error)
          reject(new Error(response.error.message))
          return
        }

        resolve(response)
      })
    })

    if (!response.data) {
      logger.error('No se encontraron usuarios')
      throw new Error('No se encontraron usuarios')
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
          reject(new Error(error.message))
          return
        }

        if (response.error) {
          logger.error(response.error)
          reject(new Error(response.error.message))
          return
        }

        resolve(response)
      })
    })

    if (!response.user) {
      logger.error('No se encontró el usuario')
      throw new Error('No se encontró el usuario')
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
          reject(new Error(error.message))
          return
        }

        if (response.error) {
          logger.error(response.error)
          reject(new Error(response.error.message))
          return
        }

        resolve(response)
      })
    })

    if (!response.user) {
      logger.error('No se encontró el usuario')
      throw new Error('No se encontró el usuario')
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
          reject(new Error(error.message))
          return
        }

        if (response.error) {
          logger.error(response.error)
          reject(new Error(response.error.message))
          return
        }

        resolve(response)
      })
    })

    if (!response.user) {
      logger.error('No se encontró el usuario')
      throw new Error('No se encontró el usuario')
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
          reject(new Error(error.message))
          return
        }

        if (response.error) {
          logger.error(response.error)
          reject(new Error(response.error.message))
          return
        }

        resolve(response)
      })
    })

    if (!response.user) {
      logger.error('No se encontró el usuario')
      throw new Error('No se encontró el usuario')
    }

    return response.user
  }
}