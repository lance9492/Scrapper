import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { materials } from "@/lib/data/materials"

interface MetalTypeFilterProps {
  selectedTypes: string[]
  onChange: (types: string[]) => void
}

// Extract all material types from the materials data
const metalTypes = materials.reduce((acc, material) => {
  // Add main category
  acc.push({
    category: material.name,
    types: material.types.map(type => type.name)
  })
  return acc
}, [] as { category: string; types: string[] }[])

export function MetalTypeFilter({ selectedTypes, onChange }: MetalTypeFilterProps) {
  const handleChange = (type: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedTypes, type])
    } else {
      onChange(selectedTypes.filter(t => t !== type))
    }
  }

  const handleCategoryChange = (category: string, checked: boolean) => {
    const categoryTypes = metalTypes.find(m => m.category === category)?.types || []
    if (checked) {
      // Add all types from the category that aren't already selected
      const newTypes = [...new Set([...selectedTypes, ...categoryTypes])]
      onChange(newTypes)
    } else {
      // Remove all types from this category
      onChange(selectedTypes.filter(type => !categoryTypes.includes(type)))
    }
  }

  const isCategorySelected = (category: string) => {
    const categoryTypes = metalTypes.find(m => m.category === category)?.types || []
    return categoryTypes.every(type => selectedTypes.includes(type))
  }

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Metal Type</h3>
      <div className="space-y-6">
        {metalTypes.map(({ category, types }) => (
          <div key={category} className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={isCategorySelected(category)}
                onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
              />
              <Label htmlFor={category} className="font-medium">{category}</Label>
            </div>
            <div className="ml-6 space-y-2">
              {types.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={type}
                    checked={selectedTypes.includes(type)}
                    onCheckedChange={(checked) => handleChange(type, checked as boolean)}
                  />
                  <Label htmlFor={type} className="text-sm">{type}</Label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}