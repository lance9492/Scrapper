import { PricesHeader } from "@/components/prices/page/prices-header"
import { PriceCardsGrid } from "@/components/prices/price-card/price-cards-grid"
import { MaterialTypeCharts } from "@/components/prices/chart/material-type-charts"

export default function PricesPage() {
  return (
    <div className="container py-8">
      <PricesHeader />
      <PriceCardsGrid />
      <MaterialTypeCharts />
    </div>
  )
}