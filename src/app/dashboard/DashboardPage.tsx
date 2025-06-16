// src/app/dashboard/DashboardPage.tsx
'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FolderIcon, PlusIcon, CheckCircle2, Clock, TrendingUp, BarChart3, Calendar } from "lucide-react";
import Link from "next/link";
import { getInitials, formatDate, calculateProgress, getPriorityColor } from "./utils/helpers";


export default function DashboardPage({
  currentUser,
  dashboardStats,
  recentProjects,
  recentTasks,
}: {
  currentUser: { id: string; full_name: string; avatar_url: string };
  dashboardStats: any;
  recentProjects: any[];
  recentTasks: any[];
}) {


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}

      {/* dashboard Content */}
      <div className="container mx-auto px-14 py-8">
        {/* welcome section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {currentUser.full_name.split(" ")[0]}! 👋
              </h1>
              <p className="text-gray-600">
                Here's what's happening with your projects today.
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/project/new">
                <Button variant="outline">
                  <FolderIcon className="h-4 w-4 mr-2" />
                  New Project
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 mb-1">
                    Total Projects
                  </p>
                  <p className="text-3xl font-bold text-blue-900">
                    {dashboardStats.totalProjects}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FolderIcon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600 mb-1">
                    Completed Tasks
                  </p>
                  <p className="text-3xl font-bold text-green-900">
                    {dashboardStats.completedTasks}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-gradient-to-br from-yellow-50 to-orange-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-600 mb-1">
                    Pending Tasks
                  </p>
                  <p className="text-3xl font-bold text-yellow-900">
                    {dashboardStats.pendingTasks}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Projects */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Recent Projects
              </h2>
              <Link href="/project">
                <Button variant="outline" size="sm">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View All Project
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {recentProjects.map((project) => (
                <Card
                  key={project.id}
                  className="border-0 shadow-sm hover:shadow-md transition-shadow bg-white"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <Link
                          href={`/project/${project.id}`}
                          className="text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
                        >
                          {project.name}
                        </Link>
                        <p className="text-gray-600 mt-1 line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                      <Badge variant="outline" className="ml-4 bg-gray-100 hover:bg-gray-200 text-gray-600 border-0 cursor-pointer">
                        {project.taskCount} tasks
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          {project.owner.avatar_url ? (
                            <AvatarImage
                              src={
                                project.owner.avatar_url || "/placeholder.svg"
                              }
                              alt={project.owner.full_name}
                            />
                          ) : (
                            <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
                              {getInitials(project.owner.full_name)}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {project.owner.full_name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Updated {formatDate(project.updated_at)}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-gray-900">
                            {calculateProgress(
                              project.completedTasks,
                              project.taskCount
                            )}
                            %
                          </span>
                        </div>
                        <Progress
                          value={calculateProgress(
                            project.completedTasks,
                            project.taskCount
                          )}
                          className="w-24 h-2"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
                  <TrendingUp className="h-5 w-5 text-indigo-600" />
                  This Week
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Tasks Completed
                    </span>
                    <span className="text-lg font-semibold text-gray-900">
                      {dashboardStats.tasksThisWeek}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Projects Active
                    </span>
                    <span className="text-lg font-semibold text-gray-900">
                      {dashboardStats.totalProjects}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Completion Rate
                    </span>
                    <span className="text-lg font-semibold text-green-600">
                      {calculateProgress(
                        dashboardStats.completedTasks,
                        dashboardStats.totalTasks
                      )}
                      %
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Tasks */}
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2 text-slate-900">
                    <Calendar className="h-5 w-5 text-indigo-600" />
                    Recent Tasks
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTasks.map((task) => (
                    <div
                      key={task.id}
                      className="border-b border-gray-100 last:border-0 pb-4 last:pb-0"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-sm font-medium text-gray-900 line-clamp-1">
                          {task.title}
                        </h4>
                        <div className="flex gap-1 ml-2">
                          <Badge
                            className={`text-xs ${getPriorityColor(
                              task.priority
                            )} bg-gray-100 hover:bg-gray-200 text-gray-600 border-0 cursor-pointer`}
                          >
                            {task.priority}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-xs text-gray-600 mb-2 line-clamp-1">
                        {task.description}
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">
                          {task.project.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          Due {formatDate(task.due_date)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
