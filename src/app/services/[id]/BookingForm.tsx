
"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { fetchWithAuth } from "@/lib/api";

type BookingFormProps = {
  serviceId: string;
};

export default function BookingForm({ serviceId }: BookingFormProps) {
  const { data: session, isPending } = useSession();

  const [customerPhone, setCustomerPhone] = useState(
    session?.user?.phone || ""
  );
  const [address, setAddress] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [problemDescription, setProblemDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  if (isPending) {
    return <p className="text-center text-slate-500">Checking login...</p>;
  }

  if (!session) {
    return (
      <Link
        href="/sign-in"
        className="block rounded-lg bg-[#F59E0B] px-7 py-4 text-center font-bold text-white transition hover:bg-amber-600"
      >
        Sign In to Request Repair
      </Link>
    );
  }

  if (session.user.role !== "customer") {
    return (
      <p className="rounded-lg bg-amber-50 p-4 text-center text-amber-700">
        Only customers can request a booking.
      </p>
    );
  }

  async function handleBooking(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setSuccess(false);

    try {
      const response = await fetchWithAuth("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceId,
          customerPhone,
          address,
          preferredDate,
          problemDescription,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Booking failed.");
      }

      setSuccess(true);
      setMessage("Booking request submitted successfully!");
      setAddress("");
      setPreferredDate("");
      setProblemDescription("");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-2 text-2xl font-bold text-[#142D4E]">
        Request Booking
      </h2>

      <p className="mb-6 text-sm text-slate-500">
        Fill in the details to request this repair service.
      </p>

      <form onSubmit={handleBooking} className="space-y-4">
        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Phone Number
          </label>
          <input
            type="tel"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-amber-500"
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Address
          </label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            rows={2}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-amber-500"
            placeholder="Enter your full address"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Preferred Date
          </label>
          <input
            type="date"
            value={preferredDate}
            onChange={(e) => setPreferredDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Describe Your Problem
          </label>
          <textarea
            value={problemDescription}
            onChange={(e) => setProblemDescription(e.target.value)}
            required
            minLength={20}
            rows={4}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-amber-500"
            placeholder="Describe the repair problem (minimum 20 characters)"
          />
        </div>

        {message && (
          <p className={success ? "text-green-600" : "text-red-600"}>
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-[#F59E0B] px-7 py-4 font-bold text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Request Booking"}
        </button>
      </form>
    </div>
  );
}
