import { z } from 'zod'

/**
 * Sign in schema
 * 
 * Represents the validation schema for create a Sign In object.
 * 
 * @param {string} email - The email of the user, must be a valid email format.
 * @param {string} password - The password of the user, must be at least 8 characters.
 */
export const signInSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(8)
})

export const signUpSchema = signInSchema.extend({
  name: z.string().min(3)
})

/**
 * Token schema
 * 
 * Represents the validation schema for create a Token object.
 * 
 * @param {string} token - The token of the user, must be a string.
 */
export const tokenSchema = z.object({
  token: z.string()
})