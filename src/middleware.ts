// middleware.ts
import { auth } from "~/server/auth";
import { NextResponse } from "next/server";
import { ROUTES } from "./constants/routes";

export default auth((req) => {
  const pathname = req.nextUrl.pathname;
  const isAuthPage = pathname.startsWith("/auth");
  const isLoggedIn = !!req.auth;

  // If logged in and trying to access auth pages, redirect to home
  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL(ROUTES.HOME, req.url));
  }

  // If NOT logged in and trying to access protected pages, redirect to login
  if (!isLoggedIn && !isAuthPage) {
    return NextResponse.redirect(new URL(ROUTES.SIGNUP, req.url));
  }

  if (pathname === "/") {
    return NextResponse.redirect(new URL(ROUTES.HOME, req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes - CRITICAL!)
     * - trpc (tRPC routes - CRITICAL!)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    "/((?!api|trpc|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
