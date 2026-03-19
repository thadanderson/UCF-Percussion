import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateAlumnus } from "@/app/admin/alumni/actions";
import type { Database } from "@/types/database";

type AlumnusRow = Database["public"]["Tables"]["alumni"]["Row"];

export const metadata = { title: "Edit Alumnus" };

export default async function EditAlumnusPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;
  const supabase = await createClient();

  const { data } = await supabase.from("alumni").select("*").eq("id", id).single();
  const alumnus = data as AlumnusRow | null;
  if (!alumnus) notFound();

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-ucf-black mb-6">Edit Alumnus</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded text-sm">
          {decodeURIComponent(error)}
        </div>
      )}

      <form action={updateAlumnus} className="space-y-4">
        <input type="hidden" name="id" value={alumnus.id} />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
            <input
              name="first_name"
              required
              defaultValue={alumnus.first_name}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ucf-gold"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
            <input
              name="last_name"
              required
              defaultValue={alumnus.last_name}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ucf-gold"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
            <input
              name="degree"
              placeholder="e.g. B.M., M.M., D.M.A."
              defaultValue={alumnus.degree ?? ""}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ucf-gold"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Year</label>
            <input
              name="graduation_year"
              type="number"
              defaultValue={alumnus.graduation_year ?? ""}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ucf-gold"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Current Role</label>
          <input
            name="current_role"
            defaultValue={alumnus.current_role ?? ""}
            placeholder="e.g. Principal Percussionist"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ucf-gold"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Institution / Orchestra
          </label>
          <input
            name="current_institution"
            defaultValue={alumnus.current_institution ?? ""}
            placeholder="e.g. Atlanta Symphony Orchestra"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ucf-gold"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Grad School</label>
          <input
            name="grad_school"
            defaultValue={alumnus.grad_school ?? ""}
            placeholder="e.g. Eastman School of Music"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ucf-gold"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
          <textarea
            name="bio"
            rows={4}
            defaultValue={alumnus.bio ?? ""}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ucf-gold"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Headshot URL</label>
          <input
            name="headshot_url"
            type="url"
            defaultValue={alumnus.headshot_url ?? ""}
            placeholder="https://..."
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ucf-gold"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Linked User ID (optional)
          </label>
          <input
            name="user_id"
            defaultValue={alumnus.user_id ?? ""}
            placeholder="UUID from users table — enables self-management"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ucf-gold"
          />
        </div>

        <button
          type="submit"
          className="bg-ucf-gold text-ucf-black font-semibold px-6 py-2 rounded hover:opacity-90 transition-opacity text-sm"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
