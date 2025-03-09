import { Card } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { StripperListingForm } from "@/components/metalmart/strippers/create/stripper-listing-form"

export default function CreateStripperListingPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "MetalMart", href: "/metalmart" },
    { label: "Strippers", href: "/metalmart/strippers" },
    { label: "Create Listing", href: "/metalmart/strippers/create" }
  ]

  return (
    <div className="container max-w-2xl py-8">
      <Breadcrumbs items={breadcrumbs} className="mb-6" />
      <Card className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">List for Stripping</h1>
          <p className="text-muted-foreground">
            Create a listing for your vehicle or machinery that's available for stripping
          </p>
        </div>
        <StripperListingForm />
      </Card>
    </div>
  )
}