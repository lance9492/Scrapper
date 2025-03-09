import { ListingCard } from "./listing-card"
import { type Listing } from "../types"

interface ListingsGridProps {
  listings: Listing[]
}

export function ListingsGrid({ listings }: ListingsGridProps) {
  return (
    <div className="grid gap-4">
      {listings.map((listing, index) => (
        <ListingCard key={index} {...listing} />
      ))}
    </div>
  )
}