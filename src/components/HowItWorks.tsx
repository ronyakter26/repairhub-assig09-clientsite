
import Link from "next/link";
import {
  Search,
  ClipboardList,
  Wrench,
  CreditCard,
} from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Find a Service",
    description:
      "Browse available repair services and choose the right technician for your needs.",
    icon: Search,
  },
  {
    id: 2,
    title: "Request a Repair",
    description:
      "Submit your repair request with your contact details and preferred date.",
    icon: ClipboardList,
  },
  {
    id: 3,
    title: "Get It Fixed",
    description:
      "A professional technician accepts your request and completes the repair.",
    icon: Wrench,
  },
  {
    id: 4,
    title: "Pay Securely",
    description:
      "Once the repair is complete, pay securely for the service.",
    icon: CreditCard,
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#F8FAFC] px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-14 text-center">
          <span className="mb-3 inline-block rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-[#F59E0B]">
            SIMPLE PROCESS
          </span>

          <h2 className="mb-4 text-3xl font-bold text-[#142D4E] sm:text-4xl">
            How FixMate Works
          </h2>

          <p className="mx-auto max-w-2xl text-[#64748B]">
            Getting your devices repaired has never been easier.
            Follow these four simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.id}
                className="relative rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-[#F59E0B]">
                  <Icon size={30} strokeWidth={2} />
                </div>

                <span className="mb-3 inline-block text-sm font-bold text-[#F59E0B]">
                  STEP 0{step.id}
                </span>

                <h3 className="mb-3 text-xl font-bold text-[#142D4E]">
                  {step.title}
                </h3>

                <p className="text-sm leading-7 text-[#64748B]">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-block rounded-lg bg-[#142D4E] px-8 py-3 font-semibold text-white transition hover:bg-[#1e416d]"
          >
            Find a Service →
          </Link>
        </div>
      </div>
    </section>
  );
}
