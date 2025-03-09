import { MarketSections } from "@/components/home/market-sections"

const topBuyers = [
  { name: "Metro Recyclers", volume: "250,000 kg", rating: 4.9 },
  { name: "Cape Scrap Solutions", volume: "180,000 kg", rating: 4.8 },
  { name: "Durban Metal Exchange", volume: "165,000 kg", rating: 4.7 }
]

export function HomeMarket() {
  return (
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl font-bold mb-4">Market Insights</h2>
        <p className="text-muted-foreground">
          Stay informed with real-time market sentiment and top performers
        </p>
      </div>
      <MarketSections topBuyers={topBuyers} />
    </div>
  )
}