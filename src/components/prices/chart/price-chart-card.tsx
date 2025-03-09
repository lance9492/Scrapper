import { Card } from "@/components/ui/card"
import { ChartHeader } from "./chart-header"
import PriceChart from "@/components/price-chart"
import { type ChartData } from "../types"

export function PriceChartCard({ metal }: ChartData) {
  return (
    <Card className="p-6">
      <ChartHeader metal={metal} />
      <div className="h-[300px]">
        <PriceChart metal={metal} />
      </div>
    </Card>
  )
}