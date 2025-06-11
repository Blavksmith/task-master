// types/database.ts
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
        }
      }
      roles: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
      }
      projects: {
        Row: {
          id: string
          name: string
          description: string | null
          owner_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          owner_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          owner_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      project_members: {
        Row: {
          id: number
          project_id: string | null
          user_id: string | null
          role_id: number | null
          joined_at: string
        }
        Insert: {
          id?: number
          project_id?: string | null
          user_id?: string | null
          role_id?: number | null
          joined_at?: string
        }
        Update: {
          id?: number
          project_id?: string | null
          user_id?: string | null
          role_id?: number | null
          joined_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          project_id: string | null
          title: string
          description: string | null
          status: 'todo' | 'in_progress' | 'done'
          priority: 'high' | 'medium' | 'low'
          assignee_id: string | null
          due_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id?: string | null
          title: string
          description?: string | null
          status?: 'todo' | 'in_progress' | 'done'
          priority?: 'high' | 'medium' | 'low'
          assignee_id?: string | null
          due_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string | null
          title?: string
          description?: string | null
          status?: 'todo' | 'in_progress' | 'done'
          priority?: 'high' | 'medium' | 'low'
          assignee_id?: string | null
          due_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

// Utility types
export type User = Database['public']['Tables']['users']['Row']
export type Project = Database['public']['Tables']['projects']['Row']
export type Task = Database['public']['Tables']['tasks']['Row']
export type ProjectMember = Database['public']['Tables']['project_members']['Row']
export type Role = Database['public']['Tables']['roles']['Row']

// Extended types dengan relasi
export type ProjectWithOwner = Project & {
  owner: User | null
}

export type TaskWithDetails = Task & {
  assignee: User | null
  project: Project | null
}

export type ProjectWithMembers = Project & {
  owner: User | null
  members: (ProjectMember & { user: User })[]
}