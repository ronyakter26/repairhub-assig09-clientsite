
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Search,
  Wrench,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import { fetchWithAuth } from "@/lib/api";

interface Service {
  _id: string;
  title: string;
  category: string;
  description: string;
  basePrice?: number;
  startingPrice?: number;
  image?: string;
  serviceMode?: string;
  serviceArea?: string;
  technicianName?: string;
  technicianEmail?: string;
  approvalStatus?: string;
  status?: string;
  createdAt?: string;
}

type FilterStatus = "all" | "pending" | "approved" | "rejected";
type ApprovalStatus = "approved" | "rejected";

export default function ManageServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const [confirmAction, setConfirmAction] = useState<{
    service: Service;
    status: ApprovalStatus;
  } | null>(null);

  const getStatus = (service: Service) =>
    (service.approvalStatus || service.status || "pending").toLowerCase();

  const loadServices = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetchWithAuth("/api/admin/services");
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to load services.");
      }

      setServices(result.services || []);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const status = getStatus(service);

      const matchesStatus =
        filter === "all" || status === filter;

      const searchText = search.toLowerCase();

      const matchesSearch =
        service.title?.toLowerCase().includes(searchText) ||
        service.category?.toLowerCase().includes(searchText) ||
        service.technicianName?.toLowerCase().includes(searchText) ||
        service.technicianEmail?.toLowerCase().includes(searchText);

      return matchesStatus && matchesSearch;
    });
  }, [services, filter, search]);

  const counts = {
    all: services.length,
    pending: services.filter((service) => getStatus(service) === "pending").length,
    approved: services.filter((service) => getStatus(service) === "approved").length,
    rejected: services.filter((service) => getStatus(service) === "rejected").length,
  };

  const handleApproval = async () => {
    if (!confirmAction) return;

    try {
      setProcessing(true);

      const response = await fetchWithAuth(
        `/api/admin/services/${confirmAction.service._id}/approval`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            approvalStatus: confirmAction.status,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to update service status."
        );
      }

      setServices((previousServices) =>
        previousServices.map((service) =>
          service._id === confirmAction.service._id
            ? {
                ...service,
                approvalStatus: confirmAction.status,
                status: confirmAction.status,
              }
            : service
        )
      );

      toast.success(
        confirmAction.status === "approved"
          ? "Service approved successfully!"
          : "Service rejected successfully!"
      );

      setConfirmAction(null);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setProcessing(false);
    }
  };

  const filterOptions: FilterStatus[] = [
    "all",
    "pending",
    "approved",
    "rejected",
  ];

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/dashboard/admin"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-[#F59E0B]"
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </Link>

        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#142D4E]">
              Manage Services
            </h1>
            <p className="mt-2 text-slate-500">
              Review, approve or reject technician service listings.
            </p>
          </div>

          <button
            onClick={loadServices}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-[#142D4E] transition hover:border-[#F59E0B] disabled:opacity-50"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#142D4E]">
                All Services ({filteredServices.length})
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Total listings: {services.length}
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2">
              <Search size={18} className="text-slate-400" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search services..."
                className="w-full text-sm outline-none sm:w-64"
              />
            </div>
          </div>

          <div className="mb-6 flex flex-wrap gap-3">
            {filterOptions.map((option) => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition ${
                  filter === option
                    ? "bg-[#142D4E] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {option === "all" ? "All Services" : option}
                {" ("}
                {counts[option]}
                {")"}
              </button>
            ))}
          </div>

          {loading ? (
            <p className="py-16 text-center text-slate-500">
              Loading services...
            </p>
          ) : error ? (
            <div className="py-16 text-center">
              <p className="text-red-500">{error}</p>
              <button
                onClick={loadServices}
                className="mt-4 rounded-lg bg-[#142D4E] px-5 py-2 text-sm font-semibold text-white"
              >
                Try Again
              </button>
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 text-[#F59E0B]">
                <Wrench size={27} />
              </div>

              <h3 className="mt-4 font-bold text-[#142D4E]">
                No Services Found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                No services match your current search or filter.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-sm text-slate-600">
                    <th className="px-4 py-4 font-semibold">Service</th>
                    <th className="px-4 py-4 font-semibold">Technician</th>
                    <th className="px-4 py-4 font-semibold">Category</th>
                    <th className="px-4 py-4 font-semibold">Price</th>
                    <th className="px-4 py-4 font-semibold">Status</th>
                    <th className="px-4 py-4 font-semibold">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredServices.map((service) => {
                    const status = getStatus(service);

                    return (
                      <tr
                        key={service._id}
                        className="border-b border-slate-100 last:border-0"
                      >
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            {service.image ? (
                              <img
                                src={service.image}
                                alt={service.title}
                                className="h-12 w-12 rounded-lg object-cover"
                              />
                            ) : (
                              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-50 text-[#F59E0B]">
                                <Wrench size={20} />
                              </div>
                            )}

                            <div>
                              <p className="font-semibold text-[#142D4E]">
                                {service.title}
                              </p>
                              <p className="text-xs text-slate-500">
                                {service.serviceMode || "N/A"}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-4">
                          <p className="text-sm font-medium text-slate-700">
                            {service.technicianName || "Unknown"}
                          </p>
                          <p className="text-xs text-slate-500">
                            {service.technicianEmail || ""}
                          </p>
                        </td>

                        <td className="px-4 py-4 text-sm text-slate-600">
                          {service.category}
                        </td>

                        <td className="px-4 py-4 text-sm font-semibold text-[#142D4E]">
                          ৳{service.basePrice ?? service.startingPrice ?? 0}
                        </td>

                        <td className="px-4 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                              status === "approved"
                                ? "bg-green-50 text-green-700"
                                : status === "rejected"
                                ? "bg-red-50 text-red-600"
                                : "bg-orange-50 text-orange-600"
                            }`}
                          >
                            {status}
                          </span>
                        </td>

                        <td className="px-4 py-4">
                          {status === "pending" ? (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  setConfirmAction({
                                    service,
                                    status: "approved",
                                  })
                                }
                                className="inline-flex items-center gap-1 rounded-lg bg-green-50 px-3 py-2 text-xs font-semibold text-green-700 transition hover:bg-green-100"
                              >
                                <CheckCircle size={15} />
                                Approve
                              </button>

                              <button
                                onClick={() =>
                                  setConfirmAction({
                                    service,
                                    status: "rejected",
                                  })
                                }
                                className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                              >
                                <XCircle size={15} />
                                Reject
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs text-slate-400">
                              No action needed
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {confirmAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold text-[#142D4E]">
              Confirm{" "}
              {confirmAction.status === "approved" ? "Approval" : "Rejection"}
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Are you sure you want to{" "}
              {confirmAction.status === "approved" ? "approve" : "reject"}{" "}
              <strong>{confirmAction.service.title}</strong>?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setConfirmAction(null)}
                disabled={processing}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600"
              >
                Cancel
              </button>

              <button
                onClick={handleApproval}
                disabled={processing}
                className={`rounded-lg px-4 py-2 text-sm font-semibold text-white disabled:opacity-50 ${
                  confirmAction.status === "approved"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {processing
                  ? "Processing..."
                  : confirmAction.status === "approved"
                  ? "Confirm Approve"
                  : "Confirm Reject"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
