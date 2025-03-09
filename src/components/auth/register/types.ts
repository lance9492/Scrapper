export interface RegisterFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface CompanyFormData {
  registrationNumber: string
  vatNumber?: string
}

export interface TradingPreferences {
  buying: boolean
  selling: boolean
}

export type AccountType = "individual" | "company"