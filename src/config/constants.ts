/**
 * Constants for the cookie names used in the application.
 * 
 * @enum
*/
export enum CookieNames {
  /**
   * The name of the cookie that stores the refresh token.
  */
  REFRESH_TOKEN = 'refresh_token',

  /**
   * The name of the cookie that stores the access token.
  */
  ACCESS_TOKEN = 'access_token'
}

/**
 * Token types for JWT
 * @enum
 */
export enum TokenType {
  /**
   * Access token
   */
  ACCESS = 'access',

  /**
   * Refresh token
   */
  REFRESH = 'refresh',

  /**
   * Verify token. Used for email verification
   */
  VERIFY = 'verify',

  /**
   * Recover token. Used for password recovery
   */
  RECOVER = 'recover'
}