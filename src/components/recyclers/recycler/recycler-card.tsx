import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"
import { RecyclerContact } from "./recycler-contact"
import { RecyclerMaterials } from "./recycler-materials"
import { type Recycler } from "@/lib/types"

interface RecyclerCardProps {
  recycler: Recycler
  isAuthenticated: boolean
}

export function RecyclerCard({ recycler, isAuthenticated }: RecyclerCardProps) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-bold">{recycler.name}</h2>
          <p className="text-muted-foreground">{recycler.description}</p>
        </div>
        {recycler.verified && (
          <Button variant="outline" size="sm">Verified</Button>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            {recycler.address}
          </div>
          <RecyclerContact recycler={recycler} isAuthenticated={isAuthenticated} />
        </div>
        <RecyclerMaterials materials={recycler.materials} />
      </div>
    </Card>
  )
}