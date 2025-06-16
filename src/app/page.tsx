import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FeatureCard from "../components/FeatureCard";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import {features} from "@/lib/constant";


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
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="container mx-auto px-14 py-28 min-h-screen">
        <div className="grid md:grid-cols-2 gap-8 items-center px-10">
          <div className="flex items-center justify-center">
            <div className="w-full h-[400px] rounded-lg flex items-center justify-center">
              <Image
                src="/assets/hero.png"
                alt="Hero illustration"
                className="h-full object-contain"
                width={600}
                height={400}
              />
            </div>
          </div>
          {/* Left Column */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold leading-tight text-gray-900">
                Manage tasks
                <br />
                with{" "}
                <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                  clarity
                </span>
                <br />
                and confidence
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Transform your team's productivity with our intelligent task
                management platform. Streamline workflows, track progress, 
                and
                achieve your goals faster than ever.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/register">
                <Button className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-8 py-3">
                  Start Now
                </Button>
              </Link>
            </div>
          </div>

          {/* right: image */}
        </div>
      </section>

      {/* features */}
      <section className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-gray-900 py-16 space-y-16">
        <div className="container mx-auto px-14">
          {/* Feature header */}
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl font-bold text-gray-900">Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the powerful features that make task management a breeze
              and boost your team's productivity.
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
              />
            ))}

            {/* Empty div for grid alignment */}
            <div className="hidden md:block"></div>
          </div>

          <div className="flex justify-center mt-12">
            <Button className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-8 py-3">
              Get Started Now
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose TaskMaster?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover what makes TaskMaster the preferred choice for thousands
              of teams worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Easy to Use */}
            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Easy to Use
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Intuitive interface that your team can master in minutes, not
                hours. No complex training required - just sign up and start
                organizing your tasks immediately.
              </p>
            </Card>

            {/* Powerful Features */}
            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Powerful Features
              </h3>
              <p className="text-gray-600 leading-relaxed">
                From task prioritization to real-time collaboration, we've
                packed everything you need into one comprehensive platform
                without the complexity.
              </p>
            </Card>

            {/* 24/7 Support */}
            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                24/7 Support
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our dedicated support team is always ready to help. Get quick
                responses to your questions and personalized assistance when you
                need it most.
              </p>
            </Card>

            {/* Proven Results */}
            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Proven Results
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Join 10,000+ teams who have increased their productivity by 40%
                on average. Real results from real teams using TaskMaster daily.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-20">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our Vision
            </h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              We envision a world where teams can focus on what truly matters -
              creating amazing products and delivering exceptional results.
              TaskMaster is built to eliminate the chaos of task management and
              bring clarity to every project.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M9 11H1v3h8v3l3-4-3-4v2z" />
                    <path d="M22 12h-7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Simplicity First
                </h3>
                <p className="text-gray-600">
                  Complex problems deserve simple solutions. We believe in
                  intuitive design that gets out of your way.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Team Collaboration
                </h3>
                <p className="text-gray-600">
                  Great things happen when teams work together seamlessly. We're
                  building the future of collaboration.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Continuous Innovation
                </h3>
                <p className="text-gray-600">
                  We're constantly evolving, learning from our users, and
                  pushing the boundaries of what's possible.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <blockquote className="text-2xl font-medium text-gray-900 mb-4">
                "TaskMaster has transformed how our team works. We've never been
                more organized and productive."
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full"></div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Sarah Johnson</p>
                  <p className="text-gray-600">CEO, TechStart Inc.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import FeatureCard from "../components/FeatureCard";
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import { redirect } from "next/navigation";
// import { cookies } from "next/headers";

// export const features = [
//   {
//     title: "Set Task Priorities",
//     paragraph:
//       "Easily prioritize tasks with our intuitive priority system. Mark tasks as high, medium, or low priority to stay focused on what matters most.",
//     firstPath:
//       "m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z",
//   },
//   {
//     title: "Task Tracker",
//     paragraph:
//       "Monitor task progress in real-time. Track completion rates, time spent, and milestone achievements with detailed insights.",
//     firstPath: "M3 3v18h18",
//     secondPath: "m19 9-5 5-4-4-3 3",
//   },
//   {
//     title: "Notification & Reminder",
//     paragraph:
//       "Never miss a deadline with smart notifications and customizable reminders for tasks and important updates.",
//     firstPath: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9",
//     secondPath: "M10.3 21a1.94 1.94 0 0 0 3.4 0",
//   },
//   {
//     title: "Custom Roles & Permissions",
//     paragraph:
//       "Define custom roles and set granular permissions to ensure the right people have access to the right features.",
//     firstPath:
//       "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 3a4 4 0 1 0 0.001 8.001A4 4 0 0 0 9 3",
//     secondPath: "M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
//     circlePath: "",
//   },
// ];

