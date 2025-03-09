"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import PriceChart from "@/components/price-chart"
import { materials } from "@/lib/data/materials"

export function MaterialTypeCharts() {
  return (
    <div className="space-y-12">
      {materials.map((material) => (
        <div key={material.name} className="space-y-6">
          <h2 className="text-2xl font-bold">{material.name} Price Charts</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {material.types.map((type) => (
              <Card key={type.name} className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-lg font-semibold">{type.name}</h3>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                  </div>
                  <Badge variant="outline">Grade {type.grade}</Badge>
                </div>
                <div className="h-[300px]">
                  <PriceChart metal={`${material.name} - ${type.name}`} />
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}