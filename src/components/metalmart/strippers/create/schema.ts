import * as z from "zod"

export const stripperFormSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  price: z.number().min(1, "Price must be greater than 0"),
  location: z.string().min(1, "Location is required"),
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z.number()
    .min(1950, "Year must be 1950 or later")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
  stripType: z.enum(["Full Vehicle", "Partial", "Components"]),
  condition: z.string().min(1, "Condition is required")
})

export type StripperFormData = z.infer<typeof stripperFormSchema>