"use client";

import { Session } from "@supabase/auth-helpers-nextjs";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { ReactNode, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function ClientLayoutWrapper({
  children,
  session: serverSession,
}: {
  children: ReactNode;
  session: Session | null;
}) {
  const supabase = createClientComponentClient();
  const [session, setSession] = useState<Session | null>(serverSession);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session); // Update session secara dinamis
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <Navbar session={session} />
      {children}
    </ThemeProvider>
  );
}
