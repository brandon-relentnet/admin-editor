import { NextResponse } from "next/server";
import { writeFileSync } from "fs";
import { join } from "path";
import { revalidatePath } from "next/cache";

export async function POST(request) {
  const { content, token } = await request.json();

  // Simple auth check - in production use a more secure token verification
  if (token !== "admin-authenticated") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // Write the updated content to the JSON file
    const contentPath = join(process.cwd(), "data", "content.json");
    writeFileSync(contentPath, JSON.stringify(content, null, 2), "utf8");

    // Revalidate the path to update the content
    revalidatePath("/");

    return NextResponse.json({
      success: true,
      message: "Content updated successfully",
    });
  } catch (error) {
    console.error("Error updating content:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error updating content",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
