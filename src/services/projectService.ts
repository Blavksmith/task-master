// import { supabase } from "@/lib/supabaseClient";
// import { Project } from "@/types/database";

// export const projectService = {
//   async getProjectsByUser(userId: string): Promise<Project[]> {
//     const { data , error } = await supabase
//       .from("projects")
//       .select(`
//         id,
//         name,
//         description,
//         created_at,
//         owner_id,
//         owner:users!owner_id (
//           id,
//           full_name,
//           avatar_url
//         )
//       `)
//       .eq("owner_id", userId)
//       .order("created_at", { ascending: false });

//     if (error) {
//       console.error("Error fetching projects by user:", error.message);
//       return [];
//     }

//     console.log("Fetched projects:", data);
//     return data as Project[];
//   },
// };

import { supabase } from "@/lib/supabaseClient";
import { Project } from "@/types/database";

// Type untuk data mentah dari Supabase
interface SupabaseProject {
  id: string;
  name: string;
  description: string;
  created_at: string;
  owner_id: string;
  owner: {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
  }[];
}

export const projectService = {
  async getProjectsByUser(userId: string): Promise<Project[]> {
    const { data, error } = await supabase
      .from("projects")
      .select(
        `
        id,
        name,
        description,
        created_at,
        owner_id,
        owner:users!owner_id (
          id,
          full_name,
          avatar_url
        )
      `
      )
      .eq("owner_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching projects by user:", error.message);
      return [];
    }

    console.log("Fetched projects:", data);

    // Transform data dari Supabase ke format yang diharapkan
    const transformedData: Project[] = (data as SupabaseProject[]).map(
      (project) => ({
        id: project.id,
        name: project.name,
        description: project.description,
        created_at: project.created_at,
        owner_id: project.owner_id,
        owner: project.owner[0]
          ? {
              id: project.owner[0].id,
              full_name: project.owner[0].full_name || undefined,
              avatar_url: project.owner[0].avatar_url || undefined,
            }
          : undefined,
      })
    );

    return transformedData;
  },
};
