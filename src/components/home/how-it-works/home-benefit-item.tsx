import { type LucideIcon } from "lucide-react"

interface HomeBenefitItemProps {
  icon: LucideIcon
  title: string
  description: string
  type: "seller" | "buyer"
}

export function HomeBenefitItem({ icon: Icon, title, description, type }: HomeBenefitItemProps) {
  return (
    <div className="flex gap-4 p-4 rounded-lg bg-muted/50">
      <div className="flex-shrink-0">
        <Icon className={`h-6 w-6 ${type === "seller" ? "text-primary" : "text-secondary"}`} />
      </div>
      <div>
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}