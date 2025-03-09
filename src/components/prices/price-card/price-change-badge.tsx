import { Badge } from "@/components/ui/badge"
import { ArrowUp, ArrowDown } from "lucide-react"

interface PriceChangeBadgeProps {
  change: number
}

export function PriceChangeBadge({ change }: PriceChangeBadgeProps) {
  return (
    <Badge variant={change > 0 ? "default" : "destructive"}>
      {change > 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
      {Math.abs(change)}%
    </Badge>
  )
}