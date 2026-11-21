
"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#F8FAFC] px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-3xl font-bold text-[#142D4E]">
          Something Went Wrong!
        </h1>

        <p className="mt-4 leading-7 text-slate-500">
          Sorry, something went wrong while loading this page. Please try again.
        </p>

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={() => reset()}
            className="rounded-lg bg-[#142D4E] px-6 py-3 font-semibold text-white transition hover:bg-[#1e416d]"
          >
            Try Again
          </button>

          <Link
            href="/"
            className="rounded-lg border border-slate-300 px-6 py-3 font-semibold text-[#142D4E] transition hover:border-[#F59E0B]"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
