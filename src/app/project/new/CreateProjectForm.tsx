"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ArrowLeft, FolderPlus, Sparkles, Target, Users } from "lucide-react";

export default function CreateProjectForm({ userId }: { userId: string }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.from("projects").insert([
      {
        name,
        description,
        owner_id: userId,
      },
    ]);

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      router.push("/project"); // Redirect setelah sukses
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-14 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="flex items-center mb-8">
            <Link
              href="/project"
              className="text-slate-600 hover:text-slate-900 mr-4 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">

                <h1 className="text-3xl font-bold text-slate-900">
                  Create New Project
                </h1>
              </div>
              <p className="text-slate-600 text-lg">
                Set up a new project and start collaborating with your team
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl text-slate-900 flex items-center gap-2">
                    My Project
                  </CardTitle>
                  <p className="text-slate-600">
                    Fill in the information below to create your project
                  </p>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Project Name */}
                    <div className="space-y-3">
                      <Label
                        htmlFor="project-name"
                        className="text-slate-900 font-semibold text-sm"
                      >
                        Project Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="project-name"
                        placeholder="e.g., Website Redesign, Mobile App Development"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400"
                      />
                      <p className="text-xs text-slate-500">
                        Choose a clear, descriptive name for your project
                      </p>
                    </div>

                    {/* Project Description */}
                    <div className="space-y-3">
                      <Label
                        htmlFor="project-description"
                        className="text-slate-900 font-semibold text-sm"
                      >
                        Project Description
                      </Label>
                      <Textarea
                        id="project-description"
                        placeholder="Describe your project goals, scope, and key objectives..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="min-h-32 border-slate-200 focus:border-blue-500 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400 resize-none"
                      />
                      <p className="text-xs text-slate-500">
                        Optional: Provide details description 
                      </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-700 font-medium">
                          {error}
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                      <Button
                        variant="outline"
                        disabled={loading}
                        asChild
                        className="text-white hover:bg-red-600 bg-red-500"
                      >
                        <Link href="/project">Cancel</Link>
                      </Button>
                      <Button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        disabled={loading || !name.trim()}
                      >
                        {loading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                            Creating...
                          </>
                        ) : (
                          <>Create Project</>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
