import { getContent } from "@/lib/content";

export const metadata = { title: "Auditions" };

export default function AuditionsPage() {
  const { data: fm, html } = getContent("auditions");

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-ucf-white mb-4">{fm.title as string}</h1>
      <p className="text-ucf-gold font-medium mb-8">{fm.subtitle as string}</p>
      <div className="content-body" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
