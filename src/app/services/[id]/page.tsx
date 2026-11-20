import { Suspense } from "react";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  ShieldCheck,
  Clock,
  Wrench,   
} from "lucide-react";

const services = [
  {
    id: 1,
    title: "Smartphone Repair",
    category: "Mobile & Gadgets",
    price: 500,
    technician: "Rahim Ahmed",
    image: "/smartphone.jpg",
    description:
      "Get professional smartphone repair services for screen damage, battery problems, charging issues, and other mobile-related problems.",
  },
  {
    id: 2,
    title: "Laptop Repair",
    category: "Computer & Laptop",
    price: 800,
    technician: "Karim Hasan",
    image: "/laptop.jpg",
    description:
      "Reliable laptop repair services for hardware issues, software problems, slow performance, and other technical difficulties.",
  },
  {
    id: 3,
    title: "AC Repair",
    category: "Home Appliances",
    price: 1000,
    technician: "Sabbir Hossain",
    image: "/ac-repair.jpg",
    description:
      "Professional air conditioner servicing and repair to keep your AC running smoothly and efficiently.",
  },
  {
    id: 4,
    title: "Refrigerator Repair",
    category: "Home Appliances",
    price: 700,
    technician: "Imran Ahmed",
    image: "/refrigerator.jpg",
    description:
      "Expert refrigerator repair for cooling problems, unusual noises, and other common refrigerator issues.",
  },
  {
    id: 5,
    title: "Television Repair",
    category: "Electronics",
    price: 600,
    technician: "Nayeem Islam",
    image: "/television.jpg",
    description:
      "Get help with television display issues, sound problems, connection errors, and other TV repairs.",
  },
  {
    id: 6,
    title: "Washing Machine Repair",
    category: "Home Appliances",
    price: 900,
    technician: "Hasan Mahmud",
    image: "/washing-machine.jpg",
    description:
      "Professional washing machine repair for drainage issues, spinning problems, and other machine faults.",
  },
];

async function ServiceDetailsContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const serviceId = Number(id);

  const service = services.find((item) => item.id === serviceId);

  if (!service) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="mb-3 text-3xl font-bold text-[#142D4E]">
          Service Not Found
        </h1>

        <p className="mb-6 text-slate-600">
          Sorry, the service you are looking for does not exist.
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
          <div className="relative min-h-[280px] overflow-hidden rounded-xl md:min-h-[450px]">
            <Image
              src={service.image}
              alt={service.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
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
              <p className="mb-2 text-sm text-slate-500">Starting Price</p>
              <p className="text-3xl font-bold text-[#F59E0B]">
                ৳{service.price}
              </p>
            </div>

            <div className="mb-8 space-y-4">
              <p className="flex items-center gap-3 text-slate-700">
                <Wrench className="text-[#F59E0B]" size={20} />
                Technician: <strong>{service.technician}</strong>
              </p>

              <p className="flex items-center gap-3 text-slate-700">
                <MapPin className="text-[#F59E0B]" size={20} />
                Professional repair service
              </p>

              <p className="flex items-center gap-3 text-slate-700">
                <ShieldCheck className="text-[#F59E0B]" size={20} />
                Reliable repair support
              </p>

              <p className="flex items-center gap-3 text-slate-700">
                <Clock className="text-[#F59E0B]" size={20} />
                Flexible service scheduling
              </p>
            </div>

            <Link
              href="/sign-in"
              className="rounded-lg bg-[#F59E0B] px-7 py-4 text-center font-bold text-white transition hover:bg-amber-600"
            >
              Sign In to Book This Service
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
export default function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="p-10 text-center text-slate-600">
          Loading service details...
        </div>
      }
    >
      <ServiceDetailsContent params={params} />
    </Suspense>
  );
}