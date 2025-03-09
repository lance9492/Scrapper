import { StrippersHeader } from "@/components/shop/strippers/page/strippers-header"
import { StripperListings } from "@/components/shop/strippers/listings/stripper-listings"
import { StrippersFilters } from "@/components/shop/strippers/filters/strippers-filters"

export default function StrippersPage() {
  return (
    <div className="container py-8">
      <StrippersHeader />
      <div className="grid md:grid-cols-[240px_1fr] gap-8">
        <StrippersFilters />
        <StripperListings />
      </div>
    </div>
  )
}