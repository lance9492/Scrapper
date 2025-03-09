// Custom error classes
export class AuthenticationError extends Error {
  constructor(message = "Authentication failed") {
    super(message)
    this.name = "AuthenticationError"
  }
}

export class ValidationError extends Error {
  errors: { field: string; message: string }[]
  
  constructor(errors: { field: string; message: string }[]) {
    super("Validation failed")
    this.name = "ValidationError"
    this.errors = errors
  }
}

export class ApiError extends Error {
  status: number
  
  constructor(message: string, status = 500) {
    super(message)
    this.name = "ApiError"
    this.status = status
  }
}

// Error handler for API routes
export async function apiErrorHandler(error: unknown) {
  if (error instanceof ValidationError) {
    return new Response(JSON.stringify({
      success: false,
      errors: error.errors
    }), { status: 400 })
  }

  if (error instanceof AuthenticationError) {
    return new Response(JSON.stringify({
      success: false,
      message: error.message
    }), { status: 401 })
  }

  if (error instanceof ApiError) {
    return new Response(JSON.stringify({
      success: false,
      message: error.message
    }), { status: error.status })
  }

  console.error("Unhandled error:", error)
  return new Response(JSON.stringify({
    success: false,
    message: "An unexpected error occurred"
  }), { status: 500 })
}