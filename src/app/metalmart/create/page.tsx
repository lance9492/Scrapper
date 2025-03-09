import { Card } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { CreateEquipmentForm } from "@/components/metalmart/create/create-equipment-form"

export default function CreateEquipmentPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "MetalMart", href: "/metalmart" },
    { label: "Create Listing", href: "/metalmart/create" }
  ]

  return (
    <div className="container max-w-2xl py-8">
      <Breadcrumbs items={breadcrumbs} className="mb-6" />
      <Card className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">List Equipment or Parts</h1>
          <p className="text-muted-foreground">
            Create a listing for your vehicle, machinery, or parts
          </p>
        </div>
        <CreateEquipmentForm />
      </Card>
    </div>
  )
}