import { getWikiNav } from "@/lib/wiki";
import WikiSidebar from "@/components/wiki/WikiSidebar";

export default function WikiLayout({ children }: { children: React.ReactNode }) {
  const nav = getWikiNav();

  return (
    <div className="flex min-h-screen">
      <WikiSidebar nav={nav} />
      <div className="flex-1 p-8 bg-gray-50 min-w-0">{children}</div>
    </div>
  );
}
