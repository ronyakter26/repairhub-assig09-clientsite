
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";

const services = [
  {
    id: 1,
    title: "Smartphone Repair",
    category: "Mobile & Gadgets",
    price: 500,
    technician: "Rahim Ahmed",
    image: "/smartphone.jpg",
  },
  {
    id: 2,
    title: "Laptop Repair",
    category: "Computer & Laptop",
    price: 800,
    technician: "Karim Hasan",
    image: "/laptop.jpg",
  },
  {
    id: 3,
    title: "Air Conditioner Repair",
    category: "Home Appliances",
    price: 1000,
    technician: "Sabbir Hossain",
    image: "/ac-repair.jpg",
  },
  {
    id: 4,
    title: "Refrigerator Repair",
    category: "Home Appliances",
    price: 700,
    technician: "Hasan Mahmud",
    image: "/refrigerator.jpg",
  },
  {
    id: 5,
    title: "Television Repair",
    category: "Electronics",
    price: 600,
    technician: "Nayeem Islam",
    image: "/television.jpg",
  },
  {
    id: 6,
    title: "Washing Machine Repair",
    category: "Home Appliances",
    price: 900,
    technician: "Rashed Khan",
    image: "/washing-machine.jpg",
  },
];

const categories = [
  "All Categories",
  "Mobile & Gadgets",
  "Computer & Laptop",
  "Home Appliances",
  "Electronics",
];

export default function ServicesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [sort, setSort] = useState("default");

  const filteredServices = services
    .filter((service) => {
      const matchesSearch = service.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All Categories" ||
        service.category === category;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sort === "low-to-high") return a.price - b.price;
      if (sort === "high-to-low") return b.price - a.price;
      return 0;
    });

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-[#F59E0B]">
            OUR SERVICES
          </span>

          <h1 className="mb-4 text-3xl font-bold text-[#142D4E] sm:text-4xl">
            Explore Repair Services
          </h1>

          <p className="mx-auto max-w-2xl text-[#64748B]">
            Find trusted professionals for your electronic devices
            and home appliance repair needs.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-10 grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-3">

          {/* Search */}
          <div className="relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-200 py-3 pl-11 pr-4 outline-none focus:border-[#F59E0B]"
            />
          </div>

          {/* Category Filter */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-[#F59E0B]"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          {/* Price Sorting */}
          <div className="relative">
            <SlidersHorizontal
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full rounded-lg border border-slate-200 py-3 pl-11 pr-4 outline-none focus:border-[#F59E0B]"
            >
              <option value="default">Sort by: Default</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="font-medium text-[#142D4E]">
            Showing {filteredServices.length} services
          </p>
        </div>

        {/* Service Cards */}
        {filteredServices.length > 0 ? (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-5">
                  <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#142D4E]">
                    {service.category}
                  </span>

                  <h2 className="mt-3 text-xl font-bold text-[#142D4E]">
                    {service.title}
                  </h2>

                  <p className="mt-3 text-sm text-[#64748B]">
                    Technician: {service.technician}
                  </p>

                  <p className="mt-2 font-bold text-[#F59E0B]">
                    Starting from ৳{service.price}
                  </p>

                  <Link
                    href={`/services/${service.id}`}
                    className="mt-5 block rounded-lg bg-[#142D4E] px-5 py-3 text-center font-semibold text-white transition hover:bg-[#1e416d]"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white px-6 py-16 text-center">
            <h3 className="text-xl font-bold text-[#142D4E]">
              No Services Found
            </h3>
            <p className="mt-2 text-[#64748B]">
              Try another search term or category.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
