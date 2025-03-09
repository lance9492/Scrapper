"use client"

import { Card } from "@/components/ui/card"
import { Award, Users } from "lucide-react"
import { type TopBuyer } from "./types"
import { MarketPoll } from "./poll/market-poll"

interface MarketSectionsProps {
  topBuyers: TopBuyer[]
}

export function MarketSections({ topBuyers }: MarketSectionsProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8 mb-12">
      <MarketPoll />

      {/* Top Buyers Card */}
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Top Buyers</h2>
            <p className="text-muted-foreground">This month's most active traders</p>
          </div>
          <Award className="h-6 w-6 text-primary" />
        </div>
        <div className="space-y-4">
          {topBuyers.map((buyer, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 rounded-full p-2">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium">{buyer.name}</div>
                  <div className="text-sm text-muted-foreground">Volume: {buyer.volume}</div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm font-medium text-primary">
                <span>★</span>
                {buyer.rating}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}