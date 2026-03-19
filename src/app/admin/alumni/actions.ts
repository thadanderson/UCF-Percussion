"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createAlumnus(formData: FormData) {
  const supabase = await createClient();

  const graduation_year = formData.get("graduation_year") as string;

  const { error } = await supabase.from("alumni").insert({
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    graduation_year: graduation_year ? parseInt(graduation_year) : null,
    degree: (formData.get("degree") as string) || null,
    current_role: (formData.get("current_role") as string) || null,
    current_institution: (formData.get("current_institution") as string) || null,
    grad_school: (formData.get("grad_school") as string) || null,
    bio: (formData.get("bio") as string) || null,
    headshot_url: (formData.get("headshot_url") as string) || null,
    user_id: (formData.get("user_id") as string) || null,
  });

  if (error) {
    redirect(`/admin/alumni/new?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/admin/alumni");
}

export async function updateAlumnus(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const graduation_year = formData.get("graduation_year") as string;

  const { error } = await supabase.from("alumni").update({
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    graduation_year: graduation_year ? parseInt(graduation_year) : null,
    degree: (formData.get("degree") as string) || null,
    current_role: (formData.get("current_role") as string) || null,
    current_institution: (formData.get("current_institution") as string) || null,
    grad_school: (formData.get("grad_school") as string) || null,
    bio: (formData.get("bio") as string) || null,
    headshot_url: (formData.get("headshot_url") as string) || null,
    user_id: (formData.get("user_id") as string) || null,
    updated_at: new Date().toISOString(),
  }).eq("id", id);

  if (error) {
    redirect(`/admin/alumni/${id}/edit?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/admin/alumni");
}

export async function deleteAlumnus(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;

  const { error } = await supabase.from("alumni").delete().eq("id", id);

  if (error) {
    redirect(`/admin/alumni?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/admin/alumni");
}

export async function toggleAlumnusPublished(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const published = formData.get("published") === "true";

  const { error } = await supabase
    .from("alumni")
    .update({ published: !published, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    redirect(`/admin/alumni?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/admin/alumni");
}
