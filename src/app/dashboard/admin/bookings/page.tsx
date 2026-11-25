"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ClipboardList, Search, RefreshCw } from "lucide-react";
import { fetchWithAuth } from "@/lib/api";

interface Booking {
  _id: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  serviceTitle?: string;
  technicianName?: string;
  preferredDate?: string;
  status?: string;
}

export default function ManageBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  async function loadBookings() {
    try {
      setLoading(true);
      setError("");

      const response = await fetchWithAuth("/api/admin/bookings");
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to load bookings.");
      }

      setBookings(result.bookings || []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBookings();
  }, []);

  const filteredBookings = bookings.filter((booking) => {
    const matchesStatus =
      status === "all" || booking.status?.toLowerCase() === status;

    const searchText = search.toLowerCase();

    const matchesSearch =
      (booking.customerName || "").toLowerCase().includes(searchText) ||
      (booking.customerEmail || "").toLowerCase().includes(searchText) ||
      (booking.customerPhone || "").toLowerCase().includes(searchText) ||
      (booking.serviceTitle || "").toLowerCase().includes(searchText);

    return matchesStatus && matchesSearch;
  });

  function formatDate(date?: string) {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "—";

    return parsedDate.toLocaleDateString("en-GB");
  }

  const statusCount = (value: string) =>
    bookings.filter(
      (booking) => booking.status?.toLowerCase() === value
    ).length;

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#142D4E]">
              Manage Bookings
            </h1>
            <p className="mt-2 text-slate-500">
              Monitor customer repair bookings.
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
              All Bookings ({bookings.length})
            </h2>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2">
                <Search size={18} className="text-slate-500" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search bookings..."
                  className="w-full text-sm outline-none sm:w-52"
                />
              </div>

              <button
                onClick={loadBookings}
                disabled={loading}
                className="flex items-center justify-center gap-2 rounded-lg bg-[#142D4E] px-4 py-2 text-sm font-medium text-white hover:bg-[#1d416b] disabled:opacity-50"
              >
                <RefreshCw size={16} />
                Refresh
              </button>
            </div>
          </div>

          <div className="mb-6 flex flex-wrap gap-3 text-sm font-medium">
            <button
              onClick={() => setStatus("all")}
              className={`rounded-lg px-4 py-2 ${
                status === "all"
                  ? "bg-[#142D4E] text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              All Bookings ({bookings.length})
            </button>

            <button
              onClick={() => setStatus("requested")}
              className={`rounded-lg px-4 py-2 ${
                status === "requested"
                  ? "bg-[#142D4E] text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              Requested ({statusCount("requested")})
            </button>

            <button
              onClick={() => setStatus("accepted")}
              className={`rounded-lg px-4 py-2 ${
                status === "accepted"
                  ? "bg-[#142D4E] text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              Accepted ({statusCount("accepted")})
            </button>

            <button
              onClick={() => setStatus("in-progress")}
              className={`rounded-lg px-4 py-2 ${
                status === "in-progress"
                  ? "bg-[#142D4E] text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              In Progress ({statusCount("in-progress")})
            </button>

            <button
              onClick={() => setStatus("completed")}
              className={`rounded-lg px-4 py-2 ${
                status === "completed"
                  ? "bg-[#142D4E] text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              Completed ({statusCount("completed")})
            </button>

            <button
              onClick={() => setStatus("rejected")}
              className={`rounded-lg px-4 py-2 ${
                status === "rejected"
                  ? "bg-[#142D4E] text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              Rejected ({statusCount("rejected")})
            </button>
          </div>

          {loading ? (
            <p className="py-16 text-center text-slate-500">
              Loading bookings...
            </p>
          ) : error ? (
            <p className="py-16 text-center text-red-500">{error}</p>
          ) : filteredBookings.length === 0 ? (
            <div className="py-16 text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-600">
                  <ClipboardList size={27} />
                </div>
              </div>

              <h3 className="font-bold text-[#142D4E]">
                No Bookings Found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Customer repair bookings will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[950px] text-left">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-sm text-slate-600">
                    <th className="px-4 py-4 font-semibold">Customer</th>
                    <th className="px-4 py-4 font-semibold">Phone Number</th>
                    <th className="px-4 py-4 font-semibold">Service</th>
                    <th className="px-4 py-4 font-semibold">Technician</th>
                    <th className="px-4 py-4 font-semibold">Date</th>
                    <th className="px-4 py-4 font-semibold">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr
                      key={booking._id}
                      className="border-b border-slate-100 text-sm"
                    >
                      <td className="px-4 py-4">
                        <p className="font-semibold text-[#142D4E]">
                          {booking.customerName || "—"}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {booking.customerEmail || ""}
                        </p>
                      </td>

                      <td className="px-4 py-4 font-medium text-slate-700">
                        {booking.customerPhone || "—"}
                      </td>

                      <td className="px-4 py-4 text-slate-700">
                        {booking.serviceTitle || "—"}
                      </td>

                      <td className="px-4 py-4 text-slate-700">
                        {booking.technicianName || "—"}
                      </td>

                      <td className="px-4 py-4 text-slate-700">
                        {formatDate(booking.preferredDate)}
                      </td>

                      <td className="px-4 py-4">
                        <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold capitalize text-orange-600">
                          {booking.status || "Unknown"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}