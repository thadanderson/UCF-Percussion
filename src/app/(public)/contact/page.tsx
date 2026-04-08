import { getContent } from "@/lib/content";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  const { data: fm, html } = getContent("contact");
  const address = fm.address as string[];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-ucf-white mb-4">{fm.title as string}</h1>
      <p className="text-ucf-white mb-10 leading-relaxed">{fm.intro as string}</p>

      <div className="space-y-6">
        <div>
          <h2 className="text-sm font-semibold text-ucf-white uppercase tracking-widest mb-1">
            Email
          </h2>
          <a
            href={`mailto:${fm.email as string}`}
            className="text-ucf-gold text-lg font-medium hover:underline"
          >
            {fm.email as string}
          </a>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-ucf-white uppercase tracking-widest mb-1">
            Location
          </h2>
          <p className="text-ucf-white">
            {address.map((line, i) => (
              <span key={i}>{line}{i < address.length - 1 && <br />}</span>
            ))}
          </p>
        </div>

        <div className="content-body">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </div>
  );
}
