export interface ShopCategory {
  id: string
  name: string
  description: string
  subcategories: string[]
}

export interface ShopListing {
  id: string
  title: string
  description: string
  price: number
  location: string
  category: string
  subcategory: string
  condition: string
  images: string[]
  seller: {
    name: string
    rating: number
    verified: boolean
  }
}

export interface StripperListing extends ShopListing {
  stripType: "Full Vehicle" | "Partial" | "Components"
  make: string
  model: string
  year: number
  availableParts: string[]
}