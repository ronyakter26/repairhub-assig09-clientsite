
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays, Search, ArrowLeft, CreditCard } from "lucide-react";
import { fetchWithAuth } from "@/lib/api";

type Booking = {
  _id: string;
  serviceTitle: string;
  category: string;
  status: string;
  paymentStatus: string;
  preferredDate: string;
  finalAmount: number;
  technicianName: string;
};

export default function CustomerBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [payingId, setPayingId] = useState<string | null>(null);

  useEffect(() => {
    async function loadBookings() {
      try {
        const response = await fetchWithAuth("/api/bookings/my");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load bookings.");
        }

        setBookings(data.bookings || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    }

    loadBookings();
  }, []);

  async function handlePayment(bookingId: string) {
    setPaymentError("");
    setPayingId(bookingId);

    try {
      const response = await fetchWithAuth(
        "/api/payments/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bookingId }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to start payment.");
      }

      if (!data.url) {
        throw new Error("Stripe checkout URL was not returned.");
      }

      window.location.assign(data.url);
    } catch (err) {
      setPaymentError(
        err instanceof Error ? err.message : "Payment could not be started."
      );
      setPayingId(null);
    }
  }

  const filteredBookings =
    filter === "all"
      ? bookings
      : bookings.filter((booking) => booking.status === filter);

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
            <h1 className="text-3xl font-bold text-[#142D4E]">My Bookings</h1>
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
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-bold text-[#142D4E]">
              All Bookings ({bookings.length})
            </h2>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
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

          {loading ? (
            <p className="py-12 text-center text-slate-500">
              Loading your bookings...
            </p>
          ) : error ? (
            <p className="py-12 text-center text-red-600">{error}</p>
          ) : filteredBookings.length === 0 ? (
            <div className="py-16 text-center">
              <CalendarDays size={42} className="mx-auto text-slate-300" />
              <h3 className="mt-5 text-lg font-bold text-[#142D4E]">
                No Bookings Found
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Your repair bookings will appear here.
              </p>
              <Link
                href="/services"
                className="mt-6 inline-flex rounded-lg bg-[#142D4E] px-5 py-3 text-sm font-semibold text-white"
              >
                Explore Services
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {paymentError && (
                <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                  {paymentError}
                </p>
              )}

              {filteredBookings.map((booking) => (
                <div
                  key={booking._id}
                  className="rounded-xl border border-slate-200 p-5"
                >
                  <div className="flex flex-col justify-between gap-4 sm:flex-row">
                    <div>
                      <h3 className="text-lg font-bold text-[#142D4E]">
                        {booking.serviceTitle}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {booking.category}
                      </p>
                      <p className="mt-2 text-sm text-slate-600">
                        Technician: {booking.technicianName}
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        Preferred Date: {new Date(
                          booking.preferredDate
                        ).toLocaleDateString("en-GB")}
                      </p>
                    </div>

                    <div className="sm:text-right">
                      <p className="text-xl font-bold text-[#F59E0B]">
                        ৳{Number(booking.finalAmount).toLocaleString("en-BD")}
                      </p>
                      <p className="mt-2 text-sm capitalize text-slate-600">
                        Status: {booking.status}
                      </p>
                      <p className="mt-1 text-sm capitalize text-slate-500">
                        Payment: {booking.paymentStatus}
                      </p>

                      {booking.status === "completed" &&
                        booking.paymentStatus === "unpaid" && (
                          <button
                            type="button"
                            onClick={() => handlePayment(booking._id)}
                            disabled={payingId !== null}
                            className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-[#F59E0B] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            <CreditCard size={17} />
                            {payingId === booking._id
                              ? "Redirecting to payment..."
                              : "Pay Now"}
                          </button>
                        )}

                      {booking.paymentStatus === "paid" && (
                        <p className="mt-4 text-sm font-semibold text-green-600">
                          Payment Completed
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
