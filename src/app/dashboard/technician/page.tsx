
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BriefcaseBusiness,
  Clock,
  CheckCircle,
  PlusCircle,
  ClipboardList,
  Wrench,
  ArrowRight,
} from "lucide-react";
import { fetchWithAuth } from "@/lib/api";

const stats = [
  {
    title: "Total Services",
    value: "0",
    icon: Wrench,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Pending Requests",
    value: "0",
    icon: Clock,
    color: "bg-orange-50 text-orange-600",
  },
  {
    title: "Completed Jobs",
    value: "0",
    icon: CheckCircle,
    color: "bg-green-50 text-green-600",
  },
];

export default function TechnicianDashboard() {
  const [jwtStatus, setJwtStatus] = useState("Checking...");
  
  useEffect(() => {
    const testJWT = async () => {
      try {
        const response = await fetchWithAuth("/api/protected");
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "JWT verification failed");
        }

        setJwtStatus(result.message);
      } catch (error) {
        setJwtStatus(
          error instanceof Error ? error.message : "JWT test failed"
        );
      }
    };

    testJWT();
  }, []);

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#142D4E]">
            Technician Dashboard
          </h1>
          <p className="mt-2 text-slate-500">
            Manage your services and repair requests.
          </p>

          <p className="mt-3 text-sm text-slate-600">
            JWT Test: <span className="font-semibold">{jwtStatus}</span>
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

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Link
            href="/dashboard/technician/add-service"
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-[#F59E0B]"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-orange-50 p-4 text-[#F59E0B]">
                <PlusCircle size={26} />
              </div>
              <div>
                <h2 className="font-bold text-[#142D4E]">Add New Service</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Create a new repair service listing.
                </p>
              </div>
            </div>
            <ArrowRight size={20} className="text-slate-400" />
          </Link>

          <Link
            href="/dashboard/technician/my-services"
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-[#F59E0B]"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-blue-50 p-4 text-blue-600">
                <BriefcaseBusiness size={26} />
              </div>
              <div>
                <h2 className="font-bold text-[#142D4E]">My Services</h2>
                <p className="mt-1 text-sm text-slate-500">
                  View and manage your service listings.
                </p>
              </div>
            </div>
            <ArrowRight size={20} className="text-slate-400" />
          </Link>

          <Link
            href="/dashboard/technician/requests"
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-[#F59E0B] md:col-span-2"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-green-50 p-4 text-green-600">
                <ClipboardList size={26} />
              </div>
              <div>
                <h2 className="font-bold text-[#142D4E]">Repair Requests</h2>
                <p className="mt-1 text-sm text-slate-500">
                  View customer requests and manage job status.
                </p>
              </div>
            </div>
            <ArrowRight size={20} className="text-slate-400" />
          </Link>
        </div>
      </div>
    </main>
  );
}
