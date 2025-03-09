import { type RegisterFormData, type CompanyFormData, type TradingPreferences, type AccountType } from "@/components/auth/register/types"

interface RegistrationData {
  accountType: AccountType
  tradingPreferences: TradingPreferences
  formData: RegisterFormData
  companyData?: CompanyFormData
}

export async function registerUser(data: RegistrationData) {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    throw new Error("Registration failed")
  }

  return response.json()
}