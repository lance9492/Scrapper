import { Card } from "@/components/ui/card"
import { Users } from "lucide-react"
import { DepartmentMember } from "./department-member"
import { type Department } from "@/lib/types"

interface DepartmentCardProps {
  department: Department
}

export function DepartmentCard({ department }: DepartmentCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-3">
        <Users className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">{department.name}</h3>
      </div>
      {department.members.map((member) => (
        <DepartmentMember key={member.email} member={member} />
      ))}
    </Card>
  )
}