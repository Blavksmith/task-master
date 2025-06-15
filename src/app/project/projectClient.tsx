"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { projectService } from "@/services/projectService";
import { Project } from "@/types/database";
import {
  ArrowUpDown,
  PlusIcon,
  Search,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Session } from "@supabase/auth-helpers-nextjs";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ProjectPageClient({ session }: { session: Session }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const user = session.user;

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const data = await projectService.getProjectsByUser(user.id);
      setProjects(data);
      setLoading(false);
    };

    fetchProjects();
  }, [user.id]);

  const filtered = projects
    .filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Projects</h1>
            <p className="text-gray-600">
              Manage and track all your team's projects
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <Link href="/project/new">
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <PlusIcon className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
              }
              className="h-10 w-10"
            >
              <ArrowUpDown
                className={`h-4 w-4 transition ${
                  sortOrder === "asc" ? "rotate-180" : ""
                }`}
              />
            </Button>
          </div>
        </div>

        {/* Project Cards */}
        {loading ? (
          <p>Loading projects...</p>
        ) : filtered.length === 0 ? (
          <p className="text-gray-500">No projects found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <Link href={`/project/${project.id}`} key={project.id} className="group">
                <Card className="h-full transition-all duration-200 hover:border-indigo-300 hover:shadow-md">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl group-hover:text-indigo-600 transition-colors">
                      {project.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7 border-2 border-white">
                          <AvatarFallback className="bg-indigo-100 text-indigo-600 text-xs">
                            {getInitials(project.owner?.name || "U")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-gray-700">
                          {project.owner?.full_name || "Unknown"}
                        </span>
                      </div>
                      <span className="text-gray-500">
                        Created {formatDate(project.created_at)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
