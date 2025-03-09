import { Badge } from "@/components/ui/badge"

interface ChartHeaderProps {
  metal: string
}

export function ChartHeader({ metal }: ChartHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h3 className="text-xl font-semibold">{metal} Price History</h3>
        <p className="text-sm text-muted-foreground">Last 30 days</p>
      </div>
      <Badge variant="outline">Per Kilogram</Badge>
    </div>
  )
}