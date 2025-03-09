"use client"

import { Card } from "@/components/ui/card"

const features = [
  {
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80",
    title: "Secure Trading",
    description: "All traders are verified and transactions are protected through our secure platform.",
    gradient: "from-blue-500/20 to-blue-600/20"
  },
  {
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80",
    title: "Large Network",
    description: "Connect with thousands of verified buyers and sellers across South Africa.",
    gradient: "from-emerald-500/20 to-emerald-600/20"
  },
  {
    image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80",
    title: "Best Prices",
    description: "Get competitive prices through our real-time market data and bidding system.",
    gradient: "from-purple-500/20 to-purple-600/20"
  },
  {
    image: "https://images.unsplash.com/photo-1634733988138-bf2c3a2a13fa?auto=format&fit=crop&q=80",
    title: "Fast Transactions",
    description: "Quick and efficient trading process with our streamlined platform.",
    gradient: "from-amber-500/20 to-amber-600/20"
  }
]

export function WhyChooseUs() {
  return (
    <div>
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-6">Why Choose Scrapper?</h2>
          <p className="text-lg text-muted-foreground">
            Join South Africa's most trusted recycling marketplace and experience the benefits of our secure trading platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <Card 
              key={feature.title} 
              className="group overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                  style={{ backgroundImage: `url(${feature.image})` }}
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-95 group-hover:opacity-98 transition-opacity`} />
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-white/90 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}