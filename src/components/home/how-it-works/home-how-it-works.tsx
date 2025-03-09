import { HomeProcessStep } from "./home-process-step"
import { HomeBenefits } from "./home-benefits"
import { processSteps } from "@/lib/data/how-it-works"

export function HomeHowItWorks() {
  return (
    <div>
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl font-bold mb-4">How Scrapper Works</h2>
        <p className="text-muted-foreground">
          Get started with South Africa's premier scrap metal marketplace in four simple steps
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {processSteps.map((step) => (
          <HomeProcessStep
            key={step.number}
            number={step.number}
            title={step.title}
            description={step.description}
          />
        ))}
      </div>

      <HomeBenefits />
    </div>
  )
}