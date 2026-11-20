
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F8FAFC]">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24 lg:px-8">

        {/* Left Content */}
        <div className="space-y-7">
          <span className="inline-flex items-center rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-[#F59E0B]">
            <span className="mr-2 h-2 w-2 rounded-full bg-[#F59E0B]"></span>
            Trusted Home Repair Services
          </span>

          <h1 className="text-4xl font-bold leading-tight text-[#142D4E] sm:text-5xl lg:text-6xl">
            Reliable Repairs,
            <span className="block text-[#F59E0B]">
              Right at Your Doorstep.
            </span>
          </h1>

          <p className="max-w-xl text-base leading-8 text-[#64748B] sm:text-lg">
            From home appliances to electronics, find skilled technicians
            and get your repairs done with ease. Quality service, trusted
            professionals, and hassle-free booking.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/services"
              className="rounded-lg bg-[#F59E0B] px-7 py-3.5 font-semibold text-white shadow-md transition hover:bg-[#E68A00]"
            >
              Explore Services →
            </Link>

            <Link
              href="/sign-up"
              className="rounded-lg border-2 border-[#142D4E] px-7 py-3.5 font-semibold text-[#142D4E] transition hover:bg-[#142D4E] hover:text-white"
            >
              Become a Technician
            </Link>
          </div>

          <div className="flex flex-wrap gap-8 border-t border-slate-200 pt-7">
            <div>
              <h3 className="text-2xl font-bold text-[#142D4E]">500+</h3>
              <p className="text-sm text-[#64748B]">Happy Customers</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#142D4E]">100+</h3>
              <p className="text-sm text-[#64748B]">Expert Technicians</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#142D4E]">4.9/5</h3>
              <p className="text-sm text-[#64748B]">Customer Rating</p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative">
          <div className="absolute -right-5 -top-5 h-32 w-32 rounded-full bg-orange-200/60 blur-2xl"></div>
          <div className="absolute -bottom-5 -left-5 h-32 w-32 rounded-full bg-blue-200/60 blur-2xl"></div>

          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
<Image
  src="/hero-technician.jpg"
  alt="Professional technician repairing electronic equipment"
  width={1200}
  height={800}
  priority
  className="h-[350px] w-full object-cover sm:h-[450px]"
/>
            <div className="absolute bottom-5 left-5 right-5 rounded-xl bg-white/95 p-4 shadow-lg backdrop-blur-sm">
              <p className="font-bold text-[#142D4E]">
                Professional Repair Experts
              </p>
              <p className="mt-1 text-sm text-[#64748B]">
                Making your repair experience simple and reliable.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
