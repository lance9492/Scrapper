import { PriceCard } from "./price-card"
import { type PriceData } from "../types"
import { materials } from "@/lib/data/materials"

// Extract current prices from materials data
const priceData: PriceData[] = materials.map(material => {
  const highestGradeType = material.types.reduce((prev, current) => {
    const prevPrice = parseFloat(prev.price.split(" - ")[1])
    const currentPrice = parseFloat(current.price.split(" - ")[1])
    return currentPrice > prevPrice ? current : prev
  }, material.types[0])

  return {
    metal: material.name,
    price: parseFloat(highestGradeType.price.split(" - ")[1]),
    change: Math.random() * 4 - 2 // Simulated price change between -2% and +2%
  }
})

export function PriceCardsGrid() {
  return (
    <div className="grid md:grid-cols-4 gap-4 mb-8">
      {priceData.map((data) => (
        <PriceCard key={data.metal} {...data} />
      ))}
    </div>
  )
}