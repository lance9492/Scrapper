import { Button } from "@/components/ui/button"
import Link from "next/link"
import { type ShopCategory } from "../types"

interface CategoryHeaderProps {
  category: ShopCategory
}

export function CategoryHeader({ category }: CategoryHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
        <p className="text-muted-foreground">{category.description}</p>
      </div>
      <Button asChild>
        <Link href={`/metalmart/create?category=${category.id}`}>
          + List Item
        </Link>
      </Button>
    </div>
  )
}