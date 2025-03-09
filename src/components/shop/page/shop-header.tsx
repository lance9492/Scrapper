import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ShopHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Equipment & Parts Shop</h1>
        <p className="text-muted-foreground">
          Buy and sell vehicles, machinery, and parts from verified traders
        </p>
      </div>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/shop/create">+ List Item</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/shop/strippers">View Strippers</Link>
        </Button>
      </div>
    </div>
  )
}