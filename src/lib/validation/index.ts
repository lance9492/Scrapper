import { z } from "zod"

// Common validation patterns
export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const phonePattern = /^(\+27|0)[1-9][0-9]{8}$/
export const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/

// Common validation schemas
export const emailSchema = z.string()
  .min(1, "Email is required")
  .email("Invalid email address")

export const passwordSchema = z.string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")

export const phoneSchema = z.string()
  .regex(phonePattern, "Invalid South African phone number")

// Validation error handler
export function handleValidationError(error: unknown) {
  if (error instanceof z.ZodError) {
    return error.errors.map(err => ({
      field: err.path.join('.'),
      message: err.message
    }))
  }
  return [{ field: 'unknown', message: 'An unexpected error occurred' }]
}