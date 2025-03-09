interface RecyclerMaterialsProps {
  materials: string[]
}

export function RecyclerMaterials({ materials }: RecyclerMaterialsProps) {
  return (
    <div>
      <div className="text-sm font-medium mb-2">Accepted Materials:</div>
      <div className="flex flex-wrap gap-2">
        {materials.map((material) => (
          <div key={material} className="bg-muted px-2 py-1 rounded text-sm">
            {material}
          </div>
        ))}
      </div>
    </div>
  )
}