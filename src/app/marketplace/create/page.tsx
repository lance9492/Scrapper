import { Card } from "@/components/ui/card"
import { CreateListingForm } from "@/components/marketplace/create/listing-form"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"

export default function CreateListingPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Marketplace", href: "/marketplace" },
    { label: "Create Listing", href: "/marketplace/create" }
  ]

  return (
    <div className="container max-w-2xl py-8">
      <Breadcrumbs items={breadcrumbs} className="mb-6" />
      <Card className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create Listing</h1>
          <p className="text-muted-foreground">
            List your scrap metal for sale. A fee of R10.00 applies per listing.
          </p>
        </div>
        <CreateListingForm />
      </Card>
    </div>
  )
}