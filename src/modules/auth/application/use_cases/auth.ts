import { AuthRepository } from 'src/modules/auth/domain/repository'
import { UserRepository } from 'src/modules/user/domain/repository'
import { UserValue } from 'src/modules/user/domain/value'
import { TokenValue } from 'src/modules/auth/domain/value'

import { DTOAuthResponse } from 'src/modules/auth/application/dtos/auth_response'
import { DTOUserCreate } from 'src/modules/user/application/dtos/user_create'
import { signInSchema, tokenSchema } from 'src/modules/auth/application/schemas/auth'
import { createUserSchema } from 'src/modules/user/application/schemas/user'

import { TokenType } from 'src/config/constants'
import { createJWT, tokenExpiration, verifyJWT } from 'src/utils/jwt'
import { durationToMilliseconds } from 'src/utils/time_converter'

import { InternalServerError, UnauthorizedError } from 'src/helpers/errors/custom_error'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { DTOUserResponse } from 'src/modules/user/application/dtos/user_response'

/**
 * Create a new Auth Use Case.
 * Provides methods to interact with Auth data including signing in, signing up, and signing out.
 * 
 * This class is part of the application layer in the hexagonal architecture and relies on a UserRepository to access and manipulate user data and an AuthRepository to access and manipulate tokens data.
 * 
 * The `DTOAuthResponse` is used within these methods and is documented in their respective modules.
 * 
 * @example
 * ```ts
 * const userRepository = new UserPostgresRepository()
 * const authUseCase = new AuthUseCase(userRepository)
 * ```
 */
export class AuthUseCase {
  /**
   * @private
   * @property {AuthRepository} authRepository - The repository used to interact with tokens data.
   * This repository is injected via the constructor to decouple the data access layer from the application logic.
  */
  private readonly authRepository: AuthRepository

  /**
   * @private
   * @property {UserRepository} userRepository - The repository used to interact with user data.
   * This repository is injected via the constructor to decouple the data access layer from the application logic.
  */
  private readonly userRepository: UserRepository

  /**
   * Creates an instance of AuthUseCase.
   * 
   * @param {AuthRepository} authRepository - The repository that provides access to user data.
   * @param {UserRepository} userRepository - The repository that provides access to user data.
   * The repositories are injected to allow for greater flexibility and easier testing.
  */
  constructor(authRepository: AuthRepository, userRepository: UserRepository) {
    this.authRepository = authRepository
    this.userRepository = userRepository
  }

  /**
   * @function signIn
   * @description Sign in a user.
   * @param email - Email of user.
   * @param password - Password of user.
   * @returns {Promise<DTOAuthResponse>} A promise that resolves to the DTOAuthResponse.
   * @throws {UnauthorizedError} If the email or password is incorrect.
   * @example
   * ```ts
   * const email = 'test@email.com'
   * const password = '12345678'
   * const authData = await authUseCase.signIn(email, password)
   * ```
  */
  public async signIn(email: string, password: string): Promise<DTOAuthResponse> {
    signInSchema.parse({ email, password })

    const userData = await this.userRepository.getUserToAuth(email)

    if (!userData.password) {
      throw new UnauthorizedError()
    }

    const isPasswordMatch = await bcrypt.compare(password, userData.password)
    if (!isPasswordMatch) {
      throw new UnauthorizedError()
    }

    const accessToken = await createJWT({ sub: userData.id }, TokenType.ACCESS)
    const refreshToken = await createJWT({ sub: userData.id }, TokenType.REFRESH)

    const tokenType = await this.authRepository.getTokenTypeIdByKey(TokenType.REFRESH)
    const newToken = new TokenValue(refreshToken, userData.id, tokenType.id)
    await this.authRepository.saveToken(newToken)

    const dtoUserResponse = new DTOUserResponse(userData)

    const authValue = new DTOAuthResponse({
      accessToken,
      refreshToken,
      user: dtoUserResponse
    })

    return authValue
  }

