
import Link from "next/link";
import {
  CalendarDays,
  Clock,
  CheckCircle,
  CreditCard,
  ArrowRight,
} from "lucide-react";

const stats = [
  {
    title: "Total Bookings",
    value: "0",
    icon: CalendarDays,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Pending Requests",
    value: "0",
    icon: Clock,
    color: "bg-orange-50 text-orange-600",
  },
  {
    title: "Completed Repairs",
    value: "0",
    icon: CheckCircle,
    color: "bg-green-50 text-green-600",
  },
];

export default function CustomerDashboard() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#142D4E]">
            Customer Dashboard
          </h1>
          <p className="mt-2 text-slate-500">
            Manage your repair requests and track your bookings.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">
                      {stat.title}
                    </p>
                    <h2 className="mt-3 text-3xl font-bold text-[#142D4E]">
                      {stat.value}
                    </h2>
                  </div>

                  <div className={`rounded-xl p-4 ${stat.color}`}>
                    <Icon size={25} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-6 lg:col-span-2">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#142D4E]">
                Recent Bookings
              </h2>

              <Link
                href="/dashboard/customer/bookings"
                className="flex items-center gap-2 text-sm font-semibold text-[#F59E0B] hover:text-orange-600"
              >
                View All <ArrowRight size={16} />
              </Link>
            </div>

            <div className="py-12 text-center">
              <CalendarDays
                size={42}
                className="mx-auto text-slate-300"
              />
              <p className="mt-4 font-semibold text-slate-600">
                No bookings yet
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Your repair bookings will appear here.
              </p>

              <Link
                href="/services"
                className="mt-5 inline-block rounded-lg bg-[#F59E0B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Browse Services
              </Link>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="mb-5 text-xl font-bold text-[#142D4E]">
              Quick Links
            </h2>

            <div className="space-y-4">
              <Link
                href="/dashboard/customer/bookings"
                className="flex items-center justify-between rounded-lg border border-slate-200 p-4 transition hover:border-[#F59E0B]"
              >
                <span className="flex items-center gap-3 text-sm font-medium text-slate-700">
                  <CalendarDays size={20} />
                  My Bookings
                </span>
                <ArrowRight size={17} />
              </Link>

              <Link
                href="/dashboard/customer/payments"
                className="flex items-center justify-between rounded-lg border border-slate-200 p-4 transition hover:border-[#F59E0B]"
              >
                <span className="flex items-center gap-3 text-sm font-medium text-slate-700">
                  <CreditCard size={20} />
                  My Payments
                </span>
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
