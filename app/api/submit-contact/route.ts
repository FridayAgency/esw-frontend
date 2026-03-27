import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Format the data

    // TODO: Send email notification
    // You can integrate with SendGrid, Resend, or Nodemailer here
    // Example:
    // await sendEmail({
    //   to: "quotes@capitalflow.ie",
    //   subject: `New Quote Request - ${formattedData.financingType}`,
    //   data: formattedData,
    // });

    // TODO: Save to database
    // Example:
    // await db.quotes.create({ data: formattedData });

    // Log the submission (for development)

    // Return success response
    return NextResponse.json(
      {
        success: true,
        data: {
          referenceId: `QT-${Date.now()}`, // Generate a simple reference ID
          name: data.firstName,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error processing quote submission:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing your request",
      },
      { status: 500 },
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json({ message: "Method not allowed. Use POST to submit a quote." }, { status: 405 });
}
