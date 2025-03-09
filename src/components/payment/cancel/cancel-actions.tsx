import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CancelActions() {
  return (
    <div className="space-y-2">
      <Button asChild variant="outline" className="w-full">
        <Link href="/marketplace/create">Try Again</Link>
      </Button>
      <Button asChild className="w-full">
        <Link href="/marketplace">Return to Marketplace</Link>
      </Button>
    </div>
  )
}