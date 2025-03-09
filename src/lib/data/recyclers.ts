import { type Recycler } from "@/lib/types"

export const recyclers: Recycler[] = [
  {
    id: "1",
    name: "SA Metal Group",
    description: "One of South Africa's largest metal recycling companies with multiple branches nationwide",
    address: "15 Benbow Avenue, Epping 1, Cape Town",
    coordinates: { lat: -33.931872, lng: 18.535673 },
    materials: ["All Metals", "E-Waste", "Batteries"],
    phone: "+27 21 590 3900",
    email: "info@sametal.co.za",
    website: "https://sametal.co.za",
    verified: true
  },
  {
    id: "2",
    name: "Reclam",
    description: "National recycling company specializing in metal, paper, and glass recycling",
    address: "316 Mundt Street, Waltloo, Pretoria",
    coordinates: { lat: -25.729833, lng: 28.318961 },
    materials: ["All Metals", "Paper", "Glass"],
    phone: "+27 12 803 5168",
    email: "info@reclam.co.za",
    website: "https://www.reclam.co.za",
    verified: true
  },
  {
    id: "3",
    name: "Universal Recycling Company",
    description: "Leading recycler in Johannesburg with multiple collection points",
    address: "24 Main Reef Road, Roodepoort",
    coordinates: { lat: -26.204103, lng: 27.858172 },
    materials: ["All Metals", "Paper", "Plastic"],
    phone: "+27 11 434 4201",
    email: "info@universalrecycling.co.za",
    verified: true
  },
  {
    id: "4",
    name: "Collect-a-Can",
    description: "Specializing in metal can recycling with nationwide coverage",
    address: "27 Nagington Road, Wadeville, Germiston",
    coordinates: { lat: -26.235982, lng: 28.176147 },
    materials: ["Metal Cans", "Aluminum", "Steel"],
    phone: "+27 11 466 2939",
    email: "info@collectacan.co.za",
    website: "https://www.collectacan.co.za",
    verified: true
  },
  {
    id: "5",
    name: "New Reclamation Group",
    description: "Large-scale recycling operation across multiple provinces",
    address: "91 Main Reef Road, Johannesburg",
    coordinates: { lat: -26.203456, lng: 28.040339 },
    materials: ["All Metals", "E-Waste", "Industrial Waste"],
    phone: "+27 11 494 4141",
    email: "info@reclam-group.co.za",
    verified: true
  },
  {
    id: "6",
    name: "Phoenix Recycling",
    description: "Durban-based metal recycling specialists",
    address: "45 Phoenix Industrial Park, Phoenix, Durban",
    coordinates: { lat: -29.708760, lng: 31.036277 },
    materials: ["Copper", "Brass", "Steel", "Aluminum"],
    phone: "+27 31 500 8700",
    email: "info@phoenixrecycling.co.za",
    verified: true
  },
  {
    id: "7",
    name: "Green Scrap Recyclers",
    description: "Eco-friendly recycling solutions in Port Elizabeth",
    address: "12 Haupt Street, Sidwell, Port Elizabeth",
    coordinates: { lat: -33.918861, lng: 25.611200 },
    materials: ["All Metals", "Plastic", "E-Waste"],
    phone: "+27 41 453 1889",
    email: "info@greenscrap.co.za",
    verified: true
  },
  {
    id: "8",
    name: "Gauteng Scrap Metals",
    description: "Premium scrap metal dealers in Pretoria",
    address: "562 Voortrekker Road, Pretoria West",
    coordinates: { lat: -25.743889, lng: 28.149722 },
    materials: ["All Metals", "Batteries", "Catalytic Converters"],
    phone: "+27 12 327 4195",
    email: "info@gautengscrap.co.za",
    verified: true
  },
  {
    id: "9",
    name: "East Rand Recycling",
    description: "Comprehensive recycling services in the East Rand",
    address: "15 Industry Road, Boksburg",
    coordinates: { lat: -26.211944, lng: 28.259722 },
    materials: ["All Metals", "Paper", "Plastic"],
    phone: "+27 11 914 1072",
    email: "info@eastrandrecycling.co.za",
    verified: true
  },
  {
    id: "10",
    name: "Bloemfontein Metal Recyclers",
    description: "Central South Africa's premier metal recycling facility",
    address: "23 Chrome Street, Hamilton, Bloemfontein",
    coordinates: { lat: -29.118889, lng: 26.224722 },
    materials: ["All Metals", "E-Waste"],
    phone: "+27 51 433 1574",
    email: "info@bloemrecyclers.co.za",
    verified: true
  },
  {
    id: "11",
    name: "West Coast Scrap",
    description: "Serving the West Coast region with comprehensive recycling solutions",
    address: "45 Industria Street, Saldanha Bay",
    coordinates: { lat: -33.011111, lng: 17.944444 },
    materials: ["All Metals", "Marine Scrap", "Industrial Waste"],
    phone: "+27 22 714 3232",
    email: "info@westcoastscrap.co.za",
    verified: true
  },
  {
    id: "12",
    name: "Kimberley Recycling Solutions",
    description: "Northern Cape's leading recycling center",
    address: "18 Cecil Sussman Road, Kimberley",
    coordinates: { lat: -28.732778, lng: 24.762778 },
    materials: ["All Metals", "Mining Scrap", "Industrial Waste"],
    phone: "+27 53 832 4291",
    email: "info@kimberleyrecycling.co.za",
    verified: true
  },
  {
    id: "13",
    name: "Mpumalanga Scrap Metals",
    description: "Serving the mining and industrial sectors in Mpumalanga",
    address: "34 Mining Street, Middelburg",
    coordinates: { lat: -25.771944, lng: 29.466667 },
    materials: ["All Metals", "Mining Equipment", "Industrial Scrap"],
    phone: "+27 13 243 5566",
    email: "info@mpumalangascrap.co.za",
    verified: true
  },
  {
    id: "14",
    name: "Polokwane Metal Traders",
    description: "Limpopo's premier scrap metal facility",
    address: "77 Industrial Road, Polokwane",
    coordinates: { lat: -23.904167, lng: 29.468889 },
    materials: ["All Metals", "Automotive Scrap", "Industrial Metals"],
    phone: "+27 15 297 3344",
    email: "info@polokwanemetals.co.za",
    verified: true
  },
  {
    id: "15",
    name: "Border Scrap Solutions",
    description: "Serving the Border region with quality recycling services",
    address: "12 Fleet Street, East London",
    coordinates: { lat: -33.019167, lng: 27.899722 },
    materials: ["All Metals", "Electronic Waste", "Industrial Scrap"],
    phone: "+27 43 722 8855",
    email: "info@borderscrap.co.za",
    verified: true
  }
]