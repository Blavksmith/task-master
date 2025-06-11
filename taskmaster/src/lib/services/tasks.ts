import { supabase } from "@/lib/supabaseClient";
import { Task, TaskWithDetails } from "@/types/database";

export const taskService = {
  async createTask(task: Partial<Task>) {
    const { data, error } = await supabase
      .from("tasks")
      .insert(task)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getProjectTasks(projectId: string): Promise<TaskWithDetails[]> {
    const { data, error } = await supabase
      .from("tasks")
      .select(
        `
        *,
        assignee:users(*),
        project:projects(*)
      `
      )
      .eq("project_id", projectId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as TaskWithDetails[];
  },

  async updateTask(taskId: string, updates: Partial<Task>) {
    const { data, error } = await supabase
      .from("tasks")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", taskId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteTask(taskId: string) {
    const { error } = await supabase.from("tasks").delete().eq("id", taskId);

    if (error) throw error;
  },

  async getUserTasks(userId: string): Promise<TaskWithDetails[]> {
    const { data, error } = await supabase
      .from("tasks")
      .select(
        `
        *,
        assignee:users(*),
        project:projects(*)
      `
      )
      .eq("assignee_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as TaskWithDetails[];
  },

  async getTasksByStatus(projectId: string, status: Task["status"]) {
    const { data, error } = await supabase
      .from("tasks")
      .select(
        `
        *,
        assignee:users(*),
        project:projects(*)
      `
      )
      .eq("project_id", projectId)
      .eq("status", status);

    if (error) throw error;
    return data as TaskWithDetails[];
  },
};
