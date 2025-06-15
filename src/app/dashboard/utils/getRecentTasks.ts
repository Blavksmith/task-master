export async function getRecentTasks(supabase: any, userId: string) {
  const { data, error } = await supabase
    .from("tasks")
    .select(
      `
  id,
  title,
  description,
  priority,
  due_date,
  project:projects (
    id,
    name
  )
`
    )

    .eq("assignee_id", userId)
    .order("due_date", { ascending: true })
    .limit(5);

  if (error) {
    console.error("Error fetching recent tasks:", error);
    return [];
  }

  return data;
}
