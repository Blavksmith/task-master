import { supabase } from '@/lib/supabaseClient'
import { User } from '@/types/database'

export const authService = {
  async signUp(email: string, password: string, fullName: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName
        }
      }
    })

    if (data.user && !error) {
      // Insert user profile
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: data.user.id,
          full_name: fullName
        })

      if (profileError) throw profileError
    }

    return { data, error }
  },

  async signIn(email: string, password: string) {
    return await supabase.auth.signInWithPassword({ email, password })
  },

  async signOut() {
    return await supabase.auth.signOut()
  },

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  },

  async getUserProfile(userId: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) throw error
    return data
  }
}