import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { type Listing } from "../types"

interface ListingCardProps extends Listing {}

export function ListingCard({
  title,
  description,
  price,
  location,
  metalType,
  weight,
  bids,
  imageUrl,
  seller,
}: ListingCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="grid md:grid-cols-[300px_1fr] gap-6">
        <div className="relative h-[200px] md:h-full">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold mb-2">{title}</h3>
              <p className="text-muted-foreground mb-4">{description}</p>
            </div>
            {seller.verified && (
              <Badge variant="secondary">Verified Seller</Badge>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-sm text-muted-foreground">Price per kg</div>
              <div className="font-bold">R {price}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Total Weight</div>
              <div className="font-bold">{weight} kg</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Metal Type</div>
              <div>{metalType}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Location</div>
              <div>{location}</div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              {bids} active bids
            </div>
            <Button>Place Bid</Button>
          </div>
        </div>
      </div>
    </Card>
  )
}