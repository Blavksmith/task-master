// src/app/dashboard/page.tsx
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import DashboardPage from "./DashboardPage";
import { getDashboardStats } from "./utils/getDashboardStats";
import { getRecentProjects } from "./utils/getRecentProjects";
import { getRecentTasks } from "./utils/getRecentTasks";

export default async function Dashboard() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  const userId = session.user.id;

  const [stats, recentProjects, recentTasks] = await Promise.all([
    getDashboardStats(supabase, userId),
    getRecentProjects(supabase, userId),
    getRecentTasks(supabase, userId),
  ]);

  const { data: userProfile } = await supabase
    .from("users")
    .select("id, full_name, avatar_url")
    .eq("id", userId)
    .single();

  return (
    <DashboardPage
      currentUser={userProfile}
      dashboardStats={stats}
      recentProjects={recentProjects}
      recentTasks={recentTasks}
    />
  );
}

// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   PlusIcon,
//   FolderIcon,
//   CheckCircle2,
//   Clock,
//   AlertCircle,
//   TrendingUp,
//   Calendar,
//   Users,
//   BarChart3,
// } from "lucide-react";

// import { createClient } from "@/lib/supabase/asyncServer";

// export default async function Dashboard() {
//   const supabase = await createClient();

//   const {
//     data: { user }, error
//   } = await supabase.auth.getUser();

//   if (error) {
//     console.error("Supabase Auth Error:", error.message);
//     return <div>Auth error: {error.message}</div>;
//   }

//   if (!user) {
//     return <div>Not Autheticated</div>;
//   }

//   const { data: dashboardStatsRaw } = await supabase.rpc(
//     "get_dashboard_stats",
//     {
//       user_id: user?.id,
//     }
//   );

//   const dashboardStats = {
//     totalProjects: dashboardStatsRaw?.totalProjects || 0,
//     completedTasks: dashboardStatsRaw?.completedTasks || 0,
//     pendingTasks: dashboardStatsRaw?.pendingTasks || 0,
//     tasksThisWeek: dashboardStatsRaw?.tasksThisWeek || 0,
//     totalTasks: dashboardStatsRaw?.totalTasks || 0,
//   };

//   const { data: recentProjectsRaw } = await supabase
//     .from("projects")
//     .select(
//       "id, name, description, updated_at, taskCount:tasks(count), owner:users(id, full_name, avatar_url)"
//     )
//     .eq("owner_id", user?.id)
//     .order("updated_at", { ascending: false })
//     .limit(3);

//   const recentProjects = recentProjectsRaw ?? [];

//   const { data: recentTasksRaw } = await supabase
//     .from("tasks")
//     .select(
//       "id, title, description, due_date, priority, status, assignee:users(full_name, avatar_url), project(name)"
//     )
//     .eq("creator_id", user?.id)
//     .order("due_date", { ascending: true })
//     .limit(5);

//   const recentTasks = recentTasksRaw ?? [];

//   const currentUser = {
//     full_name: user?.user_metadata?.full_name || "User",
//     avatar_url: user?.user_metadata?.avatar_url,
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//     });
//   };

//   const getInitials = (name) => {
//     return name
//       .split(" ")
//       .map((n) => n[0])
//       .join("")
//       .toUpperCase();
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "todo":
//         return "bg-gray-100 text-gray-800";
//       case "in_progress":
//         return "bg-blue-100 text-blue-800";
//       case "done":
//         return "bg-green-100 text-green-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case "high":
//         return "bg-red-100 text-red-800";
//       case "medium":
//         return "bg-yellow-100 text-yellow-800";
//       case "low":
//         return "bg-green-100 text-green-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const formatStatus = (status) => {
//     switch (status) {
//       case "todo":
//         return "Todo";
//       case "in_progress":
//         return "In Progress";
//       case "done":
//         return "Done";
//       default:
//         return status;
//     }
//   };

//   const calculateProgress = (completed, total) => {
//     return total > 0 ? Math.round((completed / total) * 100) : 0;
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Nav */}

//       {/* Dashboard Content */}
//       <div className="container mx-auto px-4 py-8">
//         {/* Welcome Section */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">
//                 Welcome back, {currentUser.full_name.split(" ")[0]}! 👋
//               </h1>
//               <p className="text-gray-600">
//                 Here's what's happening with your projects today.
//               </p>
//             </div>
//             <div className="flex gap-3">
//               <Link href="/project/new">
//                 <Button variant="outline">
//                   <FolderIcon className="h-4 w-4 mr-2" />
//                   New Project
//                 </Button>
//               </Link>
//               <Link href="/task-tracker/new-task">
//                 <Button className="bg-indigo-600 hover:bg-indigo-700">
//                   <PlusIcon className="h-4 w-4 mr-2" />
//                   Add Task
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//           <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-indigo-50">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-blue-600 mb-1">
//                     Total Projects
//                   </p>
//                   <p className="text-3xl font-bold text-blue-900">
//                     {dashboardStats.totalProjects}
//                   </p>
//                 </div>
//                 <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
//                   <FolderIcon className="h-6 w-6 text-blue-600" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-emerald-50">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-green-600 mb-1">
//                     Completed Tasks
//                   </p>
//                   <p className="text-3xl font-bold text-green-900">
//                     {dashboardStats.completedTasks}
//                   </p>
//                 </div>
//                 <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
//                   <CheckCircle2 className="h-6 w-6 text-green-600" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="border-0 shadow-sm bg-gradient-to-br from-yellow-50 to-orange-50">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-yellow-600 mb-1">
//                     Pending Tasks
//                   </p>
//                   <p className="text-3xl font-bold text-yellow-900">
//                     {dashboardStats.pendingTasks}
//                   </p>
//                 </div>
//                 <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
//                   <Clock className="h-6 w-6 text-yellow-600" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Main Content Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Recent Projects */}
//           <div className="lg:col-span-2">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-xl font-semibold text-gray-900">
//                 Recent Projects
//               </h2>
//               <Link href="/project">
//                 <Button variant="outline" size="sm">
//                   <BarChart3 className="h-4 w-4 mr-2" />
//                   View All
//                 </Button>
//               </Link>
//             </div>

