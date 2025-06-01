import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

function Dashboard() {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-10 py-10">
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
                <CardTitle className="text-lg">Team Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-indigo-100 text-indigo-600 text-xs">
                      SC
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      Sarah Chen completed a task
                    </p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Project Progress</CardTitle>
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
                  <Progress value={75} className="h-2" />
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
