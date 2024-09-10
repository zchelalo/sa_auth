import { UserRepository } from '../../domain/repository'
import { UserValue } from '../../domain/value'
import { DTOUserCreate } from '../dtos/user_create'
import { DTOUserResponse } from '../dtos/user_response'
import {
  getUserByIDSchema,
  getUserByEmailSchema,
  paginationSchema,
  createUserSchema
} from '../schemas/user'

import bcrypt from 'bcrypt'

/**
 * Create a new User Use Case.
 * Provides methods to interact with User data including retrieving, creating, and counting users.
 * 
 * This class is part of the application layer in the hexagonal architecture and relies on a UserRepository to access and manipulate user data.
 * 
 * The `UserValue`, `DTOUserCreate` and `DTOUserResponse` are used within these methods and are documented in their respective modules.
 * 
 * @example
 * ```ts
 * const postgresRepository = new PostgresRepository()
 * const userUseCase = new UserUseCase(postgresRepository)
 * ```
 */
export class UserUseCase {
  /**
   * @private
   * @property {UserRepository} userRepository - The repository used to interact with user data.
   * This repository is injected via the constructor to decouple the data access layer from the application logic.
  */
  private readonly userRepository: UserRepository

  /**
   * Creates an instance of UserUseCase.
   * 
   * @param {UserRepository} userRepository - The repository that provides access to user data.
   * The repository is injected to allow for greater flexibility and easier testing.
  */
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  /**
   * @function getUserById
   * @description Get a user by id.
   * @param id - Id of user.
   * @returns {Promise<DTOUserResponse>} A promise that resolves to the DTOUserResponse.
   * @example
   * ```ts
   * const id = '938d6f5b-b4a6-4669-a514-ddb3a23621fc'
   * const user = await userUseCase.getUserById(id)
   * ```
  */
  public async getUserById(id: string): Promise<DTOUserResponse> {
    getUserByIDSchema.parse({ id })

    const userObtained = await this.userRepository.getUserById(id)
    return new DTOUserResponse(userObtained)
  }

  /**
   * @function getUsers
   * @description Get a page of users.
   * @param offset - The offset of the page.
   * @param limit - The limit of the page.
   * @returns {Promise<DTOUserResponse[]>} A promise that resolves to an array of DTOUserResponse.
   * @example
   * ```ts
   * const offset = 0
   * const limit = 10
   * const users = await userUseCase.getUsers(offset, limit)
   * ```
  */
  public async getUsers(offset: number, limit: number): Promise<DTOUserResponse[]> {
    paginationSchema.parse({ offset, limit })

    const usersObtained = await this.userRepository.getUsers(offset, limit)
    return usersObtained.map(user => new DTOUserResponse(user))
  }
}