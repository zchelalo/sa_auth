import { TokenTypeValue, TokenValue } from 'src/modules/auth/domain/value'
import { TokenType } from 'src/config/constants'

/**
 * AuthRepository interface.
 * 
 * This interface defines the contract for a repository that manages the authentication of AuthEntity objects.
 * 
 * @interface AuthRepository
*/
export interface AuthRepository {
  /**
   * Retrieves a token by the user ID and the token.
   * 
   * @param {string} tokenValue - The token of the user.
   * @returns {Promise<TokenValue>} A promise that resolves to a TokenValue object.
  */
  getTokenByTokenValue(tokenValue: string): Promise<TokenValue>

  /**
   * Saves a new token.
   * 
   * @param {TokenValue} tokenValue - The token value to save.
   * @returns {Promise<void>} A promise that resolves to void.
  */
  saveToken(tokenValue: TokenValue): Promise<void>

  /**
   * Revokes a token by the User ID and the token value.
   * 
   * @param {string} tokenValue - The token of the user.
   * @returns {Promise<void>} A promise that resolves to void.
  */
  revokeTokenByTokenValue(tokenValue: string): Promise<void>

  /**
   * Retrieves a token type ID by the key.
   * 
   * @param {TokenType} key - The key of the token type.
   * @returns {Promise<TokenTypeValue>} A promise that resolves to a TokenTypeValue object.
  */
  getTokenTypeIdByKey(key: TokenType): Promise<TokenTypeValue>
}