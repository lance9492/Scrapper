import Link from "next/link"
import { Button } from "@/components/ui/button"

export function SuccessActions() {
  return (
    <Button asChild className="w-full">
      <Link href="/marketplace">View Marketplace</Link>
    </Button>
  )
}