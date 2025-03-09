export interface Seller {
  name: string
  verified: boolean
  rating: number
}

export interface Listing {
  title: string
  description: string
  price: number
  location: string
  metalType: string
  weight: number
  bids: number
  imageUrl: string
  seller: Seller
}

export interface FilterState {
  searchQuery: string
  sortBy: string
  selectedMetalTypes: string[]
  selectedLocation: string
  priceRange: {
    min: number
    max: number
  }
}