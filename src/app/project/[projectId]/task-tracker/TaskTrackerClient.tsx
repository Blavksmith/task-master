"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState, useTransition } from "react";
import { PlusIcon } from "lucide-react";
import TaskCard from "@/components/TaskCard";
import { supabase } from "@/lib/supabaseClient";

type Task = {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  project_id: string;
};

export default function TaskTracker({
  params,
  initialTasks,
}: {
  params: { projectId: string };
  initialTasks: Task[];
}) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isPending, startTransition] = useTransition();

  const updateTaskStatus = async (taskId: string, newStatus: string) => {
    // Optimistic update
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    try {
      const { error } = await supabase
        .from("tasks")
        .update({ status: newStatus })
        .eq("id", taskId);

      if (error) {
        console.error("Error updating task:", error);
        // Revert optimistic update on error
        setTasks((prev) =>
          prev.map((task) =>
            task.id === taskId ? { ...task, status: task.status } : task
          )
        );
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (taskId: string) => {
    // Optimistic update
    setTasks((prev) => prev.filter((task) => task.id !== taskId));

    try {
      const { error } = await supabase.from("tasks").delete().eq("id", taskId);

      if (error) {
        console.error("Error deleting task:", error);
        // Revert optimistic update on error - you might want to refetch data here
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleTaskAction = (taskId: string, currentStatus: string) => {
    startTransition(() => {
      if (currentStatus === "todo") {
        updateTaskStatus(taskId, "in_progress");
      } else if (currentStatus === "in_progress") {
        updateTaskStatus(taskId, "done");
      } else if (currentStatus === "done") {
        deleteTask(taskId);
      }
    });
  };

  const todo = tasks?.filter((task) => task.status === "todo") || [];
  const inProgress =
    tasks?.filter((task) => task.status === "in_progress") || [];
  const done = tasks?.filter((task) => task.status === "done") || [];

  return (
    <div>
      <div className="min-h-screen bg-gray-50">
        {/* Nav */}

        {/* Task Tracker Header */}
        <div className="container mx-auto px-8 py-10">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Task Tracker</h1>
            <Link href={`/project/${params.projectId}/task-tracker/new-task`}>
              <Button className="bg-indigo-500 hover:bg-indigo-600 cursor-pointer">
                <PlusIcon className="h-4 w-4 mr-2" />
                <span>Add Task</span>
              </Button>
            </Link>
          </div>

          {/* Kanban Board */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Todo */}
            <TaskCard
              title="Todo"
              tasks={todo}
              onTaskAction={handleTaskAction}
              isPending={isPending}
            />

            {/* In Progress */}
            <TaskCard
              title="In-Progress"
              tasks={inProgress}
              onTaskAction={handleTaskAction}
              isPending={isPending}
            />

            {/* Done */}
            <TaskCard
              title="Done"
              tasks={done}
              onTaskAction={handleTaskAction}
              isPending={isPending}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
