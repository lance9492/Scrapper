"use client"

import { RegisterForm } from "@/components/auth/register/register-form"

export default function RegisterPage() {
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="relative hidden md:block">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <h1 className="text-3xl font-bold mb-4">Join Our Community</h1>
            <p className="text-gray-100 max-w-md">
              Register to start trading on South Africa's premier scrap metal marketplace.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-8">
        <RegisterForm />
      </div>
    </div>
  )
}