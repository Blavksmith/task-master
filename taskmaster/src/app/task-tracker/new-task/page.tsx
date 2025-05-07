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

export default function NewTask() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}

      {/* New Task Form */}
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-6">
            <Link
              href="/task-tracker"
              className="text-gray-500 hover:text-gray-700 mr-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">New Task</h1>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <form className="space-y-6">
              {/* Task Name */}
              <div>
                <Label htmlFor="task-name" className="text-gray-700">
                  Task Name
                </Label>
                <Input
                  id="task-name"
                  placeholder="Enter task name"
                  className="mt-1 w-full text-gray-900"
                />
              </div>

              {/* Due Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="due-date" className="text-gray-700">
                    Due Date
                  </Label>
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    <Select>
                      <SelectTrigger id="day">
                        <SelectValue placeholder="Day" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 31 }, (_, i) => i + 1).map(
                          (day) => (
                            <SelectItem key={day} value={day.toString()}>
                              {day}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>

                    <Select>
                      <SelectTrigger id="month">
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
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
                          <SelectItem
                            key={month}
                            value={(index + 1).toString()}
                          >
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select>
                      <SelectTrigger id="year">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {[2023, 2024, 2025, 2026, 2027].map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="due-time" className="text-gray-700">
                    Due Time
                  </Label>
                  <div className="grid grid-cols-4 gap-2 mt-1">
                    <Select>
                      <SelectTrigger id="hour">
                        <SelectValue placeholder="Hour" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(
                          (hour) => (
                            <SelectItem key={hour} value={hour.toString()}>
                              {hour}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>

                    <Select>
                      <SelectTrigger id="minute">
                        <SelectValue placeholder="Minutes" />
                      </SelectTrigger>
                      <SelectContent>
                        {["00", "15", "30", "45"].map((minute) => (
                          <SelectItem key={minute} value={minute}>
                            {minute}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select>
                      <SelectTrigger id="am-pm">
                        <SelectValue placeholder="AM" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="am">AM</SelectItem>
                        <SelectItem value="pm">PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Task Priority */}
              <div>
                <Label htmlFor="task-priority" className="text-gray-700">
                  Task Priority
                </Label>
                <Select>
                  <SelectTrigger id="task-priority" className="mt-1 w-full">
                    <SelectValue placeholder="Please Choose your Task Priority..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Task Category */}
              <div>
                <Label htmlFor="task-category" className="text-gray-700">
                  Task Category
                </Label>
                <Select>
                  <SelectTrigger id="task-category" className="mt-1 w-full">
                    <SelectValue placeholder="Please Choose your Task Category..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="research">Research</SelectItem>
                    <SelectItem value="documentation">Documentation</SelectItem>
                    <SelectItem value="testing">Testing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Task Description */}
              <div>
                <Label htmlFor="task-description" className="text-gray-700">
                  Task Description
                </Label>
                <Textarea
                  id="task-description"
                  placeholder="Enter task description"
                  className="mt-1 w-full h-32"
                />
              </div>

              {/* Confirmation Checkbox */}
              <div className="flex items-center space-x-2">
                <Checkbox id="confirm" />
                <label
                  htmlFor="confirm"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I'm sure this task is Correct
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gray-700 hover:bg-gray-800"
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
