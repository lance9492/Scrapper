```typescript
"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { partCategories } from "./types"

interface PartsSelectorProps {
  selectedParts: string[]
  onChange: (parts: string[]) => void
}

export function PartsSelector({ selectedParts, onChange }: PartsSelectorProps) {
  const handlePartChange = (part: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedParts, part])
    } else {
      onChange(selectedParts.filter(p => p !== part))
    }
  }

  const handleCategoryChange = (category: string, checked: boolean) => {
    const categoryParts = partCategories.find(c => c.name === category)?.parts || []
    
    if (checked) {
      const newParts = [...new Set([...selectedParts, ...categoryParts])]
      onChange(newParts)
    } else {
      onChange(selectedParts.filter(part => !categoryParts.includes(part)))
    }
  }

  const isCategorySelected = (category: string) => {
    const categoryParts = partCategories.find(c => c.name === category)?.parts || []
    return categoryParts.every(part => selectedParts.includes(part))
  }

  return (
    <div className="space-y-6">
      {partCategories.map(category => (
        <div key={category.name} className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id={category.name}
              checked={isCategorySelected(category.name)}
              onCheckedChange={(checked) => handleCategoryChange(category.name, checked as boolean)}
            />
            <Label htmlFor={category.name} className="font-medium">
              {category.name}
            </Label>
          </div>
          <div className="ml-6 grid grid-cols-2 gap-2">
            {category.parts.map(part => (
              <div key={part} className="flex items-center space-x-2">
                <Checkbox
                  id={part}
                  checked={selectedParts.includes(part)}
                  onCheckedChange={(checked) => handlePartChange(part, checked as boolean)}
                />
                <Label htmlFor={part} className="text-sm">
                  {part}
                </Label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
```