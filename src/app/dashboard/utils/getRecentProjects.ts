export async function getRecentProjects(supabase: any, userId: string) {
  const { data, error } = await supabase
    .from("projects")
    .select(
      `
      id,
      name,
      description,
      updated_at,
      owner:users!fk_projects_owner (
        id,
        full_name,
        avatar_url
      ),
      tasks (
        id,
        status
      )
    `
    )
    .eq("owner_id", userId)
    .order("updated_at", { ascending: false })
    .limit(3);

  if (error) {
    console.error("Error fetching recent projects:", error);
    return [];
  }

  return (data || []).map((project: any) => {
    const tasks = project.tasks || [];
    const completedTasks = tasks.filter((t: any) => t.status === "done").length;

    return {
      ...project,
      taskCount: tasks.length,
      completedTasks,
    };
  });
}
