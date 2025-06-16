"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { projectService } from "@/services/projectService"
import type { Project } from "@/types/database"
import { ArrowUpDown, PlusIcon, Search, FolderOpen, Calendar, Sparkles, Grid3X3, List } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { Session } from "@supabase/auth-helpers-nextjs"

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export default function ProjectPageClient({ session }: { session: Session }) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const user = session.user

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true)
      const data = await projectService.getProjectsByUser(user.id)
      setProjects(data)
      setLoading(false)
    }

    fetchProjects()
  }, [user.id])

  const filtered = projects
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA
    })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-14 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">

                <div>
                  <h1 className="text-3xl font-bold text-slate-900">Project Overview</h1>
                  
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-slate-700 font-medium">{projects.length} Total Projects</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/project/new">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  New Project
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* filters*/}
        <div className="mb-8">
          <div className="">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search projects by name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400"
                />
              </div>

              {/* Controls */}
              <div className="flex gap-3">
                {/* View Mode Toggle */}
                <div className="flex border border-slate-200 rounded-lg p-1 bg-slate-50">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={`h-8 px-3 ${
                      viewMode === "grid"
                        ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={`h-8 px-3 ${
                      viewMode === "list"
                        ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>

                {/* Sort Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))}
                  className="h-11 px-4 border-slate-200 text-white hover:bg-slate-400"
                >
                  <ArrowUpDown className={`h-4 w-4 mr-2 transition ${sortOrder === "asc" ? "rotate-180" : ""}`} />
                  {sortOrder === "asc" ? "Oldest First" : "Newest First"}
                </Button>
              </div>
            </div>

            {/* Search Results Info */}
            {search && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-sm text-slate-600">
                  {filtered.length === 0 ? (
                    <>
                      No projects found matching <span className="font-medium text-slate-900">"{search}"</span>
                    </>
                  ) : (
                    <>
                      Found {filtered.length} project{filtered.length !== 1 ? "s" : ""} matching{" "}
                      <span className="font-medium text-slate-900">"{search}"</span>
                    </>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Projects Content */}
        {filtered.length === 0 ? (
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FolderOpen className="h-10 w-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                {search ? "No projects found" : "No projects yet"}
              </h3>
              <p className="text-slate-600 mb-6 max-w-md mx-auto">
                {search
                  ? "Try adjusting your search terms or create a new project."
                  : "Get started by creating your first project and start organizing your work."}
              </p>
              <Link href="/project/new">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Create Your First Project
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : viewMode === "grid" ? (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <Link href={`/project/${project.id}`} key={project.id} className="group">
                <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 shadow-lg bg-white/80 backdrop-blur-sm group-hover:bg-white">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {project.name}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50">
                            <Sparkles className="h-3 w-3 mr-1" />
                            Active
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-6 line-clamp-3 leading-relaxed">
                      {project.description || "No description provided"}
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-7 w-7 border-2 border-white shadow-sm">
                            <AvatarFallback className="bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-700 text-xs font-semibold">
                              {getInitials(project.owner?.name || "U")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-slate-700 font-medium">{project.owner?.full_name || "Unknown"}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Calendar className="h-3 w-3" />
                        <span>Created {formatDate(project.created_at)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="flex flex-col gap-6">
            {filtered.map((project) => (
              <Link href={`/project/${project.id}`} key={project.id} className="group">
                <Card className="transition-all duration-300 hover:shadow-lg border-0 shadow-md bg-white/80 backdrop-blur-sm group-hover:bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                          <FolderOpen className="h-6 w-6 text-blue-600" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                            {project.name}
                          </h3>
                          <p className="text-slate-600 line-clamp-1 mt-1">
                            {project.description || "No description provided"}
                          </p>

                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-5 w-5">
                                <AvatarFallback className="bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-700 text-xs">
                                  {getInitials(project.owner?.name || "U")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm text-slate-600">{project.owner?.full_name || "Unknown"}</span>
                            </div>

                            <div className="flex items-center gap-1 text-xs text-slate-500">
                              <Calendar className="h-3 w-3" />
                              <span>{formatDate(project.created_at)}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50">
                          Active
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { projectService } from "@/services/projectService";
// import { Project } from "@/types/database";
// import {
//   ArrowUpDown,
//   PlusIcon,
//   Search,
// } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Session } from "@supabase/auth-helpers-nextjs";

// function getInitials(name: string) {
//   return name
//     .split(" ")
//     .map((part) => part[0])
//     .join("")
//     .toUpperCase();
// }

// function formatDate(dateStr: string) {
//   return new Date(dateStr).toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//   });
// }

// export default function ProjectPageClient({ session }: { session: Session }) {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

//   const user = session.user;

//   useEffect(() => {
//     const fetchProjects = async () => {
//       setLoading(true);
//       const data = await projectService.getProjectsByUser(user.id);
//       setProjects(data);
//       setLoading(false);
//     };

//     fetchProjects();
//   }, [user.id]);

//   const filtered = projects
//     .filter((p) =>
//       p.name.toLowerCase().includes(search.toLowerCase())
//     )
//     .sort((a, b) => {
//       const dateA = new Date(a.created_at).getTime();
//       const dateB = new Date(b.created_at).getTime();
//       return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
//     });

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">Projects</h1>
//             <p className="text-gray-600">
//               Manage and track all your team's projects
//             </p>
//           </div>
//           <div className="flex items-center gap-3 mt-4 md:mt-0">
//             <Link href="/project/new">
//               <Button className="bg-indigo-600 hover:bg-indigo-700">
//                 <PlusIcon className="h-4 w-4 mr-2" />
//                 New Project
//               </Button>
//             </Link>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="flex flex-col md:flex-row gap-4 mb-8">
//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//             <Input
//               placeholder="Search projects..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="pl-10"
//             />
//           </div>
//           <div className="flex gap-3">
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() =>
//                 setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
//               }
//               className="h-10 w-10"
//             >
//               <ArrowUpDown
//                 className={`h-4 w-4 transition ${
//                   sortOrder === "asc" ? "rotate-180" : ""
//                 }`}
//               />
//             </Button>
//           </div>
//         </div>

//         {/* Project Cards */}
//         {loading ? (
//           <p>Loading projects...</p>
//         ) : filtered.length === 0 ? (
//           <p className="text-gray-500">No projects found.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filtered.map((project) => (
//               <Link href={`/project/${project.id}`} key={project.id} className="group">
//                 <Card className="h-full transition-all duration-200 hover:border-indigo-300 hover:shadow-md">
//                   <CardHeader className="pb-3">
//                     <CardTitle className="text-xl group-hover:text-indigo-600 transition-colors">
//                       {project.name}
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <p className="text-gray-600 mb-6 line-clamp-3">
//                       {project.description}
//                     </p>
//                     <div className="flex items-center justify-between text-sm">
//                       <div className="flex items-center gap-2">
//                         <Avatar className="h-7 w-7 border-2 border-white">
//                           <AvatarFallback className="bg-indigo-100 text-indigo-600 text-xs">
//                             {getInitials(project.owner?.name || "U")}
//                           </AvatarFallback>
//                         </Avatar>
//                         <span className="text-gray-700">
//                           {project.owner?.full_name || "Unknown"}
//                         </span>
//                       </div>
//                       <span className="text-gray-500">
//                         Created {formatDate(project.created_at)}
//                       </span>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
