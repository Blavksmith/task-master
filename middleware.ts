// middleware.ts
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const publicPaths = ["/", "/auth/login", "/auth/register", "/auth/forgot-password"];
  const isPublic = publicPaths.some((path) => req.nextUrl.pathname.startsWith(path));

  if (!session && !isPublic) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}

export const config = {
  matcher: [
    /*
      Proteksi semua halaman KECUALI:
      - /
      - /auth/*
      - /favicon.ico, /_next/static/*, dll
    */
    "/((?!_next/static|_next/image|favicon.ico|auth|api|assets).*)",
  ],
};
