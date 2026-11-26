
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ClipboardList, Search } from "lucide-react";
import { fetchWithAuth } from "@/lib/api";

type Booking = {
  _id: string;
  serviceTitle: string;
  category: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  preferredDate: string;
  problemDescription: string;
  finalAmount: number;
  status: string;
  paymentStatus: string;
};

export default function RepairRequestsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState("");

  const loadBookings = useCallback(async () => {
    try {
      setError("");

      const response = await fetchWithAuth(
        "/api/bookings/technician"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load repair requests."
        );
      }

      setBookings(data.bookings || []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  const updateStatus = async (
    booking: Booking,
    status: string
  ) => {
    try {
      setUpdatingId(booking._id);
      setError("");

      const body: {
        status: string;
        finalAmount?: number;
      } = { status };

      if (status === "completed") {
        body.finalAmount = Number(booking.finalAmount);
      }

      const response = await fetchWithAuth(
        `/api/bookings/${booking._id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update booking status."
        );
      }

      await loadBookings();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Status update failed."
      );
    } finally {
      setUpdatingId("");
    }
  };

  const filteredBookings =
    filter === "all"
      ? bookings
      : bookings.filter(
          (booking) => booking.status === filter
        );

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB");
  };

  const statusClass = (status: string) => {
    switch (status) {
      case "requested":
        return "bg-yellow-100 text-yellow-700";
      case "accepted":
        return "bg-blue-100 text-blue-700";
      case "in-progress":
        return "bg-purple-100 text-purple-700";
      case "completed":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

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
              All Repair Requests ({bookings.length})
            </h2>

            <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2">
              <Search size={18} className="text-slate-500" />

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-transparent text-sm text-slate-600 outline-none"
              >
                <option value="all">All Requests</option>
                <option value="requested">Requested</option>
                <option value="accepted">Accepted</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-xl border border-slate-200 bg-white p-12 text-center text-slate-500">
            Loading repair requests...
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-[#F59E0B]">
              <ClipboardList size={30} />
            </div>

            <h2 className="text-xl font-bold text-[#142D4E]">
              No Repair Requests Yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              No bookings found for this status.
            </p>

            <Link
              href="/dashboard/technician/my-services"
              className="mt-6 inline-block rounded-lg bg-[#142D4E] px-6 py-3 font-semibold text-white transition hover:bg-[#1e416d]"
            >
              View My Services
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {filteredBookings.map((booking) => (
              <div
                key={booking._id}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="flex flex-col justify-between gap-3 sm:flex-row">
                  <div>
                    <h2 className="text-xl font-bold text-[#142D4E]">
                      {booking.serviceTitle}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      {booking.category}
                    </p>
                  </div>

                  <span
                    className={`h-fit w-fit rounded-full px-3 py-1 text-sm font-semibold capitalize ${statusClass(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>
                </div>

                <div className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
                  <div>
                    <p className="text-slate-500">Customer</p>
                    <p className="mt-1 font-semibold text-[#142D4E]">
                      {booking.customerName}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-500">Customer Email</p>
                    <p className="mt-1 font-semibold text-[#142D4E]">
                      {booking.customerEmail}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-500">Phone Number</p>
                    <p className="mt-1 font-semibold text-[#142D4E]">
                      {booking.customerPhone}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-500">Preferred Date</p>
                    <p className="mt-1 font-semibold text-[#142D4E]">
                      {formatDate(booking.preferredDate)}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-500">Address</p>
                    <p className="mt-1 font-semibold text-[#142D4E]">
                      {booking.address}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-500">Final Amount</p>
                    <p className="mt-1 font-semibold text-[#142D4E]">
                      ৳{booking.finalAmount}
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-lg bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-[#142D4E]">
                    Problem Description
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {booking.problemDescription}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  {booking.status === "requested" && (
                    <>
                      <button
                        onClick={() =>
                          updateStatus(booking, "accepted")
                        }
                        disabled={updatingId === booking._id}
                        className="rounded-lg bg-green-600 px-5 py-2.5 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
                      >
                        {updatingId === booking._id
                          ? "Updating..."
                          : "Accept Booking"}
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(booking, "rejected")
                        }
                        disabled={updatingId === booking._id}
                        className="rounded-lg bg-red-600 px-5 py-2.5 font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {booking.status === "accepted" && (
                    <button
                      onClick={() =>
                        updateStatus(booking, "in-progress")
                      }
                      disabled={updatingId === booking._id}
                      className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                      Start Work
                    </button>
                  )}

                  {booking.status === "in-progress" && (
                    <button
                      onClick={() =>
                        updateStatus(booking, "completed")
                      }
                      disabled={updatingId === booking._id}
                      className="rounded-lg bg-green-600 px-5 py-2.5 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
                    >
                      Complete Job
                    </button>
                  )}
                </div>

                <p className="mt-4 text-xs text-slate-500">
                  Payment Status: {booking.paymentStatus}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
