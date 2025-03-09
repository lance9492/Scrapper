import * as z from "zod"

export const companySchema = z.object({
  registrationNumber: z.string()
    .min(1, "Company registration number is required")
    .regex(/^[0-9]{10}$/, "Invalid company registration number"),
  vatNumber: z.string()
    .regex(/^4[0-9]{9}$/, "Invalid VAT number")
    .optional(),
})

export type CompanyFormData = z.infer<typeof companySchema>