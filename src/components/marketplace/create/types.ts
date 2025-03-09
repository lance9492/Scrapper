import * as z from "zod"

export const listingSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  metalType: z.string(),
  weight: z.number().min(1, "Weight must be at least 1kg"),
  price: z.number().min(1, "Price must be greater than 0"),
  location: z.string(),
  duration: z.number(),
  images: z.array(z.string()).min(1, "At least one image is required")
})

export type ListingFormData = z.infer<typeof listingSchema>

export interface PaymentFormData {
  url: string
  fields: Record<string, string>
}