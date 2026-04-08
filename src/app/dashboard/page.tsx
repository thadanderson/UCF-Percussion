import Link from "next/link";

export const metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-ucf-white mb-4">Dashboard</h1>
      <p className="text-ucf-gold font-medium mb-10">Welcome to the UCF Percussion Studio portal.</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/dashboard/barrier-review"
          className="block p-6 bg-ucf-black border border-white/20 rounded-lg hover:border-ucf-gold transition-colors group"
        >
          <div className="text-2xl mb-3">🥁</div>
          <h2 className="text-lg font-bold text-ucf-white group-hover:text-ucf-gold transition-colors mb-1">
            Barrier Review &amp; Drawing
          </h2>
          <p className="text-gray-400 text-sm">Randomly draw etudes and rudiments for your barrier review session.</p>
        </Link>

        <Link
          href="/dashboard/schedule"
          className="block p-6 bg-ucf-black border border-white/20 rounded-lg hover:border-ucf-gold transition-colors group"
        >
          <div className="text-2xl mb-3">📅</div>
          <h2 className="text-lg font-bold text-ucf-white group-hover:text-ucf-gold transition-colors mb-1">
            Lesson Schedule
          </h2>
          <p className="text-gray-400 text-sm">View your upcoming private lessons.</p>
        </Link>

        <Link
          href="/dashboard/library"
          className="block p-6 bg-ucf-black border border-white/20 rounded-lg hover:border-ucf-gold transition-colors group"
        >
          <div className="text-2xl mb-3">🎵</div>
          <h2 className="text-lg font-bold text-ucf-white group-hover:text-ucf-gold transition-colors mb-1">
            Music Library
          </h2>
          <p className="text-gray-400 text-sm">Browse and search the Percussion Music Library.</p>
        </Link>

        <Link
          href="/dashboard/juries"
          className="block p-6 bg-ucf-black border border-white/20 rounded-lg hover:border-ucf-gold transition-colors group"
        >
          <div className="text-2xl mb-3">🎓</div>
          <h2 className="text-lg font-bold text-ucf-white group-hover:text-ucf-gold transition-colors mb-1">
            Jury Dates
          </h2>
          <p className="text-gray-400 text-sm">View your jury schedule and upcoming assessments.</p>
        </Link>
      </div>
    </div>
  );
}
