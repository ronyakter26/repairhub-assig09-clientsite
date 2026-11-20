
import {
  ShieldCheck,
  Wallet,
  Clock,
  CreditCard,
} from "lucide-react";

const features = [
  {
    id: 1,
    title: "Verified Professionals",
    description:
      "Connect with trusted and verified technicians who are experienced in their fields.",
    icon: ShieldCheck,
  },
  {
    id: 2,
    title: "Affordable Pricing",
    description:
      "Get reliable repair services at reasonable prices without hidden charges.",
    icon: Wallet,
  },
  {
    id: 3,
    title: "Fast & Reliable Service",
    description:
      "Book a technician easily and get your repair needs handled on time.",
    icon: Clock,
  },
  {
    id: 4,
    title: "Secure Online Payment",
    description:
      "Pay safely online after your repair is successfully completed.",
    icon: CreditCard,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#F8FAFC] px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-14 text-center">
          <span className="mb-3 inline-block rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-[#F59E0B]">
            WHY FIXMATE
          </span>

          <h2 className="mb-4 text-3xl font-bold text-[#142D4E] sm:text-4xl">
            Why Choose FixMate?
          </h2>

          <p className="mx-auto max-w-2xl text-[#64748B]">
            We make finding trusted repair professionals simple,
            affordable, and stress-free.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.id}
                className="rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-orange-100 text-[#F59E0B]">
                  <Icon size={28} strokeWidth={2} />
                </div>

                <h3 className="mb-3 text-lg font-bold text-[#142D4E]">
                  {feature.title}
                </h3>

                <p className="text-sm leading-7 text-[#64748B]">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
