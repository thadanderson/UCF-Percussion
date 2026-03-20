import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import EventCard from "@/components/ui/EventCard";
import type { Database } from "@/types/database";

type EventRow = Database["public"]["Tables"]["events"]["Row"];

export const metadata = { title: "UCF Percussion" };

export default async function HomePage() {
  const supabase = await createClient();

  const now = new Date().toISOString();

  const { data: eventsData } = await supabase
    .from("events")
    .select("*")
    .eq("published", true)
    .gte("starts_at", now)
    .order("starts_at", { ascending: true })
    .limit(3);
  const events = eventsData as EventRow[] | null;

  return (
    <div>
      {/* Hero */}
      <section className="bg-ucf-black text-ucf-white py-24 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-ucf-gold">UCF Percussion</span>
        </h1>
        <p className="text-base md:text-lg text-gray-300 max-w-xl mx-auto mb-8">
          World-class percussion education at the University of Central Florida.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/auditions"
            className="bg-ucf-gold text-ucf-black font-semibold px-6 py-3 rounded hover:opacity-90 transition-opacity"
          >
            Audition Info
          </Link>
          <Link
            href="/about"
            className="border border-ucf-white text-ucf-white px-6 py-3 rounded hover:bg-white/10 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-ucf-white">Upcoming Events</h2>
          <Link href="/events" className="text-ucf-gold text-sm font-medium hover:underline">
            View all →
          </Link>
        </div>
        {!events || events.length === 0 ? (
          <p className="text-ucf-white text-sm">No upcoming events at this time.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
