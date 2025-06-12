// layout -> server component, doesnt allow directives "use client"

import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TaskMaster - Manage tasks with clarity and confidence",
  description: "A task management application for teams",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        <Toaster />
      </body>
    </html>
  );
}
