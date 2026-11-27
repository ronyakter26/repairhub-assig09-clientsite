
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CreditCard,
  ArrowLeft,
  Receipt,
  Loader2,
} from "lucide-react";
import { fetchWithAuth } from "@/lib/api";

type Payment = {
  _id: string;
  serviceTitle: string;
  amount: number;
  currency: string;
  transactionId: string;
  paymentStatus: string;
  paidAt: string;
};

export default function CustomerPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetchWithAuth(
          "/api/payments/my-payments"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load payment history."
          );
        }

        setPayments(data.payments || []);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const totalAmount = payments.reduce(
    (total, payment) => total + Number(payment.amount || 0),
    0
  );

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

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#142D4E]">
            My Payments
          </h1>
          <p className="mt-2 text-slate-500">
            View your repair payment history and transaction details.
          </p>
        </div>

        <div className="mb-6 grid gap-5 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                <CreditCard size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-500">
                  Total Payments
                </p>
                <h2 className="mt-1 text-2xl font-bold text-[#142D4E]">
                  {payments.length}
                </h2>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-50 p-3 text-green-600">
                <Receipt size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-500">
                  Total Amount Paid
                </p>
                <h2 className="mt-1 text-2xl font-bold text-[#142D4E]">
                  ৳{totalAmount.toLocaleString("en-BD")}
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-lg font-bold text-[#142D4E]">
            Payment History
          </h2>

          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="animate-spin text-[#F59E0B]" size={32} />
            </div>
          ) : error ? (
            <p className="py-10 text-center text-sm text-red-600">
              {error}
            </p>
          ) : payments.length === 0 ? (
            <div className="py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-[#F59E0B]">
                <CreditCard size={30} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-[#142D4E]">
                No Payment History
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                Your completed repair payments will appear here.
              </p>

              <Link
                href="/services"
                className="mt-6 inline-flex rounded-lg bg-[#142D4E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1d416b]"
              >
                Browse Services
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="px-4 py-3">Service</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Transaction ID</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {payments.map((payment) => (
                    <tr
                      key={payment._id}
                      className="border-b border-slate-100 last:border-0"
                    >
                      <td className="px-4 py-4 font-medium text-[#142D4E]">
                        {payment.serviceTitle}
                      </td>
                      <td className="px-4 py-4 font-semibold text-[#142D4E]">
                        ৳{Number(payment.amount).toLocaleString("en-BD")}
                      </td>
                      <td className="px-4 py-4 text-slate-500">
                        {payment.transactionId || "N/A"}
                      </td>
                      <td className="px-4 py-4 text-slate-500">
                        {payment.paidAt
                          ? new Date(payment.paidAt).toLocaleDateString("en-GB")
                          : "N/A"}
                      </td>
                      <td className="px-4 py-4">
                        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                          {payment.paymentStatus}
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
