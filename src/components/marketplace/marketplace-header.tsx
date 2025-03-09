import Link from "next/link"
import { Button } from "@/components/ui/button"

export function MarketplaceHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Scrap Metal Marketplace</h1>
        <p className="text-muted-foreground">Browse and bid on verified scrap metal listings</p>
      </div>
      <Button size="lg" asChild>
        <Link href="/marketplace/create">+ Post Listing (R10.00)</Link>
      </Button>
    </div>
  )
}