"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { RecyclersHeader } from "@/components/recyclers/page/recyclers-header"
import { FiltersSidebar } from "@/components/recyclers/filters/filters-sidebar"
import { RecyclersList } from "@/components/recyclers/recycler/recyclers-list"
import { RecyclersMap } from "@/components/maps/recyclers-map"
import { recyclers } from "@/lib/data/recyclers"

export default function RecyclersPage() {
  const [province, setProvince] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isAuthenticated] = useState(false) // This would come from your auth state

  return (
    <div className="container py-8">
      <RecyclersHeader isAuthenticated={isAuthenticated} />

      <Card className="mb-8 p-4">
        <h2 className="text-xl font-semibold mb-4">Recycler Locations</h2>
        <RecyclersMap />
      </Card>

      <div className="grid md:grid-cols-[200px_1fr] gap-8">
        <FiltersSidebar
          searchQuery={searchQuery}
          province={province}
          onSearchChange={setSearchQuery}
          onProvinceChange={setProvince}
        />
        <RecyclersList
          recyclers={recyclers}
          isAuthenticated={isAuthenticated}
        />
      </div>
    </div>
  )
}