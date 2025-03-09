import { PartsBayNav } from "@/components/partsbay/nav/partsbay-nav"

export default function PartsBayLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <PartsBayNav />
      {children}
    </div>
  )
}