  /**
   * @function signUp
   * @description Sign up a user.
   * @param name - The name of the user.
   * @param email - The email of the user.
   * @param password - The password of the user.
   * @returns {Promise<DTOAuthResponse>} A promise that resolves to the DTOAuthResponse.
   * @example
   * ```ts
   * const name = 'test'
   * const email = 'test@email.com'
   * const password = '12345678'
   * const authData = await authUseCase.signUp(name, email, password)
   * ```
  */
  public async signUp(user: DTOUserCreate): Promise<DTOAuthResponse> {
    createUserSchema.parse(user)

    const newUser = new UserValue(user.name, user.email, user.password)
    const userCreated = await this.userRepository.createUser(newUser)

    const accessToken = await createJWT({ sub: userCreated.id }, TokenType.ACCESS)
    const refreshToken = await createJWT({ sub: userCreated.id }, TokenType.REFRESH)

    const tokenType = await this.authRepository.getTokenTypeIdByKey(TokenType.REFRESH)
    const newToken = new TokenValue(refreshToken, userCreated.id, tokenType.id)
    await this.authRepository.saveToken(newToken)

    const authValue = new DTOAuthResponse({
      accessToken,
      refreshToken,
      user: userCreated
    })

    return authValue
  }

  /**
   * @function signOut
   * @description Sign out a user.
   * @param refreshToken - The refresh token of the user.
   * @returns {Promise<void>} A promise that resolves to the void.
   * @throws {UnauthorizedError} If the refresh token is invalid.
   * @example
   * ```ts
   * const refreshToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3ZDgwNzQwNi1hNTQzLTRlMWYtYjAxOS1jOGIwNWQ1OGM1OWIiLCJpYXQiOjE3MjQ2MzExMjksImV4cCI6MTcyNTkyNzEyOX0.l7WXdoTopPRqeK-TNIgJtCoR863Yot5cJC-jV3v6DwJtrvH9wjqGFPHpgo00z4d9jCbMTEBnUfv2NkFCk4ecPt4YTledruAuxQoULk3NqoaXhn4wlKhQj7w14ngldir_pud4SxXJnfaw_zd1xg6Gd7rDH-LAWUYaNyvs8qt2CRra7pnBA6tBUvrO58HYReJRQU-GQP9PWRmRC4G8H3tpnGEybn4NcNCn-rO-PIgABZ1I3Len1y8ibKMrz53Rc1PTUTInD96RORM5zp5c06qkyUjW9AThFQwmYP9Yzo4z3fBsuvqQFha31lWoqzP5LNk2iOHECuequuLPThtNWdsRyw'
   * await authUseCase.signOut(refreshToken)
   * ```
  */
  public async signOut(refreshToken: string): Promise<void> {
    tokenSchema.parse({ token: refreshToken })

    const payload = await verifyJWT(refreshToken, TokenType.REFRESH)
    if (!payload) {
      throw new UnauthorizedError()
    }

    await this.authRepository.revokeTokenByTokenValue(refreshToken)
  }

