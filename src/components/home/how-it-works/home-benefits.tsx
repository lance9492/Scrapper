import { Card } from "@/components/ui/card"
import { HomeBenefitItem } from "./home-benefit-item"
import { sellerBenefits, buyerBenefits } from "@/lib/data/how-it-works"

export function HomeBenefits() {
  return (
    <div className="grid md:grid-cols-2 gap-8 mt-20">
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-6">Benefits for Sellers</h3>
        <div className="space-y-4">
          {sellerBenefits.map((benefit) => (
            <HomeBenefitItem
              key={benefit.title}
              {...benefit}
              type="seller"
            />
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-bold mb-6">Benefits for Buyers</h3>
        <div className="space-y-4">
          {buyerBenefits.map((benefit) => (
            <HomeBenefitItem
              key={benefit.title}
              {...benefit}
              type="buyer"
            />
          ))}
        </div>
      </Card>
    </div>
  )
}