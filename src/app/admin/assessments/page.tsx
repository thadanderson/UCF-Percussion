import Link from "next/link";

const tools = [
  {
    href: "/admin/assessments/rubric",
    title: "Percussion Performance Assessment Rubric",
    abbreviation: "PPAR",
    description:
      "Faculty scoring tool for Technical Barrier and Performance Jury assessments. Supports asynchronous scoring by Anderson, Gay, and Moore with auto-computed PAR ratings and letter grades.",
    status: "active" as const,
  },
  {
    href: "#",
    title: "Ensemble Audition",
    abbreviation: "EA",
    description:
      "Assessment tool for ensemble auditions. Coming soon.",
    status: "coming-soon" as const,
  },
];

export default function AssessmentsPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Assessments</h1>
        <p className="mt-1 text-sm text-gray-500">
          Select an assessment tool below.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {tools.map((tool) => {
          const card = (
            <div
              className={`group relative flex flex-col rounded-lg border bg-white p-6 shadow-sm transition-shadow ${
                tool.status === "active"
                  ? "border-gray-200 hover:shadow-md cursor-pointer"
                  : "border-gray-100 opacity-60 cursor-default"
              }`}
            >
              {/* Abbreviation badge */}
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-ucf-black">
                <span className="text-xs font-bold text-ucf-gold tracking-wide">
                  {tool.abbreviation}
                </span>
              </div>

              <h2 className="text-base font-semibold text-gray-900 mb-2 leading-snug">
                {tool.title}
              </h2>
              <p className="text-sm text-gray-500 flex-1">{tool.description}</p>

              {tool.status === "coming-soon" && (
                <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-widest text-gray-400">
                  Coming Soon
                </span>
              )}

              {tool.status === "active" && (
                <span className="mt-4 inline-block text-xs font-semibold text-ucf-gold uppercase tracking-widest group-hover:underline">
                  Open tool →
                </span>
              )}
            </div>
          );

          return tool.status === "active" ? (
            <Link key={tool.href} href={tool.href} className="block">
              {card}
            </Link>
          ) : (
            <div key={tool.title}>{card}</div>
          );
        })}
      </div>
    </div>
  );
}
