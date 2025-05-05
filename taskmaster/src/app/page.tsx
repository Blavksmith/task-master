import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FeatureCard from "./components/FeatureCard";

export const features = [
  {
    title: "Set Task Priorities",
    paragraph:
      "Easily prioritize tasks with our intuitive priority system. Mark tasks as high, medium, or low priority to stay focused on what matters most.",
  },
  {
    title: "Task Tracker",
    paragraph:
      "Monitor task progress in real-time. Track completion rates, time spent, and milestone achievements with detailed insights.",
  },
  {
    title: "Notification & Reminder",
    paragraph:
      "Never miss a deadline with smart notifications and customizable reminders for tasks and important updates.",
  },
  {
    title: "Custom Roles & Permissions",
    paragraph:
      "Define custom roles and set granular permissions to ensure the right people have access to the right features.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <header className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gray-200 rounded-md"></div>
          <span className="font-semibold text-xl">TaskMaster</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium">
            Features
          </Link>
          <Link href="#solutions" className="text-sm font-medium">
            Solutions
          </Link>
          <Link href="#resources" className="text-sm font-medium">
            Resources
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-white">
            Log in
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700">Sign Up</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <h1 className="text-5xl font-bold leading-tight">
              Manage tasks
              <br />
              with clarity and
              <br />
              confidence
            </h1>
            <div className="w-16 h-1 bg-gray-600"></div>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              Start for free
            </Button>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className="flex">
                <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                <div className="w-6 h-6 bg-gray-400 rounded-full -ml-2"></div>
                <div className="w-6 h-6 bg-gray-500 rounded-full -ml-2"></div>
              </div>
              <p>Join 10,000+ teams already using TaskFlow</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <Card className="bg-white text-black border-0">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-600"
                    >
                      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                    </svg>
                  </div>
                  <CardTitle className="text-xl">Set Task Priorities</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Easily prioritize tasks with our intuitive priority system.
                  Mark tasks as high, medium, or low priority to stay focused on
                  what matters most.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white text-black border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Todo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <p className="font-medium">Design User Dashboard</p>
                    <Badge className="bg-red-100 text-red-600 hover:bg-red-100">
                      High
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">
                    Create wireframes and mockups for the main dashboard
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <p className="font-medium">API Integration</p>
                    <Badge className="bg-yellow-100 text-yellow-600 hover:bg-yellow-100">
                      Medium
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">
                    Implement REST API endpoints for user authentication
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-100 text-black border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Tasks Due Soon</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium">Today</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm">3 tasks due</p>
                    <Badge className="bg-red-500 text-white hover:bg-red-600">
                      High Priority
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Feature section  */}
      <section className="bg-white text-black py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 - 4 */}
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                paragraph={feature.paragraph}
              ></FeatureCard>
            ))}

            {/* Empty div for grid alignment */}
            <div className="hidden md:block"></div>
          </div>

          <div className="flex justify-center mt-12">
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              Get Started Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
