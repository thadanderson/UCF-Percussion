import type { Database } from "@/types/database";

type Event = Database["public"]["Tables"]["events"]["Row"];

const fmt = new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeStyle: "short" });

export default function EventCard({ event }: { event: Event }) {
  return (
    <div className="border border-white/20 rounded-lg overflow-hidden">
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
          <div
            className="text-gray-300 text-sm mt-3 leading-relaxed [&_p]:mb-2 [&_ul]:list-disc [&_ul]:list-inside [&_ol]:list-decimal [&_ol]:list-inside [&_a]:text-ucf-gold [&_a]:underline [&_strong]:text-ucf-white"
            dangerouslySetInnerHTML={{
              __html: event.description.includes("<")
                ? event.description
                : event.description.replace(/\n/g, "<br>"),
            }}
          />
        )}
      </div>
      {event.image_url && (
        <img
          src={event.image_url}
          alt={`${event.title} poster`}
          className="w-full object-contain"
        />
      )}
    </div>
  );
}
