```typescript
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ListingForm } from "../listing-form"
import { Badge } from "@/components/ui/badge"
import { Info } from "lucide-react"

export function CatalogueForm() {
  const [itemCount, setItemCount] = useState(1)
  
  const pricing = {
    single: 10,
    bulk: {
      "5-10": 8,
      "11-20": 7,
      "21+": 6
    }
  }

  const calculateTotal = () => {
    if (itemCount <= 4) return itemCount * pricing.single
    if (itemCount <= 10) return itemCount * pricing.bulk["5-10"]
    if (itemCount <= 20) return itemCount * pricing.bulk["11-20"]
    return itemCount * pricing.bulk["21+"]
  }

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <div className="flex items-start gap-2 text-muted-foreground">
          <Info className="h-5 w-5 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-foreground">Bulk Listing Discounts</p>
            <ul className="mt-1 space-y-1">
              <li>1-4 items: R{pricing.single} each</li>
              <li>5-10 items: R{pricing.bulk["5-10"]} each</li>
              <li>11-20 items: R{pricing.bulk["11-20"]} each</li>
              <li>21+ items: R{pricing.bulk["21+"]} each</li>
            </ul>
          </div>
        </div>
      </Card>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="text-sm font-medium mb-2 block">
            Number of Items
          </label>
          <Input 
            type="number" 
            min={1}
            value={itemCount}
            onChange={(e) => setItemCount(parseInt(e.target.value) || 1)}
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">
            Total Cost
          </label>
          <div className="text-2xl font-bold">
            R{calculateTotal()}
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {Array.from({ length: itemCount }).map((_, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Item {index + 1}</h3>
              <Badge variant="outline">
                R{
                  itemCount <= 4 ? pricing.single :
                  itemCount <= 10 ? pricing.bulk["5-10"] :
                  itemCount <= 20 ? pricing.bulk["11-20"] :
                  pricing.bulk["21+"]
                }
              </Badge>
            </div>
            <ListingForm />
          </div>
        ))}
      </div>

      <Button className="w-full">
        Create {itemCount} Listings - R{calculateTotal()}
      </Button>
    </div>
  )
}
```