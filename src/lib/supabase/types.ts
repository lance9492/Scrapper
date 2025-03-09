export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          name: string
          is_admin: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name: string
          is_admin?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          is_admin?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      listings: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string
          price: number
          location: string
          metal_type: string
          weight: number
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description: string
          price: number
          location: string
          metal_type: string
          weight: number
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string
          price?: number
          location?: string
          metal_type?: string
          weight?: number
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      bids: {
        Row: {
          id: string
          listing_id: string
          user_id: string
          amount: number
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          listing_id: string
          user_id: string
          amount: number
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          listing_id?: string
          user_id?: string
          amount?: number
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      images: {
        Row: {
          id: string
          listing_id: string
          url: string
          created_at: string
        }
        Insert: {
          id?: string
          listing_id: string
          url: string
          created_at?: string
        }
        Update: {
          id?: string
          listing_id?: string
          url?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}