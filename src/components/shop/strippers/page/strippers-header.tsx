import { Button } from "@/components/ui/button"
import Link from "next/link"

export function StrippersHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Vehicle & Machinery Strippers</h1>
        <p className="text-muted-foreground">
          Find vehicles and machinery available for stripping, or list your own
        </p>
      </div>
      <Button asChild>
        <Link href="/shop/strippers/create">+ List for Stripping</Link>
      </Button>
    </div>
  )
}