// export default async function Home() {
//   const supabase = createServerComponentClient({ cookies });

//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   // 🔁 Jika sudah login, redirect ke dashboard
//   if (session) {
//     redirect("/dashboard");
//   }

//   return (
//     <div className="min-h-screen bg-black text-white">
//       {/* Navigation */}
//       {/* Hero Section */}
//       <section className="container mx-auto px-8 py-12">
//         <div className="grid md:grid-cols-2 gap-8 items-center">
//           {/* Left Column */}
//           <div className="space-y-8">
//             <h1 className="text-5xl font-bold leading-tight">
//               Manage tasks
//               <br />
//               with clarity and
//               <br />
//               confidence
//             </h1>
//             <div className="w-16 h-1 bg-gray-600"></div>
//             <Button className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer">
//               Start for free
//             </Button>
//             <div className="flex items-center gap-2 text-sm text-gray-400">
//               <div className="flex">
//                 <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
//                 <div className="w-6 h-6 bg-gray-400 rounded-full -ml-2"></div>
//                 <div className="w-6 h-6 bg-gray-500 rounded-full -ml-2"></div>
//               </div>
//               <p>Join 10,000+ teams already using TaskMaster</p>
//             </div>
//           </div>

//           {/* Right Column */}
//           <div className="space-y-6">
//             <Card className="bg-white text-black border-0">
//               <CardHeader className="pb-2">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="24"
//                       height="24"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       className="text-blue-600"
//                     >
//                       <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
//                     </svg>
//                   </div>
//                   <CardTitle className="text-xl">Set Task Priorities</CardTitle>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-gray-600">
//                   Easily prioritize tasks with our intuitive priority system.
//                   Mark tasks as high, medium, or low priority to stay focused on
//                   what matters most.
//                 </p>
//               </CardContent>
//             </Card>

//             <Card className="bg-white text-black border-0">
//               <CardHeader className="pb-2">
//                 <CardTitle className="text-xl">Todo</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="space-y-1">
//                   <div className="flex justify-between">
//                     <p className="font-medium">Design User Dashboard</p>
//                     <Badge className="bg-red-100 text-red-600 hover:bg-red-100">
//                       High
//                     </Badge>
//                   </div>
//                   <p className="text-sm text-gray-500">
//                     Create wireframes and mockups for the main dashboard
//                   </p>
//                 </div>

//                 <div className="space-y-1">
//                   <div className="flex justify-between">
//                     <p className="font-medium">API Integration</p>
//                     <Badge className="bg-yellow-100 text-yellow-600 hover:bg-yellow-100">
//                       Medium
//                     </Badge>
//                   </div>
//                   <p className="text-sm text-gray-500">
//                     Implement REST API endpoints for user authentication
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="bg-gray-100 text-black border-0">
//               <CardHeader className="pb-2">
//                 <CardTitle className="text-xl">Tasks Due Soon</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div>
//                   <p className="font-medium">Today</p>
//                   <div className="flex justify-between items-center mt-2">
//                     <p className="text-sm">3 tasks due</p>
//                     <Badge className="bg-red-500 text-white hover:bg-red-600">
//                       High Priority
//                     </Badge>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>

//       {/* Feature section  */}
//       <section className="bg-white text-black py-16 space-y-16">
//         <div className="container mx-auto px-14">
//           {/* Feature header */}
//           <div className="text-center space-y-4 mb-12">
//             <h2 className="text-3xl font-bold">Why Choose TaskMaster?</h2>
//             <p className="text-gray-600">
//               Discover the powerful features that make task management a breeze.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//             {/* Feature 1 - 4 */}
//             {features.map((feature, index) => (
//               <FeatureCard
//                 key={index}
//                 title={feature.title}
//                 paragraph={feature.paragraph}
//                 firstPath={feature.firstPath}
//                 secondPath={feature.secondPath || ""}
//               ></FeatureCard>
//             ))}

//             {/* Empty div for grid alignment */}
//             <div className="hidden md:block"></div>
//           </div>

//           <div className="flex justify-center mt-12">
//             <Button className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white">
//               Get Started Now
//             </Button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
