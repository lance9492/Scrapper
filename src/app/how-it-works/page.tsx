import { ProcessStep } from "@/components/how-it-works/process-step"
import { BenefitsSection } from "@/components/how-it-works/benefits-section"
import { CTASection } from "@/components/how-it-works/cta-section"
import { processSteps, sellerBenefits, buyerBenefits } from "@/lib/data/how-it-works"

export default function HowItWorksPage() {
  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">How Scrapper.co.za Works</h1>
        <p className="text-xl text-muted-foreground">
          Your trusted platform for buying and selling scrap metal in South Africa
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-16">
        {processSteps.map((step) => (
          <ProcessStep key={step.number} {...step} />
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-12">
        <BenefitsSection title="Benefits for Sellers" benefits={sellerBenefits} />
        <BenefitsSection title="Benefits for Buyers" benefits={buyerBenefits} />
      </div>

      <CTASection />
    </div>
  )
}