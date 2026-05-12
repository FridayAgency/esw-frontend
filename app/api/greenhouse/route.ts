import { NextRequest, NextResponse } from "next/server";

const GREENHOUSE_JOB_ID = "8541068002";

export async function POST(request: NextRequest) {
  const boardToken = process.env.GREENHOUSE_BOARD_TOKEN;
  const apiKey = process.env.GREENHOUSE_API_KEY;
  if (!boardToken || !apiKey) {
    return NextResponse.json({ success: false, message: "Server configuration error" }, { status: 500 });
  }

  const basicAuth = Buffer.from(`${apiKey}:`).toString("base64");

  try {
    const incoming = await request.formData();

    const fullName = (incoming.get("name") as string) ?? "";
    const [firstName, ...rest] = fullName.trim().split(" ");
    const lastName = rest.join(" ");

    const outgoing = new FormData();
    outgoing.append("first_name", firstName);
    outgoing.append("last_name", lastName);
    outgoing.append("email", (incoming.get("email") as string) ?? "");
    outgoing.append("prospect", "true");

    const areaOfInterest = incoming.get("areaOfInterest") as string | null;
    if (areaOfInterest) {
      outgoing.append("cover_letter_text", `Area of Interest: ${areaOfInterest}`);
    }

    const cv = incoming.get("cv") as File | null;
    if (cv) {
      outgoing.append("resume", cv, cv.name);
    }

    const url = `https://boards-api.greenhouse.io/v1/boards/${boardToken}/jobs/${GREENHOUSE_JOB_ID}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Basic ${basicAuth}` },
      body: outgoing,
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Greenhouse error:", response.status, text);
      return NextResponse.json({ success: false, message: "Submission failed" }, { status: response.status });
    }

    const data = await response.json();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error submitting to Greenhouse:", error);
    return NextResponse.json({ success: false, message: "An unexpected error occurred" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
