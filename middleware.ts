import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Log every matched route
  console.log(
    `[Middleware] ${new Date().toISOString()} — visited: ${pathname}`,
  );

  // Check auth_token cookie
  const authToken = request.cookies.get("auth_token")?.value;

  if (!authToken || authToken.trim() === "") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.searchParams.set("error", "unauthorized");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Only run on /tasks and /create routes
export const config = {
  matcher: ["/tasks/:path*", "/create/:path*"],
};
