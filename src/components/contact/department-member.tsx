import { Mail, Phone } from "lucide-react"
import { type Member } from "@/lib/types"

interface DepartmentMemberProps {
  member: Member
}

export function DepartmentMember({ member }: DepartmentMemberProps) {
  return (
    <div className="text-sm space-y-1 mb-3 last:mb-0">
      <div className="font-medium">{member.name}</div>
      <div className="text-muted-foreground">{member.position}</div>
      <div className="flex items-center gap-2">
        <Mail className="h-4 w-4" />
        <a href={`mailto:${member.email}`} className="text-primary hover:underline">
          {member.email}
        </a>
      </div>
      <div className="flex items-center gap-2">
        <Phone className="h-4 w-4" />
        <a href={`tel:${member.phone}`} className="text-primary hover:underline">
          {member.phone}
        </a>
      </div>
    </div>
  )
}