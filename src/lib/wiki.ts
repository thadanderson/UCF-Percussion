import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const WIKI_DIR = path.join(process.cwd(), "content/wiki");

export interface WikiPageMeta {
  title: string;
  slug: string[]; // e.g. ['studio-policies', 'attendance']
  order: number;
}

export interface WikiSection {
  title: string;
  folder: string;
  order: number;
  pages: WikiPageMeta[];
}

export interface WikiNav {
  sections: WikiSection[];
}

export interface WikiPage {
  title: string;
  content: string; // rendered HTML
}

const SECTION_ORDER: Record<string, number> = {
  "current-semester": 1,
  "studio-policies": 2,
  "percussion-curriculum": 3,
  "degree-recitals": 4,
  resources: 5,
};

const SECTION_NAMES: Record<string, string> = {
  "current-semester": "Current Semester",
  "studio-policies": "Studio Policies",
  "percussion-curriculum": "Percussion Curriculum",
  "degree-recitals": "Degree Recitals",
  resources: "Resources",
};

export function getWikiNav(): WikiNav {
  const sections: WikiSection[] = [];

  const entries = fs.readdirSync(WIKI_DIR, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const folder = entry.name;
    const sectionDir = path.join(WIKI_DIR, folder);
    const files = fs
      .readdirSync(sectionDir)
      .filter((f) => f.endsWith(".md"));

    const pages: WikiPageMeta[] = files.map((file) => {
      const pageSlug = file.replace(".md", "");
      const filePath = path.join(sectionDir, file);
      const { data } = matter(fs.readFileSync(filePath, "utf8"));
      return {
        title: data.title || pageSlug,
        slug: [folder, pageSlug],
        order: data.order ?? 99,
      };
    });

    pages.sort((a, b) => a.order - b.order);

    sections.push({
      title: SECTION_NAMES[folder] || folder,
      folder,
      order: SECTION_ORDER[folder] ?? 99,
      pages,
    });
  }

  sections.sort((a, b) => a.order - b.order);

  return { sections };
}

export async function getWikiPage(slug: string[]): Promise<WikiPage | null> {
  let filePath: string;

  if (slug.length === 0) {
    filePath = path.join(WIKI_DIR, "index.md");
  } else {
    filePath = path.join(WIKI_DIR, ...slug) + ".md";
  }

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const html = await marked(content);

  return {
    title: data.title || "Untitled",
    content: html,
  };
}
