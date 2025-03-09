import { MaterialTypeItem } from "./material-type-item"
import { type MaterialType } from "@/lib/types"

interface MaterialTypesListProps {
  types: MaterialType[]
  materialName: string
}

export function MaterialTypesList({ types, materialName }: MaterialTypesListProps) {
  return (
    <div className="space-y-4">
      {types.map((type) => (
        <MaterialTypeItem 
          key={type.name} 
          type={type} 
          materialName={materialName}
        />
      ))}
    </div>
  )
}