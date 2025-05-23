export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string | null
          id: string
          password_hash: string
          username: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          password_hash: string
          username: string
        }
        Update: {
          created_at?: string | null
          id?: string
          password_hash?: string
          username?: string
        }
        Relationships: []
      }
      artists: {
        Row: {
          approved: boolean | null
          created_at: string | null
          id: string
          name: string
          photo_url: string | null
          specialty: string | null
          user_id: string | null
        }
        Insert: {
          approved?: boolean | null
          created_at?: string | null
          id?: string
          name: string
          photo_url?: string | null
          specialty?: string | null
          user_id?: string | null
        }
        Update: {
          approved?: boolean | null
          created_at?: string | null
          id?: string
          name?: string
          photo_url?: string | null
          specialty?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      banners: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          image_url: string
          link: string | null
          title: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url: string
          link?: string | null
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string
          link?: string | null
          title?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          booked_at: string | null
          event_id: string
          id: string
          payment_id: string | null
          payment_status: string
          price: number
          qr_code: string | null
          ticket_id: string
          user_id: string
        }
        Insert: {
          booked_at?: string | null
          event_id: string
          id?: string
          payment_id?: string | null
          payment_status: string
          price: number
          qr_code?: string | null
          ticket_id: string
          user_id: string
        }
        Update: {
          booked_at?: string | null
          event_id?: string
          id?: string
          payment_id?: string | null
          payment_status?: string
          price?: number
          qr_code?: string | null
          ticket_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          icon_url: string | null
          id: string
          name: string
        }
        Insert: {
          icon_url?: string | null
          id?: string
          name: string
        }
        Update: {
          icon_url?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          artist_id: string | null
          city: string
          created_at: string | null
          date: string
          description: string | null
          host_id: string | null
          id: string
          image_url: string | null
          name: string
          price: number
          seats_available: number
          venue: string
        }
        Insert: {
          artist_id?: string | null
          city: string
          created_at?: string | null
          date: string
          description?: string | null
          host_id?: string | null
          id?: string
          image_url?: string | null
          name: string
          price: number
          seats_available: number
          venue: string
        }
        Update: {
          artist_id?: string | null
          city?: string
          created_at?: string | null
          date?: string
          description?: string | null
          host_id?: string | null
          id?: string
          image_url?: string | null
          name?: string
          price?: number
          seats_available?: number
          venue?: string
        }
        Relationships: []
      }
      experiences: {
        Row: {
          city: string
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          name: string
          price: number
        }
        Insert: {
          city: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          price: number
        }
        Update: {
          city?: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          price?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          full_name: string | null
          id: string
          is_private: boolean | null
          updated_at: string | null
          username: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          is_private?: boolean | null
          updated_at?: string | null
          username: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          is_private?: boolean | null
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
      saved_articles: {
        Row: {
          article_image: string | null
          article_title: string
          article_url: string
          id: string
          saved_at: string | null
          source_name: string | null
          user_id: string | null
        }
        Insert: {
          article_image?: string | null
          article_title: string
          article_url: string
          id?: string
          saved_at?: string | null
          source_name?: string | null
          user_id?: string | null
        }
        Update: {
          article_image?: string | null
          article_title?: string
          article_url?: string
          id?: string
          saved_at?: string | null
          source_name?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          amount: number
          created_at: string | null
          duration: string
          end_date: string | null
          id: string
          payment_id: string | null
          plan_name: string
          razorpay_order_id: string | null
          start_date: string | null
          status: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          duration: string
          end_date?: string | null
          id?: string
          payment_id?: string | null
          plan_name: string
          razorpay_order_id?: string | null
          start_date?: string | null
          status: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          duration?: string
          end_date?: string | null
          id?: string
          payment_id?: string | null
          plan_name?: string
          razorpay_order_id?: string | null
          start_date?: string | null
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          categories: string[] | null
          created_at: string | null
          id: string
          preferred_sources: string[] | null
          theme: string | null
          updated_at: string | null
        }
        Insert: {
          categories?: string[] | null
          created_at?: string | null
          id: string
          preferred_sources?: string[] | null
          theme?: string | null
          updated_at?: string | null
        }
        Update: {
          categories?: string[] | null
          created_at?: string | null
          id?: string
          preferred_sources?: string[] | null
          theme?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      workouts: {
        Row: {
          calories: number
          category: string
          created_at: string | null
          created_by: string | null
          description: string | null
          difficulty: string
          duration: number
          equipment: string[] | null
          exercises: Json[] | null
          id: string
          thumbnail_url: string | null
          title: string
        }
        Insert: {
          calories: number
          category: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          difficulty: string
          duration: number
          equipment?: string[] | null
          exercises?: Json[] | null
          id?: string
          thumbnail_url?: string | null
          title: string
        }
        Update: {
          calories?: number
          category?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          difficulty?: string
          duration?: number
          equipment?: string[] | null
          exercises?: Json[] | null
          id?: string
          thumbnail_url?: string | null
          title?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: { username: string; password: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
