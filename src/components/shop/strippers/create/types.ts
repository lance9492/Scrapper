```typescript
export interface StripperFormData {
  title: string
  description: string
  price: number
  location: string
  make: string
  model: string
  year: number
  stripType: "Full Vehicle" | "Partial" | "Components" | "Other - Salvage"
  condition: string
  availableParts: string[]
  images: string[]
  video?: string
}

export interface PartCategory {
  name: string
  parts: string[]
}

export const partCategories: PartCategory[] = [
  {
    name: "Engine",
    parts: ["Complete Engine", "Engine Block", "Cylinder Head", "Crankshaft", "Pistons", "Valves"]
  },
  {
    name: "Transmission",
    parts: ["Complete Gearbox", "Clutch", "Differential", "Drive Shaft", "CV Joints"]
  },
  {
    name: "Body",
    parts: ["Doors", "Hood", "Trunk", "Fenders", "Bumpers", "Mirrors", "Windows"]
  },
  {
    name: "Interior",
    parts: ["Seats", "Dashboard", "Steering Wheel", "Center Console", "Trim"]
  },
  {
    name: "Electrical",
    parts: ["ECU", "Wiring Harness", "Alternator", "Starter", "Sensors"]
  },
  {
    name: "Suspension",
    parts: ["Shock Absorbers", "Springs", "Control Arms", "Steering Rack", "Struts"]
  }
]
```