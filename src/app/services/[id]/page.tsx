import BookingForm from "./BookingForm";
export const instant = false;

import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Wrench,
  ShieldCheck,
} from "lucide-react";

type Service = {
  _id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  basePrice: number;
  estimatedDuration: string;
  serviceMode: string;
  serviceArea: string;
  technicianName: string;
  technicianEmail: string;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function getService(id: string): Promise<Service | null> {
  try {
    const response = await fetch(
      `${API_URL}/api/services/${encodeURIComponent(id)}`,
      { cache: "no-store" }
    );

    if (!response.ok) return null;

    const data = await response.json();
    return data.service || null;
  } catch (error) {
    console.error("Failed to fetch service:", error);
    return null;
  }
}

export default async function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await getService(id);

  if (!service) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="mb-3 text-3xl font-bold text-[#142D4E]">
          Service Not Found
        </h1>
        <p className="mb-6 text-slate-600">
          This service is unavailable or may have been removed.
        </p>
        <Link
          href="/services"
          className="rounded-lg bg-[#F59E0B] px-6 py-3 font-semibold text-white"
        >
          Browse Services
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-[#F8FAFC] px-6 py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/services"
          className="mb-8 inline-flex items-center gap-2 font-medium text-[#142D4E]"
        >
          <ArrowLeft size={18} />
          Back to Services
        </Link>

        <div className="grid gap-10 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">
          <div className="overflow-hidden rounded-xl">
            <img
              src={service.image || "/placeholder.png"}
              alt={service.title}
              className="h-full min-h-[280px] max-h-[500px] w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <span className="mb-4 w-fit rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
              {service.category}
            </span>

            <h1 className="mb-4 text-3xl font-bold text-[#142D4E] md:text-4xl">
              {service.title}
            </h1>

            <p className="mb-6 leading-7 text-slate-600">
              {service.description}
            </p>

            <div className="mb-6 rounded-xl bg-[#F8FAFC] p-5">
              <p className="mb-2 text-sm text-slate-500">
                Starting Price
              </p>
              <p className="text-3xl font-bold text-[#F59E0B]">
                ৳{Number(service.basePrice).toLocaleString("en-BD")}
              </p>
            </div>

            <div className="mb-8 space-y-4">
              <p className="flex items-center gap-3 text-slate-700">
                <Wrench className="text-[#F59E0B]" size={20} />
                Technician:
                <strong>{service.technicianName}</strong>
              </p>

              <p className="flex items-center gap-3 text-slate-700">
                <Clock className="text-[#F59E0B]" size={20} />
                Duration:
                <strong>{service.estimatedDuration}</strong>
              </p>

              <p className="flex items-center gap-3 text-slate-700">
                <MapPin className="text-[#F59E0B]" size={20} />
                Service Area:
                <strong>{service.serviceArea}</strong>
              </p>

              <p className="flex items-center gap-3 text-slate-700">
                <ShieldCheck className="text-[#F59E0B]" size={20} />
                Service Mode:
                <strong>{service.serviceMode}</strong>
              </p>
            </div>

            <BookingForm serviceId={service._id} />
          </div>
        </div>
      </div>
    </main>
  );
}
