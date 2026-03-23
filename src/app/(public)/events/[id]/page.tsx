import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const dateFmt = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "America/New_York",
});
const timeFmt = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  timeZoneName: "short",
  timeZone: "America/New_York",
});

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .eq("published", true)
    .single();

  if (!event) notFound();

  const start = new Date(event.starts_at);
  const end = event.ends_at ? new Date(event.ends_at) : null;

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link
        href="/events"
        className="text-ucf-gold hover:underline text-sm font-medium"
      >
        ← Back to News &amp; Events
      </Link>

      <h1 className="text-4xl font-bold text-ucf-white mt-6 mb-4">
        {event.title}
      </h1>

      <div className="space-y-1 mb-8">
        <p className="text-ucf-gold font-medium">
          {dateFmt.format(start)}
        </p>
        <p className="text-gray-300 text-sm">
          {timeFmt.format(start)}
          {end && ` – ${timeFmt.format(end)}`}
        </p>
        {event.location && (
          <p className="text-gray-300 text-sm">{event.location}</p>
        )}
      </div>

      {event.image_url && (
        <img
          src={event.image_url}
          alt={`${event.title} poster`}
          className="w-full rounded-lg object-contain mb-8"
        />
      )}

      {event.description && (
        <div
          className="text-gray-200 leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:list-inside [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:list-inside [&_ol]:mb-4 [&_a]:text-ucf-gold [&_a]:underline [&_strong]:text-ucf-white"
          dangerouslySetInnerHTML={{
            __html: event.description.includes("<")
              ? event.description
              : event.description.replace(/\n/g, "<br>"),
          }}
        />
      )}
    </div>
  );
}
