"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { type ShopListing } from "../types"

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
  },
  {
    id: "2",
    title: "2020 Mercedes-Benz Actros - For Stripping",
    description: "Complete truck available for stripping. Engine and transmission in excellent condition.",
    price: 280000,
    location: "Durban, KZN",
    category: "strippers",
    subcategory: "Trucks",
    condition: "For Stripping",
    images: ["https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80"],
    seller: {
      name: "Truck Parts SA",
      rating: 4.9,
      verified: true
    }
  },
  {
    id: "3",
    title: "Industrial Aluminum Scrap - 2 Tons",
    description: "Clean industrial aluminum scrap, sorted and ready for processing.",
    price: 65000,
    location: "Pretoria, Gauteng",
    category: "parts",
    subcategory: "Raw Materials",
    condition: "New",
    images: ["https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80"],
    seller: {
      name: "SA Metal Group",
      rating: 4.7,
      verified: true
    }
  }
]

export function FeaturedListings() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const itemWidth = scrollContainerRef.current.offsetWidth
      scrollContainerRef.current.scrollTo({
        left: index * itemWidth,
        behavior: 'smooth'
      })
      setCurrentIndex(index)
    }
  }

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const itemWidth = scrollContainerRef.current.offsetWidth
      const newIndex = Math.round(scrollContainerRef.current.scrollLeft / itemWidth)
      setCurrentIndex(newIndex)
    }
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Featured Listings</h2>
      <div className="relative">
        {/* Navigation Buttons */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hidden md:flex"
          onClick={() => scrollToIndex(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hidden md:flex"
          onClick={() => scrollToIndex(Math.min(mockListings.length - 1, currentIndex + 1))}
          disabled={currentIndex === mockListings.length - 1}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Listings Container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {mockListings.map((listing) => (
            <div
              key={listing.id}
              className="w-full flex-none snap-center px-4"
            >
              <Card className="overflow-hidden">
                <div className="grid md:grid-cols-[400px_1fr] gap-6">
                  <div className="relative h-[300px] md:h-full">
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
                        <h3 className="text-2xl font-bold mb-2">{listing.title}</h3>
                        <p className="text-muted-foreground mb-4">{listing.description}</p>
                      </div>
                      {listing.seller.verified && (
                        <Badge variant="secondary">Verified Seller</Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-6">
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
                        <div className="capitalize">{listing.subcategory}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Condition</div>
                        <div>{listing.condition}</div>
                      </div>
                    </div>
                    <Button className="w-full">View Details</Button>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-4">
          {mockListings.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-primary w-4' 
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              onClick={() => scrollToIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}