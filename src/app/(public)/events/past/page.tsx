import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import EventCard from "@/components/ui/EventCard";
import type { Database } from "@/types/database";

type EventRow = Database["public"]["Tables"]["events"]["Row"];

export const metadata = { title: "Past Events" };

export default async function PastEventsPage() {
  const supabase = await createClient();
  const now = new Date().toISOString();

  const { data: eventsData } = await supabase
    .from("events")
    .select("*")
    .eq("published", true)
    .lt("starts_at", now)
    .order("starts_at", { ascending: false });
  const events = eventsData as EventRow[] | null;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="flex items-center gap-4 mb-10">
        <Link href="/events" className="text-ucf-gold hover:underline text-sm font-medium">
          ← Upcoming Events
        </Link>
      </div>

      <h1 className="text-4xl font-bold text-ucf-white mb-10">Past Events</h1>

      {!events || events.length === 0 ? (
        <p className="text-ucf-white">No past events yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
