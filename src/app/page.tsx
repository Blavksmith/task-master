import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FeatureCard from "../components/FeatureCard";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const features = [
  {
    title: "Set Task Priorities",
    paragraph:
      "Easily prioritize tasks with our intuitive priority system. Mark tasks as high, medium, or low priority to stay focused on what matters most.",
    firstPath:
      "m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z",
  },
  {
    title: "Task Tracker",
    paragraph:
      "Monitor task progress in real-time. Track completion rates, time spent, and milestone achievements with detailed insights.",
    firstPath: "M3 3v18h18",
    secondPath: "m19 9-5 5-4-4-3 3",
  },
  {
    title: "Notification & Reminder",
    paragraph:
      "Never miss a deadline with smart notifications and customizable reminders for tasks and important updates.",
    firstPath: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9",
    secondPath: "M10.3 21a1.94 1.94 0 0 0 3.4 0",
  },
  {
    title: "Custom Roles & Permissions",
    paragraph:
      "Define custom roles and set granular permissions to ensure the right people have access to the right features.",
    firstPath:
      "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 3a4 4 0 1 0 0.001 8.001A4 4 0 0 0 9 3",
    secondPath: "M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
    circlePath: "",
  },
];

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 🔁 Jika sudah login, redirect ke dashboard
  if (session) {
    redirect("/dashboard");
  }


  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}

      {/* Hero Section */}
      <section className="container mx-auto px-8 py-12">
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
            <Button className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer">
              Start for free
            </Button>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className="flex">
                <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                <div className="w-6 h-6 bg-gray-400 rounded-full -ml-2"></div>
                <div className="w-6 h-6 bg-gray-500 rounded-full -ml-2"></div>
              </div>
              <p>Join 10,000+ teams already using TaskMaster</p>
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
      <section className="bg-white text-black py-16 space-y-16">
        <div className="container mx-auto px-14">
          {/* Feature header */}
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">Why Choose TaskMaster?</h2>
            <p className="text-gray-600">
              Discover the powerful features that make task management a breeze.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Feature 1 - 4 */}
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                paragraph={feature.paragraph}
                firstPath={feature.firstPath}
                secondPath={feature.secondPath || ""}
              ></FeatureCard>
            ))}

            {/* Empty div for grid alignment */}
            <div className="hidden md:block"></div>
          </div>

          <div className="flex justify-center mt-12">
            <Button className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white">
              Get Started Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
