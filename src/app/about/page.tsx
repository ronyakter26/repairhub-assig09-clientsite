
import Link from "next/link";
import {
  Search,
  ClipboardList,
  Wrench,
  CreditCard,
  ShieldCheck,
  Wallet,
  Clock,
  Users,
  Target,
  HeartHandshake,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Find a Service",
    description:
      "Browse available repair services and choose the one that matches your device or appliance problem.",
    icon: Search,
  },
  {
    number: "02",
    title: "Request a Repair",
    description:
      "Select a service, provide your contact details, address, preferred date, and describe your problem.",
    icon: ClipboardList,
  },
  {
    number: "03",
    title: "Get It Fixed",
    description:
      "Your technician will review the request, accept the job, and update you as the repair progresses.",
    icon: Wrench,
  },
  {
    number: "04",
    title: "Pay Securely",
    description:
      "Once the repair is completed and the final amount is confirmed, pay securely through Stripe.",
    icon: CreditCard,
  },
];

const benefits = [
  {
    title: "Verified Professionals",
    description:
      "Technicians and their services go through an approval process before services become available.",
    icon: ShieldCheck,
  },
  {
    title: "Affordable Pricing",
    description:
      "View starting prices before requesting a repair and know the final amount before payment.",
    icon: Wallet,
  },
  {
    title: "Convenient Service",
    description:
      "Find services, submit repair requests, and track your booking from one platform.",
    icon: Clock,
  },
  {
    title: "Customer Friendly",
    description:
      "A simple platform designed to make the repair process easier for customers and technicians.",
    icon: Users,
  },
];

export default function AboutPage() {
  return (
    <main className="bg-[#F8FAFC]">
      {/* Hero Section */}
      <section className="bg-[#142D4E] px-6 py-20 text-center text-white lg:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl">
          <span className="mb-5 inline-block rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-amber-400">
            About FixMate
          </span>

          <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
            Making Repair Services
            <span className="block text-[#F59E0B]">
              Simple and Reliable
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
            FixMate connects customers with professional technicians
            for reliable home appliance and electronic repair services.
            We make finding, requesting, and managing repairs easier.
          </p>

          <Link
            href="/services"
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-[#F59E0B] px-8 py-4 font-bold text-[#142D4E] transition hover:bg-amber-400"
          >
            Explore Our Services
          </Link>
        </div>
      </section>

      {/* About and Mission Section */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
          <div>
            <span className="mb-3 inline-block text-sm font-bold uppercase tracking-wider text-[#F59E0B]">
              Who We Are
            </span>

            <h2 className="mb-6 text-3xl font-bold text-[#142D4E] md:text-4xl">
              Your Trusted Partner for Repair Solutions
            </h2>

            <p className="mb-5 leading-8 text-slate-600">
              FixMate is a repair service marketplace designed to
              connect customers with skilled technicians. Whether
              you need smartphone, laptop, AC, refrigerator, TV,
              or washing machine repair, you can find suitable
              services in one place.
            </p>

            <p className="leading-8 text-slate-600">
              Customers can explore services, request repairs,
              track booking progress, and complete payments.
              Technicians can manage their services and repair
              requests through their own dashboard.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm md:p-10">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-amber-100 text-[#F59E0B]">
              <Target size={30} />
            </div>

            <h3 className="mb-4 text-2xl font-bold text-[#142D4E]">
              Our Mission
            </h3>

            <p className="leading-8 text-slate-600">
              Our mission is to make repair services accessible,
              convenient, and dependable. We aim to create a
              platform where customers can find trusted
              technicians and technicians can grow their
              service opportunities.
            </p>

            <div className="mt-7 flex items-center gap-3 border-t border-slate-100 pt-6">
              <HeartHandshake className="text-[#F59E0B]" size={28} />
              <span className="font-semibold text-[#142D4E]">
                Connecting People Through Reliable Service
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <span className="mb-3 inline-block text-sm font-bold uppercase tracking-wider text-[#F59E0B]">
              Simple Process
            </span>

            <h2 className="mb-4 text-3xl font-bold text-[#142D4E] md:text-4xl">
              How FixMate Works
            </h2>

            <p className="mx-auto max-w-2xl leading-7 text-slate-600">
              Getting your device or appliance repaired is easy.
              Just follow these four simple steps.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="group rounded-2xl border border-slate-100 bg-[#F8FAFC] p-7 transition hover:-translate-y-2 hover:border-amber-200 hover:shadow-lg"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-amber-100 text-[#F59E0B] transition group-hover:bg-[#F59E0B] group-hover:text-white">
                      <Icon size={27} />
                    </div>

                    <span className="text-3xl font-extrabold text-slate-200">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mb-3 text-xl font-bold text-[#142D4E]">
                    {step.title}
                  </h3>

                  <p className="text-sm leading-7 text-slate-600">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <span className="mb-3 inline-block text-sm font-bold uppercase tracking-wider text-[#F59E0B]">
              Why FixMate
            </span>

            <h2 className="mb-4 text-3xl font-bold text-[#142D4E] md:text-4xl">
              Why Choose FixMate?
            </h2>

            <p className="mx-auto max-w-2xl leading-7 text-slate-600">
              We focus on making the repair experience convenient
              for customers and technicians.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="rounded-2xl bg-white p-7 shadow-sm transition hover:-translate-y-2 hover:shadow-lg"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-amber-100 text-[#F59E0B]">
                    <Icon size={27} />
                  </div>

                  <h3 className="mb-3 text-lg font-bold text-[#142D4E]">
                    {benefit.title}
                  </h3>

                  <p className="text-sm leading-7 text-slate-600">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#142D4E] px-6 py-20 text-center lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-5 text-3xl font-bold text-white md:text-4xl">
            Need a Reliable Repair Service?
          </h2>

          <p className="mb-8 leading-7 text-slate-300">
            Explore available services and find the right
            technician for your repair needs.
          </p>

          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-lg bg-[#F59E0B] px-8 py-4 font-bold text-[#142D4E] transition hover:bg-amber-400"
          >
            Find a Service
          </Link>
        </div>
      </section>
    </main>
  );
}
