import { supabase } from "@/lib/supabaseClient";
import { Project } from "@/types/database";

export const projectService = {
  async getProjectsByUser(userId: string): Promise<Project[]> {
    const { data, error } = await supabase
      .from("projects")
      .select(`
        id,
        name,
        description,
        created_at,
        owner_id,
        owner:users!owner_id(id, full_name, avatar_url)
      `)
      .eq("owner_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching projects by user:", error.message);
      return [];
    }

    console.log("Fetched projects:", data);
    return data as Project[];
  },
};
