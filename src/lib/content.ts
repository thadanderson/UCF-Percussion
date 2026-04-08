import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

export function getContent(slug: string): { data: Record<string, unknown>; html: string } {
  const filePath = path.join(process.cwd(), "content", `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  let html = marked(content) as string;
  // Open external links in a new tab
  html = html.replace(
    /<a href="(https?:\/\/[^"]+)"/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer"'
  );
  return { data, html };
}
