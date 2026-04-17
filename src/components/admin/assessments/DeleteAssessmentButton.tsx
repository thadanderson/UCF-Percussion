"use client";

import { deleteAssessment } from "@/app/admin/assessments/actions";
import { useTransition } from "react";

export default function DeleteAssessmentButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (!confirm("Delete this assessment and all scores? This cannot be undone.")) return;
    startTransition(() => deleteAssessment(id));
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="text-sm text-red-600 hover:text-red-800 font-semibold px-3 py-2 rounded border border-red-200 hover:border-red-400 transition-colors disabled:opacity-50"
    >
      {isPending ? "Deleting…" : "Delete"}
    </button>
  );
}
