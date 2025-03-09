import { RecyclerCard } from "./recycler-card"
import { type Recycler } from "@/lib/types"

interface RecyclersListProps {
  recyclers: Recycler[]
  isAuthenticated: boolean
}

export function RecyclersList({ recyclers, isAuthenticated }: RecyclersListProps) {
  return (
    <div className="space-y-6">
      {recyclers.map((recycler) => (
        <RecyclerCard
          key={recycler.id}
          recycler={recycler}
          isAuthenticated={isAuthenticated}
        />
      ))}
    </div>
  )
}