import { createClient } from "@/lib/supabase/server";
import FacultyCard from "@/components/ui/FacultyCard";
import { getContent } from "@/lib/content";
import type { Database } from "@/types/database";

type FacultyRow = Database["public"]["Tables"]["faculty"]["Row"];

export const metadata = { title: "About" };

export default async function AboutPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("faculty")
    .select("*")
    .eq("published", true)
    .order("last_name", { ascending: true });
  const faculty = data as FacultyRow[] | null;

  const { data: fm, html } = getContent("about");

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-ucf-white mb-4">{fm.title as string}</h1>
      <p className="text-ucf-gold font-medium mb-8">{fm.subtitle as string}</p>

      <div className="space-y-4">
        <div className="content-body" dangerouslySetInnerHTML={{ __html: html }} />

        {faculty && faculty.length > 0 && (
          <>
            <h2 className="text-2xl font-bold text-ucf-white mt-10 mb-4">Faculty</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {faculty.map((member) => (
                <FacultyCard key={member.id} member={member} />
              ))}
            </div>
          </>
        )}

        <h2 className="text-2xl font-bold text-ucf-white mt-10 mb-3">Ensembles</h2>
        <p className="text-ucf-white leading-relaxed">
          Percussion majors have the opportunity to perform in a wide variety of chamber and large
          ensembles across campus, including:
        </p>
        <ul className="list-disc list-inside space-y-1 text-ucf-white">
          {(fm.ensembles as string[]).map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>

        <h2 className="text-2xl font-bold text-ucf-white mt-10 mb-3">Facilities</h2>
        <p className="text-ucf-white leading-relaxed">{fm.facilities as string}</p>
      </div>
    </div>
  );
}
