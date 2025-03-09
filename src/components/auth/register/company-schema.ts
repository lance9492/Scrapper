```ts
import * as z from "zod"

export const companySchema = z.object({
  registrationNumber: z.string().min(1, "Company registration number is required"),
  vatNumber: z.string().optional(),
})

export type CompanyFormData = z.infer<typeof companySchema>
```