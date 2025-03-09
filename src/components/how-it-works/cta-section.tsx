import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export function CTASection() {
  return (
    <Card className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
      <p className="text-muted-foreground mb-6">
        Join South Africa's fastest-growing scrap metal marketplace today.
      </p>
      <div className="flex justify-center gap-4">
        <Button asChild size="lg">
          <Link href="/auth/register">Create Account</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/marketplace">Browse Listings</Link>
        </Button>
      </div>
    </Card>
  )
}