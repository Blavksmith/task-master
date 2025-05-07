import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { PlusIcon } from "lucide-react";
import TaskCard from "@/components/TaskCard";

function TaskTracker() {
  return (
    <div>
      <div className="min-h-screen bg-gray-50">
        {/* Nav */}

        {/* Task Tracker Header */}
        <div className="container mx-auto px-4 py-10">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Task Tracker</h1>
            <Link href="/task-tracker/new-task">
              <Button className="bg-indigo-500 bg:indigo-600">
                <PlusIcon className="h-4 w-4 mr-2" />
                <span>Add Task</span>
              </Button>
            </Link>
          </div>

          {/* Kanban Board */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Todo */}
            <TaskCard title="Todo" />

            {/* In Progress */}
            <TaskCard title="In-Progress" />

            {/* Done */}
            <TaskCard title="Done" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskTracker;
