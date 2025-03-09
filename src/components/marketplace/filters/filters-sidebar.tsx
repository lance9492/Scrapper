import { Card } from "@/components/ui/card"
import { MetalTypeFilter } from "./metal-type-filter"
import { LocationFilter } from "./location-filter"
import { PriceRangeFilter } from "./price-range-filter"
import { type FilterState } from "../types"

interface FiltersSidebarProps {
  filters: FilterState
  onFilterChange: (key: keyof FilterState, value: any) => void
}

export function FiltersSidebar({ filters, onFilterChange }: FiltersSidebarProps) {
  return (
    <Card className="p-4 h-fit space-y-6">
      <MetalTypeFilter
        selectedTypes={filters.selectedMetalTypes}
        onChange={(types) => onFilterChange('selectedMetalTypes', types)}
      />
      <LocationFilter
        value={filters.selectedLocation}
        onChange={(location) => onFilterChange('selectedLocation', location)}
      />
      <PriceRangeFilter
        minPrice={filters.priceRange.min}
        maxPrice={filters.priceRange.max}
        onMinChange={(min) => onFilterChange('priceRange', { ...filters.priceRange, min })}
        onMaxChange={(max) => onFilterChange('priceRange', { ...filters.priceRange, max })}
      />
    </Card>
  )
}