import * as grpc from '@grpc/grpc-js'
import { UserServiceClient } from 'src/proto/user/service'
import {
  GetUsersRequest,
  GetUsersResponse,
  GetUserRequest,
  GetUserResponse
} from 'src/proto/user/service'
import { UserRepository } from '../../domain/repository'
import { UserEntity } from '../../domain/entity'
import { logger } from 'src/helpers/logger'
import { DTOUserResponse } from '../../application/dtos/user_response'

const client = new UserServiceClient(
  process.env.USER_MS_URL, // Dirección del servidor gRPC
  grpc.credentials.createInsecure() // Configuración de credenciales
)

export class GrpcRepository implements UserRepository {
  readonly client: UserServiceClient

  constructor() {
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

        if (!response.data) {
          logger.error('No se encontraron usuarios')
          reject(new Error('No se encontraron usuarios'))
          return
        }

        resolve(response)
      })
    })

    if (!response.data) {
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

        if (!response.user) {
          logger.error('No se encontró el usuario')
          reject(new Error('No se encontró el usuario'))
          return
        }

        resolve(response)
      })
    })

    if (!response.user) {
      if (response.error) {
        throw new Error(response.error.message)
      }

      throw new Error('No se encontró el usuario')
    }

    return new DTOUserResponse(response.user)
  }
}