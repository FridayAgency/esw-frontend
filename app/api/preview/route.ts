import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAuthToken } from "@/lib/auth";

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);

  const postType = searchParams.get("postType");
  const preview_id = searchParams.get("preview_id");
  const token = searchParams.get("token");

  // Validate token
  if (!token || token !== process.env.NEXT_TOKEN) {
    return new NextResponse(JSON.stringify({ success: false, message: "Invalid or missing preview token" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });
  }

  // Validate preview_id format (should be numeric for database ID)
  if (preview_id && !/^\d+$/.test(preview_id)) {
    return new NextResponse(JSON.stringify({ success: false, message: "Invalid preview ID format" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  // Validate postType is one of the allowed types
  const allowedTypes = [
    "post",
    "page",
    "projects",
    "case_study",
    "industry",
    "newsArticle",
    "career",
    "campaign",
    "integration",
    "product",
    "news",
  ];
  if (postType && !allowedTypes.includes(postType)) {
    return new NextResponse(JSON.stringify({ success: false, message: "Invalid post type" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  if (!postType || !preview_id) {
    return new NextResponse(JSON.stringify({ success: false, message: "Missing postType or preview_id" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  // Get or check WordPress auth token
  const cookieStore = await cookies();
  let authToken = cookieStore.get("wp_preview_auth")?.value;

  if (!authToken) {
    try {
      const data = await getAuthToken();

      if (!data.login.authToken) {
        return new NextResponse(JSON.stringify({ success: false, message: "Failed to authenticate with WordPress" }), {
          status: 401,
          headers: { "content-type": "application/json" },
        });
      }

      authToken = data.login.authToken;

      // Set the cookie
      cookieStore.set({
        name: "wp_preview_auth",
        value: authToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 300, // 5 minutes
      });
    } catch (error) {
      console.error("Authentication error:", error);
      return new NextResponse(JSON.stringify({ success: false, message: "Authentication service error" }), {
        status: 500,
        headers: { "content-type": "application/json" },
      });
    }
  }

  // Build redirect URL - use request origin to ensure correct domain
  const origin = request.headers.get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  // const redirectUrl = new URL(`/preview/${postType}/${preview_id}/`, `${protocol}://${origin}`);
  const redirectUrl = new URL(`/preview/${preview_id}/`, `${protocol}://${origin}`);

  // Redirect to the preview page with cookie set
  return NextResponse.redirect(redirectUrl);
};
