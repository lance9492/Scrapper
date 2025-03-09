import { HomeHero } from "@/components/home/sections/home-hero"
import { HomeFeatures } from "@/components/home/sections/home-features"
import { HomeHowItWorks } from "@/components/home/how-it-works/home-how-it-works"
import { FeaturedCarousel } from "@/components/home/featured/featured-carousel"
import { HomeMarket } from "@/components/home/sections/home-market"
import { HomeCTA } from "@/components/home/sections/home-cta"

export default function HomePage() {
  return (
    <div className="space-y-12">
      <HomeHero />
      <HomeFeatures />
      <HomeHowItWorks />
      <div className="container">
        <FeaturedCarousel />
        <HomeMarket />
      </div>
      <HomeCTA />
    </div>
  )
}