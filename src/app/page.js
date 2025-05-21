// src/app/page.js
import { readFileSync } from "fs";
import { join } from "path";
import { ContentProvider } from "../context/ContentProvider";
import HomePage from "../components/HomePage";

// This is a Server Component that reads the content and passes it to the ContentProvider
export default function Home() {
  // Read the content file in the server component
  const contentPath = join(process.cwd(), "data", "content.json");
  let initialContent;

  try {
    const fileContent = readFileSync(contentPath, "utf8");
    initialContent = JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading content file:", error);
    initialContent = {
      hero: { title: "My Site", subtitle: "Welcome" },
      about: { title: "About", content: "About content here" },
      features: [],
    };
  }

  return (
    <ContentProvider initialContent={initialContent}>
      <HomePage />
    </ContentProvider>
  );
}

// This exports a dynamic page that gets revalidated every 10 seconds
export const revalidate = 10;
