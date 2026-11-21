
import Link from "next/link";
import { Wrench, Search } from "lucide-react";

export default function ManageServicesPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#142D4E]">
              Manage Services
            </h1>
            <p className="mt-2 text-slate-500">
              Review, approve or reject technician service listings.
            </p>
          </div>

          <Link
            href="/dashboard/admin"
            className="rounded-lg border border-slate-200 bg-white px-5 py-3 text-center font-medium text-[#142D4E] transition hover:border-[#F59E0B]"
          >
            Back to Dashboard
          </Link>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-bold text-[#142D4E]">
              All Services
            </h2>

            <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-500">
              <Search size={18} />
              <span>Search services</span>
            </div>
          </div>

          <div className="mb-6 flex flex-wrap gap-3 text-sm font-medium">
            <span className="rounded-lg bg-[#142D4E] px-4 py-2 text-white">
              All Services
            </span>
            <span className="rounded-lg bg-slate-100 px-4 py-2 text-slate-600">
              Pending
            </span>
            <span className="rounded-lg bg-slate-100 px-4 py-2 text-slate-600">
              Approved
            </span>
            <span className="rounded-lg bg-slate-100 px-4 py-2 text-slate-600">
              Rejected
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-sm text-slate-600">
                  <th className="px-4 py-4 font-semibold">Service</th>
                  <th className="px-4 py-4 font-semibold">Technician</th>
                  <th className="px-4 py-4 font-semibold">Category</th>
                  <th className="px-4 py-4 font-semibold">Price</th>
                  <th className="px-4 py-4 font-semibold">Status</th>
                  <th className="px-4 py-4 font-semibold">Action</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td colSpan={6} className="px-4 py-16 text-center">
                    <div className="flex flex-col items-center">
                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 text-[#F59E0B]">
                        <Wrench size={27} />
                      </div>

                      <h3 className="font-bold text-[#142D4E]">
                        No Services Found
                      </h3>

                      <p className="mt-2 text-sm text-slate-500">
                        Technician service listings will appear here.
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
