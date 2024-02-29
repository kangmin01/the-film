import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    if (req.nextUrl.pathname.startsWith("/api")) {
      return new NextResponse("Authentication Error", { status: 401 });
    } else {
      const { pathname, search, origin, basePath } = req.nextUrl;
      const signInUrl = new URL(`${basePath}/auth/signin`, origin);
      signInUrl.searchParams.append(
        "callbackUrl",
        `${basePath}${pathname}${search}`
      );
      return NextResponse.redirect(signInUrl);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/add-movie",
    "/api/admin/add-movie",
    "/discussion/:path/edit-discussion",
    "/api/discussion/:path*",
    "/review/:id/edit-review",
    "/api/review/:path*",
    "/movie/:id/add-discussion",
    "/movie/:id/add-review",
    "/api/movie/:id/add-discussion",
    "/api/movie/:id/add-review",
    "/user/:username/edit-user",
  ],
};
