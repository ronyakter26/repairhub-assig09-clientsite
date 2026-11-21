
import Link from "next/link";
import { XCircle } from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-600">
          <XCircle size={45} />
        </div>

        <h1 className="text-3xl font-bold text-[#142D4E]">
          Payment Cancelled
        </h1>

        <p className="mt-4 leading-7 text-slate-500">
          Your payment was not completed. You can return to your bookings and
          try again later.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/dashboard/customer/bookings"
            className="rounded-lg bg-[#142D4E] px-6 py-3 font-semibold text-white transition hover:bg-[#1e416d]"
          >
            View My Bookings
          </Link>

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
