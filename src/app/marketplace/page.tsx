"use client"

import { useState } from "react"
import { MarketplaceHeader } from "@/components/marketplace/marketplace-header"
import { FiltersSidebar } from "@/components/marketplace/filters/filters-sidebar"
import { SearchSection } from "@/components/marketplace/search-sort/search-section"
import { ListingsGrid } from "@/components/marketplace/listings/listings-grid"
import { type FilterState, type Listing } from "@/components/marketplace/types"

const initialFilters: FilterState = {
  searchQuery: "",
  sortBy: "latest",
  selectedMetalTypes: [],
  selectedLocation: "all",
  priceRange: { min: 0, max: 0 }
}

const mockListings: Listing[] = [
  {
    title: "High-Grade Copper Wire - 500kg",
    description: "Clean copper wire scrap, stripped and sorted. Ideal for recycling.",
    price: 85000,
    location: "Cape Town, Western Cape",
    metalType: "Copper",
    weight: 500,
    bids: 8,
    imageUrl: "https://images.unsplash.com/photo-1605557202138-097824c3f8c7?auto=format&fit=crop&q=80",
    seller: {
      name: "Metro Recyclers",
      verified: true,
      rating: 4.8
    }
  }
  // Add more mock listings as needed
]

export default function MarketplacePage() {
  const [filters, setFilters] = useState<FilterState>(initialFilters)

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="container py-8">
      <MarketplaceHeader />

      <div className="grid md:grid-cols-[240px_1fr] gap-8">
        <FiltersSidebar 
          filters={filters} 
          onFilterChange={handleFilterChange} 
        />

        <div className="space-y-6">
          <SearchSection 
            filters={filters} 
            onFilterChange={handleFilterChange} 
          />
          <ListingsGrid listings={mockListings} />
        </div>
      </div>
    </div>
  )
}