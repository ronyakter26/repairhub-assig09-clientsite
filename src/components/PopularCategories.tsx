
import Link from "next/link";
import {
  Smartphone,
  Laptop,
  Wind,
  Refrigerator,
  Tv,
  WashingMachine,
  Zap,
} from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Smartphone",
    description: "Mobile repair services",
    icon: Smartphone,
  },
  {
    id: 2,
    name: "Laptop & PC",
    description: "Computer repair services",
    icon: Laptop,
  },
  {
    id: 3,
    name: "Air Conditioner",
    description: "AC repair and servicing",
    icon: Wind,
  },
  {
    id: 4,
    name: "Refrigerator",
    description: "Fridge repair services",
    icon: Refrigerator,
  },
  {
    id: 5,
    name: "Television",
    description: "TV repair services",
    icon: Tv,
  },
  {
    id: 6,
    name: "Washing Machine",
    description: "Washing machine repair",
    icon: WashingMachine,
  },
  {
    id: 7,
    name: "Electrical",
    description: "Electrical repair services",
    icon: Zap,
  },
];

export default function PopularCategories() {
  return (
    <section className="bg-white px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-[#F59E0B]">
            EXPLORE CATEGORIES
          </span>

          <h2 className="mb-4 text-3xl font-bold text-[#142D4E] sm:text-4xl">
            Popular Repair Categories
          </h2>

          <p className="mx-auto max-w-2xl text-[#64748B]">
            Find the right repair expert for your home appliances
            and electronic devices.
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.id}
                href="/services"
                className="group rounded-2xl border border-slate-200 bg-white p-6 text-center transition duration-300 hover:-translate-y-2 hover:border-[#F59E0B] hover:shadow-lg"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-[#142D4E] transition group-hover:bg-[#F59E0B] group-hover:text-white">
                  <Icon size={30} strokeWidth={1.8} />
                </div>

                <h3 className="mb-2 font-bold text-[#142D4E]">
                  {category.name}
                </h3>

                <p className="text-sm text-[#64748B]">
                  {category.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
