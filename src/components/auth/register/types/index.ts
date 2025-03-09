export type AccountType = "individual" | "company"

export interface TradingPreferences {
  buying: boolean
  selling: boolean
}

export type { RegisterFormData } from "../schemas/register.schema"
export type { CompanyFormData } from "../schemas/company.schema"