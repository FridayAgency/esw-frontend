import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "staging_auth";
const PASSWORD_PATH = "/password";

function noStore(response: NextResponse) {
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export function proxy(request: NextRequest) {
  const password = process.env.STAGING_PASSWORD;

  if (!password) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  // Always allow the password page and its API route through
  if (
    pathname.startsWith(PASSWORD_PATH) ||
    pathname.startsWith("/api/staging-auth") ||
    pathname.startsWith("/preview") ||
    pathname.startsWith("/api/preview")
  ) {
    return noStore(NextResponse.next());
  }

  const cookie = request.cookies.get(COOKIE_NAME);

  if (cookie?.value === password) {
    return noStore(NextResponse.next());
  }

  const url = request.nextUrl.clone();
  url.pathname = PASSWORD_PATH;
  return noStore(NextResponse.redirect(url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
