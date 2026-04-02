import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ucf-black text-ucf-white border-t-2 border-ucf-gold">
      <div className="max-w-5xl mx-auto px-6 py-10 grid gap-8 sm:grid-cols-3">

        {/* Branding */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <img src="/logo.svg" alt="UCF Percussion logo" className="w-10 h-10" />
            <p className="font-bold text-ucf-gold text-lg">UCF Percussion</p>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            The Percussion Studies Program at the University of Central Florida.
          </p>
          <a
            href="https://www.youtube.com/@ucfpercussion"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-gray-400 hover:text-ucf-gold transition-colors text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            YouTube
          </a>
        </div>

        {/* Quick Links */}
        <div>
          <p className="font-semibold text-ucf-white text-sm uppercase tracking-widest mb-3">Quick Links</p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/about" className="hover:text-ucf-gold transition-colors">About</Link></li>
            <li><Link href="/events" className="hover:text-ucf-gold transition-colors">News &amp; Events</Link></li>
            <li><Link href="/auditions" className="hover:text-ucf-gold transition-colors">Audition</Link></li>
            <li><Link href="/alumni" className="hover:text-ucf-gold transition-colors">Alumni</Link></li>
            <li><Link href="/contact" className="hover:text-ucf-gold transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="font-semibold text-ucf-white text-sm uppercase tracking-widest mb-3">Contact</p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="mailto:percussion@ucf.edu" className="hover:text-ucf-gold transition-colors">
                percussion@ucf.edu
              </a>
            </li>
            <li>UCF School of Performing Arts</li>
            <li>12488 Centaurus Blvd.</li>
            <li>Orlando, FL 32816-1354</li>
          </ul>
        </div>

      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} UCF Percussion. All rights reserved.
      </div>
    </footer>
  );
}
