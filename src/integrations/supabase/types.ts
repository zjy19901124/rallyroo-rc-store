export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      addresses: {
        Row: {
          address_line1: string
          address_line2: string | null
          created_at: string
          id: string
          is_default: boolean | null
          name: string
          phone: string | null
          postcode: string
          state: string
          suburb: string
          user_id: string
        }
        Insert: {
          address_line1: string
          address_line2?: string | null
          created_at?: string
          id?: string
          is_default?: boolean | null
          name: string
          phone?: string | null
          postcode: string
          state: string
          suburb: string
          user_id: string
        }
        Update: {
          address_line1?: string
          address_line2?: string | null
          created_at?: string
          id?: string
          is_default?: boolean | null
          name?: string
          phone?: string | null
          postcode?: string
          state?: string
          suburb?: string
          user_id?: string
        }
        Relationships: []
      }
      admin_sessions: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          session_token: string
        }
        Insert: {
          created_at?: string
          expires_at: string
          id?: string
          session_token: string
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          session_token?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          amount_total: number
          created_at: string
          currency: string
          customer_email: string
          id: string
          items: Json
          shipping: Json | null
          status: Database["public"]["Enums"]["order_status"]
          stripe_checkout_session_id: string | null
          stripe_payment_intent_id: string | null
          stripe_payment_link_id: string | null
          user_id: string | null
        }
        Insert: {
          amount_total: number
          created_at?: string
          currency?: string
          customer_email: string
          id?: string
          items?: Json
          shipping?: Json | null
          status?: Database["public"]["Enums"]["order_status"]
          stripe_checkout_session_id?: string | null
          stripe_payment_intent_id?: string | null
          stripe_payment_link_id?: string | null
          user_id?: string | null
        }
        Update: {
          amount_total?: number
          created_at?: string
          currency?: string
          customer_email?: string
          id?: string
          items?: Json
          shipping?: Json | null
          status?: Database["public"]["Enums"]["order_status"]
          stripe_checkout_session_id?: string | null
          stripe_payment_intent_id?: string | null
          stripe_payment_link_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          age_grade: string
          battery_type: string
          category: string
          compare_at_price_aud: number | null
          created_at: string
          description: string
          dimensions_cm: Json
          features: string[] | null
          id: string
          images: string[] | null
          is_active: boolean
          low_stock_threshold: number
          name: string
          price_aud: number
          sku: string | null
          slug: string
          stock_available: number | null
          stock_on_hand: number
          stock_reserved: number
          stripe_payment_link_url: string | null
          updated_at: string
          video_url: string | null
          weight_kg: number
        }
        Insert: {
          age_grade?: string
          battery_type?: string
          category?: string
          compare_at_price_aud?: number | null
          created_at?: string
          description: string
          dimensions_cm?: Json
          features?: string[] | null
          id?: string
          images?: string[] | null
          is_active?: boolean
          low_stock_threshold?: number
          name: string
          price_aud: number
          sku?: string | null
          slug: string
          stock_available?: number | null
          stock_on_hand?: number
          stock_reserved?: number
          stripe_payment_link_url?: string | null
          updated_at?: string
          video_url?: string | null
          weight_kg?: number
        }
        Update: {
          age_grade?: string
          battery_type?: string
          category?: string
          compare_at_price_aud?: number | null
          created_at?: string
          description?: string
          dimensions_cm?: Json
          features?: string[] | null
          id?: string
          images?: string[] | null
          is_active?: boolean
          low_stock_threshold?: number
          name?: string
          price_aud?: number
          sku?: string | null
          slug?: string
          stock_available?: number | null
          stock_on_hand?: number
          stock_reserved?: number
          stripe_payment_link_url?: string | null
          updated_at?: string
          video_url?: string | null
          weight_kg?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          created_at: string
          dispatch_time_text: string
          free_shipping_threshold_aud: number
          id: string
          shipping_flat_rate_aud: number
          support_email: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          dispatch_time_text?: string
          free_shipping_threshold_aud?: number
          id?: string
          shipping_flat_rate_aud?: number
          support_email?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          dispatch_time_text?: string
          free_shipping_threshold_aud?: number
          id?: string
          shipping_flat_rate_aud?: number
          support_email?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      order_status: "pending" | "paid" | "refunded" | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      order_status: ["pending", "paid", "refunded", "cancelled"],
    },
  },
} as const
