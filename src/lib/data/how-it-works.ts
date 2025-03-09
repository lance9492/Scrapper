import { 
  UserCheck, 
  ListChecks, 
  Gavel, 
  TruckIcon, 
  BadgeCheck,
  ShieldCheck,
  Banknote,
  Users
} from "lucide-react"
import { type Benefit, type ProcessStepData } from "@/components/how-it-works/types"

export const sellerBenefits: Benefit[] = [
  {
    title: "Access to Verified Buyers",
    description: "Connect with a network of pre-verified buyers, ensuring secure and reliable transactions.",
    icon: UserCheck
  },
  {
    title: "Real-time Market Prices",
    description: "Stay informed with up-to-date scrap metal prices to maximize your profits.",
    icon: Banknote
  },
  {
    title: "Competitive Bidding",
    description: "Get the best price for your scrap through our competitive bidding system.",
    icon: Gavel
  },
  {
    title: "Secure Payments",
    description: "Receive payments securely through our trusted payment system.",
    icon: ShieldCheck
  }
]

export const buyerBenefits: Benefit[] = [
  {
    title: "Quality Assurance",
    description: "All listings are verified to ensure quality and accuracy of materials.",
    icon: BadgeCheck
  },
  {
    title: "Wide Selection",
    description: "Access a diverse range of scrap metal listings from across South Africa.",
    icon: ListChecks
  },
  {
    title: "Direct Communication",
    description: "Communicate directly with sellers through our secure messaging system.",
    icon: Users
  },
  {
    title: "Efficient Logistics",
    description: "Coordinate pickup and delivery through our network of trusted transporters.",
    icon: TruckIcon
  }
]

export const processSteps: ProcessStepData[] = [
  {
    number: 1,
    title: "Create an Account",
    description: "Register as a buyer or seller. Verify your identity and business documents."
  },
  {
    number: 2,
    title: "List or Browse",
    description: "Sellers can list their scrap metal for R10 per listing. Buyers can browse and filter listings."
  },
  {
    number: 3,
    title: "Bid and Negotiate",
    description: "Place bids on listings or negotiate directly through our secure messaging system."
  },
  {
    number: 4,
    title: "Complete Transaction",
    description: "Finalize the deal, arrange logistics, and complete the secure payment process."
  }
]