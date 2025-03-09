import { MaterialCard } from "@/components/materials/material-card"
import { type Material } from "@/lib/types"

interface MaterialsGridProps {
  materials: Material[]
}

export function MaterialsGrid({ materials }: MaterialsGridProps) {
  return (
    <div className="grid gap-8">
      {materials.map((material) => (
        <MaterialCard key={material.name} {...material} />
      ))}
    </div>
  )
}