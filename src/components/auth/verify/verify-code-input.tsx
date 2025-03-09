"use client"

import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { type UseFormReturn } from "react-hook-form"
import { type VerifyFormData } from "./verify-schema"

interface VerifyCodeInputProps {
  form: UseFormReturn<VerifyFormData>
}

export function VerifyCodeInput({ form }: VerifyCodeInputProps) {
  return (
    <FormField
      control={form.control}
      name="code"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              placeholder="Enter verification code"
              {...field}
              className="text-center text-2xl tracking-widest"
              maxLength={6}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}