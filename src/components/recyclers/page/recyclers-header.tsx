"use client"

import { Lock } from "lucide-react"

interface RecyclersHeaderProps {
  isAuthenticated: boolean
}

export function RecyclersHeader({ isAuthenticated }: RecyclersHeaderProps) {
  return (
    <div className="max-w-3xl mx-auto mb-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Registered Recyclers</h1>
      <p className="text-muted-foreground">
        Find verified scrap metal recyclers across South Africa.
        {!isAuthenticated && (
          <span className="block mt-2 text-sm">
            <Lock className="inline-block h-4 w-4 mr-1" />
            Login to view contact details
          </span>
        )}
      </p>
    </div>
  )
}