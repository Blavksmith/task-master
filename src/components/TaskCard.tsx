"use client";
import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ArrowRightIcon, TrashIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type Task = {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
};

function TaskCard({ 
  title, 
  tasks, 
  onTaskAction,
  isPending 
}: { 
  title: string; 
  tasks: Task[];
  onTaskAction: (taskId: string, currentStatus: string) => void;
  isPending: boolean;
}) {
  const getButtonText = (status: string) => {
    switch (status) {
      case "todo":
        return "Move to Progress";
      case "in_progress":
        return "Move to Done";
      case "done":
        return "Delete Task";
      default:
        return "";
    }
  };

  const getButtonIcon = (status: string) => {
    if (status === "done") {
      return <TrashIcon className="h-4 w-4 mr-2" />;
    }
    return <ArrowRightIcon className="h-4 w-4 mr-2" />;
  };

  const getButtonStyle = (status: string) => {
    if (status === "done") {
      return "bg-red-500 hover:bg-red-600 text-white";
    }
    return "bg-indigo-500 hover:bg-indigo-600 text-white";
  };

  return (
    <div>
      <div className="flex flex-col bg-white rounded-lg shadow p-4">
        <div className="flex border-gray-200 p-4 justify-between items-center w-full">
          <h2 className="font-semibold text-gray-800">{title}</h2>
          <Badge className="bg-gray-200 hover:bg-gray-300 font-semibold text-gray-800 w-8 h-8">
            {tasks.length}
          </Badge>
        </div>

        <div className="p-4 space-y-8">
          <AnimatePresence mode="popLayout">
            {tasks.map((task) => (
<motion.div
  key={task.id}
  initial={{ opacity: 0, y: 10, scale: 0.98 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  exit={{ opacity: 0, y: 10, scale: 0.95 }}
  transition={{ duration: 0.15, ease: "easeInOut" }}
  className="bg-white border border-gray-200 rounded-lg p-4 mb-3 shadow-sm"
>

                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900">{task.title}</h3>
                  <Badge
                    className={
                      task.priority === "high"
                        ? "bg-red-200 text-red-600"
                        : task.priority === "medium"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-green-100 text-green-600"
                    }
                  >
                    {task.priority}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{task.description}</p>

                <div className="flex justify-end mt-4">
                  <Button
                    onClick={() => onTaskAction(task.id, task.status)}
                    className={`${getButtonStyle(task.status)} transition-all duration-200 ease-in-out`}
                    disabled={isPending}
                    size="sm"
                  >
                    {getButtonIcon(task.status)}
                    <span className="text-xs">{getButtonText(task.status)}</span>
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
