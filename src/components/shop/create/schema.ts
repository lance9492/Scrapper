import * as z from "zod"

export const listingSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  price: z.number().min(1, "Price must be greater than 0"),
  category: z.string().min(1, "Please select a category"),
  subcategory: z.string().min(1, "Please select a subcategory"),
  condition: z.string().min(1, "Please select a condition"),
  location: z.string().min(1, "Location is required"),
  make: z.string().optional(),
  model: z.string().optional(),
  year: z.number().optional(),
  images: z.array(z.string()).min(1, "At least one image is required"),
  video: z.string().optional(),
  availableParts: z.array(z.string()).optional(),
  stripType: z.enum(["Full Vehicle", "Partial", "Components", "Other - Salvage"]).optional()
})

export type ListingFormData = z.infer<typeof listingSchema>