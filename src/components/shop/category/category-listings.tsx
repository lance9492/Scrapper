"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { type ShopCategory, type ShopListing } from "../types"

interface CategoryListingsProps {
  category: ShopCategory
}

// Mock listings - replace with real data
const mockListings: ShopListing[] = [
  {
    id: "1",
    title: "2018 CAT 320 Excavator",
    description: "Well-maintained excavator with 5000 hours. Full service history available.",
    price: 850000,
    location: "Johannesburg, Gauteng",
    category: "machinery",
    subcategory: "Construction",
    condition: "Used - Excellent",
    images: ["https://images.unsplash.com/photo-1579001647043-de0f1405eb6f?auto=format&fit=crop&q=80"],
    seller: {
      name: "Heavy Equipment SA",
      rating: 4.8,
      verified: true
    }
  }
]

export function CategoryListings({ category }: CategoryListingsProps) {
  const listings = mockListings.filter(listing => listing.category === category.id)

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {listings.map((listing) => (
        <Card key={listing.id} className="overflow-hidden">
          <div className="relative h-48">
            <Image
              src={listing.images[0]}
              alt={listing.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold mb-2">{listing.title}</h3>
                <p className="text-muted-foreground">{listing.description}</p>
              </div>
              {listing.seller.verified && (
                <Badge>Verified Seller</Badge>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm text-muted-foreground">Price</div>
                <div className="font-bold">R {listing.price.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Location</div>
                <div>{listing.location}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Category</div>
                <div>{listing.subcategory}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Condition</div>
                <div>{listing.condition}</div>
              </div>
            </div>
            <Button className="w-full">View Details</Button>
          </div>
        </Card>
      ))}
    </div>
  )
}