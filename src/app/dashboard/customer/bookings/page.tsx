
import Link from "next/link";
import { CalendarDays, Search, ArrowLeft } from "lucide-react";

export default function CustomerBookingsPage() {
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

        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#142D4E]">
              My Bookings
            </h1>
            <p className="mt-2 text-slate-500">
              View and track all your repair requests.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#F59E0B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            <Search size={18} />
            Browse Services
          </Link>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-bold text-[#142D4E]">
              All Bookings
            </h2>

            <select
              defaultValue="all"
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-600 outline-none focus:border-[#F59E0B]"
            >
              <option value="all">All Status</option>
              <option value="requested">Requested</option>
              <option value="accepted">Accepted</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-[#F59E0B]">
              <CalendarDays size={30} />
            </div>

            <h3 className="mt-5 text-lg font-bold text-[#142D4E]">
              No Bookings Found
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
              You haven't requested any repair services yet. Browse our
              available services to get started.
            </p>

            <Link
              href="/services"
              className="mt-6 inline-flex rounded-lg bg-[#142D4E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1d416b]"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
