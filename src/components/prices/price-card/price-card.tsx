import { Card } from "@/components/ui/card"
import { PriceChangeBadge } from "./price-change-badge"
import { type PriceData } from "../types"

export function PriceCard({ metal, price, change }: PriceData) {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-start mb-2">
        <div className="font-medium">{metal}</div>
        <PriceChangeBadge change={change} />
      </div>
      <div className="text-2xl font-bold">R {price}/kg</div>
    </Card>
  )
}