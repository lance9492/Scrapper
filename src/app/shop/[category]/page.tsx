import { notFound } from "next/navigation"
import { shopCategories } from "@/lib/data/shop-categories"
import { CategoryHeader } from "@/components/shop/category/category-header"
import { CategoryListings } from "@/components/shop/category/category-listings"

interface CategoryPageProps {
  params: {
    category: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = shopCategories.find(c => c.id === params.category)
  
  if (!category) {
    notFound()
  }

  return (
    <div className="container py-8">
      <CategoryHeader category={category} />
      <CategoryListings category={category} />
    </div>
  )
}

// Generate static params for all categories
export function generateStaticParams() {
  return shopCategories.map((category) => ({
    category: category.id,
  }))
}