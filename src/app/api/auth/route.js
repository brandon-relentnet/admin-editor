import { NextResponse } from "next/server";

// Simple auth API that checks against a hardcoded password
// In a real app, you'd use environment variables and proper hashing

export async function POST(request) {
  const { password } = await request.json();

  // Super simple password check - replace with your own password
  // In production, use environment variables: process.env.ADMIN_PASSWORD
  const ADMIN_PASSWORD = "admin123";

  if (password === ADMIN_PASSWORD) {
    return NextResponse.json({
      success: true,
      message: "Authentication successful",
    });
  }

  return NextResponse.json(
    {
      success: false,
      message: "Invalid password",
    },
    { status: 401 }
  );
}
