"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { verifySchema, type VerifyFormData } from "./verify-schema"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/toast"

export function useVerifyForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<VerifyFormData>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: ""
    }
  })

  async function onSubmit(data: VerifyFormData) {
    try {
      setIsLoading(true)
      // TODO: Implement verification logic
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "Account verified",
        description: "Your account has been verified successfully"
      })
      
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Verification failed",
        description: "Please check your code and try again",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return {
    form,
    onSubmit,
    isLoading
  }
}