"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Settings, LogOut, Menu } from "lucide-react";
import type { Session } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";

function getInitials(full_name: string) {
  return full_name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function Navbar({ session }: { session: Session | null }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClientComponentClient();

  const hiddenPaths = [
    "/auth/login",
    "/auth/register",
    "/auth/forgot-password",
  ];

  if (hiddenPaths.includes(pathname)) return null;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/");
  };

  const user = session?.user;
  const userMeta = user?.user_metadata;

  if (!session || !user) {
    // Navbar untuk belum login - warna cerah
    return (
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-14 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-200 rounded-md overflow-hidden">
              <Image src="/assets/2.png" width={600} height={600} alt="Logo" />
            </div>
            <span className="text-lg font-bold text-gray-900">TaskMaster</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#advantages"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Advantages
            </Link>
            <Link
              href="#vision"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Our Vision
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button
                variant="ghost"
                className="text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              >
                Login
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" className="text-gray-700">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
    );
  }

  // Navbar untuk sudah login - warna cerah dengan navigasi yang lebih lengkap
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-14 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gray-200 rounded-md overflow-hidden">
            <Image src="/assets/2.png" width={600} height={600} alt="Logo" />
          </div>
          <span className="text-lg font-bold text-gray-900">TaskMaster</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/dashboard"
            className={`text-sm font-medium transition-colors ${
              pathname === "/dashboard"
                ? "text-blue-600 font-semibold"
                : "text-gray-700 hover:text-gray-900"
            }`}
          >
            Dashboard
          </Link>

          <Link
            href="/project"
            className={`text-sm font-medium transition-colors ${
              pathname === "/project"
                ? "text-blue-600 font-semibold"
                : "text-gray-700 hover:text-gray-900"
            }`}
          >
            Overview
          </Link>

          <Link
            href="/project/new"
            className={`text-sm font-medium transition-colors ${
              pathname.startsWith("/project/new")
                ? "text-blue-600 font-semibold"
                : "text-gray-700 hover:text-gray-900"
            }`}
          >
            Add Project
          </Link>
        </nav>

        <div className="flex items-center gap-3">

         
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full hover:bg-gray-100"
              >
                <Avatar className="h-8 w-8">
                  {userMeta?.avatar_url ? (
                    <AvatarImage
                      src={userMeta.avatar_url || "/placeholder.svg"}
                      alt={userMeta.full_name || "User"}
                    />
                  ) : (
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-sm font-medium">
                      {getInitials(userMeta?.full_name || "U")}
                    </AvatarFallback>
                  )}
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 bg-white"
              align="end"
              forceMount
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none text-gray-900">
                    {userMeta?.full_name || "User"}
                  </p>
                  <p className="text-xs leading-none text-gray-500">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 hover:bg-red-50 cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" className="text-gray-700">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { usePathname, useRouter } from "next/navigation";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import type { Session } from "@supabase/auth-helpers-nextjs";

// function getInitials(full_name: string) {
//   return full_name
//     .split(" ")
//     .map((n) => n[0])
//     .join("")
//     .toUpperCase();
// }

// export default function Navbar({ session }: { session: Session | null }) {
//   const pathname = usePathname();
//   const router = useRouter();
//   const supabase = createClientComponentClient();

//   const hiddenPaths = [
//     "/auth/login",
//     "/auth/register",
//     "/auth/forgot-password",
//   ];

//   if (hiddenPaths.includes(pathname)) return null;

//   // const handleLogout = async () => {
//   //   await supabase.auth.signOut();
//   //   router.refresh(); // Reset session state
//   //   router.push("/"); // Redirect ke landing
//   // };

//   const handleLogout = async () => {
//     await supabase.auth.signOut();     // Keluar dari Supabase
//     router.replace("/");               // Langsung redirect ke landing page
//   };

//   const user = session?.user;
//   const userMeta = user?.user_metadata;

//   if (!session || !user) {
//     // Belum login
//     return (
//       <header className="container mx-auto px-4 py-4 flex items-center justify-between">
//         <Link href="/" className="flex items-center gap-2">
//           <div className="w-10 h-10 bg-gray-200 rounded-md overflow-hidden">
//             <Image src="/assets/2.png" width={600} height={600} alt="Logo" />
//           </div>
//           <span className="font-semibold text-xl">TaskMaster</span>
//         </Link>

//         <nav className="hidden md:flex items-center gap-8">
//           <Link href="#features" className="text-sm font-medium">
//             Features
//           </Link>
//           <Link href="#solutions" className="text-sm font-medium">
//             Solutions
//           </Link>
//           <Link href="#resources" className="text-sm font-medium">
//             Resources
//           </Link>
//         </nav>

//         <div className="flex items-center gap-4">
//           <Link href="/auth/login">
//             <Button variant="ghost" className="text-black">
//               Login
//             </Button>
//           </Link>
//           <Link href="/auth/register">
//             <Button className="bg-indigo-500 hover:bg-indigo-600 text-white">
//               Sign Up
//             </Button>
//           </Link>
//         </div>
//       </header>
//     );
//   }

//   // ✅ Sudah login
//   return (
//     <header className="bg-white border-b border-gray-200">
//       <div className="container mx-auto px-4 py-3 flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <div className="w-8 h-8 bg-gray-200 rounded-md"></div>
//           <span className="font-semibold text-lg">TaskMaster</span>
//         </div>

//         <nav className="hidden md:flex items-center gap-6">
//           <Link
//             href="/dashboard"
//             className={`text-sm font-medium ${pathname === "/dashboard" ? "text-indigo-600" : "text-gray-600 hover:text-gray-900"}`}
//           >
//             Dashboard
//           </Link>

//           <Link
//             href="/project"
//             className={`text-sm font-medium ${pathname === "/project" ? "text-indigo-600" : "text-gray-600 hover:text-gray-900"}`}
//           >
//             Overview
//           </Link>
//           <Link
//             href="/project/new"
//             className={`text-sm font-medium ${pathname === "/task-tracker" ? "text-indigo-600" : "text-gray-600 hover:text-gray-900"}`}
//           >
//             Add Project
//           </Link>
//         </nav>

//         <div className="flex items-center gap-3">
//           <Avatar className="w-8 h-8">
//             {userMeta?.avatar_url ? (
//               <AvatarImage
//                 src={userMeta.avatar_url}
//                 alt={userMeta.full_name}
//               />
//             ) : (
//               <AvatarFallback className="bg-indigo-100 text-indigo-600 text-sm">
//                 {getInitials(userMeta?.full_name || "U")}
//               </AvatarFallback>
//             )}
//           </Avatar>

//           <Button variant="ghost" onClick={handleLogout}>
//             Logout
//           </Button>
//         </div>
//       </div>
//     </header>
//   );
// }
