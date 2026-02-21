"use client";

import { signOut } from "@/app/(auth)/login/actions";

export default function LogoutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="text-ucf-white hover:text-ucf-gold transition-colors text-sm"
      >
        Sign Out
      </button>
    </form>
  );
}
