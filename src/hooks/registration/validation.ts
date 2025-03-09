import * as z from "zod"

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export const companySchema = z.object({
  registrationNumber: z.string()
    .min(1, "Company registration number is required")
    .regex(/^[0-9]{10}$/, "Invalid company registration number"),
  vatNumber: z.string()
    .regex(/^4[0-9]{9}$/, "Invalid VAT number")
    .optional(),
})