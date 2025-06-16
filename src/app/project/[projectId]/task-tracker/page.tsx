import React from "react";
import { createClient } from "@/lib/supabase/server";
import TaskTracker from "./TaskTrackerClient";

interface PageProps {
  params: Promise<{ projectId: string }>;
}

export default async function Page({ params }: PageProps) {
  // Await params karena sekarang ini adalah Promise di Next.js 15
  const { projectId } = await params;
  
  const supabase = createClient();
  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .eq("project_id", projectId);

  return <TaskTracker params={{ projectId }} initialTasks={tasks || []} />;
}