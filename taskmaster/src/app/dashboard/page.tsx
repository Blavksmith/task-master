import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import React from "react";

function Dashboard() {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-8 py-10">
          {/* welcome section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome Back, Daud!
            </h1>
            <p className="text-gray-600">You have 5 tasks due this week!</p>
          </div>

          {/* three cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* task due soon card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-gray-900">Task Due Soon</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-md bg-gray-100 w-full p-4">
                    <div className="flex flex-col justify-between">
                      <p className="font-semibold text-gray-900">Today</p>
                      <span className="text-sm text-gray-600">3 Task Due</span>
                    </div>

                    <Badge className="text-white p-1.5 bg-red-500 hover:bg-red-600">
                      High Priority
                    </Badge>
                  </div>
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 cursor-pointer">
                    List View
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Team activity */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-gray-900">Team Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-indigo-100 text-indigo-600 text-xs">
                      SC
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 font-semibold">
                      Sarah Chen completed a task
                    </p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                  
                </div>
              </CardContent>
            </Card>

            {/* Progress card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-gray-900">Project Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900">
                      Website Redesign
                    </p>
                    <span className="text-sm font-semibold text-gray-900">
                      75%
                    </span>
                  </div>
                  <Progress value={70} className="bg-gray-200 [&>div]:bg-lime-500 h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            {/* Task 1 */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Redesign dashboard UI
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span>Due 2024-02-15</span>
                      <span>Assigned to Sarah Chen</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
                      High
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                      in-progress
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs">
                    design
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    ui
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Task 2 */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      API documentation update
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span>Due 2024-02-20</span>
                      <span>Assigned to Mike Ross</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                      medium
                    </Badge>
                    <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
                      todo
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs">
                    documentation
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
