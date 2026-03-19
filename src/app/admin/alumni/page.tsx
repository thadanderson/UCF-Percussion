import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteAlumnus, toggleAlumnusPublished } from "@/app/admin/alumni/actions";

export const metadata = { title: "Admin — Alumni" };

export default async function AdminAlumniPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const supabase = await createClient();
  const { data: alumni } = await supabase
    .from("alumni")
    .select("*")
    .order("graduation_year", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-ucf-black">Alumni</h1>
        <Link
          href="/admin/alumni/new"
          className="bg-ucf-gold text-ucf-black font-semibold px-4 py-2 rounded text-sm hover:opacity-90 transition-opacity"
        >
          + New Alumnus
        </Link>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded text-sm">
          {decodeURIComponent(error)}
        </div>
      )}

      {!alumni || alumni.length === 0 ? (
        <p className="text-gray-500 text-sm">No alumni yet. Create one above.</p>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-700">Name</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700">Degree / Year</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700">Current Role</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700">Status</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {alumni.map((alumnus) => (
                <tr key={alumnus.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-ucf-black">
                    {alumnus.first_name} {alumnus.last_name}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {[alumnus.degree, alumnus.graduation_year].filter(Boolean).join(" · ") || "—"}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{alumnus.current_role ?? "—"}</td>
                  <td className="px-4 py-3">
                    <form action={toggleAlumnusPublished}>
                      <input type="hidden" name="id" value={alumnus.id} />
                      <input type="hidden" name="published" value={String(alumnus.published)} />
                      <button
                        type="submit"
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          alumnus.published
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {alumnus.published ? "Published" : "Draft"}
                      </button>
                    </form>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/alumni/${alumnus.id}/edit`}
                        className="text-ucf-gold hover:underline text-sm font-medium"
                      >
                        Edit
                      </Link>
                      <DeleteButton action={deleteAlumnus} id={alumnus.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
