import React from "react";
import { createClient } from "@/lib/supabase/server";
import TaskTracker from "./TaskTrackerClient";

type Props = {
  params: { projectId: string };
};

export default async function Page({ params }: Props) {
  const supabase = createClient();
  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .eq("project_id", params.projectId);

  return <TaskTracker params={params} initialTasks={tasks || []} />;
}
