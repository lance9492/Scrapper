"use client"

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Phone, Mail, Globe, CheckCircle } from 'lucide-react'
import { type Recycler } from '@/lib/types'

interface RecyclerInfoCardProps {
  recycler: Recycler
}

export function RecyclerInfoCard({ recycler }: RecyclerInfoCardProps) {
  return (
    <Card className="p-4 min-w-[300px]">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">{recycler.name}</h3>
        {recycler.verified && (
          <Badge variant="secondary">
            <CheckCircle className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        )}
      </div>
      <p className="text-sm text-muted-foreground mb-3">
        {recycler.description}
      </p>
      <div className="text-sm space-y-2">
        <div>{recycler.address}</div>
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4" />
          <a href={`tel:${recycler.phone}`} className="text-primary hover:underline">
            {recycler.phone}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          <a href={`mailto:${recycler.email}`} className="text-primary hover:underline">
            {recycler.email}
          </a>
        </div>
        {recycler.website && (
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
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
      </div>
    </Card>
  )
}