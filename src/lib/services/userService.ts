// src/lib/services/userService.ts
import { supabase } from "@/lib/supabaseClient";

export const userService = {
  async createUserProfile({
    id,
    full_name,
    avatar_url = null,
  }: {
    id: string;
    full_name: string;
    avatar_url?: string | null;
  }) {
    const { error } = await supabase.from("users").insert({
      id,
      full_name,
      avatar_url,
    });

    if (error) {
      throw new Error("Failed to insert user: " + error.message);
    }
  },
};
