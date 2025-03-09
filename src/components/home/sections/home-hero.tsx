import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HomeHero() {
  return (
    <div className="w-full bg-muted/50 py-12 mb-8">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">
            South Africa's Premier Recycling Marketplace
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Connect with verified buyers and sellers. Trade metals, plastics, and used oils at competitive prices.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/auth/register">Start Trading</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/prices">
                View Live Prices
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}