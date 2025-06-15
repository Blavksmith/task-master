import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = cookies(); // ini masih sync
  return createServerComponentClient({ cookies: () => cookieStore });
}
