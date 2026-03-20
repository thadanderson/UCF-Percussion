import type { Database } from "@/types/database";

type Event = Database["public"]["Tables"]["events"]["Row"];

const fmt = new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeStyle: "short" });

export default function EventCard({ event }: { event: Event }) {
  return (
    <div className="border border-white/20 rounded-lg overflow-hidden">
      {event.image_url && (
        <img
          src={event.image_url}
          alt={`${event.title} poster`}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-ucf-white">{event.title}</h3>
        <p className="text-ucf-gold text-sm font-medium mt-1">
          {fmt.format(new Date(event.starts_at))}
          {event.ends_at && ` – ${fmt.format(new Date(event.ends_at))}`}
        </p>
        {event.location && (
          <p className="text-gray-300 text-sm mt-1">{event.location}</p>
        )}
        {event.description && (
          <p className="text-gray-300 text-sm mt-3 leading-relaxed">{event.description}</p>
        )}
      </div>
    </div>
  );
}
