"use client"

import { Phone, Mail, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { type Recycler } from "@/lib/types"

interface RecyclerContactProps {
  recycler: Recycler
  isAuthenticated: boolean
}

export function RecyclerContact({ recycler, isAuthenticated }: RecyclerContactProps) {
  if (!isAuthenticated) {
    return (
      <Button asChild variant="outline" size="sm">
        <Link href="/auth/login">Login to View Contact Details</Link>
      </Button>
    )
  }

  return (
    <>
      <div className="flex items-center gap-2 text-sm">
        <Phone className="h-4 w-4 text-muted-foreground" />
        {recycler.phone}
      </div>
      <div className="flex items-center gap-2 text-sm">
        <Mail className="h-4 w-4 text-muted-foreground" />
        {recycler.email}
      </div>
      {recycler.website && (
        <div className="flex items-center gap-2 text-sm">
          <ExternalLink className="h-4 w-4 text-muted-foreground" />
          <a 
            href={recycler.website} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Visit Website
          </a>
        </div>
      )}
    </>
  )
}