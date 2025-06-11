import { supabase } from '@/lib/supabaseClient'
import { Project, ProjectWithOwner, ProjectWithMembers } from '@/types/database'

export const projectService = {
  async createProject(name: string, description?: string) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    const { data, error } = await supabase
      .from('projects')
      .insert({
        name,
        description,
        owner_id: user.id
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  async getUserProjects(userId: string): Promise<ProjectWithOwner[]> {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        owner:users(*)
      `)
      .or(`owner_id.eq.${userId},project_members.user_id.eq.${userId}`)

    if (error) throw error
    return data as ProjectWithOwner[]
  },

  async getProjectById(projectId: string): Promise<ProjectWithMembers | null> {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        owner:users(*),
        project_members(
          *,
          user:users(*)
        )
      `)
      .eq('id', projectId)
      .single()

    if (error) throw error
    return data as ProjectWithMembers
  },

  async updateProject(projectId: string, updates: Partial<Project>) {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', projectId)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async deleteProject(projectId: string) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId)

    if (error) throw error
  },

  async inviteMember(projectId: string, userEmail: string, roleId: number = 2) {
    // Cari user berdasarkan email
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('email', userEmail)
      .single()

    if (userError) throw new Error('User not found')

    const { data, error } = await supabase
      .from('project_members')
      .insert({
        project_id: projectId,
        user_id: user.id,
        role_id: roleId
      })
      .select()
      .single()

    if (error) throw error
    return data
  }
}
