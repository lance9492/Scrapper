import { SearchBar } from "./search-bar"
import { SortSelect } from "./sort-select"
import { type FilterState } from "../types"

interface SearchSectionProps {
  filters: FilterState
  onFilterChange: (key: keyof FilterState, value: any) => void
}

export function SearchSection({ filters, onFilterChange }: SearchSectionProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <SearchBar 
        value={filters.searchQuery} 
        onChange={(query) => onFilterChange('searchQuery', query)} 
      />
      <SortSelect 
        value={filters.sortBy} 
        onChange={(sort) => onFilterChange('sortBy', sort)} 
      />
    </div>
  )
}