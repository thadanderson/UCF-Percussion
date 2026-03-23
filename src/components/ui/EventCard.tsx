import Link from "next/link";
import type { Database } from "@/types/database";

type Event = Database["public"]["Tables"]["events"]["Row"];

const monthFmt = new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "America/New_York" });
const dayFmt = new Intl.DateTimeFormat("en-US", { day: "numeric", timeZone: "America/New_York" });
const timeFmt = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZoneName: "short", timeZone: "America/New_York" });

export default function EventCard({ event }: { event: Event }) {
  const start = new Date(event.starts_at);

  return (
    <Link
      href={`/events/${event.id}`}
      className="flex items-center gap-4 border border-white/15 rounded-lg px-4 py-4 hover:border-ucf-gold/60 hover:bg-white/5 transition-colors group"
    >
      {/* Date block */}
      <div className="flex-shrink-0 w-14 text-center">
        <div className="text-ucf-gold text-xs font-bold uppercase tracking-wide">
          {monthFmt.format(start)}
        </div>
        <div className="text-ucf-white text-2xl font-bold leading-none mt-0.5">
          {dayFmt.format(start)}
        </div>
      </div>

      {/* Divider */}
      <div className="w-px self-stretch bg-white/15 flex-shrink-0" />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-ucf-white font-semibold text-base leading-snug group-hover:text-ucf-gold transition-colors truncate">
          {event.title}
        </h3>
        <p className="text-gray-400 text-sm mt-0.5">
          {timeFmt.format(start)}
        </p>
        {event.location && (
          <p className="text-gray-500 text-xs mt-0.5 truncate">{event.location}</p>
        )}
      </div>

      {/* Thumbnail */}
      {event.image_url && (
        <img
          src={event.image_url}
          alt=""
          className="flex-shrink-0 w-16 h-16 rounded object-cover opacity-80 group-hover:opacity-100 transition-opacity"
        />
      )}

      {/* Arrow */}
      <div className="flex-shrink-0 text-gray-500 group-hover:text-ucf-gold transition-colors text-lg">
        →
      </div>
    </Link>
  );
}
