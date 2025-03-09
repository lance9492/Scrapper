import { MetalMartNav } from "@/components/metalmart/nav/metalmart-nav"

export default function MetalMartLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <MetalMartNav />
      {children}
    </div>
  )
}