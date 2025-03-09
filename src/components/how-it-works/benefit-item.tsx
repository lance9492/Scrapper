import { LucideIcon } from "lucide-react"

interface BenefitItemProps {
  icon: LucideIcon
  title: string
  description: string
}

export function BenefitItem({ icon: Icon, title, description }: BenefitItemProps) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div>
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}