
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, PlusCircle, Wrench } from "lucide-react";
import { fetchWithAuth } from "@/lib/api";

interface Service {
  _id: string;
  title: string;
  category: string;
  description: string;
  startingPrice: number;
  serviceMode: string;
  image: string;
  status: string;
  createdAt: string;
}

export default function MyServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadServices() {
      try {
        setLoading(true);
        setError("");

        const response = await fetchWithAuth("/api/my-services");

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to load services.");
        }

        setServices(result.services || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    }

    loadServices();
  }, []);

  const filteredServices =
    status === "all"
      ? services
      : services.filter(
          (service) => service.status?.toLowerCase() === status
        );

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/dashboard/technician"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-[#F59E0B]"
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </Link>

        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#142D4E]">
              My Services
            </h1>
            <p className="mt-2 text-slate-500">
              View and manage all your repair service listings.
            </p>
          </div>

          <Link
            href="/dashboard/technician/add-service"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#F59E0B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            <PlusCircle size={18} />
            Add New Service
          </Link>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-bold text-[#142D4E]">
              All Services ({filteredServices.length})
            </h2>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-600 outline-none focus:border-[#F59E0B]"
            >
              <option value="all">All Services</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {loading ? (
            <p className="py-16 text-center text-slate-500">
              Loading services...
            </p>
          ) : error ? (
            <p className="py-16 text-center text-red-500">{error}</p>
          ) : filteredServices.length === 0 ? (
            <div className="py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-[#F59E0B]">
                <Wrench size={30} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-[#142D4E]">
                No Services Added Yet
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                You haven't added any repair services yet. Add your first
                service to start receiving customer requests.
              </p>

              <Link
                href="/dashboard/technician/add-service"
                className="mt-6 inline-flex rounded-lg bg-[#142D4E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1d416b]"
              >
                Add Your First Service
              </Link>
            </div>
          ) : (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredServices.map((service) => (
                <div
                  key={service._id}
                  className="overflow-hidden rounded-xl border border-slate-200"
                >
                  {service.image && (
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-48 w-full object-cover"
                    />
                  )}

                  <div className="space-y-3 p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-[#142D4E]">
                        {service.title}
                      </h3>

                      <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold capitalize text-orange-600">
                        {service.status}
                      </span>
                    </div>

                    <p className="text-sm text-slate-500">
                      {service.category}
                    </p>

                    <p className="text-sm text-slate-600">
                      {service.description}
                    </p>

                    <p className="font-bold text-[#142D4E]">
                      Starting from ৳{service.startingPrice}
                    </p>

                    <p className="text-xs capitalize text-slate-500">
                      {service.serviceMode}
                    </p>
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
