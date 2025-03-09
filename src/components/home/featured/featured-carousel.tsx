"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock featured items - replace with real data
const featuredItems = [
  {
    id: "1",
    title: "2018 CAT 320 Excavator",
    description: "Well-maintained excavator with 5000 hours. Full service history available.",
    price: 850000,
    location: "Johannesburg, Gauteng",
    category: "machinery",
    condition: "Used - Excellent",
    image: "https://images.unsplash.com/photo-1579001647043-de0f1405eb6f?auto=format&fit=crop&q=80",
    seller: {
      name: "Heavy Equipment SA",
      verified: true
    }
  },
  {
    id: "2",
    title: "High-Grade Copper Wire - 500kg",
    description: "Clean copper wire scrap, stripped and sorted. Ideal for recycling.",
    price: 85000,
    location: "Cape Town, Western Cape",
    category: "marketplace",
    condition: "Grade A+",
    image: "https://images.unsplash.com/photo-1605557202138-097824c3f8c7?auto=format&fit=crop&q=80",
    seller: {
      name: "Metro Recyclers",
      verified: true
    }
  },
  {
    id: "3",
    title: "2020 Mercedes-Benz Actros - For Stripping",
    description: "Complete truck available for stripping. Engine and transmission in excellent condition.",
    price: 280000,
    location: "Durban, KZN",
    category: "strippers",
    condition: "For Stripping",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80",
    seller: {
      name: "Truck Parts SA",
      verified: true
    }
  },
  {
    id: "4",
    title: "Industrial Aluminum Scrap - 2 Tons",
    description: "Clean industrial aluminum scrap, sorted and ready for processing.",
    price: 65000,
    location: "Pretoria, Gauteng",
    category: "marketplace",
    condition: "Grade A",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80",
    seller: {
      name: "SA Metal Group",
      verified: true
    }
  }
]

export function FeaturedCarousel() {
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
    <div className="relative mb-12">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="text-3xl font-bold mb-4">Featured Listings</h2>
        <p className="text-muted-foreground">
          Discover our top picks from across all categories
        </p>
      </div>

      {/* Carousel Container */}
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
          onClick={() => scrollToIndex(Math.min(featuredItems.length - 1, currentIndex + 1))}
          disabled={currentIndex === featuredItems.length - 1}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Items Container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {featuredItems.map((item) => (
            <div
              key={item.id}
              className="w-full flex-none snap-center px-4"
            >
              <Card className="overflow-hidden">
                <div className="grid md:grid-cols-[400px_1fr] gap-6">
                  <div className="relative h-[300px] md:h-full">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground mb-4">{item.description}</p>
                      </div>
                      {item.seller.verified && (
                        <Badge variant="secondary">Verified Seller</Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <div className="text-sm text-muted-foreground">Price</div>
                        <div className="font-bold">R {item.price.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Location</div>
                        <div>{item.location}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Category</div>
                        <div className="capitalize">{item.category}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Condition</div>
                        <div>{item.condition}</div>
                      </div>
                    </div>
                    <Button asChild className="w-full">
                      <Link href={`/${item.category}/${item.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-4">
          {featuredItems.map((_, index) => (
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