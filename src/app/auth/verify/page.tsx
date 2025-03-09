"use client"

import Image from "next/image"
import { VerifyForm } from "@/components/auth/verify/verify-form"

export default function VerifyPage() {
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="relative hidden md:block">
        <Image
          src="https://images.unsplash.com/photo-1567502669551-8d58f952c9f9?auto=format&fit=crop&q=80"
          alt="Scrap Metal Trading"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <h1 className="text-3xl font-bold mb-4">Almost There!</h1>
            <p className="text-gray-200 max-w-md">
              Verify your account to start trading on South Africa's premier scrap metal marketplace.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-8">
        <VerifyForm />
      </div>
    </div>
  )
}