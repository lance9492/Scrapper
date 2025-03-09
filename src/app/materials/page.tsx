"use client"

import { materials } from "@/lib/data/materials"
import { MaterialsHeader } from "@/components/materials/page/materials-header"
import { MaterialsGrid } from "@/components/materials/page/materials-grid"

export default function MaterialsPage() {
  return (
    <div className="container py-8">
      <MaterialsHeader />
      <MaterialsGrid materials={materials} />
    </div>
  )
}