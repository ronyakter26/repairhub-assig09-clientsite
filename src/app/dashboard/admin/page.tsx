
import Link from "next/link";
import {
  Users,
  Wrench,
  ClipboardList,
  CreditCard,
  ArrowRight,
} from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "0",
    icon: Users,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Total Services",
    value: "0",
    icon: Wrench,
    color: "bg-orange-50 text-orange-600",
  },
  {
    title: "Total Bookings",
    value: "0",
    icon: ClipboardList,
    color: "bg-green-50 text-green-600",
  },
  {
    title: "Total Transactions",
    value: "0",
    icon: CreditCard,
    color: "bg-purple-50 text-purple-600",
  },
];

const adminLinks = [
  {
    title: "Manage Users",
    description: "View users and manage their roles.",
    href: "/dashboard/admin/users",
    icon: Users,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Manage Services",
    description: "Review, approve or reject service listings.",
    href: "/dashboard/admin/services",
    icon: Wrench,
    color: "bg-orange-50 text-orange-600",
  },
  {
    title: "Manage Bookings",
    description: "Monitor customer repair bookings.",
    href: "/dashboard/admin/bookings",
    icon: ClipboardList,
    color: "bg-green-50 text-green-600",
  },
  {
    title: "Transactions",
    description: "View payment and transaction records.",
    href: "/dashboard/admin/transactions",
    icon: CreditCard,
    color: "bg-purple-50 text-purple-600",
  },
];

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#142D4E]">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-slate-500">
            Manage users, services, bookings and transactions.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">{stat.title}</p>
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

        <div className="mt-10">
          <h2 className="mb-5 text-xl font-bold text-[#142D4E]">
            Admin Management
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            {adminLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-[#F59E0B]"
                >
                  <div className="flex items-center gap-4">
                    <div className={`rounded-xl p-4 ${item.color}`}>
                      <Icon size={26} />
                    </div>

                    <div>
                      <h3 className="font-bold text-[#142D4E]">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <ArrowRight size={20} className="text-slate-400" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
