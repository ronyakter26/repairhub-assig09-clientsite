
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Nusrat Jahan",
    role: "Customer",
    review:
      "My laptop was repaired quickly and professionally. The technician was friendly and the service was excellent.",
    initials: "NJ",
  },
  {
    id: 2,
    name: "Tanvir Ahmed",
    role: "Customer",
    review:
      "FixMate made it very easy to find a reliable AC technician. The booking process was simple and smooth.",
    initials: "TA",
  },
  {
    id: 3,
    name: "Farhana Akter",
    role: "Customer",
    review:
      "I am happy with the service. The technician arrived on time and fixed my refrigerator perfectly.",
    initials: "FA",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-14 text-center">
          <span className="mb-3 inline-block rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-[#F59E0B]">
            CUSTOMER REVIEWS
          </span>

          <h2 className="mb-4 text-3xl font-bold text-[#142D4E] sm:text-4xl">
            What Our Customers Say
          </h2>

          <p className="mx-auto max-w-2xl text-[#64748B]">
            Real satisfaction starts with reliable service.
            See what customers think about FixMate.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-7 transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-5 flex items-center justify-between">
                <Quote
                  size={34}
                  className="text-[#F59E0B]"
                  fill="currentColor"
                />

                <div className="flex gap-1 text-[#F59E0B]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={17}
                      fill="currentColor"
                    />
                  ))}
                </div>
              </div>

              <p className="mb-7 leading-7 text-[#64748B]">
                "{item.review}"
              </p>

              <div className="flex items-center gap-4 border-t border-slate-200 pt-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#142D4E] font-bold text-white">
                  {item.initials}
                </div>

                <div>
                  <h3 className="font-bold text-[#142D4E]">
                    {item.name}
                  </h3>

                  <p className="text-sm text-[#64748B]">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
