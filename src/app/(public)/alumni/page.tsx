import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

type AlumnusRow = Database["public"]["Tables"]["alumni"]["Row"];

export const metadata = { title: "Alumni" };

function getInitials(firstName: string, lastName: string) {
  return `${firstName[0]}${lastName[0]}`.toUpperCase();
}

export default async function AlumniPage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("alumni")
    .select("*")
    .eq("published", true)
    .order("graduation_year", { ascending: false });
  const alumni = data as AlumnusRow[] | null;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-ucf-white mb-3">Alumni</h1>
      <p className="text-ucf-gold font-medium mb-10">UCF Percussion Graduates</p>

      {!alumni || alumni.length === 0 ? (
        <p className="text-ucf-white">No alumni profiles yet. Check back soon.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {alumni.map((alumnus) => (
            <div
              key={alumnus.id}
              className="border border-white/20 rounded-lg p-6 flex flex-col gap-3"
            >
              <div className="flex items-center gap-4">
                {alumnus.headshot_url ? (
                  <img
                    src={alumnus.headshot_url}
                    alt={`${alumnus.first_name} ${alumnus.last_name}`}
                    className="w-16 h-16 rounded-full object-cover shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-ucf-gold flex items-center justify-center text-ucf-black font-bold text-xl shrink-0">
                    {getInitials(alumnus.first_name, alumnus.last_name)}
                  </div>
                )}
                <div>
                  <p className="text-ucf-white font-semibold">
                    {alumnus.first_name} {alumnus.last_name}
                  </p>
                  {(alumnus.degree || alumnus.graduation_year) && (
                    <p className="text-ucf-gold text-sm">
                      {[alumnus.degree, alumnus.graduation_year].filter(Boolean).join(" · ")}
                    </p>
                  )}
                </div>
              </div>

              {alumnus.current_role && (
                <p className="text-ucf-white text-sm font-medium">{alumnus.current_role}</p>
              )}
              {alumnus.current_institution && (
                <p className="text-gray-300 text-sm">{alumnus.current_institution}</p>
              )}
              {alumnus.grad_school && (
                <p className="text-gray-300 text-sm">Grad school: {alumnus.grad_school}</p>
              )}
              {alumnus.bio && (
                <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">{alumnus.bio}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
