import React from "react";
import { createClient } from "@/lib/supabase/server";
import TaskTracker from "./TaskTrackerClient"; // Import the client component we created above

async function TaskTrackerServer({
  params,
}: {
  params: { projectId: string };
}) {
  const supabase = createClient();
  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .eq("project_id", params.projectId);

  return <TaskTracker params={params} initialTasks={tasks || []} />;
}

export default TaskTrackerServer;
