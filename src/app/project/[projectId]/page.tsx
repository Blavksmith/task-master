"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusIcon, Calendar, User, Clock, FileText } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import { useParams } from "next/navigation"

// Util: Format date
const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

type ProjectWithOwner = {
  id: string
  name: string
  description: string
  owner: {
    id: string
    name: string
    initials: string
    role?: string
  }
  created_at: string
  updated_at: string
}

type Task = {
  id: string
  title: string
  created_at: string
}

export default function ProjectDetailPage() {
  const params = useParams()
  const projectId = params.projectId as string
  const [project, setProject] = useState<ProjectWithOwner | null>(null)
  const [recentTasks, setRecentTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true)

      const { data: projectData, error: projectError } = await supabase
        .from("projects")
        .select("*")
        .eq("id", params.projectId)
        .single()

      if (projectError || !projectData) {
        console.error("Error fetching project:", projectError?.message)
        setProject(null)
        setLoading(false)
        return
      }

      const { data: ownerData, error: ownerError } = await supabase
        .from("users")
        .select("id, full_name")
        .eq("id", projectData.owner_id)
        .single()

      const formattedProject: ProjectWithOwner = {
        ...projectData,
        owner: {
          id: ownerData?.id ?? "",
          name: ownerData?.full_name ?? "Unknown",
          initials: ownerData?.full_name
            ? ownerData.full_name
                .split(" ")
                .map((n: string) => n[0])
                .join("")
                .toUpperCase()
            : "??",
        },
      }

      setProject(formattedProject)

      const { data: tasks } = await supabase
        .from("tasks")
        .select("id, title, created_at")
        .eq("project_id", params.projectId)
        .order("created_at", { ascending: false })
        .limit(3)

      setRecentTasks(tasks ?? [])
      setLoading(false)
    }

    fetchProject()
  }, [params.projectId])

  if (loading || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-600">Loading project...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-14 py-8">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Link href="/project" className="text-sm text-slate-500 hover:text-slate-700">
                  Projects
                </Link>
                <span className="text-slate-400">/</span>
                <span className="text-sm text-slate-900">{project.name}</span>
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{project.name}</h1>
              <p className="text-slate-700 mb-4 max-w-3xl">{project.description}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  Owner: {project.owner.name}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Created: {formatDate(project.created_at)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Last updated: {formatDate(project.updated_at)}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link href={`/project/${params.projectId}/task-tracker`}>
                <Button variant="outline">Task Tracker</Button>
              </Link>
              <Link href={`/project/${params.projectId}/task-tracker/new-task`}>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
          </TabsList>

          {/* Overview Content */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-white shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg text-slate-900">Project Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700">{project.description}</p>
                  </CardContent>
                </Card>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-slate-900">Recent Tasks</h2>
                    <Link href={`/project/${params.projectId}/task-tracker`}>
                      <Button variant="outline" size="sm">
                        View All Tasks
                      </Button>
                    </Link>
                  </div>

                  <Card className="bg-white shadow-sm">
                    <CardContent className="p-6">
                      {recentTasks.length === 0 ? (
                        <div className="text-center">
                          <p className="text-slate-600 mb-4">No tasks have been created for this project yet.</p>
                          <Link href={`/project/${params.projectId}/task-tracker/new-task`}>
                            <Button className="bg-blue-600 hover:bg-blue-700">
                              <PlusIcon className="h-4 w-4 mr-2" />
                              Create First Task
                            </Button>
                          </Link>
                        </div>
                      ) : (
                        <ul className="space-y-2">
                          {recentTasks.map((task) => (
                            <li key={task.id} className="space-y-1 p-3 rounded-md border border-slate-200">
                              <div className="flex justify-between items-center">
                                <p className="font-medium text-slate-800">{task.title}</p>
                              </div>
                              <div className="flex justify-between text-xs text-slate-500">
                                <span>{formatDate(task.created_at)}</span>
                                <Link
                                  href={`/project/${projectId}/task-tracker`}
                                  className="hover:underline text-blue-600"
                                >
                                  View →
                                </Link>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card className="bg-white shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg text-slate-900">Project Owner</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-blue-100 text-blue-600">{project.owner.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-slate-900">{project.owner.name}</p>
                        <p className="text-sm text-slate-500">Project Owner</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg text-slate-900">Project Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-slate-500">Created</p>
                        <p className="font-medium text-slate-900">{formatDate(project.created_at)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Last Updated</p>
                        <p className="font-medium text-slate-900">{formatDate(project.updated_at)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Project ID</p>
                        <p className="font-medium text-slate-900">{project.id}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 mx-auto text-slate-400 mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-2">View Task Tracker</h3>
                  <p className="text-slate-600 mb-4">Manage all tasks for this project in the task tracker</p>
                  <Link href={`/project/${params.projectId}/task-tracker`}>
                    <Button className="bg-blue-600 hover:bg-blue-700">Go to Task Tracker</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
