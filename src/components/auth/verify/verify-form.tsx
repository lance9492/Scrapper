"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { useVerifyForm } from "./use-verify-form"
import { VerifyCodeInput } from "./verify-code-input"

export function VerifyForm() {
  const { form, onSubmit, isLoading } = useVerifyForm()

  return (
    <Card className="w-full max-w-md p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Verify Your Account</h2>
        <p className="text-muted-foreground">
          Enter the verification code sent to your email
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <VerifyCodeInput form={form} />
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify Account"}
          </Button>
        </form>
      </Form>
    </Card>
  )
}