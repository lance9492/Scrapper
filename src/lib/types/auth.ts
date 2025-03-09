export interface Credentials {
  email: string
  password: string
}

export interface User {
  id: string
  email: string
  name: string
  role: string
}

declare module "next-auth" {
  interface Session {
    user: User
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: string
  }
}