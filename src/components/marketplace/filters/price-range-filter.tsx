import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PriceRangeFilterProps {
  minPrice: number
  maxPrice: number
  onMinChange: (value: number) => void
  onMaxChange: (value: number) => void
}

export function PriceRangeFilter({
  minPrice,
  maxPrice,
  onMinChange,
  onMaxChange,
}: PriceRangeFilterProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-medium">Price Range (R)</h3>
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="min-price">Min Price</Label>
          <Input
            id="min-price"
            type="number"
            value={minPrice}
            onChange={(e) => onMinChange(Number(e.target.value))}
            min={0}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="max-price">Max Price</Label>
          <Input
            id="max-price"
            type="number"
            value={maxPrice}
            onChange={(e) => onMaxChange(Number(e.target.value))}
            min={minPrice}
          />
        </div>
      </div>
    </div>
  )
}