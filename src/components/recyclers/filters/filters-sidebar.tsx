import { SearchFilter } from "./search-filter"
import { ProvinceFilter } from "./province-filter"

interface FiltersSidebarProps {
  searchQuery: string
  province: string
  onSearchChange: (value: string) => void
  onProvinceChange: (value: string) => void
}

export function FiltersSidebar({
  searchQuery,
  province,
  onSearchChange,
  onProvinceChange
}: FiltersSidebarProps) {
  return (
    <div className="space-y-4">
      <SearchFilter value={searchQuery} onChange={onSearchChange} />
      <ProvinceFilter value={province} onChange={onProvinceChange} />
    </div>
  )
}