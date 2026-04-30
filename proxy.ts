import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "staging_auth";
const PASSWORD_PATH = "/password";

export function proxy(request: NextRequest) {
  const password = process.env.STAGING_PASSWORD;

  if (!password) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  // Always allow the password page and its API route through
  if (pathname.startsWith(PASSWORD_PATH) || pathname.startsWith("/api/staging-auth")) {
    return NextResponse.next();
  }

  const cookie = request.cookies.get(COOKIE_NAME);

  if (cookie?.value === password) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = PASSWORD_PATH;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
