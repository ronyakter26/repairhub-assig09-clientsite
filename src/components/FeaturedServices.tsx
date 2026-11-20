
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    id: 1,
    title: "Smartphone Repair",
    category: "Mobile & Gadgets",
    price: "৳500",
    technician: "Rahim Ahmed",
    image: "/smartphone.jpg",
  },
  {
    id: 2,
    title: "Laptop Repair",
    category: "Computer & Laptop",
    price: "৳800",
    technician: "Karim Hasan",
    image: "/laptop.jpg",
  },
  {
    id: 3,
    title: "Air Conditioner Repair",
    category: "Home Appliances",
    price: "৳1,000",
    technician: "Sabbir Hossain",
    image: "/ac-repair.jpg",
  },
  {
    id: 4,
    title: "Refrigerator Repair",
    category: "Home Appliances",
    price: "৳700",
    technician: "Hasan Mahmud",
    image: "/refrigerator.jpg",
  },
  {
    id: 5,
    title: "Television Repair",
    category: "Electronics",
    price: "৳600",
    technician: "Nayeem Islam",
    image: "/television.jpg",
  },
  {
    id: 6,
    title: "Washing Machine Repair",
    category: "Home Appliances",
    price: "৳900",
    technician: "Rashed Khan",
    image: "/washing-machine.jpg",
  },
];

export default function FeaturedServices() {
  return (
    <section className="bg-white px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-[#F59E0B]">
            OUR SERVICES
          </span>

          <h2 className="mb-4 text-3xl font-bold text-[#142D4E] sm:text-4xl">
            Featured Repair Services
          </h2>

          <p className="mx-auto max-w-2xl text-[#64748B]">
            Find trusted professionals for all your repair needs.
            Quality service and reliable solutions are just one click away.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Service Image */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              {/* Card Content */}
              <div className="p-5">
                <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#142D4E]">
                  {service.category}
                </span>

                <h3 className="mt-3 text-xl font-bold text-[#142D4E]">
                  {service.title}
                </h3>

                <div className="mt-4 space-y-2 text-sm text-[#64748B]">
                  <p>
                    Technician:{" "}
                    <span className="font-medium text-[#1E293B]">
                      {service.technician}
                    </span>
                  </p>

                  <p>
                    Starting Price:{" "}
                    <span className="font-bold text-[#F59E0B]">
                      {service.price}
                    </span>
                  </p>
                </div>

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

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-block rounded-lg border-2 border-[#142D4E] px-8 py-3 font-semibold text-[#142D4E] transition hover:bg-[#142D4E] hover:text-white"
          >
            View All Services
          </Link>
        </div>

      </div>
    </section>
  );
}
