// src/app/dashboard/utils/getDashboardStats.ts
export async function getDashboardStats(supabase: any, userId: string) {
  const [
    { count: totalProjects },
    { count: completedTasks },
    { count: pendingTasks },
  ] = await Promise.all([
    supabase
      .from("projects")
      .select("*", { count: "exact", head: true })
      .eq("owner_id", userId),
    supabase
      .from("tasks")
      .select("*", { count: "exact", head: true })
      .eq("status", "done")
      .eq("assignee_id", userId),
    supabase
      .from("tasks")
      .select("*", { count: "exact", head: true })
      .eq("status", "todo")
      .eq("assignee_id", userId),
  ]);

  const totalTasks = (completedTasks || 0) + (pendingTasks || 0);

  return {
    totalProjects: totalProjects || 0,
    completedTasks: completedTasks || 0,
    pendingTasks: pendingTasks || 0,
    totalTasks,
    tasksThisWeek: completedTasks || 0, // contoh sementara
  };
}