  /**
   * @function refreshAccessToken
   * @description Refresh the access token of a user.
   * @param refreshToken - The refresh token of the user.
   * @returns {Promise<{ token: string, userId: string }>} A promise that resolves to the new access token and the user id.
   * @throws {UnauthorizedError} If the refresh token is invalid.
   * @example
   * ```ts
   * const refreshToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3ZDgwNzQwNi1hNTQzLTRlMWYtYjAxOS1jOGIwNWQ1OGM1OWIiLCJpYXQiOjE3MjQ2MzExMjksImV4cCI6MTcyNTkyNzEyOX0.l7WXdoTopPRqeK-TNIgJtCoR863Yot5cJC-jV3v6DwJtrvH9wjqGFPHpgo00z4d9jCbMTEBnUfv2NkFCk4ecPt4YTledruAuxQoULk3NqoaXhn4wlKhQj7w14ngldir_pud4SxXJnfaw_zd1xg6Gd7rDH-LAWUYaNyvs8qt2CRra7pnBA6tBUvrO58HYReJRQU-GQP9PWRmRC4G8H3tpnGEybn4NcNCn-rO-PIgABZ1I3Len1y8ibKMrz53Rc1PTUTInD96RORM5zp5c06qkyUjW9AThFQwmYP9Yzo4z3fBsuvqQFha31lWoqzP5LNk2iOHECuequuLPThtNWdsRyw'
   * const accessData = await authUseCase.refreshAccessToken(refreshToken)
   * ```
  */
  public async refreshAccessToken(rToken: string): Promise<{ accessToken: string, refreshToken: string | undefined, userId: string }> {
    tokenSchema.parse({ token: rToken })

    const payload = await verifyJWT(rToken, TokenType.REFRESH)
    if (!payload) {
      throw new UnauthorizedError()
    }

    await this.authRepository.getTokenByTokenValue(rToken)

    const accessToken = await createJWT({ sub: payload.sub }, TokenType.ACCESS)

    let refreshToken = undefined
    if (this.shouldRefreshTheRefreshToken(payload)) {
      await this.authRepository.revokeTokenByTokenValue(rToken)

      refreshToken = await createJWT({ sub: payload.sub }, TokenType.REFRESH)

      const tokenType = await this.authRepository.getTokenTypeIdByKey(TokenType.REFRESH)
      const newToken = new TokenValue(refreshToken, payload.sub as string, tokenType.id)
      await this.authRepository.saveToken(newToken)
    }

    return {
      accessToken,
      refreshToken,
      userId: payload.sub as string
    }
  }

  /**
   * @function tokenExist
   * @description Check if a token exists.
   * @param token - The token to check.
   * @param type - The type of the token.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating if the token exists.
   * @example
   * ```ts
   * const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3ZDgwNzQwNi1hNTQzLTRlMWYtYjAxOS1jOGIwNWQ1OGM1OWIiLCJpYXQiOjE3MjQ2MzExMjksImV4cCI6MTcyNTkyNzEyOX0.l7WXdoTopPRqeK-TNIgJtCoR863Yot5cJC-jV3v6DwJtrvH9wjqGFPHpgo00z4d9jCbMTEBnUfv2NkFCk4ecPt4YTledruAuxQoULk3NqoaXhn4wlKhQj7w14ngldir_pud4SxXJnfaw_zd1xg6Gd7rDH-LAWUYaNyvs8qt2CRra7pnBA6tBUvrO58HYReJRQU-GQP9PWRmRC4G8H3tpnGEybn4NcNCn-rO-PIgABZ1I3Len1y8ibKMrz53Rc1PTUTInD96RORM5zp5c06qkyUjW9AThFQwmYP9Yzo4z3fBsuvqQFha31lWoqzP5LNk2iOHECuequuLPThtNWdsRyw'
   * const tokenExist = await authUseCase.refreshTokenExist(refreshToken, TokenType.REFRESH)
   * ```
   */
  public async tokenExist(token: string, type: TokenType): Promise<boolean> {
    const payload = await verifyJWT(token, type)
    if (!payload) {
      return false
    }

    const tokenObtained = await this.authRepository.getTokenByTokenValue(token)

    return tokenObtained ? true : false
  }

  /**
   * @function shouldRefreshTheRefreshToken
   * @description Check if the refresh token should be refreshed.
   * @param payload - The payload of the token.
   * @returns {boolean} A boolean indicating if the refresh token should be refreshed.
   * @throws {InternalServerError} If the expiration time is missing.
   * @example
   * ```ts
   * const payload = {
   *  sub: '938d6f5b-b4a6-4669-a514-ddb3a23621fc',
   *  iat: 1624631129,
   *  exp: 1625927129
   * }
   * const shouldRefresh = authUseCase.shouldRefreshTheRefreshToken(payload)
   */
  private shouldRefreshTheRefreshToken(payload: jwt.JwtPayload): boolean {
    const currentTime = Math.floor(Date.now() / 1000)

    if (!payload.exp) {
      throw new InternalServerError('jwt expiration time is missing')
    }

    const expirationTime = payload.exp

    const totalDuration = durationToMilliseconds(tokenExpiration[TokenType.REFRESH])
    const threshold = totalDuration * 0.25

    return (expirationTime - currentTime) < threshold
  }
}