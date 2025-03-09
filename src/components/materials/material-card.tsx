"use client"

import { Card } from "@/components/ui/card"
import { MaterialImage } from "./material-image"
import { MaterialInfo } from "./material-info"
import { MaterialTypesList } from "./material-types-list"
import { type Material } from "@/lib/types"

interface MaterialCardProps extends Material {}

export function MaterialCard({ name, description, image, types }: MaterialCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="grid md:grid-cols-[300px_1fr] gap-6">
        <MaterialImage image={image} name={name} />
        <div className="p-6">
          <MaterialInfo name={name} description={description} />
          <MaterialTypesList types={types} materialName={name} />
        </div>
      </div>
    </Card>
  )
}