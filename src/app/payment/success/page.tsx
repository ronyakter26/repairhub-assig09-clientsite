
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { fetchWithAuth } from "@/lib/api";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [status, setStatus] = useState<
    "loading" | "success" | "error"
  >("loading");

  const [message, setMessage] = useState(
    "Verifying your payment..."
  );

  useEffect(() => {
    let active = true;

    const verifyPayment = async () => {
      if (!sessionId) {
        setStatus("error");
        setMessage("Payment session ID is missing.");
        return;
      }

      try {
        const response = await fetchWithAuth(
          "/api/payments/verify",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ sessionId }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Payment verification failed."
          );
        }

        if (active) {
          setStatus("success");
          setMessage(
            "Your payment has been verified successfully. Thank you for choosing FixMate."
          );
        }
      } catch (error) {
        if (active) {
          setStatus("error");
          setMessage(
            error instanceof Error
              ? error.message
              : "Payment verification failed."
          );
        }
      }
    };

    verifyPayment();

    return () => {
      active = false;
    };
  }, [sessionId]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-600">
          {status === "loading" ? (
            <Loader2 size={45} className="animate-spin" />
          ) : status === "success" ? (
            <CheckCircle size={45} />
          ) : (
            <XCircle size={45} className="text-red-500" />
          )}
        </div>

        <h1 className="text-3xl font-bold text-[#142D4E]">
          {status === "loading"
            ? "Verifying Payment..."
            : status === "success"
              ? "Payment Successful!"
              : "Payment Verification Failed"}
        </h1>

        <p className="mt-4 leading-7 text-slate-500">
          {message}
        </p>

        {status !== "loading" && (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/dashboard/customer/payments"
              className="rounded-lg bg-[#142D4E] px-6 py-3 font-semibold text-white transition hover:bg-[#1e416d]"
            >
              View My Payments
            </Link>

            <Link
              href="/"
              className="rounded-lg border border-slate-300 px-6 py-3 font-semibold text-[#142D4E] transition hover:border-[#F59E0B]"
            >
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
