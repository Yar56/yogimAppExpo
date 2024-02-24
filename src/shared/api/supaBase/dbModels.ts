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
      articles: {
        Row: {
          content: string
          id: string
          imageUrl: string
          isFavorite: boolean
          time: string
          title: string
          type: Database["public"]["Enums"]["ArticleType"]
        }
        Insert: {
          content?: string
          id: string
          imageUrl?: string
          isFavorite?: boolean
          time: string
          title: string
          type?: Database["public"]["Enums"]["ArticleType"]
        }
        Update: {
          content?: string
          id?: string
          imageUrl?: string
          isFavorite?: boolean
          time?: string
          title?: string
          type?: Database["public"]["Enums"]["ArticleType"]
        }
        Relationships: [
          {
            foreignKeyName: "articles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "articles"
            referencedColumns: ["id"]
          }
        ]
      }
      courses: {
        Row: {
          description: string
          details: string | null
          disabled: boolean
          id: string
          isFree: boolean
          isPaid: boolean
          isStarted: boolean
          labels: Json[] | null
          lessonNumber: string
          lessons: Json[] | null
          photoUrl: string
          time: string
          title: string
          type: Database["public"]["Enums"]["CourseType"]
          welcomeVideoUrl: string
        }
        Insert: {
          description: string
          details?: string | null
          disabled: boolean
          id: string
          isFree?: boolean
          isPaid?: boolean
          isStarted?: boolean
          labels?: Json[] | null
          lessonNumber: string
          lessons?: Json[] | null
          photoUrl?: string
          time: string
          title: string
          type?: Database["public"]["Enums"]["CourseType"]
          welcomeVideoUrl?: string
        }
        Update: {
          description?: string
          details?: string | null
          disabled?: boolean
          id?: string
          isFree?: boolean
          isPaid?: boolean
          isStarted?: boolean
          labels?: Json[] | null
          lessonNumber?: string
          lessons?: Json[] | null
          photoUrl?: string
          time?: string
          title?: string
          type?: Database["public"]["Enums"]["CourseType"]
          welcomeVideoUrl?: string
        }
        Relationships: [
          {
            foreignKeyName: "courses_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "courses"
            referencedColumns: ["id"]
          }
        ]
      }
      lessons: {
        Row: {
          courseId: string
          description: string
          id: string
          order: number
          time: string
          title: string
        }
        Insert: {
          courseId: string
          description: string
          id: string
          order?: number
          time: string
          title: string
        }
        Update: {
          courseId?: string
          description?: string
          id?: string
          order?: number
          time?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "lessons_courseId_fkey"
            columns: ["courseId"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lessons_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          }
        ]
      }
      likedArticles: {
        Row: {
          articleId: string
          id: string
          profileId: string
        }
        Insert: {
          articleId: string
          id: string
          profileId: string
        }
        Update: {
          articleId?: string
          id?: string
          profileId?: string
        }
        Relationships: [
          {
            foreignKeyName: "likedArticles_articleId_fkey"
            columns: ["articleId"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likedArticles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "likedArticles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likedArticles_profileId_fkey"
            columns: ["profileId"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          id: string
          sex: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          id: string
          sex?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          sex?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      purchases: {
        Row: {
          courseId: string
          purchaseDate: string
          purchaseId: string
          userId: string
        }
        Insert: {
          courseId: string
          purchaseDate: string
          purchaseId?: string
          userId: string
        }
        Update: {
          courseId?: string
          purchaseDate?: string
          purchaseId?: string
          userId?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      ArticleType: "YOGA" | "ENERGY" | "MEAL"
      CourseType: "YOGA" | "RECOVERY" | "MEDITATION"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never

