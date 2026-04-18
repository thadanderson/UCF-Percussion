"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { WikiNav } from "@/lib/wiki";

interface WikiSidebarProps {
  nav: WikiNav;
  isAdmin?: boolean;
}

const HamburgerIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const TOOLS = [
  { href: "/dashboard/barrier-review", label: "Barrier Review & Drawing" },
  { href: "/dashboard/flash-phrases",  label: "Flash Phrases" },
];

export default function WikiSidebar({ nav, isAdmin = false }: WikiSidebarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  function isWikiActive(slug: string[]) {
    return pathname === `/dashboard/wiki/${slug.join("/")}`;
  }

  // Collapsed — thin strip with only the hamburger
  if (!open) {
    return (
      <aside className="w-12 shrink-0 bg-ucf-black min-h-screen flex flex-col items-center pt-5">
        <button
          onClick={() => setOpen(true)}
          className="text-gray-400 hover:text-ucf-white transition-colors"
          aria-label="Open navigation"
        >
          <HamburgerIcon />
        </button>
      </aside>
    );
  }

  // Open — full sidebar
  return (
    <aside className="w-72 shrink-0 bg-ucf-black min-h-screen p-6 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-ucf-gold font-bold text-sm uppercase tracking-widest">
          Studio Dashboard
        </p>
        <button
          onClick={() => setOpen(false)}
          className="text-gray-400 hover:text-ucf-white transition-colors"
          aria-label="Close navigation"
        >
          <HamburgerIcon />
        </button>
      </div>

      {/* Overview */}
      <Link
        href="/dashboard/wiki"
        className={`px-3 py-2 rounded text-sm transition-colors ${
          pathname === "/dashboard/wiki"
            ? "bg-ucf-gold text-ucf-black font-semibold"
            : "text-gray-300 hover:text-ucf-white hover:bg-white/10"
        }`}
      >
        Overview
      </Link>

      {/* Wiki sections */}
      {nav.sections.map((section) => (
        <div key={section.folder} className="mt-4">
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-500 px-3 mb-1">
            {section.title}
          </p>
          {section.pages.map((page) => {
            const active = isWikiActive(page.slug);
            return (
              <Link
                key={page.slug.join("/")}
                href={`/dashboard/wiki/${page.slug.join("/")}`}
                className={`block pl-6 pr-3 py-2 rounded text-sm transition-colors ${
                  active
                    ? "bg-ucf-gold text-ucf-black font-semibold"
                    : "text-gray-300 hover:text-ucf-white hover:bg-white/10"
                }`}
              >
                {page.title}
              </Link>
            );
          })}
        </div>
      ))}

      {/* Tools section */}
      <div className="mt-6">
        <p className="text-xs font-bold uppercase tracking-widest text-neutral-500 px-3 mb-1">
          Tools
        </p>
        {TOOLS.map(({ href, label }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`block px-3 py-2 rounded text-sm transition-colors ${
                active
                  ? "bg-ucf-gold text-ucf-black font-semibold"
                  : "text-gray-300 hover:text-ucf-white hover:bg-white/10"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Admin link */}
      {isAdmin && (
        <div className="border-t border-neutral-800 pt-4 mt-4">
          <Link
            href="/admin"
            className="block px-3 py-2 rounded text-sm text-neutral-500 hover:text-ucf-white hover:bg-white/10 transition-colors"
          >
            Admin Dashboard →
          </Link>
        </div>
      )}
    </aside>
  );
}
