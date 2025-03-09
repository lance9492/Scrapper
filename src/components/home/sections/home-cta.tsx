import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HomeCTA() {
  return (
    <div className="container">
      <div className="bg-primary text-primary-foreground rounded-lg p-8 mt-12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Trading?</h2>
          <p className="mb-6 text-primary-foreground/90">
            Join South Africa's fastest-growing recycling marketplace today.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/auth/register">
              Create Free Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}