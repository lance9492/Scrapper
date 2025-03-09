import { BenefitItem } from "./benefit-item"
import { type Benefit } from "./types"

interface BenefitsSectionProps {
  title: string
  benefits: Benefit[]
}

export function BenefitsSection({ title, benefits }: BenefitsSectionProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid gap-6">
        {benefits.map((benefit) => (
          <BenefitItem
            key={benefit.title}
            icon={benefit.icon}
            title={benefit.title}
            description={benefit.description}
          />
        ))}
      </div>
    </div>
  )
}