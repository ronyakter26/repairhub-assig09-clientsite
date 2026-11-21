
import Link from "next/link";
import { CreditCard, Search } from "lucide-react";

export default function TransactionsPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#142D4E]">
              Transactions
            </h1>
            <p className="mt-2 text-slate-500">
              View and monitor all payment transactions.
            </p>
          </div>

          <Link
            href="/dashboard/admin"
            className="rounded-lg border border-slate-200 bg-white px-5 py-3 text-center font-medium text-[#142D4E] transition hover:border-[#F59E0B]"
          >
            Back to Dashboard
          </Link>
        </div>

        <div className="mb-6 grid gap-5 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Total Transactions</p>
            <h2 className="mt-3 text-3xl font-bold text-[#142D4E]">0</h2>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Total Revenue</p>
            <h2 className="mt-3 text-3xl font-bold text-[#142D4E]">৳0</h2>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-bold text-[#142D4E]">
              All Transactions
            </h2>

            <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-500">
              <Search size={18} />
              <span>Search transactions</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-sm text-slate-600">
                  <th className="px-4 py-4 font-semibold">Transaction ID</th>
                  <th className="px-4 py-4 font-semibold">Customer</th>
                  <th className="px-4 py-4 font-semibold">Service</th>
                  <th className="px-4 py-4 font-semibold">Amount</th>
                  <th className="px-4 py-4 font-semibold">Date</th>
                  <th className="px-4 py-4 font-semibold">Status</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td colSpan={6} className="px-4 py-16 text-center">
                    <div className="flex flex-col items-center">
                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-purple-50 text-purple-600">
                        <CreditCard size={27} />
                      </div>

                      <h3 className="font-bold text-[#142D4E]">
                        No Transactions Found
                      </h3>

                      <p className="mt-2 text-sm text-slate-500">
                        Payment transactions will appear here after customers
                        complete their payments.
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
