"use client";

import Link from "next/link";
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
import { useState } from "react";

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
  const [selectedValues, setSelectedValues] = useState({
    day: "",
    month: "",
    year: "",
    hour: "",
    minute: "",
    ampm: "",
    priority: "",
    category: "",
  });

  const handleSelectChange = (field: string, value: string) => {
    setSelectedValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}

      {/* New Task Form */}
      <div className="container mx-auto px-10 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-6">
            <Link
              href="/task-tracker"
              className="text-black hover:text-gray-900 mr-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-bold text-black">New Task</h1>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-gray-300 p-6">
            <form className="space-y-6">
              {/* Task Name */}
              <div>
                <Label
                  htmlFor="task-name"
                  className="text-gray-700 font-normal"
                >
                  Task Name
                </Label>
                <Input
                  id="task-name"
                  placeholder="Enter task name"
                  className="mt-1 w-full text-gray-700 border-gray-300"
                />
              </div>

              {/* Due Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label
                    htmlFor="due-date"
                    className={`${
                      selectedValues.day ||
                      selectedValues.month ||
                      selectedValues.year
                        ? "text-gray-700"
                        : "text-black"
                    } font-normal`}
                  >
                    Due Date
                  </Label>
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    <Select
                      onValueChange={(value) =>
                        handleSelectChange("day", value)
                      }
                    >
                      <SelectTrigger
                        id="day"
                        className={`bg-white ${
                          selectedValues.day ? "text-gray-700" : "text-gray-400"
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
                          selectedValues.month
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
                          selectedValues.year
                            ? "text-gray-700"
                            : "text-gray-400"
                        } border-gray-300`}
                      >
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent className="transition-transform duration-300 ease-in-out bg-white">
                        {[2023, 2024, 2025, 2026, 2027].map((year, index) => (
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
                      selectedValues.hour ||
                      selectedValues.minute ||
                      selectedValues.ampm
                        ? "text-gray-700"
                        : "text-black"
                    } font-normal`}
                  >
                    Due Time
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
                          selectedValues.hour
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
                          selectedValues.minute
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
                          selectedValues.ampm
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
                  className={`${
                    selectedValues.priority ? "text-gray-700" : "text-black"
                  } font-normal`}
                >
                  Task Priority
                </Label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange("priority", value)
                  }
                >
                  <SelectTrigger
                    id="task-priority"
                    className={`mt-1 w-full bg-white ${
                      selectedValues.priority
                        ? "text-gray-700"
                        : "text-gray-400"
                    } border-gray-300`}
                  >
                    <SelectValue placeholder="Please Choose your Task Priority..." />
                  </SelectTrigger>
                  <SelectContent className="transition-transform duration-300 ease-in-out bg-white">
                    {["High", "Medium", "Low"].map((priority, index) => (
                      <AnimatedSelectItem
                        key={priority}
                        value={priority.toLowerCase()}
                        display={priority}
                        index={index}
                      />
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Task Category */}
              <div>
                <Label
                  htmlFor="task-category"
                  className={`${
                    selectedValues.category ? "text-gray-700" : "text-black"
                  } font-normal`}
                >
                  Task Category
                </Label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange("category", value)
                  }
                >
                  <SelectTrigger
                    id="task-category"
                    className={`mt-1 w-full bg-white ${
                      selectedValues.category
                        ? "text-gray-700"
                        : "text-gray-400"
                    } border-gray-300`}
                  >
                    <SelectValue placeholder="Please Choose your Task Category..." />
                  </SelectTrigger>
                  <SelectContent className="bg-white transition-transform duration-300 ease-in-out">
                    {[
                      "Development",
                      "Design",
                      "Research",
                      "Documentation",
                      "Testing",
                    ].map((category, index) => (
                      <AnimatedSelectItem
                        key={category}
                        value={category.toLowerCase()}
                        display={category}
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
                  Task Description
                </Label>
                <Textarea
                  id="task-description"
                  placeholder="Enter task description"
                  className="mt-1 w-full h-32 text-black border-gray-300"
                />
              </div>

              {/* Confirmation Checkbox */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="confirm"
                  className="border-gray-300 text-gray-700"
                />
                <label
                  htmlFor="confirm"
                  className="text-gray-700 text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I'm sure this task is Correct
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gray-800 hover:bg-black text-white cursor-pointer"
              >
                Save Task
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
