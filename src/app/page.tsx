import Hero from "@/components/Hero";
import FeaturedServices from "@/components/FeaturedServices";
import HowItWorks from "@/components/HowItWorks";
import PopularCategories from "@/components/PopularCategories";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import { Suspense } from "react";



function ServiceDetailsContent() {
  return (
    <div>
           <Hero />

               <FeaturedServices />
      <HowItWorks />
<PopularCategories />
<WhyChooseUs />
<Testimonials />
<CTASection />
    </div>
  );
}
export default function ServiceDetailsPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <ServiceDetailsContent />
    </Suspense>
  );
}
