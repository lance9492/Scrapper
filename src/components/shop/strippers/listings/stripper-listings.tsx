"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { type StripperListing } from "../../types"

const mockListings: StripperListing[] = [
  {
    id: "1",
    title: "2015 Toyota Hilux - Complete Vehicle for Stripping",
    description: "Complete vehicle available for stripping. Engine and transmission in good condition.",
    price: 45000,
    location: "Cape Town, Western Cape",
    category: "strippers",
    subcategory: "Vehicle Strippers",
    condition: "For Stripping",
    images: ["https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&q=80"],
    seller: {
      name: "Auto Strippers CT",
      rating: 4.9,
      verified: true
    },
    stripType: "Full Vehicle",
    make: "Toyota",
    model: "Hilux",
    year: 2015,
    availableParts: [
      "Engine",
      "Transmission",
      "Body Panels",
      "Interior",
      "Suspension"
    ]
  }
]

export function StripperListings() {
  return (
    <div className="space-y-6">
      {mockListings.map((listing) => (
        <Card key={listing.id} className="overflow-hidden">
          <div className="grid md:grid-cols-[300px_1fr] gap-6">
            <div className="relative h-[200px] md:h-full">
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
                  <p className="text-muted-foreground mb-4">{listing.description}</p>
                </div>
                <Badge variant="secondary">{listing.stripType}</Badge>
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
                  <div className="text-sm text-muted-foreground">Vehicle</div>
                  <div>{listing.year} {listing.make} {listing.model}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Available Parts</div>
                  <div className="flex flex-wrap gap-1">
                    {listing.availableParts.slice(0, 3).map((part) => (
                      <Badge key={part} variant="outline">{part}</Badge>
                    ))}
                    {listing.availableParts.length > 3 && (
                      <Badge variant="outline">+{listing.availableParts.length - 3} more</Badge>
                    )}
                  </div>
                </div>
              </div>
              <Button className="w-full">Contact Seller</Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}