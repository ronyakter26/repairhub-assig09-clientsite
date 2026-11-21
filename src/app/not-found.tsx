
import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#F8FAFC] px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-orange-50 text-[#F59E0B]">
          <SearchX size={42} />
        </div>

        <h1 className="text-5xl font-bold text-[#142D4E]">404</h1>

        <h2 className="mt-3 text-2xl font-bold text-[#142D4E]">
          Page Not Found
        </h2>

        <p className="mt-3 leading-7 text-slate-500">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>

        <Link
          href="/"
          className="mt-7 inline-block rounded-lg bg-[#142D4E] px-6 py-3 font-semibold text-white transition hover:bg-[#1e416d]"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
