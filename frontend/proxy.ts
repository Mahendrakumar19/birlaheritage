import { NextRequest, NextResponse } from "next/server";

const ACCESS_COOKIE = "bh_admin_access";
const PUBLIC_ADMIN_ROUTES = new Set(["/admin/login"]);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = Boolean(request.cookies.get(ACCESS_COOKIE)?.value);
  const isSignup = pathname === "/admin/signup";
  const signupEnabled = process.env.ALLOW_ADMIN_BOOTSTRAP_PAGE === "true";

  if (isSignup && !signupEnabled) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (PUBLIC_ADMIN_ROUTES.has(pathname) || (isSignup && signupEnabled)) {
    if (hasSession && pathname === "/admin/login") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (!hasSession) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
