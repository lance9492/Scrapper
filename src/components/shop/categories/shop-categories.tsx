"use client"

import { Card } from "@/components/ui/card"
import { shopCategories } from "@/lib/data/shop-categories"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function ShopCategories() {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Categories</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {shopCategories.map((category) => (
          <Link key={category.id} href={`/shop/${category.id}`}>
            <Card className="p-6 hover:bg-accent transition-colors h-full">
              <h3 className="font-semibold mb-2 flex items-center justify-between">
                {category.name}
                <ArrowRight className="h-4 w-4" />
              </h3>
              <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
              <div className="text-sm text-primary">
                {category.subcategories.join(", ")}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}