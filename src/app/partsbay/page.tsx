import { ShopHeader } from "@/components/shop/page/shop-header"
import { ShopCategories } from "@/components/shop/categories/shop-categories"
import { FeaturedListings } from "@/components/shop/listings/featured-listings"

export default function PartsBayPage() {
  return (
    <div className="container py-8">
      <ShopHeader />
      <ShopCategories />
      <FeaturedListings />
    </div>
  )
}