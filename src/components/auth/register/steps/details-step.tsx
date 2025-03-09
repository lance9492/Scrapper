"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { registerSchema, type RegisterFormData } from "../schemas/register.schema"
import Link from "next/link"
import { type AccountType } from "../types"
import { useState } from "react"

interface DetailsStepProps {
  formData: RegisterFormData
  onFormDataChange: (data: RegisterFormData) => void
  onSubmit: () => Promise<void>
  onBack: () => void
  accountType: AccountType
}

export function DetailsStep({
  formData,
  onFormDataChange,
  onSubmit,
  onBack,
  accountType,
}: DetailsStepProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: formData,
  })

  const handleSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    try {
      onFormDataChange(data)
      await onSubmit()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">
          {accountType === "individual" ? "Personal" : "Company"} Details
        </h2>
        <p className="text-muted-foreground">
          Fill in your details to complete registration
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {accountType === "individual" ? "Full Name" : "Company Name"}
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={onBack} className="w-full">
              Back
            </Button>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Complete Registration"}
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </form>
      </Form>
    </Card>
  )
}