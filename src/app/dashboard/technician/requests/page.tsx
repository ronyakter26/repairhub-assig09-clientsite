
import Link from "next/link";
import { ClipboardList, Search } from "lucide-react";

export default function RepairRequestsPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#142D4E]">
              Repair Requests
            </h1>
            <p className="mt-2 text-slate-500">
              View customer repair requests and manage your jobs.
            </p>
          </div>

          <Link
            href="/dashboard/technician/my-services"
            className="rounded-lg border border-slate-200 bg-white px-5 py-3 text-center font-medium text-[#142D4E] transition hover:border-[#F59E0B]"
          >
            My Services
          </Link>
        </div>

        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-bold text-[#142D4E]">
              All Repair Requests
            </h2>

            <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-500">
              <Search size={18} />
              <span>Filter by status</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-[#F59E0B]">
            <ClipboardList size={30} />
          </div>

          <h2 className="text-xl font-bold text-[#142D4E]">
            No Repair Requests Yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            You haven't received any repair requests yet. Customer requests
            will appear here when they book your services.
          </p>

          <Link
            href="/dashboard/technician/my-services"
            className="mt-6 inline-block rounded-lg bg-[#142D4E] px-6 py-3 font-semibold text-white transition hover:bg-[#1e416d]"
          >
            View My Services
          </Link>
        </div>
      </div>
    </main>
  );
}