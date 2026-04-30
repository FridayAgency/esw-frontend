import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { password } = await request.json();
  const stagingPassword = process.env.STAGING_PASSWORD;

  if (!stagingPassword || password !== stagingPassword) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("staging_auth", stagingPassword, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    // 7 day expiry
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
