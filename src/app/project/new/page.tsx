// src/app/project/new/page.tsx
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CreateProjectForm from "./CreateProjectForm";

export default async function CreateProjectPage() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  return <CreateProjectForm userId={session.user.id} />;
}


// "use client";

// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { ArrowLeft } from "lucide-react";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { supabase } from "@/lib/supabaseClient";

// export default function NewProjectPage() {
//   const router = useRouter();
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     // userError -> response from supabase
//     const {
//       data: { user },
//       error: userError,
//     } = await supabase.auth.getUser();

//     if (userError || !user) {
//       setError("Failed to get user info");
//       setLoading(false);
//       return;
//     }

//     const { data, error: insertError } = await supabase
//       .from("projects")
//       .insert({
//         name,
//         description,
//         owner_id: user.id,
//       });

//     if (insertError) {
//       setError(insertError.message);
//     } else {
//       router.push("/project");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* New Project Content */}
//       <div className="container mx-auto px-4 py-8">
//         <div className="max-w-2xl mx-auto">
//           {/* Header */}
//           <div className="flex items-center mb-8">
//             <Link
//               href="/project"
//               className="text-gray-500 hover:text-gray-700 mr-4"
//             >
//               <ArrowLeft className="h-5 w-5" />
//             </Link>

//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">
//                 Create New Project
//               </h1>
//               <p className="text-gray-600">
//                 Set up a new project for your team
//               </p>
//             </div>
//           </div>

//           {/* Form Card */}
//           <Card className="border-0 shadow-md">
//             <CardHeader>
//               <CardTitle>Project Details</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <form className="space-y-6" onSubmit={handleSubmit}>
//                 {/* Project Name */}
//                 <div className="space-y-2">
//                   <Label
//                     htmlFor="project-name"
//                     className="text-gray-700 font-medium"
//                   >
//                     Project Name <span className="text-red-500">*</span>
//                   </Label>
//                   <Input
//                     id="project-name"
//                     placeholder="Enter project name"
//                     className="h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     required
//                   />
//                 </div>

//                 {/* Project Description */}
//                 <div className="space-y-2">
//                   <Label
//                     htmlFor="project-description"
//                     className="text-gray-700 font-medium"
//                   >
//                     Description
//                   </Label>
//                   <Textarea
//                     id="project-description"
//                     placeholder="Describe the project in detail"
//                     className="min-h-32 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                   />
//                   <p className="text-xs text-gray-500">
//                     Optional: Provide a detailed description of the project
//                   </p>
//                 </div>

//                 {error && <p className="text-sm text-red-500">{error}</p>}

//                 {/* Submit Buttons */}
//                 <div className="flex justify-end gap-3 pt-4">
//                   <Button variant="outline" disabled={loading} asChild>
//                     <Link href="/project">Cancel</Link>
//                   </Button>
//                   <Button
//                     type="submit"
//                     className="bg-indigo-600 hover:bg-indigo-700"
//                     disabled={loading}
//                   >
//                     {loading ? "Creating..." : "Create Project"}
//                   </Button>
//                 </div>
//               </form>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }
