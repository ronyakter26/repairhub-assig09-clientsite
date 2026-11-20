
import Link from "next/link";
import {
  CreditCard,
  ArrowLeft,
  Receipt,
} from "lucide-react";

export default function CustomerPaymentsPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/dashboard/customer"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-[#F59E0B]"
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#142D4E]">
            My Payments
          </h1>
          <p className="mt-2 text-slate-500">
            View your repair payment history and transaction details.
          </p>
        </div>

        <div className="mb-6 grid gap-5 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                <CreditCard size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Payments</p>
                <h2 className="mt-1 text-2xl font-bold text-[#142D4E]">
                  0
                </h2>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-50 p-3 text-green-600">
                <Receipt size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Amount Paid</p>
                <h2 className="mt-1 text-2xl font-bold text-[#142D4E]">
                  ৳0
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#142D4E]">
            Payment History
          </h2>

          <div className="py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-[#F59E0B]">
              <CreditCard size={30} />
            </div>

            <h3 className="mt-5 text-lg font-bold text-[#142D4E]">
              No Payment History
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
              Your completed repair payments will appear here.
            </p>

            <Link
              href="/services"
              className="mt-6 inline-flex rounded-lg bg-[#142D4E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1d416b]"
            >
              Browse Services
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
