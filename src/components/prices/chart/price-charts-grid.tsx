import { PriceChartCard } from "./price-chart-card"
import { materials } from "@/lib/data/materials"

export function PriceChartsGrid() {
  return (
    <div className="grid gap-8">
      {materials.map((material) => (
        <PriceChartCard 
          key={material.name} 
          metal={material.name} 
          period="30d" 
        />
      ))}
    </div>
  )
}