"use client";

import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const AnimatedSelectItem = ({
  value,
  display,
  index,
}: {
  value: string;
  display: React.ReactNode;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.02 }}
  >
    <SelectItem key={value} value={value} className="text-black">
      {display}
    </SelectItem>
  </motion.div>
);

export default function NewTask() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [projects, setProjects] = useState<Array<{id: string, name: string}>>([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium", // Set default to match database default
    project_id: "",
    day: "",
    month: "",
    year: "",
    hour: "",
    minute: "",
    ampm: "",
  });
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const initializeUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Check if user exists in users table, if not create one
        const { data: existingUser, error: fetchError } = await supabase
          .from('users')
          .select('id')
          .eq('id', user.id)
          .single();

        if (fetchError && fetchError.code === 'PGRST116') {
          // User doesn't exist in users table, create one
          const { error: insertError } = await supabase
            .from('users')
            .insert([
              {
                id: user.id,
                full_name: user.user_metadata?.full_name || user.email || 'Unknown User',
                avatar_url: user.user_metadata?.avatar_url || null,
              }
            ]);

          if (insertError) {
            console.error('Error creating user profile:', insertError);
            toast.error('Failed to create user profile');
            return;
          }
        }

        setUserId(user.id);
        
        // Fetch user's projects
        const { data: projectsData, error: projectsError } = await supabase
          .from('projects')
          .select('id, name')
          .eq('owner_id', user.id);
          
        if (!projectsError && projectsData) {
          setProjects(projectsData);
        }
      }
    };

    initializeUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      return toast.error("You must be logged in to create a task!");
    }

    if (!confirmed) {
      return toast.error("Please confirm that the task details are correct!");
    }

    if (!form.title.trim()) {
      return toast.error("Task title is required!");
    }

    setLoading(true);
    
    try {
      let due_date = null;
      if (
        form.day &&
        form.month &&
        form.year &&
        form.hour &&
        form.minute &&
        form.ampm
      ) {
        const hour12 = parseInt(form.hour);
        const hour24 =
          form.ampm === "pm" && hour12 < 12
            ? hour12 + 12
            : hour12 === 12 && form.ampm === "am"
            ? 0
            : hour12;
        due_date = new Date(
          Number(form.year),
          Number(form.month) - 1,
          Number(form.day),
          hour24,
          Number(form.minute)
        );
        
        // Convert to ISO string for proper database storage
        due_date = due_date.toISOString();
      }

      // Ensure priority has a valid value
      const validPriority = form.priority || "medium";
      
      const taskData = {
        title: form.title.trim(),
        description: form.description.trim() || null,
        priority: validPriority,
        status: "todo",
        assignee_id: userId,
        due_date: due_date,
        project_id: form.project_id || null,
      };

      // Debug: log the data being sent
      console.log("Sending task data:", taskData);

      const { data, error } = await supabase.from("tasks").insert([taskData]).select();

      if (error) {
        console.error("Detailed error:", error);
        console.error("Error code:", error.code);
        console.error("Error message:", error.message);
        console.error("Error details:", error.details);
        console.error("Error hint:", error.hint);
        
        // More specific error messages
        if (error.code === '23503') {
          toast.error("Invalid project or user reference. Please try again.");
        } else if (error.code === '23514') {
          toast.error("Invalid priority or status value. Please check your selections.");
        } else {
          toast.error(`Failed to create task: ${error.message}`);
        }
      } else {
        console.log("Task created successfully:", data);
        toast.success("Task created successfully!");
        router.push(`/project/${form.project_id}/task-tracker`);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* New Task Form */}
      <div className="container mx-auto px-8 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-6">
            <Link
              href="../"
              className="text-black hover:text-gray-900 mr-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-bold text-black">New Task</h1>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-gray-300 p-6">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Task Name */}
              <div>
                <Label
                  htmlFor="task-name"
                  className="text-gray-700 font-normal"
                >
                  Task Name *
                </Label>
                <Input
                  id="task-name"
                  name="title"
                  placeholder="Enter task name"
                  className="mt-1 w-full text-gray-700 border-gray-300"
                  onChange={handleChange}
                  value={form.title}
                  required
                />
              </div>

              {/* Project Selection */}
              {projects.length > 0 && (
                <div>
                  <Label
                    htmlFor="project"
                    className={`${
                      form.project_id ? "text-gray-700" : "text-black"
                    } font-normal`}
                  >
                    Project (Optional)
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("project_id", value)
                    }
                  >
                    <SelectTrigger
                      id="project"
                      className={`mt-1 w-full bg-white ${
                        form.project_id
                          ? "text-gray-700"
                          : "text-gray-400"
                      } border-gray-300`}
                    >
                      <SelectValue placeholder="Select a project (optional)..." />
                    </SelectTrigger>
                    <SelectContent className="transition-transform duration-300 ease-in-out bg-white">
                      {projects.map((project, index) => (
                        <AnimatedSelectItem
                          key={project.id}
                          value={project.id}
                          display={project.name}
                          index={index}
                        />
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Due Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label
                    htmlFor="due-date"
                    className={`${
                      form.day || form.month || form.year
                        ? "text-gray-700"
                        : "text-black"
                    } font-normal`}
                  >
                    Due Date (Optional)
                  </Label>
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    {/* Day */}
                    <Select
                      onValueChange={(value) =>
                        handleSelectChange("day", value)
                      }
                    >
                      <SelectTrigger
                        id="day"
                        className={`bg-white ${
                          form.day ? "text-gray-700" : "text-gray-400"
                        } border-gray-300`}
                      >
                        <SelectValue placeholder="Day" />
                      </SelectTrigger>
                      <SelectContent className="transition-transform duration-300 ease-in-out bg-white">
                        {Array.from({ length: 31 }, (_, i) => i + 1).map(
                          (day, index) => (
                            <AnimatedSelectItem
                              key={day}
                              value={day.toString()}
                              display={day}
                              index={index}
                            />
                          )
                        )}
                      </SelectContent>
                    </Select>

                    <Select
                      onValueChange={(value) =>
                        handleSelectChange("month", value)
                      }
                    >
                      <SelectTrigger
                        id="month"
                        className={`bg-white ${
                          form.month
                            ? "text-gray-700"
                            : "text-gray-400"
                        } border-gray-300`}
                      >
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent className="transition-transform duration-300 ease-in-out bg-white">
                        {[
                          "Jan",
                          "Feb",
                          "Mar",
                          "Apr",
                          "May",
                          "Jun",
                          "Jul",
                          "Aug",
                          "Sep",
                          "Oct",
                          "Nov",
                          "Dec",
                        ].map((month, index) => (
                          <AnimatedSelectItem
                            key={month}
                            value={(index + 1).toString()}
                            display={month}
                            index={index}
                          />
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      onValueChange={(value) =>
                        handleSelectChange("year", value)
                      }
                    >
                      <SelectTrigger
                        id="year"
                        className={`bg-white ${
                          form.year
                            ? "text-gray-700"
                            : "text-gray-400"
                        } border-gray-300`}
                      >
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent className="transition-transform duration-300 ease-in-out bg-white">
                        {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() + i).map((year, index) => (
                          <AnimatedSelectItem
                            key={year}
                            value={year.toString()}
                            display={year}
                            index={index}
                          />
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="due-time"
                    className={`${
                      form.hour ||
                      form.minute ||
                      form.ampm
                        ? "text-gray-700"
                        : "text-black"
                    } font-normal`}
                  >
                    Due Time (Optional)
                  </Label>
                  <div className="grid grid-cols-3 gap-4 mt-1">
                    <Select
                      onValueChange={(value) =>
                        handleSelectChange("hour", value)
                      }
                    >
                      <SelectTrigger
                        id="hour"
                        className={`bg-white ${
                          form.hour
                            ? "text-gray-700"
                            : "text-gray-400"
                        } border-gray-300`}
                      >
                        <SelectValue placeholder="Hour" />
                      </SelectTrigger>
                      <SelectContent className="transition-transform duration-300 ease-in-out bg-white">
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(
                          (hour, index) => (
                            <AnimatedSelectItem
                              key={hour}
                              value={hour.toString()}
                              display={hour}
                              index={index}
                            />
                          )
                        )}
                      </SelectContent>
                    </Select>

                    <Select
                      onValueChange={(value) =>
                        handleSelectChange("minute", value)
                      }
                    >
                      <SelectTrigger
                        id="minute"
                        className={`bg-white ${
                          form.minute
                            ? "text-gray-700"
                            : "text-gray-400"
                        } border-gray-300`}
                      >
                        <SelectValue placeholder="Minutes" />
                      </SelectTrigger>
                      <SelectContent className="transition-transform duration-300 ease-in-out bg-white">
                        {["00", "15", "30", "45"].map((minute, index) => (
                          <AnimatedSelectItem
                            key={minute}
                            value={minute}
                            display={minute}
                            index={index}
                          />
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      onValueChange={(value) =>
                        handleSelectChange("ampm", value)
                      }
                    >
                      <SelectTrigger
                        id="am-pm"
                        className={`bg-white ${
                          form.ampm
                            ? "text-gray-700"
                            : "text-gray-400"
                        } border-gray-300`}
                      >
                        <SelectValue placeholder="AM" />
                      </SelectTrigger>
                      <SelectContent className="bg-white transition-transform duration-300 ease-in-out">
                        {["AM", "PM"].map((period, index) => (
                          <AnimatedSelectItem
                            key={period}
                            value={period.toLowerCase()}
                            display={period}
                            index={index}
                          />
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Task Priority */}
              <div>
                <Label
                  htmlFor="task-priority"
                  className="text-gray-700 font-normal"
                >
                  Task Priority
                </Label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange("priority", value)
                  }
                  value={form.priority}
                >
                  <SelectTrigger
                    id="task-priority"
                    className="mt-1 w-full bg-white text-gray-700 border-gray-300"
                  >
                    <SelectValue placeholder="Select Task Priority..." />
                  </SelectTrigger>
                  <SelectContent className="transition-transform duration-300 ease-in-out bg-white">
                    {[
                      { value: "high", label: "High" },
                      { value: "medium", label: "Medium" },
                      { value: "low", label: "Low" }
                    ].map((priority, index) => (
                      <AnimatedSelectItem
                        key={priority.value}
                        value={priority.value}
                        display={priority.label}
                        index={index}
                      />
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Task Description */}
              <div>
                <Label
                  htmlFor="task-description"
                  className="text-black font-normal"
                >
                  Task Description (Optional)
                </Label>
                <Textarea
                  id="task-description"
                  name="description"
                  placeholder="Enter task description"
                  className="mt-1 w-full h-32 text-black border-gray-300"
                  value={form.description}
                  onChange={handleChange}
                />
              </div>

              {/* Confirmation Checkbox */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="confirm"
                  className="border-gray-300 text-gray-700"
                  checked={confirmed}
                  onCheckedChange={(checked) => setConfirmed(checked as boolean)}
                />
                <label
                  htmlFor="confirm"
                  className="text-gray-700 text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I'm sure this task is correct
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gray-800 hover:bg-black text-white cursor-pointer"
                disabled={loading || !confirmed}
              >
                {loading ? "Creating Task..." : "Save Task"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}