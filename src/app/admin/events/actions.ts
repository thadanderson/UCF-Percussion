"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// Convert a datetime-local string (no timezone) entered in Eastern time to UTC ISO.
function easternToISO(dtLocal: string | null): string | null {
  if (!dtLocal) return null;
  const naive = new Date(dtLocal + ":00Z"); // parse face value as UTC temporarily
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    timeZoneName: "shortOffset",
  }).formatToParts(naive);
  const offsetPart = parts.find((p) => p.type === "timeZoneName")?.value ?? "GMT-5";
  const offsetHours = parseInt(offsetPart.replace("GMT", ""), 10);
  return new Date(naive.getTime() - offsetHours * 3600000).toISOString();
}

export async function createEvent(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.from("events").insert({
    title: formData.get("title") as string,
    description: (formData.get("description") as string) || null,
    location: (formData.get("location") as string) || null,
    starts_at: easternToISO(formData.get("starts_at") as string) as string,
    ends_at: easternToISO((formData.get("ends_at") as string) || null),
    image_url: (formData.get("image_url") as string) || null,
  });

  if (error) {
    redirect(`/admin/events/new?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/admin/events");
}

export async function updateEvent(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;

  const { error } = await supabase.from("events").update({
    title: formData.get("title") as string,
    description: (formData.get("description") as string) || null,
    location: (formData.get("location") as string) || null,
    starts_at: easternToISO(formData.get("starts_at") as string) as string,
    ends_at: easternToISO((formData.get("ends_at") as string) || null),
    image_url: (formData.get("image_url") as string) || null,
  }).eq("id", id);

  if (error) {
    redirect(`/admin/events/${id}/edit?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/admin/events");
}

export async function deleteEvent(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;

  const { error } = await supabase.from("events").delete().eq("id", id);

  if (error) {
    redirect(`/admin/events?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/admin/events");
}

export async function toggleEventPublished(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const published = formData.get("published") === "true";

  const { error } = await supabase.from("events").update({ published: !published }).eq("id", id);

  if (error) {
    redirect(`/admin/events?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/admin/events");
}
