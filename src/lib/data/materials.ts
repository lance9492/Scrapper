import { type Material } from "@/lib/types"

export const materials: Material[] = [
  {
    name: "Copper",
    description: "High-value non-ferrous metal widely used in electrical and construction industries.",
    image: "https://images.unsplash.com/photo-1605557202138-097824c3f8c7?auto=format&fit=crop&q=80&w=800",
    types: [
      {
        name: "Bright Copper (Millberry)",
        description: "Clean, bare copper wire - no coating/insulation",
        price: "95 - 100",
        grade: "A+"
      },
      {
        name: "Heavy Copper (Berry)",
        description: "Clean copper pipes, sheets, bus bars",
        price: "90 - 95",
        grade: "A"
      },
      {
        name: "Light Copper",
        description: "Thin-walled copper tubes, lightweight scrap",
        price: "85 - 90",
        grade: "B"
      },
      {
        name: "Insulated Copper Wire (ICW)",
        description: "Copper cables with insulation",
        price: "35 - 45",
        grade: "C"
      }
    ]
  },
  {
    name: "Aluminum",
    description: "Lightweight, corrosion-resistant metal used in various industries.",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800",
    types: [
      {
        name: "Clean Aluminum",
        description: "Pure aluminum sheets and profiles",
        price: "25 - 30",
        grade: "A"
      },
      {
        name: "Cast Aluminum",
        description: "Engine blocks, wheels, machinery parts",
        price: "20 - 25",
        grade: "B"
      },
      {
        name: "Aluminum Cans",
        description: "Beverage cans and food containers",
        price: "15 - 20",
        grade: "C"
      }
    ]
  },
  {
    name: "Steel",
    description: "Most commonly recycled metal, essential for construction and manufacturing.",
    image: "https://images.unsplash.com/photo-1567502669551-8d58f952c9f9?auto=format&fit=crop&q=80&w=800",
    types: [
      {
        name: "HMS 1",
        description: "Heavy steel >6mm thick, plates, structural",
        price: "3.50 - 4.00",
        grade: "A"
      },
      {
        name: "HMS 2",
        description: "Mixed steel 3-6mm thick, sheets, profiles",
        price: "3.00 - 3.50",
        grade: "B"
      },
      {
        name: "304 Stainless Steel",
        description: "Food grade stainless steel",
        price: "28 - 32",
        grade: "A"
      },
      {
        name: "316 Stainless Steel",
        description: "Marine grade stainless steel",
        price: "32 - 36",
        grade: "A+"
      }
    ]
  },
  {
    name: "Brass",
    description: "Valuable copper-zinc alloy used in plumbing and decorative applications.",
    image: "https://images.unsplash.com/photo-1589655150142-a74e5ad4ff11?auto=format&fit=crop&q=80&w=800",
    types: [
      {
        name: "Yellow Brass",
        description: "Standard brass scrap (70% Cu, 30% Zn)",
        price: "45 - 50",
        grade: "A"
      },
      {
        name: "Red Brass",
        description: "High copper content brass (85% Cu)",
        price: "50 - 55",
        grade: "A+"
      },
      {
        name: "Mixed Brass",
        description: "Unsorted brass materials",
        price: "40 - 45",
        grade: "B"
      }
    ]
  },
  {
    name: "Paper",
    description: "Various grades of recyclable paper and cardboard materials.",
    image: "https://images.unsplash.com/photo-1603484477859-abe6a73f9366?auto=format&fit=crop&q=80&w=800",
    types: [
      {
        name: "White Paper",
        description: "Clean white office paper, printer paper, and documents",
        price: "2.50 - 3.00",
        grade: "A"
      },
      {
        name: "Common Mixed Paper",
        description: "Mixed colored paper, magazines, and newspapers",
        price: "1.50 - 2.00",
        grade: "B"
      },
      {
        name: "Cardboard (K4)",
        description: "Clean corrugated cardboard boxes and packaging",
        price: "2.00 - 2.50",
        grade: "A"
      },
      {
        name: "Mixed Cardboard",
        description: "Mixed cardboard grades including packaging materials",
        price: "1.00 - 1.50",
        grade: "B"
      }
    ]
  },
  {
    name: "Plastics",
    description: "Various recyclable plastics sorted by type and color.",
    image: "https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&q=80&w=800",
    types: [
      {
        name: "HDPE Natural",
        description: "Milk bottles, cleaning product containers",
        price: "5.00 - 6.00",
        grade: "A"
      },
      {
        name: "PET Clear",
        description: "Clear beverage bottles",
        price: "4.50 - 5.50",
        grade: "A"
      },
      {
        name: "LDPE Clear",
        description: "Clear plastic films and bags",
        price: "4.00 - 5.00",
        grade: "B"
      },
      {
        name: "PP Mixed Colors",
        description: "Bottle caps, food containers",
        price: "3.50 - 4.50",
        grade: "C"
      }
    ]
  },
  {
    name: "Used Oil",
    description: "Collected used motor and industrial oils for recycling.",
    image: "https://images.unsplash.com/photo-1615740222678-df5fb6ea0d38?auto=format&fit=crop&q=80&w=800",
    types: [
      {
        name: "Motor Oil",
        description: "Used engine oil from vehicles",
        price: "2.00 - 2.50",
        grade: "A"
      },
      {
        name: "Industrial Oil",
        description: "Used hydraulic and machinery oil",
        price: "1.80 - 2.20",
        grade: "B"
      },
      {
        name: "Transformer Oil",
        description: "Used electrical transformer oil",
        price: "1.50 - 2.00",
        grade: "C"
      },
      {
        name: "Mixed Oil",
        description: "Mixed types of used oil",
        price: "1.00 - 1.50",
        grade: "D"
      }
    ]
  }
]