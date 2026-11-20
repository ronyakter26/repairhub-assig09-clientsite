
import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";

export default function CTASection() {
  return (
    <section className="bg-white px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#142D4E] px-8 py-14 text-center sm:px-14 lg:py-20">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-[#F59E0B]">
          <Wrench size={34} />
        </div>

        {/* Heading */}
        <h2 className="mb-5 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          Ready to Get Your Device Fixed?
        </h2>

        {/* Description */}
        <p className="mx-auto mb-9 max-w-2xl text-base leading-7 text-slate-300">
          Don't let a broken device slow you down. Find trusted
          professionals and get reliable repair services with FixMate.
        </p>

        {/* Buttons */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#F59E0B] px-7 py-3.5 font-semibold text-[#142D4E] transition hover:bg-amber-400"
          >
            Explore Services
            <ArrowRight size={19} />
          </Link>

          <Link
            href="/sign-up"
            className="inline-flex items-center justify-center rounded-lg border border-white/40 px-7 py-3.5 font-semibold text-white transition hover:bg-white hover:text-[#142D4E]"
          >
            Become a Technician
          </Link>
        </div>
      </div>
    </section>
  );
}