//             <div className="space-y-4">
//               {recentProjects.map((project) => (
//                 <Card
//                   key={project.id}
//                   className="border-0 shadow-sm hover:shadow-md transition-shadow"
//                 >
//                   <CardContent className="p-6">
//                     <div className="flex items-start justify-between mb-4">
//                       <div className="flex-1">
//                         <Link
//                           href={`/project/${project.id}`}
//                           className="text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
//                         >
//                           {project.name}
//                         </Link>
//                         <p className="text-gray-600 mt-1 line-clamp-2">
//                           {project.description}
//                         </p>
//                       </div>
//                       <Badge variant="outline" className="ml-4">
//                         {project.taskCount} tasks
//                       </Badge>
//                     </div>

//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <Avatar className="h-8 w-8">
//                           {project.owner.avatar_url ? (
//                             <AvatarImage
//                               src={
//                                 project.owner.avatar_url || "/placeholder.svg"
//                               }
//                               alt={project.owner.full_name}
//                             />
//                           ) : (
//                             <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
//                               {getInitials(project.owner.full_name)}
//                             </AvatarFallback>
//                           )}
//                         </Avatar>
//                         <div>
//                           <p className="text-sm font-medium text-gray-900">
//                             {project.owner.full_name}
//                           </p>
//                           <p className="text-xs text-gray-500">
//                             Updated {formatDate(project.updated_at)}
//                           </p>
//                         </div>
//                       </div>

//                       <div className="text-right">
//                         <div className="flex items-center gap-2 mb-1">
//                           <span className="text-sm font-medium text-gray-900">
//                             {calculateProgress(
//                               project.completedTasks,
//                               project.taskCount
//                             )}
//                             %
//                           </span>
//                         </div>
//                         <Progress
//                           value={calculateProgress(
//                             project.completedTasks,
//                             project.taskCount
//                           )}
//                           className="w-24 h-2"
//                         />
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             {/* Quick Stats */}
//             <Card className="border-0 shadow-sm">
//               <CardHeader className="pb-3">
//                 <CardTitle className="text-lg flex items-center gap-2">
//                   <TrendingUp className="h-5 w-5 text-indigo-600" />
//                   This Week
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-gray-600">
//                       Tasks Completed
//                     </span>
//                     <span className="text-lg font-semibold text-gray-900">
//                       {dashboardStats.tasksThisWeek}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-gray-600">
//                       Projects Active
//                     </span>
//                     <span className="text-lg font-semibold text-gray-900">
//                       {dashboardStats.totalProjects}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-gray-600">
//                       Completion Rate
//                     </span>
//                     <span className="text-lg font-semibold text-green-600">
//                       {calculateProgress(
//                         dashboardStats.completedTasks,
//                         dashboardStats.totalTasks
//                       )}
//                       %
//                     </span>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Recent Tasks */}
//             <Card className="border-0 shadow-sm">
//               <CardHeader className="pb-3">
//                 <div className="flex items-center justify-between">
//                   <CardTitle className="text-lg flex items-center gap-2">
//                     <Calendar className="h-5 w-5 text-indigo-600" />
//                     Recent Tasks
//                   </CardTitle>
//                   <Link href="/task-tracker">
//                     <Button variant="ghost" size="sm" className="text-xs">
//                       View All
//                     </Button>
//                   </Link>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {recentTasks.map((task) => (
//                     <div
//                       key={task.id}
//                       className="border-b border-gray-100 last:border-0 pb-4 last:pb-0"
//                     >
//                       <div className="flex items-start justify-between mb-2">
//                         <h4 className="text-sm font-medium text-gray-900 line-clamp-1">
//                           {task.title}
//                         </h4>
//                         <div className="flex gap-1 ml-2">
//                           <Badge
//                             className={`text-xs ${getPriorityColor(
//                               task.priority
//                             )}`}
//                           >
//                             {task.priority}
//                           </Badge>
//                         </div>
//                       </div>

//                       <p className="text-xs text-gray-600 mb-2 line-clamp-1">
//                         {task.description}
//                       </p>

//                       <div className="flex items-center justify-between mt-2">
//                         <span className="text-xs text-gray-500">
//                           {task.project.name}
//                         </span>
//                         <span className="text-xs text-gray-500">
//                           Due {formatDate(task.due_date)}
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
